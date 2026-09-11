/**
 * 规则匹配引擎
 * 执行编译后的规则集，支持上下文语义过滤和优先级冲突解决
 */

import type {
  RuleSet,
  CompiledRule,
  CompiledLexicon,
  RuleMatchResult,
  ContextRule,
  ColorToken,
  StyleRule,
  CharProperty,
  CompiledCombinationRule,
  CompiledWordLexiconGroup,
  SegmenterConfig,
} from './types';

/** 当前扫描状态 */
enum ScanState {
  Normal = 0,
  InQuoteDialogue = 1,
  InBlockWrapper = 2,
}

/** 区块上下文信息 */
interface BlockContext {
  /** 区块标记文本（如 【整体设定】） */
  marker: string;
  /** 区块在文档中的起始位置 */
  start: number;
  /** 区块结束位置（下一个区块开始处或文档末尾） */
  end: number;
  /** 允许的规则 ID 集合 */
  allowPatterns: Set<string>;
}

/**
 * 规则匹配引擎
 */
export class RuleMatcher {
  private ruleSet: RuleSet | null = null;
  /** 是否启用上下文语义过滤 */
  private contextEnabled: boolean = true;
  /** 是否启用词典精细化着色 */
  private lexiconEnabled: boolean = true;
  /** 包作用域（v5）：启用包引用的规则 ID 集合；null = 未启用任何包，回退全局开关 */
  private ruleIdScope: Set<string> | null = null;
  /** 包作用域（v5）：启用包引用的令牌 ID 集合；null = 未启用任何包，回退全局开关 */
  private tokenIdScope: Set<string> | null = null;

  /**
   * 设置当前规则集
   */
  setRuleSet(rs: RuleSet | null): void {
    this.ruleSet = rs;
  }

  /**
   * 设置包作用域规则 ID 集合（v5 包管理）
   * @param ids 启用包引用的规则 ID 并集；null/空 = 无包作用域，全部规则按全局开关参与
   */
  setRuleIdScope(ids: Set<string> | null): void {
    this.ruleIdScope = ids && ids.size > 0 ? ids : null;
  }

  /**
   * 获取当前包作用域（诊断/导图用）
   */
  getRuleIdScope(): Set<string> | null {
    return this.ruleIdScope;
  }

  /**
   * 设置包作用域令牌 ID 集合（v5 包管理）
   * @param ids 启用包引用的令牌 ID 并集；null/空 = 无包作用域，全部令牌按全局开关参与
   */
  setTokenIdScope(ids: Set<string> | null): void {
    this.tokenIdScope = ids && ids.size > 0 ? ids : null;
  }

  /**
   * 获取当前包作用域令牌集合（编辑器/阅读/导图三链路共用）
   */
  getTokenIdScope(): Set<string> | null {
    return this.tokenIdScope;
  }

  /**
   * 设置上下文过滤开关
   */
  setContextEnabled(enabled: boolean): void {
    this.contextEnabled = enabled;
  }

  /**
   * 设置词典开关
   */
  setLexiconEnabled(enabled: boolean): void {
    this.lexiconEnabled = enabled;
  }

  /**
   * 执行全量匹配
   * @param text 文档文本
   * @param enabledRuleIds 启用的规则 ID 集合（null 表示全部启用）
   * @returns 排序后的匹配结果数组
   */
  match(text: string, enabledRuleIds: Set<string> | null = null): RuleMatchResult[] {
    if (!this.ruleSet) return [];

    // v5 包作用域：与调用方 enabledRuleIds 取交集（包限制 ∩ 全局开关）
    let effectiveIds = enabledRuleIds;
    if (this.ruleIdScope) {
      if (!effectiveIds) {
        effectiveIds = this.ruleIdScope;
      } else {
        effectiveIds = new Set([...effectiveIds].filter((id) => this.ruleIdScope!.has(id)));
        if (effectiveIds.size === 0) return [];
      }
    }

    // 1. 解析区块上下文
    const blockContexts = this.parseBlockContexts(text);

    // 2. 执行正则规则匹配
    const results = this.matchPatterns(text, effectiveIds, blockContexts);

    // 3. 执行词典匹配（最高优先级）
    if (this.lexiconEnabled) {
      const lexResults = this.matchLexicons(text);
      results.push(...lexResults);
    }

    // 4. 按位置排序，同位置按优先级降序
    results.sort((a, b) => {
      if (a.from !== b.from) return a.from - b.from;
      // 同起始位置，优先级高的排前面
      return b.priority - a.priority;
    });

    // 5. 移除重叠区间（贪心算法，保留先出现的/高优先级的）
    const filtered = this.removeOverlaps(results);

    return filtered;
  }

