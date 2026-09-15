/**
 * Prompt Colorizer — Obsidian 提示词着色插件
 * 主入口文件
 *
 * 架构（三层解耦）：
 * - Git 远程规则仓库（YAML 配置）→ 本地缓存 → 规则引擎 → CodeMirror 6 高亮
 * - 断网可用：本地缓存 / 内置规则作为降级方案
 * - 规则热重载：更新规则后无需重启 Obsidian
 *
 * 功能：
 * - 编辑模式下通过 CodeMirror 6 扩展为提示词语法着色（基于动态规则引擎）
 * - 文件浏览器中根据文件类型显示颜色标记
 * - 阅读模式下渲染彩色提示词块
 * - 支持 Git 远程规则更新、本地缓存、内置规则三种模式
 */

import { Plugin, WorkspaceLeaf, Notice, Editor, Menu, MarkdownView, TFile } from 'obsidian';
import { Extension } from '@codemirror/state';
import type { PromptColorizerSettings, CustomTextColor, CustomRuleDef, PackageManifest } from './src/types';
import { PACKAGE_SPEC_VERSION } from './src/types';
import { DEFAULT_SETTINGS, mergeSettings } from './src/settings/settings';
import { PromptColorizerSettingTab } from './src/settings/setting-tab';
import { createEditorExtension, collectAllMatches } from './src/highlighter/editor-extension';
import {
  colorizeFileExplorer,
  clearFileExplorerColors,
  colorizeTabTitle,
  observeFileExplorerRedraw,
  stopFileExplorerObservers,
} from './src/highlighter/file-colorizer';
import { createPostProcessor } from './src/reader/post-processor';
import { setLanguage, t } from './src/utils/i18n';
import {
  openColorPickerModal,
  createCustomTextColor,
} from './src/ui/color-picker-modal';
import {
  showColorPopover,
  hideColorPopover,
  addColorMenuItems,
} from './src/ui/color-popover';
import { ColorMapView, activateColorMapView, VIEW_TYPE_COLOR_MAP } from './src/ui/color-map-view';
import {
  generateCustomTextColorsCss,
  findMatchingCustomColorIds,
} from './src/highlighter/custom-text-colors';
import { PackageManager } from './src/packages/package-manager';
import { ruleIdToDef } from './src/packages/pkg-io';
import { generatePackageOverrideCss } from './src/packages/package-override-css';
import {
  exportFullSettings,
  exportCustomTextColors,
  exportFolderMappings,
  parseExportPackage,
  applyImportedFullSettings,
} from './src/utils/data-portability';
import { IntegrationManager } from './src/integrations';

// 规则引擎模块
import { RuleMatcher } from './src/rule-engine/matcher';
import { compileRuleSet, loadBuiltinRules, generateStyleCss, generateColorVariables, generateColorBlindAssistCss } from './src/rule-engine/rule-compiler';
import { CSS_TO_KEY } from './src/highlighter/rule-key-map';
import { getRuleDisplayName as getBuiltinRuleDisplayName } from './src/packages/rule-id-names';
import type { RuleSet, StyleRule, ColorToken, RuleMatchResult } from './src/rule-engine/types';
import type { LoadedPackage } from './src/types';
import { LocalCache } from './src/cache/local-cache';
import { fetchRemoteVersion, fetchRuleFilesWithReport, compareVersions, calculateHash, parseRuleCategories } from './src/fetcher/git-fetch';
import type { RemoteVersionInfo, LocalVersionInfo, PullReportData } from './src/rule-engine/types';

export default class PromptColorizer extends Plugin {
  settings: PromptColorizerSettings;
  private editorExtensions: Extension[] = [];

  /** 规则匹配器实例（核心引擎） */
  private matcher: RuleMatcher;
  /** 本地缓存管理器 */
  private cache: LocalCache;
  /** 当前规则集（运行时合并产物 = baseRuleSet + 启用包自定义规则；不持久化） */
  currentRuleSet: RuleSet | null = null;
  /** 基础规则集（YAML 编译产物，不含包自定义规则；作为资源池供包驱动派生） */
  private baseRuleSet: RuleSet | null = null;
  /** 自动更新定时器 ID */
  private autoUpdateTimerId: number | null = null;
  /** 动态注入的 DSL 样式元素 */
  private dslStyleEl: HTMLStyleElement | null = null;
  /** 动态注入的 DSL 颜色变量元素（由 YAML colors 区块生成） */
  private dslColorVarEl: HTMLStyleElement | null = null;
  /** 动态注入的自定义文本颜色样式元素（由 customTextColors 生成） */
  private customTextStyleEl: HTMLStyleElement | null = null;

  /** 包管理器（v5 包管理模块） */
  pkgManager: PackageManager;
  /** 已加载包缓存（导图面板与渲染覆盖层共用） */
  loadedPackages: LoadedPackage[] = [];
  /** 动态注入的包样式覆盖层元素（由启用包 tokenOverrides/ruleOverrides 合并生成） */
  private pkgOverrideStyleEl: HTMLStyleElement | null = null;
  /** 插件联动管理器(P1-7 Templater/Dataview 集成) */
  private integrationManager: IntegrationManager | null = null;

  async onload(): Promise<void> {
    // 1. 加载设置
    await this.loadSettings();

    // 2. 设置语言
    setLanguage(this.settings.language);

    // 3. 应用颜色模式
    this.applyColorMode();

    // 3.5 应用自定义颜色覆盖
    this.applyCustomColors();

    // 3.6 应用自定义文本颜色样式
    this.applyCustomTextColorsStyles();

    // 3.7 应用词汇令牌颜色覆盖样式

    // 4. 初始化规则引擎
    this.matcher = new RuleMatcher();
    this.cache = new LocalCache(this.app, this.manifest.id);

    // 5. 加载规则（同步优先加载内置规则，异步再更新）
    await this.initRules();

    // 5.5 初始化包管理器：加载内置包 + 用户包（旧索引自动迁移为自包含分类文件），
    //     包内嵌资源自动注册进全局本体，应用启用包样式覆盖层
    this.pkgManager = new PackageManager(
      this.app,
      () => this.settings,
      (id) => ruleIdToDef(this, id),
      () => new Set((this.currentRuleSet?.rules ?? []).map((r) => r.id))
    );
    // 5.5.1 一次性迁移：旧全局令牌/规则 → 迁移包（包驱动前置）
    await this.migrateLegacyGlobalResources();
    await this.reloadPackages();


    // 6. 注册编辑器扩展（传入 matcher）
    this.editorExtensions = createEditorExtension(this.settings, this.matcher, this);
    this.registerEditorExtension(this.editorExtensions);

    // 7. 注册阅读模式后处理器（传入 matcher）
    this.registerMarkdownPostProcessor(createPostProcessor(this.settings, this.matcher));

    // 8. 注册设置面板
    this.addSettingTab(new PromptColorizerSettingTab(this.app, this));

    // 8.5 注册颜色导图侧边栏视图
    this.registerView(
      VIEW_TYPE_COLOR_MAP,
      (leaf) => new ColorMapView(leaf, this)
    );

    // 9. 注册命令
    this.registerCommands();

    // 10. 注册 Ribbon 图标
    this.addRibbonIcon('palette', t('command.refresh'), () => {
      this.refreshAll();
    });

    // 10.5 注册颜色导图 Ribbon 图标
    this.addRibbonIcon('map', t('colorMap.title'), () => {
      activateColorMapView(this.app);
    });

    // 11. 注册事件
    this.registerEvent(
      this.app.workspace.on('active-leaf-change', (leaf: WorkspaceLeaf | null) => {
        this.onActiveLeafChange(leaf);
      })
    );

    this.registerEvent(
      this.app.vault.on('create', () => {
        this.refreshFileColorizer();
      })
    );

    this.registerEvent(
      this.app.vault.on('rename', () => {
        this.refreshFileColorizer();
      })
    );

    this.registerEvent(
      this.app.metadataCache.on('changed', () => {
        this.refreshFileColorizer();
      })
    );

    // 11.1 注册编辑器右键菜单（为选中文本应用/移除颜色）
    this.registerEvent(
      this.app.workspace.on('editor-menu', (menu: Menu, editor: Editor) => {
        this.onEditorMenu(menu, editor);
      })
    );

    // 11.2 监听编辑器选区变化（自动弹出浮动颜色面板）
    // 注：'editor-selection-change' 事件 Obsidian 运行时支持但类型定义未导出
    // 使用 @ts-expect-comment 绕过类型检查
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.registerEvent(
      this.app.workspace.on('editor-selection-change' as never, (editor: Editor) => {
        this.onEditorSelectionChange(editor);
      })
    );

    // 12. 布局就绪后初始化
    this.app.workspace.onLayoutReady(() => {
      this.refreshFileColorizer();
      // 如果是远程模式，启动时检查更新
      if (this.settings.ruleSource === 'remote' && this.settings.autoUpdateRules) {
        this.checkForUpdates(false);
      }
      // 设置自动更新定时器
      this.setupAutoUpdateTimer();

      // P1-7: 初始化插件联动(Templater/Dataview)
      this.initIntegrations();
    });
  }

