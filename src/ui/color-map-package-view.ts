/**
 * 颜色导图 — 包视图（树状）渲染（v5 包管理模块）
 *
 * 树结构映射磁盘包目录：📦包 → 🟢令牌组 / 🟣规则组 → 资源条目。
 * - 包条目：复选框启用（单选/叠加模式）、标识色圆点、内置标签、状态标记
 * - 资源条目：色块/符号图标 + 状态标记（✅活跃/🗂️闲置/⚠️失效/🔒锁定）
 * - 右键菜单权限控制：内置包仅导出/复制；用户包全套操作
 * - 底部预览区：选中包的示例文本按当前包样式（含覆盖层）实时渲染
 */

import { Menu, Notice, setIcon } from 'obsidian';
import type PromptColorizer from '../../main';
import type { LoadedPackage } from '../types';
import { RULE_CATEGORIES, TOKEN_CATEGORIES } from '../types';
import {
  scanResourceEntries,
  filterCleanable,
  suggestCategory,
  isUncategorizedCategory,
} from '../packages/resource-scanner';
import type { ResourceEntry } from '../packages/resource-scanner';
import {
  togglePackageEnabled,
  movePackageOrder,
  renamePackage,
  copyPackage,
  clonePackage,
  deletePackage,
  setResourceCategory,
  toggleResourceLock,
  addRefToPackage,
  removeRefFromAllPackages,
  deleteResourceTokens,
  removeInvalidRefsFromPackage,
  applySuggestedCategories,
  getRuleMeta,
} from '../packages/package-actions';
import {
  openCategoryPicker,
  openConfirmModal,
  openRenameModal,
  openCleanupModal,
  openScanSummaryModal,
  openRefSourceModal,
} from '../packages/package-dialogs';

/** 状态图标与提示文案 */
const STATUS_META: Record<string, { icon: string; title: string; cls: string }> = {
  active: { icon: '✅', title: '已引用（活跃）', cls: 'is-active' },
  idle: { icon: '🗂️', title: '未引用（闲置）', cls: 'is-idle' },
  missing: { icon: '⚠️', title: '引用丢失（失效）', cls: 'is-missing' },
  locked: { icon: '🔒', title: '受保护锁定', cls: 'is-locked' },
};

/** 包树渲染选项 */
export interface PackageTreeOptions {
  searchQuery: string;
  selectedPackageId: string | null;
  onSelectPackage: (dirName: string | null) => void;
}

/** 渲染包视图（树 + 底部预览区） */
export function renderPackageTreeView(
  container: HTMLElement,
  plugin: PromptColorizer,
  opts: PackageTreeOptions
): void {
  const packages = plugin.pkgManager
    ? plugin.pkgManager.sortPackages(plugin.loadedPackages)
    : [];
  const entries = scanResourceEntries(plugin);
  const entryById = new Map(entries.map((e) => [`${e.kind}:${e.id}`, e]));

  const q = opts.searchQuery.trim().toLowerCase();

  const tree = container.createDiv({ cls: 'pc-pk-tree' });

  if (packages.length === 0) {
    renderEmpty(tree, 'package', '暂无包', '内置包加载失败或 packages/ 目录为空');
    return;
  }

  for (const pkg of packages) {
    if (!matchPackage(pkg, entries, q)) continue;
    renderPackageNode(tree, plugin, pkg, entryById, opts, q);
  }

  // 底部预览区：选中包时展示示例文本实时渲染
  renderPreviewArea(container, plugin, opts.selectedPackageId, packages);
}

/** 包/资源是否命中搜索（空查询全通过） */
function matchPackage(pkg: LoadedPackage, entries: ResourceEntry[], q: string): boolean {
  if (!q) return true;
  if (
    (pkg.manifest?.name ?? pkg.dirName).toLowerCase().includes(q) ||
    pkg.dirName.toLowerCase().includes(q) ||
    (pkg.manifest?.usageTag ?? '').toLowerCase().includes(q)
  ) {
    return true;
  }
  const refTokenIds = pkg.refTokenIds ?? [];
  const refRuleIds = pkg.refRuleIds ?? [];
  return entries.some(
    (e) =>
      e.name.toLowerCase().includes(q) &&
      (e.kind === 'token' ? refTokenIds.includes(e.id) : refRuleIds.includes(e.id))
  );
}

