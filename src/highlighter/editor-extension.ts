/**
 * 提示词着色插件 — CodeMirror 6 编辑器高亮扩展
 * 使用 ViewPlugin + Decoration 实现编辑器内的语法着色
 *
 * v3 重构：
 * - 使用 RuleMatcher 动态规则引擎替代硬编码 patterns
 * - 仅在文档内容变更或视口变更时重建装饰（移除 selectionSet 触发）
 * - CodeMirror 6 内部已有高效的装饰差分机制，无需手动防抖
 * - 删除未使用的 RoleBorderWidget 死代码
 * - 支持动态更新 matcher（规则热重载）
 */

import { Extension, Prec, RangeSetBuilder } from '@codemirror/state';
import {
  ViewPlugin,
  ViewUpdate,
  Decoration,
  DecorationSet,
  EditorView,
} from '@codemirror/view';
import type { PromptColorizerSettings } from '../types';
import type { RuleMatcher } from '../rule-engine/matcher';
import { applyCombinationRules, segmentByWordLexicon } from '../rule-engine/rule-compiler';
import type {
  RuleMatchResult,
  CharProperty,
  CompiledCombinationRule,
  CompiledWordLexiconGroup,
  SegmenterConfig,
} from '../rule-engine/types';
import {
  matchCustomTextColors,
  overlapsCustomColor,
} from './custom-text-colors';
import { CSS_TO_KEY } from './rule-key-map';
import { VOCAB_CLASS_TO_TOKEN, TOKEN_GROUP_BY_ID } from '../rule-engine/vocab-tokens';

/**
 * 匹配结果去重：同 from 区间保留优先级最高的匹配
 * 自定义词汇层可能与主匹配/词典层产生同区间重叠
 */
function dedupeMatches(matches: RuleMatchResult[]): RuleMatchResult[] {
  const sorted = [...matches].sort((a, b) => a.from - b.from || b.priority - a.priority);
  const result: RuleMatchResult[] = [];
  let lastTo = -1;
  for (const m of sorted) {
    if (m.from < lastTo) continue; // 与前一个区间重叠，跳过
    result.push(m);
    lastTo = m.to;
  }
  return result;
}

/**
 * 匹配用户追加的自定义词汇（vocabCustomWords）
 * 生成与该令牌组主 cssClass 同类的匹配结果，参与后续合并与过滤
 */
function matchVocabCustomWords(
  text: string,
  settings: PromptColorizerSettings
): RuleMatchResult[] {
  const customWords = settings.vocabCustomWords;
  if (!customWords) return [];

  const results: RuleMatchResult[] = [];
  for (const [tokenId, words] of Object.entries(customWords)) {
    if (!words || words.length === 0) continue;
    const group = TOKEN_GROUP_BY_ID[tokenId];
    if (!group) continue;
    const cssClass = group.cssClasses[0];

    const escaped = words
      .filter((w) => w.trim().length > 0)
      .map((w) => w.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .sort((a, b) => b.length - a.length);
    if (escaped.length === 0) continue;

    const hasChinese = words.some((w) => /[\u4e00-\u9fff]/.test(w));
    const regex = hasChinese
      ? new RegExp(`(${escaped.join('|')})`, 'gi')
      : new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');

    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      if (m[1].length === 0) break;
      results.push({
        from: m.index,
        to: m.index + m[1].length,
        cssClass,
        priority: 90,
        block: false,
        ruleId: `vocab-custom-${tokenId}`,
      });
    }
  }
  return results.sort((a, b) => a.from - b.from);
}

/**
 * 扫描单个空隙中的未着色中文段，对每个连续中文段调用组合规则
 * 作为 patterns/lexicons 之外的补充识别层，仅处理主匹配遗留的空隙
 *
 * @param text 文档全文（用于取紧邻中文段的下一个字符）
 * @param gapStart 空隙起始位置（含）
 * @param gapEnd 空隙结束位置（不含）
 * @param charLexicon 汉字词性词典
 * @param combinationRules 编译后的组合规则（已按优先级降序）
 * @param results 输出参数，追加匹配结果（已按 from 升序）
 */
