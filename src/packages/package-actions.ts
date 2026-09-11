/**
 * 包与资源操作动作（v5 包管理模块）
 *
 * UI（导图右键菜单/按钮）与数据层的中间层：
 * 全部动作完成后 saveSettings + reloadPackages + 广播导图刷新事件。
 */

import { Notice } from 'obsidian';
import type { LoadedPackage, PackageManifest, ResourceMeta } from '../types';
import { PACKAGE_SPEC_VERSION } from '../types';
import type PromptColorizer from '../../main';
import type { ResourceEntry } from './resource-scanner';
import { generateResourceIdSafe } from './pkg-utils';

/** 动作完成后的统一收尾：保存 + 重载包（含作用域同步）+ 刷新编辑器 + 广播 */
async function finalize(plugin: PromptColorizer, message?: string): Promise<void> {
  await plugin.saveSettings();
  await plugin.reloadPackages();
  plugin.refreshEditorExtensions();
  plugin.app.workspace.trigger('prompt-colorizer:custom-colors-changed');
  if (message) new Notice(message);
}

/** 切换包启用勾选（单选模式自动取消其他包） */
export async function togglePackageEnabled(plugin: PromptColorizer, dirName: string): Promise<void> {
  const s = plugin.settings;
  const enabled = new Set(s.enabledPackageIds ?? []);
  if (s.packageMode === 'single') {
    // 单选：勾选一个自动取消其他；再次点击取消全部
    s.enabledPackageIds = enabled.has(dirName) ? [] : [dirName];
  } else {
    if (enabled.has(dirName)) enabled.delete(dirName);
    else enabled.add(dirName);
    s.enabledPackageIds = [...enabled];
  }
  await finalize(plugin);
}

/** 切换单选/叠加模式 */
export async function setPackageMode(plugin: PromptColorizer, mode: 'single' | 'multi'): Promise<void> {
  plugin.settings.packageMode = mode;
  await finalize(plugin);
}

/** 移动包显示顺序（叠加模式优先级；offset -1 上移 / +1 下移） */
export async function movePackageOrder(plugin: PromptColorizer, dirName: string, offset: number): Promise<void> {
  const s = plugin.settings;
  const order = [...(s.packageOrder ?? [])];
  // 未在序列中的包先补齐
  for (const p of plugin.loadedPackages) {
    if (!order.includes(p.dirName)) order.push(p.dirName);
  }
  const idx = order.indexOf(dirName);
  const target = idx + offset;
  if (idx < 0 || target < 0 || target >= order.length) return;
  order.splice(idx, 1);
  order.splice(target, 0, dirName);
  s.packageOrder = order;
  await finalize(plugin);
}

/** 重命名包（写 manifest.name；目录名与 packageId 不变） */
export async function renamePackage(plugin: PromptColorizer, pkg: LoadedPackage, newName: string): Promise<void> {
  if (!pkg.manifest || pkg.isBuiltin) return;
  pkg.manifest.name = newName;
  await plugin.pkgManager.writePackage(
    pkg.dirName,
    pkg.manifest,
    pkg.refTokenIds ?? [],
    pkg.refRuleIds ?? []
  );
  await finalize(plugin, '包已重命名');
}

/** 复制包（轻量：共享引用，仅复制目录与索引文件） */
export async function copyPackage(plugin: PromptColorizer, pkg: LoadedPackage): Promise<void> {
  const newDirName = await findFreeDirName(plugin, `${pkg.dirName}_copy`);
  const manifest: PackageManifest = {
    ...(pkg.manifest ?? defaultManifest(newDirName)),
    packageId: newDirName,
    name: `${pkg.manifest?.name ?? pkg.dirName} 副本`,
    type: 'user',
    version: '1.0.0',
  };
  await plugin.pkgManager.createPackage(manifest, [...(pkg.refTokenIds ?? [])], [...(pkg.refRuleIds ?? [])]);
  await finalize(plugin, `已复制包「${pkg.manifest?.name ?? pkg.dirName}」（共享引用）`);
}