  /**
   * 执行区间增量匹配(P1-8 增量匹配优化)
   * 仅返回与指定区间[from, to]相交的匹配结果
   * 用于 CodeMirror 6 视口/变更增量更新,避免对全文重算
   *
   * 注意:此方法仍对全文执行匹配(因为正则可能跨区间),
   * 但只返回与区间相交的结果,减少后续处理开销
   *
   * @param text 文档文本
   * @param rangeFrom 区间起始位置
   * @param rangeTo 区间结束位置
   * @param enabledRuleIds 启用的规则 ID 集合
   * @returns 与区间相交的匹配结果数组
   */
  matchRange(
    text: string,
    rangeFrom: number,
    rangeTo: number,
    enabledRuleIds: Set<string> | null = null
  ): RuleMatchResult[] {
    const all = this.match(text, enabledRuleIds);
    // 过滤出与区间相交的结果
    // 相交条件:match.from < rangeTo && match.to > rangeFrom
    return all.filter((m) => m.from < rangeTo && m.to > rangeFrom);
  }

  /**
   * 重置正则实例的 lastIndex(P1-8 正则池化)
   * 替代 new RegExp() 重建,减少 GC 压力
   * @param regex 待重置的正则实例
   */
  private resetRegex(regex: RegExp): RegExp {
    regex.lastIndex = 0;
    return regex;
  }

  /**
   * 解析文档中的区块上下文
   * 识别 【整体设定】【分镜设计】 等顶层区块，确定各区间的生效规则
   */
  private parseBlockContexts(text: string): BlockContext[] {
    if (!this.contextEnabled || this.ruleSet!.contextRules.length === 0) {
      return [];
    }

    const contexts: BlockContext[] = [];

    // 查找所有区块标记
    const blockRegex = /【([^】]+)】/g;
    const matches: { marker: string; index: number }[] = [];
    let m: RegExpExecArray | null;

    while ((m = blockRegex.exec(text)) !== null) {
      matches.push({ marker: m[0], index: m.index });
    }

    if (matches.length === 0) return [];

    // 为每个区块确定范围和允许的规则
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index;
      const end = i + 1 < matches.length ? matches[i + 1].index : text.length;

      // 查找该区块对应的上下文规则
      const ctxRule = this.ruleSet!.contextRules.find(
        (r) => r.blockMarker === matches[i].marker
      );

      if (ctxRule) {
        contexts.push({
          marker: matches[i].marker,
          start,
          end,
          allowPatterns: new Set(ctxRule.allowPatterns),
        });
      }
    }

