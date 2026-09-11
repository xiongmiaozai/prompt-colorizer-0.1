/**
 * 词汇令牌体系 — 三层结构
 *
 * 大类（Category）→ 词汇令牌组（VocabTokenGroup）→ 词汇（words）
 *
 * 概念界定（用户口径）：
 * - 规则（rules）= 特殊符号类匹配（结构符号、Markdown 符号、技术符号）
 * - 令牌（tokens）= 词汇类匹配，按「大类 → 令牌组 → 词汇」三层组织，
 *   在设置面板「颜色管理」中层次化管理
 *
 * 词汇来源：
 * - 内置：词典（lexicons）/词组词典（wordLexiconGroups）编译产物
 * - 自定义：settings.vocabCustomWords 用户追加的词汇
 */

import type { RuleSet } from './types';

/** 词汇令牌分组定义 */
export interface VocabTokenGroup {
  /** 令牌唯一 ID（用于设置存储 vocabTokenEnabled / vocabColors / vocabCustomWords） */
  id: string;
  /** 令牌名称 i18n key */
  nameKey: string;
  /** 令牌描述 i18n key */
  descKey: string;
  /** 该令牌包含的 CSS 类（词典/词组/词汇正则产生的匹配类） */
  cssClasses: string[];
}

/** 词汇大类定义 */
export interface VocabCategory {
  /** 大类唯一 ID */
  id: string;
  /** 大类名称 i18n key */
  nameKey: string;
  /** 大类描述 i18n key */
  descKey: string;
  /** 所属令牌组 ID 列表 */
  groups: string[];
}

/** 词汇令牌运行时信息（供设置面板渲染） */
export interface VocabTokenInfo {
  /** 令牌 ID */
  id: string;
  /** 显示名称（已本地化） */
  name: string;
  /** 描述（已本地化） */
  desc: string;
  /** 所属大类 ID */
  categoryId: string;
  /** 包含的 CSS 类 */
  cssClasses: string[];
  /** 当前生效色（自定义 > 默认） */
  color: string;
  /** 默认色（来自 styleRule 解析） */
  defaultColor: string;
  /** 启用状态 */
  enabled: boolean;
  /** 词汇量（内置 + 自定义） */
  wordCount: number;
  /** 内置词汇量 */
  builtinCount: number;
  /** 自定义词汇量 */
  customCount: number;
}

/** 词汇大类运行时信息 */
export interface VocabCategoryInfo {
  id: string;
  name: string;
  desc: string;
  /** 子令牌 ID 列表 */
  tokenIds: string[];
}

// ============================================================
// 定义区：10 令牌组 → 5 大类
// ============================================================

/** 词汇令牌分组（按语义领域聚合） */
export const VOCAB_TOKEN_GROUPS: VocabTokenGroup[] = [
  {
    id: 'camera',
    nameKey: 'vocabToken.camera',
    descKey: 'vocabToken.cameraDesc',
    cssClasses: [
      'dsl-camera-word',
      'dsl-scene-transition',
      'dsl-lexicon-shot-size',
      'dsl-lexicon-camera-fixed',
      'dsl-lexicon-blocking',
      'dsl-lexicon-focal-length',
      'dsl-lexicon-performance',
      'dsl-camera-action',
    ],
  },
  {
    id: 'light',
    nameKey: 'vocabToken.light',
    descKey: 'vocabToken.lightDesc',
    cssClasses: ['dsl-light-word', 'dsl-color-term'],
  },
  {
    id: 'emotion',
    nameKey: 'vocabToken.emotion',
    descKey: 'vocabToken.emotionDesc',
    cssClasses: [
      'dsl-emotion-word',
      'dsl-lexicon-avatar-emotion',
      'dsl-lexicon-avatar-gesture',
      'dsl-lexicon-tts-emotion',
    ],
  },
  {
    id: 'photography',
    nameKey: 'vocabToken.photography',
    descKey: 'vocabToken.photographyDesc',
    cssClasses: [
      'dsl-photography-term',
      'dsl-composition-term',
      'dsl-art-style',
      'dsl-lexicon-interior-style',
      'dsl-lexicon-logo-style',
    ],
  },
  {
    id: 'audio',
    nameKey: 'vocabToken.audio',
    descKey: 'vocabToken.audioDesc',
    cssClasses: ['dsl-music-audio-term', 'dsl-lexicon-music-structure'],
  },
  {
    id: 'quality',
    nameKey: 'vocabToken.quality',
    descKey: 'vocabToken.qualityDesc',
    cssClasses: ['dsl-quality-tag', 'dsl-quality-tag-ext', 'dsl-negative-tag', 'dsl-sd-image-term'],
  },
  {
    id: 'tech',
    nameKey: 'vocabToken.tech',
    descKey: 'vocabToken.techDesc',
    cssClasses: ['dsl-ai-ml-term', 'dsl-programming-term', 'dsl-data-science-term'],
  },
  {
    id: 'design',
    nameKey: 'vocabToken.design',
    descKey: 'vocabToken.designDesc',
    cssClasses: ['dsl-ui-ux-term', 'dsl-cg-term', 'dsl-vfx-term', 'dsl-motion-term', 'dsl-game-dev-term'],
  },
  {
    id: 'narrative',
    nameKey: 'vocabToken.narrative',
    descKey: 'vocabToken.narrativeDesc',
    cssClasses: ['dsl-narrative-term', 'dsl-marketing-term', 'dsl-cn-chapter'],
  },
  {
    id: 'domains',
    nameKey: 'vocabToken.domains',
    descKey: 'vocabToken.domainsDesc',
    cssClasses: [
      'dsl-medical-term',
      'dsl-legal-term',
      'dsl-finance-term',
      'dsl-architecture-term',
      'dsl-fashion-term',
      'dsl-food-term',
      'dsl-physics-term',
      'dsl-chemistry-term',
      'dsl-biology-term',
      'dsl-geography-term',
      'dsl-aerospace-term',
      'dsl-military-term',
      'dsl-sports-term',
      'dsl-agriculture-term',
      'dsl-education-term',
      'dsl-psychology-term',
      'dsl-ecommerce-term',
    ],
  },
];