/** 渲染单个包节点 */
function renderPackageNode(
  parent: HTMLElement,
  plugin: PromptColorizer,
  pkg: LoadedPackage,
  entryById: Map<string, ResourceEntry>,
  opts: PackageTreeOptions,
  q: string
): void {
  const s = plugin.settings;
  const isEnabled = (s.enabledPackageIds ?? []).includes(pkg.dirName);
  const manifest = pkg.manifest;
  const name = manifest?.name ?? pkg.dirName;

  const nodeEl = parent.createDiv({ cls: 'pc-pk-node' });
  if (pkg.status === 'invalid' || pkg.status === 'id-conflict') nodeEl.addClass('is-broken');

  const rowEl = nodeEl.createDiv({ cls: 'pc-pk-row' });
  if (opts.selectedPackageId === pkg.dirName) rowEl.addClass('is-selected');

  // 启用复选框（无效/冲突禁用包不可勾选）
  const cb = rowEl.createEl('input', { cls: 'pc-pk-check', attr: { type: 'checkbox' } });
  cb.checked = isEnabled;
  cb.disabled = pkg.status === 'invalid' || pkg.status === 'id-conflict';
  cb.addEventListener('change', () => {
    void togglePackageEnabled(plugin, pkg.dirName);
  });

  // 包标识色圆点
  const dot = rowEl.createSpan({ cls: 'pc-pk-dot' });
  dot.style.background = manifest?.tagColor || '#7c8aff';

  // 名称 + 标签
  const nameEl = rowEl.createSpan({ cls: 'pc-pk-name', text: name });
  nameEl.setAttribute('title', manifest?.description ?? pkg.statusMessage ?? name);

  if (pkg.isBuiltin) {
    rowEl.createSpan({ cls: 'pc-pk-tag is-builtin', text: '内置' });
  }
  if (manifest?.usageTag) {
    rowEl.createSpan({ cls: 'pc-pk-tag', text: manifest.usageTag });
  }
  const sharedRef = manifest?.clonedFromPackageId ? null : null;
  void sharedRef;
  if (pkg.status === 'id-conflict') rowEl.createSpan({ cls: 'pc-pk-tag is-warn', text: 'ID冲突，禁用' });
  else if (pkg.status === 'invalid') rowEl.createSpan({ cls: 'pc-pk-tag is-warn', text: '无效包' });
  else if (pkg.status === 'partial') rowEl.createSpan({ cls: 'pc-pk-tag is-warn', text: '部分失效' });
  if (manifest?.clonedFromPackageId) {
    rowEl.createSpan({ cls: 'pc-pk-tag', text: '克隆' });
  }

  // 点击行选中包（预览区联动）
  rowEl.addEventListener('click', () => {
    opts.onSelectPackage(opts.selectedPackageId === pkg.dirName ? null : pkg.dirName);
  });

  // 右键菜单
  rowEl.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    showPackageMenu(plugin, pkg, ev as MouseEvent);
  });

  // 索引缺失标记（部分失效）
  const tokenIds = pkg.refTokenIds ?? [];
  const ruleIds = pkg.refRuleIds ?? [];
  const children = nodeEl.createDiv({ cls: 'pc-pk-children' });

  // 令牌组
  const tokenEntries = tokenIds
    .map((id) => entryById.get(`token:${id}`))
    .filter((e): e is ResourceEntry => !!e)
    .filter((e) => !q || e.name.toLowerCase().includes(q));
  const ruleEntries = ruleIds
    .map((id) => entryById.get(`rule:${id}`))
    .filter((e): e is ResourceEntry => !!e)
    .filter((e) => !q || e.name.toLowerCase().includes(q));

  if (tokenIds.length > 0 || tokenEntries.length > 0) {
    renderGroup(children, '🟢', '令牌组', tokenEntries, plugin, q, tokenIds);
  }
  // 规则组
  if (ruleIds.length > 0 || ruleEntries.length > 0) {
    renderGroup(children, '🟣', '规则组', ruleEntries, plugin, q, ruleIds);
  }

  if (pkg.refTokenIds === null || pkg.refRuleIds === null) {
    const warn = children.createDiv({ cls: 'pc-pk-index-warn' });
    warn.setText(`⚠️ ${pkg.refTokenIds === null ? 'tokens/token_index.json' : 'rules/rule_index.json'} 损坏，该分组索引已失效`);
  } else if (tokenEntries.length === 0 && ruleEntries.length === 0) {
    children.createDiv({ cls: 'pc-pk-group-empty', text: '（空包：未引用任何资源）' });
  }
}

