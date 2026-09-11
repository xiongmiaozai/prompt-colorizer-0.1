/**
 * 提示词着色插件 — 类型定义
 */

import type { DeriveAlphas } from '../rule-engine/types';

/** 提示词角色类型 */
export type PromptRole = 'system' | 'user' | 'assistant' | 'tool' | 'none';

/** 文件类型分类 */
export type FileType = 'system' | 'user' | 'assistant' | 'tool' | 'example' | 'variable' | 'template' | 'video' | 'none';

/** 颜色主题模式 */
export type ColorMode = 'auto' | 'light' | 'dark';

/** 全局配色方案：default 原色 / soft 柔和（降饱和）/ mono 单色强调（近灰度）/ vivid 鲜明（增饱和）/ contrast 高对比（明度拉伸） */
export type ColorScheme = 'default' | 'soft' | 'mono' | 'vivid' | 'contrast';

/** 文件夹色板映射（项 10：不同文件夹挂不同色板） */
export interface FolderPalette {
  /** 文件夹路径（Vault 相对，如 "projects/tech"） */
  path: string;
  /** 色板预设名（对应 YAML palettes 键，或 "macaron"/"neon"/"morandi"/"sunset"） */
  palette: string;
}

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

/** 自定义颜色文字效果类型（旧字段保留兼容，新配置使用 effects 数组） */
export type CustomColorEffect =
  | 'none'
  | 'glow'
  | 'shadow'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'highlight'
  | 'wavy'
  | 'dashed'
  | 'strikethrough'
  | 'marker'
  | 'mono'
  | 'smallcaps'
  | 'outline'
  | 'superscript'
  | 'uppercase';

/**
 * 渐变色点（AE 风格多色渐变）
 * position 为色点在渐变轴上的百分比（0–100），浮点数由滑块拖动产生
 */
export interface GradientStop {
  /** 色点颜色（hex） */
  color: string;
  /** 色点位置百分比 0–100（浮点） */
  position: number;
}

/** 自定义文本颜色项（按文本内容匹配，全局所有 md 文件生效，不写入 md 文件） */
export interface CustomTextColor {
  /** 唯一 ID（用于生成 CSS 类名 dsl-custom-text-{id}） */
  id: string;
  /** 要匹配的文本内容 */
  text: string;
  /** 颜色值（hex 或合法 CSS 颜色字符串） */
  color: string;
  /** 辅助色（双色渐变终点，空串 = 不启用渐变；v2.9） */
  color2: string;
  /** 多色渐变色点列表（≥2 个启用多色渐变；v2.10，优先级高于 color2） */
  gradientStops?: GradientStop[];
  /** 渐变角度（度，0–360；缺省 135；v2.10） */
  gradientAngle?: number;
  /** 是否启用 */
  enabled: boolean;
  /** 是否区分大小写（默认 false） */
  caseSensitive: boolean;
  /** 是否全字匹配（避免部分匹配，默认 false） */
  wholeWord: boolean;
  /** 文字效果（旧单选字段，读取时迁移到 effects） */
  effect?: CustomColorEffect;
  /** 文字效果组合（可多选叠加，按注册表顺序合并声明） */
  effects?: CustomColorEffect[];
  /** 每个效果的可调参数（v2.13；effectValue → { paramId: 数值 }） */
  effectParams?: Partial<Record<CustomColorEffect, Record<string, number>>>;
  /** 资源分类（包管理模块；缺省 = 未分类） */
  category?: string;
  /** 锁定保护标记（仅阻止批量清理，不阻止手动删除） */
  resourceLock?: boolean;
  /** 用途备注 */
  note?: string;
}

/** ============ 包管理模块（v5） ============ */

/** 令牌资源分类（面向故事/提示词解析场景） */
export const TOKEN_CATEGORIES = [
  '角色名称', '台词对话', '场景环境', '内心独白', '旁白叙事', '系统指令', '备注标记', '未分类',
] as const;

/** 规则资源分类 */
export const RULE_CATEGORIES = [
  '旁白包裹', '台词包裹', '注释区间', '参数块', '自定义符号', '未分类',
] as const;

/** 资源状态（四态判定） */
export type ResourceStatus = 'active' | 'idle' | 'missing' | 'locked';

