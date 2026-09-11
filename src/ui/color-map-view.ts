/**
 * 颜色导图面板 — 右侧侧边栏自定义视图
 *
 * 左右分栏布局：左侧颜色规则列表（全局），右侧显示选中规则的匹配内容。
 * 两种检测范围：当前检测（活动 Markdown 文件）、全局检测（库内全部 Markdown 文件）。
 * 点击匹配项可跳转到对应位置（全局模式下自动打开来源文件）；
 * 拖拽匹配项可将文本拖入编辑器。
 */

import { ItemView, WorkspaceLeaf, MarkdownView, TFile, setIcon } from 'obsidian';
import type PromptColorizer from '../../main';
import type { RuleMatchResult } from '../rule-engine/types';
import {
  migrateEffects, normalizeGradientStops, gradientStopsToCss,
} from '../highlighter/effect-registry';
import { t } from '../utils/i18n';
import {
  COLOR_MAP_SECTIONS, classifyCssClass, computePackCoveredClasses,
  getTokenGroupsOfCategory, TOKEN_GROUP_BY_ID,
} from './color-map-groups';
import type { ColorMapSectionId } from './color-map-groups';
import {
  renderPackageTreeView,
  runScanAndClassify,
  runCleanupUnreferenced,
} from './color-map-package-view';
import { setPackageMode } from '../packages/package-actions';

/** DSL 规则效果特征（从 StyleRule 推导，用于导图标签展示） */
interface DslEffectInfo {
  tags: string[];
  gradientCss: string | null;
}

export const VIEW_TYPE_COLOR_MAP = 'prompt-colorizer-color-map';

/** 匹配项摘要最大字符数 */
const MAX_SNIPPET_LEN = 80;

/** 单组详情最多渲染条数 */
const MAX_ITEMS_PER_GROUP = 50;

/** 全局扫描批大小（每批让出主线程，避免 UI 冻结） */
const SCAN_BATCH = 20;

/** 检测范围 */
type ScanScope = 'current' | 'global';

/** 单条带来源的匹配 */
interface FileMatch {
  /** null 表示来自活动编辑器（当前检测） */
  file: TFile | null;
  /** 来源文件全文 */
  text: string;
  match: RuleMatchResult;
}

/** 分组数据 */
interface ColorGroup {
  cssClass: string;
  items: FileMatch[];
  isCustom: boolean;
  /** v4 分组：所属分区 ID */
  sectionId: ColorMapSectionId;
  /** v4 分组：词汇令牌组 ID（仅词汇分区） */
  tokenId: string | null;
}

