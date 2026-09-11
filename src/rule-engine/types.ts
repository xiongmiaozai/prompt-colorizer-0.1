/**
 * 规则引擎类型定义
 * 定义 YAML 规则文件的结构和编译后的规则接口
 */

import type { DeriveAlphas } from './rule-compiler';
export type { DeriveAlphas };

// ============================================================
// YAML 配置文件结构类型
// ============================================================

/** 单个正则模式定义（01-base-patterns.yaml 中的节点） */
export interface PatternDef {
  /** 正则表达式字符串 */
  regex: string;
  /** CSS 类名 */
  cssClass: string;
  /** 捕获组（0=整个匹配，1=第一组，数组=多组） */
  captureGroup?: number | number[];
  /** 优先级（数值越大越优先） */
  priority?: number;
  /** 正则标志 */
  flags?: string;
  /** 是否为块级（影响整行） */
  blockLevel?: boolean;
  /** 子类映射（按捕获组细分 CSS 类） */
  subClass?: Record<string, number>;
}

/** 基础模式配置文件 */
export interface BasePatternsConfig {
  patterns: Record<string, PatternDef>;
}

/** 上下文语义映射 */
export interface ContextMapEntry {
  allowPatterns: string[];
}

/** 上下文语义配置文件 */
export interface SemanticContextConfig {
  contextMap: Record<string, ContextMapEntry>;
  scanStateEnum: Record<string, number>;
}

/** 词典条目 */
export interface LexiconConfig {
  lexicon: Record<string, string[]>;
  cssClassMap: Record<string, string>;
}

/** 样式规则 */
export interface StyleRule {
  color?: string;
  fontWeight?: string;
  fontStyle?: string;
  fontFamily?: string;
  fontSize?: string;
  textDecoration?: string;
  background?: string;
  border?: string;
  borderLeft?: string;
  borderRadius?: string;
  padding?: string;
  paddingLeft?: string;
  opacity?: string;
  textShadow?: string;
  boxShadow?: string;
  letterSpacing?: string;
  textTransform?: string;
  backgroundImage?: string;
  backgroundClip?: string;
  backgroundSize?: string;
  borderBottom?: string;
  verticalAlign?: string;
  textStroke?: string;
  textFillColor?: string;
  filter?: string;
  animation?: string;
  hover?: StyleRule;
  before?: Record<string, string>;
  after?: Record<string, string>;
}

/** 多语言文本（支持中英文） */
export interface I18nText {
  zh: string;
  en: string;
}

/** 颜色令牌定义 — 由 YAML 规则文件定义，插件动态生成 CSS 变量 */
export interface ColorToken {
  /** 浅色模式色值 */
  light: string;
  /** 深色模式色值 */
  dark: string;
  /** 颜色名称（多语言） */
  name: I18nText | string;
  /** 颜色描述（多语言） */
  desc?: I18nText | string;
}

/** 色板预设条目（YAML palettes 区块） */
export interface PalettePreset {
  /** 预设名（多语言） */
  name: I18nText | string;
  /** 令牌覆盖映射（只覆盖列出的令牌，其余沿用默认 colors） */
  tokens: Record<string, ColorToken>;
}

/** 主题配色配置文件 */
export interface ThemeColorConfig {
  /** 颜色令牌定义区 — 定义所有可用颜色，可无限扩展 */
  colors?: Record<string, ColorToken>;
  /** 样式规则区 — 每条规则引用颜色令牌名 */
  styleRules: Record<string, StyleRule>;
  /** 色板预设区 — 整套令牌覆盖，一键切换（v2.9） */
  palettes?: Record<string, PalettePreset>;
}

/** 优先级配置文件 */
export interface PriorityConfig {
  priority: Record<string, number>;
  defaultPatternPriority: number;
  lexiconPriority: number;
}

// ============================================================
// 编译后规则类型
// ============================================================

