/**
 * 规则编译器
 * 将 YAML 配置文件解析、编译为可直接执行的规则集
 */

import { parseYaml } from './yaml-parser';
import { getBuiltinRuleFiles, BUILTIN_VERSION, BUILTIN_UPDATE_TIME } from './builtin-rules';
import type { ColorScheme } from '../types';
import type {
  PatternDef,
  BasePatternsConfig,
  SemanticContextConfig,
  LexiconConfig,
  ThemeColorConfig,
  PriorityConfig,
  CompiledRule,
  CompiledLexicon,
  ContextRule,
  RuleSet,
  StyleRule,
  ColorToken,
  CharProperty,
  CombinationRule,
  CompiledCombinationRule,
  WordLexiconGroup,
  CompiledWordLexiconGroup,
  SegmenterConfig,
} from './types';

/** 规则文件名列表 */
const RULE_FILES = [
  '01-base-patterns.yaml',
  '02-semantic-context.yaml',
  '03-lexicon-optional.yaml',
  '04-theme-color.yaml',
  '05-priority.yaml',
  '06-char-lexicon.yaml',
  '07-word-lexicon.yaml',
] as const;

/** 分词器默认配置 */
const DEFAULT_SEGMENTER_CONFIG: SegmenterConfig = {
  maxWordLength: 6,
  minWordLength: 2,
};

/**
 * 模块级缓存：记录含中文匹配内容的 CSS 类名集合
 * 由 compileRuleSet 编译时填充，generateStyleCss 读取以应用中文显示补偿
 * （采用模块级缓存而非调用方传参，避免改动 main.ts 调用链）
 */
let cachedChineseRuleClasses: Set<string> = new Set();

/**
 * 收集含中文匹配内容的 CSS 类名集合
 * 判定规则：编译后正则的 source 中含 CJK 字符（基本区/扩展A区/兼容区）即视为中文规则
 * @param rules 编译后的正则规则列表
 * @param lexicons 编译后的词典规则列表
 * @returns 含中文内容的 CSS 类名集合
 */
function collectChineseRuleClasses(
  rules: CompiledRule[],
  lexicons: CompiledLexicon[]
): Set<string> {
  const set = new Set<string>();
  const cjkRegex = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/;
  for (const rule of rules) {
    if (cjkRegex.test(rule.regex.source)) {
      set.add(rule.cssClass);
    }
  }
  for (const lex of lexicons) {
    if (cjkRegex.test(lex.regex.source)) {
      set.add(lex.cssClass);
    }
  }
  return set;
}

/**
 * 从文件内容映射编译完整规则集
 * @param files 文件名 → 内容映射
 * @param version 版本号
 * @param updateTime 更新时间
 * @returns 编译后的规则集
 */
export function compileRuleSet(
  files: Record<string, string>,
  version: string = '',
  updateTime: string = ''
): RuleSet | null {
  try {
    // 解析各配置文件
    const baseConfig = parseConfig<BasePatternsConfig>(files['01-base-patterns.yaml']);
    const semanticConfig = parseConfig<SemanticContextConfig>(files['02-semantic-context.yaml']);
    const lexiconConfig = parseConfig<LexiconConfig>(files['03-lexicon-optional.yaml']);
    const themeConfig = parseConfig<ThemeColorConfig>(files['04-theme-color.yaml']);
    const priorityConfig = parseConfig<PriorityConfig>(files['05-priority.yaml']);

    if (!baseConfig) {
      console.error('[PromptColorizer] 基础模式配置解析失败');
      return null;
    }

    const defaultPriority = priorityConfig?.defaultPatternPriority ?? 30;
    const lexiconPriority = priorityConfig?.lexiconPriority ?? 80;

    // 编译正则规则
    const rules = compilePatterns(baseConfig.patterns, defaultPriority);

    // 编译词典规则
    const lexicons = compileLexicons(lexiconConfig, lexiconPriority);

    // 编译上下文规则
    const contextRules = compileContextRules(semanticConfig);

    // 样式规则
    const styleRules = themeConfig?.styleRules ?? {};

    // 颜色令牌定义（来自 YAML colors 区块）
    const colorTokens = themeConfig?.colors ?? {};

    // 扫描状态枚举
    const scanStateEnum = semanticConfig?.scanStateEnum ?? { Normal: 0, InQuoteDialogue: 1, InBlockWrapper: 2 };

    // 预计算含中文的 CSS 类名集合，供 generateStyleCss 应用中文显示补偿
    cachedChineseRuleClasses = collectChineseRuleClasses(rules, lexicons);

    // 编译汉字词性词典与组合规则（v2.5.0 新增）
    const charLexiconConfig = parseConfig<{ charLexicon: Record<string, Record<string, CharProperty>> }>(
      files['06-char-lexicon.yaml']
    );
    const combinationRulesConfig = parseConfig<{ combinationRules: CombinationRule[] }>(
      files['06-char-lexicon.yaml']
    );
    const charLexicon = compileCharLexicon(charLexiconConfig?.charLexicon);
    const combinationRules = compileCombinationRules(combinationRulesConfig?.combinationRules);

    // 编译词组语义分词词典与分词器配置（v2.6.0 新增，v2.7.0 改造为多文件合并加载）
    // segmenterConfig 仍从 07-word-lexicon.yaml 索引文件读取
    const wordLexiconIndexConfig = parseConfig<{ segmenterConfig: Partial<SegmenterConfig> }>(
      files['07-word-lexicon.yaml']
    );
    if (!wordLexiconIndexConfig) {
      console.warn('[PromptColorizer] 07-word-lexicon.yaml 索引文件缺失，使用默认 segmenterConfig');
    }
    const segmenterConfig: SegmenterConfig = {
      maxWordLength: wordLexiconIndexConfig?.segmenterConfig?.maxWordLength ?? DEFAULT_SEGMENTER_CONFIG.maxWordLength,
      minWordLength: wordLexiconIndexConfig?.segmenterConfig?.minWordLength ?? DEFAULT_SEGMENTER_CONFIG.minWordLength,
    };
    // 合并所有 07*.yaml 文件的 wordLexicon 分组（v2.7.0 新增多文件加载机制）
    const wordLexiconGroups = compileWordLexicon(loadMergedWordLexicon(files));

    return {
      rules,
      lexicons,
      contextRules,
      colorTokens,
      palettes: themeConfig?.palettes ?? {},
      styleRules,
      scanStateEnum,
      version,
      updateTime,
      charLexicon,
      combinationRules,
      wordLexiconGroups,
      segmenterConfig,
    };
  } catch (e) {
    console.error('[PromptColorizer] 规则集编译失败:', e);
    return null;
  }
}

