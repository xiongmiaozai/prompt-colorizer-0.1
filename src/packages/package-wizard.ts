/**
 * 选择式打包向导（v5）
 *
 * 从全部着色资源（令牌 + 规则）中批量勾选，一键生成新包。
 * 数据源：scanResourceEntries 统一资源扫描；生成：createPackage 自包含写盘。
 */

import { App, Modal, Notice } from 'obsidian';
import type { CustomRuleDef, CustomTextColor, PackageManifest } from '../types';
import { PACKAGE_SPEC_VERSION } from '../types';
import type PromptColorizer from '../../main';
import type { ResourceEntry } from './resource-scanner';
import { scanResourceEntries } from './resource-scanner';
import { ruleIdToDef } from './pkg-io';
import { generateResourceIdSafe } from './pkg-utils';

/** 向导完成回调 */
export type WizardCompleteCallback = (dirName: string) => void;

/** 打开选择式打包向导 */
export function openPackageWizard(plugin: PromptColorizer, onComplete?: WizardCompleteCallback): void {
  new PackageWizardModal(plugin, onComplete).open();
}

class PackageWizardModal extends Modal {
  private entries: ResourceEntry[] = [];
  private filtered: ResourceEntry[] = [];
  private selected = new Set<string>();
  private searchQuery = '';
  private kindFilter: 'all' | 'token' | 'rule' = 'all';
  private statusFilter: 'all' | 'active' | 'idle' = 'all';

  private listEl: HTMLElement | null = null;
  private summaryEl: HTMLElement | null = null;
  private nameInput: HTMLInputElement | null = null;
  private descInput: HTMLInputElement | null = null;
  private colorInput: HTMLInputElement | null = null;
  private usageInput: HTMLInputElement | null = null;

  constructor(
    private plugin: PromptColorizer,
    private onComplete?: WizardCompleteCallback
  ) {
    super(plugin.app);
    this.entries = scanResourceEntries(plugin).filter((e) => e.status !== 'missing');
    this.filtered = [...this.entries];
  }

  onOpen(): void {
    this.contentEl.empty();
    this.titleEl.setText('从资源生成包');
    this.modalEl.addClass('pc-wizard-modal');

    this.renderFilterBar(this.contentEl);
    this.listEl = this.contentEl.createDiv({ cls: 'pc-wizard-list' });
    this.renderResourceList();
    this.renderFooter(this.contentEl);
    this.updateSummary();
  }

  onClose(): void {
    this.contentEl.empty();
  }

  /** 顶部筛选栏：搜索 + 种类 + 状态 */
  private renderFilterBar(parent: HTMLElement): void {
    const bar = parent.createDiv({ cls: 'pc-wizard-filter-bar' });

    const search = bar.createEl('input', {
      cls: 'pc-wizard-search',
      attr: { type: 'text', placeholder: '搜索资源名称 / ID / 分类…' },
    });
    search.value = this.searchQuery;
    search.addEventListener('input', () => {
      this.searchQuery = search.value.trim().toLowerCase();
      this.applyFilter();
    });

    const kindGroup = bar.createDiv({ cls: 'pc-wizard-seg' });
    for (const k of ['all', 'token', 'rule'] as const) {
      const btn = kindGroup.createEl('button', {
        cls: `pc-wizard-seg-btn ${this.kindFilter === k ? 'is-active' : ''}`,
        text: k === 'all' ? '全部' : k === 'token' ? '令牌' : '规则',
      });
      btn.addEventListener('click', () => {
        this.kindFilter = k;
        kindGroup.querySelectorAll('.pc-wizard-seg-btn').forEach((el) => el.classList.remove('is-active'));
        btn.classList.add('is-active');
        this.applyFilter();
      });
    }

    const statusGroup = bar.createDiv({ cls: 'pc-wizard-seg' });
    for (const s of ['all', 'active', 'idle'] as const) {
      const btn = statusGroup.createEl('button', {
        cls: `pc-wizard-seg-btn ${this.statusFilter === s ? 'is-active' : ''}`,
        text: s === 'all' ? '不限' : s === 'active' ? '已引用' : '闲置',
      });
      btn.addEventListener('click', () => {
        this.statusFilter = s;
        statusGroup.querySelectorAll('.pc-wizard-seg-btn').forEach((el) => el.classList.remove('is-active'));
        btn.classList.add('is-active');
        this.applyFilter();
      });
    }

    const selectAllBtn = bar.createEl('button', { cls: 'pc-wizard-select-all', text: '全选当前' });
    selectAllBtn.addEventListener('click', () => {
      for (const e of this.filtered) this.selected.add(e.id);
      this.renderResourceList();
      this.updateSummary();
    });

    const clearBtn = bar.createEl('button', { cls: 'pc-wizard-clear', text: '清空选择' });
    clearBtn.addEventListener('click', () => {
      this.selected.clear();
      this.renderResourceList();
      this.updateSummary();
    });
  }