  async onunload(): Promise<void> {
    // 停止文件浏览器重渲染观察者
    stopFileExplorerObservers();

    // 清理文件浏览器颜色
    clearFileExplorerColors(this.app);

    // P1-7: 清理插件联动
    this.cleanupIntegrations();

    // 移除颜色模式 class
    document.body.removeClass('prompt-colorizer-light', 'prompt-colorizer-dark');
    document.body.removeClass('pc-light', 'pc-dark');

    // 清理自定义颜色覆盖
    this.resetCustomColors();

    // 清理定时器
    if (this.autoUpdateTimerId !== null) {
      window.clearInterval(this.autoUpdateTimerId);
      this.autoUpdateTimerId = null;
    }

    // 清理动态样式
    if (this.dslStyleEl) {
      this.dslStyleEl.remove();
      this.dslStyleEl = null;
    }
    // 清理动态颜色变量
    if (this.dslColorVarEl) {
      this.dslColorVarEl.remove();
      this.dslColorVarEl = null;
    }
    // 清理自定义文本颜色样式
    if (this.customTextStyleEl) {
      this.customTextStyleEl.remove();
      this.customTextStyleEl = null;
    }
    // 清理包样式覆盖层
    if (this.pkgOverrideStyleEl) {
      this.pkgOverrideStyleEl.remove();
      this.pkgOverrideStyleEl = null;
    }

    // 清理浮动面板
    hideColorPopover();
    if (this.popoverTimerId !== null) {
      window.clearTimeout(this.popoverTimerId);
      this.popoverTimerId = null;
    }
  }

  // ============================================================
  // 规则引擎初始化与管理
  // ============================================================

  /**
   * 应用规则集并刷新渲染链（编译→baseRuleSet 同步→追加包规则→matcher→样式→扩展）。
   * initRules 调用时 refresh=false（onload 尚未注册扩展）；其余调用 refresh=true。
   */
  private applyRuleSetAndRefresh(ruleSet: RuleSet, refresh: boolean = true): void {
    this.baseRuleSet = ruleSet;
    this.currentRuleSet = { ...ruleSet, rules: [...ruleSet.rules], styleRules: { ...ruleSet.styleRules } };
    this.appendCustomRules();
    this.matcher.setRuleSet(this.currentRuleSet);
    this.applyDynamicColorVariables(ruleSet.colorTokens);
    this.applyDynamicStyles(ruleSet.styleRules, ruleSet.colorTokens);
    if (refresh) this.refreshEditorExtensions();
  }

  /**
   * 初始化规则引擎
   * 按优先级尝试加载规则：本地缓存 → 内置规则
   * 如果配置了远程模式，异步检查更新
   */
  private async initRules(): Promise<void> {
    let ruleSet: RuleSet | null = null;

    // 尝试从本地缓存加载
    if (this.settings.ruleSource !== 'builtin') {
      const cachedFiles = await this.cache.loadRuleFiles();
      if (cachedFiles) {
        const versionInfo = await this.cache.loadVersion();
        ruleSet = compileRuleSet(
          cachedFiles,
          versionInfo?.version ?? '',
          versionInfo?.updateTime ?? ''
        );
      }
    }

    // 缓存不可用，使用内置规则
    if (!ruleSet) {
      ruleSet = loadBuiltinRules();
    }

    if (ruleSet) {
      this.applyRuleSetAndRefresh(ruleSet, false);
    }
  }

  /**
   * 包管理模块（v5）：从 baseRuleSet 重建 currentRuleSet，追加 settings.customRules。
   * 包驱动下 customRules 是启用包内嵌规则的聚合缓存（reloadPackages 重建）。
   * 每次调用从 baseRuleSet.rules 重置，避免包切换后旧规则残留。
   */
  appendCustomRules(): void {
    if (!this.baseRuleSet || !this.currentRuleSet) return;
    const defs = this.settings.customRules ?? [];
    // 从 baseRuleSet 重置 rules（清除上一轮包自定义规则）
    this.currentRuleSet.rules = [...this.baseRuleSet.rules];
    for (const def of defs) {
      if (!def?.id || !def.regex || !def.cssClass) continue;
      // 跳过与 baseRuleSet 重复的 ID（YAML 本体优先）
      if (this.baseRuleSet.rules.some((r) => r.id === def.id)) continue;
      let regex: RegExp;
      try {
        regex = new RegExp(def.regex, def.flags ?? '');
      } catch {
        continue;
      }
      this.currentRuleSet.rules.push({
        id: def.id,
        regex,
        cssClass: def.cssClass,
        priority: def.priority ?? 20,
        blockLevel: false,
        captureGroup: def.captureGroup ?? 0,
      });
      if (def.style) {
        this.currentRuleSet.styleRules[def.cssClass] = {
          ...(this.baseRuleSet.styleRules[def.cssClass] ?? {}),
          ...def.style,
        };
      }
    }
  }

  /**
   * 应用动态颜色变量
   * 从 YAML colors 区块生成 CSS 变量定义并注入到文档头部
   * v2.9：经由 applyDynamicColorVariablesWith 统一走色板合并链路
   * @param colorTokens 颜色令牌定义映射
   */
  private applyDynamicColorVariables(colorTokens: Record<string, ColorToken>): void {
    if (this.currentRuleSet) {
      this.applyDynamicColorVariablesWith(colorTokens, this.currentRuleSet.styleRules);
      return;
    }
    // 无规则集时仅注入变量（兜底）
    if (this.dslColorVarEl) {
      this.dslColorVarEl.remove();
    }
    const css = generateColorVariables(colorTokens, this.settings.colorScheme, this.settings.tokenDeriveAlphas ?? {});
    if (!css) return;
    this.dslColorVarEl = document.createElement('style');
    this.dslColorVarEl.id = 'prompt-colorizer-color-vars';
    this.dslColorVarEl.textContent = css;
    document.head.appendChild(this.dslColorVarEl);
    this.applyCustomColors();
  }

  /**
   * 应用动态样式
   * 从规则集的 styleRules 生成 CSS 并注入到文档头部
   * 颜色令牌引用会被自动解析为 var(--dsl-xxx) 格式
   * @param styleRules 样式规则映射
   * @param colorTokens 颜色令牌定义（用于解析令牌引用）
   */
  private applyDynamicStyles(
    styleRules: Record<string, StyleRule>,
    colorTokens: Record<string, ColorToken> = {}
  ): void {
    // 移除旧的动态样式
    if (this.dslStyleEl) {
      this.dslStyleEl.remove();
    }

    // 按令牌启用状态过滤 styleRules：禁用令牌引用的规则不生成 CSS
    const filteredRules = this.filterStyleRulesByTokenEnabled(styleRules);

    // 生成并注入新样式（传入 colorTokens 解析令牌引用）
    const css = generateStyleCss(filteredRules, colorTokens);
    this.dslStyleEl = document.createElement('style');
    this.dslStyleEl.id = 'prompt-colorizer-dsl-styles';
    this.dslStyleEl.textContent = css;
    document.head.appendChild(this.dslStyleEl);
  }

  /**
   * 按令牌启用状态过滤 styleRules
   * 禁用令牌引用的 styleRule 不生成 CSS（真正关闭高亮）
   */
  private filterStyleRulesByTokenEnabled(
    styleRules: Record<string, StyleRule>
  ): Record<string, StyleRule> {
    const tokenEnabled = this.settings.tokenEnabled ?? {};
    const disabledTokens = Object.entries(tokenEnabled)
      .filter(([, v]) => !v)
      .map(([k]) => k);
    if (disabledTokens.length === 0) return styleRules;

    const result: Record<string, StyleRule> = {};
    for (const [className, rule] of Object.entries(styleRules)) {
      const ruleStr = JSON.stringify(rule);
      const disabled = disabledTokens.some((tn) => new RegExp(`\\b${tn}\\b`).test(ruleStr));
      if (!disabled) result[className] = rule;
    }
    return result;
  }

