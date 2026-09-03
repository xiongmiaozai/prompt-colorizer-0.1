/**
 * 提示词着色插件 — 类型定义
 */

/** 提示词角色类型 */
export type PromptRole = 'system' | 'user' | 'assistant' | 'tool' | 'none';

/** 文件类型分类 */
export type FileType = 'system' | 'user' | 'assistant' | 'tool' | 'example' | 'variable' | 'template' | 'video' | 'none';

/** 颜色主题模式 */
export type ColorMode = 'auto' | 'light' | 'dark';

/** 单个高亮规则定义 */
export interface HighlightPattern {
  /** 规则唯一标识 */
  id: string;
  /** 显示名称 */
  name: string;
  /** 是否启用 */
  enabled: boolean;
  /** CSS 类名前缀 */
  cssClass: string;
  /** 正则表达式字符串 */
  regex: string;
  /** 是否为块级（影响整行） */
  blockLevel: boolean;
}

/** 文件类型颜色映射 */
export interface FileTypeColor {
  /** 文件类型 */
  type: FileType;
  /** 显示名称 */
  label: string;
  /** 颜色值（十六进制） */
  color: string;
  /** 图标名称（Obsidian 图标） */
  icon: string;
}

/** 自定义文本颜色项（按文本内容匹配，全局所有 md 文件生效，不写入 md 文件） */
export interface CustomTextColor {
  /** 唯一 ID（用于生成 CSS 类名 dsl-custom-text-{id}） */
  id: string;
  /** 要匹配的文本内容 */
  text: string;
  /** 颜色值（hex 或合法 CSS 颜色字符串） */
  color: string;
  /** 是否启用 */
  enabled: boolean;
  /** 是否区分大小写（默认 false） */
  caseSensitive: boolean;
  /** 是否全字匹配（避免部分匹配，默认 false） */
  wholeWord: boolean;
}

/** 规则源预设(P1-6 多源切换) */
export interface RuleSourcePreset {
  /** 唯一 ID */
  id: string;
  /** 显示名称(如 "GitHub 官方源"、"Gitee 镜像") */
  name: string;
  /** 源类型 */
  type: 'github' | 'gitee' | 'gitlab' | 'codeberg' | 'custom';
  /** Raw 基础 URL(指向 rules/ 目录的父级) */
  rawBaseUrl: string;
  /** 是否需要 token 认证(私有仓库) */
  needsToken: boolean;
  /** 是否启用此源 */
  enabled: boolean;
}

/** 智能体预设(v3):将一组高亮规则封装为可命名、可复用的预设 */
export interface AgentPreset {
  /** 唯一 ID */
  id: string;
  /** 中文描述性名称(如 "提示词工程师"、"视频分镜师") */
  name: string;
  /** 简短描述 */
  description: string;
  /** 图标(emoji 或 SVG 内联) */
  icon: string;
  /** 该预设启用的高亮规则 key 列表(HIGHLIGHT_KEYS 子集) */
  enabledKeys: string[];
}

/** 提示词着色插件设置 */
export interface PromptColorizerSettings {
  // === 全局开关 ===
  /** 启用编辑器高亮 */
  editorHighlightEnabled: boolean;
  /** 启用文件浏览器着色 */
  fileColorizerEnabled: boolean;
  /** 启用阅读模式渲染 */
  readerModeEnabled: boolean;

  // === 颜色模式 ===
  /** 颜色模式：auto 跟随 Obsidian 主题，light/dark 强制 */
  colorMode: ColorMode;

  // === 编辑器高亮（基础模式）===
  /** 启用变量占位符高亮 {{variable}} */
  highlightVariables: boolean;
  /** 启用角色标签高亮 <system>/<user>/<assistant> */
  highlightRoleTags: boolean;
  /** 启用角色标题高亮 ### System/### User */
  highlightRoleHeaders: boolean;
  /** 启用指令标记高亮 [INST][/INST] */
  highlightInstructionMarkers: boolean;
  /** 启用注释高亮 <!-- --> */
  highlightComments: boolean;
  /** 启用代码块高亮 */
  highlightCodeBlocks: boolean;
  /** 启用 JSON 块高亮 */
  highlightJsonBlocks: boolean;
  /** 启用行内代码高亮 */
  highlightInlineCode: boolean;

  // === 编辑器高亮（视频提示词模式）===
  /** 启用区段标记高亮 【整体设定】【分镜设计】 */
  highlightSectionMarkers: boolean;
  /** 启用分镜标题高亮 镜头1（3秒） */
  highlightShotHeaders: boolean;
  /** 启用资源引用高亮 @图1(安德烈) @图2(简)-参考图服装 */
  highlightAssetRefs: boolean;
  /** 启用字段标签高亮 景别：运镜：光影： */
  highlightFieldLabels: boolean;
  /** 启用台词内容高亮 "Miss, you lost?" */
  highlightDialogue: boolean;
  /** 启用音频引用高亮 @音频1 音色 @音频2 */
  highlightAudioRefs: boolean;
  /** 启用排除/禁止规则高亮 排除/禁止/杜绝 */
  highlightNegativePrompts: boolean;
  /** 启用技术参数高亮 3200K 3秒 */
  highlightTechParams: boolean;
  /** 启用括号注释高亮 （粗俗、戏谑）（气场示威） */
  highlightParentheticals: boolean;