/** 编译后的单条匹配规则 */
export interface CompiledRule {
  /** 规则唯一标识 */
  id: string;
  /** 编译后的正则表达式 */
  regex: RegExp;
  /** CSS 类名 */
  cssClass: string;
  /** 优先级（数值越大越优先） */
  priority: number;
  /** 是否为块级 */
  blockLevel: boolean;
  /** 捕获组配置 */
  captureGroup: number | number[];
  /** 子类映射 */
  subClass?: Record<string, number>;
}

/** 编译后的词典规则 */
export interface CompiledLexicon {
  /** 词典类别名 */
  category: string;
  /** 编译后的正则（词边界匹配） */
  regex: RegExp;
  /** CSS 类名 */
  cssClass: string;
  /** 优先级 */
  priority: number;
  /** 原始词汇列表（供词汇令牌预览/统计使用） */
  words: string[];
}

/** 上下文映射条目 */
export interface ContextRule {
  /** 父级区块标记（如 【整体设定】） */
  blockMarker: string;
  /** 允许生效的规则 ID 列表 */
  allowPatterns: string[];
}

// ============================================================
// 完整规则集
// ============================================================

/** 编译后的完整规则集 */
export interface RuleSet {
  /** 所有编译后的正则规则 */
  rules: CompiledRule[];
  /** 词典规则 */
  lexicons: CompiledLexicon[];
  /** 上下文映射 */
  contextRules: ContextRule[];
  /** 颜色令牌定义（来自 YAML colors 区块，可无限扩展） */
  colorTokens: Record<string, ColorToken>;
  /** 色板预设映射（来自 YAML palettes 区块，v2.9） */
  palettes: Record<string, PalettePreset>;
  /** 样式规则映射 */
  styleRules: Record<string, StyleRule>;
  /** 扫描状态枚举 */
  scanStateEnum: Record<string, number>;
  /** 规则版本信息 */
  version: string;
  /** 规则更新时间 */
  updateTime: string;
  /** 汉字词性词典（来自 06-char-lexicon.yaml） */
  charLexicon: Map<string, CharProperty>;
  /** 编译后的组合规则（按优先级降序） */
  combinationRules: CompiledCombinationRule[];
  /** 编译后的词组词典分组（按优先级降序，v2.6.0 新增） */
  wordLexiconGroups: CompiledWordLexiconGroup[];
  /** 分词器配置（v2.6.0 新增） */
  segmenterConfig: SegmenterConfig;
}

// ============================================================
// 汉字词性词典与组合规则（v2.5.0 新增）
// ============================================================

/** 汉字词性属性 */
export interface CharProperty {
  /** 词性：adj/verb/noun/quantifier/number/punctuation/other/unknown */
  pos: string;
  /** 语义类别（可选，如 verb 类的 constraint/camera/action） */
  category?: string;
}

/** 组合规则定义（来自 YAML combinationRules 区块） */
export interface CombinationRule {
  /** 规则名称 */
  name: string;
  /** 首字词性要求（如 adj/verb/noun/number） */
  firstCharPos?: string;
  /** 尾字词性要求 */
  lastCharPos?: string;
  /** 中部字词性要求（三字以上组合） */
  midCharPos?: string;
  /** 首字语义类别要求（如 constraint） */
  firstCharCategory?: string;
  /** 分隔符（并列结构用，如顿号） */
  separator?: string;
  /** 是否要求两侧词性相同（并列结构用） */
  samePosRequired?: boolean;
  /** 长度范围 */
  length: { min: number; max: number };
  /** 后继标点正则（如 "[：:]" 表示后接冒号） */
  followedBy?: string;
  /** CSS 类名 */
  cssClass: string;
  /** 优先级 */
  priority: number;
}

/** 编译后的组合规则（含编译后的正则与判断函数） */
export interface CompiledCombinationRule {
  /** 规则名称 */
  name: string;
  /** 原始规则定义 */
  rule: CombinationRule;
  /** 后继标点正则（编译后） */
  followedByRegex: RegExp | null;
  /** 优先级 */
  priority: number;
  /** CSS 类名 */
  cssClass: string;
}