  /**
   * 解析当前激活的规则源(P1-6 多源切换)
   * 优先从 ruleSources 中按 activeRuleSourceId 查找
   * 未配置或未找到时降级为 gitRawBaseUrl + gitToken
   * @returns { url, token } 当前激活源的 URL 与可选 token
   */
  private getActiveRuleSource(): { url: string; token: string | undefined } {
    const sources = this.settings.ruleSources ?? [];
    const activeId = this.settings.activeRuleSourceId;
    const activeSource = sources.find((s) => s.id === activeId && s.enabled);

    // 优先用激活源的 URL
    const url = activeSource?.rawBaseUrl ?? this.settings.gitRawBaseUrl;

    // token 认证:全局启用 token 且当前源需要认证时注入
    const token =
      this.settings.gitTokenEnabled && this.settings.gitToken
        ? this.settings.gitToken
        : undefined;

    return { url, token };
  }

  /**
   * 检查远程规则更新（带拉取报告）
   * @param showNotice 是否显示通知（手动触发时为 true）
   */
  async checkForUpdates(showNotice: boolean = true): Promise<void> {
    // P1-6: 校验激活源 URL,而非仅检查 gitRawBaseUrl
    const { url: sourceUrl, token: sourceToken } = this.getActiveRuleSource();
    if (!sourceUrl) {
      if (showNotice) {
        new Notice(t('notice.noGitUrl'));
      }
      return;
    }

    const startTime = Date.now();

    try {
      if (showNotice) {
        new Notice(t('notice.checkingUpdates'));
      }

      // P1-6: 使用激活源 URL 与 token 拉取远程版本信息
      const remoteVersion = await fetchRemoteVersion(sourceUrl, sourceToken);
      if (!remoteVersion) {
        // 生成失败报告
        await this.savePullReport({
          timestamp: Date.now(),
          success: false,
          remoteVersion: '',
          remoteUpdateTime: '',
          remoteHash: '',
          localVersion: (await this.cache.loadVersion())?.version ?? null,
          hasUpdate: false,
          files: [],
          categories: [],
          totalFiles: 5,
          successFiles: 0,
          totalRules: 0,
          duration: Date.now() - startTime,
          error: '无法获取远程版本信息',
        });

        if (showNotice) {
          new Notice(t('notice.fetchFailed'));
        }
        return;
      }

      // 获取本地版本
      const localVersion = await this.cache.loadVersion();

      // 对比版本
      const hasUpdate = compareVersions(localVersion, remoteVersion);

      if (!hasUpdate) {
        // 版本一致，生成"无需更新"报告
        await this.savePullReport({
          timestamp: Date.now(),
          success: true,
          remoteVersion: remoteVersion.version,
          remoteUpdateTime: remoteVersion.updateTime,
          remoteHash: remoteVersion.hash ?? '',
          localVersion: localVersion?.version ?? null,
          hasUpdate: false,
          files: [],
          categories: [],
          totalFiles: 5,
          successFiles: 5,
          totalRules: 0,
          duration: Date.now() - startTime,
        });

        if (showNotice) {
          new Notice(t('notice.alreadyLatest'));
        }
        this.settings.lastCheckTime = Date.now();
        await this.saveSettings();
        return;
      }

      // 需要更新，拉取规则文件（带报告）
      if (showNotice) {
        new Notice(t('notice.downloading'));
      }

      // P1-5: 拉取前备份当前缓存,编译失败时回滚
      const hasBackup = await this.cache.backupCurrentCache();

      // P1-6: 使用当前激活源拉取规则文件(含 token 认证)
      const { files, results } = await fetchRuleFilesWithReport(sourceUrl, sourceToken);

      // 解析分类统计
      const categories = files ? parseRuleCategories(files) : [];

      if (!files) {
        // 部分或全部文件拉取失败
        const successCount = results.filter((r) => r.success).length;

        await this.savePullReport({
          timestamp: Date.now(),
          success: false,
          remoteVersion: remoteVersion.version,
          remoteUpdateTime: remoteVersion.updateTime,
          remoteHash: remoteVersion.hash ?? '',
          localVersion: localVersion?.version ?? null,
          hasUpdate: true,
          files: results,
          categories,
          totalFiles: 5,
          successFiles: successCount,
          totalRules: 0,duration: Date.now() - startTime,
          error: `${successCount}/5 个文件拉取成功`,
        });

        if (showNotice) {
          new Notice(t('notice.downloadFailed'));
        }
        return;
      }

      // 全部成功，保存到本地缓存（如果启用下载到缓存）
      const localInfo: LocalVersionInfo = {
        version: remoteVersion.version,
        updateTime: remoteVersion.updateTime,
        hash: remoteVersion.hash || calculateHash(Object.values(files).join('')),
        fetchedAt: Date.now(),
      };

      if (this.settings.downloadToCache) {
        await this.cache.saveRuleFiles(files);
        await this.cache.saveVersion(localInfo);
      }

      // 编译并应用新规则
      const ruleSet = compileRuleSet(files, localInfo.version, localInfo.updateTime);
      if (ruleSet) {
        this.applyRuleSetAndRefresh(ruleSet);
        this.settings.lastCheckTime = Date.now();

        // 统计总规则数
        const totalRules = ruleSet.rules.length + ruleSet.contextRules.length;

        // 生成成功报告
        await this.savePullReport({
          timestamp: Date.now(),
          success: true,
          remoteVersion: remoteVersion.version,
          remoteUpdateTime: remoteVersion.updateTime,
          remoteHash: remoteVersion.hash ?? '',
          localVersion: localVersion?.version ?? null,
          hasUpdate: true,
          files: results,
          categories,
          totalFiles: 5,
          successFiles: 5,
          totalRules,duration: Date.now() - startTime,
        });

        await this.saveSettings();

        if (showNotice) {
          new Notice(t('notice.updateSuccess') + ` v${localInfo.version}`);
        }
      } else {
        // P1-5: 编译失败,自动回滚到上一版本缓存
        if (hasBackup) {
          const rolledBack = await this.cache.rollbackToPrevCache();
          if (rolledBack) {
            // 重新从回滚后的缓存编译规则,恢复上一版本可用状态
            const prevFiles = await this.cache.loadRuleFiles();
            const prevVersion = await this.cache.loadVersion();
            if (prevFiles && prevVersion) {
              const prevRuleSet = compileRuleSet(
                prevFiles,
                prevVersion.version,
                prevVersion.updateTime
              );
              if (prevRuleSet) {
                this.applyRuleSetAndRefresh(prevRuleSet);
              }
            }
            if (showNotice) {
              new Notice(t('notice.compileFailed') + '(已回滚到上一版本)', 5000);
            }
          } else {
            if (showNotice) {
              new Notice(t('notice.compileFailed'));
            }
          }
        } else {
          if (showNotice) {
            new Notice(t('notice.compileFailed'));
          }
        }

        // 编译失败
        await this.savePullReport({
          timestamp: Date.now(),
          success: false,
          remoteVersion: remoteVersion.version,
          remoteUpdateTime: remoteVersion.updateTime,
          remoteHash: remoteVersion.hash ?? '',
          localVersion: localVersion?.version ?? null,
          hasUpdate: true,
          files: results,
          categories,
          totalFiles: 5,
          successFiles: 5,
          totalRules: 0,duration: Date.now() - startTime,
          error: '规则编译失败',
        });
      }
    } catch (e) {
      console.error('[PromptColorizer] 规则更新失败:', e);

      // 生成异常报告
      await this.savePullReport({
        timestamp: Date.now(),
        success: false,
        remoteVersion: '',
        remoteUpdateTime: '',
        remoteHash: '',
        localVersion: (await this.cache.loadVersion())?.version ?? null,
        hasUpdate: false,
        files: [],
        categories: [],
        totalFiles: 5,
        successFiles: 0,
        totalRules: 0,
        duration: Date.now() - startTime,
        error: e instanceof Error ? e.message : String(e),
      });

      if (showNotice) {
        // 显示真实错误信息，便于用户诊断（原仅显示"规则更新出错"，无法定位问题）
        const errMsg = e instanceof Error ? e.message : String(e);
        new Notice(t('notice.updateError') + `: ${errMsg}`, 8000);
      }
    }
  }

