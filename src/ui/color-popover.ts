/**
 * 浮动快速着色面板
 *
 * 功能定位：
 * - 编辑器选中文本后，在选区附近自动弹出的轻量级色板
 * - 单击色块即应用颜色（即时反馈）
 * - 提供"高级选项"按钮跳转到完整 Modal（自定义颜色、匹配选项）
 * - 提供"移除颜色"按钮快速移除当前文本的颜色规则
 * - ESC 关闭、点击外部关闭
 *
 * 与 color-picker-modal.ts 的区别：
 * - popover：快速操作，单击即应用，无配置项
 * - modal：完整操作，含自定义颜色、大小写、全字匹配等配置
 *
 * 视觉风格：Apple 极简毛玻璃卡片，带微动入场动画
 */

import { App, Editor, Menu, Notice } from 'obsidian';
import type { CustomTextColor } from '../types';
import { t } from '../utils/i18n';
import { PRESET_COLORS } from './color-picker-modal';

/** 浮动面板配置 */
export interface ColorPopoverOptions {
  /** 当前选中的文本 */
  selectedText: string;
  /** 已存在的颜色规则（若当前文本已设置颜色） */
  existing: CustomTextColor | null;
  /** 应用颜色回调（参数：颜色值） */
  onApplyColor: (color: string) => void;
  /** 打开高级选择器回调 */
  onOpenAdvanced: () => void;
  /** 移除颜色回调 */
  onRemove: () => void;
}

/** 当前活跃的浮动面板实例（全局唯一） */
let activePopover: ColorPopover | null = null;

/**
 * 显示浮动快速着色面板
 * @param app Obsidian App 实例
 * @param editor 当前编辑器（用于定位选区坐标）
 * @param options 配置项
 */
export function showColorPopover(
  app: App,
  editor: Editor,
  options: ColorPopoverOptions
): void {
  // 关闭已有的浮动面板
  hideColorPopover();

  if (!options.selectedText || options.selectedText.trim().length === 0) {
    return;
  }

  // 获取选区坐标
  // 注：coordsAtPos 是 CodeMirror Editor 的扩展方法，Obsidian 类型定义未导出
  // 使用类型断言获取该方法
  const cmEditor = editor as unknown as {
    coordsAtPos: (pos: { line: number; ch: number }) => { left: number; right: number; top: number; bottom: number } | null;
  };
  const coords = cmEditor.coordsAtPos(editor.getCursor('from'));
  const coordsTo = cmEditor.coordsAtPos(editor.getCursor('to'));
  if (!coords || !coordsTo) return;

  // 转换为页面坐标（CodeMirror 的 coordsAtPos 返回视口坐标）
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // 选区中心点（水平居中，垂直在选区下方）
  const rect = {
    left: Math.min(coords.left, coordsTo.left),
    right: Math.max(coords.right, coordsTo.right),
    top: Math.min(coords.top, coordsTo.top),
    bottom: Math.max(coords.bottom, coordsTo.bottom),
  };
  const x = (rect.left + rect.right) / 2 + scrollX;
  const y = rect.bottom + scrollY + 8; // 选区下方 8px

  activePopover = new ColorPopover(app, options, { x, y });
  activePopover.show();
}

/** 隐藏当前活跃的浮动面板 */
export function hideColorPopover(): void {
  if (activePopover) {
    activePopover.hide();
    activePopover = null;
  }
}

/** 当前是否有浮动面板活跃 */
export function isPopoverActive(): boolean {
  return activePopover !== null;
}

// ============================================================
// 浮动面板实现
// ============================================================

class ColorPopover {
  private app: App;
  private options: ColorPopoverOptions;
  private position: { x: number; y: number };
  private el: HTMLElement | null = null;
  private hideHandlers: Array<{ event: string; handler: (e: Event) => void; target: Document | Window }> = [];

  constructor(app: App, options: ColorPopoverOptions, position: { x: number; y: number }) {
    this.app = app;
    this.options = options;
    this.position = position;
  }