/** 克隆包（深度拷贝：令牌生成独立副本，规则共享引用；记录溯源元数据） */
export async function clonePackage(plugin: PromptColorizer, pkg: LoadedPackage): Promise<void> {
  const newDirName = await findFreeDirName(plugin, `${pkg.dirName}_clone`);
  const idMap: Record<string, string> = {};

  // 令牌深拷贝：新 ID + 溯源
  const clonedTokens = [];
  for (const tokenId of pkg.refTokenIds ?? []) {
    const src = plugin.settings.customTextColors.find((c) => c.id === tokenId);
    if (!src) continue;
    const newId = generateResourceIdSafe('token');
    idMap[newId] = tokenId;
    clonedTokens.push({ ...structuredClone(src), id: newId });
  }

  // 规则覆盖表按 ID 映射重写（令牌部分）；规则引用保持共享
  const oldManifest = pkg.manifest ?? defaultManifest(newDirName);
  const tokenOverrides: Record<string, unknown> = {};
  for (const [oldId, ov] of Object.entries(oldManifest.tokenOverrides ?? {})) {
    const newTok = clonedTokens.find((c) => idMap[c.id] === oldId);
    if (newTok) tokenOverrides[newTok.id] = ov;
  }

  const manifest: PackageManifest = {
    ...oldManifest,
    packageId: newDirName,
    name: `${oldManifest.name} 克隆`,
    type: 'user',
    version: '1.0.0',
    specVersion: PACKAGE_SPEC_VERSION,
    tokenOverrides: tokenOverrides as PackageManifest['tokenOverrides'],
    clonedFromPackageId: pkg.dirName,
    clonedFromResourceIds: idMap,
  };

  // 写入新令牌本体 + 新包目录
  plugin.settings.customTextColors.push(...clonedTokens);
  plugin.applyCustomTextColorsStyles();
  plugin.refreshEditorExtensions();
  await plugin.pkgManager.createPackage(manifest, clonedTokens.map((c) => c.id), [...(pkg.refRuleIds ?? [])]);
  await finalize(plugin, `已克隆包「${oldManifest.name}」（数据完全独立）`);
}

/** 删除包（仅删 packages/ 目录，不动资源本体；同步清理启用状态） */
export async function deletePackage(plugin: PromptColorizer, pkg: LoadedPackage): Promise<void> {
  if (pkg.isBuiltin) return;
  await plugin.pkgManager.deletePackage(pkg.dirName);
  plugin.settings.enabledPackageIds = (plugin.settings.enabledPackageIds ?? []).filter((id) => id !== pkg.dirName);
  plugin.settings.packageOrder = (plugin.settings.packageOrder ?? []).filter((id) => id !== pkg.dirName);
  await finalize(plugin, `已删除包「${pkg.manifest?.name ?? pkg.dirName}」（资源本体保留）`);
}

/** 修改资源分类（令牌写本体字段；规则写 ruleMeta 侧车） */
export async function setResourceCategory(plugin: PromptColorizer, entry: ResourceEntry, category: string): Promise<void> {
  if (entry.kind === 'token') {
    const token = plugin.settings.customTextColors.find((c) => c.id === entry.id);
    if (!token) return;
    token.category = category;
  } else {
    const meta = getRuleMeta(plugin, entry.id);
    meta.category = category;
    plugin.settings.ruleMeta[entry.id] = meta;
  }
  await finalize(plugin, `分类已更新为「${category}」`);
}