/**
 * 解析单个配置文件
 */
function parseConfig<T>(content: string | undefined): T | null {
  if (!content) return null;
  try {
    return parseYaml(content) as unknown as T;
  } catch (e) {
    console.error('[PromptColorizer] 配置解析失败:', e);
    return null;
  }
}

/**
 * 编译基础正则模式
 */
function compilePatterns(
  patterns: Record<string, PatternDef> | undefined,
  defaultPriority: number
): CompiledRule[] {
  if (!patterns) return [];

  const rules: CompiledRule[] = [];

  for (const [id, def] of Object.entries(patterns)) {
    try {
      // 编译正则表达式
      const flags = def.flags || 'g';
      const regex = new RegExp(def.regex, flags);

      rules.push({
        id,
        regex,
        cssClass: def.cssClass,
        priority: def.priority ?? defaultPriority,
        blockLevel: def.blockLevel ?? false,
        captureGroup: def.captureGroup ?? 0,
        subClass: def.subClass,
      });
    } catch (e) {
      console.warn(`[PromptColorizer] 正则编译失败: ${id}`, e);
    }
  }

  // 按优先级降序排列（高优先级先匹配）
  rules.sort((a, b) => b.priority - a.priority);

  return rules;
}

/**
 * 编译词典规则
 * 将词典数组转为带词边界的正则表达式
 */
function compileLexicons(
  config: LexiconConfig | null,
  priority: number
): CompiledLexicon[] {
  if (!config?.lexicon || !config?.cssClassMap) return [];

  const lexicons: CompiledLexicon[] = [];

  for (const [category, words] of Object.entries(config.lexicon)) {
    if (!words || words.length === 0) continue;

    const cssClass = config.cssClassMap[category];
    if (!cssClass) continue;

    // 转义特殊字符并构建正则
    const escaped = words
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .sort((a, b) => b.length - a.length); // 长词优先匹配

    const pattern = escaped.join('|');

    try {
      // 中文词不需要词边界，英文词需要
      const hasChinese = words.some((w) => /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/.test(w));
      const regex = hasChinese
        ? new RegExp(`(${pattern})`, 'gi')
        : new RegExp(`\\b(${pattern})\\b`, 'gi');

      lexicons.push({
        category,
        regex,
        cssClass,
        priority,
        words: [...words],
      });
    } catch (e) {
      console.warn(`[PromptColorizer] 词典正则编译失败: ${category}`, e);
    }
  }

  return lexicons;
}

/**
 * 编译上下文规则
 */
function compileContextRules(
  config: SemanticContextConfig | null
): ContextRule[] {
  if (!config?.contextMap) return [];

  const rules: ContextRule[] = [];

  for (const [blockMarker, entry] of Object.entries(config.contextMap)) {
    if (entry?.allowPatterns) {
      rules.push({
        blockMarker,
        allowPatterns: entry.allowPatterns,
      });
    }
  }

  return rules;
}

/**
 * 编译汉字词性词典
 * 构建 字符 → CharProperty 的查表数据结构
 *
 * YAML 中的 charLexicon 按词性分组嵌套：
 *   { adj: { 色: {pos:adj,...} }, noun: { 色: {pos:noun,...} }, ... }
 * 同一字符可能在多个分组下出现（如"色"在 adj 与 noun 下均有定义），
 * 采用"先到先得"策略：按分组遍历顺序，已收录的字不覆盖，
 * 保证 YAML 中先出现的分组（adj 优先于 noun）的字符定义被保留。
 *
 * @param charLexiconRaw YAML 中的 charLexicon 区块（嵌套结构）
 * @returns Map<string, CharProperty>，未传入时返回空 Map
 */
function compileCharLexicon(
  charLexiconRaw: Record<string, Record<string, CharProperty>> | undefined
): Map<string, CharProperty> {
  const map = new Map<string, CharProperty>();
  if (!charLexiconRaw) return map;
  // 嵌套结构：{ adj: { 色: {...} }, noun: { 温: {...} } }
  // 按词性分组遍历，先到先得（adj 优先于 noun，避免"色"被 noun 覆盖）
  for (const chars of Object.values(charLexiconRaw)) {
    if (!chars || typeof chars !== 'object') continue;
    for (const [char, prop] of Object.entries(chars)) {
      if (prop && typeof prop.pos === 'string') {
        // 先到先得：已收录的字不覆盖
        if (!map.has(char)) {
          map.set(char, { pos: prop.pos, category: prop.category });
        }
      }
    }
  }
  return map;
}

/**
 * 编译组合规则
 * 将 YAML combinationRules 编译为可执行的判断器，按优先级降序排序
 * @param rulesRaw YAML 中的 combinationRules 区块
 * @returns CompiledCombinationRule[] 按优先级降序排序
 */
function compileCombinationRules(
  rulesRaw: CombinationRule[] | undefined
): CompiledCombinationRule[] {
  if (!rulesRaw || !Array.isArray(rulesRaw)) return [];
  const compiled: CompiledCombinationRule[] = [];
  for (const rule of rulesRaw) {
    if (!rule.name || !rule.cssClass || typeof rule.priority !== 'number') {
      console.warn('[PromptColorizer] 组合规则缺少必填字段，已跳过:', rule);
      continue;
    }
    compiled.push({
      name: rule.name,
      rule,
      followedByRegex: rule.followedBy ? new RegExp(rule.followedBy) : null,
      priority: rule.priority,
      cssClass: rule.cssClass,
    });
  }
  // 按优先级降序排序
  compiled.sort((a, b) => b.priority - a.priority);
  return compiled;
}

