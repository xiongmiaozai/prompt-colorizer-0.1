/**
 * 提示词着色插件 — 设置面板 UI（Tab 分页式布局 v3）
 *
 * 基于 UI界面可视化终极重构方案：
 * - 信息架构：Tab 分页导航 → 各页内分区卡片 → 可折叠子模块
 * - 交互四原则：可感知（Tab 高亮）/ 可反馈（hover/active）/ 可预期（统一布局）/ 可容错（重置确认）
 * - 布局规范：4px 基线网格 + 标准化列表 + 批量操作 + 可折叠分区
 * - 降噪设计：高亮规则按类别折叠，默认仅展开第一项，降低视觉噪音
 */

import { App, PluginSettingTab, Setting, Notice, ColorComponent } from 'obsidian';
import type PromptColorizer from '../../main';
import type { PromptColorizerSettings, FileTypeColor, CustomTextColor, AgentPreset, ColorScheme, PromptPack } from '../types';
import { migrateEffects, normalizeGradientStops, gradientStopsToCss } from '../highlighter/effect-registry';
import type { PullReportData } from '../rule-engine/types';
import type { VocabTokenInfo } from '../rule-engine/vocab-tokens';
import { VOCAB_TOKEN_GROUPS } from '../rule-engine/vocab-tokens';
import { DEFAULT_FILE_TYPE_COLORS, DEFAULT_SETTINGS, BASE_TOKENS, DEFAULT_PROMPT_PACKS } from './settings';
import { renderCard, CARD_ICONS } from './card-helpers';
import { createConfirmDialog } from './confirm-dialog';
import { AgentPresetNameModal } from './agent-preset-modal';
import { buildExportData, downloadConfigJson, parseConfigJson, mergeMultipleImports } from '../utils/config-io';

import { activateColorMapView } from '../ui/color-map-view';
import type { LoadedPackage } from '../types';
import {
  togglePackageEnabled,
  setPackageMode,
  renamePackage,
  copyPackage,
  clonePackage,
  deletePackage,
  toggleRefInPackage,
  createEmptyPackage,
  removeInvalidRefsFromPackage,
} from '../packages/package-actions';
import { exportPackage, importStylePkg } from '../packages/pkg-io';
import {
  openConfirmModal,
  openRenameModal,
} from '../packages/package-dialogs';

/** 降噪提示阈值：启用令牌数超过该值时显示提示条（基础 10 + 2） */
const TOKEN_NOISE_THRESHOLD = 12;


/** Tab 页面标识 */
type TabId = 'overview' | 'packages' | 'engine' | 'files';

/** Tab 定义 */
interface TabConfig {
  id: TabId;
  labelKey: string;
  icon: TabId;
}

/** 所有高亮开关字段 */
const HIGHLIGHT_KEYS: (keyof PromptColorizerSettings)[] = [
  // 基础模式
  'highlightVariables',
  'highlightRoleTags',
  'highlightRoleHeaders',
  'highlightInstructionMarkers',
  'highlightComments',
  'highlightCodeBlocks',
  'highlightJsonBlocks',
  'highlightInlineCode',
  // 视频提示词模式
  'highlightSectionMarkers',
  'highlightShotHeaders',
  'highlightAssetRefs',
  'highlightFieldLabels',
  'highlightDialogue',
  'highlightAudioRefs',
  'highlightNegativePrompts',
  'highlightTechParams',
  'highlightParentheticals',
  // SD/ComfyUI 扩展模式
  'highlightEmphasisWeights',
  'highlightLoraRefs',
  'highlightBracketEmphasis',
  'highlightSdNegativeHeader',
  // 注：词汇类开关（qualityTags/cameraMoves/sceneTransitions）已并入颜色管理的词汇令牌，不再计入符号规则
];

/** 基础模式开关字段 */
const BASIC_KEYS: (keyof PromptColorizerSettings)[] = [
  'highlightVariables',
  'highlightRoleTags',
  'highlightRoleHeaders',
  'highlightInstructionMarkers',
  'highlightComments',
  'highlightCodeBlocks',
  'highlightJsonBlocks',
  'highlightInlineCode',
];

/** 视频提示词模式开关字段 */
const VIDEO_KEYS: (keyof PromptColorizerSettings)[] = [
  'highlightSectionMarkers',
  'highlightShotHeaders',
  'highlightAssetRefs',
  'highlightFieldLabels',
  'highlightDialogue',
  'highlightAudioRefs',
  'highlightNegativePrompts',
  'highlightTechParams',
  'highlightParentheticals',
];

/** SD/ComfyUI 扩展模式开关字段 */
const SD_KEYS: (keyof PromptColorizerSettings)[] = [
  'highlightEmphasisWeights',
  'highlightLoraRefs',
  'highlightBracketEmphasis',
  'highlightSdNegativeHeader',
];

/** 高亮开关字段 → DSL CSS 类名映射
 * 仅记录开关与 CSS 类名的对应关系，颜色值从规则集动态获取
 * 颜色完全由 YAML 规则文件控制，插件代码不包含任何颜色值 */
const HIGHLIGHT_TO_CSS_CLASS: Record<string, string> = {
  // 基础模式
  highlightVariables: 'dsl-variable',
  highlightRoleTags: 'dsl-role-tag',
  highlightInstructionMarkers: 'dsl-instruction',
  // 视频提示词模式
  highlightSectionMarkers: 'dsl-block-wrapper',
  highlightShotHeaders: 'dsl-shot-header',
  highlightAssetRefs: 'dsl-asset',
  highlightFieldLabels: 'dsl-param-key',
  highlightDialogue: 'dsl-dialogue',
  highlightAudioRefs: 'dsl-audio-ref',
  highlightNegativePrompts: 'dsl-constraint',
  highlightTechParams: 'dsl-tech-param',
  highlightParentheticals: 'dsl-parenthetical',
  // SD/ComfyUI 扩展模式
  highlightEmphasisWeights: 'dsl-emphasis-weight',
  highlightLoraRefs: 'dsl-lora-ref',
  highlightBracketEmphasis: 'dsl-bracket-strong',
  highlightQualityTags: 'dsl-quality-tag',
  highlightSdNegativeHeader: 'dsl-sd-negative-header',
  // 视频提示词扩展模式
  highlightCameraMoves: 'dsl-camera-word',
  highlightSceneTransitions: 'dsl-scene-transition',
};

/**
 * 解析 GitHub URL → rawBaseUrl + branch
 * 支持以下格式：
 *   https://github.com/user/repo
 *   https://github.com/user/repo/tree/branch
 *   https://github.com/user/repo/tree/branch/rules
 *   https://github.com/user/repo/blob/branch/rules/01-base-patterns.yaml
 * 返回 null 表示无法解析
 */
function parseGitUrl(url: string): { rawBaseUrl: string; branch: string } | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  // 已经是 raw URL 格式
  if (/raw\.githubusercontent\.com/.test(trimmed)) {
    // https://raw.githubusercontent.com/user/repo/branch/rules
    const match = trimmed.match(/^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);
    if (match) {
      return {
        rawBaseUrl: trimmed.replace(/\/$/, ''),
        branch: match[3],
      };
    }
    return null;
  }

  // GitHub 仓库 URL
  const match = trimmed.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)(?:\/(tree|blob)\/([^/]+)(\/(.*))?)?/);
  if (match) {
    const user = match[1];
    const repo = match[2].replace(/\.git$/, '');
    const branch = match[4] || 'main';
    const pathAfterBranch = match[6] || '';

    // 确定规则路径：如果路径中包含 rules 或直接是 rules 子路径
    let rulePath = pathAfterBranch;
    if (!rulePath) {
      rulePath = 'rules';
    } else if (!rulePath.startsWith('rules')) {
      rulePath = 'rules';
    }

    const rawBaseUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${rulePath}`;
    return { rawBaseUrl, branch };
  }

  // 简短的 user/repo 格式
  const shortMatch = trimmed.match(/^([^/\s]+)\/([^/\s]+)$/);
  if (shortMatch) {
    const user = shortMatch[1];
    const repo = shortMatch[2].replace(/\.git$/, '');
    const rawBaseUrl = `https://raw.githubusercontent.com/${user}/${repo}/main/rules`;
    return { rawBaseUrl, branch: 'main' };
  }

  return null;
}


/** Tab 导航 SVG 图标 */
const TAB_ICONS: Record<TabId, string> = {
  overview: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
  packages: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  engine: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
  files: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
};

/** Tab 页面列表 */
const TABS: TabConfig[] = [
  { id: 'overview', labelKey: 'tab.overview', icon: 'overview' },
  { id: 'packages', labelKey: 'tab.packages', icon: 'packages' },
  { id: 'engine', labelKey: 'tab.engine', icon: 'engine' },
  { id: 'files', labelKey: 'tab.files', icon: 'files' },
];


export class PromptColorizerSettingTab extends PluginSettingTab {
  plugin: PromptColorizer;
  /** 当前激活的 Tab 页 */
  private currentTab: TabId = 'overview';
  /** 包 Tab 选中包目录名（跨 display 重建保持） */
  private selectedPkgDir: string | null = null;
  /** 着色规则 Tab 搜索查询 */
  private rulesSearchQuery: string = '';
  /** 概览预览区可编辑文本 */
  private previewText: string = '';
  /** 各 Tab 滚动位置缓存 — 切换时保持独立滚动 */
  private tabScrollPositions: Record<string, number> = {};
  /** 令牌分组展开状态缓存 — 重渲染后保持用户展开/折叠 */
  private tokenGroupOpenStates: Map<string, boolean> = new Map();
  /** 自定义颜色变化事件引用（display 重建时防重复注册） */
  private colorsChangedRef?: (params: unknown) => void;

  constructor(app: App, plugin: PromptColorizer) {
    super(app, plugin);
    this.plugin = plugin;
  }

  /** 注册"自定义颜色变化"联动：编辑 Modal 确认/启停/删除后刷新设置页（v2.14） */
  private registerColorsChangedListener(): void {
    if (this.colorsChangedRef) return;
    const ref = () => {
      // 设置页已打开时才刷新；active 面板即本 SettingTab
      if (this.containerEl.children.length > 0) {
        this.display();
      }
    };
    this.colorsChangedRef = ref;
    // @ts-expect-error workspace.on 重载签名宽松
    this.plugin.registerEvent(this.app.workspace.on('prompt-colorizer:custom-colors-changed', ref));
  }

  // ============================================================
  // 主渲染入口 — 左导航 + 右详情布局
  // ============================================================

  display(): void {
    const { containerEl } = this;

    // 自定义颜色变化联动（编辑 Modal 确认后刷新；幂等注册）
    this.registerColorsChangedListener();

    // 保存当前滚动位置
    const prevContent = containerEl.querySelector('.pc-tab-content') as HTMLElement | null;
    if (prevContent) {
      this.tabScrollPositions[this.currentTab] = prevContent.scrollTop;
    }

    containerEl.empty();
    containerEl.addClass('prompt-colorizer-setting-tab');


    const t = this.plugin.t.bind(this.plugin);

    // 1. 左右分栏布局
    const layout = containerEl.createDiv({ cls: 'pc-layout' });

    // 2. 左侧导航
    this.renderTabNav(layout, t);

    // 3. 右侧详情区
    const tabContent = layout.createDiv({ cls: 'pc-tab-content' });

    // 4. 渲染当前 Tab 内容
    switch (this.currentTab) {
      case 'overview':
        void this.renderOverviewTab(tabContent, t);
        break;
      case 'packages':
        void this.renderPackagesTab(tabContent, t);
        break;
      case 'engine':
        this.renderEngineTab(tabContent, t);
        break;
      case 'files':
        this.renderFilesTab(tabContent, t);
        break;
    }

    // 5. 恢复滚动位置
    const savedScroll = this.tabScrollPositions[this.currentTab];
    if (savedScroll !== undefined) {
      requestAnimationFrame(() => { tabContent.scrollTop = savedScroll; });
    }
  }

  // ============================================================
  // Tab 导航栏
  // ============================================================