/** 标记/取消锁定（锁定仅阻止批量清理；手动删除仍可） */
export async function toggleResourceLock(plugin: PromptColorizer, entry: ResourceEntry): Promise<void> {
  if (entry.kind === 'token') {
    const token = plugin.settings.customTextColors.find((c) => c.id === entry.id);
    if (!token) return;
    token.resourceLock = !entry.resourceLock;
  } else {
    const meta = getRuleMeta(plugin, entry.id);
    meta.resourceLock = !entry.resourceLock;
    plugin.settings.ruleMeta[entry.id] = meta;
  }
  await finalize(plugin, entry.resourceLock ? '已取消锁定' : '已锁定保护');
}

/** 添加资源引用到指定包 */
export async function addRefToPackage(plugin: PromptColorizer, entry: ResourceEntry, dirName: string): Promise<void> {
  const pkg = plugin.loadedPackages.find((p) => p.dirName === dirName);
  if (!pkg || !pkg.manifest || pkg.isBuiltin) return;
  if (entry.kind === 'token') {
    if ((pkg.refTokenIds ?? []).includes(entry.id)) return;
    pkg.refTokenIds = [...(pkg.refTokenIds ?? []), entry.id];
  } else {
    if ((pkg.refRuleIds ?? []).includes(entry.id)) return;
    pkg.refRuleIds = [...(pkg.refRuleIds ?? []), entry.id];
  }
  await plugin.pkgManager.writePackage(pkg.dirName, pkg.manifest, pkg.refTokenIds ?? [], pkg.refRuleIds ?? []);
  await finalize(plugin, `已添加到包「${pkg.manifest.name}」`);
}

/** 从所有包移除该资源的引用（不删除资源本体） */
export async function removeRefFromAllPackages(plugin: PromptColorizer, entry: ResourceEntry): Promise<void> {
  for (const pkg of plugin.loadedPackages) {
    if (!pkg.manifest || pkg.isBuiltin) continue;
    const beforeT = pkg.refTokenIds?.length ?? 0;
    const beforeR = pkg.refRuleIds?.length ?? 0;
    if (entry.kind === 'token') {
      pkg.refTokenIds = (pkg.refTokenIds ?? []).filter((id) => id !== entry.id);
    } else {
      pkg.refRuleIds = (pkg.refRuleIds ?? []).filter((id) => id !== entry.id);
    }
    if ((pkg.refTokenIds?.length ?? 0) !== beforeT || (pkg.refRuleIds?.length ?? 0) !== beforeR) {
      await plugin.pkgManager.writePackage(pkg.dirName, pkg.manifest, pkg.refTokenIds ?? [], pkg.refRuleIds ?? []);
    }
  }
  await finalize(plugin, '已从所有包移除引用');
}

/** 删除资源本体（仅令牌；规则本体在 YAML 中只读不提供删除） */
export async function deleteResourceToken(plugin: PromptColorizer, entry: ResourceEntry): Promise<void> {
  await deleteResourceTokens(plugin, [entry]);
}

/** 批量删除令牌资源本体（单次保存+重载；规则本体只读不可删） */
export async function deleteResourceTokens(plugin: PromptColorizer, entries: ResourceEntry[]): Promise<void> {
  const ids = new Set(entries.filter((e) => e.kind === 'token').map((e) => e.id));
  if (ids.size === 0) return;
  const before = plugin.settings.customTextColors.length;
  plugin.settings.customTextColors = plugin.settings.customTextColors.filter((c) => !ids.has(c.id));
  if (plugin.settings.customTextColors.length === before) return;
  plugin.applyCustomTextColorsStyles();
  plugin.refreshEditorExtensions();
  await finalize(plugin, `已删除 ${ids.size} 个资源本体`);
}