/** 渲染令牌组/规则组（组头 + 资源条目） */
function renderGroup(
  parent: HTMLElement,
  icon: string,
  label: string,
  entries: ResourceEntry[],
  plugin: PromptColorizer,
  q: string,
  refIds: string[]
): void {
  const groupEl = parent.createDiv({ cls: 'pc-pk-group' });
  const head = groupEl.createDiv({ cls: 'pc-pk-group-head' });
  head.createSpan({ cls: 'pc-pk-group-icon', text: icon });
  head.createSpan({ cls: 'pc-pk-group-name', text: label });
  head.createSpan({ cls: 'pc-pk-group-count', text: String(refIds.length) });

  if (entries.length === 0) {
    if (!q) groupEl.createDiv({ cls: 'pc-pk-group-empty', text: '（空）' });
    return;
  }
  for (const entry of entries) {
    renderResourceRow(groupEl, plugin, entry);
  }
}

/** 渲染资源条目（色块/符号 + 名称 + 状态 + 右键） */
function renderResourceRow(parent: HTMLElement, plugin: PromptColorizer, entry: ResourceEntry): void {
  const statusMeta = STATUS_META[entry.status] ?? STATUS_META.idle;
  const row = parent.createDiv({ cls: `pc-pk-res-row ${statusMeta.cls}` });
  if (entry.status === 'idle') row.addClass('is-dim');
  if (entry.status === 'missing') row.addClass('is-gray');

  if (entry.kind === 'token') {
    const dot = row.createSpan({ cls: 'pc-pk-res-dot' });
    dot.style.background = entry.color || '#888';
    if (entry.enabled === false) dot.addClass('is-disabled');
  } else {
    // 规则条目：符号图标（括号类规则显示 ()，其余 {}）
    row.createSpan({ cls: 'pc-pk-rule-glyph', text: /paren|dialogue|bracket/.test(entry.id) ? '( )' : '{ }' });
  }

  const nameEl = row.createSpan({ cls: 'pc-pk-res-name', text: entry.name });
  nameEl.setAttribute('title', `${entry.name}\n${entry.note ? entry.note + '\n' : ''}${statusMeta.title}`);

  row.createSpan({ cls: 'pc-pk-res-status', text: statusMeta.icon, attr: { title: statusMeta.title } });

  row.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    showResourceMenu(plugin, entry, ev as MouseEvent);
  });
}