  /**
   * 渲染左侧导航栏
   * 垂直排列，固定在左侧，点击切换页面
   */
  private renderTabNav(parent: HTMLElement, t: (key: string) => string): void {
    const nav = parent.createDiv({ cls: 'pc-tab-nav' });

    for (const tab of TABS) {
      const isActive = this.currentTab === tab.id;
      const tooltipKey = `tab.${tab.id}Tip`;
      const item = nav.createDiv({
        cls: `pc-tab-item ${isActive ? 'active' : ''}`,
        attr: {
          'data-tab': tab.id,
          role: 'tab',
          tabindex: '0',
          'aria-selected': String(isActive),
          title: t(tooltipKey),
        },
      });

      // Tab 图标
      const iconWrap = item.createSpan({ cls: 'pc-tab-icon' });
      iconWrap.innerHTML = TAB_ICONS[tab.icon] || '';

      // Tab 标签
      item.createSpan({ cls: 'pc-tab-label', text: t(tab.labelKey) });

      // 点击切换 Tab
      const switchTab = () => {
        if (this.currentTab !== tab.id) {
          this.currentTab = tab.id;
          this.display();
        }
      };
      item.addEventListener('click', switchTab);
      item.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          switchTab();
        }
      });
    }
  }

  // ============================================================
  // Tab 1：概览 — 状态总览 + 快速预设 + 核心设置
  // ============================================================

  private async renderOverviewTab(parent: HTMLElement, t: (key: string) => string): Promise<void> {
    // 状态总览条
    this.renderStatusBar(parent, t);


    // 实时效果预览(v3)
    this.renderPreviewCard(parent, t);

    // 包管理(v5)：包容器 + 索引引用 + 启用/复制/克隆/导入导出
    await this.renderPackageManagerBar(parent, t);

    // 快速上手引导卡片
    this.renderQuickStartCard(parent, t);

    // 命令清单卡片
    this.renderCommandListCard(parent, t);

    // 核心设置卡片
    renderCard(parent, t('settings.global'), t('settings.globalDesc'), 'global', (card) => {
      new Setting(card)
        .setName(t('settings.editorHighlight'))
        .setDesc(t('settings.editorHighlightDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.editorHighlightEnabled)
          .onChange(async (value) => {
            this.plugin.settings.editorHighlightEnabled = value;
            await this.plugin.saveSettings();
            this.plugin.refreshEditorExtensions();
            this.updateStatusBar();
          }));

      new Setting(card)

        .setName(t('settings.readerMode'))
        .setDesc(t('settings.readerModeDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.readerModeEnabled)
          .onChange(async (value) => {
            this.plugin.settings.readerModeEnabled = value;
            await this.plugin.saveSettings();
            this.updateStatusBar();
          }));

      new Setting(card)
        .setName(t('settings.colorMode'))
        .setDesc(t('settings.colorModeDesc'))
        .addDropdown((dd) => dd
          .addOption('auto', t('settings.colorModeAuto'))
          .addOption('light', t('settings.colorModeLight'))
          .addOption('dark', t('settings.colorModeDark'))
          .setValue(this.plugin.settings.colorMode)
          .onChange(async (value) => {
            this.plugin.settings.colorMode = value as any;
            await this.plugin.saveSettings();
            this.plugin.applyColorMode();
          }));

      new Setting(card)
        .setName(t('settings.colorScheme'))
        .setDesc(t('settings.colorSchemeDesc'))
        .addDropdown((dd) => dd
          .addOption('default', t('settings.schemeDefault'))
          .addOption('soft', t('settings.schemeSoft'))
          .addOption('mono', t('settings.schemeMono'))
          .addOption('vivid', t('settings.schemeVivid'))
          .addOption('contrast', t('settings.schemeContrast'))
          .setValue(this.plugin.settings.colorScheme ?? 'default')
          .onChange(async (value) => {
            this.plugin.settings.colorScheme = value as ColorScheme;
            await this.plugin.saveSettings();
            this.plugin.applyColorMode();
          }));

      // 色板预设（v2.9 项 5）：YAML palettes 区块一键切换
      const palettes = this.plugin.currentRuleSet?.palettes ?? {};
      const paletteSetting = new Setting(card)
        .setName(t('settings.palettePreset'))
        .setDesc(t('settings.palettePresetDesc'))
        .addDropdown((dd) => {
          dd.addOption('', t('settings.paletteDefault'));
          for (const [key, preset] of Object.entries(palettes)) {
            const name = typeof preset.name === 'string' ? preset.name : (preset.name?.zh ?? key);
            dd.addOption(key, `${name} (${key})`);
          }
          dd.setValue(this.plugin.settings.palettePreset ?? '')
            .onChange(async (value) => {
              this.plugin.settings.palettePreset = value;
              await this.plugin.saveSettings();
              this.plugin.applyColorMode();
              this.display();
            });
        });

      // 色盲辅助（v2.9 项 7）
      new Setting(card)
        .setName(t('settings.colorBlindAssist'))
        .setDesc(t('settings.colorBlindAssistDesc'))
        .addToggle((tg) => tg
          .setValue(!!this.plugin.settings.colorBlindAssist)
          .onChange(async (value) => {
            this.plugin.settings.colorBlindAssist = value;
            await this.plugin.saveSettings();
            this.plugin.applyColorMode();
          }));

      // 衍生透明度（v2.9 项 3）：soft/border 自动衍生比例
      this.renderDeriveAlphaSettings(card, t);

      // 文件夹色板映射（v2.9 项 10）
      this.renderFolderPalettes(card, t, palettes);

    });

  }

  // ============================================================
  // 快速上手引导卡片
  // ============================================================
  private renderQuickStartCard(parent: HTMLElement, t: (key: string) => string): void {
    renderCard(parent, t('guide.quickStart'), '', 'global', (card) => {
      const steps = [
        { title: t('guide.step1Title'), desc: t('guide.step1Desc') },
        { title: t('guide.step2Title'), desc: t('guide.step2Desc') },
        { title: t('guide.step3Title'), desc: t('guide.step3Desc') },
      ];
      for (const step of steps) {
        const row = card.createDiv({ cls: 'pc-guide-step' });
        row.createDiv({ cls: 'pc-guide-step-title', text: step.title });
        row.createDiv({ cls: 'pc-guide-step-desc', text: step.desc });
      }

      // 打开颜色导图按钮
      const btnRow = card.createDiv({ cls: 'pc-guide-actions' });
      btnRow.createEl('button', {
        cls: 'pc-guide-btn',
        text: t('guide.openColorMap'),
      }).addEventListener('click', () => {
        activateColorMapView(this.plugin.app);
      });

      // 提示
      card.createDiv({ cls: 'pc-guide-tip', text: t('guide.tip') });
    });
  }

  // ============================================================
  // 命令清单卡片
  // ============================================================
  private renderCommandListCard(parent: HTMLElement, t: (key: string) => string): void {
    const commands = [
      { name: '刷新着色', desc: '重新扫描当前文档并应用着色' },
      { name: '切换编辑器高亮', desc: '开/关编辑器实时着色' },
      { name: '为选中文本应用颜色', desc: '弹出选色面板为选中文本着色' },
      { name: '移除选中文本的颜色', desc: '清除选中文本的自定义颜色' },
      { name: '打开颜色导图面板', desc: '打开侧边栏颜色导图' },
      { name: '检查规则更新', desc: '从远程 Git 拉取最新规则' },
      { name: '重新加载规则', desc: '重新编译本地规则集' },
      { name: '导出全量设置', desc: '导出所有设置为 JSON' },
      { name: '导出自定义文本颜色', desc: '仅导出自定义颜色规则' },
      { name: '导出文件夹映射', desc: '导出文件夹→文件类型映射' },
    ];
    renderCard(parent, t('guide.commands'), t('guide.commandsDesc'), 'global', (card) => {
      const list = card.createDiv({ cls: 'pc-cmd-list' });
      for (const cmd of commands) {
        const row = list.createDiv({ cls: 'pc-cmd-row' });
        row.createDiv({ cls: 'pc-cmd-name', text: cmd.name });
        row.createDiv({ cls: 'pc-cmd-desc', text: cmd.desc });
      }
    });
  }

  // ============================================================
  // Tab 2：高亮规则 — 4 个可折叠分区
  // ============================================================

  // ============================================================
  // 高亮规则分区 — 可折叠开关列表 + 只读色块预览（v3 令牌中心化，颜色在令牌卡片调）
  // （原独立 Tab，v3 合并入「着色规则」Tab 作为首段）
  // ============================================================

  private renderHighlightRulesSection(parent: HTMLElement, t: (key: string) => string): void {
    // 可折叠分区列表：默认展开第一项，其余折叠（降噪设计）
    const sections: {
      title: string;
      desc: string;
      iconKey: string;
      keys: (keyof PromptColorizerSettings)[];
      toggles: { key: keyof PromptColorizerSettings; label: string; desc: string }[];
      defaultExpanded: boolean;
    }[] = [
      {
        title: t('settings.editorRules'),
        desc: t('settings.editorRulesDesc'),
        iconKey: 'editor',
        keys: BASIC_KEYS,
        defaultExpanded: true,
        toggles: [
          { key: 'highlightVariables', label: t('settings.highlightVariables'), desc: t('settings.highlightVariablesDesc') },
          { key: 'highlightRoleTags', label: t('settings.highlightRoleTags'), desc: t('settings.highlightRoleTagsDesc') },
          { key: 'highlightRoleHeaders', label: t('settings.highlightRoleHeaders'), desc: t('settings.highlightRoleHeadersDesc') },
          { key: 'highlightInstructionMarkers', label: t('settings.highlightInstructions'), desc: t('settings.highlightInstructionsDesc') },
          { key: 'highlightComments', label: t('settings.highlightComments'), desc: t('settings.highlightCommentsDesc') },
          { key: 'highlightCodeBlocks', label: t('settings.highlightCodeBlocks'), desc: t('settings.highlightCodeBlocksDesc') },
          { key: 'highlightJsonBlocks', label: t('settings.highlightJsonBlocks'), desc: t('settings.highlightJsonBlocksDesc') },
          { key: 'highlightInlineCode', label: t('settings.highlightInlineCode'), desc: t('settings.highlightInlineCodeDesc') },
        ],
      },
      {
        title: t('settings.videoPromptRules'),
        desc: t('settings.videoPromptRulesDesc'),
        iconKey: 'video',
        keys: VIDEO_KEYS,
        defaultExpanded: false,
        toggles: [
          { key: 'highlightSectionMarkers', label: t('settings.highlightSectionMarkers'), desc: t('settings.highlightSectionMarkersDesc') },
          { key: 'highlightShotHeaders', label: t('settings.highlightShotHeaders'), desc: t('settings.highlightShotHeadersDesc') },
          { key: 'highlightAssetRefs', label: t('settings.highlightAssetRefs'), desc: t('settings.highlightAssetRefsDesc') },
          { key: 'highlightFieldLabels', label: t('settings.highlightFieldLabels'), desc: t('settings.highlightFieldLabelsDesc') },
          { key: 'highlightDialogue', label: t('settings.highlightDialogue'), desc: t('settings.highlightDialogueDesc') },
          { key: 'highlightAudioRefs', label: t('settings.highlightAudioRefs'), desc: t('settings.highlightAudioRefsDesc') },
          { key: 'highlightNegativePrompts', label: t('settings.highlightNegativePrompts'), desc: t('settings.highlightNegativePromptsDesc') },
          { key: 'highlightTechParams', label: t('settings.highlightTechParams'), desc: t('settings.highlightTechParamsDesc') },
          { key: 'highlightParentheticals', label: t('settings.highlightParentheticals'), desc: t('settings.highlightParentheticalsDesc') },
        ],
      },
      {
        title: t('settings.sdPromptRules'),
        desc: t('settings.sdPromptRulesDesc'),
        iconKey: 'sd',
        keys: SD_KEYS,
        defaultExpanded: false,
        toggles: [
          { key: 'highlightEmphasisWeights', label: t('settings.highlightEmphasisWeights'), desc: t('settings.highlightEmphasisWeightsDesc') },
          { key: 'highlightLoraRefs', label: t('settings.highlightLoraRefs'), desc: t('settings.highlightLoraRefsDesc') },
          { key: 'highlightBracketEmphasis', label: t('settings.highlightBracketEmphasis'), desc: t('settings.highlightBracketEmphasisDesc') },
          { key: 'highlightSdNegativeHeader', label: t('settings.highlightSdNegativeHeader'), desc: t('settings.highlightSdNegativeHeaderDesc') },
        ],
      },
    ];

    for (const section of sections) {
      this.renderCollapsibleSection(
        parent,
        section.title,
        section.desc,
        section.iconKey,
        section.keys,
        section.toggles,
        section.defaultExpanded,
        t
      );
    }

  }

  // ============================================================
  // Tab 3：规则引擎 — 来源 + Git + 操作 + 报告
  // ============================================================

  private renderEngineTab(parent: HTMLElement, t: (key: string) => string): void {
    renderCard(parent, t('settings.ruleEngine'), t('settings.ruleEngineDesc'), 'cloud', (card) => {
      // 规则来源选择
      new Setting(card)
        .setName(t('settings.ruleSource'))
        .setDesc(t('settings.ruleSourceDesc'))
        .addDropdown((dd) => dd
          .addOption('builtin', t('settings.ruleSourceBuiltin'))
          .addOption('local', t('settings.ruleSourceLocal'))
          .addOption('remote', t('settings.ruleSourceRemote'))
          .setValue(this.plugin.settings.ruleSource)
          .onChange(async (value) => {
            this.plugin.settings.ruleSource = value as 'remote' | 'local' | 'builtin';
            await this.plugin.saveSettings();
            await this.plugin.reloadRules();
            this.display();
          }));

      // Git Raw 地址（仅 remote 模式显示）— 支持自动解析完整 GitHub URL
      if (this.plugin.settings.ruleSource === 'remote') {
        // Git 仓库 URL 输入（支持自动解析）
        new Setting(card)
          .setName(t('settings.gitRepoUrl'))
          .setDesc(t('settings.gitRepoUrlDesc'))
          .addText((text) => text
            .setPlaceholder(t('settings.gitRepoUrlPh'))
            .setValue('')
            .onChange(async (value) => {
              const parsed = parseGitUrl(value);
              if (parsed) {
                // 自动解析成功 — 更新 rawBaseUrl 和分支
                this.plugin.settings.gitRawBaseUrl = parsed.rawBaseUrl;
                this.plugin.settings.gitBranch = parsed.branch;
                await this.plugin.saveSettings();
                new Notice(t('notice.gitParsed'));
                this.display();
              }
            }));

        // 解析状态提示行
        const parseHint = card.createDiv({ cls: 'pc-git-parse-hint' });
        parseHint.createSpan({
          cls: 'pc-git-parse-status',
          text: `${t('settings.gitRawBaseUrl')}: ${this.plugin.settings.gitRawBaseUrl}`,
        });

        // 手动编辑 rawBaseUrl
        new Setting(card)
          .setName(t('settings.gitRawBaseUrl'))
          .setDesc(t('settings.gitRawBaseUrlDesc'))
          .addText((text) => text
            .setPlaceholder(t('settings.gitRawBaseUrlPh'))
            .setValue(this.plugin.settings.gitRawBaseUrl)
            .onChange(async (value) => {
              this.plugin.settings.gitRawBaseUrl = value.trim();
              await this.plugin.saveSettings();
            }));

        new Setting(card)
          .setName(t('settings.gitBranch'))
          .setDesc(t('settings.gitBranchDesc'))
          .addText((text) => text
            .setPlaceholder('main')
            .setValue(this.plugin.settings.gitBranch)
            .onChange(async (value) => {
              this.plugin.settings.gitBranch = value.trim() || 'main';
              await this.plugin.saveSettings();
            }));

        // 自动检查更新
        new Setting(card)
          .setName(t('settings.autoUpdateRules'))
          .setDesc(t('settings.autoUpdateRulesDesc'))
          .addToggle((toggle) => toggle
            .setValue(this.plugin.settings.autoUpdateRules)
            .onChange(async (value) => {
              this.plugin.settings.autoUpdateRules = value;
              await this.plugin.saveSettings();
              this.display();
            }));

        // 自动检查间隔
        if (this.plugin.settings.autoUpdateRules) {
          new Setting(card)
            .setName(t('settings.autoUpdateInterval'))
            .setDesc(t('settings.autoUpdateIntervalDesc'))
            .addSlider((slider) => slider
              .setLimits(1, 72, 1)
              .setValue(this.plugin.settings.autoUpdateInterval)
              .setDynamicTooltip()
              .onChange(async (value) => {
                this.plugin.settings.autoUpdateInterval = value;
                await this.plugin.saveSettings();
              }));
        }
      }

      // 上下文语义过滤
      new Setting(card)
        .setName(t('settings.contextSemantic'))
        .setDesc(t('settings.contextSemanticDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.contextSemanticEnabled)
          .onChange(async (value) => {
            this.plugin.settings.contextSemanticEnabled = value;
            await this.plugin.saveSettings();
            this.plugin.refreshEditorExtensions();
          }));

      // 词典精细化着色
      new Setting(card)
        .setName(t('settings.lexiconEnabled'))
        .setDesc(t('settings.lexiconEnabledDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.lexiconEnabled)
          .onChange(async (value) => {
            this.plugin.settings.lexiconEnabled = value;
            await this.plugin.saveSettings();
            this.plugin.refreshEditorExtensions();
          }));

      // 当前规则版本显示
      const ruleVersion = this.plugin.getRuleVersion();
      new Setting(card)
        .setName(t('settings.ruleVersion'))
        .setDesc(t('settings.ruleVersionDesc'))
        .addText((text) => text
          .setValue(ruleVersion)
          .setDisabled(true));

      // 操作按钮行
      const btnRow = card.createDiv({ cls: 'pc-batch-row' });
      btnRow.createSpan({ text: '' });

      const btnActions = btnRow.createDiv({ cls: 'pc-batch-actions', attr: { style: 'display: flex; gap: 4px;' } });

      // 检查更新按钮（仅 remote 模式可用）
      const checkBtn = btnActions.createEl('button', {
        cls: 'pc-batch-btn',
        text: t('settings.checkUpdate'),
      });
      checkBtn.addEventListener('click', async () => {
        await this.plugin.checkForUpdates(true);
        this.display();
      });
      if (this.plugin.settings.ruleSource !== 'remote') {
        checkBtn.setAttribute('disabled', 'true');
        checkBtn.style.opacity = '0.5';
      }

      // 重新加载按钮
      const reloadBtn = btnActions.createEl('button', {
        cls: 'pc-batch-btn',
        text: t('settings.reloadRules'),
      });
      reloadBtn.addEventListener('click', async () => {
        await this.plugin.reloadRules();
        new Notice(this.plugin.t('notice.rulesReloaded'));
        this.display();
      });

      // 清空缓存按钮
      const clearBtn = btnActions.createEl('button', {
        cls: 'pc-batch-btn mod-warning',
        text: t('settings.clearCache'),
      });
      clearBtn.addEventListener('click', async () => {
        await this.plugin.clearRuleCache();
        new Notice(this.plugin.t('notice.cacheCleared'));
        this.display();
      });

      // ================================================================
      // 拉取报告设置
      // ================================================================
      card.createDiv({ cls: 'pc-setting-divider' });

      new Setting(card)
        .setName(t('settings.gitReportEnabled'))
        .setDesc(t('settings.gitReportEnabledDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.gitReportEnabled)
          .onChange(async (value) => {
            this.plugin.settings.gitReportEnabled = value;
            await this.plugin.saveSettings();
            this.display();
          }));

      new Setting(card)
        .setName(t('settings.downloadToCache'))
        .setDesc(t('settings.downloadToCacheDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.downloadToCache)
          .onChange(async (value) => {
            this.plugin.settings.downloadToCache = value;
            await this.plugin.saveSettings();
          }));

      // 拉取报告面板（仅当启用拉取报告时显示）
      if (this.plugin.settings.gitReportEnabled) {
        this.renderPullReport(card, t);
      }
    });
  }

  // ============================================================
  // Tab 4：文件与显示 — 检测 + 颜色 + 显示选项
  // ============================================================

  private renderFilesTab(parent: HTMLElement, t: (key: string) => string): void {
    // 文件类型检测
    renderCard(parent, t('settings.fileDetection'), t('settings.fileDetectionDesc'), 'detection', (card) => {
      new Setting(card)
        .setName(t('settings.detectByFrontmatter'))
        .setDesc(t('settings.detectByFrontmatterDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.detectByFrontmatter)
          .onChange(async (value) => {
            this.plugin.settings.detectByFrontmatter = value;
            await this.plugin.saveSettings();
            this.plugin.refreshFileColorizer();
          }));

      new Setting(card)
        .setName(t('settings.detectByFolder'))
        .setDesc(t('settings.detectByFolderDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.detectByFolder)
          .onChange(async (value) => {
            this.plugin.settings.detectByFolder = value;
            await this.plugin.saveSettings();
            this.plugin.refreshFileColorizer();
          }));

      new Setting(card)
        .setName(t('settings.detectByFilename'))
        .setDesc(t('settings.detectByFilenameDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.detectByFilename)
          .onChange(async (value) => {
            this.plugin.settings.detectByFilename = value;
            await this.plugin.saveSettings();
            this.plugin.refreshFileColorizer();
          }));
    });

    // 显示选项
    renderCard(parent, t('settings.displayOptions'), t('settings.displayOptionsDesc'), 'display', (card) => {
      new Setting(card)
        .setName(t('settings.fileColorizer'))
        .setDesc(t('settings.fileColorizerDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.fileColorizerEnabled)
          .onChange(async (value) => {
            this.plugin.settings.fileColorizerEnabled = value;
            await this.plugin.saveSettings();
            this.plugin.refreshFileColorizer();
            this.updateStatusBar();
          }));
    });

  }

  // ============================================================
  // Tab：包管理 — 左侧包列表 + 右侧详情（主从布局）
  // ============================================================

  private async renderPackagesTab(parent: HTMLElement, t: (key: string) => string): Promise<void> {
    const wrap = parent.createDiv({ cls: 'pc-pkg-tab' });

    // 顶部工具栏
    const toolbar = wrap.createDiv({ cls: 'pc-pkg-toolbar' });
    const newBtn = toolbar.createEl('button', { text: '新建包', cls: 'pc-pkg-btn' });
    newBtn.addEventListener('click', () => {
      openRenameModal(this.app, '', async (name) => {
        if (!name.trim()) return;
        await createEmptyPackage(this.plugin, name.trim());
        await this.plugin.reloadPackages();
        this.display();
      });
    });
    const importBtn = toolbar.createEl('button', { text: '导入包', cls: 'pc-pkg-btn' });
    importBtn.addEventListener('click', () => {
      importStylePkg(this.plugin, async () => {
        await this.plugin.reloadPackages();
        this.display();
      });
    });

    // 模式切换
    const modeWrap = toolbar.createDiv({ cls: 'pc-pkg-mode-switch' });
    const isMulti = this.plugin.settings.packageMode === 'multi';
    const singleBtn = modeWrap.createEl('button', { text: '单选', cls: 'pc-pkg-btn' });
    const multiBtn = modeWrap.createEl('button', { text: '叠加', cls: 'pc-pkg-btn' });
    if (!isMulti) singleBtn.addClass('is-active');
    else multiBtn.addClass('is-active');
    singleBtn.addEventListener('click', async () => {
      await setPackageMode(this.plugin, 'single');
      this.display();
    });
    multiBtn.addEventListener('click', async () => {
      await setPackageMode(this.plugin, 'multi');
      this.display();
    });

    // 主从布局
    const main = wrap.createDiv({ cls: 'pc-pkg-main' });
    const listPane = main.createDiv({ cls: 'pc-pkg-list-pane' });
    const detailPane = main.createDiv({ cls: 'pc-pkg-detail-pane' });

    const packages = this.plugin.loadedPackages;
    const enabledSet = new Set(this.plugin.settings.enabledPackageIds);

    // 左侧包列表
    for (const pkg of packages) {
      const row = listPane.createDiv({ cls: 'pc-pkg-row' });
      if (pkg.dirName === this.selectedPkgDir) row.addClass('is-selected');
      if (pkg.status !== 'ok') row.addClass('is-warn');

      const cb = row.createEl('input', { type: 'checkbox', cls: 'pc-pkg-row-cb' }) as HTMLInputElement;
      cb.checked = enabledSet.has(pkg.dirName);
      cb.disabled = pkg.status === 'invalid';
      cb.addEventListener('change', async () => {
        await togglePackageEnabled(this.plugin, pkg.dirName);
        this.display();
      });

      const dot = row.createSpan({ cls: 'pc-pkg-dot' });
      dot.style.background = pkg.manifest?.tagColor ?? '#999';

      row.createSpan({ cls: 'pc-pkg-name', text: pkg.manifest?.name ?? pkg.dirName });

      const tokN = pkg.refTokenIds?.length ?? 0;
      const ruleN = pkg.refRuleIds?.length ?? 0;
      row.createSpan({ cls: 'pc-pkg-badge', text: `T${tokN} R${ruleN}` });

      if (pkg.isBuiltin) row.createSpan({ cls: 'pc-pkg-tag', text: '内置' });
      if (pkg.status !== 'ok') row.createSpan({ cls: 'pc-pkg-tag is-warn', text: pkg.status });

      row.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).classList.contains('pc-pkg-row-cb')) return;
        this.selectedPkgDir = pkg.dirName;
        this.display();
      });
    }

    // 右侧详情
    const selected = packages.find((p) => p.dirName === this.selectedPkgDir) ?? packages[0];
    if (selected) {
      this.selectedPkgDir = selected.dirName;
      this.renderPackageDetail(detailPane, selected, t);
    } else {
      detailPane.createDiv({ cls: 'pc-pkg-empty', text: '尚无包，点击「新建包」创建。' });
    }
  }

  private renderPackageDetail(parent: HTMLElement, pkg: LoadedPackage, t: (key: string) => string): void {
    if (!pkg.manifest) {
      parent.createDiv({ cls: 'pc-pkg-invalid', text: '该包清单损坏（package.json 无效），无法管理。可尝试删除后重新导入。' });
      return;
    }
    const m = pkg.manifest;
    const refTokenIds = new Set(pkg.refTokenIds ?? []);
    const refRuleIds = new Set(pkg.refRuleIds ?? []);

    // 包头卡片
    const header = parent.createDiv({ cls: 'pc-pkg-header' });
    const titleRow = header.createDiv({ cls: 'pc-pkg-title-row' });
    const dot = titleRow.createSpan({ cls: 'pc-pkg-dot' });
    dot.style.background = m.tagColor;
    titleRow.createEl('h3', { text: m.name });
    if (m.description) header.createEl('p', { cls: 'pc-pkg-desc', text: m.description });
    header.createSpan({ cls: 'pc-pkg-meta', text: `ID: ${m.packageId} · v${m.version} · ${m.type}${m.usageTag ? ' · ' + m.usageTag : ''}` });

    // 操作按钮
    const actions = header.createDiv({ cls: 'pc-pkg-actions' });
    if (!pkg.isBuiltin) {
      const renameBtn = actions.createEl('button', { text: '重命名', cls: 'pc-pkg-btn' });
      renameBtn.addEventListener('click', () => {
        openRenameModal(this.app, m.name, async (name) => {
          if (!name.trim()) return;
          await renamePackage(this.plugin, pkg, name.trim());
          await this.plugin.reloadPackages();
          this.display();
        });
      });
      const copyBtn = actions.createEl('button', { text: '复制', cls: 'pc-pkg-btn' });
      copyBtn.addEventListener('click', async () => {
        await copyPackage(this.plugin, pkg);
        await this.plugin.reloadPackages();
        this.display();
      });
      const cloneBtn = actions.createEl('button', { text: '克隆', cls: 'pc-pkg-btn' });
      cloneBtn.addEventListener('click', async () => {
        await clonePackage(this.plugin, pkg);
        await this.plugin.reloadPackages();
        this.display();
      });
      const delBtn = actions.createEl('button', { text: '删除', cls: 'pc-pkg-btn is-danger' });
      delBtn.addEventListener('click', () => {
        openConfirmModal(this.app, '删除包', `确认删除包「${m.name}」？此操作不可撤销。`, async () => {
          await deletePackage(this.plugin, pkg);
          this.selectedPkgDir = null;
          await this.plugin.reloadPackages();
          this.display();
        });
      });
    }
    const exportBtn = actions.createEl('button', { text: '导出', cls: 'pc-pkg-btn' });
    exportBtn.addEventListener('click', () => exportPackage(this.plugin, pkg));
    const fixBtn = actions.createEl('button', { text: '修复失效引用', cls: 'pc-pkg-btn' });
    fixBtn.addEventListener('click', async () => {
      await removeInvalidRefsFromPackage(this.plugin, pkg);
      this.display();
    });

    // 着色规则引用区
    const rulesSection = parent.createEl('details', { cls: 'pc-pkg-section' });
    rulesSection.createEl('summary', { text: `着色规则引用（${refRuleIds.size}）` });
    const ruleIdToCssClass = this.plugin.getRuleIdToCssClassMap();
    const ruleIds = Object.keys(ruleIdToCssClass);
    if (ruleIds.length === 0) {
      rulesSection.createDiv({ cls: 'pc-pkg-empty', text: '当前规则集为空。' });
    } else {
      for (const ruleId of ruleIds) {
        const cssClass = ruleIdToCssClass[ruleId];
        const item = rulesSection.createDiv({ cls: 'pc-pkg-ref-row' });
        item.createSpan({ cls: 'pc-pkg-ref-name', text: ruleId });
        item.createSpan({ cls: 'pc-pkg-ref-css', text: cssClass });
        const sw = item.createEl('input', { type: 'checkbox', cls: 'pc-pkg-ref-sw' }) as HTMLInputElement;
        sw.checked = refRuleIds.has(ruleId);
        sw.addEventListener('change', async () => {
          await toggleRefInPackage(this.plugin, pkg.dirName, 'rule', ruleId, sw.checked);
          this.display();
        });
      }
    }

    // 令牌引用区
    const tokenSection = parent.createEl('details', { cls: 'pc-pkg-section' });
    tokenSection.createEl('summary', { text: `令牌引用（${refTokenIds.size}）` });

    // 自定义文本令牌
    const customTokens = this.plugin.settings.customTextColors ?? [];
    if (customTokens.length > 0) {
      tokenSection.createEl('h4', { text: '自定义文本令牌' });
      for (const c of customTokens) {
        const item = tokenSection.createDiv({ cls: 'pc-pkg-ref-row' });
        const cDot = item.createSpan({ cls: 'pc-pkg-ref-dot' });
        cDot.style.background = c.color;
        item.createSpan({ cls: 'pc-pkg-ref-name', text: c.text || c.id });
        const sw = item.createEl('input', { type: 'checkbox', cls: 'pc-pkg-ref-sw' }) as HTMLInputElement;
        sw.checked = refTokenIds.has(c.id);
        sw.addEventListener('change', async () => {
          await toggleRefInPackage(this.plugin, pkg.dirName, 'token', c.id, sw.checked);
          this.display();
        });
      }
    } else {
      tokenSection.createDiv({ cls: 'pc-pkg-empty', text: '尚无自定义文本令牌。' });
    }

    // 词汇令牌 + 颜色令牌（全局开关，嵌入包详情）
    const vocabWrap = tokenSection.createDiv({ cls: 'pc-pkg-global-tokens' });
    vocabWrap.createEl('h4', { text: '词汇令牌（全局开关）' });
    this.renderVocabTokenCards(vocabWrap, t);
    const colorWrap = tokenSection.createDiv({ cls: 'pc-pkg-global-tokens' });
    colorWrap.createEl('h4', { text: '颜色令牌（全局开关）' });
    this.renderTokenCards(colorWrap, t);
  }

  // ============================================================
  // Tab 2：着色规则 — 搜索 + 高亮开关区（联动颜色选择器）
  // 令牌卡片已移至 Tab 3（颜色），开关↔令牌跨 Tab 联动
  // ============================================================

  private renderRulesTab(parent: HTMLElement, t: (key: string) => string): void {
    // 顶部搜索框 — 模糊匹配开关名
    this.renderRulesSearchBox(parent, t);

    // 高亮开关区（4 折叠分组，开关旁联动颜色选择器）
    this.renderHighlightRulesSection(parent, t);
  }

  /**
   * 渲染着色规则搜索框 — 实时过滤开关名 / 令牌名
   * 匹配项高亮，非匹配项 opacity 0.3
   */
  private renderRulesSearchBox(parent: HTMLElement, t: (key: string) => string): void {
    const box = parent.createDiv({ cls: 'pc-search-box' });
    const icon = box.createSpan({ cls: 'pc-search-icon' });
    icon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

    const input = box.createEl('input', {
      cls: 'pc-search-input',
      attr: { type: 'text', placeholder: t('search.placeholder') },
    }) as HTMLInputElement;
    input.value = this.rulesSearchQuery;

    const hint = box.createSpan({ cls: 'pc-search-hint' });

    const applyFilter = () => {
      const q = this.rulesSearchQuery.trim().toLowerCase();
      const root = this.containerEl.querySelector('.pc-tab-content');
      if (!root) return;

      // 收集所有可搜索项：开关 setting-item
      const items = root.querySelectorAll<HTMLElement>('.pc-collapsible-content .setting-item');
      let matchCount = 0;
      items.forEach((item) => {
        const text = (item.textContent || '').toLowerCase();
        const matched = q === '' || text.includes(q);
        item.classList.toggle('pc-search-hidden', !matched);
        if (matched) matchCount++;
      });

      // 分组可见性：若分组内无匹配项则折叠
      const groups = root.querySelectorAll<HTMLElement>('.pc-collapsible');
      groups.forEach((g) => {
        const visible = g.querySelectorAll('.setting-item:not(.pc-search-hidden)').length;
        g.classList.toggle('pc-search-group-hidden', q !== '' && visible === 0);
      });

      hint.textContent = q === '' ? '' : (matchCount === 0 ? t('search.noMatch') : t('search.matchCount').replace('{count}', String(matchCount)));
    };

    input.addEventListener('input', () => {
      this.rulesSearchQuery = input.value;
      applyFilter();
    });

    // 初次渲染后应用已有查询
    setTimeout(applyFilter, 0);
  }

  // ============================================================
  // Tab：颜色 — 令牌自定义 + 颜色模式 + 文件类型颜色 + 自定义文本颜色 + 配置管理
  // ============================================================

  private renderColorsTab(parent: HTMLElement, t: (key: string) => string): void {

    // 词汇令牌卡片区（v2.8 — 语义领域词汇分组：开关 + 配色 + 词汇量）
    this.renderVocabTokenCards(parent, t);

    // 令牌卡片区（v3 令牌中心化 — toggle + 颜色选择器 + 关联开关 chip）
    this.renderTokenCards(parent, t);

    // 文件类型颜色
    renderCard(parent, t('settings.fileTypeColors'), t('settings.fileTypeColorsDesc'), 'colors', (card) => {
      for (const colorConfig of this.plugin.settings.fileTypeColors) {
        new Setting(card)
          .setName(colorConfig.label)
          .addColorPicker((picker) => picker
            .setValue(colorConfig.color)
            .onChange(async (value) => {
              colorConfig.color = value;
              await this.plugin.saveSettings();
              this.plugin.refreshFileColorizer();
              this.plugin.applyColorMode();
            }))
          .addText((text) => text
            .setValue(colorConfig.color)
            .onChange(async (value) => {
              if (/^#[0-9a-fA-F]{6}$/.test(value)) {
                colorConfig.color = value;
                await this.plugin.saveSettings();
                this.plugin.refreshFileColorizer();
                this.plugin.applyColorMode();
              }
            }));
      }

      // 重置按钮 — 带确认对话框（可容错原则）
      new Setting(card)
        .setName(t('settings.resetColors'))
        .setDesc(t('settings.resetColorsDesc'))
        .addButton((btn) => btn
          .setButtonText(t('settings.reset'))
          .setWarning()
          .onClick(async () => {
            createConfirmDialog(
              this.containerEl,
              this.plugin.t.bind(this.plugin),
              t('confirm.resetTitle'),
              t('confirm.resetDesc'),
              async () => {
                this.plugin.settings.fileTypeColors = [...DEFAULT_FILE_TYPE_COLORS];
                await this.plugin.saveSettings();
                this.plugin.refreshFileColorizer();
                this.display();
                new Notice(this.plugin.t('notice.colorsReset'));
              }
            );
          }));
    });


    // 自定义文本颜色区域（按文本内容匹配，不写入 md）
    this.renderCustomTextColors(parent, t);

    // 配置管理（导出/导入）
    this.renderConfigManagement(parent, t);
  }

  // ============================================================
  // 配置管理（导出/导入，支持多文件导入合并）
  // ============================================================

  private renderConfigManagement(parent: HTMLElement, t: (key: string) => string): void {
    renderCard(parent, t('settings.configManagement'), t('settings.configManagementDesc'), 'global', (card) => {
      new Setting(card)
        .setName(t('settings.exportConfig'))
        .setDesc(t('settings.exportConfigDesc'))
        .addButton((btn) => btn
          .setButtonText(t('settings.export'))
          .setCta()
          .onClick(() => {
            const data = buildExportData(this.plugin.settings, this.plugin.manifest.version);
            downloadConfigJson(data);
            new Notice(t('notice.configExported'));
          }));

      const importSetting = new Setting(card)
        .setName(t('settings.importConfig'))
        .setDesc(t('settings.importConfigDesc'));

      const fileInput = card.createEl('input', {
        attr: { type: 'file', accept: 'application/json,.json', multiple: 'multiple' },
      });
      fileInput.style.display = 'none';
      fileInput.addEventListener('change', async () => {
        const files = fileInput.files;
        if (!files || files.length === 0) return;
        const dataList: Partial<PromptColorizerSettings>[] = [];
        for (const file of Array.from(files)) {
          try {
            const text = await file.text();
            dataList.push(parseConfigJson(text));
          } catch {
            new Notice(`${t('notice.importFailed')}: ${file.name}`);
          }
        }
        if (dataList.length === 0) return;
        const count = String(dataList.length);
        createConfirmDialog(
          this.containerEl,
          this.plugin.t.bind(this.plugin),
          t('confirm.importTitle'),
          t('confirm.importDesc').replace('{count}', count),
          async () => {
            this.plugin.settings = mergeMultipleImports(this.plugin.settings, dataList);
            await this.plugin.saveSettings();
            this.plugin.refreshDynamicStyles();
            this.plugin.refreshEditorExtensions();
            this.plugin.refreshFileColorizer();
            this.display();
            new Notice(t('notice.configImported').replace('{count}', count));
          }
        );
        fileInput.value = '';
      });

      importSetting.addButton((btn) => btn
        .setButtonText(t('settings.import'))
        .onClick(() => fileInput.click()));
    });
  }

  // ============================================================
  // 自定义文本颜色面板
  // ============================================================

  /**
   * 渲染自定义文本颜色管理区域
   * 显示所有自定义颜色规则列表，支持启用/禁用、编辑、删除
   * 顶部提示用户：在编辑器中选中文本后通过命令添加
   *
   * 颜色信息仅保存在插件本地数据，不会写入 md 文件
   */
  // ============================================================
  // v2.9 色彩玩法：衍生透明度 / 文件夹色板
  // ============================================================

  /**
   * 渲染衍生透明度设置（soft/border 自动衍生比例，项 3）
   * 数值含义：0.06 = 6% 不透明度；范围 0.01–0.6
   */
  private renderDeriveAlphaSettings(parent: HTMLElement, t: (key: string) => string): void {
    const alphas = this.plugin.settings.tokenDeriveAlphas ?? {};

    const addAlphaInput = (
      setting: Setting,
      key: 'softLight' | 'softDark' | 'borderLight' | 'borderDark',
      defaultVal: number
    ) => {
      setting.addText((text) =>
        text
          .setPlaceholder(String(defaultVal))
          .setValue(alphas[key] !== undefined ? String(alphas[key]) : '')
          .onChange(async (value) => {
            const num = parseFloat(value);
            const clamped = Math.min(0.6, Math.max(0.01, isNaN(num) ? defaultVal : num));
            if (!this.plugin.settings.tokenDeriveAlphas) {
              this.plugin.settings.tokenDeriveAlphas = {};
            }
            if (isNaN(num)) {
              delete this.plugin.settings.tokenDeriveAlphas[key];
            } else {
              this.plugin.settings.tokenDeriveAlphas[key] = clamped;
            }
            await this.plugin.saveSettings();
            this.plugin.applyColorMode();
          })
      );
    };

    const s1 = new Setting(parent)
      .setName(t('settings.alphaSoft'))
      .setDesc(t('settings.alphaSoftDesc'));
    addAlphaInput(s1, 'softLight', 0.06);
    addAlphaInput(s1, 'softDark', 0.10);

    const s2 = new Setting(parent)
      .setName(t('settings.alphaBorder'))
      .setDesc(t('settings.alphaBorderDesc'));
    addAlphaInput(s2, 'borderLight', 0.15);
    addAlphaInput(s2, 'borderDark', 0.20);
  }

  /**
   * 渲染文件夹色板映射（项 10）：路径 + 色板下拉，可增删
   */
  private renderFolderPalettes(
    parent: HTMLElement,
    t: (key: string) => string,
    palettes: Record<string, { name: unknown }>
  ): void {
    const setting = new Setting(parent)
      .setName(t('settings.folderPalettes'))
      .setDesc(t('settings.folderPalettesDesc'))
      .addToggle((tg) => tg
        .setValue(!!this.plugin.settings.folderPalettesEnabled)
        .onChange(async (value) => {
          this.plugin.settings.folderPalettesEnabled = value;
          await this.plugin.saveSettings();
          this.plugin.applyColorMode();
        }));

    const listWrap = parent.createDiv({ cls: 'pc-folder-palette-list' });
    const renderList = () => {
      listWrap.empty();
      const items = this.plugin.settings.folderPalettes ?? [];
      for (let i = 0; i < items.length; i++) {
        const row = listWrap.createDiv({ cls: 'pc-folder-palette-row' });
        row.createEl('input', {
          cls: 'pc-folder-palette-path',
          attr: { type: 'text', placeholder: 'projects/tech' },
        }) as HTMLInputElement;
        const pathInput = row.querySelector('input') as HTMLInputElement;
        pathInput.value = items[i].path;

        const select = row.createEl('select', { cls: 'pc-folder-palette-select dropdown' }) as HTMLSelectElement;
        select.createEl('option', { text: t('settings.paletteDefault'), attr: { value: '' } });
        for (const [key, preset] of Object.entries(palettes)) {
          const name = typeof preset.name === 'string' ? preset.name : ((preset.name as any)?.zh ?? key);
          select.createEl('option', { text: `${name} (${key})`, attr: { value: key } });
        }
        select.value = items[i].palette;

        const removeBtn = row.createEl('button', {
          cls: 'pc-folder-palette-remove',
          text: '✕',
          attr: { 'aria-label': t('customText.delete'), title: t('customText.delete') },
        });
        removeBtn.addEventListener('click', async () => {
          this.plugin.settings.folderPalettes.splice(i, 1);
          await this.plugin.saveSettings();
          this.plugin.applyColorMode();
          renderList();
        });

        // 变更写回
        pathInput.addEventListener('change', async () => {
          items[i].path = pathInput.value.trim().replace(/^\/+|\/+$/g, '');
          await this.plugin.saveSettings();
          this.plugin.applyColorMode();
        });
        select.addEventListener('change', async () => {
          items[i].palette = select.value;
          await this.plugin.saveSettings();
          this.plugin.applyColorMode();
        });
      }
    };
    renderList();

    setting.addButton((btn) => btn
      .setButtonText(t('settings.folderPaletteAdd'))
      .setCta()
      .onClick(async () => {
        if (!this.plugin.settings.folderPalettes) {
          this.plugin.settings.folderPalettes = [];
        }
        this.plugin.settings.folderPalettes.push({ path: '', palette: '' });
        this.plugin.settings.folderPalettesEnabled = true;
        await this.plugin.saveSettings();
        renderList();
      }));
  }

  private renderCustomTextColors(parent: HTMLElement, t: (key: string) => string): void {
    renderCard(parent, t('customText.section'), t('customText.sectionDesc'), 'colors', (card) => {
      card.addClass('pc-custom-text');

      // 1. 总开关
      new Setting(card)
        .setName(t('customText.enabled'))
        .setDesc(t('customText.enabledDesc'))
        .addToggle((toggle) =>
          toggle
            .setValue(this.plugin.settings.customTextColorsEnabled !== false)
            .onChange(async (value) => {
              this.plugin.settings.customTextColorsEnabled = value;
              await this.plugin.saveSettings();
              this.plugin.applyCustomTextColorsStyles();
              this.plugin.refreshEditorExtensions();
              this.display();
            })
        );

      // 1.1 浮动面板自动弹出开关
      new Setting(card)
        .setName(t('customText.popoverAutoShow'))
        .setDesc(t('customText.popoverAutoShowDesc'))
        .addToggle((toggle) =>
          toggle
            .setValue(this.plugin.settings.customTextPopoverAutoShow !== false)
            .onChange(async (value) => {
              this.plugin.settings.customTextPopoverAutoShow = value;
              await this.plugin.saveSettings();
              this.display();
            })
        );

      // 1.2 浮动面板显示延迟
      new Setting(card)
        .setName(t('customText.popoverDelay'))
        .setDesc(t('customText.popoverDelayDesc'))
        .addText((text) =>
          text
            .setPlaceholder('350')
            .setValue(String(this.plugin.settings.customTextPopoverDelay ?? 350))
            .onChange(async (value) => {
              const num = parseInt(value, 10);
              if (!isNaN(num) && num >= 0 && num <= 2000) {
                this.plugin.settings.customTextPopoverDelay = num;
                await this.plugin.saveSettings();
              }
            })
        );

      // 2. 操作提示
      const tipEl = card.createDiv({ cls: 'pc-custom-text-tip' });
      tipEl.createEl('span', {
        cls: 'pc-custom-text-tip-icon',
        text: 'ⓘ',
      });
      tipEl.createEl('span', {
        cls: 'pc-custom-text-tip-text',
        text: t('customText.tip'),
      });

      // 3. 添加按钮（提示用户在编辑器中使用命令）
      new Setting(card)
        .setName(t('customText.add'))
        .setDesc(t('customText.addDesc'))
        .addButton((btn) =>
          btn
            .setButtonText(t('customText.cmdApply'))
            .setCta()
            .onClick(() => {
              // 提示用户使用命令面板中的"为选中文本应用颜色"命令
              new Notice(t('customText.noticeNoSelection'));
            })
        );

      // 4. 分隔线
      card.createDiv({ cls: 'pc-custom-text-divider' });

      // 5. 主从布局：左侧规则列表（可选择）+ 右侧属性面板（v2.14）
      const colors = this.plugin.settings.customTextColors ?? [];
      if (colors.length === 0) {
        card.createDiv({
          cls: 'pc-custom-text-empty',
          text: t('customText.empty'),
        });
        return;
      }

      // 选中 ID 校验：规则可能被删除，选中项失效时回退第一条
      if (!colors.some((c) => c.id === this.selectedCustomTextId)) {
        this.selectedCustomTextId = colors[0]?.id ?? null;
      }

      const masterDetail = card.createDiv({ cls: 'pc-custom-text-md' });
      const listPane = masterDetail.createDiv({ cls: 'pc-custom-text-md-list' });
      const detailPane = masterDetail.createDiv({ cls: 'pc-custom-text-md-detail' });

      for (const item of colors) {
        this.renderCustomTextListItem(listPane, item, t);
      }
      this.renderCustomTextDetail(detailPane, t);
    });
  }

  /** 主从布局：当前选中的规则 ID（跨 display 重建保持） */
  private selectedCustomTextId: string | null = null;

  /**
   * 左侧列表项（可点击选择）：文本 + 色块/渐变条 + 启用态
   */
  private renderCustomTextListItem(
    parent: HTMLElement,
    item: CustomTextColor,
    t: (key: string) => string
  ): void {
    const selected = item.id === this.selectedCustomTextId;
    const entry = parent.createDiv({
      cls: `pc-custom-text-md-item ${selected ? 'selected' : ''} ${item.enabled ? '' : 'disabled'}`,
      attr: { role: 'button', tabindex: '0' },
    });

    // 文本（选中规则的文本色即预览色）
    const textEl = entry.createDiv({ cls: 'pc-custom-text-md-item-text' });
    textEl.setText(item.text.length > 40 ? item.text.slice(0, 40) + '…' : item.text);
    textEl.setAttribute('title', item.text);

    // 色块/渐变条徽标（右对齐小型指示）
    const badge = entry.createDiv({ cls: 'pc-custom-text-md-item-badge' });
    const stopsCss = gradientStopsToCss(normalizeGradientStops(item.gradientStops));
    if (stopsCss) {
      const bar = badge.createDiv({ cls: 'pc-custom-text-md-item-grad' });
      bar.style.background = `linear-gradient(90deg, ${stopsCss})`;
    } else {
      const dot = badge.createDiv({ cls: 'pc-custom-text-md-item-dot' });
      dot.style.background = item.color;
    }

    const select = () => {
      if (this.selectedCustomTextId === item.id) return;
      this.selectedCustomTextId = item.id;
      // 仅刷新主从区（局部重渲染，避免整页 display() 闪动）
      const md = entry.closest('.pc-custom-text-md') as HTMLElement | null;
      if (md) {
        const list = md.querySelector('.pc-custom-text-md-list') as HTMLElement | null;
        const detail = md.querySelector('.pc-custom-text-md-detail') as HTMLElement | null;
        list?.querySelectorAll('.pc-custom-text-md-item').forEach((el) =>
          (el as HTMLElement).classList.remove('selected')
        );
        entry.addClass('selected');
        if (detail) {
          detail.empty();
          this.renderCustomTextDetail(detail, this.plugin.t.bind(this.plugin));
        }
      }
    };
    entry.addEventListener('click', select);
    entry.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select();
      }
    });
  }

  /**
   * 右侧属性面板：实时渲染预览 + 属性分组（颜色/渐变/效果/匹配） + 操作
   */
  private renderCustomTextDetail(
    pane: HTMLElement,
    t: (key: string) => string
  ): void {
    const item = (this.plugin.settings.customTextColors ?? []).find(
      (c) => c.id === this.selectedCustomTextId
    );
    if (!item) {
      pane.createDiv({ cls: 'pc-custom-text-md-empty', text: t('customText.detailEmpty') });
      return;
    }

    // 1. 实时渲染预览（套用 dsl-custom-text-{id} 类，与编辑器所见即所得）
    const previewBox = pane.createDiv({ cls: 'pc-custom-text-md-preview' });
    const previewText = previewBox.createSpan({
      cls: `dsl-custom-text-${item.id}`,
      text: item.text.length > 60 ? item.text.slice(0, 60) + '…' : item.text,
    });

    // 2. 操作行（编辑 / 启停 / 删除）
    const actions = pane.createDiv({ cls: 'pc-custom-text-md-actions' });
    const editBtn = actions.createEl('button', {
      cls: 'pc-custom-text-action-btn pc-custom-text-edit-btn',
      text: t('customText.edit'),
    });
    editBtn.addEventListener('click', () => this.plugin.editCustomTextColor(item.id));

    const toggleBtn = actions.createEl('button', {
      cls: 'pc-custom-text-action-btn',
      text: item.enabled ? t('customText.disableAction') : t('customText.enableAction'),
    });
    toggleBtn.addEventListener('click', async () => {
      await this.plugin.updateCustomTextColor(item.id, { enabled: !item.enabled });
      // 局部刷新属性面板（预览类名不变，样式注入端已由 update 链路刷新）
      const md = pane.closest('.pc-custom-text-md') as HTMLElement | null;
      const detail = md?.querySelector('.pc-custom-text-md-detail') as HTMLElement | null;
      if (detail) {
        detail.empty();
        this.renderCustomTextDetail(detail, this.plugin.t.bind(this.plugin));
      }
    });

    const deleteBtn = actions.createEl('button', {
      cls: 'pc-custom-text-action-btn pc-custom-text-delete-btn',
      text: t('customText.delete'),
    });
    deleteBtn.addEventListener('click', () => {
      createConfirmDialog(
        this.containerEl,
        this.plugin.t.bind(this.plugin),
        t('customText.delete'),
        t('customText.confirmDelete'),
        async () => {
          await this.plugin.deleteCustomTextColor(item.id);
          this.display();
        }
      );
    });

    // 3. 属性分组（键值对列表，专业检查器风格）
    const props = pane.createDiv({ cls: 'pc-custom-text-md-props' });

    const addRow = (labelKey: string, value: string | HTMLElement) => {
      const row = props.createDiv({ cls: 'pc-custom-text-md-prop-row' });
      row.createSpan({ cls: 'pc-custom-text-md-prop-label', text: t(labelKey) });
      if (typeof value === 'string') {
        row.createSpan({ cls: 'pc-custom-text-md-prop-value', text: value });
      } else {
        row.createDiv({ cls: 'pc-custom-text-md-prop-value' }).appendChild(value);
      }
      return row;
    };

    // 3.1 主色（色块 + hex）
    const colorValue = document.createElement('span');
    const swatch = document.createElement('span');
    swatch.className = 'pc-custom-text-md-swatch';
    swatch.style.background = item.color;
    colorValue.appendChild(swatch);
    colorValue.appendChild(document.createTextNode(item.color));
    addRow('customText.colorCol', colorValue);

    // 3.2 渐变（色点数 / 角度 / 色点串 / 渐变条）
    const stopsCss = gradientStopsToCss(normalizeGradientStops(item.gradientStops));
    if (stopsCss) {
      const gradBar = document.createElement('span');
      gradBar.className = 'pc-custom-text-md-gradbar';
      gradBar.style.background = `linear-gradient(90deg, ${stopsCss})`;
      addRow('customText.gradientTitle', `${item.gradientStops!.length} ${t('customText.gradientStopCount')}`);
      addRow('customText.gradientAngle', `${item.gradientAngle ?? 135}°`);
      const gradValue = document.createElement('span');
      gradValue.className = 'pc-custom-text-md-gradtext';
      gradValue.setText(stopsCss);
      addRow('customText.gradientStopsLabel', gradValue);
      addRow('customText.gradientPreview', gradBar);
    } else if (item.color2) {
      addRow('customText.secondaryColor', item.color2);
    }

    // 3.3 效果（多标签；带参数显示 参数名=值）
    const effectList = migrateEffects(item);
    if (effectList.length > 0) {
      const fxValue = document.createElement('span');
      fxValue.className = 'pc-custom-text-md-fxlist';
      for (const eff of effectList) {
        const tag = document.createElement('span');
        tag.className = 'pc-custom-text-md-fxtag';
        let label = t(`customText.effectName_${eff}`);
        const params = item.effectParams?.[eff];
        if (params) {
          const parts = Object.entries(params).map(([k, v]) => `${k}=${v}`);
          if (parts.length > 0) label += ` (${parts.join(', ')})`;
        }
        tag.setText(label);
        fxValue.appendChild(tag);
      }
      addRow('customText.effect', fxValue);
    } else {
      addRow('customText.effect', t('customText.effectNone'));
    }

    // 3.4 匹配选项
    const matchValue = [
      item.caseSensitive ? t('customText.caseShort') : t('customText.caseInsensitive'),
      item.wholeWord ? t('customText.wholeShort') : t('customText.wholeWordOff'),
    ].join(' · ');
    addRow('customText.matchOptions', matchValue);

    // 3.5 状态
    addRow('customText.enabledCol', item.enabled ? t('customText.enabled') : t('customText.disabled'));

    // 3.6 文本内容（全文，避免长文本只出现在 title 里）
    const textValue = document.createElement('span');
    textValue.className = 'pc-custom-text-md-fulltext';
    textValue.setText(item.text);
    addRow('customText.textCol', textValue);

    // 选中态同步（列表项高亮已在 select 中处理；预览样式由注入的 dsl-custom CSS 提供）
    void previewText;
  }

  // ============================================================
  // 令牌卡片面板（v3 令牌中心化控制）
  // ============================================================

  /** 令牌分组定义（v2.8.0 令牌收敛后：基础 10 + 扩展 5 + 多模态 1 = 16） */
  private static readonly TOKEN_GROUPS = [
    { titleKey: 'settings.tokenGroupBasic', descKey: 'settings.tokenGroupBasicDesc', tokens: ['danger','success','warning','info','purple','cyan','pink','amber','orange','paren'], defaultExpanded: true },
    { titleKey: 'settings.tokenGroupExtended', descKey: 'settings.tokenGroupExtendedDesc', tokens: ['indigo','emerald','slate','darkslate','yellow'], defaultExpanded: false },
    { titleKey: 'settings.tokenGroupMultimodal', descKey: 'settings.tokenGroupMultimodalDesc', tokens: ['music'], defaultExpanded: false },
  ];

  /**
   * 渲染令牌卡片（v3 令牌中心化）
   * 每个令牌一个颜色选择器（唯一入口），关联高亮开关以 chip 内嵌
   * chip 可点击 toggle 开关；改色实时生效并更新所有引用处
   */
  /**
   * 词汇令牌卡片区 — 三层结构（大类 → 令牌 → 词汇）
   * 大类：折叠组（全开/全关批量按钮）
   * 令牌：开关 + 颜色选择器 + hex + 词汇量/命中统计 + 词汇预览展开 + 自定义词汇编辑
   */
  private renderVocabTokenCards(parent: HTMLElement, t: (key: string) => string): void {
    const tokens = this.plugin.getVocabTokens();
    const categories = this.plugin.getVocabCategories();
    if (tokens.length === 0) return;

    const hitCounts = this.plugin.getVocabHitCounts();
    const tokenById = new Map(tokens.map((tk) => [tk.id, tk]));

    // 词汇令牌总折叠区
    const rootDetails = parent.createEl('details', { cls: 'pc-token-group-details pc-vocab-group' });
    const rootKey = 'settings.vocabTokens';
    const rootOpen = this.tokenGroupOpenStates.get(rootKey) ?? true;
    if (rootOpen) rootDetails.setAttribute('open', '');
    rootDetails.addEventListener('toggle', () => {
      this.tokenGroupOpenStates.set(rootKey, rootDetails.open);
    });
    const rootSummary = rootDetails.createEl('summary', { cls: 'pc-token-group-summary' });
    rootSummary.createSpan({ text: t('settings.vocabTokens') });
    rootSummary.createSpan({ cls: 'pc-token-group-count', text: t('settings.tokenGroupCount').replace('{count}', String(tokens.length)) });

    const rootStyle = getComputedStyle(document.documentElement);
    const resolveColor = (value: string): string => {
      if (value.startsWith('#')) return value;
      const m = value.match(/var\((--[\w-]+)\)/);
      if (m) return rootStyle.getPropertyValue(m[1]).trim();
      return '';
    };

    // === 大类层 ===
    for (const category of categories) {
      const catTokens = category.tokenIds
        .map((id) => tokenById.get(id))
        .filter((tk): tk is NonNullable<typeof tk> => !!tk);
      if (catTokens.length === 0) continue;

      const catDetails = rootDetails.createEl('details', { cls: 'pc-vocab-category' });
      const catKey = `vocab-cat-${category.id}`;
      const catOpen = this.tokenGroupOpenStates.get(catKey) ?? false;
      if (catOpen) catDetails.setAttribute('open', '');
      catDetails.addEventListener('toggle', () => {
        this.tokenGroupOpenStates.set(catKey, catDetails.open);
      });

      const catSummary = catDetails.createEl('summary', { cls: 'pc-vocab-category-summary' });
      catSummary.createSpan({ text: category.name });
      catSummary.createSpan({ cls: 'pc-token-group-count', text: t('settings.tokenGroupCount').replace('{count}', String(catTokens.length)) });

      // 大类级批量按钮
      const catBatch = catSummary.createDiv({ cls: 'pc-token-group-batch' });
      const enBtn = catBatch.createEl('button', { cls: 'pc-batch-btn pc-batch-btn-sm', text: t('batch.enableAll') });
      enBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!this.plugin.settings.vocabTokenEnabled) this.plugin.settings.vocabTokenEnabled = {};
        for (const tk of catTokens) this.plugin.settings.vocabTokenEnabled[tk.id] = true;
        this.plugin.saveSettings().then(() => { this.plugin.refreshEditorExtensions(); this.display(); });
      });
      const disBtn = catBatch.createEl('button', { cls: 'pc-batch-btn pc-batch-btn-sm', text: t('batch.disableAll') });
      disBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!this.plugin.settings.vocabTokenEnabled) this.plugin.settings.vocabTokenEnabled = {};
        for (const tk of catTokens) this.plugin.settings.vocabTokenEnabled[tk.id] = false;
        this.plugin.saveSettings().then(() => { this.plugin.refreshEditorExtensions(); this.display(); });
      });
      const rstBtn = catBatch.createEl('button', { cls: 'pc-batch-btn pc-batch-btn-sm', text: t('batch.reset') });
      rstBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.plugin.settings.vocabColors) {
          for (const tk of catTokens) delete this.plugin.settings.vocabColors[tk.id];
        }
        this.plugin.saveSettings().then(() => {
          this.plugin.refreshDynamicStyles();
          this.display();
          new Notice(t('notice.tokenGroupColorsReset'));
        });
      });

      // === 令牌层 ===
      for (const token of catTokens) {
        this.renderVocabTokenItem(catDetails, token, hitCounts[token.id] ?? 0, resolveColor, t);
      }
    }
  }

  /**
   * 渲染单个词汇令牌条目（含词汇预览 + 自定义词汇编辑）
   */
  private renderVocabTokenItem(
    parent: HTMLElement,
    token: VocabTokenInfo,
    hitCount: number,
    resolveColor: (v: string) => string,
    t: (key: string) => string
  ): void {
    const currentHex = resolveColor(token.color) || token.defaultColor || '#8b5cf6';
    const wordLabel = t('settings.vocabWordCount').replace('{count}', String(token.wordCount));
    const hitLabel = t('settings.vocabHitCount').replace('{count}', String(hitCount));

    const setting = new Setting(parent).setName(token.name).setDesc(`${token.desc} · ${wordLabel} · ${hitLabel}`);

    let colorPicker: ColorComponent | null = null;
    let colorText: any = null;
    setting.settingEl.classList.toggle('is-token-disabled', !token.enabled);

    // 启用开关
    setting.addToggle((toggle) => toggle
      .setValue(token.enabled)
      .onChange(async (value) => {
        if (!this.plugin.settings.vocabTokenEnabled) this.plugin.settings.vocabTokenEnabled = {};
        this.plugin.settings.vocabTokenEnabled[token.id] = value;
        await this.plugin.saveSettings();
        this.plugin.refreshEditorExtensions();
        if (colorPicker) colorPicker.setDisabled(!value);
        if (colorText) colorText.setDisabled(!value);
        setting.settingEl.classList.toggle('is-token-disabled', !value);
        // 同步状态栏「已启用词汇令牌」计数
        this.updateStatusBar();
      }));

    const previewDot = setting.controlEl.createEl('span', {
      cls: 'pc-color-preview',
      attr: { style: `background-color: ${currentHex};` },
    });

    // 颜色选择器
    setting.addColorPicker((picker) => {
      colorPicker = picker;
      picker.setValue(currentHex).setDisabled(!token.enabled);
      picker.onChange(async (value) => {
        if (!this.plugin.settings.vocabColors) this.plugin.settings.vocabColors = {};
        this.plugin.settings.vocabColors[token.id] = value;
        await this.plugin.saveSettings();
        this.plugin.refreshDynamicStyles();
        previewDot.style.backgroundColor = value;
      });
    });

    // hex 输入框
    setting.addText((text) => {
      colorText = text;
      text.setValue(currentHex).setDisabled(!token.enabled);
      text.inputEl.addEventListener('change', async () => {
        const hex = text.getValue().trim();
        if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
        if (!this.plugin.settings.vocabColors) this.plugin.settings.vocabColors = {};
        this.plugin.settings.vocabColors[token.id] = hex;
        await this.plugin.saveSettings();
        this.plugin.refreshDynamicStyles();
        previewDot.style.backgroundColor = hex;
      });
    });

    // === 词汇层：词汇预览 + 自定义编辑（子折叠区） ===
    const wrapper = setting.settingEl;
    wrapper.classList.add('pc-vocab-token-item');

    const wordToggle = wrapper.createDiv({ cls: 'pc-vocab-words-toggle' });
    wordToggle.setText(t('settings.vocabPreview'));
    const wordsPanel = wrapper.createDiv({ cls: 'pc-vocab-words-panel' });
    let wordsOpen = false;

    const renderWordsPanel = () => {
      wordsPanel.empty();
      if (!wordsOpen) {
        wordsPanel.classList.remove('is-open');
        return;
      }
      wordsPanel.classList.add('is-open');

      const { builtin, custom } = this.plugin.getVocabWords(token.id);

      // 搜索过滤
      const searchBox = wordsPanel.createDiv({ cls: 'pc-vocab-words-search' });
      const searchInput = searchBox.createEl('input', {
        cls: 'pc-vocab-words-search-input',
        attr: { type: 'text', placeholder: t('settings.vocabSearchWords') },
      });
      const chipsBox = wordsPanel.createDiv({ cls: 'pc-vocab-words-chips' });

      const renderChips = () => {
        chipsBox.empty();
        const q = searchInput.value.trim().toLowerCase();
        const all = [
          ...custom.map((w) => ({ w, custom: true })),
          ...builtin.filter((b) => !custom.includes(b)).map((w) => ({ w, custom: false })),
        ];
        const filtered = q ? all.filter((item) => item.w.toLowerCase().includes(q)) : all;
        if (filtered.length === 0) {
          chipsBox.createDiv({ cls: 'pc-vocab-words-empty', text: t('colorMap.noResults') });
          return;
        }
        // 分页：最多展示 200 个词汇
        const MAX = 200;
        for (const item of filtered.slice(0, MAX)) {
          const chip = chipsBox.createSpan({ cls: `pc-vocab-chip${item.custom ? ' is-custom' : ''}`, text: item.w });
          if (item.custom) {
            chip.createSpan({ cls: 'pc-vocab-chip-remove', text: ' ×' });
            chip.addEventListener('click', async (e) => {
              if (!(e.target as HTMLElement).classList.contains('pc-vocab-chip-remove')) return;
              const words = this.plugin.settings.vocabCustomWords?.[token.id] ?? [];
              this.plugin.settings.vocabCustomWords[token.id] = words.filter((w) => w !== item.w);
              await this.plugin.saveSettings();
              this.plugin.refreshEditorExtensions();
              renderChips();
            });
          }
        }
        if (filtered.length > MAX) {
          chipsBox.createDiv({ cls: 'pc-vocab-words-empty', text: t('settings.vocabMoreWords').replace('{count}', String(filtered.length - MAX)) });
        }
      };
      renderChips();
      searchInput.addEventListener('input', renderChips);

      // 添加自定义词汇
      const addBox = wordsPanel.createDiv({ cls: 'pc-vocab-words-add' });
      const addInput = addBox.createEl('input', {
        cls: 'pc-vocab-words-add-input',
        attr: { type: 'text', placeholder: t('settings.vocabAddPlaceholder') },
      });
      const addBtn = addBox.createEl('button', { cls: 'pc-batch-btn pc-batch-btn-sm', text: t('settings.vocabAdd') });
      const addWord = async () => {
        const word = addInput.value.trim();
        if (!word) return;
        if (!this.plugin.settings.vocabCustomWords) this.plugin.settings.vocabCustomWords = {};
        const words = this.plugin.settings.vocabCustomWords[token.id] ?? [];
        if (!words.includes(word)) {
          words.push(word);
          this.plugin.settings.vocabCustomWords[token.id] = words;
          await this.plugin.saveSettings();
          this.plugin.refreshEditorExtensions();
          addInput.value = '';
          renderChips();
        }
      };
      addBtn.addEventListener('click', addWord);
      addInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addWord();
      });
    };

    wordToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      wordsOpen = !wordsOpen;
      wordToggle.classList.toggle('is-open', wordsOpen);
      renderWordsPanel();
    });
    renderWordsPanel();
  }

  private renderTokenCards(parent: HTMLElement, t: (key: string) => string): void {
    const colorTokens = this.plugin.getColorTokens();
    if (Object.keys(colorTokens).length === 0) {
      renderCard(parent, t('settings.colorCustom'), t('settings.colorCustomDesc'), 'colors', (card) => {
        card.createDiv({ cls: 'pc-pull-report-empty', text: t('settings.noColorTokens') });
      });
      return;
    }


    const rootStyle = getComputedStyle(document.documentElement);
    const customColors = this.plugin.settings.customColors ?? {};

    // v2.8.0 降噪提示：启用令牌数超阈值时提示并支持一键降噪
    const allTokenNames = Object.keys(colorTokens);
    const enabledCount = allTokenNames.filter((tn) => this.plugin.settings.tokenEnabled?.[tn] ?? true).length;
    if (enabledCount > TOKEN_NOISE_THRESHOLD) {
      const warn = parent.createDiv({ cls: 'pc-token-noise-warning' });
      warn.createSpan({
        text: t('settings.tokenNoiseWarning').replace('{count}', String(enabledCount)),
      });
      const reduceBtn = warn.createEl('button', {
        cls: 'pc-batch-btn pc-batch-btn-sm',
        text: t('settings.tokenNoiseAction'),
      });
      reduceBtn.addEventListener('click', async () => {
        if (!this.plugin.settings.tokenEnabled) this.plugin.settings.tokenEnabled = {};
        for (const tn of allTokenNames) {
          this.plugin.settings.tokenEnabled[tn] = BASE_TOKENS.includes(tn);
        }
        await this.plugin.saveSettings();
        this.plugin.refreshDynamicStyles();
        this.updatePreviewCard();
        this.display();
        new Notice(t('settings.tokenNoiseDone'));
      });
    }

    // 构建「令牌 → 关联开关 key 列表」反向映射
    const tokenToSwitchKeys = new Map<string, string[]>();
    for (const [switchKey, cssClass] of Object.entries(HIGHLIGHT_TO_CSS_CLASS)) {
      const ref = this.plugin.getColorByCssClass(cssClass);
      const m = ref.match(/--dsl-([a-zA-Z_][\w-]*)/);
      if (m) {
        const tn = m[1].replace(/-(?:soft|border)$/, '');
        if (!tokenToSwitchKeys.has(tn)) tokenToSwitchKeys.set(tn, []);
        tokenToSwitchKeys.get(tn)!.push(switchKey);
      }
    }

    for (const group of PromptColorizerSettingTab.TOKEN_GROUPS) {
      const existing = group.tokens.filter((tn) => colorTokens[tn]);
      if (existing.length === 0) continue;

      const details = parent.createEl('details', { cls: 'pc-token-group-details' });
      const groupKey = group.titleKey;
      const userOpen = this.tokenGroupOpenStates.get(groupKey);
      if (userOpen ?? group.defaultExpanded) details.setAttribute('open', '');
      details.addEventListener('toggle', () => {
        this.tokenGroupOpenStates.set(groupKey, details.open);
      });
      const summary = details.createEl('summary', { cls: 'pc-token-group-summary' });
      summary.createSpan({ text: t(group.titleKey) });
      summary.createSpan({ cls: 'pc-token-group-count', text: t('settings.tokenGroupCount').replace('{count}', String(existing.length)) });

      // 批量操作按钮（v4）— 全开/全关/重置
      const batch = summary.createDiv({ cls: 'pc-token-group-batch' });
      const enBtn = batch.createEl('button', { cls: 'pc-batch-btn pc-batch-btn-sm', text: t('batch.enableAll') });
      enBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!this.plugin.settings.tokenEnabled) this.plugin.settings.tokenEnabled = {};
        for (const tn of existing) this.plugin.settings.tokenEnabled[tn] = true;
        this.plugin.saveSettings().then(() => { this.plugin.refreshDynamicStyles(); this.display(); });
      });
      const disBtn = batch.createEl('button', { cls: 'pc-batch-btn pc-batch-btn-sm', text: t('batch.disableAll') });
      disBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!this.plugin.settings.tokenEnabled) this.plugin.settings.tokenEnabled = {};
        for (const tn of existing) this.plugin.settings.tokenEnabled[tn] = false;
        this.plugin.saveSettings().then(() => { this.plugin.refreshDynamicStyles(); this.display(); });
      });
      const rstBtn = batch.createEl('button', { cls: 'pc-batch-btn pc-batch-btn-sm', text: t('batch.reset') });
      rstBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.plugin.settings.customColors) {
          for (const tn of existing) delete this.plugin.settings.customColors[`--dsl-${tn}`];
        }
        this.plugin.saveSettings().then(() => {
          this.plugin.refreshDynamicStyles();
          this.display();
          new Notice(t('notice.tokenGroupColorsReset'));
        });
      });

      for (const tokenName of existing) {
        const token = colorTokens[tokenName];
        const cssVar = `--dsl-${tokenName}`;

        let name: string = tokenName;
        if (typeof token.name === 'object') name = token.name.zh ?? token.name.en;
        else if (typeof token.name === 'string') name = token.name;

        let desc: string = '';
        if (token.desc) {
          if (typeof token.desc === 'object') desc = token.desc.zh ?? token.desc.en;
          else desc = token.desc;
        }

        const userCustom = customColors[cssVar];
        const currentValue = userCustom || rootStyle.getPropertyValue(cssVar).trim() || token.light || '';

        const setting = new Setting(details).setName(name).setDesc(desc || tokenName);

        // 令牌启用/禁用开关（禁用则引用该令牌的 styleRule 不生成 CSS）
        const tokenEnabled = this.plugin.settings.tokenEnabled?.[tokenName] ?? true;
        let colorPicker: ColorComponent | null = null;
        let colorText: any = null;
        setting.settingEl.classList.toggle('is-token-disabled', !tokenEnabled);
        setting.addToggle((toggle) => toggle
          .setValue(tokenEnabled)
          .onChange(async (value) => {
            if (!this.plugin.settings.tokenEnabled) this.plugin.settings.tokenEnabled = {};
            this.plugin.settings.tokenEnabled[tokenName] = value;
            await this.plugin.saveSettings();
            this.plugin.refreshDynamicStyles();
            this.updatePreviewCard();
            if (colorPicker) colorPicker.setDisabled(!value);
            if (colorText) colorText.setDisabled(!value);
            setting.settingEl.classList.toggle('is-token-disabled', !value);
          }));

        const previewDot = setting.controlEl.createEl('span', {
          cls: 'pc-color-preview',
          attr: { style: `background-color: var(${cssVar});` },
        });

        setting.addColorPicker((picker) => {
          colorPicker = picker;
          picker.setValue(currentValue.startsWith('#') ? currentValue : (token.light || '#8b5cf6'))
            .setDisabled(!tokenEnabled);
          picker.onChange(async (value) => {
            if (!this.plugin.settings.customColors) this.plugin.settings.customColors = {};
            this.plugin.settings.customColors[cssVar] = value;
            await this.plugin.saveSettings();
            document.documentElement.style.setProperty(cssVar, value);
            previewDot.style.backgroundColor = value;
            if (colorText) colorText.setValue(value);
            this.updatePreviewCard();
          });
        });

        setting.addText((text) => {
          colorText = text;
          text.setValue(currentValue)
            .setPlaceholder(token.light || '#8b5cf6')
            .setDisabled(!tokenEnabled);
          text.onChange(async (value) => {
            if (/^#[0-9a-fA-F]{6}$/.test(value)) {
              if (!this.plugin.settings.customColors) this.plugin.settings.customColors = {};
              this.plugin.settings.customColors[cssVar] = value;
              await this.plugin.saveSettings();
              document.documentElement.style.setProperty(cssVar, value);
              previewDot.style.backgroundColor = value;
              if (colorPicker) colorPicker.setValue(value);
              this.updatePreviewCard();
            }
          });
        });

        // 关联开关 chip
        const switchKeys = tokenToSwitchKeys.get(tokenName) ?? [];
        if (switchKeys.length > 0) {
          const chipRow = setting.settingEl.createDiv({ cls: 'pc-token-chips' });
          chipRow.createSpan({ cls: 'pc-token-chips-label', text: t('settings.tokenRelatedRulesCount').replace('{count}', String(switchKeys.length)) });
          for (const sk of switchKeys) {
            const enabled = this.plugin.settings[sk as keyof PromptColorizerSettings] as boolean;
            const chip = chipRow.createEl('span', {
              cls: `pc-token-chip ${enabled ? 'is-enabled' : 'is-disabled'}`,
              attr: {
                role: 'button',
                tabindex: '0',
                'aria-pressed': String(enabled),
              },
            });
            chip.createSpan({ text: t(`settings.${sk}`) });
            const toggleChip = async () => {
              const next = !(this.plugin.settings as any)[sk];
              (this.plugin.settings as any)[sk] = next;
              await this.plugin.saveSettings();
              this.plugin.refreshEditorExtensions();
              this.detectActiveAgentPreset();
              this.updatePreviewCard();
              chip.classList.toggle('is-enabled', next);
              chip.classList.toggle('is-disabled', !next);
              chip.setAttribute('aria-pressed', String(next));
            };
            chip.addEventListener('click', toggleChip);
            chip.addEventListener('keydown', (e: KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleChip();
              }
            });
          }
        }
      }
    }

    // 重置按钮
    renderCard(parent, t('settings.colorCustom'), t('settings.colorCustomDesc'), 'colors', (card) => {
      new Setting(card)
        .setName(t('settings.resetColors'))
        .setDesc(t('settings.resetCustomColorsDesc'))
        .addButton((btn) => btn
          .setButtonText(t('settings.reset'))
          .setWarning()
          .onClick(async () => {
            createConfirmDialog(
              this.containerEl,
              this.plugin.t.bind(this.plugin),
              t('confirm.resetTitle'),
              t('confirm.resetCustomColorsDesc'),
              async () => {
                this.plugin.resetCustomColors();
                await this.plugin.saveSettings();
                this.plugin.refreshEditorExtensions();
                this.display();
                new Notice(this.plugin.t('notice.colorsReset'));
              }
            );
          }));
    });
  }

  // ============================================================
  // 可折叠分区组件（高亮规则专用）
  // ============================================================

  /**
   * 渲染可折叠分区
   * 含：标题栏（图标 + 标题 + 计数徽章 + 批量按钮）+ 可折叠内容区
   * 交互：点击标题栏切换展开/折叠状态，chevron 图标旋转反馈
   */
  private renderCollapsibleSection(
    parent: HTMLElement,
    title: string,
    desc: string,
    iconKey: string,
    keys: (keyof PromptColorizerSettings)[],
    toggles: { key: keyof PromptColorizerSettings; label: string; desc: string }[],
    defaultExpanded: boolean,
    t: (key: string) => string
  ): void {
    const section = parent.createDiv({
      cls: `pc-collapsible ${defaultExpanded ? '' : 'collapsed'}`,
    });

    // 标题栏（可点击切换）
    const header = section.createDiv({ cls: 'pc-collapsible-header' });

    // 左侧：chevron + 图标 + 标题 + 描述
    const headerLeft = header.createDiv({ cls: 'pc-collapsible-header-left' });

    // Chevron 旋转图标
    headerLeft.createSpan({ cls: 'pc-collapsible-chevron' });

    // 卡片图标
    if (CARD_ICONS[iconKey]) {
      const iconWrap = headerLeft.createSpan({ cls: 'pc-collapsible-icon' });
      iconWrap.innerHTML = CARD_ICONS[iconKey];
    }

    // 标题与描述
    const titleWrap = headerLeft.createDiv({ cls: 'pc-collapsible-title-wrap' });
    titleWrap.createSpan({ cls: 'pc-collapsible-title', text: title });
    titleWrap.createSpan({ cls: 'pc-collapsible-desc', text: desc });

    // 右侧：计数徽章 + 批量按钮
    const headerRight = header.createDiv({ cls: 'pc-collapsible-header-right' });

    // 计数徽章
    const activeCount = keys.filter((k) => this.plugin.settings[k] === true).length;
    const badge = headerRight.createSpan({ cls: 'pc-rule-count-badge' });
    badge.createSpan({ cls: 'pc-rule-count-active', text: String(activeCount) });
    badge.createSpan({ cls: 'pc-rule-count-sep', text: '/' });
    badge.createSpan({ cls: 'pc-rule-count-total', text: String(keys.length) });

    // 批量操作按钮
    const batchActions = headerRight.createDiv({ cls: 'pc-collapsible-batch' });
    const enableBtn = batchActions.createEl('button', {
      cls: 'pc-batch-btn pc-batch-btn-sm',
      text: t('batch.enableAll'),
    });
    enableBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      for (const key of keys) {
        (this.plugin.settings as any)[key] = true;
      }
      await this.plugin.saveSettings();
      this.plugin.refreshEditorExtensions();
      this.detectActiveAgentPreset();
      this.display();
    });

    const disableBtn = batchActions.createEl('button', {
      cls: 'pc-batch-btn pc-batch-btn-sm',
      text: t('batch.disableAll'),
    });
    disableBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      for (const key of keys) {
        (this.plugin.settings as any)[key] = false;
      }
      await this.plugin.saveSettings();
      this.plugin.refreshEditorExtensions();
      this.detectActiveAgentPreset();
      this.display();
    });

    const resetBtn = batchActions.createEl('button', {
      cls: 'pc-batch-btn pc-batch-btn-sm',
      text: t('batch.reset'),
    });
    resetBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      for (const key of keys) {
        (this.plugin.settings as any)[key] = (DEFAULT_SETTINGS as any)[key];
      }
      await this.plugin.saveSettings();
      this.plugin.refreshEditorExtensions();
      this.detectActiveAgentPreset();
      this.display();
    });

    // 点击标题栏切换折叠
    header.addEventListener('click', () => {
      section.toggleClass('collapsed', !section.hasClass('collapsed'));
    });

    // 可折叠内容区
    const content = section.createDiv({ cls: 'pc-collapsible-content' });

    for (const item of toggles) {
      const setting = new Setting(content)
        .setName(item.label)
        .setDesc(item.desc);

      // 色块预览 + 联动颜色选择器（v4 恢复同 Tab 联动）
      const cssClass = HIGHLIGHT_TO_CSS_CLASS[item.key as string];
      let colorDot: HTMLElement | null = null;
      if (cssClass) {
        const colorValue = this.plugin.getColorByCssClass(cssClass);
        if (colorValue) {
          colorDot = setting.nameEl.createSpan({ cls: 'pc-rule-color-dot' });
          colorDot.style.backgroundColor = colorValue;
        }

        // 联动颜色选择器 — 改色实时生效并更新所有引用处
        const m = colorValue.match(/--dsl-([a-zA-Z_][\w-]*)/);
        if (m) {
          const cssVar = `--dsl-${m[1]}`;
          const rootStyle = getComputedStyle(document.documentElement);
          const currentHex = colorValue.startsWith('#')
            ? colorValue
            : rootStyle.getPropertyValue(cssVar).trim() || '#8b5cf6';
          setting.addColorPicker((picker) => {
            picker.setValue(currentHex);
            picker.onChange(async (value) => {
              if (!this.plugin.settings.customColors) this.plugin.settings.customColors = {};
              this.plugin.settings.customColors[cssVar] = value;
              await this.plugin.saveSettings();
              document.documentElement.style.setProperty(cssVar, value);
              this.plugin.refreshDynamicStyles();
              if (colorDot) colorDot.style.backgroundColor = value;
              this.updatePreviewCard();
            });
          });
        }
      } else {
        // 无联动令牌 — 显示占位
        setting.nameEl.createSpan({ cls: 'pc-rule-color-dot pc-rule-color-dot-none', text: '—' });
      }

      setting.addToggle((toggle) => toggle
        .setValue(this.plugin.settings[item.key] as boolean)
        .onChange(async (value) => {
          (this.plugin.settings as any)[item.key] = value;
          await this.plugin.saveSettings();
          this.plugin.refreshEditorExtensions();
          this.detectActiveAgentPreset();
          this.updatePreviewCard();
        }));
    }
  }

  // ============================================================
  // 拉取报告面板渲染
  // ============================================================

  /**
   * 渲染拉取报告面板
   */
  private renderPullReport(parent: HTMLElement, t: (key: string) => string): void {
    const report = this.plugin.getPullReport();

    // 报告面板容器
    const panel = parent.createDiv({ cls: 'pc-pull-report' });

    // 标题行
    const header = panel.createDiv({ cls: 'pc-pull-report-header' });
    header.createSpan({ text: t('settings.pullReport') });

    if (!report) {
      panel.createDiv({
        cls: 'pc-pull-report-empty',
        text: t('settings.reportNoReport'),
      });
      return;
    }

    // 状态概览行
    const overview = panel.createDiv({ cls: 'pc-pull-report-overview' });

    // 状态标签
    const statusEl = overview.createDiv({ cls: 'pc-report-status-badge' });
    let statusText = '';
    let statusClass = '';
    if (!report.success) {
      statusText = t('settings.reportStatusFailed');
      statusClass = 'failed';
    } else if (!report.hasUpdate) {
      statusText = t('settings.reportNoUpdate');
      statusClass = 'no-update';
    } else {
      statusText = t('settings.reportStatusSuccess');
      statusClass = 'success';
    }
    statusEl.addClass(statusClass);
    statusEl.createSpan({ text: statusText });

    // 关键指标
    const metrics = overview.createDiv({ cls: 'pc-report-metrics' });
    const items: { label: string; value: string }[] = [
      { label: t('settings.reportRemoteVersion'), value: report.remoteVersion || '—' },
      { label: t('settings.reportLocalVersion'), value: report.localVersion || '—' },
      { label: t('settings.reportUpdateTime'), value: this.formatTime(report.timestamp) },
      { label: t('settings.reportDuration'), value: `${report.duration}ms` },
      { label: t('settings.reportTotalFiles'), value: `${report.successFiles}/${report.totalFiles}` },
      { label: t('settings.reportTotalRules'), value: String(report.totalRules) },
      { label: t('settings.reportTotalTerms'), value: String(report.totalTerms) },
    ];

    for (const item of items) {
      const itemEl = metrics.createDiv({ cls: 'pc-report-metric-item' });
      itemEl.createSpan({ cls: 'pc-report-metric-label', text: item.label });
      itemEl.createSpan({ cls: 'pc-report-metric-value', text: item.value });
    }

    // 错误信息
    if (report.error) {
      const errorEl = panel.createDiv({ cls: 'pc-pull-report-error' });
      errorEl.createSpan({ text: `${t('settings.reportError')}: ` });
      errorEl.createSpan({ text: report.error });
    }

    // 文件列表
    if (report.files.length > 0) {
      const filesSection = panel.createDiv({ cls: 'pc-report-section' });
      filesSection.createDiv({ cls: 'pc-report-section-title', text: t('settings.reportFiles') });

      const table = filesSection.createEl('table', { cls: 'pc-report-table' });
      const thead = table.createEl('thead');
      const headRow = thead.createEl('tr');
      headRow.createEl('th', { text: t('settings.reportFile') });
      headRow.createEl('th', { text: t('settings.reportStatus') });
      headRow.createEl('th', { text: t('settings.reportSize') });

      const tbody = table.createEl('tbody');
      for (const file of report.files) {
        const row = tbody.createEl('tr');
        row.createEl('td', { text: file.fileName });
        const statusCell = row.createEl('td');
        statusCell.createSpan({
          cls: `pc-file-status ${file.success ? 'success' : 'failed'}`,
          text: file.success ? t('settings.reportYes') : t('settings.reportNo'),
        });
        row.createEl('td', {
          text: file.success ? this.formatSize(file.size) : (file.error || '—'),
        });
      }
    }

    // 分类统计
    if (report.categories.length > 0) {
      const catSection = panel.createDiv({ cls: 'pc-report-section' });
      catSection.createDiv({ cls: 'pc-report-section-title', text: t('settings.reportCategories') });

      const table = catSection.createEl('table', { cls: 'pc-report-table' });
      const thead = table.createEl('thead');
      const headRow = thead.createEl('tr');
      headRow.createEl('th', { text: t('settings.reportCategory') });
      headRow.createEl('th', { text: t('settings.reportFile') });
      headRow.createEl('th', { text: t('settings.reportCount') });
      headRow.createEl('th', { text: t('settings.reportParsed') });

      const tbody = table.createEl('tbody');
      for (const cat of report.categories) {
        const row = tbody.createEl('tr');
        row.createEl('td', { text: cat.name });
        row.createEl('td', { text: cat.file });
        row.createEl('td', { text: String(cat.count) });
        const parsedCell = row.createEl('td');
        parsedCell.createSpan({
          cls: `pc-file-status ${cat.parsed ? 'success' : 'failed'}`,
          text: cat.parsed ? t('settings.reportYes') : t('settings.reportNo'),
        });
      }
    }
  }

  /**
   * 格式化文件大小
   */
  private formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  /**
   * 格式化时间戳
   */
  private formatTime(timestamp: number): string {
    const d = new Date(timestamp);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  // ============================================================
  // 状态概览条
  // ============================================================

  /**
   * 渲染状态概览条 — 含核心开关状态 + 高亮规则激活计数
   */
  private renderStatusBar(parent: HTMLElement, t: (key: string) => string): void {
    const bar = parent.createDiv({ cls: 'pc-status-bar' });


    // === 双指标计数区：符号规则 + 词汇令牌（含进度条可视化） ===
    const ruleStats = this.getRuleStats();
    const vocabStats = this.getVocabTokenStats();

    const countsEl = bar.createDiv({ cls: 'pc-status-counts' });

    const ruleCard = countsEl.createDiv({ cls: 'pc-status-count-card pc-status-count-card-rules' });
    const ruleHead = ruleCard.createDiv({ cls: 'pc-status-count-head' });
    ruleHead.createSpan({ text: t('status.activeRules') });
    ruleHead.createSpan({
      cls: 'pc-status-count-num pc-status-count-rules',
      text: `${ruleStats.active}/${ruleStats.total}`,
    });
    const ruleBar = ruleCard.createDiv({ cls: 'pc-status-progress' });
    ruleBar.createDiv({
      cls: 'pc-status-progress-fill',
      attr: { style: `width: ${ruleStats.percent}%;` },
    });

    const vocabCard = countsEl.createDiv({ cls: 'pc-status-count-card pc-status-count-card-vocabs' });
    const vocabHead = vocabCard.createDiv({ cls: 'pc-status-count-head' });
    vocabHead.createSpan({ text: t('status.activeVocabTokens') });
    vocabHead.createSpan({
      cls: 'pc-status-count-num pc-status-count-vocabs',
      text: `${vocabStats.active}/${vocabStats.total}`,
    });
    const vocabBarEl = vocabCard.createDiv({ cls: 'pc-status-progress' });
    vocabBarEl.createDiv({
      cls: 'pc-status-progress-fill',
      attr: { style: `width: ${vocabStats.percent}%;` },
    });

    // 规则源
    const sourceEl = bar.createDiv({ cls: 'pc-status-item' });
    sourceEl.createSpan({ text: t('status.ruleSource') + ': ' });
    sourceEl.createSpan({ text: this.plugin.settings.ruleSource, attr: { style: 'font-weight: 500;' } });

    // 令牌数
    const tokenCount = Object.keys(this.plugin.getColorTokens()).length;
    const tokenEl = bar.createDiv({ cls: 'pc-status-item' });
    tokenEl.createSpan({ text: t('status.tokenCount') + ': ' });
    tokenEl.createSpan({ text: String(tokenCount), attr: { style: 'font-weight: 500;' } });
  }

  /** 符号规则统计：启用数 / 总数 / 百分比 */
  private getRuleStats(): { active: number; total: number; percent: number } {
    const active = HIGHLIGHT_KEYS.filter(
      (k) => this.plugin.settings[k] === true
    ).length;
    const total = HIGHLIGHT_KEYS.length;
    return { active, total, percent: total ? Math.round((active / total) * 100) : 0 };
  }

  /** 词汇令牌统计：启用数 / 总数 / 百分比 */
  private getVocabTokenStats(): { active: number; total: number; percent: number } {
    const tokens = this.plugin.getVocabTokens();
    const active = tokens.filter((tk) => tk.enabled).length;
    const total = tokens.length;
    return { active, total, percent: total ? Math.round((active / total) * 100) : 0 };
  }

  /**
   * 动态更新状态概览条（不重新渲染整个面板）
   */
  private updateStatusBar(): void {
    const bar = document.querySelector('.pc-status-bar');
    if (!bar) return;


    // 更新双指标计数（符号规则 + 词汇令牌）
    const ruleStats = this.getRuleStats();
    const vocabStats = this.getVocabTokenStats();

    const ruleNumEl = bar.querySelector('.pc-status-count-rules');
    if (ruleNumEl) ruleNumEl.textContent = `${ruleStats.active}/${ruleStats.total}`;
    const ruleFill = bar.querySelector('.pc-status-count-card-rules .pc-status-progress-fill') as HTMLElement | null;
    if (ruleFill) ruleFill.style.width = `${ruleStats.percent}%`;

    const vocabNumEl = bar.querySelector('.pc-status-count-vocabs');
    if (vocabNumEl) vocabNumEl.textContent = `${vocabStats.active}/${vocabStats.total}`;
    const vocabFill = bar.querySelector('.pc-status-count-card-vocabs .pc-status-progress-fill') as HTMLElement | null;
    if (vocabFill) vocabFill.style.width = `${vocabStats.percent}%`;
  }

  // ============================================================
  // 包管理(v5) — 概况 Tab：包容器 + 索引引用 + 启用/复制/克隆/导入导出
  // ============================================================

  /**
   * 渲染包管理卡片 — 卡片式包列表（复选框启用 + 单选/叠加模式 + 导入导出）
   */
  private async renderPackageManagerBar(parent: HTMLElement, t: (key: string) => string): Promise<void> {
    // 确保包已加载（设置页可能先于导图打开）
    if (!this.plugin.loadedPackages || this.plugin.loadedPackages.length === 0) {
      await this.plugin.reloadPackages();
    }

    const wrap = parent.createDiv({ cls: 'pc-agent-section pc-pack-section' });

    const header = wrap.createDiv({ cls: 'pc-agent-header' });
    const titleWrap = header.createDiv({ cls: 'pc-agent-title-wrap' });
    titleWrap.createSpan({ cls: 'pc-agent-title', text: '包管理' });
    titleWrap.createSpan({ cls: 'pc-agent-desc', text: '令牌/规则的分组容器：索引引用 + 包级样式覆盖，单选或叠加启用' });

    // 操作按钮：导入 .stylepkg / 新建空包 / 打开颜色导图
    const actions = header.createDiv({ cls: 'pc-pk-bar-actions' });
    const importBtn = actions.createEl('button', { cls: 'pc-agent-new-btn', text: '导入包' });
    importBtn.addEventListener('click', () => importStylePkg(this.plugin));

    const mapBtn = actions.createEl('button', { cls: 'pc-agent-new-btn', text: '颜色导图' });
    mapBtn.addEventListener('click', () => void activateColorMapView(this.app));

    // 模式切换：单选 / 叠加
    const modeToggle = wrap.createDiv({ cls: 'pc-cm-mode-toggle pc-pk-mode-toggle' });
    const singleBtn = modeToggle.createEl('button', { cls: 'pc-cm-mode-btn', text: '单选模式' });
    const multiBtn = modeToggle.createEl('button', { cls: 'pc-cm-mode-btn', text: '叠加模式' });
    const syncMode = () => {
      const isMulti = this.plugin.settings.packageMode === 'multi';
      singleBtn.classList.toggle('is-active', !isMulti);
      multiBtn.classList.toggle('is-active', isMulti);
    };
    syncMode();
    singleBtn.addEventListener('click', () => {
      if (this.plugin.settings.packageMode !== 'single') {
        void setPackageMode(this.plugin, 'single').then(() => this.display());
      }
    });
    multiBtn.addEventListener('click', () => {
      if (this.plugin.settings.packageMode !== 'multi') {
        void setPackageMode(this.plugin, 'multi').then(() => this.display());
      }
    });

    // 包卡片列表（按优先级顺序）
    const grid = wrap.createDiv({ cls: 'pc-agent-grid' });
    const packages = this.plugin.pkgManager
      ? this.plugin.pkgManager.sortPackages(this.plugin.loadedPackages)
      : [];
    if (packages.length === 0) {
      grid.createDiv({ cls: 'pc-pk-settings-empty', text: '暂无包。点击「导入包」导入 .stylepkg，或在 vault 根 packages/ 目录创建包文件夹。' });
      return;
    }
    for (const pkg of packages) {
      this.renderPackageManagerCard(grid, pkg, t);
    }
  }

  /** 渲染单个包卡片（概况 Tab） */
  private renderPackageManagerCard(parent: HTMLElement, pkg: LoadedPackage, t: (key: string) => string): void {
    const manifest = pkg.manifest;
    const s = this.plugin.settings;
    const isEnabled = (s.enabledPackageIds ?? []).includes(pkg.dirName);
    const isBroken = pkg.status === 'invalid' || pkg.status === 'id-conflict';

    const card = parent.createDiv({
      cls: `pc-agent-card ${isEnabled ? 'active' : ''} ${isBroken ? 'pc-pk-card-broken' : ''}`,
    });

    const body = card.createDiv({ cls: 'pc-agent-card-body' });

    // 启用复选框
    const cb = body.createEl('input', { cls: 'pc-pk-settings-check', attr: { type: 'checkbox' } });
    cb.checked = isEnabled;
    cb.disabled = isBroken;
    cb.addEventListener('change', () => {
      void togglePackageEnabled(this.plugin, pkg.dirName).then(() => this.display());
    });

    // 包标识色圆点
    const dot = body.createSpan({ cls: 'pc-pk-dot' });
    dot.style.background = manifest?.tagColor || '#7c8aff';

    const info = body.createDiv({ cls: 'pc-agent-card-info' });
    info.createDiv({ cls: 'pc-agent-card-name', text: manifest?.name ?? pkg.dirName });
    const descText =
      pkg.status === 'id-conflict' ? 'ID 冲突，已禁用'
      : pkg.status === 'invalid' ? `无效包：${pkg.statusMessage ?? 'package.json 损坏'}`
      : pkg.status === 'partial' ? `部分失效：${pkg.statusMessage ?? '索引文件损坏'}`
      : manifest?.description ?? '';
    if (descText) info.createDiv({ cls: 'pc-agent-card-desc', text: descText });

    // 徽章：引用资源数
    const badge = body.createSpan({ cls: 'pc-agent-card-badge' });
    const nTokens = pkg.refTokenIds?.length ?? 0;
    const nRules = pkg.refRuleIds?.length ?? 0;
    badge.createSpan({ cls: 'pc-agent-card-badge-num', text: `${nTokens}+${nRules}` });
    badge.createSpan({ cls: 'pc-agent-card-badge-label', text: ' 令牌+规则' });

    if (pkg.isBuiltin) {
      body.createSpan({ cls: 'pc-pk-tag is-builtin', text: '内置' });
    }
    if (isEnabled) {
      body.createSpan({ cls: 'pc-agent-card-active', text: '已启用' });
    }

    // 操作行
    const actions = card.createDiv({ cls: 'pc-agent-card-actions' });

    const exportBtn = actions.createEl('button', { cls: 'pc-agent-action-btn', text: '导出' });
    exportBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (manifest) exportPackage(this.plugin, pkg);
      else new Notice('无效包无法导出');
    });

    const copyBtn = actions.createEl('button', { cls: 'pc-agent-action-btn', text: '复制' });
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!manifest) return;
      openConfirmModal(
        this.app,
        '复制包（轻量，共享引用）',
        `复制包目录与索引文件，仅复制 ID 引用。修改底层令牌会影响所有引用它的包。确认复制？`,
        () => void copyPackage(this.plugin, pkg).then(() => this.display())
      );
    });

    if (!pkg.isBuiltin) {
      const cloneBtn = actions.createEl('button', { cls: 'pc-agent-action-btn', text: '克隆' });
      cloneBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!manifest) return;
        openConfirmModal(
          this.app,
          '克隆包（深度拷贝，独立隔离）',
          `新建包目录，并把包引用的全部令牌生成独立全新副本。新旧包数据完全隔离，修改互不影响（规则本体共享）。确认克隆？`,
          () => void clonePackage(this.plugin, pkg).then(() => this.display())
        );
      });

      const renameBtn = actions.createEl('button', { cls: 'pc-agent-action-btn', text: t('pack.rename') });
      renameBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!manifest) return;
        openRenameModal(this.app, manifest.name, (name) => {
          void renamePackage(this.plugin, pkg, name).then(() => this.display());
        });
      });

      const deleteBtn = actions.createEl('button', { cls: 'pc-agent-action-btn pc-agent-action-danger', text: t('pack.delete') });
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!manifest) return;
        openConfirmModal(
          this.app,
          '删除包',
          `仅删除 packages/${pkg.dirName} 目录与索引文件，不会删除底层令牌、规则本体。确认删除？`,
          () => void deletePackage(this.plugin, pkg).then(() => this.display())
        );
      });
    }
  }

  // ============================================================
  // 提示词包(v4) — 方向化配置快照：开关 + 词汇令牌 + 颜色方案
  // ============================================================

  /**
   * 渲染提示词包条 — 卡片式包列表 + 新建按钮
   */
  private renderPromptPackBar(parent: HTMLElement, t: (key: string) => string): void {
    const wrap = parent.createDiv({ cls: 'pc-agent-section pc-pack-section' });

    const header = wrap.createDiv({ cls: 'pc-agent-header' });
    const titleWrap = header.createDiv({ cls: 'pc-agent-title-wrap' });
    titleWrap.createSpan({ cls: 'pc-agent-title', text: t('pack.title') });
    titleWrap.createSpan({ cls: 'pc-agent-desc', text: t('pack.desc') });

    const newBtn = header.createEl('button', {
      cls: 'pc-agent-new-btn',
      text: '+ ' + t('pack.new'),
    });
    newBtn.addEventListener('click', () => this.createPromptPackFromCurrent(t));

    const grid = wrap.createDiv({ cls: 'pc-agent-grid' });
    const packs = this.plugin.settings.promptPacks ?? [];
    for (const pack of packs) {
      this.renderPromptPackCard(grid, pack, t);
    }
  }

  /** 渲染单个提示词包卡片 */
  private renderPromptPackCard(parent: HTMLElement, pack: PromptPack, t: (key: string) => string): void {
    const isActive = this.plugin.settings.activePackId === pack.id;
    const card = parent.createDiv({
      cls: `pc-agent-card ${isActive ? 'active' : ''}`,
      attr: { 'data-pack': pack.id },
    });

    const body = card.createDiv({ cls: 'pc-agent-card-body' });
    body.createSpan({ cls: 'pc-agent-card-icon', text: pack.icon || '📦' });

    const info = body.createDiv({ cls: 'pc-agent-card-info' });
    info.createDiv({ cls: 'pc-agent-card-name', text: pack.name });
    if (pack.description) {
      info.createDiv({ cls: 'pc-agent-card-desc', text: pack.description });
    }

    // 徽章：规则数 + 词汇令牌数
    const badge = body.createSpan({ cls: 'pc-agent-card-badge' });
    badge.createSpan({ cls: 'pc-agent-card-badge-num', text: `${pack.enabledKeys.length}+${pack.vocabTokens.length}` });
    badge.createSpan({ cls: 'pc-agent-card-badge-label', text: ' ' + t('pack.rulesVocabCount') });

    if (isActive) {
      body.createSpan({ cls: 'pc-agent-card-active', text: t('pack.active') });
    }

    body.addEventListener('click', async () => {
      await this.applyPromptPack(pack.id);
      new Notice(this.plugin.t('pack.applied'));
    });

    const actions = card.createDiv({ cls: 'pc-agent-card-actions' });
    const renameBtn = actions.createEl('button', {
      cls: 'pc-agent-action-btn',
      text: t('pack.rename'),
      attr: { 'aria-label': t('pack.rename') },
    });
    renameBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.renamePromptPack(pack.id, t);
    });

    if (!pack.builtin) {
      const deleteBtn = actions.createEl('button', {
        cls: 'pc-agent-action-btn pc-agent-action-danger',
        text: t('pack.delete'),
        attr: { 'aria-label': t('pack.delete') },
      });
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deletePromptPack(pack.id, t);
      });
    } else {
      const resetBtn = actions.createEl('button', {
        cls: 'pc-agent-action-btn',
        text: t('pack.reset'),
        attr: { 'aria-label': t('pack.reset') },
      });
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.resetPromptPack(pack.id);
      });
    }
  }

  /**
   * 应用提示词包 — 批量写入：语法开关 + 词汇令牌启停 + 配色方案/色板
   */
  private async applyPromptPack(id: string): Promise<void> {
    const pack = this.plugin.settings.promptPacks.find((p) => p.id === id);
    if (!pack) return;

    const s = this.plugin.settings;

    // 层1：语法开关
    for (const key of HIGHLIGHT_KEYS) {
      (s as any)[key] = false;
    }
    for (const key of pack.enabledKeys) {
      if ((HIGHLIGHT_KEYS as string[]).includes(key)) {
        (s as any)[key] = true;
      }
    }

    // 层2：词汇令牌启停（缺省视为 true，故未列出的令牌显式关）
    const packTokens = new Set(pack.vocabTokens);
    const tokenEnabled: Record<string, boolean> = {};
    for (const group of VOCAB_TOKEN_GROUPS) {
      tokenEnabled[group.id] = packTokens.has(group.id);
    }
    s.vocabTokenEnabled = tokenEnabled;

    // 层3：配色方案 + 色板
    s.colorScheme = pack.colorScheme;
    s.palettePreset = pack.palettePreset ?? '';

    s.activePackId = id;
    // 同步智能体预设 active 标记（按当前开关组合匹配）
    const currentOn = HIGHLIGHT_KEYS.filter((k) => s[k] === true).map(String);
    const currentSet = new Set(currentOn);
    const matched = (s.agentPresets ?? []).find(
      (p) => p.enabledKeys.length === currentSet.size && p.enabledKeys.every((k) => currentSet.has(k))
    );
    s.activeAgentPresetId = matched?.id ?? '';

    await this.plugin.saveSettings();
    this.plugin.refreshEditorExtensions();
    this.plugin.applyColorMode();
    this.display();
  }

  /** 内置包恢复默认定义 */
  private resetPromptPack(id: string): void {
    const builtin = DEFAULT_PROMPT_PACKS.find((p) => p.id === id);
    if (!builtin) return;
    const idx = this.plugin.settings.promptPacks.findIndex((p) => p.id === id);
    if (idx < 0) return;
    this.plugin.settings.promptPacks[idx] = { ...builtin };
    this.plugin.saveSettings().then(() => {
      this.display();
      new Notice(this.plugin.t('pack.resetDone'));
    });
  }

  /** 新建提示词包 — 以当前全部配置（开关+令牌+颜色）为基础快照 */
  private createPromptPackFromCurrent(t: (key: string) => string): void {
    new AgentPresetNameModal(
      this.app,
      t('pack.new'),
      t('pack.namePrompt'),
      t('pack.descPrompt'),
      '',
      '',
      (name, desc) => {
        if (!name) {
          new Notice(this.plugin.t('pack.nameRequired'));
          return;
        }
        const s = this.plugin.settings;
        const enabledKeys = HIGHLIGHT_KEYS.filter((k) => s[k] === true).map(String);
        const vocabTokens = VOCAB_TOKEN_GROUPS
          .filter((g) => s.vocabTokenEnabled?.[g.id] !== false)
          .map((g) => g.id);
        const pack: PromptPack = {
          id: `pack-${Date.now()}`,
          name,
          description: desc,
          icon: '📦',
          direction: 'image',
          enabledKeys,
          vocabTokens,
          colorScheme: s.colorScheme ?? 'default',
          palettePreset: s.palettePreset ?? '',
          builtin: false,
        };
        s.promptPacks.push(pack);
        s.activePackId = pack.id;
        this.plugin.saveSettings().then(() => {
          this.display();
          new Notice(this.plugin.t('pack.created'));
        });
      }
    ).open();
  }

  /** 重命名提示词包（复用预设名称弹窗） */
  private renamePromptPack(id: string, t: (key: string) => string): void {
    const pack = this.plugin.settings.promptPacks.find((p) => p.id === id);
    if (!pack) return;

    new AgentPresetNameModal(
      this.app,
      t('pack.rename'),
      t('pack.namePrompt'),
      t('pack.descPrompt'),
      pack.name,
      pack.description,
      (name, desc) => {
        if (!name) {
          new Notice(this.plugin.t('pack.nameRequired'));
          return;
        }
        pack.name = name;
        pack.description = desc;
        this.plugin.saveSettings().then(() => {
          this.display();
          new Notice(this.plugin.t('pack.renamed'));
        });
      }
    ).open();
  }

  /** 删除自定义提示词包（内置包不可删除，带确认） */
  private deletePromptPack(id: string, t: (key: string) => string): void {
    const s = this.plugin.settings;
    const pack = s.promptPacks.find((p) => p.id === id);
    if (!pack || pack.builtin) return;

    createConfirmDialog(
      this.containerEl,
      this.plugin.t.bind(this.plugin),
      t('pack.confirmDeleteTitle'),
      t('pack.confirmDeleteDesc'),
      async () => {
        s.promptPacks = s.promptPacks.filter((p) => p.id !== id);
        if (s.activePackId === id) s.activePackId = '';
        await this.plugin.saveSettings();
        this.display();
        new Notice(this.plugin.t('pack.deleted'));
      }
    );
  }

  // ============================================================
  // 智能体预设(v3)
  // ============================================================

  /** 示例提示词(用于实时预览) */
  private static readonly PREVIEW_SAMPLE: string = [
    '<system>你是资深提示词工程师</system>',
    '<user>请为 {{主题}} 设计分镜：</user>',
    '【整体设定】镜头1（3秒）推镜头入场，「她转身微笑」。',
    '景别：特写  运镜：推  光影：3200K',
    '排除：低俗、模糊；<lora:film-grain:0.8> (masterpiece:1.3)',
  ].join('\n');

  /**
   * 渲染智能体预设条 — 卡片式预设 + 新建按钮
   */
  private renderAgentPresetBar(parent: HTMLElement, t: (key: string) => string): void {
    const wrap = parent.createDiv({ cls: 'pc-agent-section' });

    // 标题行
    const header = wrap.createDiv({ cls: 'pc-agent-header' });
    const titleWrap = header.createDiv({ cls: 'pc-agent-title-wrap' });
    titleWrap.createSpan({ cls: 'pc-agent-title', text: t('agent.title') });
    titleWrap.createSpan({ cls: 'pc-agent-desc', text: t('agent.desc') });

    const newBtn = header.createEl('button', {
      cls: 'pc-agent-new-btn',
      text: '+ ' + t('agent.new'),
    });
    newBtn.addEventListener('click', () => this.createAgentPresetFromCurrent(t));

    // 卡片网格
    const grid = wrap.createDiv({ cls: 'pc-agent-grid' });
    const presets = this.plugin.settings.agentPresets ?? [];
    for (const preset of presets) {
      this.renderAgentCard(grid, preset, t);
    }
  }

  /**
   * 渲染单个智能体预设卡片
   */
  private renderAgentCard(parent: HTMLElement, preset: AgentPreset, t: (key: string) => string): void {
    const isActive = this.plugin.settings.activeAgentPresetId === preset.id;
    const card = parent.createDiv({
      cls: `pc-agent-card ${isActive ? 'active' : ''}`,
      attr: { 'data-agent': preset.id },
    });

    // 主体(点击应用)
    const body = card.createDiv({ cls: 'pc-agent-card-body' });
    body.createSpan({ cls: 'pc-agent-card-icon', text: preset.icon || '✦' });

    const info = body.createDiv({ cls: 'pc-agent-card-info' });
    info.createDiv({ cls: 'pc-agent-card-name', text: preset.name });
    if (preset.description) {
      info.createDiv({ cls: 'pc-agent-card-desc', text: preset.description });
    }

    // 规则数徽章
    const count = preset.enabledKeys.length;
    const badge = body.createSpan({ cls: 'pc-agent-card-badge' });
    badge.createSpan({ cls: 'pc-agent-card-badge-num', text: String(count) });
    badge.createSpan({ cls: 'pc-agent-card-badge-label', text: ' ' + t('agent.rulesCount') });

    if (isActive) {
      body.createSpan({ cls: 'pc-agent-card-active', text: t('agent.active') });
    }

    body.addEventListener('click', async () => {
      await this.applyAgentPreset(preset.id);
      new Notice(this.plugin.t('agent.applied'));
    });

    // 操作按钮
    const actions = card.createDiv({ cls: 'pc-agent-card-actions' });
    const renameBtn = actions.createEl('button', {
      cls: 'pc-agent-action-btn',
      text: t('agent.rename'),
      attr: { 'aria-label': t('agent.rename') },
    });
    renameBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.renameAgentPreset(preset.id, t);
    });

    const deleteBtn = actions.createEl('button', {
      cls: 'pc-agent-action-btn pc-agent-action-danger',
      text: t('agent.delete'),
      attr: { 'aria-label': t('agent.delete') },
    });
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteAgentPreset(preset.id, t);
    });
  }

  /**
   * 应用智能体预设 — 将其 enabledKeys 写入设置开关
   */
  private async applyAgentPreset(id: string): Promise<void> {
    const preset = this.plugin.settings.agentPresets.find((p) => p.id === id);
    if (!preset) return;

    const s = this.plugin.settings;
    for (const key of HIGHLIGHT_KEYS) {
      (s as any)[key] = false;
    }
    const validKeys = HIGHLIGHT_KEYS as string[];
    for (const key of preset.enabledKeys) {
      if (validKeys.includes(key)) {
        (s as any)[key] = true;
      }
    }

    s.activeAgentPresetId = id;
    await this.plugin.saveSettings();
    this.plugin.refreshEditorExtensions();
    this.display();
  }

  /**
   * 检测当前规则组合是否匹配某个智能体预设,匹配则更新 activeAgentPresetId
   * 在规则开关变化时调用,保持预设卡片的 active 视觉同步
   */
  private detectActiveAgentPreset(): void {
    const s = this.plugin.settings;
    const currentOn = HIGHLIGHT_KEYS.filter((k) => s[k] === true).map((k) => String(k));
    const currentSet = new Set(currentOn);

    const matched = (s.agentPresets ?? []).find((p) => {
      if (p.enabledKeys.length !== currentSet.size) return false;
      return p.enabledKeys.every((k) => currentSet.has(k));
    });

    const newId = matched?.id ?? '';
    if (newId !== s.activeAgentPresetId) {
      s.activeAgentPresetId = newId;
      this.plugin.saveSettings();
      // 同步更新 DOM 上的 active 标记
      document.querySelectorAll('.pc-agent-card').forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.toggleClass('active', htmlEl.dataset.agent === newId);
      });
    }
  }

  /**
   * 新建智能体预设 — 以当前开启的规则集合为基础
   */
  private createAgentPresetFromCurrent(t: (key: string) => string): void {
    new AgentPresetNameModal(
      this.app,
      t('agent.new'),
      t('agent.namePrompt'),
      t('agent.descPrompt'),
      '',
      '',
      (name, _desc) => {
        if (!name) {
          new Notice(this.plugin.t('agent.nameRequired'));
          return;
        }
        const enabledKeys = HIGHLIGHT_KEYS.filter((k) => this.plugin.settings[k] === true).map((k) => String(k));
        const preset: AgentPreset = {
          id: `agent-${Date.now()}`,
          name,
          description: _desc,
          icon: '✧',
          enabledKeys,
        };
        this.plugin.settings.agentPresets.push(preset);
        this.plugin.settings.activeAgentPresetId = preset.id;
        this.plugin.saveSettings().then(() => {
          this.display();
          new Notice(this.plugin.t('agent.created'));
        });
      }
    ).open();
  }

  /**
   * 重命名智能体预设
   */
  private renameAgentPreset(id: string, t: (key: string) => string): void {
    const preset = this.plugin.settings.agentPresets.find((p) => p.id === id);
    if (!preset) return;

    new AgentPresetNameModal(
      this.app,
      t('agent.rename'),
      t('agent.namePrompt'),
      t('agent.descPrompt'),
      preset.name,
      preset.description,
      (name, desc) => {
        if (!name) {
          new Notice(this.plugin.t('agent.nameRequired'));
          return;
        }
        preset.name = name;
        preset.description = desc;
        this.plugin.saveSettings().then(() => {
          this.display();
          new Notice(this.plugin.t('agent.renamed'));
        });
      }
    ).open();
  }

  /**
   * 删除智能体预设(带确认)
   */
  private deleteAgentPreset(id: string, t: (key: string) => string): void {
    const preset = this.plugin.settings.agentPresets.find((p) => p.id === id);
    if (!preset) return;

    createConfirmDialog(
      this.containerEl,
      this.plugin.t.bind(this.plugin),
      t('agent.confirmDeleteTitle'),
      t('agent.confirmDeleteDesc'),
      async () => {
        this.plugin.settings.agentPresets = this.plugin.settings.agentPresets.filter((p) => p.id !== id);
        if (this.plugin.settings.activeAgentPresetId === id) {
          this.plugin.settings.activeAgentPresetId = '';
        }
        await this.plugin.saveSettings();
        this.display();
        new Notice(this.plugin.t('agent.deleted'));
      }
    );
  }

  // ============================================================
  // 实时效果预览(v3)
  // ============================================================

  /**
   * 渲染实时效果预览卡 — 可编辑 textarea + 着色输出，实时联动
   */
  private renderPreviewCard(parent: HTMLElement, t: (key: string) => string): void {
    renderCard(parent, t('preview.title'), t('preview.desc'), 'display', (card) => {
      // 上半：可编辑 textarea
      const inputWrap = card.createDiv({ cls: 'pc-preview-input-wrap' });
      inputWrap.createDiv({ cls: 'pc-preview-label', text: t('preview.inputLabel') });
      const textarea = inputWrap.createEl('textarea', {
        cls: 'pc-preview-input',
        attr: { rows: '5', placeholder: t('preview.placeholder') },
      }) as HTMLTextAreaElement;
      const initialText = this.previewText || PromptColorizerSettingTab.PREVIEW_SAMPLE;
      textarea.value = initialText;
      this.previewText = initialText;

      // 下半：着色输出
      const outputWrap = card.createDiv({ cls: 'pc-preview-output-wrap' });
      outputWrap.createDiv({ cls: 'pc-preview-label', text: t('preview.outputLabel') });
      const output = outputWrap.createDiv({ cls: 'pc-preview-sample' });

      const renderOutput = () => {
        const text = textarea.value;
        this.previewText = text;
        const html = this.plugin.highlightTextToHtml(text);
        if (!html || html.trim().length === 0) {
          output.empty();
          output.createDiv({ cls: 'pc-preview-empty', text: t('preview.empty') });
          return;
        }
        output.innerHTML = html;
      };

      textarea.addEventListener('input', renderOutput);
      renderOutput();
    });
  }

  /**
   * 轻量更新实时预览(不重渲染整个面板) — 规则开关变化时调用
   */
  private updatePreviewCard(): void {
    const output = document.querySelector('.pc-preview-sample');
    if (!output) return;
    const text = this.previewText || PromptColorizerSettingTab.PREVIEW_SAMPLE;
    const html = this.plugin.highlightTextToHtml(text);
    (output as HTMLElement).innerHTML = html || '';
  }

  // ============================================================
  // 通用渲染组件
  // ============================================================



}