function scanGapForCombinationRules(
  text: string,
  gapStart: number,
  gapEnd: number,
  charLexicon: Map<string, CharProperty>,
  combinationRules: CompiledCombinationRule[],
  results: RuleMatchResult[]
): void {
  const segment = text.substring(gapStart, gapEnd);
  // 仅匹配 CJK 基本区的连续中文段（\u4e00-\u9fff）
  const cjkRegex = /[\u4e00-\u9fff]+/g;
  let m: RegExpExecArray | null;
  while ((m = cjkRegex.exec(segment)) !== null) {
    const runText = m[0];
    const runStart = gapStart + m.index;
    const runEnd = runStart + runText.length;
    // 紧邻该中文段的下一个字符（可能是冒号/逗号/句号等，用于 followedBy 判断）
    const nextChar = runEnd < text.length ? text.charAt(runEnd) : '';
    const cssClass = applyCombinationRules(
      runText,
      nextChar,
      charLexicon,
      combinationRules
    );
    // 匹配失败时不添加任何装饰，保持默认显示
    if (cssClass) {
      results.push({
        from: runStart,
        to: runEnd,
        cssClass,
        // 组合规则作为补充层，优先级最低，不与主匹配竞争
        priority: 0,
        block: false,
        ruleId: 'combination-rule',
      });
    }
  }
}

/**
 * 对未被 patterns/lexicons 匹配的中文文本段应用补充识别
 * 执行顺序（v2.6.0 调整）：
 *   1. 先对空隙调用词组分词器（07 词组词典），命中词组直接着色
 *   2. 词组分词后遗留的未命中段（单字或无匹配组合），再交给字级组合规则（06）兜底
 *
 * 保证 patterns/lexicons 优先：补充识别区间严格落在主匹配空隙内
 *
 * @param text 文档全文
 * @param matches 主匹配流程已产生的匹配结果（已按 from 升序、去重）
 * @param matcher 规则匹配器（用于获取词组词典、组合规则、分词器配置）
 * @returns 补充识别结果数组（词组 + 字级组合，已按 from 升序）
 */
function applyCombinationRulesToUnmatched(
  text: string,
  matches: RuleMatchResult[],
  matcher: RuleMatcher
): RuleMatchResult[] {
  const charLexicon = matcher.getCharLexicon();
  const combinationRules = matcher.getCombinationRules();
  const wordLexiconGroups = matcher.getWordLexiconGroups();
  const segmenterConfig = matcher.getSegmenterConfig();

  // 词组层与字级组合层都无配置时直接返回空
  const hasWordLayer = wordLexiconGroups.length > 0;
  const hasCharLayer = !!(charLexicon && charLexicon.size > 0 && combinationRules.length > 0);
  if (!hasWordLayer && !hasCharLayer) return [];

  const results: RuleMatchResult[] = [];
  const docLength = text.length;

  // 遍历主匹配之间的空隙
  let gapStart = 0;
  for (const match of matches) {
    const matchFrom = Math.max(0, Math.min(match.from, docLength));
    const matchTo = Math.max(matchFrom, Math.min(match.to, docLength));
    if (matchFrom > gapStart) {
      // 第 1 层：词组分词（优先级 43-48）
      const wordMatches: RuleMatchResult[] = hasWordLayer
        ? segmentByWordLexicon(text, gapStart, matchFrom, wordLexiconGroups, segmenterConfig).map(
            (m) => ({
              from: m.from,
              to: m.to,
              cssClass: m.cssClass,
              priority: m.priority,
              block: false,
              ruleId: m.ruleId,
            })
          )
        : [];
      results.push(...wordMatches);

      // 第 2 层：字级组合规则（优先级 0，补充层）
      // 只对词组分词未命中的段扫描，避免与词组结果重叠
      if (hasCharLayer) {
        // 计算词组匹配后的剩余空隙
        let segStart = gapStart;
        for (const wm of wordMatches) {
          if (wm.from > segStart) {
            scanGapForCombinationRules(
              text,
              segStart,
              wm.from,
              charLexicon,
              combinationRules,
              results
            );
          }
          segStart = Math.max(segStart, wm.to);
        }
        // 处理词组匹配末尾到空隙末尾的剩余段
        if (segStart < matchFrom) {
          scanGapForCombinationRules(
            text,
            segStart,
            matchFrom,
            charLexicon,
            combinationRules,
            results
          );
        }
      }
    }
    gapStart = Math.max(gapStart, matchTo);
  }
  // 处理最后一个空隙：[gapStart, docLength)
  if (gapStart < docLength) {
    const wordMatches: RuleMatchResult[] = hasWordLayer
      ? segmentByWordLexicon(text, gapStart, docLength, wordLexiconGroups, segmenterConfig).map(
          (m) => ({
            from: m.from,
            to: m.to,
            cssClass: m.cssClass,
            priority: m.priority,
            block: false,
            ruleId: m.ruleId,
          })
        )
      : [];
    results.push(...wordMatches);

    if (hasCharLayer) {
      let segStart = gapStart;
      for (const wm of wordMatches) {
        if (wm.from > segStart) {
          scanGapForCombinationRules(
            text,
            segStart,
            wm.from,
            charLexicon,
            combinationRules,
            results
          );
        }
        segStart = Math.max(segStart, wm.to);
      }
      if (segStart < docLength) {
        scanGapForCombinationRules(
          text,
          segStart,
          docLength,
          charLexicon,
          combinationRules,
          results
        );
      }
    }
  }

  return results;
}

