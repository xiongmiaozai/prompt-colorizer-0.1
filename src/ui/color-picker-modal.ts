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
import type { CustomTextColor } from '../types';
import { t } from '../utils/i18n';

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
  caseSensitive: boolean;
  wholeWord: boolean;
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
  /** 是否区分大小写 */
  private caseSensitive: boolean;
  /** 是否全字匹配 */
  private wholeWord: boolean;
  /** 确认回调 */
  private onConfirmCb: (result: ColorPickerResult) => void;
  /** 预览元素 */
  private previewEl: HTMLElement | null = null;
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

    // 2. 预设色板
    this.renderPresetPalette(contentEl);

    // 3. 自定义颜色选择器
    this.renderCustomColor(contentEl);

    // 4. 匹配选项
    this.renderMatchOptions(contentEl);

    // 5. 操作按钮
    this.renderActions(contentEl);

    // 注册键盘快捷键（容器级，仅在 Modal 内生效）
    this.registerKeybindings();

    // 自动聚焦色板第一项，便于键盘操作
    setTimeout(() => {
      const firstSwatch = contentEl.querySelector('.pc-cp-swatch') as HTMLElement | null;
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
        // 检查目标元素是否是 hex 输入框（避免与 input 自身的 Enter 行为冲突）
        const target = e.target as HTMLElement;
        if (target && target.tagName === 'INPUT' && target.getAttribute('type') === 'text') {
          // 在 hex 输入框按 Enter，触发确认
          e.preventDefault();
          this.confirmApply();
          return;
        }
        // 在色板或其他位置按 Enter，触发确认
        e.preventDefault();
        this.confirmApply();
        return;
      }

      // Tab：在色板间循环聚焦
      if (e.key === 'Tab') {
        const swatches = Array.from(
          this.contentEl.querySelectorAll('.pc-cp-swatch') as NodeListOf<HTMLElement>
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

      // 方向键左右：在色板间切换
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const swatches = Array.from(
          this.contentEl.querySelectorAll('.pc-cp-swatch') as NodeListOf<HTMLElement>
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
      caseSensitive: this.caseSensitive,
      wholeWord: this.wholeWord,
    });
  }

  /**
   * 渲染预览区（选中文本 + 当前颜色）
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
    this.updatePreview();
  }

  /**
   * 渲染预设色板（12 个色块）
   */
  private renderPresetPalette(parent: HTMLElement): void {
    const section = parent.createDiv({ cls: 'pc-cp-section' });
    section.createEl('div', {
      cls: 'pc-cp-label',
      text: t('customText.presetPalette'),
    });

    const palette = section.createDiv({ cls: 'pc-cp-palette' });
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
  }

  /**
   * 渲染自定义颜色选择器（HTML color input + hex 文本框）
   */
  private renderCustomColor(parent: HTMLElement): void {
    const section = parent.createDiv({ cls: 'pc-cp-section' });
    section.createEl('div', {
      cls: 'pc-cp-label',
      text: t('customText.customColor'),
    });

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
   * 渲染匹配选项（大小写、全字匹配）
   */
  private renderMatchOptions(parent: HTMLElement): void {
    const section = parent.createDiv({ cls: 'pc-cp-section' });

    new Setting(section)
      .setName(t('customText.caseSensitive'))
      .setDesc(t('customText.caseSensitiveDesc'))
      .addToggle((toggle) =>
        toggle
          .setValue(this.caseSensitive)
          .onChange((value) => {
            this.caseSensitive = value;
          })
      );

    new Setting(section)
      .setName(t('customText.wholeWord'))
      .setDesc(t('customText.wholeWordDesc'))
      .addToggle((toggle) =>
        toggle
          .setValue(this.wholeWord)
          .onChange((value) => {
            this.wholeWord = value;
          })
      );
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
          caseSensitive: this.caseSensitive,
          wholeWord: this.wholeWord,
        });
      });

    // 如果没有选中文本，禁用确认按钮
    if (!this.selectedText.trim()) {
      confirmBtn.setDisabled(true);
    }
  }

  /**
   * 更新预览文本颜色
   */
  private updatePreview(): void {
    if (this.previewEl) {
      this.previewEl.style.color = this.currentColor;
    }
  }

  /**
   * 更新色板选中状态
   */
  private updatePaletteSelection(): void {
    const swatches = this.contentEl.querySelectorAll('.pc-cp-swatch');
    swatches.forEach((sw) => {
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
    enabled: true,
    caseSensitive: result.caseSensitive,
    wholeWord: result.wholeWord,
  };
}