/**
 * 对未着色的中文文本段应用组合规则
 * 按"首字词性 + 尾字词性 + 长度 + 后继标点"三维度判断
 * @param text 待判断的中文文本段
 * @param nextChar 紧邻该文本段的下一个字符（用于 followedBy 判断）
 * @param charLexicon 汉字词性词典
 * @param combinationRules 编译后的组合规则（已按优先级降序）
 * @returns 匹配的 cssClass，未匹配返回 null
 */
export function applyCombinationRules(
  text: string,
  nextChar: string,
  charLexicon: Map<string, CharProperty>,
  combinationRules: CompiledCombinationRule[]
): string | null {
  if (!text || !charLexicon || combinationRules.length === 0) return null;

  const len = text.length;
  const firstChar = text[0];
  const lastChar = text[len - 1];
  const firstProp = charLexicon.get(firstChar) ?? { pos: 'unknown' };
  const lastProp = charLexicon.get(lastChar) ?? { pos: 'unknown' };

  for (const compiledRule of combinationRules) {
    const rule = compiledRule.rule;

    // 长度判断
    if (len < rule.length.min || len > rule.length.max) continue;

    // 首字词性判断
    if (rule.firstCharPos && firstProp.pos !== rule.firstCharPos) continue;

    // 首字语义类别判断
    if (rule.firstCharCategory && firstProp.category !== rule.firstCharCategory) continue;

    // 尾字词性判断
    if (rule.lastCharPos && lastProp.pos !== rule.lastCharPos) continue;

    // 中部字词性判断（三字以上组合，检查第二个字）
    if (rule.midCharPos && len >= 3) {
      const midChar = text[1];
      const midProp = charLexicon.get(midChar) ?? { pos: 'unknown' };
      if (midProp.pos !== rule.midCharPos) continue;
    }

    // 后继标点判断
    if (compiledRule.followedByRegex) {
      if (!nextChar || !compiledRule.followedByRegex.test(nextChar)) continue;
    }

    // 并列结构：分隔符 + 同词性
    if (rule.separator && rule.samePosRequired) {
      const sepIdx = text.indexOf(rule.separator);
      if (sepIdx === -1) continue;
      const leftPart = text.substring(0, sepIdx);
      const rightPart = text.substring(sepIdx + rule.separator.length);
      if (!leftPart || !rightPart) continue;
      const leftLastProp = charLexicon.get(leftPart[leftPart.length - 1]) ?? { pos: 'unknown' };
      const rightFirstProp = charLexicon.get(rightPart[0]) ?? { pos: 'unknown' };
      if (leftLastProp.pos !== rightFirstProp.pos) continue;
      if (rule.lastCharPos && lastProp.pos !== rule.lastCharPos) continue;
    }

    // 全部条件满足，返回该规则的 cssClass
    return compiledRule.cssClass;
  }

  return null;
}

// ============================================================
// 词组语义分词器（v2.6.0 新增，v2.7.0 改造为多文件合并加载）
// ============================================================

/**
 * 合并多个 07*.yaml 文件的 wordLexicon 分组
 * 按文件名字母升序加载，同名分组先到先得（保留先加载的定义）
 *
 * 加载顺序：
 *   07-word-lexicon.yaml（索引文件，仅含 segmenterConfig，无 wordLexicon）
 *   → 07a-*.yaml → 07b-*.yaml → ... → 07k-*.yaml
 *
 * @param files 文件名 → 内容映射
 * @returns 合并后的 wordLexicon 分组对象（无分组时返回 undefined）
 */
function loadMergedWordLexicon(
  files: Record<string, string>
): Record<string, WordLexiconGroup> | undefined {
  // 收集所有 07*.yaml 文件名，按字母升序排序
  // 07-word-lexicon.yaml 会排在最前（短横线字母序优先于字母后缀）
  const wordLexiconFiles = Object.keys(files)
    .filter(name => name.startsWith('07') && name.endsWith('.yaml'))
    .sort();

  if (wordLexiconFiles.length === 0) return undefined;

  const merged: Record<string, WordLexiconGroup> = {};
  for (const fileName of wordLexiconFiles) {
    const config = parseConfig<{ wordLexicon: Record<string, WordLexiconGroup> }>(
      files[fileName]
    );
    if (!config?.wordLexicon) continue;
    for (const [groupName, group] of Object.entries(config.wordLexicon)) {
      if (groupName in merged) {
        console.warn(
          '[PromptColorizer] wordLexicon 分组重名:',
          groupName,
          `(来自 ${fileName}，已保留先加载的定义)`
        );
        continue;
      }
      merged[groupName] = group;
    }
  }
  return Object.keys(merged).length > 0 ? merged : undefined;
}

/**
 * 编译词组词典
 * 将 YAML 中的 wordLexicon 分组编译为带 Set 与最大词长的可执行结构
 *
 * @param wordLexiconRaw YAML 中的 wordLexicon 区块
 * @returns CompiledWordLexiconGroup[]，按优先级降序排序
 */
function compileWordLexicon(
  wordLexiconRaw: Record<string, WordLexiconGroup> | undefined
): CompiledWordLexiconGroup[] {
  if (!wordLexiconRaw || typeof wordLexiconRaw !== 'object') return [];
  const compiled: CompiledWordLexiconGroup[] = [];
  for (const [name, group] of Object.entries(wordLexiconRaw)) {
    if (!group || typeof group !== 'object') continue;
    if (!group.cssClass || typeof group.priority !== 'number' || !Array.isArray(group.words)) {
      console.warn('[PromptColorizer] 词组词典分组缺少必填字段，已跳过:', name);
      continue;
    }
    // 构建词组集合，同时统计本组最大词长
    // 英文术语统一转小写存储，支持大小写不敏感匹配（v2.6.4）
    const wordSet = new Set<string>();
    let maxWordLength = 0;
    for (const word of group.words) {
      if (typeof word !== 'string' || word.length === 0) continue;
      const normalized = /[a-zA-Z]/.test(word) ? word.toLowerCase() : word;
      wordSet.add(normalized);
      if (word.length > maxWordLength) maxWordLength = word.length;
    }
    if (wordSet.size === 0) continue;
    compiled.push({
      name,
      cssClass: group.cssClass,
      priority: group.priority,
      followedByRegex: group.followedBy ? new RegExp(group.followedBy) : null,
      wordSet,
      maxWordLength,
    });
  }
  // 按优先级降序排序，高优先级分组先匹配
  compiled.sort((a, b) => b.priority - a.priority);
  return compiled;
}