/** 五大词汇大类 */
export const VOCAB_CATEGORIES: VocabCategory[] = [
  {
    id: 'visual',
    nameKey: 'vocabCategory.visual',
    descKey: 'vocabCategory.visualDesc',
    groups: ['camera', 'light', 'photography'],
  },
  {
    id: 'performance',
    nameKey: 'vocabCategory.performance',
    descKey: 'vocabCategory.performanceDesc',
    groups: ['emotion', 'audio', 'narrative'],
  },
  {
    id: 'output',
    nameKey: 'vocabCategory.output',
    descKey: 'vocabCategory.outputDesc',
    groups: ['quality'],
  },
  {
    id: 'tech',
    nameKey: 'vocabCategory.tech',
    descKey: 'vocabCategory.techDesc',
    groups: ['tech', 'design'],
  },
  {
    id: 'domains',
    nameKey: 'vocabCategory.domains',
    descKey: 'vocabCategory.domainsDesc',
    groups: ['domains'],
  },
];

// ============================================================
// 映射区
// ============================================================

/** 令牌组 ID → 定义 */
export const TOKEN_GROUP_BY_ID: Record<string, VocabTokenGroup> = Object.fromEntries(
  VOCAB_TOKEN_GROUPS.map((g) => [g.id, g])
);

/** 大类 ID → 定义 */
export const CATEGORY_BY_ID: Record<string, VocabCategory> = Object.fromEntries(
  VOCAB_CATEGORIES.map((c) => [c.id, c])
);

/** 令牌组 ID → 所属大类 ID */
export const TOKEN_TO_CATEGORY: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const cat of VOCAB_CATEGORIES) {
    for (const gid of cat.groups) map[gid] = cat.id;
  }
  return map;
})();

/** CSS 类 → 所属词汇令牌 ID（反向映射，用于匹配结果过滤） */
export const VOCAB_CLASS_TO_TOKEN: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const group of VOCAB_TOKEN_GROUPS) {
    for (const cls of group.cssClasses) {
      if (!(cls in map)) map[cls] = group.id;
    }
  }
  return map;
})();

/** 所有词汇令牌 ID */
export const VOCAB_TOKEN_IDS: string[] = VOCAB_TOKEN_GROUPS.map((g) => g.id);

/** 判断 cssClass 是否属于词汇令牌体系 */
export function isVocabClass(cssClass: string): boolean {
  return cssClass in VOCAB_CLASS_TO_TOKEN;
}

// ============================================================
// 数据提取区
// ============================================================

/**
 * 提取指定令牌组的内置词汇列表（去重、排序）
 * 来源：词典 words + 词组词典 wordSet
 */
export function getVocabWords(
  ruleSet: RuleSet | null,
  tokenId: string
): string[] {
  const group = TOKEN_GROUP_BY_ID[tokenId];
  if (!group || !ruleSet) return [];
  const classSet = new Set(group.cssClasses);
  const words = new Set<string>();

  for (const lex of ruleSet.lexicons ?? []) {
    if (classSet.has(lex.cssClass) && lex.words) {
      for (const w of lex.words) words.add(w);
    }
  }
  for (const wg of ruleSet.wordLexiconGroups ?? []) {
    if (classSet.has(wg.cssClass)) {
      for (const w of wg.wordSet) words.add(w);
    }
  }

  return [...words].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

/**
 * 统计每个词汇令牌的词汇量（内置 + 自定义）
 * @returns tokenId → 词汇数
 */
export function countVocabWords(
  ruleSet: RuleSet | null,
  customWords?: Record<string, string[]>
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const g of VOCAB_TOKEN_GROUPS) {
    counts[g.id] = getVocabWords(ruleSet, g.id).length + (customWords?.[g.id]?.length ?? 0);
  }
  return counts;
}
