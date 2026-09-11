/**
 * 颜色导图分组定义（v4）
 *
 * 将匹配结果的 CSS 类归入语义分区，供颜色导图面板分层渲染。
 * 归类链与 filterMatchesByToggles 的开关过滤优先级保持一致：
 *   1. dsl-custom-text- 前缀 → 自定义高亮
 *   2. VOCAB_CLASS_TO_TOKEN 反查 → 词汇令牌组 → 词汇大类
 *   3. 符号开关键反查（KEY_TO_CSS_CLASS）→ 基础/视频/SD 三区
 *   4. 兜底 → 其他内置规则（保证 YAML 新增规则永不漏类）
 *
 * 注意：dsl-camera-word / dsl-scene-transition / dsl-quality-tag 同时是
 * 符号开关键与词汇令牌类，开关过滤以词汇令牌优先，故归类也归入词汇区。
 */

import { KEY_TO_CSS_CLASS } from '../highlighter/rule-key-map';
import {
  VOCAB_TOKEN_GROUPS, TOKEN_GROUP_BY_ID, TOKEN_TO_CATEGORY,
  VOCAB_CLASS_TO_TOKEN,
} from '../rule-engine/vocab-tokens';

// 词汇令牌组映射再导出（颜色导图面板使用）
export { TOKEN_GROUP_BY_ID };

/** 分区 ID（渲染顺序即数组顺序） */
export type ColorMapSectionId =
  | 'custom'      // 自定义高亮
  | 'basic'       // 符号·基础模式
  | 'video'       // 符号·视频提示词
  | 'sd'          // 符号·SD 扩展
  | 'vocab-visual'    // 词汇·视觉
  | 'vocab-performance' // 词汇·表演
  | 'vocab-output'   // 词汇·输出质量
  | 'vocab-tech'     // 词汇·技术
  | 'vocab-domains'  // 词汇·行业领域
  | 'other';     // 其他内置规则

/** 分区定义 */
export interface ColorMapSection {
  id: ColorMapSectionId;
  /** 分区名 i18n key */
  nameKey: string;
  /** 图标（Obsidian lucide 图标名） */
  icon: string;
  /** 词汇大类 ID（仅词汇分区有值，用于令牌子层渲染） */
  vocabCategoryId: string | null;
}

/** 全部分区（固定语义顺序） */
export const COLOR_MAP_SECTIONS: ColorMapSection[] = [
  { id: 'custom', nameKey: 'colorMap.sectionCustom', icon: 'paintbrush', vocabCategoryId: null },
  { id: 'basic', nameKey: 'colorMap.sectionBasic', icon: 'braces', vocabCategoryId: null },
  { id: 'video', nameKey: 'colorMap.sectionVideo', icon: 'film', vocabCategoryId: null },
  { id: 'sd', nameKey: 'colorMap.sectionSd', icon: 'sparkles', vocabCategoryId: null },
  { id: 'vocab-visual', nameKey: 'vocabCategory.visual', icon: 'palette', vocabCategoryId: 'visual' },
  { id: 'vocab-performance', nameKey: 'vocabCategory.performance', icon: 'drama', vocabCategoryId: 'performance' },
  { id: 'vocab-output', nameKey: 'vocabCategory.output', icon: 'badge-check', vocabCategoryId: 'output' },
  { id: 'vocab-tech', nameKey: 'vocabCategory.tech', icon: 'cpu', vocabCategoryId: 'tech' },
  { id: 'vocab-domains', nameKey: 'vocabCategory.domains', icon: 'globe', vocabCategoryId: 'domains' },
  { id: 'other', nameKey: 'colorMap.sectionOther', icon: 'box', vocabCategoryId: null },
];

/** 分区 ID → 定义 */
export const SECTION_BY_ID: Record<string, ColorMapSection> = Object.fromEntries(
  COLOR_MAP_SECTIONS.map((s) => [s.id, s])
);