/**
 * 词组分词匹配结果
 */
export interface WordSegmentMatch {
  /** 起始位置（相对文档起点） */
  from: number;
  /** 结束位置 */
  to: number;
  /** CSS 类名 */
  cssClass: string;
  /** 优先级 */
  priority: number;
  /** 规则 ID */
  ruleId: string;
}

/**
 * 对未着色文本段执行最大正向匹配分词
 * 算法：从左到右扫描，每个位置尝试匹配最长词，命中即着色
 *
 * 优先级处理：分组已按 priority 降序排列，同一位置优先尝试高优先级分组
 * 后继标点约束：若分组定义了 followedByRegex，则词后必须紧跟指定标点才算命中
 *
 * @param text 文档全文（用于读取紧邻词后的字符判断 followedBy）
 * @param gapStart 空隙起始位置
 * @param gapEnd 空隙结束位置
 * @param groups 编译后的词组词典分组（已按优先级降序）
 * @param segmenterConfig 分词器配置
 * @returns 匹配结果数组（按 from 升序）
 */
export function segmentByWordLexicon(
  text: string,
  gapStart: number,
  gapEnd: number,
  groups: CompiledWordLexiconGroup[],
  segmenterConfig: SegmenterConfig
): WordSegmentMatch[] {
  if (groups.length === 0 || gapStart >= gapEnd) return [];

  const results: WordSegmentMatch[] = [];
  // 全局最大词长窗口：取分词器配置与各组最大词长的最大值
  const globalMaxLen = Math.max(
    segmenterConfig.maxWordLength,
    ...groups.map((g) => g.maxWordLength)
  );
  const minLen = segmenterConfig.minWordLength;
  const docLen = text.length;

  let i = gapStart;
  while (i < gapEnd) {
    const ch = text.charAt(i);

    // 英文术语扫描入口（v2.6.4 新增，v2.6.5 扩展）
    // 支持三类入口：
    //   1) 字母开头：best quality / lens flare
    //   2) -- 开头的参数：--ar / --v / --stylize
    //   3) 数字开头且后续 3 字符内含字母：3d render / 8k resolution / 35mm / 120mm
    // 纯数字（如 3200K）不进入，避免吞掉交给 pattern 处理的数值
    const isLetter = /[a-zA-Z]/.test(ch);
    const isParamPrefix = ch === '-' && i + 1 < gapEnd && /[a-zA-Z\-]/.test(text.charAt(i + 1));
    let isDigitWithLetter = false;
    if (/\d/.test(ch)) {
      // 向前看最多 3 个字符，检查是否含字母（支持 35mm/120mm，排除 3200K）
      for (let j = i + 1; j < Math.min(i + 4, gapEnd); j++) {
        const c = text.charAt(j);
        if (/[a-zA-Z]/.test(c)) { isDigitWithLetter = true; break; }
        if (!/\d/.test(c)) break;
      }
    }

    if (isLetter || isParamPrefix || isDigitWithLetter) {
      // 扫描英文短语结束位置：连续的字母、空格、连字符、数字、小数点、斜杠
      // 小数点用于 rec.709 / h.264；斜杠用于 f/1.4
      let end = i + 1;
      while (end < gapEnd && /[a-zA-Z\s\-\d.\/]/.test(text.charAt(end))) {
        end++;
      }
      // 修剪尾部的空格、连字符、小数点、斜杠（避免匹配带尾随分隔符的词）
      while (end > i + 1 && /[\s.\-\/]/.test(text.charAt(end - 1))) {
        end--;
      }

      // 在 [i, end) 范围内做最大正向匹配
      let matched = false;
      const maxTryLen = Math.min(globalMaxLen, end - i);
      for (let len = maxTryLen; len >= minLen; len--) {
        const candidate = text.substring(i, i + len).toLowerCase();
        for (const group of groups) {
          if (len > group.maxWordLength) continue;
          if (!group.wordSet.has(candidate)) continue;

          // 后继标点校验
          if (group.followedByRegex) {
            const nextChar = i + len < docLen ? text.charAt(i + len) : '';
            if (!nextChar || !group.followedByRegex.test(nextChar)) continue;
          }

          // 命中：记录结果并推进游标
          results.push({
            from: i,
            to: i + len,
            cssClass: group.cssClass,
            priority: group.priority,
            ruleId: `word-lexicon:${group.name}`,
          });
          i += len;
          matched = true;
          break;
        }
        if (matched) break;
      }

      // 未命中：跳过整个英文短语，交给其他规则处理
      if (!matched) {
        i = end;
      }
      continue;
    }

    // CJK 基本区汉字：走原来的最大正向匹配逻辑
    if (!/[\u4e00-\u9fff]/.test(ch)) {
      i++;
      continue;
    }

    // 最大正向匹配：从最长到最短尝试
    let matched = false;
    const maxTryLen = Math.min(globalMaxLen, gapEnd - i);
    for (let len = maxTryLen; len >= minLen; len--) {
      const candidate = text.substring(i, i + len);
      // 遍历各分组（已按优先级降序），第一个命中的分组即采用
      for (const group of groups) {
        if (len > group.maxWordLength) continue;
        if (!group.wordSet.has(candidate)) continue;

        // 后继标点校验
        if (group.followedByRegex) {
          const nextChar = i + len < docLen ? text.charAt(i + len) : '';
          if (!nextChar || !group.followedByRegex.test(nextChar)) continue;
        }

        // 命中：记录结果并推进游标
        results.push({
          from: i,
          to: i + len,
          cssClass: group.cssClass,
          priority: group.priority,
          ruleId: `word-lexicon:${group.name}`,
        });
        i += len;
        matched = true;
        break;
      }
      if (matched) break;
    }

    // 未命中：推进一个字符，留给 06 字级组合规则处理
    if (!matched) {
      i++;
    }
  }

  return results;
}

/**
 * 从内置默认规则文件加载规则集
 * 当 Git 远程规则不可用或用户选择 builtin 模式时使用
 */
