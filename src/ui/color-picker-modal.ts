/**
 * 自定义文本颜色选择器模态框
 *
 * 功能：
 * - 用户选中编辑器中的文本后调用此模态框
 * - 提供 12 个标准预设色板（覆盖常用色相）
 * - 支持自定义颜色选择器（HTML color input）
 * - 可配置：是否区分大小写、是否全字匹配
 * - 实时预览选中文本 + 当前颜色的效果
 * - Apple 极简风格：毛玻璃卡片、微妙阴影、留白充足
 */

import { App, Modal, Setting, ButtonComponent } from 'obsidian';
import type { CustomTextColor, CustomColorEffect, GradientStop } from '../types';
import { t } from '../utils/i18n';
import {
  COMPOSABLE_EFFECTS, mergeEffectDeclarations, migrateEffects,
  applyGradient, isValidHexColor, normalizeGradientStops, gradientStopsToCss,
  reconcileOutline, EFFECT_MAP, defaultEffectParams,
} from '../highlighter/effect-registry';
import type { EffectParams, EffectParam } from '../highlighter/effect-registry';


/** 标准预设色板（12 个，覆盖常用色相） */
export const PRESET_COLORS: { name: string; value: string }[] = [
  { name: '红', value: '#ef4444' },
  { name: '橙', value: '#f97316' },
  { name: '黄', value: '#eab308' },
  { name: '绿', value: '#10b981' },
  { name: '青', value: '#06b6d4' },
  { name: '蓝', value: '#3b82f6' },
  { name: '紫', value: '#8b5cf6' },
  { name: '粉', value: '#ec4899' },
  { name: '棕', value: '#92400e' },
  { name: '灰', value: '#6b7280' },
  { name: '深', value: '#1f2937' },
  { name: '浅', value: '#9ca3af' },
];