/** 包节点右键菜单（权限控制：内置包仅导出/复制可用） */
function showPackageMenu(plugin: PromptColorizer, pkg: LoadedPackage, ev: MouseEvent): void {
  const menu = new Menu();
  const isBuiltin = pkg.isBuiltin;
  const hasManifest = !!pkg.manifest;

  if (hasManifest) {
    menu.addItem((item) => {
      item.setTitle('导出包').setIcon('upload').onClick(() => {
        void import('../packages/pkg-io').then((m) => m.exportPackage(plugin, pkg));
      });
    });
    menu.addItem((item) => {
      item.setTitle('复制包（共享引用）').setIcon('copy').onClick(() => {
        void copyPackage(plugin, pkg);
      });
    });
    menu.addItem((item) => {
      item.setTitle('克隆包（深度拷贝）').setIcon('copy-plus').setDisabled(isBuiltin).onClick(() => {
        void clonePackage(plugin, pkg);
      });
    });
    menu.addSeparator();
    menu.addItem((item) => {
      item.setTitle('重命名').setIcon('pencil').setDisabled(isBuiltin).onClick(() => {
        openRenameModal(plugin.app, pkg.manifest?.name ?? pkg.dirName, (name) => {
          void renamePackage(plugin, pkg, name);
        });
      });
    });
    menu.addItem((item) => {
      item.setTitle('删除包').setIcon('trash-2').setDisabled(isBuiltin).onClick(() => {
        openConfirmModal(
          plugin.app,
          '删除包',
          `仅删除 packages/${pkg.dirName} 目录与索引文件，不会删除底层令牌、规则本体。确认删除？`,
          () => void deletePackage(plugin, pkg)
        );
      });
    });
  }

  // 失效引用一键修复（用户包 + 存在失效 ID 时）
  if (!isBuiltin && hasManifest) {
    const validTokens = new Set((plugin.settings.customTextColors ?? []).map((c) => c.id));
    const validRules = new Set((plugin.currentRuleSet?.rules ?? []).map((r) => r.id));
    const hasMissing =
      (pkg.refTokenIds ?? []).some((id) => !validTokens.has(id)) ||
      (pkg.refRuleIds ?? []).some((id) => !validRules.has(id));
    if (hasMissing) {
      menu.addSeparator();
      menu.addItem((item) => {
        item.setTitle('一键修复：移除包内无效引用').setIcon('wrench').onClick(() => {
          void removeInvalidRefsFromPackage(plugin, pkg);
        });
      });
    }
  }

  // 叠加模式顺序调整
  if ((plugin.settings.packageMode ?? 'single') === 'multi') {
    menu.addSeparator();
    menu.addItem((item) => {
      item.setTitle('上移（提高优先级）').setIcon('arrow-up').onClick(() => {
        void movePackageOrder(plugin, pkg.dirName, -1);
      });
    });
    menu.addItem((item) => {
      item.setTitle('下移（降低优先级）').setIcon('arrow-down').onClick(() => {
        void movePackageOrder(plugin, pkg.dirName, 1);
      });
    });
  }

  menu.showAtMouseEvent(ev);
}