  /** 显示浮动面板 */
  show(): void {
    if (this.el) return;

    const el = document.body.createDiv({ cls: 'pc-color-popover' });
    this.el = el;

    // ---- 1. 已有颜色提示（仅当 existing 时显示，紧凑横条）----
    if (this.options.existing) {
      const hint = el.createDiv({ cls: 'pc-popover-hint' });
      hint.createEl('span', {
        cls: 'pc-popover-hint-dot',
        attr: { style: `background-color: ${this.options.existing.color}` },
      });
      hint.createSpan({ text: t('customText.popoverExisting') });
    }

    // ---- 2. 预设色板（4×3 网格）----
    const palette = el.createDiv({ cls: 'pc-popover-palette' });
    for (const preset of PRESET_COLORS) {
      const isActive =
        this.options.existing &&
        this.options.existing.color.toLowerCase() === preset.value.toLowerCase();
      const swatch = palette.createDiv({
        cls: `pc-popover-swatch ${isActive ? 'active' : ''}`,
        attr: {
          'data-color': preset.value,
          'aria-label': preset.name,
          title: `${preset.name} ${preset.value}`,
          role: 'button',
          tabindex: '0',
        },
      });
      swatch.style.backgroundColor = preset.value;
      swatch.createEl('span', { cls: 'pc-popover-swatch-check' });

      // 点击：应用颜色并关闭
      swatch.addEventListener('click', (e) => {
        e.stopPropagation();
        this.options.onApplyColor(preset.value);
        this.hide();
      });
      // 键盘支持：Enter / Space 应用颜色
      swatch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          this.options.onApplyColor(preset.value);
          this.hide();
        }
      });
    }

    // ---- 3. 分隔线 ----
    el.createDiv({ cls: 'pc-popover-divider' });

    // ---- 4. 底部操作区（纯图标按钮）----
    const actions = el.createDiv({ cls: 'pc-popover-actions' });

    // 高级选项按钮（齿轮图标）
    const advancedBtn = actions.createEl('button', {
      cls: 'pc-popover-action pc-popover-advanced',
      attr: {
        'aria-label': t('customText.popoverMore'),
        title: t('customText.popoverMoreDesc'),
      },
    });
    advancedBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
    advancedBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.options.onOpenAdvanced();
      this.hide();
    });

    // 移除颜色按钮（仅当存在颜色规则时显示，垃圾桶图标）
    if (this.options.existing) {
      const removeBtn = actions.createEl('button', {
        cls: 'pc-popover-action pc-popover-remove',
        attr: {
          'aria-label': t('customText.popoverRemove'),
          title: t('customText.popoverRemoveDesc'),
        },
      });
      removeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.options.onRemove();
        this.hide();
      });
    }

    // ---- 5. 定位面板（智能避让屏幕边界）----
    this.positionEl();

    // ---- 6. 添加动画入场 ----
    requestAnimationFrame(() => {
      el.addClass('pc-popover-visible');
    });

    // ---- 7. 注册全局点击/键盘事件 ----
    this.registerHideHandlers();
  }

  /** 隐藏并销毁面板 */
  hide(): void {
    if (!this.el) return;

    // 移除事件监听
    for (const { event, handler, target } of this.hideHandlers) {
      target.removeEventListener(event, handler);
    }
    this.hideHandlers = [];

    // 动画退场
    this.el.removeClass('pc-popover-visible');
    this.el.addClass('pc-popover-hiding');

    const el = this.el;
    this.el = null;

    setTimeout(() => {
      el.remove();
    }, 180);
  }

  /** 定位面板到选区下方，自动避让屏幕边界 */
  private positionEl(): void {
    if (!this.el) return;

    // 先让面板可见以测量尺寸
    this.el.style.visibility = 'hidden';
    this.el.style.display = 'block';

    const rect = this.el.getBoundingClientRect();
    const popoverW = rect.width;
    const popoverH = rect.height;

    // 视口尺寸
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // 滚动偏移
    const sx = window.scrollX;
    const sy = window.scrollY;

    // 期望位置（面板顶部中心对齐选区底部中心）
    let x = this.position.x - popoverW / 2;
    let y = this.position.y;

    // 水平边界避让：左右各留 8px
    const margin = 8;
    if (x < sx + margin) x = sx + margin;
    if (x + popoverW > sx + vw - margin) x = sx + vw - margin - popoverW;

    // 垂直边界避让：下方放不下则向上弹出
    const spaceBelow = vh - (this.position.y - sy);
    const spaceAbove = this.position.y - sy - 8; // 8px 为选区到面板的间距
    let placeAbove = false;
    if (spaceBelow < popoverH + margin && spaceAbove > popoverH + margin) {
      // 改为向上弹出
      y = this.position.y - 16 - popoverH; // 16 = 8 间距 + 8 选区高度估算
      placeAbove = true;
    }

    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.visibility = '';
    this.el.style.display = '';

    // 标记弹出方向（用于箭头样式）
    if (placeAbove) {
      this.el.addClass('pc-popover-above');
    } else {
      this.el.addClass('pc-popover-below');
    }
  }

  /** 注册隐藏面板的事件监听 */
  private registerHideHandlers(): void {
    // 点击外部关闭
    const onPointerDown = (e: Event) => {
      if (this.el && !this.el.contains(e.target as Node)) {
        this.hide();
      }
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    this.hideHandlers.push({ event: 'pointerdown', handler: onPointerDown, target: document });

    // ESC 关闭
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        this.hide();
      }
    };
    document.addEventListener('keydown', onKeydown, true);
    this.hideHandlers.push({ event: 'keydown', handler: onKeydown, target: document });

    // 滚动/窗口大小变化时关闭
    const onScroll = () => this.hide();
    window.addEventListener('scroll', onScroll, true);
    this.hideHandlers.push({ event: 'scroll', handler: onScroll, target: window });

    const onResize = () => this.hide();
    window.addEventListener('resize', onResize);
    this.hideHandlers.push({ event: 'resize', handler: onResize, target: window });
  }
}