  // === 编辑器高亮（SD/ComfyUI 扩展模式）===
  /** 启用权重标记高亮 (text:1.3) */
  highlightEmphasisWeights: boolean;
  /** 启用 Lora/模型引用高亮 <lora:name:0.8> */
  highlightLoraRefs: boolean;
  /** 启用括号强调高亮 (text) ((text)) [text] */
  highlightBracketEmphasis: boolean;
  /** 启用质量标签高亮 masterpiece, best quality */
  highlightQualityTags: boolean;
  /** 启用 SD 负面提示词头高亮 Negative prompt: */
  highlightSdNegativeHeader: boolean;

  // === 编辑器高亮（视频提示词扩展模式）===
  /** 启用镜头运动术语高亮 推镜头、拉镜头、摇镜头 */
  highlightCameraMoves: boolean;
  /** 启用转场标记高亮 转场、淡入、淡出 */
  highlightSceneTransitions: boolean;

  // === 文件浏览器 ===
  /** 文件类型颜色映射列表 */
  fileTypeColors: FileTypeColor[];
  /** 基于 frontmatter type 字段判断类型 */
  detectByFrontmatter: boolean;
  /** 基于文件夹路径判断类型 */
  detectByFolder: boolean;
  /** 基于文件名前缀判断类型 */
  detectByFilename: boolean;
  /** 文件夹路径到类型的映射 */
  folderMappings: { path: string; type: FileType }[];

  // === 显示选项 ===
  /** 在文件名前显示颜色圆点 */
  showColorDot: boolean;
  /** 颜色圆点大小 */
  colorDotSize: number;
  /** 修改文件名颜色 */
  modifyFileNameColor: boolean;
  /** 在编辑器中显示角色边框 */
  showRoleBorders: boolean;

  // === 语言 ===
  /** 界面语言 */
  language: 'zh' | 'en';

  // === Git 规则托管配置 ===
  /** 规则来源：remote（Git远程）/ local（本地缓存）/ builtin（内置） */
  ruleSource: 'remote' | 'local' | 'builtin';
  /** Git 仓库的 raw base URL（指向 rules/ 目录的父级） */
  gitRawBaseUrl: string;
  /** Git 分支名称 */
  gitBranch: string;
  /** 是否自动检查规则更新 */
  autoUpdateRules: boolean;
  /** 自动检查间隔（小时） */
  autoUpdateInterval: number;
  /** 上次检查更新的时间戳 */
  lastCheckTime: number;
  /** 是否启用上下文语义过滤 */
  contextSemanticEnabled: boolean;
  /** 是否启用词典精细化着色 */
  lexiconEnabled: boolean;
  /** 启用的规则 ID 列表（空数组表示全部启用） */
  enabledRuleIds: string[];

  // === 多源切换配置(P1-6) ===
  /** 多源预设列表,支持 GitHub/Gitee/GitLab 镜像切换 */
  ruleSources: RuleSourcePreset[];
  /** 当前激活的源 ID(对应 ruleSources[].id),为空时使用 gitRawBaseUrl */
  activeRuleSourceId: string;

  // === 智能体预设(v3) ===
  /** 智能体预设列表(可新建/重命名/删除,启用规则组合) */
  agentPresets: AgentPreset[];
  /** 当前激活的智能体预设 ID(空字符串表示手动自定义) */
  activeAgentPresetId: string;

  // === 私有仓库认证(P1-6) ===
  /** 是否启用 token 认证(用于私有仓库或提升 API 速率限制) */
  gitTokenEnabled: boolean;
  /** GitHub/Gitee/GitLab 个人访问令牌(明文存储,仅本机使用) */
  gitToken: string;

  // === Git 拉取报告 ===
  /** 是否启用拉取报告 */
  gitReportEnabled: boolean;
  /** 是否自动下载到本地缓存 */
  downloadToCache: boolean;
  /** 上次拉取报告（JSON 字符串，null 表示无报告） */
  lastPullReport: string | null;

  // === 颜色自定义 ===
  /** 自定义颜色覆盖（CSS 变量名 → 颜色值，空对象表示使用默认值） */
  customColors: Record<string, string>;
  /** 颜色令牌启用状态（令牌名 → boolean，缺省视为 true） */
  tokenEnabled: Record<string, boolean>;

  // === 自定义文本区域颜色 ===
  /** 自定义文本颜色列表（按文本内容匹配，全局所有 md 生效，不污染 md 原文） */
  customTextColors: CustomTextColor[];
  /** 是否启用自定义文本颜色功能 */
  customTextColorsEnabled: boolean;
  /** 选中文本时自动显示浮动快速着色面板 */
  customTextPopoverAutoShow: boolean;
  /** 浮动面板显示延迟（毫秒），避免误触发 */
  customTextPopoverDelay: number;
}