/**
 * 收集文本的所有着色匹配结果（主匹配 + 组合规则 + 自定义文本颜色）
 * 与编辑器高亮使用完全相同的匹配逻辑，供颜色导图面板等复用
 * 包作用域（v5）从 matcher 读取：ruleIdScope 过滤 DSL 规则，tokenIdScope 过滤自定义令牌
 *
 * @param text 文档全文
 * @param matcher 规则匹配器
 * @param settings 插件设置
 * @returns 过滤后的所有匹配结果（按 from 升序）
 */
export function collectAllMatches(
  text: string,
  matcher: RuleMatcher | null,
  settings: PromptColorizerSettings
): RuleMatchResult[] {
  if (!matcher) return [];

  // 构建启用的规则 ID 集合
  let enabledIds: Set<string> | null = null;
  if (settings.enabledRuleIds && settings.enabledRuleIds.length > 0) {
    enabledIds = new Set(settings.enabledRuleIds);
  }

  // 设置上下文和词典开关
  matcher.setContextEnabled(settings.contextSemanticEnabled);
  matcher.setLexiconEnabled(settings.lexiconEnabled);

  // 执行主匹配（patterns + lexicons，已按 from 升序、去重；包规则作用域在 matcher 内部生效）
  const matches = matcher.match(text, enabledIds);

  // 组合规则补充识别
  const comboMatches = applyCombinationRulesToUnmatched(text, matches, matcher);

  // 自定义文本颜色匹配（优先级最高，覆盖 DSL 规则；包作用域下仅包内引用的令牌参与）
  const tokenScope = matcher.getTokenIdScope();
  let tokenColors = settings.customTextColors ?? [];
  if (tokenScope) {
    tokenColors = tokenColors.filter((c) => tokenScope.has(c.id));
  }
  const customMatches = matchCustomTextColors(
    text,
    tokenColors,
    settings.customTextColorsEnabled !== false
  );

  // 自定义词汇匹配（用户追加到令牌组的词汇，词级匹配优先于组合规则补充层）
  const vocabCustomMatches = matchVocabCustomWords(text, settings);

  // 合并所有匹配结果
  let allMatches: RuleMatchResult[];
  if (customMatches.length > 0) {
    const filteredMatches = matches.filter(
      (m) => !overlapsCustomColor(m.from, m.to, customMatches)
    );
    const filteredCombo = comboMatches.filter(
      (m) => !overlapsCustomColor(m.from, m.to, customMatches)
    );
    allMatches = [...filteredMatches, ...filteredCombo, ...customMatches, ...vocabCustomMatches].sort(
      (a, b) => a.from - b.from
    );
  } else if (comboMatches.length > 0 || vocabCustomMatches.length > 0) {
    allMatches = [...matches, ...comboMatches, ...vocabCustomMatches].sort(
      (a, b) => a.from - b.from
    );
  } else {
    allMatches = matches;
  }

  // 去重：同区间保留高优先级（vocabCustom priority 90 高于组合层 0，低于词典层）
  allMatches = dedupeMatches(allMatches);

  // 按 UI 开关过滤（词汇令牌开关优先，其次符号类规则开关）
  return filterMatchesByToggles(allMatches, settings);
}

