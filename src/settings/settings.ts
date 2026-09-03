/**
 * 提示词着色插件 — 设置定义与默认值
 */

import type { PromptColorizerSettings, FileTypeColor, FileType, AgentPreset } from '../types';

/** 高亮规则 key 分区常量（与 setting-tab 保持一致，供默认预设使用） */
const HIGHLIGHT_KEYS_ALL: string[] = [
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

const BASIC_KEYS_ALL: string[] = [
  'highlightVariables',
  'highlightRoleTags',
  'highlightRoleHeaders',
  'highlightInstructionMarkers',
  'highlightComments',
  'highlightCodeBlocks',
  'highlightJsonBlocks',
  'highlightInlineCode',
];

const VIDEO_KEYS_ALL: string[] = [
  'highlightSectionMarkers',
  'highlightShotHeaders',
  'highlightAssetRefs',
  'highlightFieldLabels',
  'highlightDialogue',
  'highlightAudioRefs',
  'highlightNegativePrompts',
  'highlightTechParams',
  'highlightParentheticals',
  'highlightCameraMoves',
  'highlightSceneTransitions',
];

/** 默认智能体预设(v3)：内置 4 个场景化预设，用户可自由新建/重命名/删除 */
export const DEFAULT_AGENT_PRESETS: AgentPreset[] = [
  {
    id: 'agent-all',
    name: '全能着色调校师',
    description: '启用所有高亮规则，适配任何提示词场景',
    icon: '✦',
    enabledKeys: [...HIGHLIGHT_KEYS_ALL],
  },
  {
    id: 'agent-basic',
    name: '提示词工程师',
    description: '仅启用基础高亮：变量、角色标签、代码块等',
    icon: '▣',
    enabledKeys: [...BASIC_KEYS_ALL],
  },
  {
    id: 'agent-video',
    name: '视频分镜师',
    description: '视频/分镜提示词专用：区段、分镜、台词、运镜等',
    icon: '▶',
    enabledKeys: [...VIDEO_KEYS_ALL],
  },
  {
    id: 'agent-minimal',
    name: '极简标注师',
    description: '仅区段标记与分镜标题，降低视觉噪音',
    icon: '○',
    enabledKeys: ['highlightSectionMarkers', 'highlightShotHeaders'],
  },
];

/** 文件类型默认颜色映射 */
export const DEFAULT_FILE_TYPE_COLORS: FileTypeColor[] = [
  { type: 'system',    label: 'System 提示词',   color: '#ef4444', icon: 'shield' },
  { type: 'user',      label: 'User 提示词',     color: '#3b82f6', icon: 'user' },
  { type: 'assistant', label: 'Assistant 提示词', color: '#10b981', icon: 'bot' },
  { type: 'tool',      label: 'Tool 提示词',     color: '#ea580c', icon: 'wrench' },
  { type: 'example',   label: '示例/Few-shot',   color: '#0891b2', icon: 'list' },
  { type: 'variable',  label: '变量定义',        color: '#f59e0b', icon: 'braces' },
  { type: 'template',  label: '模板文件',        color: '#8b5cf6', icon: 'file-code' },
  { type: 'video',     label: '视频提示词',      color: '#db2777', icon: 'video' },
  { type: 'none',      label: '普通文件',        color: '#6b7280', icon: 'file' },
];

/** 默认文件夹映射 */
export const DEFAULT_FOLDER_MAPPINGS: { path: string; type: FileType }[] = [
  { path: 'prompts/system',    type: 'system' },
  { path: 'prompts/user',      type: 'user' },
  { path: 'prompts/assistant', type: 'assistant' },
  { path: 'prompts/tool',      type: 'tool' },
  { path: 'prompts/examples',  type: 'example' },
  { path: 'prompts/variables', type: 'variable' },
  { path: 'prompts/templates', type: 'template' },
  { path: 'prompts/video',     type: 'video' },
];

/** 插件默认设置 */
export const DEFAULT_SETTINGS: PromptColorizerSettings = {
  // 全局开关
  editorHighlightEnabled: true,
  fileColorizerEnabled: true,
  readerModeEnabled: true,

  // 颜色模式
  colorMode: 'auto',

  // 编辑器高亮（基础模式）
  highlightVariables: true,
  highlightRoleTags: true,
  highlightRoleHeaders: true,
  highlightInstructionMarkers: true,
  highlightComments: true,
  highlightCodeBlocks: true,
  highlightJsonBlocks: true,
  highlightInlineCode: true,

  // 编辑器高亮（视频提示词模式）
  highlightSectionMarkers: true,
  highlightShotHeaders: true,
  highlightAssetRefs: true,
  highlightFieldLabels: true,
  highlightDialogue: true,
  highlightAudioRefs: true,
  highlightNegativePrompts: true,
  highlightTechParams: true,
  highlightParentheticals: true,

  // SD/ComfyUI 扩展模式
  highlightEmphasisWeights: true,
  highlightLoraRefs: true,
  highlightBracketEmphasis: true,
  highlightQualityTags: true,
  highlightSdNegativeHeader: true,

  // 视频提示词扩展模式
  highlightCameraMoves: true,
  highlightSceneTransitions: true,

  // 文件浏览器
  fileTypeColors: DEFAULT_FILE_TYPE_COLORS,
  detectByFrontmatter: true,
  detectByFolder: true,
  detectByFilename: false,
  folderMappings: DEFAULT_FOLDER_MAPPINGS,

  // 显示选项
  showColorDot: true,
  colorDotSize: 8,
  modifyFileNameColor: true,
  showRoleBorders: true,

  // 语言
  language: 'zh',

  // Git 规则托管配置
  ruleSource: 'builtin',
  gitRawBaseUrl: 'https://raw.githubusercontent.com/xiongmiaozai/prompt-dsl-highlight-rules/main/rules',
  gitBranch: 'main',
  autoUpdateRules: false,
  autoUpdateInterval: 24,
  lastCheckTime: 0,
  contextSemanticEnabled: true,
  lexiconEnabled: true,
  enabledRuleIds: [],

  // 多源切换配置(P1-6)
  // 内置三个预设源:GitHub 官方、Gitee 镜像、jsdelivr CDN
  // Gitee 镜像用于国内网络环境直连,无需翻墙
  ruleSources: [
    {
      id: 'github-official',
      name: 'GitHub 官方源',
      type: 'github',
      rawBaseUrl: 'https://raw.githubusercontent.com/xiongmiaozai/prompt-dsl-highlight-rules/main/rules',
      needsToken: false,
      enabled: true,
    },
    {
      id: 'gitee-mirror',
      name: 'Gitee 镜像源(国内推荐)',
      type: 'gitee',
      rawBaseUrl: 'https://gitee.com/xiongmiaozai/prompt-dsl-highlight-rules/raw/main/rules',
      needsToken: false,
      enabled: true,
    },
    {
      id: 'jsdelivr-cdn',
      name: 'jsDelivr CDN 源',
      type: 'custom',
      rawBaseUrl: 'https://cdn.jsdelivr.net/gh/xiongmiaozai/prompt-dsl-highlight-rules@main/rules',
      needsToken: false,
      enabled: true,
    },
  ],
  activeRuleSourceId: 'github-official',

  // 智能体预设(v3)
  agentPresets: DEFAULT_AGENT_PRESETS,
  activeAgentPresetId: '',

  // 私有仓库认证(P1-6)
  gitTokenEnabled: false,
  gitToken: '',

  // Git 拉取报告
  gitReportEnabled: true,
  downloadToCache: true,
  lastPullReport: null,

  // 颜色自定义
  customColors: {},
  tokenEnabled: {},

  // 自定义文本区域颜色（不写入 md，按文本内容全局匹配）
  customTextColors: [],
  customTextColorsEnabled: true,
  // 浮动快速着色面板
  customTextPopoverAutoShow: true,
  customTextPopoverDelay: 350,
};

/** 深合并设置（处理新增字段） */
export function mergeSettings(
  defaults: PromptColorizerSettings,
  saved: Partial<PromptColorizerSettings>
): PromptColorizerSettings {
  const result = { ...defaults };

  for (const key in saved) {
    const k = key as keyof PromptColorizerSettings;
    const savedVal = saved[k];
    const defaultVal = defaults[k];

    if (Array.isArray(savedVal) && Array.isArray(defaultVal)) {
      // 数组类型直接替换（如 fileTypeColors、folderMappings）
      (result as any)[k] = savedVal;
    } else if (savedVal !== undefined && savedVal !== null) {
      (result as any)[k] = savedVal;
    }
  }

  return result;
}