    return contexts;
  }

  /**
   * 执行正则模式匹配
   */
  private matchPatterns(
    text: string,
    enabledRuleIds: Set<string> | null,
    blockContexts: BlockContext[]
  ): RuleMatchResult[] {
    const results: RuleMatchResult[] = [];

    for (const rule of this.ruleSet!.rules) {
      // 检查规则是否启用
      if (enabledRuleIds && !enabledRuleIds.has(rule.id)) continue;

      // P1-8 正则池化:重置 lastIndex 而非 new RegExp 重建,减少 GC 压力
      const regex = this.resetRegex(rule.regex);

      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        // 避免零宽匹配死循环
        if (match[0].length === 0) {
          regex.lastIndex++;
          continue;
        }

        const from = match.index;
        const to = match.index + match[0].length;

        // 上下文语义过滤：检查该位置是否在允许该规则的区块内
        if (this.contextEnabled && blockContexts.length > 0) {
          if (!this.isPatternAllowedInContext(rule.id, from, blockContexts)) {
            continue;
          }
        }

        const result: RuleMatchResult = {
          from,
          to,
          cssClass: rule.cssClass,
          priority: rule.priority,
          block: rule.blockLevel,
          ruleId: rule.id,
        };

        // 资源引用提取序号（如 @图1 的 "1"），供角标伪元素 attr(data-ref) 显示
        if (rule.cssClass === 'dsl-asset' && match[1]) {
          const numMatch = match[1].match(/\d+/);
          if (numMatch) result.refIndex = numMatch[0];
        }

        results.push(result);
      }
    }

    return results;
  }

  /**
   * 检查规则在指定位置是否被上下文允许
   */
  private isPatternAllowedInContext(
    ruleId: string,
    pos: number,
    contexts: BlockContext[]
  ): boolean {
    // 查找位置所在的区块
    const ctx = contexts.find((c) => pos >= c.start && pos < c.end);

    if (!ctx) {
      // 不在任何区块内，默认允许
      return true;
    }

    // 检查规则是否在该区块的允许列表中
    return ctx.allowPatterns.has(ruleId);
  }

  /**
   * 执行词典匹配
   */
  private matchLexicons(text: string): RuleMatchResult[] {
    const results: RuleMatchResult[] = [];

    for (const lex of this.ruleSet!.lexicons) {
      // P1-8 正则池化:重置 lastIndex 而非重建
      const regex = this.resetRegex(lex.regex);

      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        if (match[0].length === 0) {
          regex.lastIndex++;
          continue;
        }

        results.push({
          from: match.index,
          to: match.index + match[0].length,
          cssClass: lex.cssClass,
          priority: lex.priority,
          block: false,
          ruleId: `lexicon:${lex.category}`,
        });
      }
    }

    return results;
  }

  /**
   * 移除重叠区间
   * 贪心算法：按位置排序后，保留先出现的匹配（优先级已在排序时考虑）
   */
  private removeOverlaps(results: RuleMatchResult[]): RuleMatchResult[] {
    if (results.length === 0) return [];

    const filtered: RuleMatchResult[] = [];
    let lastEnd = -1;

    for (const r of results) {
      if (r.from >= lastEnd) {
        filtered.push(r);
        lastEnd = r.to;
      }
      // 如果新匹配完全包含在已选匹配内，跳过
      // 如果新匹配与已选匹配部分重叠，也跳过（保留先出现的）
    }

    return filtered;
  }

  /**
   * 获取当前规则集的所有规则 ID
   */
  getAllRuleIds(): string[] {
    if (!this.ruleSet) return [];
    return this.ruleSet.rules.map((r) => r.id);
  }

  /**
   * 获取当前规则集的版本信息
   */
  getVersion(): string {
    return this.ruleSet?.version ?? 'unknown';
  }

  /**
   * 获取词典类别列表
   */
  getLexiconCategories(): string[] {
    if (!this.ruleSet) return [];
    return this.ruleSet.lexicons.map((l) => l.category);
  }

  /**
   * 获取汉字词性词典（供组合规则补充识别使用）
   * @returns 词性词典 Map，规则集未加载时返回 null
   */
  getCharLexicon(): Map<string, CharProperty> | null {
    if (!this.ruleSet) return null;
    return this.ruleSet.charLexicon;
  }

  /**
   * 获取编译后的组合规则（供组合规则补充识别使用）
   * @returns 组合规则数组（已按优先级降序），规则集未加载时返回空数组
   */
  getCombinationRules(): CompiledCombinationRule[] {
    if (!this.ruleSet) return [];
    return this.ruleSet.combinationRules;
  }

  /**
   * 获取编译后的词组词典分组（供分词器使用，v2.6.0 新增）
   * @returns 词组词典分组数组（已按优先级降序），规则集未加载时返回空数组
   */
  getWordLexiconGroups(): CompiledWordLexiconGroup[] {
    if (!this.ruleSet) return [];
    return this.ruleSet.wordLexiconGroups;
  }

  /**
   * 获取分词器配置（v2.6.0 新增）
   * @returns 分词器配置，规则集未加载时返回默认配置
   */
  getSegmenterConfig(): SegmenterConfig {
    return this.ruleSet?.segmenterConfig ?? { maxWordLength: 6, minWordLength: 2 };
  }

  /**
   * 获取当前所有颜色令牌定义
   * 用于设置面板动态渲染颜色自定义列表
   */
  getColorTokens(): Record<string, ColorToken> {
    if (!this.ruleSet) return {};
    return this.ruleSet.colorTokens ?? {};
  }

  /**
   * 获取当前所有样式规则
   * 用于设置面板显示规则颜色预览
   */
  getStyleRules(): Record<string, StyleRule> {
    if (!this.ruleSet) return {};
    return this.ruleSet.styleRules ?? {};
  }

  /**
   * 根据 CSS 类名获取其颜色值
   * 用于设置面板中高亮规则的颜色预览圆点
   * @param cssClass CSS 类名（如 dsl-block-wrapper）
   * @returns CSS 变量引用（如 var(--dsl-purple)），找不到时返回空字符串
   */
  getColorByCssClass(cssClass: string): string {
    if (!this.ruleSet) return '';
    const style = this.ruleSet.styleRules?.[cssClass];
    if (!style || !style.color) return '';
    // 使用编译器的 resolveColorReference 解析令牌引用
    // 但这里我们直接返回 var() 引用，因为设置面板只需要展示颜色
    const colorTokens = this.ruleSet.colorTokens ?? {};
    const trimmed = style.color.trim();

    // 纯令牌引用
    const pureMatch = trimmed.match(/^([a-zA-Z_][\w-]*)$/);
    if (pureMatch && colorTokens[pureMatch[1]]) {
      return `var(--dsl-${pureMatch[1]})`;
    }

    // 带修饰的令牌引用
    const modMatch = trimmed.match(/^([a-zA-Z_][\w-]*)\.(soft|border)$/);
    if (modMatch && colorTokens[modMatch[1]]) {
      return `var(--dsl-${modMatch[1]}-${modMatch[2]})`;
    }

    // 已经是 var() 或 hex 色 → 原样返回
    return trimmed;
  }
}