  /**
   * 保存拉取报告到设置
   */
  private async savePullReport(report: PullReportData): Promise<void> {
    if (this.settings.gitReportEnabled) {
      this.settings.lastPullReport = JSON.stringify(report);
      await this.saveSettings();
    }
  }

  /**
   * 获取上次拉取报告
   */
  getPullReport(): PullReportData | null {
    if (!this.settings.lastPullReport) return null;
    try {
      return JSON.parse(this.settings.lastPullReport) as PullReportData;
    } catch {
      return null;
    }
  }

  /**
   * 强制重新加载规则
   * 从本地缓存重新编译规则
   */
  async reloadRules(): Promise<void> {
    await this.initRules();
    this.refreshEditorExtensions();
  }

  /**
   * 清空本地缓存
   */
  async clearRuleCache(): Promise<void> {
    await this.cache.clearCache();
    // 回退到内置规则
    const ruleSet = loadBuiltinRules();
    if (ruleSet) {
      this.applyRuleSetAndRefresh(ruleSet);
    }
  }

  /**
   * 设置自动更新定时器
   */
  private setupAutoUpdateTimer(): void {
    // 清理旧定时器
    if (this.autoUpdateTimerId !== null) {
      window.clearInterval(this.autoUpdateTimerId);
      this.autoUpdateTimerId = null;
    }

    if (this.settings.autoUpdateRules && this.settings.ruleSource === 'remote') {
      const intervalMs = this.settings.autoUpdateInterval * 3600 * 1000;
      this.autoUpdateTimerId = window.setInterval(() => {
        this.checkForUpdates(false);
      }, intervalMs);
      // 注册定时器以便 Obsidian 自动清理
      this.registerInterval(this.autoUpdateTimerId);
    }
  }

  // ============================================================
  // 设置管理
  // ============================================================

  /**
   * 加载设置
   */
  async loadSettings(): Promise<void> {
    this.settings = mergeSettings(DEFAULT_SETTINGS, await this.loadData());
  }

  /**
   * 保存设置
   */
  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  /**
   * 国际化翻译函数
   */
  t(key: string): string {
    return t(key);
  }

  // ============================================================
  // 插件联动(P1-7)
  // ============================================================

  /**
   * 初始化插件联动
   * 在布局就绪后调用,检测 Templater/Dataview 并注册集成
   */
  private async initIntegrations(): Promise<void> {
    this.integrationManager = new IntegrationManager(this.app, this.settings);
    await this.integrationManager.initIntegrations();
  }

  /**
   * 清理插件联动
   * 在插件卸载时调用,移除注册的函数与 DOM 标记
   */
  private cleanupIntegrations(): void {
    this.integrationManager?.cleanup();
    this.integrationManager = null;
  }

  // ============================================================
  // 命令注册
  // ============================================================

  /**
   * 注册命令
   */
  private registerCommands(): void {
    // 命令分组前缀(在命令面板中视觉分组: 提示词着色 ›)
    const prefix = t('command.groupPrefix');

    this.addCommand({
      id: 'refresh-coloring',
      name: prefix + t('command.refresh'),
      callback: () => {
        this.refreshAll();
        new Notice(t('notice.refreshed'));
      },
    });

    this.addCommand({
      id: 'toggle-editor-highlight',
      name: prefix + t('command.toggleHighlight'),
      callback: () => {
        this.settings.editorHighlightEnabled = !this.settings.editorHighlightEnabled;
        this.saveSettings();
        this.refreshEditorExtensions();
        new Notice(
          this.settings.editorHighlightEnabled
            ? t('notice.enabled')
            : t('notice.disabled')
        );
      },
    });

    this.addCommand({
      id: 'update-rules',
      name: prefix + t('command.updateRules'),
      callback: () => {
        this.checkForUpdates(true);
      },
    });

    this.addCommand({
      id: 'reload-rules',
      name: prefix + t('command.reloadRules'),
      callback: () => {
        this.reloadRules();
        new Notice(t('notice.rulesReloaded'));
      },
    });

    // 自定义文本颜色命令：为选中文本应用颜色
    this.addCommand({
      id: 'apply-color-to-selection',
      name: prefix + t('customText.cmdApply'),
      editorCallback: (editor: Editor) => {
        this.applyColorToSelection(editor);
      },
    });

    // 自定义文本颜色命令：移除选中文本的颜色
    this.addCommand({
      id: 'remove-color-from-selection',
      name: prefix + t('customText.cmdRemove'),
      editorCallback: (editor: Editor) => {
        this.removeColorFromSelection(editor);
      },
    });

    // 数据导出/导入命令(P1-4)
    this.addCommand({
      id: 'export-full-settings',
      name: prefix + t('command.exportFull'),
      callback: async () => {
        try {
          await exportFullSettings(this.settings, this.manifest.version, this.app);
        } catch (err) {
          new Notice(`${t('notice.exportFailed')}: ${err instanceof Error ? err.message : String(err)}`);
        }
      },
    });

    this.addCommand({
      id: 'import-full-settings',
      name: prefix + t('command.importFull'),
      editorCallback: async (editor: Editor) => {
        try {
          await this.importSettingsFromCurrentFile(editor);
        } catch (err) {
          new Notice(`${t('notice.importFailed')}: ${err instanceof Error ? err.message : String(err)}`);
        }
      },
    });

    this.addCommand({
      id: 'export-custom-text-colors',
      name: prefix + t('command.exportCustomTextColors'),
      callback: async () => {
        try {
          await exportCustomTextColors(
            this.settings.customTextColors ?? [],
            this.manifest.version,
            this.app
          );
        } catch (err) {
          new Notice(`${t('notice.exportFailed')}: ${err instanceof Error ? err.message : String(err)}`);
        }
      },
    });

    this.addCommand({
      id: 'export-folder-mappings',
      name: prefix + t('command.exportFolderMappings'),
      callback: async () => {
        try {
          await exportFolderMappings(
            this.settings.folderMappings ?? [],
            this.manifest.version,
            this.app
          );
        } catch (err) {
          new Notice(`${t('notice.exportFailed')}: ${err instanceof Error ? err.message : String(err)}`);
        }
      },
    });

    // 打开颜色导图侧边栏面板
    this.addCommand({
      id: 'open-color-map-panel',
      name: prefix + t('colorMap.openPanel'),
      callback: () => {
        activateColorMapView(this.app);
      },
    });
  }

