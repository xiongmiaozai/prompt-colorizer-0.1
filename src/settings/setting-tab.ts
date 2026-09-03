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
import type { PromptColorizerSettings, FileTypeColor, CustomTextColor, AgentPreset } from '../types';
import type { PullReportData } from '../rule-engine/types';
import { DEFAULT_FILE_TYPE_COLORS } from './settings';
import { renderCard, CARD_ICONS } from './card-helpers';
import { createConfirmDialog } from './confirm-dialog';
import { AgentPresetNameModal } from './agent-preset-modal';
import { buildExportData, downloadConfigJson, parseConfigJson, mergeMultipleImports } from '../utils/config-io';


/** Tab 页面标识 */
type TabId = 'overview' | 'engine' | 'files' | 'highlight' | 'colors';

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
  'highlightQualityTags',
  'highlightSdNegativeHeader',
  // 视频提示词扩展模式
  'highlightCameraMoves',
  'highlightSceneTransitions',
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
  'highlightQualityTags',
  'highlightSdNegativeHeader',
];

/** 视频提示词扩展模式开关字段 */
const VIDEO_EXT_KEYS: (keyof PromptColorizerSettings)[] = [
  'highlightCameraMoves',
  'highlightSceneTransitions',
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
  highlight: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  engine: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
  files: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  colors: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
};

/** Tab 页面列表 */
const TABS: TabConfig[] = [
  { id: 'overview', labelKey: 'tab.overview', icon: 'overview' },
  { id: 'highlight', labelKey: 'tab.highlight', icon: 'highlight' },
  { id: 'engine', labelKey: 'tab.engine', icon: 'engine' },
  { id: 'files', labelKey: 'tab.files', icon: 'files' },
  { id: 'colors', labelKey: 'tab.colors', icon: 'colors' },
];


export class PromptColorizerSettingTab extends PluginSettingTab {
  plugin: PromptColorizer;
  /** 当前激活的 Tab 页 */
  private currentTab: TabId = 'overview';

  constructor(app: App, plugin: PromptColorizer) {
    super(app, plugin);
    this.plugin = plugin;
  }

  // ============================================================
  // 主渲染入口 — Tab 分页式布局
  // ============================================================

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass('prompt-colorizer-setting-tab');

    const t = this.plugin.t.bind(this.plugin);

    // 1. 渲染 Tab 导航栏
    this.renderTabNav(t);

    // 2. 渲染 Tab 内容容器
    const tabContent = containerEl.createDiv({ cls: 'pc-tab-content' });