// ============================================================
// 右键菜单集成
// ============================================================

/**
 * 在编辑器右键菜单中添加自定义文本颜色相关项
 * @param menu Obsidian 菜单对象
 * @param editor 当前编辑器
 * @param onApply 应用颜色回调（弹出浮动面板或 Modal）
 * @param onRemove 移除颜色回调
 * @param onOpenPicker 打开高级选择器回调
 */
export function addColorMenuItems(
  menu: Menu,
  editor: Editor,
  callbacks: {
    onApply: () => void;
    onRemove: () => void;
    onOpenPicker: () => void;
  }
): void {
  const selected = editor.getSelection();
  const hasSelection = selected && selected.trim().length > 0;

  // 分组标题（作为 section 标题）
  menu.addItem((item) => {
    item
      .setTitle(t('customText.menuSeparator'))
      .setIcon('palette')
      .setSection('prompt-colorizer')
      .setDisabled(true);
  });

  // 1. 为选中文本应用颜色（弹出浮动面板）
  menu.addItem((item) => {
    item
      .setTitle(t('customText.menuApply'))
      .setIcon('droplet')
      .setSection('prompt-colorizer')
      .setDisabled(!hasSelection)
      .onClick(() => {
        callbacks.onApply();
      });
  });

  // 2. 打开高级颜色选择器
  menu.addItem((item) => {
    item
      .setTitle(t('customText.menuOpenPicker'))
      .setIcon('settings-2')
      .setSection('prompt-colorizer')
      .setDisabled(!hasSelection)
      .onClick(() => {
        callbacks.onOpenPicker();
      });
  });

  // 3. 移除选中文本的颜色
  menu.addItem((item) => {
    item
      .setTitle(t('customText.menuRemove'))
      .setIcon('trash')
      .setSection('prompt-colorizer')
      .setDisabled(!hasSelection)
      .onClick(() => {
        callbacks.onRemove();
      });
  });
}