/** 规则资源侧车元数据（规则本体在 YAML 中不可改，元数据存 settings） */
export interface ResourceMeta {
  /** 资源分类 */
  category?: string;
  /** 锁定保护标记 */
  resourceLock?: boolean;
  /** 用途备注 */
  note?: string;
}

/** 包规范版本（.stylepkg 导入兼容性校验，独立于软件版本） */
export const PACKAGE_SPEC_VERSION = '1.0.0';

/** 包类型 */
export type PackageType = 'user' | 'builtin';

/** 单选 / 叠加模式 */
export type PackageMode = 'single' | 'multi';

/** 包的令牌样式覆盖（字段级覆盖，未声明字段继承本体） */
export interface TokenOverride {
  /** 覆盖颜色 */
  color?: string;
  /** 覆盖文字效果（bold/italic 等） */
  fontStyle?: string;
  /** 覆盖备注（不生效，仅描述） */
  fontStyleNote?: string;
}

/** 包的规则样式覆盖 */
export interface RuleOverride {
  /** 覆盖背景色 */
  bgColor?: string;
  /** 覆盖边框样式（如 dashed） */
  border?: string;
  /** 覆盖文字颜色 */
  color?: string;
}

/** 包元信息 + 包级覆盖配置（package.json 结构） */
export interface PackageManifest {
  /** 包唯一 ID（与文件夹名一致） */
  packageId: string;
  /** 显示名称 */
  name: string;
  /** 包标识色（导图圆点） */
  tagColor: string;
  /** 描述 */
  description: string;
  /** 包自身版本（内置包用于更新对比） */
  version: string;
  /** 包规范版本（.stylepkg 兼容校验） */
  specVersion: string;
  /** 包类型 */
  type: PackageType;
  /** 用途标签（如「故事阅读」） */
  usageTag: string;
  /** 底部预览区示例文本 */
  previewSampleText: string;
  /** 令牌样式覆盖（仅作用于本包索引引用的 ID） */
  tokenOverrides?: Record<string, TokenOverride>;
  /** 规则样式覆盖（仅作用于本包索引引用的 ID） */
  ruleOverrides?: Record<string, RuleOverride>;
  /** 克隆溯源：来源包 ID */
  clonedFromPackageId?: string;
  /** 克隆溯源：来源资源 ID 映射（新ID → 原ID） */
  clonedFromResourceIds?: Record<string, string>;
}

/** 包索引文件结构 */
export interface PackageRefIndex {
  refTokenIds?: string[];
  refRuleIds?: string[];
}

/** 用户自定义规则定义（.stylepkg 导入的规则落点；上层追加，不改规则引擎本体） */
export interface CustomRuleDef {
  /** 规则 ID（yaml key 形态） */
  id: string;
  /** 显示名称 */
  name: string;
  /** 正则表达式字符串 */
  regex: string;
  /** CSS 类名（dsl-xxx） */
  cssClass: string;
  /** 优先级 */
  priority: number;
  /** 捕获组 */
  captureGroup?: number | number[];
  /** 正则 flags */
  flags?: string;
  /** 样式声明（写入 styleRules[cssClass]） */
  style?: Record<string, string>;
}