    // 3. 根据当前 Tab 渲染对应内容
    switch (this.currentTab) {
      case 'overview':
        this.renderOverviewTab(tabContent, t);
        break;
      case 'highlight':
        this.renderHighlightTab(tabContent, t);
        break;
      case 'engine':
        this.renderEngineTab(tabContent, t);
        break;
      case 'files':
        this.renderFilesTab(tabContent, t);
        break;
      case 'colors':
        this.renderColorsTab(tabContent, t);
        break;
    }
  }

  // ============================================================
  // Tab 导航栏
  // ============================================================

  /**
   * 渲染 Tab 导航栏
   * 固定在顶部，点击切换页面，提供即时视觉反馈
   */
  private renderTabNav(t: (key: string) => string): void {
    const { containerEl } = this;
    const nav = containerEl.createDiv({ cls: 'pc-tab-nav' });

    for (const tab of TABS) {
      const item = nav.createDiv({
        cls: `pc-tab-item ${this.currentTab === tab.id ? 'active' : ''}`,
        attr: { 'data-tab': tab.id },
      });

      // Tab 图标
      const iconWrap = item.createSpan({ cls: 'pc-tab-icon' });
      iconWrap.innerHTML = TAB_ICONS[tab.icon] || '';

      // Tab 标签
      item.createSpan({ cls: 'pc-tab-label', text: t(tab.labelKey) });

      // 点击切换 Tab
      item.addEventListener('click', () => {
        if (this.currentTab !== tab.id) {
          this.currentTab = tab.id;
          this.display();
        }
      });
    }
  }

  // ============================================================
  // Tab 1：概览 — 状态总览 + 快速预设 + 核心设置
  // ============================================================

  private renderOverviewTab(parent: HTMLElement, t: (key: string) => string): void {
    // 状态总览条
    this.renderStatusBar(parent, t);

    // 智能体预设(v3)
    this.renderAgentPresetBar(parent, t);

    // 实时效果预览(v3)
    this.renderPreviewCard(parent, t);

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
        .setName(t('settings.language'))
        .setDesc(t('settings.languageDesc'))
        .addDropdown((dd) => dd
          .addOption('zh', '中文')
          .addOption('en', 'English')
          .setValue(this.plugin.settings.language)
          .onChange(async (value) => {
            this.plugin.settings.language = value as 'zh' | 'en';
            await this.plugin.saveSettings();
            this.display();
          }));
    });

    // 配置管理（导出/导入，支持多文件导入合并）
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
          { key: 'highlightQualityTags', label: t('settings.highlightQualityTags'), desc: t('settings.highlightQualityTagsDesc') },
          { key: 'highlightSdNegativeHeader', label: t('settings.highlightSdNegativeHeader'), desc: t('settings.highlightSdNegativeHeaderDesc') },
        ],
      },
      {
        title: t('settings.videoExtRules'),
        desc: t('settings.videoExtRulesDesc'),
        iconKey: 'videoExt',
        keys: VIDEO_EXT_KEYS,
        defaultExpanded: false,
        toggles: [
          { key: 'highlightCameraMoves', label: t('settings.highlightCameraMoves'), desc: t('settings.highlightCameraMovesDesc') },
          { key: 'highlightSceneTransitions', label: t('settings.highlightSceneTransitions'), desc: t('settings.highlightSceneTransitionsDesc') },
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
    renderCard(parent, t('settings.display'), t('settings.displayDesc'), 'display', (card) => {
      new Setting(card)
        .setName(t('settings.showColorDot'))
        .setDesc(t('settings.showColorDotDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.showColorDot)
          .onChange(async (value) => {
            this.plugin.settings.showColorDot = value;
            await this.plugin.saveSettings();
            this.plugin.refreshFileColorizer();
          }));

      new Setting(card)
        .setName(t('settings.dotSize'))
        .setDesc(t('settings.dotSizeDesc'))
        .addSlider((slider) => slider
          .setLimits(4, 16, 1)
          .setValue(this.plugin.settings.colorDotSize)
          .setDynamicTooltip()
          .onChange(async (value) => {
            this.plugin.settings.colorDotSize = value;
            await this.plugin.saveSettings();
            this.plugin.refreshFileColorizer();
          }));

      new Setting(card)
        .setName(t('settings.modifyFileName'))
        .setDesc(t('settings.modifyFileNameDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.modifyFileNameColor)
          .onChange(async (value) => {
            this.plugin.settings.modifyFileNameColor = value;
            await this.plugin.saveSettings();
            this.plugin.refreshFileColorizer();
          }));

      new Setting(card)
        .setName(t('settings.showRoleBorders'))
        .setDesc(t('settings.showRoleBordersDesc'))
        .addToggle((toggle) => toggle
          .setValue(this.plugin.settings.showRoleBorders)
          .onChange(async (value) => {
            this.plugin.settings.showRoleBorders = value;
            await this.plugin.saveSettings();
            this.plugin.applyColorMode();
          }));
    });
  }

  // ============================================================
  // Tab：高亮规则 — 仅高亮开关列表（只读色块预览，颜色在「颜色」Tab 调）
  // ============================================================

  private renderHighlightTab(parent: HTMLElement, t: (key: string) => string): void {
    this.renderHighlightRulesSection(parent, t);
  }

  // ============================================================
  // Tab：颜色 — 令牌自定义 + 颜色模式 + 文件类型颜色 + 自定义文本颜色 + 配置管理
  // ============================================================

  private renderColorsTab(parent: HTMLElement, t: (key: string) => string): void {
    // 令牌卡片主控（颜色选择器唯一入口 + 关联开关 chip 内嵌）
    this.renderTokenCards(parent, t);

    // 颜色模式
    renderCard(parent, t('settings.colorMode'), t('settings.colorModeDesc'), 'colors', (card) => {
      new Setting(card)
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
    });

    // 文件类型颜色
    renderCard(parent, t('settings.fileTypeColors'), t('settings.fileTypeColorsDesc'), 'colors', (card) => {
      for (const colorConfig of this.plugin.settings.fileTypeColors) {
        this.renderColorSetting(card, colorConfig);
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

      // 5. 规则列表
      const listContainer = card.createDiv({ cls: 'pc-custom-text-list' });

      const colors = this.plugin.settings.customTextColors ?? [];
      if (colors.length === 0) {
        listContainer.createDiv({
          cls: 'pc-custom-text-empty',
          text: t('customText.empty'),
        });
        return;
      }

      // 列表表头
      const header = listContainer.createDiv({ cls: 'pc-custom-text-row pc-custom-text-header' });
      header.createDiv({ cls: 'pc-custom-text-col-text', text: t('customText.textCol') });
      header.createDiv({ cls: 'pc-custom-text-col-color', text: t('customText.colorCol') });
      header.createDiv({ cls: 'pc-custom-text-col-options', text: t('customText.optionsCol') });
      header.createDiv({ cls: 'pc-custom-text-col-enabled', text: t('customText.enabledCol') });
      header.createDiv({ cls: 'pc-custom-text-col-actions', text: t('customText.actionsCol') });

      // 列表项
      for (const item of colors) {
        this.renderCustomTextColorRow(listContainer, item, t);
      }
    });
  }

  /**
   * 渲染单个自定义颜色规则行
   */
  private renderCustomTextColorRow(
    parent: HTMLElement,
    item: CustomTextColor,
    t: (key: string) => string
  ): void {
    const row = parent.createDiv({ cls: 'pc-custom-text-row' });

    // 1. 文本内容（带颜色预览）
    const textCell = row.createDiv({ cls: 'pc-custom-text-col-text' });
    const preview = textCell.createSpan({ cls: 'pc-custom-text-preview' });
    preview.style.color = item.color;
    preview.setText(item.text.length > 30 ? item.text.slice(0, 30) + '…' : item.text);
    textCell.createEl('div', {
      cls: 'pc-custom-text-text-full',
      attr: { title: item.text },
    });

    // 2. 颜色值（色块 + hex）
    const colorCell = row.createDiv({ cls: 'pc-custom-text-col-color' });
    colorCell.createDiv({
      cls: 'pc-custom-text-color-swatch',
      attr: { title: item.color },
    }).style.backgroundColor = item.color;
    colorCell.createSpan({
      cls: 'pc-custom-text-color-hex',
      text: item.color,
    });

    // 3. 匹配选项
    const optionsCell = row.createDiv({ cls: 'pc-custom-text-col-options' });
    const caseText = item.caseSensitive ? t('customText.caseShort') : t('customText.caseInsensitive');
    const wholeText = item.wholeWord ? t('customText.wholeShort') : t('customText.wholeWordOff');
    optionsCell.createSpan({ cls: 'pc-custom-text-option-tag', text: caseText });
    optionsCell.createSpan({ cls: 'pc-custom-text-option-tag', text: wholeText });

    // 4. 启用开关
    const enabledCell = row.createDiv({ cls: 'pc-custom-text-col-enabled' });
    const toggleEl = enabledCell.createEl('input', {
      cls: 'pc-custom-text-toggle',
      attr: { type: 'checkbox' },
    }) as HTMLInputElement;
    toggleEl.checked = item.enabled;
    toggleEl.addEventListener('change', async () => {
      item.enabled = toggleEl.checked;
      await this.plugin.saveSettings();
      this.plugin.applyCustomTextColorsStyles();
      this.plugin.refreshEditorExtensions();
    });

    // 5. 操作按钮（编辑 / 删除）
    const actionsCell = row.createDiv({ cls: 'pc-custom-text-col-actions' });

    const editBtn = actionsCell.createEl('button', {
      cls: 'pc-custom-text-action-btn pc-custom-text-edit-btn',
      attr: { 'aria-label': t('customText.edit'), title: t('customText.edit') },
    });
    editBtn.setText(t('customText.edit'));
    editBtn.addEventListener('click', () => {
      this.plugin.editCustomTextColor(item.id);
    });

    const deleteBtn = actionsCell.createEl('button', {
      cls: 'pc-custom-text-action-btn pc-custom-text-delete-btn',
      attr: { 'aria-label': t('customText.delete'), title: t('customText.delete') },
    });
    deleteBtn.setText(t('customText.delete'));
    deleteBtn.addEventListener('click', async () => {
      if (confirm(t('customText.confirmDelete'))) {
        await this.plugin.deleteCustomTextColor(item.id);
        this.display();
      }
    });
  }

  // ============================================================
  // 令牌卡片面板（v3 令牌中心化控制）
  // ============================================================

  /** 令牌分组定义（按 YAML colors 区块语义分类） */
  private static readonly TOKEN_GROUPS = [
    { titleKey: 'settings.tokenGroupBasic', descKey: 'settings.tokenGroupBasicDesc', tokens: ['danger','success','warning','info','purple','cyan','pink','amber','orange','paren'], defaultExpanded: true },
    { titleKey: 'settings.tokenGroupExtended', descKey: 'settings.tokenGroupExtendedDesc', tokens: ['violet','indigo','emerald','slate','darkslate','blue','slategray','sky','indigodeep','fuchsia','teal','rose','lime','green','slatelight','yellow'], defaultExpanded: false },
    { titleKey: 'settings.tokenGroupShot', descKey: 'settings.tokenGroupShotDesc', tokens: ['segment','module','reference'], defaultExpanded: false },
    { titleKey: 'settings.tokenGroupMultimodal', descKey: 'settings.tokenGroupMultimodalDesc', tokens: ['music','avatar','tts','agent','excel','gen3d','comfyui','runway'], defaultExpanded: false },
  ];

  /**
   * 渲染令牌卡片（v3 令牌中心化）
   * 每个令牌一个颜色选择器（唯一入口），关联高亮开关以 chip 内嵌
   * chip 可点击 toggle 开关；改色实时生效并更新所有引用处
   */
  private renderTokenCards(parent: HTMLElement, t: (key: string) => string): void {
    const colorTokens = this.plugin.getColorTokens();
    if (Object.keys(colorTokens).length === 0) {
      renderCard(parent, t('settings.colorCustom'), t('settings.colorCustomDesc'), 'colors', (card) => {
        card.createDiv({ cls: 'pc-pull-report-empty', text: t('settings.noColorTokens') });
      });
      return;
    }

    const lang = this.plugin.settings.language;
    const rootStyle = getComputedStyle(document.documentElement);
    const customColors = this.plugin.settings.customColors ?? {};

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
      if (group.defaultExpanded) details.setAttribute('open', '');
      const summary = details.createEl('summary', { cls: 'pc-token-group-summary' });
      summary.createSpan({ text: t(group.titleKey) });
      summary.createSpan({ cls: 'pc-token-group-count', text: ` (${existing.length})` });

      for (const tokenName of existing) {
        const token = colorTokens[tokenName];
        const cssVar = `--dsl-${tokenName}`;

        let name: string = tokenName;
        if (typeof token.name === 'object') name = lang === 'zh' ? token.name.zh : token.name.en;
        else if (typeof token.name === 'string') name = token.name;

        let desc: string = '';
        if (token.desc) {
          if (typeof token.desc === 'object') desc = lang === 'zh' ? token.desc.zh : token.desc.en;
          else desc = token.desc;
        }

        const userCustom = customColors[cssVar];
        const currentValue = userCustom || rootStyle.getPropertyValue(cssVar).trim() || token.light || '';

        const setting = new Setting(details).setName(name).setDesc(desc || tokenName);

        // 令牌启用/禁用开关（禁用则引用该令牌的 styleRule 不生成 CSS）
        const tokenEnabled = this.plugin.settings.tokenEnabled?.[tokenName] ?? true;
        let colorPicker: ColorComponent | null = null;
        let colorText: any = null;
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
              this.updatePreviewCard();
            }
          });
        });

        // 关联开关 chip
        const switchKeys = tokenToSwitchKeys.get(tokenName) ?? [];
        if (switchKeys.length > 0) {
          const chipRow = setting.settingEl.createDiv({ cls: 'pc-token-chips' });
          chipRow.createSpan({ cls: 'pc-token-chips-label', text: `${t('settings.tokenRelatedRules')}（${switchKeys.length}）：` });
          for (const sk of switchKeys) {
            const enabled = this.plugin.settings[sk as keyof PromptColorizerSettings] as boolean;
            const chip = chipRow.createEl('span', { cls: `pc-token-chip ${enabled ? 'is-enabled' : 'is-disabled'}` });
            chip.createSpan({ text: t(`settings.${sk}`) });
            chip.addEventListener('click', async () => {
              (this.plugin.settings as any)[sk] = !(this.plugin.settings as any)[sk];
              await this.plugin.saveSettings();
              this.plugin.refreshEditorExtensions();
              this.detectActiveAgentPreset();
              this.updatePreviewCard();
              this.display();
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

      // 只读色块预览 — 颜色在令牌卡片统一管理（v3 令牌中心化）
      const cssClass = HIGHLIGHT_TO_CSS_CLASS[item.key as string];
      if (cssClass) {
        const colorValue = this.plugin.getColorByCssClass(cssClass);
        if (colorValue) {
          const colorDot = setting.nameEl.createSpan({ cls: 'pc-rule-color-dot' });
          colorDot.style.backgroundColor = colorValue;
        }
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

    const items = [
      { label: t('status.editor'), value: this.plugin.settings.editorHighlightEnabled },
      { label: t('status.fileColorizer'), value: this.plugin.settings.fileColorizerEnabled },
      { label: t('status.readerMode'), value: this.plugin.settings.readerModeEnabled },
    ];

    for (const item of items) {
      const itemEl = bar.createDiv({ cls: 'pc-status-item' });
      itemEl.createSpan({ cls: `pc-status-dot ${item.value ? 'on' : 'off'}` });
      itemEl.createSpan({ text: `${item.label}` });
      itemEl.createSpan({
        text: item.value ? t('status.enabled') : t('status.disabled'),
        attr: { style: `color: ${item.value ? 'var(--pc-success)' : 'var(--pc-gray-500)'}; font-weight: 500;` },
      });
    }

    // 高亮规则激活计数 — 一目了然的规则开启情况
    const activeCount = HIGHLIGHT_KEYS.filter(
      (k) => this.plugin.settings[k] === true
    ).length;
    const totalCount = HIGHLIGHT_KEYS.length;

    const countEl = bar.createDiv({ cls: 'pc-status-count' });
    countEl.createSpan({ text: t('status.activeRules') + ' ' });
    const numEl = countEl.createSpan({
      cls: 'pc-status-count-num',
      text: `${activeCount}/${totalCount}`,
    });
  }

  /**
   * 动态更新状态概览条（不重新渲染整个面板）
   */
  private updateStatusBar(): void {
    const bar = document.querySelector('.pc-status-bar');
    if (!bar) return;

    const dots = bar.querySelectorAll('.pc-status-dot');
    const labels = bar.querySelectorAll('.pc-status-item span:nth-child(3)');

    const states = [
      this.plugin.settings.editorHighlightEnabled,
      this.plugin.settings.fileColorizerEnabled,
      this.plugin.settings.readerModeEnabled,
    ];

    const t = this.plugin.t.bind(this.plugin);

    dots.forEach((dot, i) => {
      const el = dot as HTMLElement;
      if (states[i]) {
        el.removeClass('off');
        el.addClass('on');
      } else {
        el.removeClass('on');
        el.addClass('off');
      }
    });

    labels.forEach((label, i) => {
      const el = label as HTMLElement;
      el.textContent = states[i] ? t('status.enabled') : t('status.disabled');
      el.style.color = states[i] ? 'var(--pc-success)' : 'var(--pc-gray-500)';
    });

    // 更新规则计数
    const activeCount = HIGHLIGHT_KEYS.filter(
      (k) => this.plugin.settings[k] === true
    ).length;
    const totalCount = HIGHLIGHT_KEYS.length;
    const numEl = bar.querySelector('.pc-status-count-num');
    if (numEl) {
      numEl.textContent = `${activeCount}/${totalCount}`;
    }
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
   * 渲染实时效果预览卡 — 示例提示词按当前规则集着色
   */
  private renderPreviewCard(parent: HTMLElement, t: (key: string) => string): void {
    renderCard(parent, t('preview.title'), t('preview.desc'), 'display', (card) => {
      const sample = card.createDiv({ cls: 'pc-preview-sample' });
      const html = this.plugin.highlightTextToHtml(PromptColorizerSettingTab.PREVIEW_SAMPLE);
      if (!html || html.trim().length === 0) {
        sample.createDiv({ cls: 'pc-preview-empty', text: t('preview.empty') });
        return;
      }
      sample.innerHTML = html;
    });
  }

  /**
   * 轻量更新实时预览(不重渲染整个面板) — 规则开关变化时调用
   */
  private updatePreviewCard(): void {
    const sample = document.querySelector('.pc-preview-sample');
    if (!sample) return;
    const html = this.plugin.highlightTextToHtml(PromptColorizerSettingTab.PREVIEW_SAMPLE);
    (sample as HTMLElement).innerHTML = html || '';
  }

  // ============================================================
  // 通用渲染组件
  // ============================================================

  /**

   * 渲染单个文件类型颜色设置项 — 含预览圆点
   */
  private renderColorSetting(parent: HTMLElement, colorConfig: FileTypeColor): void {
    const t = this.plugin.t.bind(this.plugin);

    const setting = new Setting(parent)
      .setName(colorConfig.label);

    // 颜色预览圆点
    setting.controlEl.createEl('span', {
      cls: 'pc-color-preview',
      attr: {
        style: `background-color: ${colorConfig.color};`,
      },
    });

    // 颜色选择器
    setting.addColorPicker((picker) => picker
      .setValue(colorConfig.color)
      .onChange(async (value) => {
        colorConfig.color = value;
        await this.plugin.saveSettings();
        this.plugin.refreshFileColorizer();
        this.plugin.applyColorMode();
        // 更新预览圆点
        this.display();
      }));

    // 颜色值显示
    setting.addText((text) => text
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


}