/** 一键修复失效引用：移除包内无效 ID（不删除资源本体） */
export async function removeInvalidRefsFromPackage(plugin: PromptColorizer, pkg: LoadedPackage): Promise<void> {
  const validTokenIds = new Set((plugin.settings.customTextColors ?? []).map((c) => c.id));
  const validRuleIds = new Set((plugin.currentRuleSet?.rules ?? []).map((r) => r.id));
  if (!pkg.manifest) return;
  const beforeT = pkg.refTokenIds?.length ?? 0;
  const beforeR = pkg.refRuleIds?.length ?? 0;
  pkg.refTokenIds = (pkg.refTokenIds ?? []).filter((id) => validTokenIds.has(id));
  pkg.refRuleIds = (pkg.refRuleIds ?? []).filter((id) => validRuleIds.has(id));
  const removed = beforeT - pkg.refTokenIds.length + beforeR - pkg.refRuleIds.length;
  if (removed === 0) return;
  await plugin.pkgManager.writePackage(pkg.dirName, pkg.manifest, pkg.refTokenIds, pkg.refRuleIds);
  await finalize(plugin, `已移除 ${removed} 个失效引用`);
}

/** 修改包覆盖样式（写 manifest 的 tokenOverrides/ruleOverrides 后落盘） */
export async function updatePackageOverrides(
  plugin: PromptColorizer,
  pkg: LoadedPackage,
  patch: { tokenOverrides?: PackageManifest['tokenOverrides']; ruleOverrides?: PackageManifest['ruleOverrides'] }
): Promise<void> {
  if (!pkg.manifest) return;
  if (patch.tokenOverrides) pkg.manifest.tokenOverrides = patch.tokenOverrides;
  if (patch.ruleOverrides) pkg.manifest.ruleOverrides = patch.ruleOverrides;
  await plugin.pkgManager.writePackage(pkg.dirName, pkg.manifest, pkg.refTokenIds ?? [], pkg.refRuleIds ?? []);
  await finalize(plugin);
}

/**
 * 切换包内单个资源引用（设置页包详情开关）：
 * 开 → 加入包索引；关 → 移出包索引。不改动资源本体。
 */
export async function toggleRefInPackage(
  plugin: PromptColorizer,
  dirName: string,
  kind: 'token' | 'rule',
  resourceId: string,
  inPackage: boolean
): Promise<void> {
  const pkg = plugin.loadedPackages.find((p) => p.dirName === dirName);
  if (!pkg || !pkg.manifest) return;
  if (kind === 'token') {
    const ids = new Set(pkg.refTokenIds ?? []);
    if (inPackage) ids.add(resourceId);
    else ids.delete(resourceId);
    pkg.refTokenIds = [...ids];
  } else {
    const ids = new Set(pkg.refRuleIds ?? []);
    if (inPackage) ids.add(resourceId);
    else ids.delete(resourceId);
    pkg.refRuleIds = [...ids];
  }
  await plugin.pkgManager.writePackage(pkg.dirName, pkg.manifest, pkg.refTokenIds ?? [], pkg.refRuleIds ?? []);
  await finalize(plugin);
}

/** 新建空用户包（设置页包 Tab） */
export async function createEmptyPackage(plugin: PromptColorizer, name: string): Promise<string> {
  const dirName = await findFreeDirName(plugin, sanitizeDir(name));
  const manifest: PackageManifest = {
    packageId: dirName,
    name,
    tagColor: '#7c8aff',
    description: '',
    version: '1.0.0',
    specVersion: PACKAGE_SPEC_VERSION,
    type: 'user',
    usageTag: '',
    previewSampleText: '',
    tokenOverrides: {},
    ruleOverrides: {},
  };
  await plugin.pkgManager.createPackage(manifest, [], []);
  await finalize(plugin, `已创建空包「${name}」`);
  return dirName;
}