/** 生成唯一 ID（避免第三方依赖） */
function generateId(): string {
  return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/** 颜色选择器回调函数类型 */
export type ColorPickerResult = {
  text: string;
  color: string;
  /** 辅助色（双色渐变终点，空串 = 纯色） */
  color2: string;
  /** 多色渐变色点（≥2 个启用多色渐变，优先于 color2；v2.10） */
  gradientStops: GradientStop[];
  /** 渐变角度（度，缺省 135；v2.10） */
  gradientAngle: number;
  caseSensitive: boolean;
  wholeWord: boolean;
  /** 旧单选效果（保持回调兼容，取 effects[0] 或 'none'） */
  effect: CustomColorEffect;
  /** 效果组合（新字段，可多选叠加） */
  effects: CustomColorEffect[];
  /** 每个效果的可调参数（v2.13；effectValue → { paramId: 数值 }） */
  effectParams: EffectParams;
};

/**
 * 打开颜色选择器模态框
 * @param app Obsidian App 实例
 * @param selectedText 当前选中的文本（用于预览）
 * @param existing 已存在的自定义颜色项（编辑模式，可选）
 * @param onConfirm 确认回调
 */
export function openColorPickerModal(
  app: App,
  selectedText: string,
  existing: CustomTextColor | null,
  onConfirm: (result: ColorPickerResult) => void
): void {
  const modal = new ColorPickerModal(
    app,
    selectedText,
    existing,
    (result) => {
      onConfirm(result);
      modal.close();
    }
  );
  modal.open();
}

class ColorPickerModal extends Modal {
  /** 当前选中的文本（预览用） */
  private selectedText: string;
  /** 已存在的项（编辑模式） */
  private existing: CustomTextColor | null;
  /** 当前选中的颜色值 */
  private currentColor: string;
  /** 辅助色（双色渐变终点，空串 = 纯色） */
  private currentColor2: string;
  /** 多色渐变色点（AE 风格，v2.10；优先于 color2） */
  private gradientStops: GradientStop[];
  /** 渐变角度（度，0–360） */
  private gradientAngle: number;
  /** 渐变编辑器 DOM 引用（拖动后局部刷新） */
  private gradientTrackEl: HTMLElement | null = null;
  private gradientThumbLayerEl: HTMLElement | null = null;
  private angleSliderEl: HTMLInputElement | null = null;
  private angleValueEl: HTMLElement | null = null;
  /** 当前选中的文字效果（旧单选字段，同步自 effects） */
  private currentEffect: CustomColorEffect;
  /** 当前勾选的效果组合（自由叠加） */
  private currentEffects: CustomColorEffect[];
  /** 每个激活效果的可调参数（v2.13） */
  private effectParams: EffectParams;
  /** 是否区分大小写 */
  private caseSensitive: boolean;
  /** 是否全字匹配 */
  private wholeWord: boolean;
  /** 确认回调 */
  private onConfirmCb: (result: ColorPickerResult) => void;
  /** 预览元素 */
  private previewEl: HTMLElement | null = null;
  /** 预览区当前色值徽标（点击复制） */
  private previewHexEl: HTMLElement | null = null;
  /** 自定义颜色 input 元素 */
  private colorInput: HTMLInputElement | null = null;
  /** 自定义颜色文本框（显示 hex 值） */
  private hexInput: HTMLInputElement | null = null;


  constructor(
    app: App,
    selectedText: string,
    existing: CustomTextColor | null,
    onConfirm: (result: ColorPickerResult) => void
  ) {
    super(app);
    this.selectedText = selectedText;
    this.existing = existing;
    this.currentColor = existing?.color ?? PRESET_COLORS[5].value;
    this.currentColor2 = existing?.color2 ?? '';
    // 渐变色点初始化：优先读取多色点；旧数据（仅 color2）迁移为双端点
    this.gradientStops = existing?.gradientStops?.length
      ? existing.gradientStops.map((s) => ({ ...s }))
      : (this.currentColor2 && isValidHexColor(this.currentColor2)
        ? [
            { color: this.currentColor, position: 0 },
            { color: this.currentColor2, position: 100 },
          ]
        : []);
    this.gradientAngle = existing?.gradientAngle ?? 135;
    // 效果组合初始化：新字段优先，旧 effect 字段自动迁移
    this.currentEffects = migrateEffects(existing ?? {});
    // 效果参数初始化（v2.13）：已有规则回填，新激活效果在 toggle 时补默认值
    this.effectParams = existing?.effectParams
      ? JSON.parse(JSON.stringify(existing.effectParams))
      : {};
    this.currentEffect = this.currentEffects[0] ?? 'none';
    this.caseSensitive = existing?.caseSensitive ?? false;
    this.wholeWord = existing?.wholeWord ?? false;
    this.onConfirmCb = onConfirm;
  }

  onOpen(): void {
    const { contentEl, titleEl } = this;
    contentEl.empty();
    contentEl.addClass('pc-color-picker-modal');

    // 标题
    titleEl.setText(t('customText.modalTitle'));

    // 1. 选中文本预览区
    this.renderPreview(contentEl);

    // 2. 颜色分区：预设色板 + 自定义颜色（同区分区，工具化密度）
    const colorSection = this.renderPresetPalette(contentEl);
    this.renderCustomColor(colorSection);

    // 3.6 多色渐变编辑器（AE 风格，v2.10；点击浮块改色，v2.11 移除独立辅助色设置）
    this.renderGradientEditor(contentEl);

    // 4. 文字效果选择
    this.renderEffectOptions(contentEl);

    // 5. 匹配选项
    this.renderMatchOptions(contentEl);

    // 6. 操作按钮
    this.renderActions(contentEl);

    // 注册键盘快捷键（容器级，仅在 Modal 内生效）
    this.registerKeybindings();

    // 自动聚焦主色板第一项，便于键盘操作
    setTimeout(() => {
      const firstSwatch = contentEl.querySelector('.pc-cp-main-palette .pc-cp-swatch') as HTMLElement | null;
      if (firstSwatch) firstSwatch.focus();
    }, 0);
  }

  /**
   * 注册键盘快捷键
   * - Enter：确认应用（与点击"应用颜色"按钮等效）
   * - Escape：关闭（Modal 默认行为已支持，此处显式处理避免事件穿透）
   * - Tab / Shift+Tab：在色板间循环聚焦
   */
  private registerKeybindings(): void {
    this.contentEl.addEventListener('keydown', (e: KeyboardEvent) => {
      // Enter：确认应用
      if (e.key === 'Enter' && !e.shiftKey) {
        const target = e.target as HTMLElement;
        const role = target.getAttribute?.('role') || '';
        const tag = target.tagName || '';
        // 交互控件（chip/色块/按钮）已自行处理 Enter 且 stopPropagation；
        // 防御性排除：目标为按钮类时不触发确认（避免双触发）；文本框 Enter = 确认
        if (role === 'button' || tag === 'BUTTON' || (tag === 'INPUT' && target.getAttribute('type') !== 'text')) {
          return;
        }
        e.preventDefault();
        this.confirmApply();
        return;
      }

      // Tab：在主色板色块间循环（渐变面板色块不参与）
      if (e.key === 'Tab') {
        const swatches = Array.from(
          this.contentEl.querySelectorAll('.pc-cp-main-palette .pc-cp-swatch') as NodeListOf<HTMLElement>
        );
        if (swatches.length === 0) return;
        const currentIdx = swatches.findIndex((s) => s === document.activeElement);
        if (currentIdx === -1) {
          // 当前焦点不在色板上，不拦截
          return;
        }
        e.preventDefault();
        const nextIdx = e.shiftKey
          ? (currentIdx - 1 + swatches.length) % swatches.length
          : (currentIdx + 1) % swatches.length;
        swatches[nextIdx].focus();
        return;
      }

      // 方向键左右：在主色板色块间切换（渐变面板色块不参与）
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const swatches = Array.from(
          this.contentEl.querySelectorAll('.pc-cp-main-palette .pc-cp-swatch') as NodeListOf<HTMLElement>
        );
        if (swatches.length === 0) return;
        const currentIdx = swatches.findIndex((s) => s === document.activeElement);
        if (currentIdx === -1) return;
        e.preventDefault();
        const nextIdx =
          e.key === 'ArrowRight'
            ? (currentIdx + 1) % swatches.length
            : (currentIdx - 1 + swatches.length) % swatches.length;
        swatches[nextIdx].focus();
        // 同时切换当前颜色到该色板
        const color = swatches[nextIdx].getAttribute('data-color');
        if (color) {
          this.currentColor = color;
          this.updatePreview();
          this.updatePaletteSelection();
          this.updateCustomColorInputs();
        }
        return;
      }
    });
  }

  /**
   * 确认应用颜色（与点击"应用颜色"按钮等效）
   */
  private confirmApply(): void {
    const text = this.selectedText.trim();
    if (!text) {
      return;
    }
    this.onConfirmCb({
      text,
      color: this.currentColor,
      color2: this.currentColor2,
      gradientStops: this.gradientStops.map((s) => ({ ...s })),
      gradientAngle: this.gradientAngle,
      caseSensitive: this.caseSensitive,
      wholeWord: this.wholeWord,
      effect: this.currentEffect,
      effects: [...this.currentEffects],
      effectParams: this.snapshotEffectParams(),
    });
  }

  /**
   * 渲染预览区（选中文本 + 当前颜色 + 当前色值徽标可复制）
   */
  private renderPreview(parent: HTMLElement): void {
    const section = parent.createDiv({ cls: 'pc-cp-section' });
    section.createEl('div', {
      cls: 'pc-cp-label',
      text: t('customText.preview'),
    });

    const previewBox = section.createDiv({ cls: 'pc-cp-preview' });
    this.previewEl = previewBox.createSpan({ cls: 'pc-cp-preview-text' });
    this.previewEl.setText(this.selectedText || t('customText.noSelection'));

    // 当前主色值徽标（点击复制，随预览实时更新）
    const hexBadge = previewBox.createDiv({
      cls: 'pc-cp-preview-hex',
      attr: { role: 'button', tabindex: '0', title: t('customText.copyHex') },
    });
    hexBadge.setText(this.currentColor);
    hexBadge.addEventListener('click', () => this.copyHexBadge(hexBadge));
    hexBadge.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        this.copyHexBadge(hexBadge);
      }
    });
    this.previewHexEl = hexBadge;

    this.updatePreview();
  }

  /** 复制当前色值到剪贴板，并短暂显示"已复制"反馈 */
  private copyHexBadge(badge: HTMLElement): void {
    const value = this.currentColor;
    navigator.clipboard?.writeText(value).then(() => {
      badge.setText(t('customText.copied'));
      badge.addClass('copied');
      window.setTimeout(() => {
        badge.setText(this.currentColor);
        badge.removeClass('copied');
      }, 900);
    });
  }

  /**
   * 渲染颜色分区：预设色板 + 自定义颜色（合并分区，降低层级密度）
   * @returns 分区容器（自定义颜色行追加在同一分区内）
   */
  private renderPresetPalette(parent: HTMLElement): HTMLElement {
    const section = parent.createDiv({ cls: 'pc-cp-section' });
    section.createEl('div', {
      cls: 'pc-cp-label',
      text: t('customText.colorSection'),
    });

    const palette = section.createDiv({ cls: 'pc-cp-palette pc-cp-main-palette' });
    for (const preset of PRESET_COLORS) {
      const swatch = palette.createDiv({
        cls: `pc-cp-swatch ${this.currentColor.toLowerCase() === preset.value.toLowerCase() ? 'active' : ''}`,
        attr: {
          'data-color': preset.value,
          'aria-label': preset.name,
          title: `${preset.name} ${preset.value}`,
          role: 'button',
          tabindex: '0',
        },
      });
      swatch.style.backgroundColor = preset.value;

      // 选中标记（对号）
      swatch.createEl('span', { cls: 'pc-cp-swatch-check' });

      swatch.addEventListener('click', () => {
        this.currentColor = preset.value;
        this.updatePreview();
        this.updatePaletteSelection();
        this.updateCustomColorInputs();
      });

      // 键盘支持：Enter / Space 选中该色板
      swatch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          this.currentColor = preset.value;
          this.updatePreview();
          this.updatePaletteSelection();
          this.updateCustomColorInputs();
          // 注意：不在此处触发确认，避免误操作；按 Enter 确认由 registerKeybindings 统一处理
        }
      });
    }
    return section;
  }

  /**
   * 渲染自定义颜色选择器行（HTML color input + hex 文本框，追加到颜色分区内）
   */
  private renderCustomColor(section: HTMLElement): void {
    const row = section.createDiv({ cls: 'pc-cp-custom-row' });

    // 颜色选择器 input（原生）
    this.colorInput = row.createEl('input', {
      cls: 'pc-cp-color-input',
      attr: {
        type: 'color',
        'aria-label': t('customText.customColor'),
      },
    }) as HTMLInputElement;
    this.colorInput.value = this.normalizeHex(this.currentColor);

    this.colorInput.addEventListener('input', () => {
      this.currentColor = this.colorInput!.value;
      this.updatePreview();
      this.updatePaletteSelection();
      if (this.hexInput) {
        this.hexInput.value = this.currentColor;
      }
    });

    // hex 文本框
    this.hexInput = row.createEl('input', {
      cls: 'pc-cp-hex-input',
      attr: {
        type: 'text',
        placeholder: '#3b82f6',
        spellcheck: 'false',
        'aria-label': t('customText.hexValue'),
      },
    }) as HTMLInputElement;
    this.hexInput.value = this.currentColor;

    this.hexInput.addEventListener('input', () => {
      const val = this.hexInput!.value.trim();
      if (/^#[0-9a-fA-F]{6}$/.test(val) || /^#[0-9a-fA-F]{3}$/.test(val)) {
        this.currentColor = val;
        if (this.colorInput) {
          this.colorInput.value = this.normalizeHex(val);
        }
        this.updatePreview();
        this.updatePaletteSelection();
      }
    });
  }

  /**
   * 渲染多色渐变编辑器（AE 风格，v2.10）
   * 渐变条预览 + 色点浮块（拖动改位置）+ 增删色点 + 角度滑块
   * v2.12：点击浮块选中并在编辑器下方显示色点颜色面板（预设色板 + 自定义色）
   */
  private renderGradientEditor(parent: HTMLElement): void {
    const section = parent.createDiv({ cls: 'pc-cp-section pc-cp-gradient-section' });

    new Setting(section)
      .setName(t('customText.gradientTitle'))
      .setDesc(t('customText.gradientDesc'))
      .addToggle((tg) => tg
        .setTooltip(t('customText.gradientToggle'))
        .setValue(this.gradientStops.length >= 2)
        .onChange((on) => {
          if (on && this.gradientStops.length < 2) {
            // 开启：以主色 + 对比预设色建立双端点
            this.gradientStops = [
              { color: this.currentColor, position: 0 },
              { color: PRESET_COLORS[6].value, position: 100 },
            ];
          } else if (!on) {
            this.gradientStops = [];
          }
          this.updatePreview();
          // 首次开启时编辑器内部 DOM 未创建（初始 stops 为空时被跳过），需在容器内补建
          const editorEl = section.querySelector('.pc-cp-gradient-editor');
          if (this.gradientStops.length >= 2 && editorEl && !this.gradientTrackEl) {
            this.buildGradientEditorDom(editorEl as HTMLElement);
          } else if (this.gradientStops.length === 0) {
            // 关闭：清空内部 DOM 并释放引用（重开时重建）
            if (editorEl) (editorEl as HTMLElement).empty();
            this.gradientTrackEl = null;
            this.gradientThumbLayerEl = null;
            this.angleSliderEl = null;
            this.angleValueEl = null;
            this.gradientSelectedInfoEl = null;
            this.gradientDeleteBtnEl = null;
            this.stopPaletteEl = null;
            this.stopSwatchEls = [];
            this.stopColorInput = null;
            this.stopHexInput = null;
          }
        }));

    // 总是创建容器，以便 toggle 开启时复用
    const editor = section.createDiv({ cls: 'pc-cp-gradient-editor' });

    if (this.gradientStops.length === 0) return;
    if (this.gradientStops.length === 1) {
      this.gradientStops.push({ color: PRESET_COLORS[6].value, position: 100 });
    }
    this.buildGradientEditorDom(editor);
  }

  /**
   * 构建渐变编辑器内部 DOM（角度滑块 + 渐变条 + 色点层 + 操作行）
   * 初始渲染与 toggle 首次开启共用；editor 为 .pc-cp-gradient-editor 容器
   */
  private buildGradientEditorDom(editor: HTMLElement): void {
    editor.empty();

    // 1. 角度滑块（浮块滑动产生角度变化）
    const angleRow = editor.createDiv({ cls: 'pc-cp-gradient-angle' });
    this.angleSliderEl = angleRow.createEl('input', {
      cls: 'pc-cp-gradient-angle-slider',
      attr: { type: 'range', min: '0', max: '360', step: '1' },
    }) as HTMLInputElement;
    this.angleSliderEl.value = String(this.gradientAngle);
    this.angleValueEl = angleRow.createSpan({ cls: 'pc-cp-gradient-angle-value' });
    this.angleValueEl.setText(`${this.gradientAngle}°`);
    this.angleSliderEl.addEventListener('input', () => {
      this.gradientAngle = parseInt(this.angleSliderEl!.value, 10) || 0;
      this.angleValueEl?.setText(`${this.gradientAngle}°`);
      this.updatePreview();
    });

    // 2. 渐变条（预览轨道）+ 色点浮块层
    const trackWrap = editor.createDiv({ cls: 'pc-cp-gradient-track-wrap' });
    this.gradientTrackEl = trackWrap.createDiv({ cls: 'pc-cp-gradient-track' });
    this.gradientThumbLayerEl = trackWrap.createDiv({ cls: 'pc-cp-gradient-thumbs' });

    // 3. 操作行：添加色点 + 选中色点信息/删除
    const opsRow = editor.createDiv({ cls: 'pc-cp-gradient-ops' });
    const addBtn = opsRow.createEl('button', {
      cls: 'pc-cp-gradient-add',
      attr: { type: 'button' },
    });
    addBtn.setText('+');
    addBtn.setAttribute('aria-label', t('customText.gradientAddStop'));
    addBtn.addEventListener('click', () => {
      // 在中部插入新色点（AE 行为：中点插入后可拖动）
      const pos = this.gradientStops.length === 0 ? 50 : Math.round((this.nearestGapMiddle()) * 100) / 100;
      this.gradientStops.push({ color: PRESET_COLORS[Math.floor(Math.random() * 12)].value, position: Math.min(100, Math.max(0, pos)) });
      this.syncStopsSorted();
      this.updatePreview();
      this.rerenderGradientEditor();
    });

    const selectedInfo = opsRow.createSpan({ cls: 'pc-cp-gradient-selected-info' });
    const delBtn = opsRow.createEl('button', {
      cls: 'pc-cp-gradient-delete',
      attr: { type: 'button' },
    });
    delBtn.setText('−');
    delBtn.setAttribute('aria-label', t('customText.gradientDeleteStop'));
    delBtn.addEventListener('click', () => {
      if (this.selectedStopIndex >= 0 && this.gradientStops.length > 2) {
        this.gradientStops.splice(this.selectedStopIndex, 1);
        this.selectedStopIndex = Math.min(this.selectedStopIndex, this.gradientStops.length - 1);
        this.updatePreview();
        this.rerenderGradientEditor();
      }
    });
    const resetBtn = opsRow.createEl('button', {
      cls: 'pc-cp-gradient-reset',
      attr: { type: 'button' },
    });
    resetBtn.setText('↺');
    resetBtn.setAttribute('aria-label', t('customText.gradientReset'));
    resetBtn.addEventListener('click', () => this.resetGradient());
    this.gradientSelectedInfoEl = selectedInfo;
    this.gradientDeleteBtnEl = delBtn;

    // 初始渲染渐变条与色点浮块
    this.renderGradientTrack();
    this.renderGradientThumbs();
    this.updateGradientOpsState();
    // 4. 色点颜色面板（默认隐藏，点击色点后在下方显示）
    this.buildStopPaletteDom(editor);
  }

  /** 选中色点索引（-1 = 未选中，默认选第一个） */
  private selectedStopIndex: number = 0;
  private gradientSelectedInfoEl: HTMLElement | null = null;
  private gradientDeleteBtnEl: HTMLButtonElement | null = null;

  /** 找两个相邻色点间的最大间隙中点（新色点插入位置） */
  private nearestGapMiddle(): number {
    const stops = [...this.gradientStops].sort((a, b) => a.position - b.position);
    if (stops.length === 0) return 50;
    let bestGap = -1;
    let bestMid = 50;
    let prev = 0;
    for (const s of stops) {
      const gap = s.position - prev;
      if (gap > bestGap) { bestGap = gap; bestMid = prev + gap / 2; }
      prev = s.position;
    }
    if (100 - prev > bestGap) bestMid = prev + (100 - prev) / 2;
    return bestMid;
  }

  /** 色点重排序并保持选中索引跟随 */
  private syncStopsSorted(): void {
    const sel = this.gradientStops[this.selectedStopIndex];
    this.gradientStops.sort((a, b) => a.position - b.position);
    if (sel) this.selectedStopIndex = Math.max(0, this.gradientStops.indexOf(sel));
    else this.selectedStopIndex = 0;
  }

  /** 重置渐变为默认设置：主色+对比色双端点（0%/100%）+ 角度 135°（清除上次编辑的色点/位置/角度） */
  private resetGradient(): void {
    this.gradientStops = [
      { color: this.currentColor, position: 0 },
      { color: PRESET_COLORS[6].value, position: 100 },
    ];
    this.gradientAngle = 135;
    this.selectedStopIndex = 0;
    if (this.angleSliderEl) this.angleSliderEl.value = '135';
    if (this.angleValueEl) this.angleValueEl.setText('135°');
    this.updatePreview();
    this.rerenderGradientEditor();
  }

  /** 渲染渐变条背景（CSS linear-gradient 同款合成） */
  private renderGradientTrack(): void {
    if (!this.gradientTrackEl) return;
    const css = gradientStopsToCss(normalizeGradientStops(this.gradientStops));
    this.gradientTrackEl.style.background = css
      ? `linear-gradient(90deg, ${css})`
      : 'var(--background-modifier-border)';
  }

  /** 渲染色点浮块（pointer 拖动改位置，点击选中并在下方显示颜色面板） */
  private renderGradientThumbs(): void {
    if (!this.gradientThumbLayerEl) return;
    this.gradientThumbLayerEl.empty();

    const sorted = [...this.gradientStops].sort((a, b) => a.position - b.position);

    for (let i = 0; i < sorted.length; i++) {
      const stop = sorted[i];
      const isSel = i === this.selectedStopIndex;
      const thumb = this.gradientThumbLayerEl.createDiv({
        cls: `pc-cp-gradient-thumb ${isSel ? 'selected' : ''}`,
        attr: {
          role: 'slider',
          tabindex: '0',
          'aria-label': t('customText.gradientStopAria'),
          'aria-valuenow': String(Math.round(stop.position)),
          'data-index': String(i),
          title: `${stop.color} · ${Math.round(stop.position)}%`,
        },
      });
      thumb.style.left = `${stop.position}%`;
      thumb.style.background = stop.color;

      // 点击选中 + 拖动；位移极小（<3px）判定为"点击改色"
      thumb.addEventListener('pointerdown', (e: PointerEvent) => {
        e.preventDefault();
        this.selectedStopIndex = i;
        this.refreshThumbSelection();
        this.updateGradientOpsState();

        const startX = e.clientX;
        let moved = false;
        let dragStarted = false;

        const trackMove = (ev: PointerEvent) => {
          if (!dragStarted) {
            if (Math.abs(ev.clientX - startX) < 3) return;
            dragStarted = true;
            this.beginThumbDrag(thumb, stop, e);
          }
        };
        const trackUp = (ev: PointerEvent) => {
          window.removeEventListener('pointermove', trackMove);
          window.removeEventListener('pointerup', trackUp);
          // 未拖动 → 单击选中并在下方显示色点颜色面板
          if (!dragStarted) {
            this.showStopPalette();
          }
        };
        window.addEventListener('pointermove', trackMove);
        window.addEventListener('pointerup', trackUp);
      });

      // 键盘微调（左右方向键 ±1%，Shift ±5%）
      thumb.addEventListener('keydown', (e: KeyboardEvent) => {
        const step = e.shiftKey ? 5 : 1;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          stop.position = Math.min(100, Math.max(0, stop.position + (e.key === 'ArrowLeft' ? -step : step)));
          this.syncStopsSorted();
          this.updatePreview();
          this.rerenderGradientEditor();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.showStopPalette();
        }
      });

    }
  }

  /** 色点浮块拖动（pointermove 跟随，pointerup 结束；clamp 0–100） */
  private beginThumbDrag(thumb: HTMLElement, stop: GradientStop, e: PointerEvent): void {
    const layer = this.gradientThumbLayerEl!;
    const rect = layer.getBoundingClientRect();
    if (!rect.width) return;
    thumb.setCssStyles({ transition: 'none' });
    thumb.addClass('dragging');

    const move = (ev: PointerEvent) => {
      const ratio = (ev.clientX - rect.left) / rect.width;
      stop.position = Math.round(Math.min(100, Math.max(0, ratio * 100)) * 100) / 100;
      thumb.style.left = `${stop.position}%`;
      thumb.setAttribute('aria-valuenow', String(Math.round(stop.position)));
      thumb.setAttribute('title', `${stop.color} · ${Math.round(stop.position)}%`);
      // 拖动中仅刷新渐变条与预览，不重建浮块（避免 DOM 抖动）
      this.renderGradientTrack();
      this.updatePreview();
    };
    const up = () => {
      thumb.removeClass('dragging');
      thumb.setCssStyles({ transition: '' });
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      // 拖动结束后重排序 + 重建浮块（选中跟随）
      this.syncStopsSorted();
      this.rerenderGradientEditor();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  /**
   * 色点颜色面板（点击任一色点后在编辑器下方显示）：
   * 12 预设色块 + 原生取色器 + hex 输入，点选即应用到当前选中色点（所有色点通用）
   */
  private stopPaletteEl: HTMLElement | null = null;
  private stopSwatchEls: HTMLElement[] = [];
  private stopColorInput: HTMLInputElement | null = null;
  private stopHexInput: HTMLInputElement | null = null;

  /** 构建色点颜色面板（默认隐藏，showStopPalette 时显示） */
  private buildStopPaletteDom(editor: HTMLElement): void {
    const palette = editor.createDiv({ cls: 'pc-cp-gradient-stop-palette' });
    palette.setAttribute('hidden', '');
    palette.createDiv({
      cls: 'pc-cp-gradient-stop-palette-label',
      text: t('customText.gradientStopPalette'),
    });

    const grid = palette.createDiv({ cls: 'pc-cp-palette' });
    this.stopSwatchEls = [];
    for (const preset of PRESET_COLORS) {
      const swatch = grid.createDiv({
        cls: 'pc-cp-swatch',
        attr: {
          'data-color': preset.value,
          'aria-label': preset.name,
          title: `${preset.name} ${preset.value}`,
          role: 'button',
          tabindex: '0',
        },
      });
      swatch.style.backgroundColor = preset.value;
      swatch.createEl('span', { cls: 'pc-cp-swatch-check' });

      const apply = () => this.applyColorToSelectedStop(preset.value);
      swatch.addEventListener('click', apply);
      swatch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          apply();
        }
      });
      this.stopSwatchEls.push(swatch);
    }

    // 自定义色行：原生取色器 + hex 文本框
    const row = palette.createDiv({ cls: 'pc-cp-custom-row' });
    this.stopColorInput = row.createEl('input', {
      cls: 'pc-cp-color-input',
      attr: { type: 'color', 'aria-label': t('customText.customColor') },
    }) as HTMLInputElement;
    this.stopColorInput.addEventListener('input', () => {
      this.applyColorToSelectedStop(this.stopColorInput!.value);
    });

    this.stopHexInput = row.createEl('input', {
      cls: 'pc-cp-hex-input',
      attr: {
        type: 'text',
        placeholder: '#3b82f6',
        spellcheck: 'false',
        'aria-label': t('customText.hexValue'),
      },
    }) as HTMLInputElement;
    this.stopHexInput.addEventListener('input', () => {
      const val = this.stopHexInput!.value.trim();
      if (/^#[0-9a-fA-F]{6}$/.test(val) || /^#[0-9a-fA-F]{3}$/.test(val)) {
        this.applyColorToSelectedStop(val);
      }
    });

    this.stopPaletteEl = palette;
    this.updateStopPalette();
  }

  /** 显示色点颜色面板（点击/回车选中色点后调用） */
  private showStopPalette(): void {
    if (!this.stopPaletteEl) return;
    this.stopPaletteEl.removeAttribute('hidden');
    this.updateStopPalette();
  }

  /** 同步面板高亮与自定义输入值（跳过正被编辑的输入框，避免打断输入） */
  private updateStopPalette(): void {
    const stop = this.gradientStops[this.selectedStopIndex];
    if (!this.stopPaletteEl || !stop) return;
    const color = stop.color.toLowerCase();
    for (const sw of this.stopSwatchEls) {
      const c = (sw.getAttribute('data-color') || '').toLowerCase();
      sw.classList.toggle('active', c === color);
    }
    if (this.stopColorInput && document.activeElement !== this.stopColorInput) {
      this.stopColorInput.value = this.normalizeHex(stop.color);
    }
    if (this.stopHexInput && document.activeElement !== this.stopHexInput) {
      this.stopHexInput.value = stop.color;
    }
  }

  /** 将颜色应用到当前选中色点并整体刷新（渐变条/浮块/面板/预览） */
  private applyColorToSelectedStop(color: string): void {
    const stop = this.gradientStops[this.selectedStopIndex];
    if (!stop) return;
    stop.color = color;
    this.updatePreview();
    this.rerenderGradientEditor();
  }

  /** 刷新浮块选中态（不重建） */
  private refreshThumbSelection(): void {
    if (!this.gradientThumbLayerEl) return;
    this.gradientThumbLayerEl.querySelectorAll('.pc-cp-gradient-thumb').forEach((el) => {
      const idx = parseInt((el as HTMLElement).getAttribute('data-index') || '-1', 10);
      (el as HTMLElement).classList.toggle('selected', idx === this.selectedStopIndex);
    });
  }

  /** 更新操作行状态（选中信息 + 删除按钮可用性） */
  private updateGradientOpsState(): void {
    const idx = this.selectedStopIndex;
    const stop = this.gradientStops[idx];
    if (this.gradientSelectedInfoEl) {
      this.gradientSelectedInfoEl.setText(
        stop ? `${stop.color} · ${Math.round(stop.position)}%` : t('customText.gradientNoSelection')
      );
    }
    if (this.gradientDeleteBtnEl) {
      this.gradientDeleteBtnEl.disabled = this.gradientStops.length <= 2;
    }
  }

  /** 局部重渲染渐变编辑器（拖动/增删/改色后） */
  private rerenderGradientEditor(): void {
    this.renderGradientTrack();
    this.renderGradientThumbs();
    this.updateGradientOpsState();
    this.updateStopPalette();
  }

  /**
   * 渲染文字效果选择（可多选 chip，自由组合 + 实时预览）
   */
  private renderEffectOptions(parent: HTMLElement): void {
    const section = parent.createDiv({ cls: 'pc-cp-section' });
    section.createEl('div', {
      cls: 'pc-cp-label',
      text: t('customText.effect'),
    });
    const hint = section.createDiv({ cls: 'pc-cp-effects-hint' });
    hint.setText(t('customText.effectComposableHint'));

    const chips = section.createDiv({ cls: 'pc-cp-effects-chips' });
    for (const def of COMPOSABLE_EFFECTS) {
      const active = this.currentEffects.includes(def.value);
      const chip = chips.createDiv({
        cls: `pc-cp-effect-chip ${active ? 'active' : ''}`,
        attr: {
          role: 'button',
          tabindex: '0',
          'aria-pressed': String(active),
          'data-effect': def.value,
          title: t(def.labelKey),
        },
        text: t(def.labelKey),
      });
      chip.addEventListener('click', () => this.toggleEffect(def.value));
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // 阻止冒泡：避免容器级 Enter 拦截器把它当"确认"处理（双触发 bug）
          e.stopPropagation();
          this.toggleEffect(def.value);
        }
      });
    }

    // AE Effect Controls 风格参数面板（激活效果的可调参数，实时预览）
    this.effectParamsEl = section.createDiv({ cls: 'pc-cp-fx-panel' });
    this.rerenderEffectParams();
  }

  /** 切换效果勾选状态并刷新 chips/预览 */
  private toggleEffect(value: CustomColorEffect): void {
    const idx = this.currentEffects.indexOf(value);
    if (idx >= 0) {
      this.currentEffects.splice(idx, 1);
      // 取消勾选即丢弃该效果参数（重新勾选回默认值，AE 行为）
      delete this.effectParams[value];
    } else {
      this.currentEffects.push(value);
      // 新激活效果：无既有参数时注入注册表默认值
      const def = EFFECT_MAP.get(value);
      if (def && def.params && def.params.length > 0 && !this.effectParams[value]) {
        this.effectParams[value] = defaultEffectParams(def);
      }
    }
    this.currentEffect = this.currentEffects[0] ?? 'none';
    this.refreshEffectChips();
    this.rerenderEffectParams();
    this.updatePreview();
  }

  /** 深拷贝当前效果参数（确认提交用，避免外部共享引用） */
  private snapshotEffectParams(): EffectParams {
    return JSON.parse(JSON.stringify(this.effectParams));
  }

  // ---- AE Effect Controls 风格参数面板（v2.13）----
  private effectParamsEl: HTMLElement | null = null;

  /** 重建参数面板：仅渲染激活且带参数的效果，每个效果一个分组（AE 参数组风格） */
  private rerenderEffectParams(): void {
    if (!this.effectParamsEl) return;
    this.effectParamsEl.empty();
    const withParams = this.currentEffects
      .map((v) => EFFECT_MAP.get(v))
      .filter((d): d is NonNullable<typeof d> => !!d && !!d.params && d.params.length > 0);
    if (withParams.length === 0) return;

    for (const def of withParams) {
      const group = this.effectParamsEl.createDiv({ cls: 'pc-cp-fx-group' });
      group.createDiv({ cls: 'pc-cp-fx-group-title', text: t(def.labelKey) });
      for (const p of def.params!) {
        this.renderParamSlider(group, def.value, p);
      }
    }
  }

  /** 单个参数行：标签 + 滑块 + 数值（AE 参数滑块风格，实时预览） */
  private renderParamSlider(
    group: HTMLElement,
    effect: CustomColorEffect,
    param: EffectParam
  ): void {
    const current = (this.effectParams[effect] ?? {})[param.id] ?? param.def;
    const row = group.createDiv({ cls: 'pc-cp-fx-row' });
    row.createSpan({ cls: 'pc-cp-fx-label', text: t(param.labelKey) });

    const slider = row.createEl('input', {
      cls: 'pc-cp-fx-slider',
      attr: { type: 'range', min: String(param.min), max: String(param.max), step: String(param.step) },
    }) as HTMLInputElement;
    slider.value = String(current);

    const valueEl = row.createSpan({ cls: 'pc-cp-fx-value' });
    const showValue = (v: number) =>
      valueEl.setText(`${Number.isInteger(param.step) ? Math.round(v) : Math.round(v * 100) / 100}${param.unit ?? ''}`);
    showValue(current);

    const apply = (v: number) => {
      if (!this.effectParams[effect]) this.effectParams[effect] = {};
      this.effectParams[effect]![param.id] = v;
      showValue(v);
      this.updatePreview();
    };
    slider.addEventListener('input', () => {
      const v = parseFloat(slider.value);
      if (Number.isFinite(v)) apply(v);
    });
  }

  /** 同步 chips 的选中态 */
  private refreshEffectChips(): void {
    const chips = this.contentEl.querySelectorAll('.pc-cp-effect-chip');
    chips.forEach((c) => {
      const el = c as HTMLElement;
      const active = this.currentEffects.includes(
        el.getAttribute('data-effect') as CustomColorEffect
      );
      el.classList.toggle('active', active);
      el.setAttribute('aria-pressed', String(active));
    });
  }

  /**
   * 渲染匹配选项（大小写、全字匹配）
   * 轻量复选框行：替代重型 Setting toggle，降低弹窗纵向高度
   */
  private renderMatchOptions(parent: HTMLElement): void {
    const section = parent.createDiv({ cls: 'pc-cp-section' });
    section.createEl('div', {
      cls: 'pc-cp-label',
      text: t('customText.matchOptions'),
    });

    const row = section.createDiv({ cls: 'pc-cp-match-row' });
    this.renderMatchCheckbox(row, t('customText.caseSensitive'), this.caseSensitive, (v) => {
      this.caseSensitive = v;
    });
    this.renderMatchCheckbox(row, t('customText.wholeWord'), this.wholeWord, (v) => {
      this.wholeWord = v;
    });
  }

  /** 单个匹配复选项（checkbox + 文字标签，整行可点） */
  private renderMatchCheckbox(
    row: HTMLElement,
    label: string,
    value: boolean,
    onChange: (v: boolean) => void
  ): void {
    const item = row.createEl('label', { cls: 'pc-cp-match-item' });
    const cb = item.createEl('input', {
      cls: 'pc-cp-match-checkbox',
      attr: { type: 'checkbox' },
    }) as HTMLInputElement;
    cb.checked = value;
    cb.addEventListener('change', () => onChange(cb.checked));
    item.createSpan({ cls: 'pc-cp-match-label', text: label });
  }

  /**
   * 渲染底部操作按钮（取消 / 确定）
   */
  private renderActions(parent: HTMLElement): void {
    const actions = parent.createDiv({ cls: 'pc-cp-actions' });

    new ButtonComponent(actions)
      .setButtonText(t('customText.cancel'))
      .onClick(() => {
        this.close();
      });

    const confirmBtn = new ButtonComponent(actions)
      .setButtonText(t('customText.confirm'))
      .setCta()
      .onClick(() => {
        const text = this.selectedText.trim();
        if (!text) {
          return;
        }
        this.onConfirmCb({
          text,
          color: this.currentColor,
          color2: this.currentColor2,
          gradientStops: this.gradientStops.map((s) => ({ ...s })),
          gradientAngle: this.gradientAngle,
          caseSensitive: this.caseSensitive,
          wholeWord: this.wholeWord,
          effect: this.currentEffect,
          effects: [...this.currentEffects],
          effectParams: this.snapshotEffectParams(),
        });
      });

    // 如果没有选中文本，禁用确认按钮
    if (!this.selectedText.trim()) {
      confirmBtn.setDisabled(true);
    }
  }

  /**
   * 更新预览文本颜色与效果
   * 效果渲染由 effect-registry 注册表声明驱动，与 generateCustomTextColorsCss 共用同一合并逻辑
   */
  private updatePreview(): void {
    if (!this.previewEl) return;
    const el = this.previewEl;
    // 清除全部可能被效果设置过的内联样式（注册表属性超集 + 渐变/filter 残留）
    const clearedProps = [
      'text-shadow', 'font-weight', 'font-style', 'text-decoration',
      'text-decoration-thickness',
      'background', 'background-image', 'padding', 'border-radius',
      'font-family', 'font-variant', 'letter-spacing', 'vertical-align',
      'font-size', 'text-transform', '-webkit-text-stroke', '-webkit-text-fill-color',
      'filter', 'background-clip', '-webkit-background-clip',
    ];
    for (const prop of clearedProps) {
      el.style.setProperty(prop, '');
    }

    // 合并效果组合声明（多色/双色渐变合成收敛于 applyGradient，与 CSS 生成端共用）
    const merged = mergeEffectDeclarations(this.currentEffects, this.currentColor, this.effectParams);
    reconcileOutline(merged, this.currentEffects, this.currentColor);
    applyGradient(merged, this.currentColor, this.currentColor2, this.gradientStops, this.gradientAngle);
    el.style.color = this.currentColor;
    for (const [prop, value] of Object.entries(merged)) {
      el.style.setProperty(prop, value);
    }
    // 同步预览区色值徽标（复制用）
    if (this.previewHexEl) {
      this.previewHexEl.setText(this.currentColor);
    }
  }

  /**
   * 更新色板选中状态
   */
  private updatePaletteSelection(): void {
    const swatches = this.contentEl.querySelectorAll('.pc-cp-swatch');
    swatches.forEach((sw) => {
      // 渐变色点面板的色块独立维护高亮（对应选中色点颜色）
      if (sw.closest('.pc-cp-gradient-stop-palette')) return;
      const el = sw as HTMLElement;
      const color = el.getAttribute('data-color') || '';
      if (color.toLowerCase() === this.currentColor.toLowerCase()) {
        el.addClass('active');
      } else {
        el.removeClass('active');
      }
    });
  }

  /**
   * 同步自定义颜色输入控件
   */
  private updateCustomColorInputs(): void {
    if (this.colorInput) {
      this.colorInput.value = this.normalizeHex(this.currentColor);
    }
    if (this.hexInput) {
      this.hexInput.value = this.currentColor;
    }
  }

  /**
   * 将颜色值规范化为 #rrggbb 格式（用于 input[type=color]）
   */
  private normalizeHex(color: string): string {
    const c = color.trim().toLowerCase();
    // 已是 6 位 hex
    if (/^#[0-9a-f]{6}$/.test(c)) return c;
    // 3 位 hex 扩展为 6 位
    if (/^#[0-9a-f]{3}$/.test(c)) {
      return '#' + c.slice(1).split('').map((ch) => ch + ch).join('');
    }
    // 其他格式回退到默认蓝色
    return '#3b82f6';
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/**
 * 生成新的 CustomTextColor 项（含 ID）
 */
export function createCustomTextColor(result: ColorPickerResult): CustomTextColor {
  return {
    id: generateId(),
    text: result.text,
    color: result.color,
    color2: result.color2 || '',
    gradientStops: result.gradientStops.map((s) => ({ ...s })),
    gradientAngle: result.gradientAngle,
    enabled: true,
    caseSensitive: result.caseSensitive,
    wholeWord: result.wholeWord,
    effect: result.effect,
    effects: [...result.effects],
    effectParams: result.effectParams ? JSON.parse(JSON.stringify(result.effectParams)) : {},
  };
}