  /** 应用筛选条件 */
  private applyFilter(): void {
    const q = this.searchQuery;
    this.filtered = this.entries.filter((e) => {
      if (this.kindFilter !== 'all' && e.kind !== this.kindFilter) return false;
      if (this.statusFilter === 'active' && e.status !== 'active') return false;
      if (this.statusFilter === 'idle' && e.status !== 'idle') return false;
      if (q.length > 0) {
        const hay = `${e.name} ${e.id} ${e.category} ${e.note}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    this.renderResourceList();
  }

  /** 渲染资源列表 */
  private renderResourceList(): void {
    if (!this.listEl) return;
    this.listEl.empty();

    if (this.filtered.length === 0) {
      this.listEl.createDiv({ cls: 'pc-wizard-empty', text: '无匹配资源。' });
      return;
    }

    for (const e of this.filtered) {
      const row = this.listEl.createDiv({ cls: 'pc-wizard-row' });
      if (this.selected.has(e.id)) row.addClass('is-selected');

      const cb = row.createEl('input', { attr: { type: 'checkbox' } }) as HTMLInputElement;
      cb.checked = this.selected.has(e.id);
      cb.addEventListener('change', () => {
        if (cb.checked) this.selected.add(e.id);
        else this.selected.delete(e.id);
        row.classList.toggle('is-selected', cb.checked);
        this.updateSummary();
      });

      const kindTag = row.createSpan({ cls: `pc-wizard-kind pc-wizard-kind-${e.kind}` });
      kindTag.setText(e.kind === 'token' ? '令牌' : '规则');

      row.createSpan({ cls: 'pc-wizard-name', text: e.name, attr: { title: e.name } });

      const metaParts: string[] = [e.category];
      if (e.status === 'active') metaParts.push('已引用');
      else if (e.status === 'idle') metaParts.push('闲置');
      else if (e.status === 'locked') metaParts.push('锁定');
      if (e.refPackages.length > 0) metaParts.push(`∈ ${e.refPackages.length}包`);
      row.createSpan({ cls: 'pc-wizard-meta', text: metaParts.join(' · ') });

      if (e.kind === 'token' && e.color) {
        const swatch = row.createSpan({ cls: 'pc-wizard-swatch' });
        swatch.style.background = e.color;
      }
    }
  }

  /** 底部：包信息表单 + 汇总 + 操作按钮 */
  private renderFooter(parent: HTMLElement): void {
    const footer = parent.createDiv({ cls: 'pc-wizard-footer' });

    const form = footer.createDiv({ cls: 'pc-wizard-form' });
    const nameRow = form.createDiv({ cls: 'pc-wizard-field' });
    nameRow.createSpan({ cls: 'pc-wizard-label', text: '包名称' });
    this.nameInput = nameRow.createEl('input', {
      cls: 'pc-wizard-input',
      attr: { type: 'text', placeholder: '输入新包名称', value: '我的样式包' },
    });

    const descRow = form.createDiv({ cls: 'pc-wizard-field' });
    descRow.createSpan({ cls: 'pc-wizard-label', text: '描述' });
    this.descInput = descRow.createEl('input', {
      cls: 'pc-wizard-input',
      attr: { type: 'text', placeholder: '可选描述' },
    });

    const colorRow = form.createDiv({ cls: 'pc-wizard-field' });
    colorRow.createSpan({ cls: 'pc-wizard-label', text: '标识色' });
    this.colorInput = colorRow.createEl('input', {
      cls: 'pc-wizard-color',
      attr: { type: 'color', value: '#7c8aff' },
    });

    const usageRow = form.createDiv({ cls: 'pc-wizard-field' });
    usageRow.createSpan({ cls: 'pc-wizard-label', text: '用途标签' });
    this.usageInput = usageRow.createEl('input', {
      cls: 'pc-wizard-input',
      attr: { type: 'text', placeholder: '如：故事阅读 / 技术文档' },
    });

    this.summaryEl = footer.createDiv({ cls: 'pc-wizard-summary' });

    const actions = footer.createDiv({ cls: 'pc-wizard-actions' });
    actions.createEl('button', { text: '取消' }).addEventListener('click', () => this.close());
    const genBtn = actions.createEl('button', { text: '生成包', cls: 'mod-cta' });
    genBtn.addEventListener('click', () => void this.handleGenerate());
  }

  /** 更新汇总信息 */
  private updateSummary(): void {
    if (!this.summaryEl) return;
    const selEntries = this.entries.filter((e) => this.selected.has(e.id));
    const tokN = selEntries.filter((e) => e.kind === 'token').length;
    const ruleN = selEntries.filter((e) => e.kind === 'rule').length;
    this.summaryEl.setText(`已选 ${this.selected.size} 项（令牌 ${tokN} / 规则 ${ruleN}）`);
  }

  /** 生成包 */
  private async handleGenerate(): Promise<void> {
    const name = this.nameInput?.value.trim() ?? '';
    if (!name) {
      new Notice('请输入包名称');
      return;
    }
    if (this.selected.size === 0) {
      new Notice('请至少选择一个资源');
      return;
    }

    const selEntries = this.entries.filter((e) => this.selected.has(e.id));
    const tokens: CustomTextColor[] = [];
    const rules: CustomRuleDef[] = [];

    for (const e of selEntries) {
      if (e.kind === 'token') {
        const src = this.plugin.settings.customTextColors.find((c) => c.id === e.id);
        if (src) tokens.push(structuredClone(src));
      } else {
        const def = ruleIdToDef(this.plugin, e.id);
        if (def) rules.push(def);
      }
    }

    if (tokens.length === 0 && rules.length === 0) {
      new Notice('无法提取所选资源的数据，生成中止');
      return;
    }

    const dirName = await findFreeDirName(this.plugin, sanitizeDirName(name));
    const manifest: PackageManifest = {
      packageId: dirName,
      name,
      tagColor: this.colorInput?.value ?? '#7c8aff',
      description: this.descInput?.value.trim() ?? '',
      version: '1.0.0',
      specVersion: PACKAGE_SPEC_VERSION,
      type: 'user',
      usageTag: this.usageInput?.value.trim() ?? '',
      previewSampleText: '',
      ruleOverrides: {},
    };

    try {
      await this.plugin.pkgManager.createPackage(manifest, tokens, rules);
      await this.plugin.saveSettings();
      await this.plugin.reloadPackages();
      this.plugin.refreshEditorExtensions();
      this.plugin.app.workspace.trigger('prompt-colorizer:custom-colors-changed');
      new Notice(`已生成包「${name}」（令牌 ${tokens.length} / 规则 ${rules.length}）`);
      this.close();
      this.onComplete?.(dirName);
    } catch (e) {
      new Notice(`生成失败: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

/** 目录名清理 */
function sanitizeDirName(name: string): string {
  const cleaned = name.replace(/[\\/:*?"<>|#^[\]]/g, '_').trim();
  return cleaned.length > 0 ? cleaned : 'new_pack';
}

/** 查找空闲目录名 */
async function findFreeDirName(plugin: PromptColorizer, base: string): Promise<string> {
  let candidate = base;
  let i = 2;
  while (await plugin.app.vault.adapter.exists(`packages/${candidate}`)) {
    candidate = `${base}_${i++}`;
  }
  return candidate;
}