/** 目录名清理（去除非法字符） */
function sanitizeDir(name: string): string {
  const cleaned = name.replace(/[\\/:*?"<>|#^[\]]/g, '_').trim();
  return cleaned.length > 0 ? cleaned : 'new_pack';
}

/** 应用启发式推荐分类（仅未分类资源；返回应用数量） */
export async function applySuggestedCategories(
  plugin: PromptColorizer,
  suggestions: Array<{ entry: ResourceEntry; category: string }>
): Promise<number> {
  for (const { entry, category } of suggestions) {
    if (entry.kind === 'token') {
      const token = plugin.settings.customTextColors.find((c) => c.id === entry.id);
      if (token) token.category = category;
    } else {
      const meta = getRuleMeta(plugin, entry.id);
      meta.category = category;
      plugin.settings.ruleMeta[entry.id] = meta;
    }
  }
  await finalize(plugin);
  return suggestions.length;
}

/** 获取规则侧车元数据（自动补默认值） */
export function getRuleMeta(plugin: PromptColorizer, ruleId: string): ResourceMeta & { category: string; resourceLock: boolean; note: string } {
  const meta = plugin.settings.ruleMeta?.[ruleId] ?? {};
  return { category: meta.category ?? '未分类', resourceLock: !!meta.resourceLock, note: meta.note ?? '' };
}

/**
 * 汇总整理包：将当前全部令牌与规则按包格式整理成一个包（main 包）。
 * - 令牌：settings.customTextColors 全部 ID（不区分启用状态）
 * - 规则：当前规则集全部 DSL 规则 ID（YAML 本体 + 已导入 customRules）
 * - 目录名 main 被占用时自动加后缀；已存在同内容 main 包则提示并跳过
 */
export async function consolidateAllResourcesIntoMainPackage(plugin: PromptColorizer): Promise<string> {
  const tokenIds = (plugin.settings.customTextColors ?? []).map((c) => c.id);
  const ruleIds = (plugin.currentRuleSet?.rules ?? []).map((r) => r.id);
  // 幂等：已有 main 汇总包 → 合并进现有索引，不新建 main_2/main_3
  const existing = plugin.loadedPackages.find(
    (p) => !p.isBuiltin && p.manifest && p.manifest.usageTag === '汇总整理'
  );
  if (existing && existing.manifest) {
    const mergedTokens = [...new Set([...(existing.refTokenIds ?? []), ...tokenIds])];
    const mergedRules = [...new Set([...(existing.refRuleIds ?? []), ...ruleIds])];
    await plugin.pkgManager.writePackage(existing.dirName, existing.manifest, mergedTokens, mergedRules);
    await finalize(plugin, `已更新 main 汇总包（令牌 ${mergedTokens.length} / 规则 ${mergedRules.length}）`);
    return existing.dirName;
  }
  const name = await findFreeDirName(plugin, 'main');
  const manifest: PackageManifest = {
    packageId: name,
    name: 'main 汇总包',
    tagColor: '#44AAFF',
    description: `全部现有令牌（${tokenIds.length}）与规则（${ruleIds.length}）按包格式整理的汇总引用包`,
    version: '1.0.0',
    specVersion: PACKAGE_SPEC_VERSION,
    type: 'user',
    usageTag: '汇总整理',
    previewSampleText: '【场景：示例】角色A：台词内容。\n{旁白：括号区间}\n（注释说明）',
    tokenOverrides: {},
    ruleOverrides: {},
  };
  await plugin.pkgManager.createPackage(manifest, tokenIds, ruleIds);
  await finalize(plugin, `已创建 main 汇总包（令牌 ${tokenIds.length} / 规则 ${ruleIds.length}）`);
  return name;
}

/** 查找空闲目录名（避免覆盖已有包目录） */
async function findFreeDirName(plugin: PromptColorizer, base: string): Promise<string> {
  let candidate = base;
  let i = 2;
  while (await plugin.app.vault.adapter.exists(`packages/${candidate}`)) {
    candidate = `${base}_${i++}`;
  }
  return candidate;
}

/** 最小可用 manifest（原清单损坏时的复制兜底） */
function defaultManifest(packageId: string): PackageManifest {
  return {
    packageId,
    name: packageId,
    tagColor: '#7c8aff',
    description: '',
    version: '1.0.0',
    specVersion: PACKAGE_SPEC_VERSION,
    type: 'user',
    usageTag: '',
    previewSampleText: '',
  };
}