/** 运行时已加载包（内存态） */
export interface LoadedPackage {
  /** 包目录名 */
  dirName: string;
  /** 磁盘绝对路径 */
  dirPath: string;
  /** 清单（package.json 损坏时为 null → 整包无效） */
  manifest: PackageManifest | null;
  /** 令牌引用 ID 列表（索引损坏时为 null → 分组部分失效） */
  refTokenIds: string[] | null;
  /** 规则引用 ID 列表（索引损坏时为 null → 分组部分失效） */
  refRuleIds: string[] | null;
  /** 是否内置只读包 */
  isBuiltin: boolean;
  /** 包级错误状态（无效包/ID冲突禁用/正常） */
  status: 'ok' | 'invalid' | 'id-conflict' | 'partial';
  /** 状态描述（导图提示用） */
  statusMessage?: string;
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

/** 提示词包(v4)：方向化配置快照 — 语法开关 + 词汇令牌 + 颜色方案/色板 一键切换 */
export interface PromptPack {
  /** 唯一 ID */
  id: string;
  /** 中文显示名称（如「视频分镜包」「Seed 专属包」） */
  name: string;
  /** 简短描述 */
  description: string;
  /** 图标（emoji） */
  icon: string;
  /** 方向标识 */
  direction: 'video' | 'image' | 'writing' | 'code' | 'minimal';
  /** 层1：启用的高亮规则 key 列表 */
  enabledKeys: string[];
  /** 层2：启用的词汇令牌 ID 列表 */
  vocabTokens: string[];
  /** 全局配色方案 */
  colorScheme: ColorScheme;
  /** 色板预设（空串 = 默认配色） */
  palettePreset: string;
  /** 是否内置包（内置不可删除，可恢复默认） */
  builtin: boolean;
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
  /** 全局配色方案：对全部颜色令牌做整体变换（降饱和/灰度/增饱和/高对比） */
  colorScheme: ColorScheme;
  /** 色板预设：YAML palettes 区块中的预设名（空串 = 默认配色） */
  palettePreset: string;
  /** 衍生透明度配置（soft/border 自动衍生比例，可调） */
  tokenDeriveAlphas: DeriveAlphas;
  /** 色盲辅助：红/绿系令牌追加冗余下划线（不依赖色相即可区分） */
  colorBlindAssist: boolean;
  /** 文件夹 → 色板映射（不同文件夹挂不同 palettes，最长路径优先） */
  folderPalettes: FolderPalette[];
  /** 文件夹主题着色是否启用 */
  folderPalettesEnabled: boolean;

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

  // === 提示词包(v4) ===
  /** 提示词包列表（方向化配置快照：开关+词汇令牌+颜色方案） */
  promptPacks: PromptPack[];
  /** 当前激活的提示词包 ID（空字符串表示未应用任何包） */
  activePackId: string;

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

  // === 词汇令牌（颜色管理中的词汇分组令牌） ===
  /** 词汇令牌启用状态（令牌 ID → boolean，缺省视为 true） */
  vocabTokenEnabled: Record<string, boolean>;
  /** 词汇令牌自定义颜色（令牌 ID → hex，空表示使用默认色） */
  vocabColors: Record<string, string>;
  /** 词汇令牌自定义词汇（令牌 ID → 追加词汇列表，与内置词汇合并匹配） */
  vocabCustomWords: Record<string, string[]>;

  // === 自定义文本区域颜色 ===
  /** 自定义文本颜色列表（按文本内容匹配，全局所有 md 生效，不污染 md 原文） */
  customTextColors: CustomTextColor[];
  /** 是否启用自定义文本颜色功能 */
  customTextColorsEnabled: boolean;
  /** 选中文本时自动显示浮动快速着色面板 */
  customTextPopoverAutoShow: boolean;
  /** 浮动面板显示延迟（毫秒），避免误触发 */
  customTextPopoverDelay: number;

  // === 颜色导图（v4 分组） ===
  /** 导图折叠状态（已折叠的分区 ID 列表，跨会话保留） */
  colorMapCollapsed: string[];
  /** 导图「只看激活包」过滤开关 */
  colorMapPackFilter: boolean;

  // === 包管理模块（v5） ===
  /** 包启用模式：single 单选 / multi 叠加 */
  packageMode: PackageMode;
  /** 启用中的包 ID 列表（叠加模式可多个，顺序 = packageOrder 优先级） */
  enabledPackageIds: string[];
  /** 包显示顺序（拖拽排序，上方优先级高；未列出的包排其后） */
  packageOrder: string[];
  /** 导图视图模式：package 包视图 / category 资源分类视图 */
  colorMapViewMode: 'package' | 'category';
  /** 规则资源侧车元数据（规则本体在 YAML 不可改；ruleId → 元数据） */
  ruleMeta: Record<string, ResourceMeta>;
  /** 用户自定义规则（.stylepkg 导入落点；initRules 后编译合并进规则集） */
  customRules: CustomRuleDef[];
  /** 首次迁移标记：现有令牌/规则已整理为 main 汇总包（一次性） */
  mainPackageMigrated?: boolean;
  /** 内置包已提示过的版本（避免重复弹窗） */
  builtinVersionNotified: Record<string, string>;
}