/** 符号开关键 → 分区 ID（基础/视频/SD 三区） */
const SYMBOL_KEY_SECTION: Record<string, ColorMapSectionId> = (() => {
  const map: Record<string, ColorMapSectionId> = {};
  const assign = (keys: readonly string[], section: ColorMapSectionId) => {
    for (const k of keys) map[k] = section;
  };
  assign(
    ['highlightVariables', 'highlightRoleTags', 'highlightRoleHeaders', 'highlightInstructionMarkers',
      'highlightComments', 'highlightCodeBlocks', 'highlightJsonBlocks', 'highlightInlineCode'],
    'basic'
  );
  assign(
    ['highlightSectionMarkers', 'highlightShotHeaders', 'highlightAssetRefs', 'highlightFieldLabels',
      'highlightDialogue', 'highlightAudioRefs', 'highlightNegativePrompts', 'highlightTechParams',
      'highlightParentheticals'],
    'video'
  );
  assign(
    ['highlightEmphasisWeights', 'highlightLoraRefs', 'highlightBracketEmphasis',
      'highlightSdNegativeHeader'],
    'sd'
  );
  return map;
})();

/** CSS 类 → 符号开关键（反向映射，与 KEY_TO_CSS_CLASS 对应但含一键多类扩展） */
const SYMBOL_CLASS_TO_SECTION: Record<string, ColorMapSectionId> = (() => {
  const map: Record<string, ColorMapSectionId> = {};
  for (const [key, cssClass] of Object.entries(KEY_TO_CSS_CLASS)) {
    const section = SYMBOL_KEY_SECTION[key];
    if (section && !(cssClass in map)) map[cssClass] = section;
  }
  // 开关未在 KEY_TO_CSS_CLASS 登记的类（按规则集实际产出的 dsl 类补全）
  const extra: Record<string, ColorMapSectionId> = {
    // 基础模式（comments/codeBlocks/inlineCode/roleHeaders 开关对应的真实类）
    'dsl-md-comment': 'basic',
    'dsl-md-code-fence': 'basic',
    'dsl-md-inline-code': 'basic',
    'dsl-role-header': 'basic',
    // 视频模式（assetRefs 开关的方括号伴随类）
    'dsl-asset-bracket': 'video',
  };
  for (const [cls, sec] of Object.entries(extra)) {
    if (!(cls in map)) map[cls] = sec;
  }
  return map;
})();

/**
 * 归类单个 CSS 类 → { 分区 ID, 词汇令牌组 ID（仅词汇分区） }
 * 优先级与 filterMatchesByToggles 一致：词汇令牌 > 符号开关 > 兜底
 */
export function classifyCssClass(cssClass: string): {
  sectionId: ColorMapSectionId;
  tokenId: string | null;
} {
  if (cssClass.startsWith('dsl-custom-text-')) {
    return { sectionId: 'custom', tokenId: null };
  }
  const tokenId = VOCAB_CLASS_TO_TOKEN[cssClass];
  if (tokenId) {
    const categoryId = TOKEN_TO_CATEGORY[tokenId] ?? 'domains';
    switch (categoryId) {
      case 'visual': return { sectionId: 'vocab-visual', tokenId };
      case 'performance': return { sectionId: 'vocab-performance', tokenId };
      case 'output': return { sectionId: 'vocab-output', tokenId };
      case 'tech': return { sectionId: 'vocab-tech', tokenId };
      default: return { sectionId: 'vocab-domains', tokenId };
    }
  }
  const symbolSection = SYMBOL_CLASS_TO_SECTION[cssClass];
  if (symbolSection) {
    return { sectionId: symbolSection, tokenId: null };
  }
  return { sectionId: 'other', tokenId: null };
}

/**
 * 计算提示词包覆盖的 CSS 类集合（「只看激活包」过滤用）
 * 层1 enabledKeys 反查符号类 + 层2 vocabTokens 反查词汇类
 * 自定义类与兜底区不受包控制（返回 null 表示不过滤）
 */
export function computePackCoveredClasses(pack: {
  enabledKeys: string[];
  vocabTokens: string[];
} | null): Set<string> | null {
  if (!pack) return null;
  const set = new Set<string>();
  for (const key of pack.enabledKeys) {
    const cssClass = KEY_TO_CSS_CLASS[key];
    if (cssClass) set.add(cssClass);
  }
  for (const tokenId of pack.vocabTokens) {
    const group = TOKEN_GROUP_BY_ID[tokenId];
    if (group) {
      for (const cls of group.cssClasses) set.add(cls);
    }
  }
  return set;
}

/** 词汇分区 → 子令牌组列表（固定语义顺序） */
export function getTokenGroupsOfCategory(categoryId: string): typeof VOCAB_TOKEN_GROUPS {
  const cat = categoryId;
  return VOCAB_TOKEN_GROUPS.filter((g) => TOKEN_TO_CATEGORY[g.id] === cat);
}