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

  // 构建启用的规则 ID 集合
  let enabledIds: Set<string> | null = null;
  if (settings.enabledRuleIds && settings.enabledRuleIds.length > 0) {
    enabledIds = new Set(settings.enabledRuleIds);
  }

  // 设置上下文和词典开关
  matcher.setContextEnabled(settings.contextSemanticEnabled);
  matcher.setLexiconEnabled(settings.lexiconEnabled);

  // 执行主匹配（patterns + lexicons，已按 from 升序、去重）
  const matches = matcher.match(text, enabledIds);

  // 组合规则补充识别：对未被 patterns/lexicons 覆盖的中文段应用结构化判断
  // 仅处理主匹配遗留空隙中的连续中文段，不与已着色段重叠
  const comboMatches = applyCombinationRulesToUnmatched(text, matches, matcher);

  // 自定义文本颜色匹配（优先级最高，覆盖 DSL 规则；不写入 md 文件）
  // 在内存中按文本内容匹配，颜色数据仅保存在插件本地
  const customMatches = matchCustomTextColors(
    text,
    settings.customTextColors ?? [],
    settings.customTextColorsEnabled !== false
  );

  // 合并所有匹配结果
  // - 自定义颜色区间与 DSL/组合规则区间重叠时，保留自定义颜色（优先级最高）
  // - 过滤掉与自定义颜色重叠的 DSL/组合规则匹配，避免 RangeSetBuilder 装饰冲突
  let allMatches: RuleMatchResult[];
  if (customMatches.length > 0) {
    const filteredMatches = matches.filter(
      (m) => !overlapsCustomColor(m.from, m.to, customMatches)
    );
    const filteredCombo = comboMatches.filter(
      (m) => !overlapsCustomColor(m.from, m.to, customMatches)
    );
    allMatches = [...filteredMatches, ...filteredCombo, ...customMatches].sort(
      (a, b) => a.from - b.from
    );
  } else if (comboMatches.length > 0) {
    allMatches = [...matches, ...comboMatches].sort((a, b) => a.from - b.from);
  } else {
    allMatches = matches;
  }

  // 按 UI 开关过滤:对应开关关闭的规则不着色(v3 修复)
  // 无对应开关的规则(如组合规则补充层、自定义文本颜色)不过滤
  allMatches = allMatches.filter((m) => {
    const settingKey = CSS_TO_KEY[m.cssClass];
    if (!settingKey) return true;
    return (settings as any)[settingKey] !== false;
  });

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
        // 标记装饰
        builder.add(from, to, Decoration.mark({ class: match.cssClass }));
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