/** 资源条目右键菜单 */
function showResourceMenu(plugin: PromptColorizer, entry: ResourceEntry, ev: MouseEvent): void {
  const menu = new Menu();
  const fromBuiltinOnly = entry.refPackages.length > 0 && entry.refPackages.every((p) => isBuiltinPackage(plugin, p));

  menu.addItem((item) => {
    item.setTitle('修改分类').setIcon('tag').onClick(() => {
      openCategoryPicker(
        plugin.app,
        entry.kind,
        entry.category,
        entry.kind === 'token' ? TOKEN_CATEGORIES : RULE_CATEGORIES,
        (category) => void setResourceCategory(plugin, entry, category)
      );
    });
  });
  menu.addItem((item) => {
    item.setTitle(entry.resourceLock ? '取消锁定' : '标记锁定').setIcon(entry.resourceLock ? 'lock-open' : 'lock').onClick(() => {
      void toggleResourceLock(plugin, entry);
    });
  });
  menu.addItem((item) => {
    item.setTitle('查看引用来源').setIcon('search').onClick(() => {
      const manifest = plugin.loadedPackages.find((p) => p.dirName === entry.refPackages[0])?.manifest;
      const clonedFrom =
        entry.kind === 'token'
          ? manifest?.clonedFromPackageId ?? findCloneSource(plugin, entry)
          : null;
      openRefSourceModal(plugin.app, entry, clonedFrom);
    });
  });

  // 添加到包（用户自建包逐项列出；setSection 分组）
  const userPkgs = plugin.loadedPackages.filter((p) => !p.isBuiltin && p.manifest);
  if (userPkgs.length > 0) {
    menu.addSeparator();
    menu.addItem((item) => {
      item.setTitle('添加到包…').setIcon('package-plus').setDisabled(true);
    });
    for (const pkg of userPkgs) {
      menu.addItem((item) => {
        item.setTitle(`→ ${pkg.manifest?.name ?? pkg.dirName}`).onClick(() => {
          void addRefToPackage(plugin, entry, pkg.dirName);
        });
      });
    }
  }
  menu.addItem((item) => {
    item.setTitle('从所有包移除引用').setIcon('package-minus').setDisabled(fromBuiltinOnly).onClick(() => {
      void removeRefFromAllPackages(plugin, entry);
    });
  });

  // 删除资源本体（仅令牌；规则本体只读）
  if (entry.kind === 'token') {
    menu.addSeparator();
    menu.addItem((item) => {
      item.setTitle('删除资源本体').setIcon('trash-2').onClick(() => {
        openConfirmModal(
          plugin.app,
          '删除资源本体',
          `令牌「${entry.name}」将被永久删除（即使已锁定，手动删除仍允许）。引用它的包会出现失效警告。确认删除？`,
          () => void deleteResourceTokens(plugin, [entry])
        );
      });
    });
  }

  menu.showAtMouseEvent(ev);
}

/** 目录名是否属于内置包 */
function isBuiltinPackage(plugin: PromptColorizer, dirName: string): boolean {
  return plugin.loadedPackages.find((p) => p.dirName === dirName)?.isBuiltin ?? false;
}

/** 查找令牌克隆溯源（遍历包 manifest 溯源表反查原 ID） */
function findCloneSource(plugin: PromptColorizer, entry: ResourceEntry): string | null {
  for (const pkg of plugin.loadedPackages) {
    const map = pkg.manifest?.clonedFromResourceIds;
    if (map && map[entry.id]) return pkg.dirName;
  }
  return null;
}

/** 底部预览区：选中包示例文本按当前样式渲染 */
function renderPreviewArea(
  container: HTMLElement,
  plugin: PromptColorizer,
  selectedPackageId: string | null,
  packages: LoadedPackage[]
): void {
  const pkg = packages.find((p) => p.dirName === selectedPackageId);
  const preview = container.createDiv({ cls: 'pc-pk-preview' });

  if (!pkg || !pkg.manifest) {
    preview.createDiv({ cls: 'pc-pk-preview-empty', text: '选中包后在此预览示例文本（实时套用当前包样式）' });
    return;
  }

  preview.createDiv({ cls: 'pc-pk-preview-title', text: `📦 ${pkg.manifest.name} — 示例预览` });
  const body = preview.createDiv({ cls: 'pc-pk-preview-body' });
  const sample = pkg.manifest.previewSampleText ?? '';
  if (!sample) {
    body.createDiv({ cls: 'pc-pk-preview-empty', text: '（该包未配置 previewSampleText）' });
    return;
  }
  renderSampleWithMatches(body, plugin, sample);
}