// ============================================================
// 词组语义分词词典（v2.6.0 新增）
// ============================================================

/** 词组词典分组定义（来自 YAML wordLexicon 区块） */
export interface WordLexiconGroup {
  /** 分组名称（如 constraint_phrase） */
  name: string;
  /** CSS 类名 */
  cssClass: string;
  /** 优先级（数值越大越优先） */
  priority: number;
  /** 后继标点正则（可选，如 "[：:]" 表示仅在后接冒号时匹配） */
  followedBy?: string;
  /** 词组列表 */
  words: string[];
}

/** 编译后的词组词典分组 */
export interface CompiledWordLexiconGroup {
  /** 分组名称 */
  name: string;
  /** CSS 类名 */
  cssClass: string;
  /** 优先级 */
  priority: number;
  /** 后继标点正则（编译后，null 表示无此约束） */
  followedByRegex: RegExp | null;
  /** 词组集合（Set 查询 O(1)） */
  wordSet: Set<string>;
  /** 本组最大词长（用于最大正向匹配的窗口大小） */
  maxWordLength: number;
}

/** 分词器配置 */
export interface SegmenterConfig {
  /** 最大词长（字符数），默认 6 */
  maxWordLength: number;
  /** 最小词长（字符数），默认 2 */
  minWordLength: number;
}

// ============================================================
// 匹配结果
// ============================================================

/** 单个匹配结果 */
export interface RuleMatchResult {
  /** 起始位置 */
  from: number;
  /** 结束位置 */
  to: number;
  /** CSS 类名 */
  cssClass: string;
  /** 优先级 */
  priority: number;
  /** 是否为块级 */
  block: boolean;
  /** 规则 ID */
  ruleId: string;
  /** 资源引用序号（如 @图1 的 "1"，用于角标显示） */
  refIndex?: string;
}

// ============================================================
// 版本信息
// ============================================================

/** 远程版本信息（version.json） */
export interface RemoteVersionInfo {
  version: string;
  updateTime: string;
  /** 哈希值（可选，缺失时由本地计算兜底） */
  hash?: string;
  mainBranch: string;
  rawBaseUrl: string;
}

/** 本地缓存的版本信息 */
export interface LocalVersionInfo {
  version: string;
  updateTime: string;
  hash: string;
  fetchedAt: number;
}

// ============================================================
// 拉取报告
// ============================================================

/** 单个文件的拉取结果 */
export interface PullFileResult {
  /** 文件名 */
  fileName: string;
  /** 是否拉取成功 */
  success: boolean;
  /** 文件大小（字节），失败时为 0 */
  size: number;
  /** 错误信息，失败时填写 */
  error?: string;
}

/** 规则分类统计 */
export interface RuleCategoryStat {
  /** 分类名称（如：基础正则规则、上下文映射、词典、配色定义、优先级） */
  name: string;
  /** 文件名 */
  file: string;
  /** 条目数 */
  count: number;
  /** 是否解析成功 */
  parsed: boolean;
}

/** 完整的拉取报告 */
export interface PullReportData {
  /** 拉取时间戳 */
  timestamp: number;
  /** 是否整体成功 */
  success: boolean;
  /** 远程版本号 */
  remoteVersion: string;
  /** 远程更新时间 */
  remoteUpdateTime: string;
  /** 远程哈希 */
  remoteHash: string;
  /** 本地版本号（拉取前） */
  localVersion: string | null;
  /** 是否有新版本 */
  hasUpdate: boolean;
  /** 拉取的文件结果列表 */
  files: PullFileResult[];
  /** 规则分类统计 */
  categories: RuleCategoryStat[];
  /** 总文件数 */
  totalFiles: number;
  /** 成功文件数 */
  successFiles: number;
  /** 总规则条目数 */
  totalRules: number;
  /** 总术语条目数 */
  totalTerms: number;
  /** 耗时（毫秒） */
  duration: number;
  /** 错误信息（整体失败时） */
  error?: string;
}
