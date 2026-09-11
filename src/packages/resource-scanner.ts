/**
 * 资源状态扫描与归类（v5 包管理模块）
 *
 * 引用判定规则：扫描全部包（无论启用与否），任意包索引包含该 ID 即判定已引用。
 * 四种资源状态：✅活跃 / 🗂️闲置 / ⚠️失效（引用丢失）/ 🔒锁定。
 * 启发式分类推荐仅作用于「未分类」资源，不覆盖用户手动设置，不修改锁定状态。
 */

import type { ResourceStatus, CustomTextColor } from '../types';
import { RULE_CATEGORIES, TOKEN_CATEGORIES } from '../types';
import type PromptColorizer from '../../main';

/** 统一资源条目（令牌与规则共用形态） */
export interface ResourceEntry {
  /** 资源种类 */
  kind: 'token' | 'rule';
  /** 资源 ID（customTextColors[].id 或规则 yaml key） */
  id: string;
  /** 显示名称（令牌 = 匹配文本，规则 = 规则 ID） */
  name: string;
  /** 渲染 CSS 类（dsl-custom-text-{id} / dsl-xxx） */
  cssClass: string;
  /** 资源分类（缺省「未分类」） */
  category: string;
  /** 锁定保护标记 */
  resourceLock: boolean;
  /** 用途备注 */
  note: string;
  /** 四态状态 */
  status: ResourceStatus;
  /** 引用来源包目录名列表 */
  refPackages: string[];
  /** 令牌额外信息：颜色 */
  color?: string;
  /** 令牌额外信息：启用状态 */
  enabled?: boolean;
}

/** 分类关键词 → 分类名启发映射（按需增量补充） */
const CATEGORY_HINTS: Array<{ keywords: string[]; category: string; kind: 'token' | 'rule' | 'both' }> = [
  { keywords: ['角色', '人物', '主角', 'speaker'], category: '角色名称', kind: 'token' },
  { keywords: ['台词', '对话', '对白', 'dialogue'], category: '台词对话', kind: 'token' },
  { keywords: ['场景', '环境', 'scene', '地点'], category: '场景环境', kind: 'token' },
  { keywords: ['独白', '内心', '心理'], category: '内心独白', kind: 'token' },
  { keywords: ['旁白', '叙事', 'narration'], category: '旁白叙事', kind: 'both' },
  { keywords: ['指令', '系统', '命令', 'instruction', 'system'], category: '系统指令', kind: 'token' },
  { keywords: ['注释', '备注', '标记', 'comment', 'note'], category: '备注标记', kind: 'both' },
  { keywords: ['包裹', '区间', '大括号', '小括号', '括号', 'bracket', 'paren'], category: '旁白包裹', kind: 'rule' },
  { keywords: ['参数', '权重', 'param', 'weight'], category: '参数块', kind: 'rule' },
];

/** 启发式推荐分类（仅当当前分类为空/未分类时给出） */
export function suggestCategory(kind: 'token' | 'rule', name: string, note: string): string | null {
  const haystack = `${name} ${note}`.toLowerCase();
  for (const hint of CATEGORY_HINTS) {
    if (hint.kind !== 'both' && hint.kind !== kind) continue;
    if (hint.keywords.some((k) => haystack.includes(k.toLowerCase()))) return hint.category;
  }
  return null;
}

/** 令牌是否属于未分类 */
export function isUncategorizedToken(c: CustomTextColor): boolean {
  return isUncategorizedCategory('token', c.category);
}

/** 规则是否属于未分类 */
export function isUncategorizedRule(category: string | undefined): boolean {
  return isUncategorizedCategory('rule', category);
}

/** 按资源种类判断分类是否未分类 */
export function isUncategorizedCategory(kind: 'token' | 'rule', category: string | undefined): boolean {
  const pool: readonly string[] = kind === 'token' ? TOKEN_CATEGORIES : RULE_CATEGORIES;
  return !category || category === '未分类' || !pool.includes(category);
}

/**
 * 扫描全部资源条目（令牌 + 规则 + 失效引用）
 * 供导图包树 / 分类视图 / 清理工具共用。
 */
export function scanResourceEntries(plugin: PromptColorizer): ResourceEntry[] {
  const entries: ResourceEntry[] = [];
  const packages = plugin.loadedPackages ?? [];
  const allRefs = plugin.pkgManager?.collectAllRefIds(packages) ?? { tokenIds: new Set<string>(), ruleIds: new Set<string>() };

  // 引用来源映射：资源 ID → 引用它的包目录名列表
  const tokenRefPkgs = new Map<string, string[]>();
  const ruleRefPkgs = new Map<string, string[]>();
  for (const pkg of packages) {
    for (const id of pkg.refTokenIds ?? []) {
      const arr = tokenRefPkgs.get(id) ?? (tokenRefPkgs.set(id, []), tokenRefPkgs.get(id) as string[]);
      arr.push(pkg.dirName);
    }
    for (const id of pkg.refRuleIds ?? []) {
      const arr = ruleRefPkgs.get(id) ?? (ruleRefPkgs.set(id, []), ruleRefPkgs.get(id) as string[]);
      arr.push(pkg.dirName);
    }
  }

  // 1. 令牌本体（customTextColors）
  for (const c of plugin.settings.customTextColors ?? []) {
    const refPackages = tokenRefPkgs.get(c.id) ?? [];
    const status: ResourceStatus = c.resourceLock
      ? 'locked'
      : refPackages.length > 0
        ? 'active'
        : 'idle';
    entries.push({
      kind: 'token',
      id: c.id,
      name: c.text || c.id,
      cssClass: `dsl-custom-text-${c.id}`,
      category: c.category ?? '未分类',
      resourceLock: !!c.resourceLock,
      note: c.note ?? '',
      status,
      refPackages,
      color: c.color,
      enabled: c.enabled,
    });
    tokenRefPkgs.delete(c.id);
  }

  // 2. 失效令牌引用（包索引记录但本体不存在）
  for (const [id, refPackages] of tokenRefPkgs) {
    entries.push({
      kind: 'token',
      id,
      name: id,
      cssClass: `dsl-custom-text-${id}`,
      category: '未分类',
      resourceLock: false,
      note: '',
      status: 'missing',
      refPackages,
    });
  }

  // 3. 规则本体（规则集内的 DSL 规则）
  const ruleMeta = plugin.settings.ruleMeta ?? {};
  for (const r of plugin.currentRuleSet?.rules ?? []) {
    if (!r?.id) continue;
    const meta = ruleMeta[r.id] ?? {};
    const refPackages = ruleRefPkgs.get(r.id) ?? [];
    const status: ResourceStatus = meta.resourceLock
      ? 'locked'
      : refPackages.length > 0
        ? 'active'
        : 'idle';
    entries.push({
      kind: 'rule',
      id: r.id,
      name: r.id,
      cssClass: r.cssClass,
      category: meta.category ?? '未分类',
      resourceLock: !!meta.resourceLock,
      note: meta.note ?? '',
      status,
      refPackages,
    });
    ruleRefPkgs.delete(r.id);
  }

  // 4. 失效规则引用
  for (const [id, refPackages] of ruleRefPkgs) {
    entries.push({
      kind: 'rule',
      id,
      name: id,
      cssClass: '',
      category: '未分类',
      resourceLock: false,
      note: '',
      status: 'missing',
      refPackages,
    });
  }

  return entries;
}

/** 清理候选筛选：闲置（未被任何包引用）且未锁定 */
export function filterCleanable(entries: ResourceEntry[]): ResourceEntry[] {
  return entries.filter((e) => e.status === 'idle');
}