/** 示例文本渲染：与编辑器共用匹配逻辑，span 套 dsl 类（含包覆盖样式） */
function renderSampleWithMatches(body: HTMLElement, plugin: PromptColorizer, sample: string): void {
  let matches: ReturnType<PromptColorizer['getAllMatches']> = [];
  try {
    matches = plugin.getAllMatches(sample);
  } catch {
    matches = [];
  }
  matches.sort((a, b) => a.from - b.from);

  let cursor = 0;
  const lines = sample.split('\n');
  let offset = 0;
  for (const line of lines) {
    const lineEl = body.createDiv({ cls: 'pc-pk-preview-line' });
    const lineStart = offset;
    const lineEnd = offset + line.length;
    // 取落在当前行内的匹配
    for (const m of matches) {
      if (m.to <= lineStart || m.from >= lineEnd) continue;
      if (m.from > cursor) {
        lineEl.createSpan({ text: sample.slice(cursor, Math.min(m.from, lineEnd)) });
      }
      const segStart = Math.max(m.from, lineStart);
      const segEnd = Math.min(m.to, lineEnd);
      if (segEnd > segStart) {
        const span = lineEl.createSpan({ cls: m.cssClass, text: sample.slice(segStart, segEnd) });
        span.setAttribute('title', m.cssClass);
        cursor = segEnd;
      }
    }
    if (cursor < lineEnd) {
      lineEl.createSpan({ text: sample.slice(Math.max(cursor, lineStart), lineEnd) });
    }
    cursor = lineEnd;
    offset = lineEnd + 1; // +1 跳过换行符
  }
}

/** 扫描并归类入口（工具栏按钮调用）：弹汇总面板 */
export function runScanAndClassify(plugin: PromptColorizer): void {
  const entries = scanResourceEntries(plugin);
  const stats = {
    total: entries.length,
    active: entries.filter((e) => e.status === 'active').length,
    idle: entries.filter((e) => e.status === 'idle').length,
    missing: entries.filter((e) => e.status === 'missing').length,
    locked: entries.filter((e) => e.status === 'locked').length,
  };

  // 启发式推荐：仅未分类资源
  const suggestions: Array<{ entry: ResourceEntry; category: string }> = [];
  for (const entry of entries) {
    if (entry.status === 'missing') continue;
    if (!isUncategorizedCategory(entry.kind, entry.category)) continue;
    const suggestion = suggestCategory(entry.kind, entry.name, entry.note);
    if (suggestion && suggestion !== entry.category) {
      suggestions.push({ entry, category: suggestion });
    }
  }

  openScanSummaryModal(
    plugin.app,
    stats,
    suggestions,
    () => {
      void applySuggestedCategories(plugin, suggestions).then(() => {
        new Notice(`已应用 ${suggestions.length} 条推荐分类`);
      });
    },
    () => {
      // 批量锁定：闲置资源全部加锁（锁定仅阻止批量清理）
      for (const entry of entries.filter((e) => e.status === 'idle')) {
        if (entry.kind === 'token') {
          const token = plugin.settings.customTextColors.find((c) => c.id === entry.id);
          if (token) token.resourceLock = true;
        } else {
          const meta = getRuleMeta(plugin, entry.id);
          meta.resourceLock = true;
          plugin.settings.ruleMeta[entry.id] = meta;
        }
      }
      void plugin.saveSettings().then(() => plugin.reloadPackages()).then(() => {
        plugin.app.workspace.trigger('prompt-colorizer:custom-colors-changed');
        new Notice('已批量锁定全部闲置资源');
      });
    }
  );
}

/** 清理未引用资源入口（工具栏按钮调用） */
export function runCleanupUnreferenced(plugin: PromptColorizer): void {
  const entries = scanResourceEntries(plugin);
  const cleanable = filterCleanable(entries);
  if (cleanable.length === 0) {
    new Notice('没有可清理的未引用资源');
    return;
  }
  openCleanupModal(plugin.app, cleanable, (picked) => {
    void deleteResourceTokens(plugin, picked).then(() => {
      new Notice(`已清理 ${picked.length} 个资源`);
    });
  });
}

/** 空态渲染 */
function renderEmpty(parent: HTMLElement, icon: string, title: string, desc: string): void {
  const empty = parent.createDiv({ cls: 'pc-pk-empty' });
  const iconEl = empty.createDiv({ cls: 'pc-pk-empty-icon' });
  setIcon(iconEl, icon);
  empty.createDiv({ cls: 'pc-pk-empty-title', text: title });
  empty.createDiv({ cls: 'pc-pk-empty-desc', text: desc });
}