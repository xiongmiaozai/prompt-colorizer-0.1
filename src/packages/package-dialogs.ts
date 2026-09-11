/**
 * 包管理弹窗组件（v5）
 *
 * 基于Obsidian Modal：分类选择 / 危险确认 / 重命名 / 清理清单勾选 /
 * 扫描汇总（推荐归类预览）/ 引用来源查看。
 */

import { App, Modal } from 'obsidian';
import type { CustomRuleDef, CustomTextColor } from '../types';
import type { ResourceEntry } from './resource-scanner';

/** 通用单选列表弹窗（分类选择等） */
class ListPickModal extends Modal {
  constructor(
    app: App,
    private title: string,
    private options: string[],
    private current: string,
    private onPick: (value: string) => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.titleEl.setText(this.title);
    const list = this.contentEl.createDiv({ cls: 'pc-pk-pick-list' });
    for (const opt of this.options) {
      const row = list.createDiv({ cls: 'pc-pk-pick-row' });
      if (opt === this.current) row.addClass('is-current');
      row.createSpan({ text: opt });
      row.addEventListener('click', () => {
        this.close();
        this.onPick(opt);
      });
    }
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/** 打开分类选择弹窗 */
export function openCategoryPicker(
  app: App,
  kind: 'token' | 'rule',
  current: string,
  categories: readonly string[],
  onPick: (category: string) => void
): void {
  new ListPickModal(app, kind === 'token' ? '选择令牌分类' : '选择规则分类', [...categories], current || '未分类', onPick).open();
}

/** 危险操作二次确认弹窗 */
export function openConfirmModal(app: App, title: string, desc: string, onConfirm: () => void): void {
  new ConfirmModal(app, title, desc, onConfirm).open();
}

class ConfirmModal extends Modal {
  constructor(
    app: App,
    private titleText: string,
    private desc: string,
    private onConfirm: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.titleEl.setText(this.titleText);
    this.contentEl.createDiv({ cls: 'pc-pk-confirm-desc', text: this.desc });
    const actions = this.contentEl.createDiv({ cls: 'pc-pk-modal-actions' });
    actions.createEl('button', { text: '取消' }).addEventListener('click', () => this.close());
    const ok = actions.createEl('button', { text: '确认', cls: 'mod-warning' });
    ok.addEventListener('click', () => {
      this.close();
      this.onConfirm();
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/** 重命名输入弹窗 */
export function openRenameModal(app: App, current: string, onRename: (name: string) => void): void {
  new RenameModal(app, current, onRename).open();
}

class RenameModal extends Modal {
  constructor(
    app: App,
    private current: string,
    private onRename: (name: string) => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.titleEl.setText('重命名包');
    const input = this.contentEl.createEl('input', {
      cls: 'pc-pk-rename-input',
      attr: { type: 'text', value: this.current, placeholder: '输入新名称' },
    });
    const actions = this.contentEl.createDiv({ cls: 'pc-pk-modal-actions' });
    actions.createEl('button', { text: '取消' }).addEventListener('click', () => this.close());
    actions.createEl('button', { text: '确认', cls: 'mod-cta' }).addEventListener('click', () => {
      const name = input.value.trim();
      this.close();
      if (name && name !== this.current) this.onRename(name);
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/** 清理未引用资源：清单勾选弹窗（不静默删除） */
export function openCleanupModal(
  app: App,
  cleanable: ResourceEntry[],
  onConfirm: (selected: ResourceEntry[]) => void
): void {
  new CleanupModal(app, cleanable, onConfirm).open();
}

class CleanupModal extends Modal {
  private selected = new Set<string>();

  constructor(
    app: App,
    private entries: ResourceEntry[],
    private onConfirm: (selected: ResourceEntry[]) => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.titleEl.setText('清理未引用资源');
    this.contentEl.createDiv({
      cls: 'pc-pk-modal-desc',
      text: '以下资源未被任何包引用且未锁定，请勾选需要删除的资源。删除后不可恢复。',
    });

    const list = this.contentEl.createDiv({ cls: 'pc-pk-clean-list' });
    for (const e of this.entries) {
      const row = list.createDiv({ cls: 'pc-pk-clean-row' });
      const cb = row.createEl('input', { attr: { type: 'checkbox' } });
      cb.addEventListener('change', () => {
        if (cb.checked) this.selected.add(e.id);
        else this.selected.delete(e.id);
      });
      const kindTag = e.kind === 'token' ? '令牌' : '规则';
      row.createSpan({ cls: 'pc-pk-clean-kind', text: kindTag });
      row.createSpan({ cls: 'pc-pk-clean-name', text: e.name, attr: { title: e.name } });
    }

    const actions = this.contentEl.createDiv({ cls: 'pc-pk-modal-actions' });
    actions.createEl('button', { text: '取消' }).addEventListener('click', () => this.close());
    const ok = actions.createEl('button', { text: '删除选中资源', cls: 'mod-warning' });
    ok.addEventListener('click', () => {
      const picked = this.entries.filter((e) => this.selected.has(e.id));
      this.close();
      if (picked.length > 0) this.onConfirm(picked);
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/** 扫描汇总弹窗：资源统计 + 推荐归类预览（应用推荐 / 批量锁定） */
export function openScanSummaryModal(
  app: App,
  stats: { total: number; active: number; idle: number; missing: number; locked: number },
  suggestions: Array<{ entry: ResourceEntry; category: string }>,
  onApplySuggestions: () => void,
  onLockIdle: () => void
): void {
  new ScanSummaryModal(app, stats, suggestions, onApplySuggestions, onLockIdle).open();
}

class ScanSummaryModal extends Modal {
  constructor(
    app: App,
    private stats: { total: number; active: number; idle: number; missing: number; locked: number },
    private suggestions: Array<{ entry: ResourceEntry; category: string }>,
    private onApplySuggestions: () => void,
    private onLockIdle: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.titleEl.setText('扫描并归类资源');

    const grid = this.contentEl.createDiv({ cls: 'pc-pk-stats-grid' });
    const items: Array<[string, string]> = [
      ['✅ 已引用（活跃）', String(this.stats.active)],
      ['🗂️ 未引用（闲置）', String(this.stats.idle)],
      ['⚠️ 引用丢失（失效）', String(this.stats.missing)],
      ['🔒 受保护锁定', String(this.stats.locked)],
    ];
    for (const [label, num] of items) {
      const cell = grid.createDiv({ cls: 'pc-pk-stats-cell' });
      cell.createDiv({ cls: 'pc-pk-stats-num', text: num });
      cell.createDiv({ cls: 'pc-pk-stats-label', text: label });
    }

    if (this.suggestions.length > 0) {
      this.contentEl.createDiv({ cls: 'pc-pk-modal-desc', text: '启发式推荐分类（仅修改「未分类」资源，不覆盖手动分类与锁定状态）：' });
      const list = this.contentEl.createDiv({ cls: 'pc-pk-suggest-list' });
      for (const { entry, category } of this.suggestions.slice(0, 50)) {
        const row = list.createDiv({ cls: 'pc-pk-suggest-row' });
        row.createSpan({ cls: 'pc-pk-clean-kind', text: entry.kind === 'token' ? '令牌' : '规则' });
        row.createSpan({ cls: 'pc-pk-clean-name', text: entry.name, attr: { title: entry.name } });
        row.createSpan({ cls: 'pc-pk-suggest-arrow', text: '→' });
        row.createSpan({ cls: 'pc-pk-suggest-target', text: category });
      }
    } else {
      this.contentEl.createDiv({ cls: 'pc-pk-modal-desc', text: '没有可推荐的分类变更。' });
    }

    const actions = this.contentEl.createDiv({ cls: 'pc-pk-modal-actions' });
    if (this.suggestions.length > 0) {
      actions.createEl('button', { text: '应用推荐分类', cls: 'mod-cta' }).addEventListener('click', () => {
        this.close();
        this.onApplySuggestions();
      });
    }
    actions.createEl('button', { text: '批量锁定闲置资源' }).addEventListener('click', () => {
      this.close();
      this.onLockIdle();
    });
    actions.createEl('button', { text: '关闭' }).addEventListener('click', () => this.close());
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/** 查看引用来源弹窗（包列表；克隆溯源） */
export function openRefSourceModal(app: App, entry: ResourceEntry, clonedFrom: string | null): void {
  new RefSourceModal(app, entry, clonedFrom).open();
}

class RefSourceModal extends Modal {
  constructor(
    app: App,
    private entry: ResourceEntry,
    private clonedFrom: string | null
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.titleEl.setText(`引用来源：${this.entry.name}`);

    const list = this.contentEl.createDiv({ cls: 'pc-pk-suggest-list' });
    if (this.entry.refPackages.length === 0) {
      list.createDiv({ cls: 'pc-pk-modal-desc', text: '没有被任何包引用。' });
    } else {
      for (const pkgName of this.entry.refPackages) {
        list.createDiv({ cls: 'pc-pk-suggest-row' }).createSpan({ text: `📦 ${pkgName}` });
      }
    }
    if (this.clonedFrom) {
      this.contentEl.createDiv({ cls: 'pc-pk-modal-desc', text: `克隆溯源：来自包「${this.clonedFrom}」` });
    }
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
/** 导出前预览弹窗：列出本次打包的令牌、规则清单 */
export function openExportPreviewModal(
  app: App,
  tokens: CustomTextColor[],
  rules: CustomRuleDef[],
  onConfirm: () => void
): void {
  new ExportPreviewModal(app, tokens, rules, onConfirm).open();
}

class ExportPreviewModal extends Modal {
  constructor(
    app: App,
    private tokens: CustomTextColor[],
    private rules: CustomRuleDef[],
    private onConfirm: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.titleEl.setText('导出包预览');

    this.contentEl.createDiv({
      cls: 'pc-pk-modal-desc',
      text: `即将打包 ${this.tokens.length} 个令牌、${this.rules.length} 个规则的完整数据为 .stylepkg 压缩包。`,
    });

    const list = this.contentEl.createDiv({ cls: 'pc-pk-suggest-list' });
    for (const tk of this.tokens) {
      const row = list.createDiv({ cls: 'pc-pk-suggest-row' });
      row.createSpan({ cls: 'pc-pk-clean-kind', text: '令牌' });
      row.createSpan({ cls: 'pc-pk-clean-name', text: tk.text || tk.id, attr: { title: tk.note ?? '' } });
    }
    for (const r of this.rules) {
      const row = list.createDiv({ cls: 'pc-pk-suggest-row' });
      row.createSpan({ cls: 'pc-pk-clean-kind', text: '规则' });
      row.createSpan({ cls: 'pc-pk-clean-name', text: r.name || r.id });
    }

    const actions = this.contentEl.createDiv({ cls: 'pc-pk-modal-actions' });
    actions.createEl('button', { text: '取消' }).addEventListener('click', () => this.close());
    actions.createEl('button', { text: '确认导出', cls: 'mod-cta' }).addEventListener('click', () => {
      this.close();
      this.onConfirm();
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/** 导入前预览弹窗：展示即将新增的令牌、规则清单与 ID 冲突信息 */
export function openImportPreviewModal(
  app: App,
  packageName: string,
  newTokens: Array<{ token: CustomTextColor }>,
  newRules: Array<{ rule: CustomRuleDef }>,
  tokenIdConflicts: number,
  ruleIdConflicts: number,
  onConfirm: () => void
): void {
  new ImportPreviewModal(app, packageName, newTokens, newRules, tokenIdConflicts, ruleIdConflicts, onConfirm).open();
}

class ImportPreviewModal extends Modal {
  constructor(
    app: App,
    private packageName: string,
    private newTokens: Array<{ token: CustomTextColor }>,
    private newRules: Array<{ rule: CustomRuleDef }>,
    private tokenIdConflicts: number,
    private ruleIdConflicts: number,
    private onConfirm: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.titleEl.setText(`导入包：「${this.packageName}」`);

    const conflicts = this.tokenIdConflicts + this.ruleIdConflicts;
    this.contentEl.createDiv({
      cls: 'pc-pk-modal-desc',
      text: `即将新增 ${this.newTokens.length} 个令牌、${this.newRules.length} 个规则。` +
        (conflicts > 0
          ? `检测到 ${conflicts} 个 ID 冲突，将自动生成全新 ID 并重写包内覆盖配置。`
          : '无 ID 冲突。'),
    });

    const list = this.contentEl.createDiv({ cls: 'pc-pk-suggest-list' });
    for (const { token } of this.newTokens) {
      const row = list.createDiv({ cls: 'pc-pk-suggest-row' });
      row.createSpan({ cls: 'pc-pk-clean-kind', text: '令牌' });
      row.createSpan({ cls: 'pc-pk-clean-name', text: token.text || token.id });
    }
    for (const { rule } of this.newRules) {
      const row = list.createDiv({ cls: 'pc-pk-suggest-row' });
      row.createSpan({ cls: 'pc-pk-clean-kind', text: '规则' });
      row.createSpan({ cls: 'pc-pk-clean-name', text: rule.name || rule.id });
    }

    const actions = this.contentEl.createDiv({ cls: 'pc-pk-modal-actions' });
    actions.createEl('button', { text: '取消' }).addEventListener('click', () => this.close());
    actions.createEl('button', { text: '确认导入', cls: 'mod-cta' }).addEventListener('click', () => {
      this.close();
      this.onConfirm();
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
/** 包级样式覆盖编辑弹窗（颜色 + 字体风格 / 背景色 + 边框） */
export function openOverrideEditorModal(
  app: App,
  entry: { kind: 'token' | 'rule'; id: string; name: string },
  current: Record<string, string> | undefined,
  onSave: (override: Record<string, string> | null) => void
): void {
  new OverrideEditorModal(app, entry, current, onSave).open();
}

class OverrideEditorModal extends Modal {
  private inputs: Record<string, HTMLInputElement> = {};

  constructor(
    app: App,
    private entry: { kind: 'token' | 'rule'; id: string; name: string },
    private current: Record<string, string> | undefined,
    private onSave: (override: Record<string, string> | null) => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    const isToken = this.entry.kind === 'token';
    this.titleEl.setText(`包级样式覆盖（${isToken ? '令牌' : '规则'}：${this.entry.name}）`);
    this.contentEl.createDiv({
      cls: 'pc-pk-modal-desc',
      text: isToken
        ? '覆盖仅在本包内生效（启用该包时压过令牌本体样式）；留空 = 继承本体样式。'
        : '覆盖仅在本包内生效（启用该包时压过规则本体样式）；留空 = 继承本体样式。',
    });

    const fields: Array<{ key: string; label: string; type: 'color' | 'select'; options?: string[] }> = isToken
      ? [
          { key: 'color', label: '颜色', type: 'color' },
          { key: 'fontStyle', label: '字体风格', type: 'select', options: ['', 'bold', 'italic', 'normal'] },
        ]
      : [
          { key: 'color', label: '文字颜色', type: 'color' },
          { key: 'bgColor', label: '背景色', type: 'color' },
          { key: 'border', label: '边框样式', type: 'select', options: ['', 'dashed', 'solid', 'dotted'] },
        ];

    for (const f of fields) {
      const row = this.contentEl.createDiv({ cls: 'pc-pk-ov-row' });
      row.createSpan({ cls: 'pc-pk-ov-label', text: f.label });
      if (f.type === 'color') {
        const input = row.createEl('input', {
          cls: 'pc-pk-ov-color',
          attr: { type: 'color' },
        });
        const val = this.current?.[f.key];
        input.value = normalizeHex(val) ?? '#000000';
        this.inputs[f.key] = input;
      } else {
        const select = row.createEl('select', { cls: 'pc-pk-ov-select' });
        for (const opt of f.options ?? []) {
          const o = select.createEl('option', {
            text: opt === '' ? '继承本体' : opt,
            attr: { value: opt },
          });
          if ((this.current?.[f.key] ?? '') === opt) o.selected = true;
        }
        this.inputs[f.key] = select as unknown as HTMLInputElement;
      }
    }

    const actions = this.contentEl.createDiv({ cls: 'pc-pk-modal-actions' });
    actions.createEl('button', { text: '取消' }).addEventListener('click', () => this.close());
    actions.createEl('button', { text: '清除覆盖' }).addEventListener('click', () => {
      this.close();
      this.onSave(null);
    });
    actions.createEl('button', { text: '保存覆盖', cls: 'mod-cta' }).addEventListener('click', () => {
      const override: Record<string, string> = {};
      for (const f of fields) {
        const v = (this.inputs[f.key]?.value ?? '').trim();
        if (v) override[f.key] = v;
      }
      this.close();
      this.onSave(Object.keys(override).length > 0 ? override : null);
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/** 颜色值规范化为 input[type=color] 可用的 6 位 hex（非法返回 null） */
function normalizeHex(val: string | undefined): string | null {
  if (!val) return null;
  const m = val.trim().match(/^#?([0-9a-fA-F]{6})$/);
  return m ? `#${m[1]}` : null;
}