export function loadBuiltinRules(): RuleSet | null {
  const files = getBuiltinRuleFiles();
  return compileRuleSet(files, BUILTIN_VERSION, BUILTIN_UPDATE_TIME);
}

// ============================================================
// 动态颜色引擎 — 颜色变量生成与令牌引用解析
// ============================================================

/**
 * 将十六进制色值转为带透明度的 rgba 字符串
 * @param hex 十六进制色值（如 #ef4444）
 * @param alpha 透明度（0-1）
 * @returns rgba 字符串
 */
function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * 十六进制色值 → HSL 分量
 * @returns { h, s, l } — h: 0-360, s/l: 0-1
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16) / 255;
  const g = parseInt(cleaned.substring(2, 4), 16) / 255;
  const b = parseInt(cleaned.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: h * 360, s, l };
}

/**
 * HSL 分量 → 十六进制色值
 */
function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.min(1, Math.max(0, s));
  l = Math.min(1, Math.max(0, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 按全局配色方案变换颜色值（v2.8.0 降噪；v2.9.0 增 contrast 档）
 *
 * - default：原样返回
 * - soft（柔和）：饱和度 ×0.6，正文着色更淡雅
 * - mono（单色强调）：饱和度 ×0.12（近灰度），仅保留极弱色相，
 *   用户可通过自定义颜色为个别令牌上色实现"单色强调"
 * - vivid（鲜明）：饱和度 ×1.2（上限 1.0），色块对比更强
 * - contrast（高对比）：明度向两端拉伸（浅色加深、深色提亮）+ 饱和度 ×1.1，
 *   适配弱视觉场景与投影环境
 *
 * @param hex 原始颜色值
 * @param scheme 配色方案
 * @returns 变换后的颜色值
 */
export function applyColorSchemeToHex(hex: string, scheme: ColorScheme): string {
  if (!hex || !hex.startsWith('#')) return hex;
  if (scheme === 'default') return hex;
  const { h, s, l } = hexToHsl(hex);
  if (s < 0.02) return hex; // 无彩色（灰阶）不做变换
  switch (scheme) {
    case 'soft':
      return hslToHex(h, s * 0.6, l);
    case 'mono':
      return hslToHex(h, s * 0.12, l);
    case 'vivid':
      return hslToHex(h, Math.min(1, s * 1.2), l);
    case 'contrast': {
      // 浅色系（l>0.5）向暗拉伸、深色系向亮拉伸，各拉 15%，上限/下限 0.06/0.94
      const stretched = l > 0.5 ? Math.max(0.06, l - 0.15) : Math.min(0.94, l + 0.15);
      return hslToHex(h, Math.min(1, s * 1.1), stretched);
    }
    default:
      return hex;
  }
}

/** 衍生透明度配置（项 3 自动配色衍生可调） */
export interface DeriveAlphas {
  /** 浅色模式 soft 背景（默认 0.06） */
  softLight?: number;
  /** 深色模式 soft 背景（默认 0.10） */
  softDark?: number;
  /** 中文补偿增量（叠加在 soft 之上，默认 0.02） */
  softCnBoost?: number;
  /** 浅色模式 border 边框（默认 0.15） */
  borderLight?: number;
  /** 深色模式 border 边框（默认 0.20） */
  borderDark?: number;
  /** 中文边框补偿增量（默认 0.03） */
  borderCnBoost?: number;
}

/** 衍生透明度默认值 */
const DEFAULT_ALPHAS: Required<DeriveAlphas> = {
  softLight: 0.06,
  softDark: 0.10,
  softCnBoost: 0.02,
  borderLight: 0.15,
  borderDark: 0.20,
  borderCnBoost: 0.03,
};

const clamp01 = (v: number): number => Math.min(0.6, Math.max(0.01, v));

/**
 * 生成颜色变量的 CSS 文本
 * 从 colorTokens 定义生成 :root 和 body.theme-dark 两套 CSS 变量
 *
 * 每个令牌生成 5 个变量：
 *   --dsl-{name}           → 主色
 *   --dsl-{name}-soft      → 半透明背景（浅色默认 6%，深色默认 10%，可配）
 *   --dsl-{name}-soft-cn   → 中文补偿背景（soft + 补偿增量）
 *   --dsl-{name}-border    → 边框色（浅色默认 15%，深色默认 20%，可配）
 *   --dsl-{name}-border-cn → 中文补偿边框（border + 补偿增量）
 *
 * @param colorTokens 颜色令牌定义映射
 * @param colorScheme 全局配色方案（default 原色 / soft 柔和 / mono 单色强调 / vivid 鲜明 / contrast 高对比）
 * @param alphas 衍生透明度配置（缺省用默认值）
 * @returns CSS 文本
 */
export function generateColorVariables(
  colorTokens: Record<string, ColorToken>,
  colorScheme: ColorScheme = 'default',
  alphas: DeriveAlphas = {}
): string {
  if (Object.keys(colorTokens).length === 0) return '';

  const a = { ...DEFAULT_ALPHAS, ...alphas };

  let css = '/* 动态颜色令牌 — 由 YAML colors 区块自动生成 */\n\n';

  // 浅色模式变量
  css += ':root {\n';
  for (const [name, token] of Object.entries(colorTokens)) {
    const lightColor = applyColorSchemeToHex(token.light || '#888888', colorScheme);
    css += `  --dsl-${name}: ${lightColor};\n`;
    css += `  --dsl-${name}-soft: ${hexToRgba(lightColor, clamp01(a.softLight))};\n`;
    // 中文背景透明度补偿（soft + 增量，补偿 CJK 字符密度更高的视觉重量）
    css += `  --dsl-${name}-soft-cn: ${hexToRgba(lightColor, clamp01(a.softLight + a.softCnBoost))};\n`;
    css += `  --dsl-${name}-border: ${hexToRgba(lightColor, clamp01(a.borderLight))};\n`;
    // 中文边框透明度补偿
    css += `  --dsl-${name}-border-cn: ${hexToRgba(lightColor, clamp01(a.borderLight + a.borderCnBoost))};\n`;
    // 发光光晕（浅色模式下光晕偏弱，避免在亮底上发糊）
    css += `  --dsl-${name}-glow: 0 0 2px ${hexToRgba(lightColor, 0.55)}, 0 0 6px ${hexToRgba(lightColor, 0.30)}, 0 0 14px ${hexToRgba(lightColor, 0.12)};\n`;
  }
  css += '}\n\n';

  // 深色模式变量
  css += 'body.theme-dark {\n';
  for (const [name, token] of Object.entries(colorTokens)) {
    const darkColor = applyColorSchemeToHex(token.dark || token.light || '#888888', colorScheme);
    css += `  --dsl-${name}: ${darkColor};\n`;
    css += `  --dsl-${name}-soft: ${hexToRgba(darkColor, clamp01(a.softDark))};\n`;
    // 中文背景透明度补偿
    css += `  --dsl-${name}-soft-cn: ${hexToRgba(darkColor, clamp01(a.softDark + a.softCnBoost))};\n`;
    css += `  --dsl-${name}-border: ${hexToRgba(darkColor, clamp01(a.borderDark))};\n`;
    // 中文边框透明度补偿
    css += `  --dsl-${name}-border-cn: ${hexToRgba(darkColor, clamp01(a.borderDark + a.borderCnBoost))};\n`;
    // 发光光晕（深色模式下三层渐强，霓虹感更明显）
    css += `  --dsl-${name}-glow: 0 0 2px ${hexToRgba(darkColor, 0.75)}, 0 0 8px ${hexToRgba(darkColor, 0.45)}, 0 0 18px ${hexToRgba(darkColor, 0.18)};\n`;
  }
  css += '}\n\n';

  return css;
}

/**
 * 解析颜色值中的令牌引用
 * 将 YAML 中的令牌引用格式解析为 CSS 变量引用
 *
 * 支持的格式：
 *   "danger"                       → var(--dsl-danger)
 *   "danger.soft"                  → var(--dsl-danger-soft)
 *   "danger.border"                → var(--dsl-danger-border)
 *   "1px solid danger.border"     → 1px solid var(--dsl-danger-border)
 *   "var(--xxx)"                   → var(--xxx)（原样保留）
 *   "#ef4444"                      → #ef4444（原样保留）
 *   "rgba(...)"                    → rgba(...)（原样保留）
 *   "transparent"                  → transparent（原样保留）
 *
 * 当 isChinese 为 true 时，.soft/.border 修饰会解析为补偿版变量：
 *   "danger.soft"   → var(--dsl-danger-soft-cn)（中文背景透明度更高）
 *   "danger.border" → var(--dsl-danger-border-cn)（中文边框透明度更高）
 *
 * @param value YAML 中的颜色值
 * @param colorTokens 颜色令牌定义（用于验证令牌是否存在）
 * @param isChinese 是否为中文规则（true 时 .soft/.border 引用补偿版变量）
 * @returns 解析后的 CSS 值
 */
export function resolveColorReference(
  value: string,
  colorTokens: Record<string, ColorToken>,
  isChinese?: boolean
): string {
  if (!value || typeof value !== 'string') return value;

  const trimmed = value.trim();

  // 已经是 var() 引用 → 原样保留
  if (/^var\(--[\w-]+\)$/.test(trimmed)) return trimmed;

  // 十六进制色值 → 原样保留
  if (/^#[0-9a-fA-F]{3,8}$/.test(trimmed)) return trimmed;

  // rgba/rgb/hsl 等函数 → 原样保留
  if (/^(rgba?|hsla?)\(/i.test(trimmed)) return trimmed;

  // transparent/none 等关键字 → 原样保留
  if (/^(transparent|none|inherit|initial|unset)$/i.test(trimmed)) return trimmed;

  // 纯令牌引用：如 "danger"
  const pureTokenMatch = trimmed.match(/^([a-zA-Z_][\w-]*)$/);
  if (pureTokenMatch) {
    const tokenName = pureTokenMatch[1];
    if (colorTokens[tokenName]) {
      return `var(--dsl-${tokenName})`;
    }
    // 不是已知令牌，原样返回
    return trimmed;
  }

  // 带修饰的令牌引用：如 "danger.soft" / "danger.border" / "danger.glow"
  const modifierMatch = trimmed.match(/^([a-zA-Z_][\w-]*)\.(soft|border|glow)$/);
  if (modifierMatch) {
    const tokenName = modifierMatch[1];
    const modifier = modifierMatch[2];
    if (colorTokens[tokenName]) {
      // glow 光晕变量无中文补偿版（文本阴影透明度不需补偿）
      // soft/border 在中文规则下使用补偿版变量（更高透明度）
      const suffix = modifier === 'glow' ? modifier : (isChinese ? `${modifier}-cn` : modifier);
      return `var(--dsl-${tokenName}-${suffix})`;
    }
    return trimmed;
  }

  // 颜色混叠：mix(a, b[, 比例]) → color-mix(in oklab, var(--dsl-a), var(--dsl-b) 比例%)
  // 比例省略时默认 50；也可直接写 hex（mix(#ef4444, danger, 30)）
  const mixMatch = trimmed.match(/^mix\(\s*([\w#-]+)\s*,\s*([\w#-]+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (mixMatch) {
    const toVar = (ref: string): string | null => {
      if (colorTokens[ref]) return `var(--dsl-${ref})`;
      if (/^#[0-9a-fA-F]{3,8}$/.test(ref)) return ref;
      return null;
    };
    const a = toVar(mixMatch[1]);
    const b = toVar(mixMatch[2]);
    if (a && b) {
      const pct = mixMatch[3] ? parseInt(mixMatch[3], 10) : 50;
      return `color-mix(in oklab, ${a}, ${b} ${pct}%)`;
    }
    return trimmed;
  }

  // 复合值中的令牌引用：如 "1px solid danger.border" / "0 0 5px danger.glow"
  // 匹配所有令牌引用并替换
  return trimmed.replace(/\b([a-zA-Z_][\w-]*(?:\.(?:soft|border|glow))?)\b/g, (match) => {
    // 跳过 CSS 关键字和单位
    if (/^(solid|dashed|dotted|none|hidden|medium|thick|thin|px|em|rem|vh|vw|%|auto|center|left|right|top|bottom|bold|normal|italic|underline|none|block|inline|flex|grid)$/i.test(match)) {
      return match;
    }
    // 检查是否是令牌引用
    const parts = match.split('.');
    const tokenName = parts[0];
    const modifier = parts[1];

    if (colorTokens[tokenName]) {
      if (modifier === 'glow') {
        // glow 光晕变量无中文补偿版
        return `var(--dsl-${tokenName}-glow)`;
      }
      if (modifier === 'soft' || modifier === 'border') {
        // 中文规则引用 .soft/.border 时使用补偿版变量（更高透明度）
        const suffix = isChinese ? `${modifier}-cn` : modifier;
        return `var(--dsl-${tokenName}-${suffix})`;
      }
      return `var(--dsl-${tokenName})`;
    }

    return match;
  });
}

/**
 * 生成样式 CSS 文本
 * 从主题配色配置生成 CSS 规则
 * 自动解析颜色令牌引用为 CSS 变量
 *
 * 中文显示补偿（当规则匹配中文内容时）：
 *   - 背景 .soft 引用 → .soft-cn（透明度更高，补偿 CJK 字符密度）
 *   - 边框 .border 引用 → .border-cn（透明度更高）
 *   - fontWeight: bold → var(--pc-weight-bold-cn)（800，提升 CJK 笔画辨识度）
 * 中文规则判定：编译后正则 source 含 CJK 字符即视为中文规则
 *
 * @param styleRules 样式规则映射
 * @param colorTokens 颜色令牌定义（用于解析令牌引用）
 * @param chineseRuleClasses 含中文的 CSS 类名集合（显式传入时优先；未传则回退到 compileRuleSet 预计算的模块级缓存）
 * @returns CSS 文本
 */
/**
 * 构建单组样式属性列表（主规则与 hover 子规则共用）
 * @param style 样式规则
 * @param colorTokens 颜色令牌定义
 * @param isChineseRule 是否为中文规则（透明度/字重补偿）
 */
function buildStyleProperties(
  style: StyleRule,
  colorTokens: Record<string, ColorToken>,
  isChineseRule: boolean
): string[] {
  const properties: string[] = [];

  if (style.color) properties.push(`  color: ${resolveColorReference(style.color, colorTokens, isChineseRule)};`);
  // 字重：中文规则下 bold 补偿为 800（var(--pc-weight-bold-cn)），提升 CJK 笔画辨识度
  if (style.fontWeight) {
    if (isChineseRule && style.fontWeight === 'bold') {
      properties.push(`  font-weight: var(--pc-weight-bold-cn);`);
    } else {
      properties.push(`  font-weight: ${style.fontWeight};`);
    }
  }
  if (style.fontStyle) properties.push(`  font-style: ${style.fontStyle};`);
  // 字体族：monospace 走专用变量，其他原样输出
  if (style.fontFamily) {
    if (style.fontFamily === 'monospace') {
      properties.push(`  font-family: var(--pc-font-mono);`);
    } else {
      properties.push(`  font-family: ${style.fontFamily};`);
    }
  }
  if (style.fontSize) properties.push(`  font-size: ${style.fontSize};`);
  if (style.textDecoration) properties.push(`  text-decoration: ${style.textDecoration};`);
  // 背景/边框：中文规则下 .soft/.border 引用解析为补偿版变量（更高透明度）
  if (style.background) properties.push(`  background: ${resolveColorReference(style.background, colorTokens, isChineseRule)};`);
  if (style.border) properties.push(`  border: ${resolveColorReference(style.border, colorTokens, isChineseRule)};`);
  if (style.borderBottom) properties.push(`  border-bottom: ${resolveColorReference(style.borderBottom, colorTokens, isChineseRule)};`);
  if (style.borderLeft) properties.push(`  border-left: ${resolveColorReference(style.borderLeft, colorTokens, isChineseRule)};`);
  if (style.borderRadius) properties.push(`  border-radius: ${style.borderRadius};`);
  if (style.padding) properties.push(`  padding: ${style.padding};`);
  if (style.paddingLeft) properties.push(`  padding-left: ${style.paddingLeft};`);
  if (style.opacity) properties.push(`  opacity: ${style.opacity};`);
  if (style.textShadow) properties.push(`  text-shadow: ${resolveColorReference(style.textShadow, colorTokens, isChineseRule)};`);
  if (style.textStroke) properties.push(`  -webkit-text-stroke: ${resolveColorReference(style.textStroke, colorTokens, isChineseRule)};`);
  if (style.textFillColor) properties.push(`  -webkit-text-fill-color: ${resolveColorReference(style.textFillColor, colorTokens, isChineseRule)};`);
  if (style.boxShadow) properties.push(`  box-shadow: ${resolveColorReference(style.boxShadow, colorTokens, isChineseRule)};`);
  if (style.letterSpacing) properties.push(`  letter-spacing: ${style.letterSpacing};`);
  if (style.verticalAlign) properties.push(`  vertical-align: ${style.verticalAlign};`);
  if (style.textTransform) properties.push(`  text-transform: ${style.textTransform};`);
  if (style.filter) properties.push(`  filter: ${style.filter};`);
  if (style.animation) properties.push(`  animation: ${style.animation};`);
  if (style.backgroundImage) properties.push(`  background-image: ${resolveColorReference(style.backgroundImage, colorTokens, isChineseRule)};`);
  if (style.backgroundSize) properties.push(`  background-size: ${style.backgroundSize};`);
  if (style.backgroundClip) {
    properties.push(`  -webkit-background-clip: ${style.backgroundClip};`);
    properties.push(`  background-clip: ${style.backgroundClip};`);
    if (style.backgroundClip === 'text') {
      properties.push(`  -webkit-text-fill-color: transparent;`);
    }
  }

  return properties;
}

/**
 * 构建伪元素（::before/::after）属性列表
 * @param pseudo 伪元素属性映射（content 原样输出，其余解析令牌引用）
 * @param colorTokens 颜色令牌定义
 * @param isChineseRule 是否为中文规则
 */
function buildPseudoProperties(
  pseudo: Record<string, string>,
  colorTokens: Record<string, ColorToken>,
  isChineseRule: boolean
): string[] {
  const CSS_KEY_MAP: Record<string, string> = {
    content: 'content',
    color: 'color',
    fontSize: 'font-size',
    fontWeight: 'font-weight',
    fontStyle: 'font-style',
    fontFamily: 'font-family',
    opacity: 'opacity',
    verticalAlign: 'vertical-align',
    letterSpacing: 'letter-spacing',
    textShadow: 'text-shadow',
    marginLeft: 'margin-left',
    marginRight: 'margin-right',
    padding: 'padding',
  };

  const properties: string[] = [];
  for (const [key, rawValue] of Object.entries(pseudo)) {
    const value = key === 'content'
      ? rawValue
      : resolveColorReference(rawValue, colorTokens, isChineseRule);
    const cssKey = CSS_KEY_MAP[key];
    if (cssKey) {
      properties.push(`  ${cssKey}: ${value};`);
    }
  }
  return properties;
}

/**
 * 追加一组选择器块（编辑器模式 + 阅读模式）
 * @param css 已累积的 CSS 文本
 * @param className CSS 类名
 * @param suffix 选择器后缀（'' / ':hover' / '::before' / '::after'）
 * @param properties 属性列表
 */
function appendSelectorBlocks(
  css: string,
  className: string,
  suffix: string,
  properties: string[]
): string {
  if (properties.length === 0) return css;
  css += `.cm-line .${className}${suffix} {\n${properties.join('\n')}\n}\n\n`;
  css += `.${className}${suffix} {\n${properties.join('\n')}\n}\n\n`;
  return css;
}

/** 内置 keyframes 动画库 — YAML animation 引用 pc-xxx 名称时自动注入定义 */
const BUILTIN_KEYFRAMES: Record<string, string> = {
  // 彩虹流动：渐变背景色带平滑滚动（配 background-clip: text + backgroundImage）
  'pc-rainbow-flow': `@keyframes pc-rainbow-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}`,
  // 呼吸光晕：发光强度脉动（配 textShadow）
  'pc-glow-pulse': `@keyframes pc-glow-pulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.35); }
}`,
  // 渐隐闪烁：透明度轻呼吸（弱化标记用，节奏克制）
  'pc-fade-blink': `@keyframes pc-fade-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.72; }
}`,
};

/**
 * 收集规则集中引用的内置动画名
 * 匹配 animation 值（含 hover 子规则）中的 pc- 前缀动画名
 */
function collectUsedKeyframes(styleRules: Record<string, StyleRule>): Set<string> {
  const used = new Set<string>();
  const collect = (anim?: string) => {
    if (!anim) return;
    const m = anim.match(/(pc-[\w-]+)/);
    if (m && BUILTIN_KEYFRAMES[m[1]]) used.add(m[1]);
  };
  for (const style of Object.values(styleRules)) {
    collect(style.animation);
    collect(style.hover?.animation);
  }
  return used;
}

export function generateStyleCss(
  styleRules: Record<string, StyleRule>,
  colorTokens: Record<string, ColorToken> = {},
  chineseRuleClasses?: Set<string>
): string {
  let css = '/* 自动生成的 DSL 样式规则 */\n\n';

  // 中文规则类名集合：优先使用显式传入，否则回退到 compileRuleSet 预计算的模块级缓存
  const cnSet = chineseRuleClasses ?? cachedChineseRuleClasses;

  for (const [className, style] of Object.entries(styleRules)) {
    // 该规则是否匹配中文内容（决定是否应用透明度/字重补偿）
    const isChineseRule = cnSet.has(className);

    // 主规则
    css = appendSelectorBlocks(css, className, '', buildStyleProperties(style, colorTokens, isChineseRule));

    // 悬停增强（:hover 子规则）
    if (style.hover) {
      css = appendSelectorBlocks(css, className, ':hover', buildStyleProperties(style.hover, colorTokens, isChineseRule));
    }

    // 前后缀装饰符伪元素
    if (style.before) {
      css = appendSelectorBlocks(css, className, '::before', buildPseudoProperties(style.before, colorTokens, isChineseRule));
    }
    if (style.after) {
      css = appendSelectorBlocks(css, className, '::after', buildPseudoProperties(style.after, colorTokens, isChineseRule));
    }
  }

  // 追加引用到的内置动画定义（按需注入，无引用不输出）
  for (const name of collectUsedKeyframes(styleRules)) {
    css += BUILTIN_KEYFRAMES[name] + '\n\n';
  }

  return css;
}

/**
 * 色盲辅助 CSS（项 7）
 * body.pc-colorblind-assist 下为红/绿系令牌追加冗余下划线：
 * 不依赖色相即可区分——红色系（排除/负面/系统角色）= 波浪线，绿色系（台词/质量/成功）= 实线
 * 动态样式 <style> 之后注入，靠 body class 开关整体启用/禁用
 */
const COLORBLIND_RED_CLASSES = [
  'dsl-constraint',
  'dsl-sd-negative-header',
  'dsl-negative-tag',
  'dsl-role-tag',
  'dsl-md-strikethrough',
];
const COLORBLIND_GREEN_CLASSES = [
  'dsl-dialogue',
  'dsl-quality-tag',
  'dsl-quality-tag-ext',
  'dsl-md-task',
];

export function generateColorBlindAssistCss(): string {
  let css = '/* 色盲辅助 — 红/绿系令牌冗余下划线（非色相编码） */\n';
  css += 'body.pc-colorblind-assist .cm-line, body.pc-colorblind-assist .markdown-preview-view { /* scope */ }\n';
  for (const cls of COLORBLIND_RED_CLASSES) {
    css += `body.pc-colorblind-assist .cm-line .${cls} { text-decoration: underline wavy currentColor; text-decoration-thickness: 1px; }\n`;
    css += `body.pc-colorblind-assist .${cls} { text-decoration: underline wavy currentColor; text-decoration-thickness: 1px; }\n`;
  }
  for (const cls of COLORBLIND_GREEN_CLASSES) {
    css += `body.pc-colorblind-assist .cm-line .${cls} { text-decoration: underline currentColor; text-decoration-thickness: 2px; }\n`;
    css += `body.pc-colorblind-assist .${cls} { text-decoration: underline currentColor; text-decoration-thickness: 2px; }\n`;
  }
  return css;
}