/**
 * 按设置开关过滤匹配结果（词汇令牌开关 + 符号类规则开关）
 * 编辑器模式与阅读模式共用，确保两处开关行为一致
 */
export function filterMatchesByToggles(
  matches: RuleMatchResult[],
  settings: PromptColorizerSettings
): RuleMatchResult[] {
  return matches.filter((m) => {
    const tokenId = VOCAB_CLASS_TO_TOKEN[m.cssClass];
    if (tokenId) {
      return settings.vocabTokenEnabled?.[tokenId] ?? true;
    }
    const settingKey = CSS_TO_KEY[m.cssClass];
    if (!settingKey) return true;
    return (settings as any)[settingKey] !== false;
  });
}

/**
 * 将匹配结果转换为 CodeMirror 装饰
 * @param view 编辑器视图
 * @param matcher 规则匹配器
 * @param settings 插件设置
 * @returns 装饰集合
 */
function buildDecorations(
  view: EditorView,
  matcher: RuleMatcher | null,
  settings: PromptColorizerSettings
): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();

  if (!settings.editorHighlightEnabled || !matcher) {
    return builder.finish();
  }

  const text = view.state.doc.toString();
  const allMatches = collectAllMatches(text, matcher, settings);

  // 装饰必须按 from 升序添加，否则 RangeSetBuilder 会抛出异常
  for (const match of allMatches) {
    const docLength = text.length;
    const from = Math.max(0, Math.min(match.from, docLength));
    const to = Math.max(from, Math.min(match.to, docLength));

    if (from === to) continue;

    try {
      if (match.block) {
        // 块级装饰：为对应行添加类
        const startLine = view.state.doc.lineAt(from).number;
        const endLine = view.state.doc.lineAt(to).number;
        for (let lineNum = startLine; lineNum <= endLine; lineNum++) {
          const line = view.state.doc.line(lineNum);
          builder.add(
            line.from,
            line.from,
            Decoration.line({ class: match.cssClass })
          );
        }
      } else {
        // 标记装饰（资源引用附带序号角标数据）
        builder.add(
          from,
          to,
          Decoration.mark({
            class: match.cssClass,
            attributes: match.refIndex ? { 'data-ref': match.refIndex } : undefined,
          })
        );
      }
    } catch {
      // 跳过无效范围（行号越界等）
      continue;
    }
  }

  return builder.finish();
}

/**
 * 创建编辑器高亮 ViewPlugin
 * CodeMirror 6 内部已有高效的装饰差分机制，直接在 update 中重建即可
 */
function createHighlightPlugin(
  settings: PromptColorizerSettings,
  matcher: RuleMatcher | null
) {
  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = buildDecorations(view, matcher, settings);
      }

      update(update: ViewUpdate) {
        // 仅在文档内容变更或视口变更时重建
        // 移除 selectionSet 触发，避免光标移动导致不必要的重建
        if (update.docChanged || update.viewportChanged) {
          this.decorations = buildDecorations(update.view, matcher, settings);
        }
      }
    },
    {
      decorations: (v) => v.decorations,
    }
  );
}

/**
 * 创建编辑器扩展
 * @param settings 插件设置
 * @param matcher 规则匹配器（可为 null，表示无规则可用）
 * @returns CodeMirror 6 Extension 数组
 */
export function createEditorExtension(
  settings: PromptColorizerSettings,
  matcher: RuleMatcher | null = null
): Extension[] {
  const extensions: Extension[] = [];

  if (settings.editorHighlightEnabled) {
    // 高亮插件（使用 high precedence 确保覆盖默认样式）
    extensions.push(Prec.high(createHighlightPlugin(settings, matcher)));
  }

  return extensions;
}