  /**
   * 从当前打开的文件导入全量设置
   * 要求用户先打开一个有效的 JSON 导出文件,再执行此命令
   */
  private async importSettingsFromCurrentFile(editor: Editor): Promise<void> {
    const file = this.app.workspace.getActiveFile();
    if (!file) {
      new Notice(t('notice.importFileError'));
      return;
    }

    let content: string;
    try {
      content = await this.app.vault.read(file);
    } catch {
      new Notice(t('notice.importFileError'));
      return;
    }

    const pkg = parseExportPackage(content);
    if (!pkg) {
      new Notice(t('notice.importInvalidFormat'));
      return;
    }

    try {
      const newSettings = applyImportedFullSettings(pkg, this.settings);
      this.settings = newSettings;
      await this.saveSettings();

      // 应用导入的设置
      this.applyColorMode();
      this.applyCustomColors();
      this.applyCustomTextColorsStyles();
      await this.initRules();
      this.refreshEditorExtensions();
      this.refreshAll();

      new Notice(t('notice.importSuccess'), 4000);
    } catch (err) {
      new Notice(`${t('notice.importFailed')}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // ============================================================
  // 包管理模块（v5）
  // ============================================================

  /**
   * 包驱动：令牌编辑后同步写回当前唯一启用包（多包/无包时令牌保留在全局 settings，不写包）。
   * settings.customTextColors 是派生缓存，需写回包目录才能持久化（否则 reloadPackages 覆盖）。
   * 无包/多包场景：令牌本就属于全局（不属于任何包），保留在 settings 即可持久化。
   */
  private async syncTokensToActivePackage(): Promise<void> {
    if (!this.pkgManager) return;
    const enabled = this.pkgManager.getEnabledPackages(this.loadedPackages);
    if (enabled.length === 1) {
      const pkg = enabled[0];
      if (!pkg.manifest) return;
      await this.pkgManager.writePackage(
        pkg.dirName,
        pkg.manifest,
        this.settings.customTextColors,
        pkg.embeddedRules ?? []
      );
    }
    await this.saveSettings();
    await this.reloadPackages();
  }

  /**
   * 一次性迁移：旧全局 customTextColors/customRules → 迁移包 __migrated__。
   * 包驱动后规则只从启用包读取，旧全局规则若不迁移会在 reloadPackages 时被清空。
   * 迁移包自动启用，用户旧资源立即生效。
   * 令牌本就属于全局，迁移失败时保留在 settings 不丢失（下次启动重试）。
   */
  private async migrateLegacyGlobalResources(): Promise<void> {
    if (this.settings.legacyResourcesMigrated) return;
    const tokens = this.settings.customTextColors ?? [];
    const rules = this.settings.customRules ?? [];
    if (tokens.length === 0 && rules.length === 0) {
      this.settings.legacyResourcesMigrated = true;
      await this.saveSettings();
      return;
    }
    try {
      const manifest: PackageManifest = {
        packageId: '__migrated__',
        name: '旧数据迁移包',
        tagColor: '#44AAFF',
        description: `升级时自动迁移的旧令牌（${tokens.length}）与规则（${rules.length}）`,
        version: '1.0.0',
        specVersion: PACKAGE_SPEC_VERSION,
        type: 'user',
        usageTag: '旧数据迁移',
        previewSampleText: '',

        ruleOverrides: {},
      };
      await this.pkgManager.createPackage(manifest, tokens, rules);
      this.settings.enabledPackageIds = ['__migrated__'];
      this.settings.legacyResourcesMigrated = true;
      await this.saveSettings();
      new Notice('已将旧令牌/规则迁移到「旧数据迁移包」并自动启用');
    } catch (e) {
      // 迁移失败不阻塞启动，但不置标志 → 下次启动重试；令牌保留在全局 settings 不丢失
      console.error('[PromptColorizer] 旧数据迁移失败，下次启动将重试:', e);
      new Notice('旧数据迁移失败，将在下次启动重试（数据未丢失）', 5000);
    }
  }

  /**
   * 重新扫描加载全部包（内置 + 用户目录）并应用启用包样式覆盖层。
   * 包驱动：加载后重建全局令牌/规则缓存为启用包内嵌资源的聚合（没包→空→零高亮）。
   * 供启动、导图操作（导入/删除/克隆/勾选变化）后调用。
   */
  async reloadPackages(): Promise<void> {
    try {
      const { packages } = await this.pkgManager.loadAll();
      this.loadedPackages = packages;
    } catch {
      this.loadedPackages = [];
    }
    // 重建派生缓存：settings.customTextColors/customRules = 启用包聚合
    this.rebuildCacheFromEnabledPackages();
    this.applyCustomTextColorsStyles();
    this.refreshEditorExtensions();
    this.applyPackageScopes();
    this.applyPackageOverrideStyles();
  }

  /**
   * 重建全局规则缓存为启用包内嵌资源的聚合（派生缓存，包目录是规则唯一真相源）。
   * 令牌（customTextColors）属于全局资源，不随包启停清空——保留全局游离令牌，
   * 合并启用包内嵌令牌（ID 去重，包内优先）。
   * 规则（customRules）包驱动：没启用包 → 置空 → 零规则高亮。
   */
  private rebuildCacheFromEnabledPackages(): void {
    const enabled = this.pkgManager?.getEnabledPackages(this.loadedPackages) ?? [];
    const rules: CustomRuleDef[] = [];
    const seenRuleIds = new Set<string>();
    for (const pkg of enabled) {
      for (const r of pkg.embeddedRules ?? []) {
        if (r?.id && !seenRuleIds.has(r.id)) {
          rules.push(structuredClone(r));
          seenRuleIds.add(r.id);
        }
      }
    }
    // 令牌：包内嵌令牌（去重）∪ 全局游离令牌（不在任何启用包内的）
    const packageTokenIds = new Set<string>();
    const packageTokens: CustomTextColor[] = [];
    const seenTokenIds = new Set<string>();
    for (const pkg of enabled) {
      for (const t of pkg.embeddedTokens ?? []) {
        if (t?.id && !seenTokenIds.has(t.id)) {
          packageTokens.push(structuredClone(t));
          seenTokenIds.add(t.id);
          packageTokenIds.add(t.id);
        }
      }
    }
    const globalTokens = (this.settings.customTextColors ?? []).filter(
      (t) => t?.id && !packageTokenIds.has(t.id)
    );
    this.settings.customTextColors = [...packageTokens, ...globalTokens];
    this.settings.customRules = rules;
    // 重建 customRules 后重新编译进 currentRuleSet
    this.appendCustomRules();
    if (this.matcher && this.currentRuleSet) {
      this.matcher.setRuleSet(this.currentRuleSet);
    }
  }

  /**
   * 同步包作用域到规则匹配器：
   * 内置 YAML 规则始终作为底座生效（插件本体功能）；
   * 包规则为用户自定义增补层，按启用包过滤。
   * 未启用任何包 → null 作用域 → 回退全局开关（内置规则 + 全局令牌全生效）。
   * 启用包 → 作用域 = 内置规则 ID ∪ 包规则 ID（内置始终生效，包规则按启用过滤）。
   * matcher 为编辑器/阅读/导图三链路共用实例，作用域自动全局生效。
   */
  applyPackageScopes(): void {
    if (!this.matcher || !this.pkgManager) return;
    const enabled = this.pkgManager.getEnabledPackages(this.loadedPackages);
    if (enabled.length === 0) {
      // 没启用包 → null → 回退全局开关（内置规则 + 全局令牌全生效）
      this.matcher.setRuleIdScope(null);
      this.matcher.setTokenIdScope(null);
      return;
    }
    const { tokenIds, ruleIds } = this.pkgManager.collectEnabledRefIds(enabled);
    // 内置规则始终在白名单内（底座），包规则按启用过滤
    const baseRuleIds = new Set((this.baseRuleSet?.rules ?? []).map((r) => r.id));
    for (const id of baseRuleIds) ruleIds.add(id);
    // 全局令牌始终在白名单内（令牌不属于任何包）
    const globalTokenIds = new Set((this.settings.customTextColors ?? []).map((c) => c.id));
    for (const id of globalTokenIds) tokenIds.add(id);
    this.matcher.setRuleIdScope(ruleIds);
    this.matcher.setTokenIdScope(tokenIds);
  }


  /** 获取规则 ID → CSS 类名映射（内置规则集 + 全部包内嵌规则并集，供包详情引用区与覆盖层容错过滤） */
  getRuleIdToCssClassMap(): Record<string, string> {
    const map: Record<string, string> = {};
    const rules = this.currentRuleSet?.rules ?? [];
    for (const r of rules) {
      if (r?.id && r?.cssClass) map[r.id] = r.cssClass;
    }
    // 包独有规则（未启用包内嵌本体也可见可勾选）
    for (const pkg of this.loadedPackages ?? []) {
      for (const r of pkg.embeddedRules ?? []) {
        if (r?.id && r?.cssClass && !(r.id in map)) {
          map[r.id] = r.cssClass;
        }
      }
    }
    return map;
  }

  /**
   * 获取规则显示名（优先级：包内嵌规则 name → 内置映射）。
   * 中文名定义在包数据（rules/*.json 的 name 字段），插件加载时自动解析；
   * 未定义时回退 rule-id-names 注册表，仍无则显示原始 ID。
   */
  getRuleDisplayName(ruleId: string): string {
    // 1. 包数据优先（name 为用户可编辑的中文名）
    for (const pkg of this.loadedPackages ?? []) {
      for (const r of pkg.embeddedRules ?? []) {
        if (r?.id === ruleId && r.name && r.name !== r.id) {
          return r.name;
        }
      }
    }
    // 2. 内置注册表回退
    return getBuiltinRuleDisplayName(ruleId);
  }

  /**
   * 应用启用包样式覆盖层：
   * 收集启用包引用 ID → 合并 tokenOverrides/ruleOverrides（按优先级自上而下）
   * → 生成覆盖 CSS 注入。失效 ID 直接跳过，不阻塞渲染。
   */
  applyPackageOverrideStyles(): void {
    if (this.pkgOverrideStyleEl) {
      this.pkgOverrideStyleEl.remove();
      this.pkgOverrideStyleEl = null;
    }
    if (!this.pkgManager) return;

    const enabled = this.pkgManager.getEnabledPackages(this.loadedPackages);
    if (enabled.length === 0) return;

    const tokenOverrides = this.pkgManager.mergeTokenOverrides(enabled);
    const ruleOverrides = this.pkgManager.mergeRuleOverrides(enabled);
    if (Object.keys(tokenOverrides).length === 0 && Object.keys(ruleOverrides).length === 0) return;

    // 容错：仅保留本体存在的资源
    const validTokenIds = new Set((this.settings.customTextColors ?? []).map((c) => c.id));
    const ruleIdToCssClass = this.getRuleIdToCssClassMap();

    const css = generatePackageOverrideCss(tokenOverrides, ruleOverrides, validTokenIds, ruleIdToCssClass);
    if (!css) return;

    this.pkgOverrideStyleEl = document.createElement('style');
    this.pkgOverrideStyleEl.id = 'prompt-colorizer-package-overrides';
    this.pkgOverrideStyleEl.textContent = css;
    document.head.appendChild(this.pkgOverrideStyleEl);
  }

  /** 当前启用包的引用 ID 集合（叠加合并去重；导图与扫描模块共用） */
  getEnabledPackageRefIds(): { tokenIds: Set<string>; ruleIds: Set<string> } {
    if (!this.pkgManager) return { tokenIds: new Set(), ruleIds: new Set() };
    return this.pkgManager.collectEnabledRefIds(
      this.pkgManager.getEnabledPackages(this.loadedPackages)
    );
  }

  // ============================================================
  // 自定义文本颜色管理
  // ============================================================

  /**
   * 应用自定义文本颜色样式
   * 根据 customTextColors 配置生成 CSS，注入到文档头部
   * 类名 dsl-custom-text-{id} 即可在编辑器/阅读模式中生效
   */
  applyCustomTextColorsStyles(): void {
    // 移除旧样式
    if (this.customTextStyleEl) {
      this.customTextStyleEl.remove();
    }

    if (!this.settings.customTextColors || this.settings.customTextColors.length === 0) {
      return;
    }

    const css = generateCustomTextColorsCss(this.settings.customTextColors);
    if (!css) return;

    this.customTextStyleEl = document.createElement('style');
    this.customTextStyleEl.id = 'prompt-colorizer-custom-text-colors';
    this.customTextStyleEl.textContent = css;
    document.head.appendChild(this.customTextStyleEl);

    // v2.10：广播自定义颜色变化（颜色导图等面板监听刷新）
    this.app.workspace.trigger('prompt-colorizer:custom-colors-changed');
  }

  /**
   * 为当前编辑器选中的文本应用自定义颜色
   * 弹出颜色选择器模态框，确认后保存到设置并刷新
   */
  applyColorToSelection(editor: Editor): void {
    const selected = editor.getSelection();
    if (!selected || selected.trim().length === 0) {
      new Notice(t('customText.noticeNoSelection'));
      return;
    }

    // 查找是否已存在该文本的颜色规则（用于编辑模式预填）
    const existing = this.settings.customTextColors.find(
      (c) => c.text === selected
    ) ?? null;

    openColorPickerModal(
      this.app,
      selected,
      existing,
      (result) => {
        // 添加或更新自定义颜色规则
        if (existing) {
          // 更新现有规则
          existing.color = result.color;
          existing.color2 = result.color2 || '';
          existing.gradientStops = result.gradientStops.map((s) => ({ ...s }));
          existing.gradientAngle = result.gradientAngle;
          existing.caseSensitive = result.caseSensitive;
          existing.wholeWord = result.wholeWord;
          existing.effect = result.effect;
          existing.effects = [...result.effects];
          existing.effectParams = result.effectParams ?? {};
          existing.enabled = true;
        } else {
          // 新建规则
          const newItem = createCustomTextColor(result);
          this.settings.customTextColors.push(newItem);
        }


        // 保存并刷新
        this.saveSettings().then(() => {
          this.applyCustomTextColorsStyles();
          this.refreshEditorExtensions();
          new Notice(t('customText.noticeApplied'));
          void this.syncTokensToActivePackage();
        });
      }
    );
  }

  /**
   * 移除当前编辑器选中文本对应的自定义颜色规则
   * 按文本内容匹配，可能移除多条规则
   */
  removeColorFromSelection(editor: Editor): void {
    const selected = editor.getSelection();
    if (!selected || selected.trim().length === 0) {
      new Notice(t('customText.noticeNoSelection'));
      return;
    }

    const idsToRemove = findMatchingCustomColorIds(
      selected,
      this.settings.customTextColors
    );

    if (idsToRemove.length === 0) {
      new Notice(t('customText.noticeNotFound'));
      return;
    }

    // 移除匹配的规则
    this.settings.customTextColors = this.settings.customTextColors.filter(
      (c) => !idsToRemove.includes(c.id)
    );

        this.saveSettings().then(() => {
          this.applyCustomTextColorsStyles();
          this.refreshEditorExtensions();
          new Notice(t('customText.noticeApplied'));
          void this.syncTokensToActivePackage();
        });
  }

  /**
   * 删除指定 ID 的自定义颜色规则
   * 用于设置面板的删除按钮
   */
  async deleteCustomTextColor(id: string): Promise<void> {
    this.settings.customTextColors = this.settings.customTextColors.filter(
      (c) => c.id !== id
    );
    await this.saveSettings();
    this.applyCustomTextColorsStyles();
    this.refreshEditorExtensions();
    void this.syncTokensToActivePackage();
  }

  /**
   * 更新指定 ID 的自定义颜色规则
   * 用于设置面板的编辑按钮
   */
  async updateCustomTextColor(
    id: string,
    updates: Partial<CustomTextColor>
  ): Promise<void> {
    const item = this.settings.customTextColors.find((c) => c.id === id);
    if (!item) return;
    Object.assign(item, updates);
    await this.saveSettings();
    this.applyCustomTextColorsStyles();
    this.refreshEditorExtensions();
    void this.syncTokensToActivePackage();
  }

  /**
   * 编辑已存在的自定义颜色规则（弹出颜色选择器）
   */
  editCustomTextColor(id: string): void {
    const item = this.settings.customTextColors.find((c) => c.id === id);
    if (!item) return;

    openColorPickerModal(
      this.app,
      item.text,
      item,
      (result) => {
        item.text = result.text;
        item.color = result.color;
        item.color2 = result.color2 || '';
        item.gradientStops = result.gradientStops.map((s) => ({ ...s }));
        item.gradientAngle = result.gradientAngle;
        item.caseSensitive = result.caseSensitive;
        item.wholeWord = result.wholeWord;
        item.effect = result.effect;
        item.effects = [...result.effects];
        item.effectParams = result.effectParams ?? {};
        item.category = result.category;

        this.saveSettings().then(() => {
          this.applyCustomTextColorsStyles();
          this.refreshEditorExtensions();
          new Notice(t('customText.noticeApplied'));
        });
      }
    );
  }

  // ============================================================
  // 右键菜单与浮动面板
  // ============================================================

  /** 浮动面板显示的延迟定时器 ID */
  private popoverTimerId: number | null = null;

  /**
   * 编辑器右键菜单事件处理
   * 在右键菜单中添加"为选中文本应用颜色"等项
   */
  private onEditorMenu(menu: Menu, editor: Editor): void {
    addColorMenuItems(menu, editor, {
      onApply: () => {
        // 右键"应用颜色"：弹出浮动快速面板
        this.showPopoverForSelection(editor);
      },
      onRemove: () => {
        this.removeColorFromSelection(editor);
      },
      onOpenPicker: () => {
        // 右键"高级选择器"：打开完整 Modal
        this.applyColorToSelection(editor);
      },
    });
  }

  /**
   * 编辑器选区变化事件处理
   * 当用户选中文本且开启自动弹出时，延迟显示浮动面板
   */
  private onEditorSelectionChange(editor: Editor): void {
    // 清除上次的延迟定时器
    if (this.popoverTimerId !== null) {
      window.clearTimeout(this.popoverTimerId);
      this.popoverTimerId = null;
    }


    // 自动弹出开关关闭时，不弹出
    if (!this.settings.customTextPopoverAutoShow) return;

    const selected = editor.getSelection();
    if (!selected || selected.trim().length === 0) {
      // 无选区，隐藏已有面板
      hideColorPopover();
      return;
    }

    // 选中文本长度过大时不弹出（避免大段选择时干扰）
    if (selected.length > 200) {
      hideColorPopover();
      return;
    }

    // 延迟显示，避免快速选择时的闪烁
    const delay = Math.max(0, Math.min(2000, this.settings.customTextPopoverDelay ?? 350));
    this.popoverTimerId = window.setTimeout(() => {
      this.showPopoverForSelection(editor);
    }, delay);
  }

  /**
   * 为当前选区显示浮动快速着色面板
   */
  private showPopoverForSelection(editor: Editor): void {
    const selected = editor.getSelection();
    if (!selected || selected.trim().length === 0) {
      new Notice(t('customText.noticeNoSelection'));
      return;
    }

    // 查找当前选中文本是否已有颜色规则
    const existing = this.settings.customTextColors.find((c) => c.text === selected) ?? null;

    showColorPopover(this.app, editor, {
      selectedText: selected,
      existing,
      onApplyColor: (color: string) => {
        this.applyQuickColor(selected, color, existing);
      },
      onOpenAdvanced: () => {
        // 打开完整 Modal（应用颜色命令）
        this.applyColorToSelection(editor);
      },
      onRemove: () => {
        this.removeColorFromSelection(editor);
      },
    });
  }

  /**
   * 快速应用颜色（浮动面板点击色块时调用）
   * 使用默认匹配选项（不区分大小写、非全字匹配）
   */
  private async applyQuickColor(
    text: string,
    color: string,
    existing: CustomTextColor | null
  ): Promise<void> {
    if (existing) {
      // 更新现有规则的颜色（效果组合保持不变）
      existing.color = color;
    } else {
      // 新建规则（使用默认匹配选项；无效果组合）
      const newItem: CustomTextColor = {
        id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        text,
        color,
        color2: '',
        gradientStops: [],
        gradientAngle: 135,
        enabled: true,
        caseSensitive: false,
        wholeWord: false,
        effect: 'none',
        effects: [],
      };
      this.settings.customTextColors.push(newItem);
    }


    await this.saveSettings();
    this.applyCustomTextColorsStyles();
    this.refreshEditorExtensions();
    new Notice(t('customText.noticeColorApplied') + ' ' + color);
  }

  // ============================================================
  // UI 刷新方法
  // ============================================================

  /**
   * 解析当前生效的令牌集（含色板预设覆盖）
   * 优先级：per-note frontmatter theme-palette > 文件夹色板映射（最长路径优先）> 全局 palettePreset > YAML 默认 colors
   */
  private resolveActiveColorTokens(): Record<string, ColorToken> {
    const base = this.currentRuleSet?.colorTokens ?? {};
    const palettes = this.currentRuleSet?.palettes ?? {};

    let presetName = this.settings.palettePreset || '';

    // 文件夹色板映射（项 10）：当前激活文件所在文件夹匹配映射，最长路径优先
    if (this.settings.folderPalettesEnabled && this.settings.folderPalettes?.length) {
      const activeFile = this.app.workspace.getActiveFile();
      if (activeFile) {
        const matches = this.settings.folderPalettes
          .filter((fp) => activeFile.path.startsWith(fp.path + '/'))
          .sort((a, b) => b.path.length - a.path.length);
        const hit = matches.find((fp) => palettes[fp.palette]);
        if (hit) presetName = hit.palette;
      }
    }

    // per-note frontmatter（项 6）：theme-palette: macaron 覆盖一切
    const activeFile = this.app.workspace.getActiveFile();
    if (activeFile && activeFile.extension === 'md') {
      const cache = this.app.metadataCache.getFileCache(activeFile);
      const fm = cache?.frontmatter as Record<string, unknown> | undefined;
      if (fm && typeof fm['theme-palette'] === 'string' && fm['theme-palette']) {
        presetName = fm['theme-palette'];
      }
    }

    if (!presetName || !palettes[presetName]) return base;

    // 色板合并：预设覆盖同名令牌，未覆盖令牌沿用默认
    return { ...base, ...palettes[presetName].tokens };
  }

  /**
   * 应用颜色模式
   * v2.9：色板预设 / 衍生透明度 / 色盲辅助 / 文件夹色板 全部在此链路生效
   */
  applyColorMode(): void {
    document.body.removeClass('prompt-colorizer-light', 'prompt-colorizer-dark', 'pc-light', 'pc-dark');

    if (this.settings.colorMode === 'light') {
      document.body.addClass('prompt-colorizer-light', 'pc-light');
    } else if (this.settings.colorMode === 'dark') {
      document.body.addClass('prompt-colorizer-dark', 'pc-dark');
    }
    // auto 模式不添加 class，CSS 中通过 @media 自动适配

    // 配色方案/色板/透明度变化时重生成颜色变量和样式规则
    if (this.currentRuleSet) {
      const tokens = this.resolveActiveColorTokens();
      this.applyDynamicColorVariablesWith(tokens, this.currentRuleSet.styleRules);
    }

    // 色盲辅助 class（项 7）：CSS 据此为红/绿系令牌追加冗余下划线
    document.body.classList.toggle('pc-colorblind-assist', !!this.settings.colorBlindAssist);
    this.applyColorBlindAssistStyles();

    // 嵌入卡片装饰风格：body data 属性驱动三档 CSS（tech/vision/polaroid）
    const embedStyle = this.settings.embedCardStyle ?? 'tech';
    if (document.body.getAttribute('data-embed-style') !== embedStyle) {
      document.body.setAttribute('data-embed-style', embedStyle);
    }

    // 可视化分块（阅读模式块化样式）：body 类开关 + CSS 变量驱动 styles.css 覆盖
    const tblOn = !!this.settings.readerTableBlockEnabled;
    document.body.classList.toggle('pc-table-block', tblOn);
    document.body.classList.toggle('pc-table-rounded', tblOn && !!this.settings.readerTableRounded);
    document.body.classList.toggle('pc-table-header-bg', tblOn && !!this.settings.readerTableHeaderBg);
    document.body.classList.toggle('pc-table-sticky-header', tblOn && !!this.settings.readerTableStickyHeader);
    document.body.classList.toggle('pc-table-first-col', tblOn && !!this.settings.readerTableFirstCol);
    document.body.classList.toggle('pc-table-zebra', tblOn && !!this.settings.readerTableZebra);
    document.body.classList.toggle('pc-table-hover', tblOn && !!this.settings.readerTableHover);
    document.body.setAttribute('data-table-density', tblOn ? (this.settings.readerTableDensity ?? 'normal') : 'normal');
    // 强度变量：斑马纹 / 悬停（写入 body 级变量，styles.css 消费）
    document.body.style.setProperty('--pc-table-zebra-alpha', String(this.settings.readerTableZebraAlpha ?? 4));
    document.body.style.setProperty('--pc-table-hover-alpha', String(this.settings.readerTableHoverAlpha ?? 8));

    const mdOn = !!this.settings.readerMetadataBlockEnabled;
    document.body.classList.toggle('pc-metadata-block', mdOn);
    document.body.classList.toggle('pc-metadata-key-bold', mdOn && !!this.settings.readerMetadataKeyBold);
    document.body.classList.toggle('pc-metadata-row-hover', mdOn && !!this.settings.readerMetadataRowHover);
    document.body.setAttribute('data-metadata-density', mdOn ? (this.settings.readerMetadataDensity ?? 'normal') : 'normal');
  }

  /** 色盲辅助样式元素 */
  private colorBlindAssistEl: HTMLElement | null = null;

  /**
   * 注入/移除色盲辅助 CSS（项 7）
   * 生成静态规则集，仅随开关变化重注
   */
  private applyColorBlindAssistStyles(): void {
    if (this.colorBlindAssistEl) {
      this.colorBlindAssistEl.remove();
      this.colorBlindAssistEl = null;
    }
    if (!this.settings.colorBlindAssist) return;
    const css = generateColorBlindAssistCss();
    if (!css) return;
    this.colorBlindAssistEl = document.createElement('style');
    this.colorBlindAssistEl.id = 'prompt-colorizer-colorblind-assist';
    this.colorBlindAssistEl.textContent = css;
    document.head.appendChild(this.colorBlindAssistEl);
  }

  /**
   * 带令牌参数的动态变量注入（applyColorMode 内部用）
   * 与 applyDynamicColorVariables 的区别：直接接收已合并色板的令牌集
   */
  private applyDynamicColorVariablesWith(
    colorTokens: Record<string, ColorToken>,
    styleRules: Record<string, StyleRule>
  ): void {
    if (this.dslColorVarEl) {
      this.dslColorVarEl.remove();
    }

    const css = generateColorVariables(
      colorTokens,
      this.settings.colorScheme,
      this.settings.tokenDeriveAlphas ?? {}
    );
    if (css) {
      this.dslColorVarEl = document.createElement('style');
      this.dslColorVarEl.id = 'prompt-colorizer-color-vars';
      this.dslColorVarEl.textContent = css;
      document.head.appendChild(this.dslColorVarEl);
    }

    // 样式规则需用合并后的令牌集重新生成（令牌引用才能命中覆盖色）
    this.applyDynamicStyles(styleRules, colorTokens);

    // 重新应用用户自定义颜色覆盖（优先级最高）
    this.applyCustomColors();
  }

  /**
   * 应用自定义颜色覆盖
   * 将用户自定义的颜色值写入 documentElement 的 CSS 变量
   */
  applyCustomColors(): void {
    const root = document.documentElement;
    if (this.settings.customColors) {
      for (const [token, value] of Object.entries(this.settings.customColors)) {
        if (value) {
          root.style.setProperty(token, value);
        }
      }
    }
  }

  /**
   * 重置自定义颜色（清除所有覆盖）
   */
  resetCustomColors(): void {
    const root = document.documentElement;
    if (this.settings.customColors) {
      for (const token of Object.keys(this.settings.customColors)) {
        root.style.removeProperty(token);
      }
    }
    this.settings.customColors = {};
  }

  /**
   * 刷新编辑器扩展
   * 传入当前 matcher 实例，确保规则更新后编辑器使用新规则
   */
  refreshEditorExtensions(): void {
    const newExts = createEditorExtension(this.settings, this.matcher, this);
    this.editorExtensions.length = 0;
    this.editorExtensions.push(...newExts);
    this.app.workspace.updateOptions();
  }

  /**
   * 重新应用动态样式（令牌启用/禁用变更后调用）
   */
  refreshDynamicStyles(): void {
    const styleRules = this.matcher.getStyleRules();
    const colorTokens = this.matcher.getColorTokens();
    this.applyDynamicStyles(styleRules, colorTokens);
  }

  /** 文件浏览器着色的多轮兜底延迟（毫秒），覆盖异步渲染慢场景 */
  private static readonly FILE_COLORIZE_DELAYS: number[] = [0, 100, 300, 800, 2000];

  /** 启动文件浏览器重渲染观察者，内容变化后防抖补着色 */
  private observeFileExplorerRedraw(): void {
    observeFileExplorerRedraw(this.app, () => {
      colorizeFileExplorer(this.app, this.settings);
    });
  }

  /**
   * 刷新文件浏览器着色
   * 清除后分多轮补着色（文件项异步渲染，单次固定延迟会漏项），
   * 并启动重渲染观察者应对文件夹展开/折叠等 DOM 重建
   */
  refreshFileColorizer(): void {
    clearFileExplorerColors(this.app);
    for (const delay of PromptColorizer.FILE_COLORIZE_DELAYS) {
      setTimeout(() => {
        colorizeFileExplorer(this.app, this.settings);
      }, delay);
    }
    this.observeFileExplorerRedraw();
  }

  /**
   * 刷新所有着色
   */
  refreshAll(): void {
    this.refreshEditorExtensions();
    this.refreshFileColorizer();
    this.applyColorMode();
    this.applyCustomTextColorsStyles();
  }

  /**
   * 获取当前规则版本
   */
  getRuleVersion(): string {
    return this.matcher.getVersion();
  }

  /**
   * 获取当前所有颜色令牌定义
   * 用于设置面板动态渲染颜色自定义列表
   */
  getColorTokens(): Record<string, ColorToken> {
    return this.matcher.getColorTokens();
  }

  /**
   * 获取当前所有样式规则
   * 用于设置面板显示规则颜色预览
   */
  getStyleRules(): Record<string, StyleRule> {
    return this.matcher.getStyleRules();
  }

  /**
   * 根据 CSS 类名获取其颜色值
   * 用于设置面板中高亮规则的颜色预览圆点
   */
  getColorByCssClass(cssClass: string): string {
    return this.matcher.getColorByCssClass(cssClass);
  }

  /**
   * 根据 CSS 类名查找对应的自定义文本颜色规则（v2.10）
   * dsl-custom-text-{id} → CustomTextColor（供颜色导图读取效果/渐变信息）
   */
  getCustomTextColorByCssClass(cssClass: string): CustomTextColor | null {
    const m = cssClass.match(/^dsl-custom-text-(.+)$/);
    if (!m) return null;
    return (
      this.settings.customTextColors?.find((c) => c && c.id === m[1]) ?? null
    );
  }

  /**
   * 根据 CSS 类名获取 DSL 样式规则（v2.10.2）
   * 供颜色导图读取 DSL 规则的效果属性（textShadow/animation/backgroundImage 等）
   */
  getStyleRuleByCssClass(cssClass: string): StyleRule | null {
    return this.matcher.getStyleRules()?.[cssClass] ?? null;
  }

  /**
   * 获取文本的所有着色匹配结果（主匹配 + 组合规则 + 自定义文本颜色）
   * 供颜色导图面板等复用，与编辑器高亮使用完全相同的匹配逻辑
   */
  getAllMatches(text: string): RuleMatchResult[] {
    return collectAllMatches(text, this.matcher, this.settings);
  }

  /**
   * 将文本按当前规则集匹配并渲染为带 dsl-* 类的 HTML(v3 实时预览)
   * 用于设置面板概览页的「实时效果预览」卡片
   * 仅渲染 inline 级匹配(block 级跨行匹配在预览中跳过以保持排版)
   * @param text 待渲染的示例文本
   * @returns 安全的 HTML 字符串(已转义文本节点)
   */
  highlightTextToHtml(text: string): string {
    const results = this.matcher.match(text, null).filter((r) => !r.block);

    const escapeHtml = (s: string): string =>
      s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    let html = '';
    let pos = 0;
    for (const r of results) {
      if (r.from < pos) continue;
      // 按 UI 开关过滤:对应开关关闭的规则不着色
      const settingKey = CSS_TO_KEY[r.cssClass];
      if (settingKey && (this.settings as any)[settingKey] === false) continue;
      html += escapeHtml(text.slice(pos, r.from));
      const safeClass = escapeHtml(r.cssClass);
      html += `<span class="${safeClass}">${escapeHtml(text.slice(r.from, r.to))}</span>`;
      pos = r.to;
    }
    html += escapeHtml(text.slice(pos));
    return html;
  }

  /**
   * 活跃 Leaf 变化处理
   * v2.9：切换文件时重算 per-note 主题色（frontmatter theme-palette）与文件夹色板
   */
  private lastPaletteSignature = '';

  private onActiveLeafChange(leaf: WorkspaceLeaf | null): void {
    if (!leaf) return;

    const file = this.app.workspace.getActiveFile();
    if (file && file.extension === 'md') {
      colorizeTabTitle(this.app, file, this.settings);
    }

    // per-note / 文件夹色板变化时重新注入颜色变量（签名比对避免重复注入）
    const signature = this.computeActivePaletteSignature(file);
    if (signature !== this.lastPaletteSignature) {
      this.lastPaletteSignature = signature;
      this.applyColorMode();
    }

    setTimeout(() => {
      this.refreshFileColorizer();
    }, 200);
  }

  /**
   * 计算当前激活文件的"生效色板签名"
   * = frontmatter theme-palette 优先，其次文件夹色板映射，最后全局预设
   * 签名变化才触发重新注入
   */
  private computeActivePaletteSignature(file: TFile | null): string {
    let sig = this.settings.palettePreset || '-';

    // 文件夹色板映射（与 resolveActiveColorTokens 同优先级逻辑）
    if (this.settings.folderPalettesEnabled && file && this.settings.folderPalettes?.length) {
      const hit = this.settings.folderPalettes
        .filter((fp) => file.path.startsWith(fp.path + '/'))
        .sort((a, b) => b.path.length - a.path.length)[0];
      if (hit) sig = hit.palette;
    }

    // per-note frontmatter：theme-palette: macaron（或 theme-palettes 的单值）
    if (file && file.extension === 'md') {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache?.frontmatter as Record<string, unknown> | undefined;
      if (fm && typeof fm['theme-palette'] === 'string' && fm['theme-palette']) {
        sig = fm['theme-palette'];
      }
    }
    return sig;
  }
}