export class ColorMapView extends ItemView {
  private plugin: PromptColorizer;
  private colorListEl: HTMLElement | null = null;
  private detailEl: HTMLElement | null = null;
  private searchInputEl: HTMLInputElement | null = null;
  private scanScope: ScanScope = 'current';
  private searchQuery = '';
  private selectedCssClass: string | null = null;
  private cachedGroups: ColorGroup[] = [];
  private refreshTimer: number | null = null;
  private isScanning = false;
  private scanGen = 0;
  /** 全局扫描命中的文件数 */
  private scannedFileCount = 0;
  /** 当前检测的目标文件（独立跟踪，不随面板聚焦而丢失） */
  private targetFile: TFile | null = null;
  /** 目标文件是否锁定（锁定后切换文档不再跟随） */
  private isLocked = false;
  private lockBtnEl: HTMLElement | null = null;
  /** 已折叠分区 ID 集合（持久化到 settings.colorMapCollapsed） */
  private collapsedSections: Set<string>;
  /** 包过滤条根元素（激活包变化时重建） */
  private packBarEl: HTMLElement | null = null;
  /** 包视图选中包（底部预览区联动） */
  private selectedPackageId: string | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: PromptColorizer) {
    super(leaf);
    this.plugin = plugin;
    this.collapsedSections = new Set(plugin.settings.colorMapCollapsed ?? []);
  }

  getViewType(): string { return VIEW_TYPE_COLOR_MAP; }
  getDisplayText(): string { return t('colorMap.title'); }
  getIcon(): string { return 'palette'; }

  async onOpen(): Promise<void> {
    this.render();
    this.registerEvent(
      this.app.workspace.on('active-leaf-change', (leaf) => {
        if (this.scanScope !== 'current' || this.isLocked) return;
        // 仅真实 Markdown 文档切换才跟随刷新；导图面板自身聚焦（leaf 为本视图）不触发
        const view = leaf?.view;
        if (view instanceof MarkdownView && view.file) {
          this.targetFile = view.file;
          this.scheduleRefresh();
        }
      })
    );
    this.registerEvent(
      this.app.workspace.on(
        'prompt-colorizer:custom-colors-changed' as never,
        () => this.scheduleRefresh()
      )
    );
  }

  async onClose(): Promise<void> {
    if (this.refreshTimer !== null) {
      window.clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private scheduleRefresh(): void {
    if (this.refreshTimer !== null) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = null;
      if (this.getViewMode() === 'package') {
        // 包视图：包/令牌数据变化后整树重绘
        this.render();
      } else {
        void this.refreshAll();
      }
    }, 200);
  }

  private analyzeDslEffect(cssClass: string): DslEffectInfo {
    const style = this.plugin.getStyleRuleByCssClass(cssClass);
    const info: DslEffectInfo = { tags: [], gradientCss: null };
    if (!style) return info;

    if (style.backgroundImage && /gradient\(/.test(style.backgroundImage)) {
      info.gradientCss = style.backgroundImage;
      const multiStop = (style.backgroundImage.match(/\d+%/g) || []).length >= 3;
      info.tags.push(multiStop ? t('colorMap.multiColorLabel') : t('colorMap.gradientLabel'));
    }
    if (style.textShadow || style.boxShadow) info.tags.push(t('colorMap.glowLabel'));
    if (style.animation) info.tags.push(t('colorMap.animationLabel'));
    if (style.hover) info.tags.push(t('colorMap.hoverLabel'));
    if (style.textStroke || style.textFillColor) info.tags.push(t('customText.effectName_outline'));
    if (style.textDecoration) info.tags.push(t('customText.effectName_' + this.textDecorationToEffect(style.textDecoration)));
    if (style.fontWeight === 'bold' || style.fontWeight === '700' || style.fontWeight === '800') {
      info.tags.push(t('customText.effectName_bold'));
    }
    if (style.fontStyle === 'italic') info.tags.push(t('customText.effectName_italic'));
    if (style.fontFamily && /mono/i.test(style.fontFamily)) {
      info.tags.push(t('customText.effectName_mono'));
    }
    return info;
  }

  private textDecorationToEffect(td: string): string {
    if (td.includes('line-through')) return 'strikethrough';
    if (td.includes('wavy')) return 'wavy';
    if (td.includes('dashed') || td.includes('dotted')) return 'dashed';
    if (td.includes('underline')) return 'underline';
    return 'underline';
  }

  private paintColorDot(dot: HTMLElement, cssClass: string): void {
    const custom = this.plugin.getCustomTextColorByCssClass(cssClass);
    if (custom) {
      const stops = normalizeGradientStops(custom.gradientStops);
      const stopsCss = gradientStopsToCss(stops);
      if (stopsCss) {
        dot.style.background = `linear-gradient(135deg, ${stopsCss})`;
      } else if (custom.color2 && custom.color2 !== custom.color) {
        dot.style.background = `linear-gradient(135deg, ${custom.color}, ${custom.color2})`;
      } else {
        dot.style.background = custom.color;
      }
      return;
    }
    const dslInfo = this.analyzeDslEffect(cssClass);
    if (dslInfo.gradientCss) {
      dot.style.background = dslInfo.gradientCss;
      return;
    }
    const colorValue = this.plugin.getColorByCssClass(cssClass);
    if (colorValue) {
      dot.style.background = colorValue;
    } else {
      dot.addClass('is-empty');
    }
  }

  private getDisplayLabel(cssClass: string): string {
    const custom = this.plugin.getCustomTextColorByCssClass(cssClass);
    if (custom && custom.text) {
      const text = custom.text;
      return text.length > 24 ? text.slice(0, 24) + '…' : text;
    }
    return cssClass;
  }

  private renderEffectTags(parent: HTMLElement, cssClass: string): void {
    const custom = this.plugin.getCustomTextColorByCssClass(cssClass);
    let tags: string[] = [];
    if (custom) {
      tags = migrateEffects(custom).map((eff) => t(`customText.effectName_${eff}`));
    } else {
      tags = this.analyzeDslEffect(cssClass).tags;
    }
    if (tags.length === 0) return;
    const tagsEl = parent.createDiv({ cls: 'pc-cm-effect-tags' });
    for (const tag of tags) {
      tagsEl.createSpan({ cls: 'pc-cm-effect-tag', text: tag });
    }
  }

  /** 渲染整个面板 */
  private render(): void {
    const c = this.contentEl;
    c.empty();
    c.addClass('pc-color-map-panel');

    this.renderToolbar(c);

    // 包视图（v5 默认）：包树 + 底部预览区，不走匹配检测链路
    if (this.getViewMode() === 'package') {
      const treeWrap = c.createDiv({ cls: 'pc-cm-package-wrap' });
      renderPackageTreeView(treeWrap, this.plugin, {
        searchQuery: this.searchQuery,
        selectedPackageId: this.selectedPackageId,
        onSelectPackage: (dirName) => {
          this.selectedPackageId = dirName;
          this.render();
        },
      });
      return;
    }

    this.renderPackBar(c);
    this.renderSearchBox(c);

    const splitEl = c.createDiv({ cls: 'pc-cm-split' });
    this.colorListEl = splitEl.createDiv({ cls: 'pc-cm-color-list' });
    this.detailEl = splitEl.createDiv({ cls: 'pc-cm-detail' });

    void this.refreshAll();
  }

  /** 当前视图模式（settings 持久化） */
  private getViewMode(): 'package' | 'category' {
    return this.plugin.settings.colorMapViewMode === 'category' ? 'category' : 'package';
  }

  /** 提示词包条：显示激活包 + 「只看此包」过滤开关 */
  private renderPackBar(parent: HTMLElement): void {
    const pack = this.getActivePack();
    if (this.packBarEl) this.packBarEl.remove();
    this.packBarEl = null;
    if (!pack) return;

    const bar = parent.createDiv({ cls: 'pc-cm-pack-bar' });
    this.packBarEl = bar;

    const iconEl = bar.createDiv({ cls: 'pc-cm-pack-icon' });
    iconEl.setText(pack.icon || '📦');

    const nameEl = bar.createDiv({ cls: 'pc-cm-pack-name' });
    nameEl.setText(pack.name);
    nameEl.setAttribute('title', pack.description || pack.name);

    const filterBtn = bar.createEl('button', { cls: 'pc-cm-pack-filter-btn' });
    const syncBtn = () => {
      const active = this.plugin.settings.colorMapPackFilter;
      filterBtn.toggleClass('is-active', active);
      filterBtn.setAttribute('aria-label', active ? t('colorMap.packFilterOn') : t('colorMap.packFilterOff'));
      filterBtn.setText(active ? t('colorMap.packFilterOn') : t('colorMap.packFilterOff'));
    };
    syncBtn();
    filterBtn.addEventListener('click', () => {
      this.plugin.settings.colorMapPackFilter = !this.plugin.settings.colorMapPackFilter;
      void this.plugin.saveSettings();
      syncBtn();
      this.refreshColorList();
      this.refreshDetail();
    });
  }

  /** 工具栏：视图切换 + 锁定 + 刷新（+包视图专属：模式/扫描/清理） */
  private renderToolbar(parent: HTMLElement): void {
    const toolbar = parent.createDiv({ cls: 'pc-cm-toolbar' });

    // 视图切换：包视图 / 分类视图
    const isPkgView = this.getViewMode() === 'package';
    const viewBtn = toolbar.createEl('button', { cls: 'pc-cm-btn pc-cm-view-btn' });
    setIcon(viewBtn, isPkgView ? 'folder-tree' : 'list');
    viewBtn.setAttribute('aria-label', isPkgView ? t('colorMap.switchToCategory') : t('colorMap.switchToPackage'));
    viewBtn.addEventListener('click', () => {
      this.plugin.settings.colorMapViewMode = isPkgView ? 'category' : 'package';
      void this.plugin.saveSettings();
      this.render();
    });

    if (isPkgView) {
      // 导入 .stylepkg
      const importBtn = toolbar.createEl('button', { cls: 'pc-cm-btn' });
      setIcon(importBtn, 'import');
      importBtn.setAttribute('aria-label', t('colorMap.importPkg'));
      importBtn.addEventListener('click', () => {
        void import('../packages/pkg-io').then((m) => m.importStylePkg(this.plugin));
      });

      // 单选/叠加模式切换
      const modeToggle = toolbar.createDiv({ cls: 'pc-cm-mode-toggle' });
      const singleBtn = modeToggle.createEl('button', { cls: 'pc-cm-mode-btn' });
      singleBtn.setText(t('colorMap.modeSingle'));
      const multiBtn = modeToggle.createEl('button', { cls: 'pc-cm-mode-btn' });
      multiBtn.setText(t('colorMap.modeMulti'));
      const syncMode = () => {
        singleBtn.classList.toggle('is-active', this.plugin.settings.packageMode !== 'multi');
        multiBtn.classList.toggle('is-active', this.plugin.settings.packageMode === 'multi');
      };
      syncMode();
      singleBtn.addEventListener('click', () => {
        if (this.plugin.settings.packageMode !== 'single') {
          void setPackageMode(this.plugin, 'single').then(() => {
            syncMode();
            this.render();
          });
        }
      });
      multiBtn.addEventListener('click', () => {
        if (this.plugin.settings.packageMode !== 'multi') {
          void setPackageMode(this.plugin, 'multi').then(() => {
            syncMode();
            this.render();
          });
        }
      });

      // 扫描并归类资源
      const scanBtn = toolbar.createEl('button', { cls: 'pc-cm-btn' });
      setIcon(scanBtn, 'scan-search');
      scanBtn.setAttribute('aria-label', t('colorMap.scanClassify'));
      scanBtn.addEventListener('click', () => runScanAndClassify(this.plugin));

      // 清理未引用资源
      const cleanBtn = toolbar.createEl('button', { cls: 'pc-cm-btn' });
      setIcon(cleanBtn, 'eraser');
      cleanBtn.setAttribute('aria-label', t('colorMap.cleanupUnreferenced'));
      cleanBtn.addEventListener('click', () => runCleanupUnreferenced(this.plugin));
    }

    if (!isPkgView) {
      const lockBtn = toolbar.createEl('button', { cls: 'pc-cm-btn' });
      lockBtn.setAttribute('aria-label', t('colorMap.lockHint'));
      lockBtn.addEventListener('click', () => {
        if (this.scanScope !== 'current') return;
        // 首次锁定：以当前目标文件为锁定对象
        if (!this.isLocked && !this.targetFile) return;
        this.isLocked = !this.isLocked;
        this.syncLockBtn();
      });
      this.lockBtnEl = lockBtn;
      this.syncLockBtn();
    }

    const refreshBtn = toolbar.createEl('button', { cls: 'pc-cm-btn' });
    refreshBtn.setAttribute('aria-label', t('colorMap.refresh'));
    setIcon(refreshBtn, 'refresh-cw');
    refreshBtn.addEventListener('click', () => {
      if (isPkgView) this.render();
      else void this.refreshAll();
    });
  }

  /** 同步锁定按钮图标与样式 */
  private syncLockBtn(): void {
    if (!this.lockBtnEl) return;
    setIcon(this.lockBtnEl, this.isLocked ? 'lock' : 'lock-open');
    this.lockBtnEl.toggleClass('is-active', this.isLocked);
    this.lockBtnEl.setAttribute(
      'aria-label',
      this.isLocked ? t('colorMap.unlock') : t('colorMap.lockHint')
    );
  }

  /** 范围切换 + 搜索输入（统一按匹配文本过滤） */
  private renderSearchBox(parent: HTMLElement): void {
    const box = parent.createDiv({ cls: 'pc-cm-search' });

    const scopeToggle = box.createDiv({ cls: 'pc-cm-mode-toggle' });
    const currentBtn = scopeToggle.createEl('button', { cls: 'pc-cm-mode-btn' });
    currentBtn.setText(t('colorMap.scopeCurrent'));
    const globalBtn = scopeToggle.createEl('button', { cls: 'pc-cm-mode-btn' });
    globalBtn.setText(t('colorMap.scopeGlobal'));

    const syncScope = () => {
      currentBtn.classList.toggle('is-active', this.scanScope === 'current');
      globalBtn.classList.toggle('is-active', this.scanScope === 'global');
      if (this.searchInputEl) {
        this.searchInputEl.setAttribute('placeholder',
          this.scanScope === 'global'
            ? t('colorMap.searchPlaceholderGlobal')
            : t('colorMap.searchPlaceholderCurrent'));
      }
    };
    syncScope();

    currentBtn.addEventListener('click', () => {
      if (this.scanScope !== 'current') {
        this.scanScope = 'current';
        syncScope();
        void this.refreshAll();
      }
    });
    globalBtn.addEventListener('click', () => {
      if (this.scanScope !== 'global') {
        this.scanScope = 'global';
        this.isLocked = false;
        this.syncLockBtn();
        syncScope();
        void this.refreshAll();
      }
    });

    const inputWrap = box.createDiv({ cls: 'pc-cm-search-wrap' });
    const searchIcon = inputWrap.createDiv({ cls: 'pc-cm-search-icon' });
    setIcon(searchIcon, 'search');
    const input = inputWrap.createEl('input', {
      cls: 'pc-cm-search-input',
      attr: { type: 'text' },
    });
    this.searchInputEl = input;
    input.value = this.searchQuery;
    input.addEventListener('input', () => {
      this.searchQuery = input.value;
      this.refreshColorList();
      this.refreshDetail();
    });
  }

  /** 当前检测：目标文件（面板自身聚焦后活动视图不再是 MarkdownView，故独立跟踪） */
  private async collectCurrentGroups(): Promise<ColorGroup[]> {
    const customColors = this.plugin.settings.customTextColors ?? [];
    const file = this.resolveTargetFile();
    if (!file) {
      this.targetFile = null;
      return this.buildGroups(customColors, new Map());
    }
    this.targetFile = file;

    const text = await this.readTargetText(file);
    const allMatches = text ? this.plugin.getAllMatches(text) : [];
    const matchMap = this.groupMatches(allMatches, (m) => ({ file, text, match: m }));
    return this.buildGroups(customColors, matchMap);
  }

  /** 解析当前检测的目标文件：锁定 → 锁定文件；否则最近打开过的 md 文档 */
  private resolveTargetFile(): TFile | null {
    if (this.isLocked && this.targetFile) return this.targetFile;

    const active = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (active?.file) return active.file;

    // 活动视图非 md（如导图面板自身/搜索）：用最近一次记录的 md 文档
    if (this.targetFile) {
      const existing = this.app.vault.getAbstractFileByPath(this.targetFile.path);
      if (existing instanceof TFile && existing.extension === 'md') return existing;
    }

    // 兜底：任一已打开的 Markdown 视图
    for (const leaf of this.app.workspace.getLeavesOfType('markdown')) {
      const view = leaf.view;
      if (view instanceof MarkdownView && view.file) return view.file;
    }
    return null;
  }

  /** 读取目标文件文本：已打开则用编辑器实时内容（含未保存修改），否则读磁盘 */
  private async readTargetText(file: TFile): Promise<string> {
    for (const leaf of this.app.workspace.getLeavesOfType('markdown')) {
      const view = leaf.view;
      if (view instanceof MarkdownView && view.file?.path === file.path) {
        try {
          return view.editor.getValue();
        } catch {
          break;
        }
      }
    }
    try {
      return await this.app.vault.cachedRead(file);
    } catch {
      return '';
    }
  }

  /** 全局检测：库内全部 Markdown 文件 */
  private async collectGlobalGroups(): Promise<ColorGroup[]> {
    const customColors = this.plugin.settings.customTextColors ?? [];
    const files = this.app.vault.getMarkdownFiles();
    const matchMap = new Map<string, FileMatch[]>();
    const fileSet = new Set<string>();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const text = await this.app.vault.cachedRead(file);
        for (const m of this.plugin.getAllMatches(text)) {
          let arr = matchMap.get(m.cssClass);
          if (!arr) {
            arr = [];
            matchMap.set(m.cssClass, arr);
          }
          arr.push({ file, text, match: m });
          fileSet.add(file.path);
        }
      } catch {
        // 单文件读取失败跳过
      }
      if ((i + 1) % SCAN_BATCH === 0) {
        await new Promise<void>((r) => setTimeout(r, 0));
      }
    }

    this.scannedFileCount = fileSet.size;
    return this.buildGroups(customColors, matchMap);
  }

  private groupMatches(
    matches: RuleMatchResult[],
    wrap: (m: RuleMatchResult) => FileMatch
  ): Map<string, FileMatch[]> {
    const matchMap = new Map<string, FileMatch[]>();
    for (const m of matches) {
      let arr = matchMap.get(m.cssClass);
      if (!arr) {
        arr = [];
        matchMap.set(m.cssClass, arr);
      }
      arr.push(wrap(m));
    }
    return matchMap;
  }

  /** 组装分组：全部启用的自定义规则 + 命中过的内置规则（v4 带分区标注） */
  private buildGroups(
    customColors: Array<{ id: string; enabled?: boolean; text?: string }>,
    matchMap: Map<string, FileMatch[]>
  ): ColorGroup[] {
    const groups: ColorGroup[] = [];
    for (const c of customColors) {
      if (!c.enabled) continue;
      const cssClass = `dsl-custom-text-${c.id}`;
      groups.push({ cssClass, items: matchMap.get(cssClass) ?? [], isCustom: true, ...classifyCssClass(cssClass) });
    }
    for (const [cssClass, items] of matchMap.entries()) {
      if (!cssClass.startsWith('dsl-custom-text-')) {
        groups.push({ cssClass, items, isCustom: false, ...classifyCssClass(cssClass) });
      }
    }
    // 分区间固定语义顺序（COLOR_MAP_SECTIONS 顺序），同分区内按匹配数降序
    const sectionOrder = new Map<string, number>(
      COLOR_MAP_SECTIONS.map((s, i) => [s.id as string, i])
    );
    return groups.sort((a, b) => {
      const si = sectionOrder.get(a.sectionId) ?? 99;
      const bi = sectionOrder.get(b.sectionId) ?? 99;
      if (si !== bi) return si - bi;
      return b.items.length - a.items.length;
    });
  }

  /** 当前激活的提示词包（无激活/包已删除返回 null） */
  private getActivePack(): { id: string; name: string; icon: string; description?: string; enabledKeys: string[]; vocabTokens: string[] } | null {
    const { promptPacks, activePackId } = this.plugin.settings;
    if (!activePackId || !promptPacks) return null;
    return promptPacks.find((p) => p && p.id === activePackId) ?? null;
  }

  /** 包过滤生效时：仅保留激活包覆盖的规则类（自定义区不受包控制） */
  private filterByPack(groups: ColorGroup[]): ColorGroup[] {
    if (!this.plugin.settings.colorMapPackFilter) return groups;
    const pack = this.getActivePack();
    const covered = computePackCoveredClasses(pack);
    if (!covered) return groups;
    return groups.filter((g) => g.sectionId === 'custom' || covered.has(g.cssClass));
  }

  private getFilteredGroups(): ColorGroup[] {
    let groups = this.filterByPack(this.cachedGroups);
    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      groups = groups.filter(({ items }) =>
        items.some((fm) => fm.text.slice(fm.match.from, fm.match.to).toLowerCase().includes(q))
      );
    }
    return groups;
  }

  /** 刷新全部数据 */
  private async refreshAll(): Promise<void> {
    if (!this.plugin.settings.editorHighlightEnabled) {
      this.renderRichEmpty(this.colorListEl, 'alert-circle', t('colorMap.highlightDisabled'), '');
      this.renderRichEmpty(this.detailEl, '', '', '');
      this.cachedGroups = [];
      this.scannedFileCount = 0;
      return;
    }

    if (this.scanScope === 'global') {
      const gen = ++this.scanGen;
      this.isScanning = true;
      this.renderScanningState();
      try {
        const groups = await this.collectGlobalGroups();
        if (gen !== this.scanGen) return;
        this.cachedGroups = groups;
      } catch {
        if (gen !== this.scanGen) return;
        this.cachedGroups = [];
      } finally {
        if (gen === this.scanGen) this.isScanning = false;
      }
    } else {
      const gen = ++this.scanGen;
      try {
        const groups = await this.collectCurrentGroups();
        if (gen !== this.scanGen) return;
        this.cachedGroups = groups;
      } catch {
        if (gen !== this.scanGen) return;
        this.cachedGroups = [];
      }
      this.scannedFileCount = 0;
    }

    if (this.cachedGroups.length === 0) {
      if (this.scanScope === 'global') {
        this.renderRichEmpty(this.colorListEl, 'palette', t('colorMap.globalEmptyTitle'), t('colorMap.globalEmptyDesc'));
      } else if (!this.targetFile) {
        this.renderRichEmpty(this.colorListEl, 'file-text', t('colorMap.noDocTitle'), t('colorMap.noDocDesc'));
      } else {
        this.renderRichEmpty(this.colorListEl, 'palette', t('colorMap.emptyTitle'), t('colorMap.emptyDesc'));
      }
      this.renderRichEmpty(this.detailEl, '', '', '');
      return;
    }

    if (this.selectedCssClass && !this.cachedGroups.some((g) => g.cssClass === this.selectedCssClass)) {
      this.selectedCssClass = null;
    }
    if (!this.selectedCssClass) {
      this.selectedCssClass = this.cachedGroups[0].cssClass;
    }

    this.refreshColorList();
    this.refreshDetail();
  }

  /** 扫描中的过渡状态 */
  private renderScanningState(): void {
    this.renderRichEmpty(
      this.colorListEl, 'loader', t('colorMap.scanning'), '', true
    );
    this.renderRichEmpty(this.detailEl, '', '', '');
  }

  /** 刷新左侧颜色列表 */
  private refreshColorList(): void {
    if (!this.colorListEl) return;
    const list = this.colorListEl;
    list.empty();

    const filtered = this.getFilteredGroups();

    // 仅显示有命中的项（空组严格隐藏）
    const withMatches = filtered.filter((g) => g.items.length > 0);
    const totalMatches = withMatches.reduce((sum, g) => sum + g.items.length, 0);
    const totalRules = withMatches.length;
    const statusBar = list.createDiv({ cls: 'pc-cm-status' });

    // 当前检测：首格显示目标文件徽标
    if (this.scanScope === 'current' && this.targetFile) {
      const badge = statusBar.createSpan({ cls: 'pc-cm-status-file' });
      setIcon(badge, 'file-text');
      const name = this.targetFile.basename;
      const label = name.length > 14 ? name.slice(0, 14) + '…' : name;
      badge.createSpan({ text: label });
      badge.setAttribute('title', this.targetFile.path);
      statusBar.createSpan({ cls: 'pc-cm-status-sep', text: '·' });
    }

    statusBar.createSpan({ cls: 'pc-cm-status-rules', text: t('colorMap.rulesCount').replace('{n}', String(totalRules)) });
    statusBar.createSpan({ cls: 'pc-cm-status-sep', text: '·' });
    statusBar.createSpan({ cls: 'pc-cm-status-matches', text: t('colorMap.totalMatches').replace('{n}', String(totalMatches)) });
    if (this.scanScope === 'global' && this.scannedFileCount > 0) {
      statusBar.createSpan({ cls: 'pc-cm-status-sep', text: '·' });
      statusBar.createSpan({
        cls: 'pc-cm-status-files',
        text: t('colorMap.filesCount').replace('{n}', String(this.scannedFileCount)),
      });
    }

    if (filtered.length === 0) {
      this.renderRichEmpty(list, 'search', t('colorMap.noResults'), '');
      return;
    }

    this.renderSectionedGroups(list, withMatches);
  }

  /**
   * v4 分区渲染：按固定语义顺序渲染分区（可折叠），
   * 词汇分区内再按令牌组子头分层（单子组自动拍平）
   */
  private renderSectionedGroups(list: HTMLElement, groups: ColorGroup[]): void {
    const searching = this.searchQuery.trim().length > 0;

    for (const section of COLOR_MAP_SECTIONS) {
      const sectionGroups = groups.filter((g) => g.sectionId === section.id);
      if (sectionGroups.length === 0) continue;

      const selectedInSection = sectionGroups.some((g) => g.cssClass === this.selectedCssClass);
      const collapsed = !searching && !selectedInSection && this.collapsedSections.has(section.id);
      const sectionTotal = sectionGroups.reduce((sum, g) => sum + g.items.length, 0);

      const sectionEl = list.createDiv({ cls: 'pc-cm-section' });
      const headerEl = sectionEl.createDiv({ cls: 'pc-cm-section-header' });
      if (collapsed) sectionEl.addClass('is-collapsed');

      const chevron = headerEl.createSpan({ cls: 'pc-cm-section-chevron' });
      setIcon(chevron, 'chevron-down');
      const iconEl = headerEl.createSpan({ cls: 'pc-cm-section-icon' });
      setIcon(iconEl, section.icon);
      headerEl.createSpan({ cls: 'pc-cm-section-name', text: t(section.nameKey) });
      headerEl.createSpan({ cls: 'pc-cm-section-count', text: String(sectionTotal) });

      headerEl.addEventListener('click', () => {
        this.toggleSection(section.id);
      });

      if (collapsed) continue;
      const bodyEl = sectionEl.createDiv({ cls: 'pc-cm-section-body' });

      if (section.vocabCategoryId) {
        // 词汇分区：按令牌组子头分层，单子组自动拍平
        const tokenOrder = getTokenGroupsOfCategory(section.vocabCategoryId).map((g) => g.id);
        const buckets = new Map<string, ColorGroup[]>();
        for (const g of sectionGroups) {
          const key = g.tokenId ?? '';
          let arr = buckets.get(key);
          if (!arr) { arr = []; buckets.set(key, arr); }
          arr.push(g);
        }
        const orderedKeys = [
          ...tokenOrder.filter((id) => buckets.has(id)),
          ...[...buckets.keys()].filter((id) => !tokenOrder.includes(id) && id !== ''),
        ];
        const flatten = orderedKeys.length <= 1;
        for (const tokenId of orderedKeys) {
          const bucket = buckets.get(tokenId) ?? [];
          const groupDef = TOKEN_GROUP_BY_ID[tokenId];
          if (!flatten && groupDef) {
            const subEl = bodyEl.createDiv({ cls: 'pc-cm-token-sub' });
            const subTotal = bucket.reduce((sum, g) => sum + g.items.length, 0);
            subEl.createSpan({ cls: 'pc-cm-token-sub-name', text: t(groupDef.nameKey) });
            subEl.createSpan({ cls: 'pc-cm-token-sub-count', text: String(subTotal) });
          }
          for (const g of bucket) this.renderColorItem(bodyEl, g);
        }
      } else {
        for (const g of sectionGroups) this.renderColorItem(bodyEl, g);
      }
    }
  }

  /** 切换分区折叠并持久化到设置 */
  private toggleSection(sectionId: ColorMapSectionId): void {
    if (this.collapsedSections.has(sectionId)) {
      this.collapsedSections.delete(sectionId);
    } else {
      this.collapsedSections.add(sectionId);
    }
    this.plugin.settings.colorMapCollapsed = [...this.collapsedSections];
    void this.plugin.saveSettings();
    this.refreshColorList();
  }

  private renderColorItem(parent: HTMLElement, group: ColorGroup): void {
    const { cssClass, isCustom } = group;
    const count = group.items.length;
    const isSelected = cssClass === this.selectedCssClass;
    const hasMatch = count > 0;
    const itemEl = parent.createDiv({ cls: 'pc-cm-color-item' });
    if (isSelected) itemEl.addClass('is-selected');
    if (!hasMatch) itemEl.addClass('is-dim');

    itemEl.createDiv({ cls: 'pc-cm-color-bar' });

    const dot = itemEl.createDiv({ cls: 'pc-cm-color-dot' });
    this.paintColorDot(dot, cssClass);

    const nameCol = itemEl.createDiv({ cls: 'pc-cm-color-name-col' });
    const nameRow = nameCol.createDiv({ cls: 'pc-cm-color-name-row' });
    nameRow.createDiv({ cls: 'pc-cm-color-name' }).setText(this.getDisplayLabel(cssClass));

    const typeTag = nameRow.createSpan({ cls: 'pc-cm-type-tag' });
    typeTag.setText(isCustom ? t('colorMap.customTag') : t('colorMap.builtinTag'));

    this.renderEffectTags(nameCol, cssClass);

    const countEl = itemEl.createDiv({ cls: 'pc-cm-count' });
    countEl.setText(String(count));
    if (hasMatch) countEl.addClass('has-match');

    itemEl.addEventListener('click', () => {
      this.selectedCssClass = cssClass;
      this.refreshColorList();
      this.refreshDetail();
    });
  }

  private refreshDetail(): void {
    if (!this.detailEl) return;
    const detail = this.detailEl;
    detail.empty();

    if (!this.selectedCssClass) {
      this.renderRichEmpty(detail, '', '', '');
      return;
    }

    const group = this.cachedGroups.find((g) => g.cssClass === this.selectedCssClass);
    if (!group) {
      this.renderRichEmpty(detail, '', '', '');
      return;
    }

    if (this.scanScope === 'current' && !this.resolveTargetFile()) {
      this.renderRichEmpty(detail, 'file-text', t('colorMap.noDocTitle'), t('colorMap.noDocDesc'));
      return;
    }

    const header = detail.createDiv({ cls: 'pc-cm-detail-header' });
    const dot = header.createDiv({ cls: 'pc-cm-color-dot' });
    this.paintColorDot(dot, group.cssClass);
    const titleCol = header.createDiv({ cls: 'pc-cm-color-name-col' });
    const titleRow = titleCol.createDiv({ cls: 'pc-cm-color-name-row' });
    titleRow.createDiv({ cls: 'pc-cm-detail-title' }).setText(this.getDisplayLabel(group.cssClass));
    const typeTag = titleRow.createSpan({ cls: 'pc-cm-type-tag' });
    typeTag.setText(group.isCustom ? t('colorMap.customTag') : t('colorMap.builtinTag'));
    this.renderEffectTags(titleCol, group.cssClass);
    const countEl = header.createDiv({ cls: 'pc-cm-count' });
    countEl.setText(String(group.items.length));
    if (group.items.length > 0) countEl.addClass('has-match');

    const custom = this.plugin.getCustomTextColorByCssClass(group.cssClass);
    if (custom) {
      const stops = normalizeGradientStops(custom.gradientStops);
      const stopsCss = gradientStopsToCss(stops);
      if (stopsCss) {
        const band = detail.createDiv({ cls: 'pc-cm-gradient-band-wrap' });
        const bar = band.createDiv({ cls: 'pc-cm-gradient-band' });
        const angle = custom.gradientAngle ?? 135;
        bar.style.background = `linear-gradient(${angle}deg, ${stopsCss})`;
        const meta = band.createSpan({ cls: 'pc-cm-gradient-meta' });
        meta.setText(`${stops.length} ${t('customText.gradientStopCount')} · ${angle}°`);
      }
    } else {
      const dslInfo = this.analyzeDslEffect(group.cssClass);
      if (dslInfo.gradientCss) {
        const band = detail.createDiv({ cls: 'pc-cm-gradient-band-wrap' });
        band.createDiv({ cls: 'pc-cm-gradient-band' }).style.background = dslInfo.gradientCss;
        const meta = band.createSpan({ cls: 'pc-cm-gradient-meta' });
        meta.setText(t('colorMap.gradientLabel'));
      }
    }

    const q = this.searchQuery.trim().toLowerCase();
    const filteredItems = q
      ? group.items.filter((fm) => fm.text.slice(fm.match.from, fm.match.to).toLowerCase().includes(q))
      : group.items;

    const listEl = detail.createDiv({ cls: 'pc-cm-detail-list' });

    if (filteredItems.length === 0) {
      this.renderRichEmpty(listEl, 'circle-slash', t('colorMap.noMatchTitle'), t('colorMap.noMatchDesc'));
      return;
    }

    const shown = filteredItems.slice(0, MAX_ITEMS_PER_GROUP);
    for (let i = 0; i < shown.length; i++) {
      this.renderMatchItem(listEl, shown[i], i + 1);
    }

    if (filteredItems.length > MAX_ITEMS_PER_GROUP) {
      const tip = listEl.createDiv({ cls: 'pc-cm-truncated-tip' });
      tip.setText(t('colorMap.truncatedTip').replace('{n}', String(MAX_ITEMS_PER_GROUP)));
    }

    const hint = detail.createDiv({ cls: 'pc-cm-drag-hint' });
    const hintIcon = hint.createDiv({ cls: 'pc-cm-drag-hint-icon' });
    setIcon(hintIcon, 'grab-horizontal');
    hint.createSpan({ text: t('colorMap.dragHint') });
  }

  private renderMatchItem(parent: HTMLElement, fm: FileMatch, index: number): void {
    const snippet = fm.text.slice(fm.match.from, fm.match.to);
    const display = snippet.length > MAX_SNIPPET_LEN
      ? snippet.slice(0, MAX_SNIPPET_LEN) + '…'
      : snippet;

    const isExternal = this.scanScope === 'global' && !!fm.file;
    const itemEl = parent.createDiv({ cls: 'pc-cm-item' });
    if (isExternal) itemEl.addClass('has-file');

    const idxEl = itemEl.createSpan({ cls: 'pc-cm-item-idx' });
    idxEl.setText(String(index));

    const textEl = itemEl.createDiv({ cls: 'pc-cm-item-text' });
    const span = textEl.createSpan({ cls: fm.match.cssClass });
    span.setText(display);
    span.setAttribute('title', snippet);

    if (isExternal && fm.file) {
      const fileEl = itemEl.createSpan({ cls: 'pc-cm-item-file' });
      fileEl.setText(fm.file.basename);
      fileEl.setAttribute('title', fm.file.path);
      itemEl.setAttribute('title', t('colorMap.jumpFileHint'));
    }

    const line = this.lineOf(fm.text, fm.match.from);
    const lineEl = itemEl.createSpan({ cls: 'pc-cm-item-line' });
    lineEl.setText(`${t('colorMap.lineLabel')}${line}`);

    itemEl.draggable = true;
    itemEl.addEventListener('dragstart', (ev) => {
      ev.dataTransfer?.setData('text/plain', snippet);
      ev.dataTransfer?.setDragImage(itemEl, 0, 0);
      itemEl.addClass('is-dragging');
    });
    itemEl.addEventListener('dragend', () => itemEl.removeClass('is-dragging'));

    itemEl.addEventListener('click', () => void this.jumpToMatch(fm));
  }

  /** 按字符偏移计算 1 起始行号 */
  private lineOf(text: string, offset: number): number {
    const end = Math.min(offset, text.length);
    let line = 1;
    for (let i = 0; i < end; i++) {
      if (text.charCodeAt(i) === 10) line++;
    }
    return line;
  }

  /** 跳转：点击匹配项定位到编辑器（当前/全局统一逻辑） */
  private async jumpToMatch(fm: FileMatch): Promise<void> {
    const file = this.scanScope === 'current' ? this.resolveTargetFile() : fm.file;
    if (!file) return;

    const active = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!active || active.file?.path !== file.path) {
      const leaf = this.app.workspace.getLeaf(false);
      try {
        await leaf.openFile(file);
      } catch {
        return;
      }
      await new Promise<void>((r) => setTimeout(r, 30));
    }

    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) return;
    const editor = view.editor;
    const fromPos = editor.offsetToPos(fm.match.from);
    const toPos = editor.offsetToPos(fm.match.to);
    editor.setSelection(fromPos, toPos);
    editor.scrollIntoView({ from: fromPos, to: toPos }, true);
    view.editor.focus();
  }

  /** 渲染富空状态（图标 + 标题 + 描述） */
  private renderRichEmpty(
    el: HTMLElement | null, icon: string, title: string, desc: string, spin = false
  ): void {
    if (!el) return;
    el.empty();
    if (!title && !desc) return;
    const wrap = el.createDiv({ cls: 'pc-cm-rich-empty' });
    if (icon) {
      const iconEl = wrap.createDiv({ cls: 'pc-cm-rich-empty-icon' });
      if (spin) iconEl.addClass('is-spin');
      setIcon(iconEl, icon);
    }
    if (title) wrap.createDiv({ cls: 'pc-cm-rich-empty-title' }).setText(title);
    if (desc) wrap.createDiv({ cls: 'pc-cm-rich-empty-desc' }).setText(desc);
  }

  refresh(): void {
    if (this.getViewMode() === 'package') {
      this.render();
    } else {
      void this.refreshAll();
    }
  }
}

/**
 * 激活颜色导图面板（在右侧侧边栏打开）
 */
export async function activateColorMapView(app: import('obsidian').App): Promise<void> {
  const { workspace } = app;
  let leaf = workspace.getLeavesOfType(VIEW_TYPE_COLOR_MAP)[0];
  if (!leaf) {
    const rightLeaf = workspace.getRightLeaf(false);
    if (!rightLeaf) return;
    leaf = rightLeaf;
    await leaf.setViewState({ type: VIEW_TYPE_COLOR_MAP, active: true });
  }
  workspace.revealLeaf(leaf);
}
