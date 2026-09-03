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

import { Plugin, WorkspaceLeaf, Notice, Editor, Menu, MarkdownView } from 'obsidian';
import { Extension } from '@codemirror/state';
import type { PromptColorizerSettings, CustomTextColor } from './src/types';
import { DEFAULT_SETTINGS, mergeSettings } from './src/settings/settings';
import { PromptColorizerSettingTab } from './src/settings/setting-tab';
import { createEditorExtension } from './src/highlighter/editor-extension';
import {
  colorizeFileExplorer,
  clearFileExplorerColors,
  colorizeTabTitle,
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
import {
  generateCustomTextColorsCss,
  findMatchingCustomColorIds,
} from './src/highlighter/custom-text-colors';
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
import { compileRuleSet, loadBuiltinRules, generateStyleCss, generateColorVariables } from './src/rule-engine/rule-compiler';
import { CSS_TO_KEY } from './src/highlighter/rule-key-map';
import type { RuleSet, StyleRule, ColorToken } from './src/rule-engine/types';
import { LocalCache } from './src/cache/local-cache';
import { fetchRemoteVersion, fetchRuleFilesWithReport, compareVersions, calculateHash, parseRuleCategories, countLexiconTerms } from './src/fetcher/git-fetch';
import type { RemoteVersionInfo, LocalVersionInfo, PullReportData } from './src/rule-engine/types';

export default class PromptColorizer extends Plugin {
  settings: PromptColorizerSettings;
  private editorExtensions: Extension[] = [];

  /** 规则匹配器实例（核心引擎） */
  private matcher: RuleMatcher;
  /** 本地缓存管理器 */
  private cache: LocalCache;
  /** 当前规则集 */
  private currentRuleSet: RuleSet | null = null;
  /** 自动更新定时器 ID */
  private autoUpdateTimerId: number | null = null;
  /** 动态注入的 DSL 样式元素 */
  private dslStyleEl: HTMLStyleElement | null = null;
  /** 动态注入的 DSL 颜色变量元素（由 YAML colors 区块生成） */
  private dslColorVarEl: HTMLStyleElement | null = null;
  /** 动态注入的自定义文本颜色样式元素（由 customTextColors 生成） */
  private customTextStyleEl: HTMLStyleElement | null = null;
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

    // 4. 初始化规则引擎
    this.matcher = new RuleMatcher();
    this.cache = new LocalCache(this.app, this.manifest.id);

    // 5. 加载规则（同步优先加载内置规则，异步再更新）
    await this.initRules();

    // 6. 注册编辑器扩展（传入 matcher）
    this.editorExtensions = createEditorExtension(this.settings, this.matcher);
    this.registerEditorExtension(this.editorExtensions);

    // 7. 注册阅读模式后处理器（传入 matcher）
    this.registerMarkdownPostProcessor(createPostProcessor(this.settings, this.matcher));

    // 8. 注册设置面板
    this.addSettingTab(new PromptColorizerSettingTab(this.app, this));

    // 9. 注册命令
    this.registerCommands();

    // 10. 注册 Ribbon 图标
    this.addRibbonIcon('palette', t('command.refresh'), () => {
      this.refreshAll();
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
      this.currentRuleSet = ruleSet;
      this.matcher.setRuleSet(ruleSet);
      this.applyDynamicColorVariables(ruleSet.colorTokens);
      this.applyDynamicStyles(ruleSet.styleRules, ruleSet.colorTokens);
    }
  }

  /**
   * 应用动态颜色变量
   * 从 YAML colors 区块生成 CSS 变量定义并注入到文档头部
   * 支持明暗模式自动切换（浅色 :root / 深色 body.theme-dark）
   * 注入后重新应用用户自定义颜色覆盖（优先级最高）
   * @param colorTokens 颜色令牌定义映射
   */
  private applyDynamicColorVariables(colorTokens: Record<string, ColorToken>): void {
    // 移除旧的颜色变量样式
    if (this.dslColorVarEl) {
      this.dslColorVarEl.remove();
    }

    const css = generateColorVariables(colorTokens);
    if (!css) return;

    this.dslColorVarEl = document.createElement('style');
    this.dslColorVarEl.id = 'prompt-colorizer-color-vars';
    this.dslColorVarEl.textContent = css;
    document.head.appendChild(this.dslColorVarEl);

    // 重新应用用户自定义颜色覆盖（优先级高于 YAML 定义的默认值）
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
          totalTerms: 0,
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
          totalTerms: 0,
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
      const totalTerms = files ? countLexiconTerms(files) : 0;

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
          totalRules: 0,
          totalTerms,
          duration: Date.now() - startTime,
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
        this.currentRuleSet = ruleSet;
        this.matcher.setRuleSet(ruleSet);
        this.applyDynamicColorVariables(ruleSet.colorTokens);
        this.applyDynamicStyles(ruleSet.styleRules, ruleSet.colorTokens);
        this.refreshEditorExtensions();
        this.settings.lastCheckTime = Date.now();

        // 统计总规则数
        const totalRules = ruleSet.rules.length + ruleSet.lexicons.length + ruleSet.contextRules.length;

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
          totalRules,
          totalTerms,
          duration: Date.now() - startTime,
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
                this.currentRuleSet = prevRuleSet;
                this.matcher.setRuleSet(prevRuleSet);
                this.applyDynamicColorVariables(prevRuleSet.colorTokens);
                this.applyDynamicStyles(prevRuleSet.styleRules, prevRuleSet.colorTokens);
                this.refreshEditorExtensions();
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
          totalRules: 0,
          totalTerms,
          duration: Date.now() - startTime,
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
        totalTerms: 0,
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
      this.currentRuleSet = ruleSet;
      this.matcher.setRuleSet(ruleSet);
      this.applyDynamicColorVariables(ruleSet.colorTokens);
      this.applyDynamicStyles(ruleSet.styleRules, ruleSet.colorTokens);
      this.refreshEditorExtensions();
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
          existing.caseSensitive = result.caseSensitive;
          existing.wholeWord = result.wholeWord;
          existing.enabled = true;
        } else {
          // 新建规则
          const newItem = createCustomTextColor(result);
          this.settings.customTextColors.push(newItem);
        }

        // 启用功能（首次添加时自动启用）
        this.settings.customTextColorsEnabled = true;

        // 保存并刷新
        this.saveSettings().then(() => {
          this.applyCustomTextColorsStyles();
          this.refreshEditorExtensions();
          new Notice(t('customText.noticeApplied'));
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
      new Notice(t('customText.noticeRemoved'));
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
        item.caseSensitive = result.caseSensitive;
        item.wholeWord = result.wholeWord;

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

    // 全局开关关闭时，不弹出
    if (!this.settings.customTextColorsEnabled) return;
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
      // 更新现有规则的颜色
      existing.color = color;
    } else {
      // 新建规则（使用默认匹配选项）
      const newItem: CustomTextColor = {
        id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        text,
        color,
        enabled: true,
        caseSensitive: false,
        wholeWord: false,
      };
      this.settings.customTextColors.push(newItem);
    }

    // 启用功能
    this.settings.customTextColorsEnabled = true;

    await this.saveSettings();
    this.applyCustomTextColorsStyles();
    this.refreshEditorExtensions();
    new Notice(t('customText.noticeColorApplied') + ' ' + color);
  }

  // ============================================================
  // UI 刷新方法
  // ============================================================

  /**
   * 应用颜色模式
   */
  applyColorMode(): void {
    document.body.removeClass('prompt-colorizer-light', 'prompt-colorizer-dark', 'pc-light', 'pc-dark');

    if (this.settings.colorMode === 'light') {
      document.body.addClass('prompt-colorizer-light', 'pc-light');
    } else if (this.settings.colorMode === 'dark') {
      document.body.addClass('prompt-colorizer-dark', 'pc-dark');
    }
    // auto 模式不添加 class，CSS 中通过 @media 自动适配
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
    const newExts = createEditorExtension(this.settings, this.matcher);
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

  /**
   * 刷新文件浏览器着色
   */
  refreshFileColorizer(): void {
    clearFileExplorerColors(this.app);
    setTimeout(() => {
      colorizeFileExplorer(this.app, this.settings);
    }, 100);
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
   * 将文本按当前规则集匹配并渲染为带 dsl-* 类的 HTML(v3 实时预览)
   * 用于设置面板概览页的「实时效果预览」卡片
   * 仅渲染 inline 级匹配(block 级跨行匹配在预览中跳过以保持排版)
   * @param text 待渲染的示例文本
   * @returns 安全的 HTML 字符串(已转义文本节点)
   */
  highlightTextToHtml(text: string): string {
    const enabledIds = this.settings.enabledRuleIds && this.settings.enabledRuleIds.length > 0
      ? new Set(this.settings.enabledRuleIds)
      : null;
    const results = this.matcher.match(text, enabledIds).filter((r) => !r.block);

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
   */
  private onActiveLeafChange(leaf: WorkspaceLeaf | null): void {
    if (!leaf) return;

    const file = this.app.workspace.getActiveFile();
    if (file && file.extension === 'md') {
      colorizeTabTitle(this.app, file, this.settings);
    }

    setTimeout(() => {
      this.refreshFileColorizer();
    }, 200);
  }
}
