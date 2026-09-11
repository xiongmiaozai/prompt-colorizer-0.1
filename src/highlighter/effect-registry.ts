/**
 * 自定义文本颜色效果注册表（程序化配置）
 *
 * 设计：
 * - 每个效果声明为若干 CSS 属性片段（声明式、无副作用）
 * - mergeEffectDeclarations 将多效果的声明按声明顺序合并
 *   同名属性后者覆盖前者（后选的效果优先），实现自由组合
 * - CSS 生成（custom-text-colors.ts）与 UI 预览（color-picker-modal.ts）
 *   共用同一注册表，保证所见即所得
 * - 注册表可无限扩展：新增效果只需追加 EFFECT_REGISTRY 条目
 *
 * 效果值均为合法 CSS 片段，不拼接用户自由文本（除 color 占位符），
 * 无注入风险
 */

import type { CustomColorEffect, GradientStop } from '../types';

/** 单条 CSS 声明（属性名 → 值，值中 {color} 占位符运行时替换） */
export type EffectDeclaration = Record<string, string>;

/**
 * 效果参数定义（AE Effect Controls 风格，v2.13）
 * 声明值中 {param:名称} 占位符运行时替换为用户调节值
 */
export interface EffectParam {
  /** 参数 ID（声明模板中 {param:ID} 引用） */
  id: string;
  /** i18n 标签键 */
  labelKey: string;
  /** 滑块最小值 */
  min: number;
  /** 滑块最大值 */
  max: number;
  /** 步进（1 = 整数，0.1/0.01 = 浮点） */
  step: number;
  /** 缺省值 */
  def: number;
  /** 数值后缀单位（px、em、% 等，渲染与缺省声明一致） */
  unit?: string;
}

/** 效果注册表条目 */
export interface EffectDefinition {
  /** 效果 ID（CustomColorEffect 枚举值） */
  value: CustomColorEffect;
  /** i18n 名称键 */
  labelKey: string;
  /** 该效果产生的 CSS 声明（{color} 占位符代表用户选定颜色，{param:ID} 为可调参数） */
  declarations: EffectDeclaration;
  /** 是否为复合声明（textShadow 三层等），用于特殊合并 */
  composite?: boolean;
  /** 可调参数列表（v2.13；无参数效果不定义） */
  params?: EffectParam[];
}

/**
 * hex 颜色附加透明度（#rrggbb + alpha → #rrggbbaa）
 * 3 位 hex 先扩展为 6 位；其他格式（含自带 alpha 的 4/8 位）原样返回
 */
function hexWithAlpha(hex: string, alpha: number): string {
  const c = hex.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(c)) {
    const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return c + a;
  }
  if (/^#[0-9a-fA-F]{3}$/.test(c)) {
    const six = '#' + c.slice(1).split('').map((ch) => ch + ch).join('');
    return hexWithAlpha(six, alpha);
  }
  return c;
}

/** 合法 hex 颜色校验（3/4/6/8 位，其他长度均非法） */
export function isValidHexColor(color: string): boolean {
  const c = color.trim();
  return /^#[0-9a-fA-F]{3,4}$/.test(c) || /^#[0-9a-fA-F]{6}$/.test(c) || /^#[0-9a-fA-F]{8}$/.test(c);
}

/** hex 颜色等值判断（大小写与 3 位缩写归一化后比较） */
function hexEquals(a: string, b: string): boolean {
  const expand = (c: string): string => {
    const s = c.trim().toLowerCase();
    if (/^#[0-9a-f]{3}$/.test(s)) {
      return '#' + s.slice(1).split('').map((ch) => ch + ch).join('');
    }
    return s;
  };
  return expand(a) === expand(b);
}

/**
 * 效果注册表 — 全部可用文字效果及其 CSS 声明
 * 顺序即 UI 展示顺序
 */
export const EFFECT_REGISTRY: EffectDefinition[] = [
  {
    value: 'glow',
    labelKey: 'customText.effectGlow',
    declarations: {
      'text-shadow':
        '0 0 {param:radius}px {color55}, 0 0 {param:spread}px {color30}, 0 0 {param:halo}px {color12}',
    },
    params: [
      { id: 'radius', labelKey: 'customText.paramCoreRadius', min: 1, max: 8, step: 1, def: 2, unit: 'px' },
      { id: 'spread', labelKey: 'customText.paramSpread', min: 2, max: 20, step: 1, def: 6, unit: 'px' },
      { id: 'halo', labelKey: 'customText.paramHalo', min: 4, max: 40, step: 1, def: 14, unit: 'px' },
    ],
  },
  {
    value: 'shadow',
    labelKey: 'customText.effectShadow',
    declarations: {
      'text-shadow': '{param:offset}px {param:offset}px {param:blur}px rgba(0, 0, 0, {param:opacity})',
    },
    params: [
      { id: 'offset', labelKey: 'customText.paramOffset', min: 1, max: 6, step: 1, def: 1, unit: 'px' },
      { id: 'blur', labelKey: 'customText.paramBlur', min: 0, max: 12, step: 1, def: 3, unit: 'px' },
      { id: 'opacity', labelKey: 'customText.paramOpacity', min: 0.05, max: 0.9, step: 0.05, def: 0.45 },
    ],
  },
  {
    value: 'bold',
    labelKey: 'customText.effectBold',
    declarations: { 'font-weight': '{param:weight}' },
    params: [
      { id: 'weight', labelKey: 'customText.paramWeight', min: 100, max: 900, step: 100, def: 700 },
    ],
  },
  {
    value: 'italic',
    labelKey: 'customText.effectItalic',
    declarations: { 'font-style': 'oblique {param:skew}deg' },
    params: [
      { id: 'skew', labelKey: 'customText.paramSkew', min: 8, max: 20, step: 1, def: 14, unit: '°' },
    ],
  },
  {
    value: 'underline',
    labelKey: 'customText.effectUnderline',
    declarations: { 'text-decoration': 'underline', 'text-decoration-thickness': '{param:thickness}px' },
    params: [
      { id: 'thickness', labelKey: 'customText.paramThickness', min: 1, max: 5, step: 1, def: 1, unit: 'px' },
    ],
  },
  {
    value: 'wavy',
    labelKey: 'customText.effectWavy',
    declarations: { 'text-decoration': 'underline wavy {color}', 'text-decoration-thickness': '{param:thickness}px' },
    params: [
      { id: 'thickness', labelKey: 'customText.paramThickness', min: 1, max: 5, step: 1, def: 1, unit: 'px' },
    ],
  },
  {
    value: 'dashed',
    labelKey: 'customText.effectDashed',
    declarations: { 'text-decoration': 'underline dashed {color}', 'text-decoration-thickness': '{param:thickness}px' },
    params: [
      { id: 'thickness', labelKey: 'customText.paramThickness', min: 1, max: 5, step: 1, def: 1, unit: 'px' },
    ],
  },
  {
    value: 'strikethrough',
    labelKey: 'customText.effectStrikethrough',
    declarations: { 'text-decoration': 'line-through', 'text-decoration-thickness': '{param:thickness}px' },
    params: [
      { id: 'thickness', labelKey: 'customText.paramThickness', min: 1, max: 5, step: 1, def: 1, unit: 'px' },
    ],
  },
  {
    value: 'highlight',
    labelKey: 'customText.effectHighlight',
    declarations: {
      background: '{color}{param:alpha}',
      'border-radius': '{param:radius}px',
      padding: '0 2px',
    },
    params: [
      { id: 'alpha', labelKey: 'customText.paramOpacity', min: 5, max: 60, step: 1, def: 26, unit: 'hex2' },
      { id: 'radius', labelKey: 'customText.paramRadius', min: 0, max: 12, step: 1, def: 3, unit: 'px' },
    ],
  },
  {
    value: 'marker',
    labelKey: 'customText.effectMarker',
    declarations: {
      background: 'linear-gradient(to top, {color}33 0%, transparent {param:height}%)',
      'border-radius': '2px',
      padding: '0 1px',
    },
    params: [
      { id: 'height', labelKey: 'customText.paramHeight', min: 20, max: 100, step: 5, def: 45, unit: '%' },
    ],
  },
  {
    value: 'mono',
    labelKey: 'customText.effectMono',
    declarations: { 'font-family': 'var(--pc-font-mono)' },
  },
  {
    value: 'smallcaps',
    labelKey: 'customText.effectSmallcaps',
    declarations: {
      'font-variant': 'small-caps',
      'letter-spacing': '{param:spacing}em',
    },
    params: [
      { id: 'spacing', labelKey: 'customText.paramSpacing', min: 0, max: 0.2, step: 0.01, def: 0.03, unit: 'em' },
    ],
  },
  {
    value: 'outline',
    labelKey: 'customText.effectOutline',
    declarations: {
      '-webkit-text-stroke': '{param:width}px {color}',
      '-webkit-text-fill-color': 'transparent',
    },
    params: [
      { id: 'width', labelKey: 'customText.paramStrokeWidth', min: 0.5, max: 4, step: 0.5, def: 1, unit: 'px' },
    ],
  },
  {
    value: 'superscript',
    labelKey: 'customText.effectSuperscript',
    declarations: {
      'vertical-align': 'super',
      'font-size': '{param:scale}em',
    },
    params: [
      { id: 'scale', labelKey: 'customText.paramScale', min: 0.5, max: 1, step: 0.05, def: 0.8, unit: 'em' },
    ],
  },
  {
    value: 'uppercase',
    labelKey: 'customText.effectUppercase',
    declarations: { 'text-transform': 'uppercase', 'letter-spacing': '{param:spacing}em' },
    params: [
      { id: 'spacing', labelKey: 'customText.paramSpacing', min: 0, max: 0.3, step: 0.01, def: 0.05, unit: 'em' },
    ],
  },
];

/** 按效果值索引的快速查找表 */
export const EFFECT_MAP = new Map<CustomColorEffect, EffectDefinition>(
  EFFECT_REGISTRY.map((e) => [e.value, e])
);

/** 可组合效果列表（排除 none，供 UI 多选） */
export const COMPOSABLE_EFFECTS = EFFECT_REGISTRY.filter((e) => e.value !== 'none');

/**
 * 填充声明中的颜色占位符
 * 支持：{color} 原色 / {colorNN} 附加 NN% 透明度的 hex（如 {color55} → #rrggbbaa）
 */
function fillColor(declaration: string, color: string): string {
  return declaration
    .replace(/\{color(\d*)\}/g, (_m, p1: string) => {
      if (p1 === '') return color;
      return hexWithAlpha(color, parseInt(p1, 10) / 100);
    });
}

/**
 * 效果参数映射类型（effectValue → { paramId: 数值 }，v2.13）
 */
export type EffectParams = Partial<Record<CustomColorEffect, Record<string, number>>>;

/** 十六进制透明度百分比（0-100 整数 → 00-ff，用于 highlight alpha 占位） */
function alphaHex2(pct: number): string {
  const clamped = Math.min(100, Math.max(0, Math.round(pct)));
  return clamped.toString(16).padStart(2, '0');
}

/**
 * 填充声明中的效果参数占位符 {param:ID}（v2.13）
 * 未提供的参数回退注册表缺省值；数值按定义格式化（整数不带小数点）
 * unit='hex2' 为 0-100 → 2 位 hex 透明度（用于 {color}{param:x} 拼接）
 */
function fillParams(declaration: string, def: EffectDefinition | undefined, params?: Record<string, number>): string {
  if (!def || !def.params || def.params.length === 0) return declaration;
  return declaration.replace(/\{param:([\w-]+)\}/g, (_m, id: string) => {
    const pd = def.params!.find((p) => p.id === id);
    if (!pd) return _m;
    let v = params && Number.isFinite(params[id]) ? params[id]! : pd.def;
    v = Math.min(pd.max, Math.max(pd.min, v));
    if (pd.unit === 'hex2') return alphaHex2(v);
    // 整数步进去浮点尾差；浮点保留步进精度两位
    const str = Number.isInteger(pd.step) ? String(Math.round(v)) : String(Math.round(v * 100) / 100);
    return str;
  });
}

/**
 * 读取效果的参数缺省值映射（UI 初始化用，v2.13）
 */
export function defaultEffectParams(def: EffectDefinition): Record<string, number> {
  const out: Record<string, number> = {};
  if (!def.params) return out;
  for (const p of def.params) out[p.id] = p.def;
  return out;
}

/**
 * 合并多个效果的 CSS 声明（程序化组合核心）
 *
 * 规则（v2.10.1 属性感知合并，修复叠加无效果）：
 * - 按传入顺序合并；占位符 {color}/{colorNN} 替换为用户颜色；未知效果静默忽略
 * - 同名 CSS 属性不再简单后者覆盖，按属性维度合并：
 *   - text-decoration：复合值拼接（underline + wavy → "underline wavy"，
 *     去重 line-through/underline/overline 关键词，线型/线色关键词共存）
 *   - text-shadow：逗号串接（glow + shadow 两层阴影同时可见）
 *   - 其他属性（background、border-radius 等）：后选覆盖（语义互斥）
 *
 * @param effects 效果值列表（如 ['bold', 'glow']）
 * @param color 用户选定颜色（hex）
 * @param effectParams 每个效果的参数映射（v2.13；缺省回退注册表默认值）
 * @returns 合并后的 CSS 声明映射
 */
export function mergeEffectDeclarations(
  effects: CustomColorEffect[],
  color: string,
  effectParams?: EffectParams
): EffectDeclaration {
  const merged: EffectDeclaration = {};
  for (const value of effects) {
    if (value === 'none') continue;
    const def = EFFECT_MAP.get(value);
    if (!def) continue;
    const params = effectParams?.[value];
    for (const [prop, rawValue] of Object.entries(def.declarations)) {
      let filled = fillParams(rawValue, def, params);
      filled = fillColor(filled, color);
      if (prop === 'text-decoration') {
        merged[prop] = mergeTextDecoration(merged[prop], filled);
      } else if (prop === 'text-shadow') {
        merged[prop] = merged[prop]
          ? `${merged[prop]}, ${filled}`
          : filled;
      } else {
        merged[prop] = filled;
      }
    }
  }
  return merged;
}

/**
 * text-decoration 复合值合并
 * CSS 语法：text-decoration: <line>... && <style> && <color>
 * - 线关键词（underline/overline/line-through）取并集
 * - 线型（wavy/dashed/dotted/solid/double）与线色取后选（互斥属性）
 */
function mergeTextDecoration(prev: string | undefined, next: string): string {
  if (!prev) return next;
  const tokens = (s: string) => s.trim().split(/\s+/).filter(Boolean);
  const LINE_KEYWORDS = ['underline', 'overline', 'line-through'];
  const STYLE_KEYWORDS = ['wavy', 'dashed', 'dotted', 'solid', 'double'];
  const prevTokens = tokens(prev);
  const nextTokens = tokens(next);

  // 线关键词：并集（保序）
  const lines: string[] = [];
  for (const kw of [...prevTokens, ...nextTokens]) {
    if (LINE_KEYWORDS.includes(kw) && !lines.includes(kw)) lines.push(kw);
  }
  // 线型：后选优先（next 存在则替换）
  let styles = prevTokens.filter((s) => STYLE_KEYWORDS.includes(s));
  const nextStyles = nextTokens.filter((s) => STYLE_KEYWORDS.includes(s));
  if (nextStyles.length > 0) styles = nextStyles;
  // 线色（hex/rgb 等非关键词 token）：后选优先
  const isColor = (tk: string) =>
    !LINE_KEYWORDS.includes(tk) && !STYLE_KEYWORDS.includes(tk);
  const prevColors = prevTokens.filter(isColor);
  const nextColors = nextTokens.filter(isColor);
  const colors = nextColors.length > 0 ? nextColors : prevColors;

  return [...lines, ...styles, ...colors].join(' ');
}

/**
 * outline 效果组合修正（v2.10.1）
 *
 * outline 单选时是"空心字"（描边 + 透明填充），但与其他效果叠加时
 * 透明填充会吃掉一切文字颜色/阴影/渐变——用户视角即"叠加无效果"。
 * 修正：检测到 outline 与其他填充类效果共存时，填充透明改回主色，
 * 保留描边 → "描边 + 填充"可见组合；纯 outline 单选时维持空心字。
 *
 * @param declarations mergeEffectDeclarations 的输出（就地修改）
 * @param effects 实际勾选的效果组合
 * @param color 主色（填充回退色）
 */
export function reconcileOutline(
  declarations: EffectDeclaration,
  effects: CustomColorEffect[],
  color: string
): void {
  const hasOutline = effects.includes('outline');
  if (!hasOutline) return;
  // 除 outline 外还有其他效果 → 描边 + 填充共存
  const others = effects.filter((e) => e !== 'outline' && e !== 'none');
  if (others.length > 0 && declarations['-webkit-text-fill-color'] === 'transparent') {
    declarations['-webkit-text-fill-color'] = color;
  }
}

/**
 * 将合并后的声明转为 CSS 规则体（用于生成 <style> 注入）
 * @param className CSS 类名（如 dsl-custom-text-abc123）
 * @param declarations mergeEffectDeclarations 的输出
 * @returns 类选择器规则文本
 */
export function declarationsToCssRule(
  className: string,
  declarations: EffectDeclaration
): string {
  // v2.13.1：全部声明追加 !important——自定义颜色规则是用户显式配置的最高优先级样式
  // （匹配优先级 priority: 1000），须对抗主题对 .cm-line span 的 text-decoration /
  // font-variant 等属性的重置；不加则会被主题 !important 规则整批压制（"勾选无效果"根因）
  const body = Object.entries(declarations)
    .map(([prop, value]) => `  ${prop}: ${value} !important;`)
    .join('\n');
  return `.cm-line .${className} {\n${body}\n}\n.${className} {\n${body}\n}`;
}

/**
 * 旧版单选 effect 字段 → 新版 effects 数组迁移
 * 读取设置时调用，保证旧数据可用
 */
export function migrateEffects(item: {
  effect?: CustomColorEffect;
  effects?: CustomColorEffect[];
}): CustomColorEffect[] {
  if (item.effects && item.effects.length > 0) return item.effects;
  if (item.effect && item.effect !== 'none') return [item.effect];
  return [];
}

/**
 * 渐变色点归一化（AE 风格多色渐变，v2.10）
 *
 * - 过滤非法色点（非 hex）并 clamp position 至 [0, 100]
 * - 按 position 升序排序（CSS linear-gradient 要求色点顺序与位置一致）
 * - 首尾无 0%/100% 色点时自动补齐（沿用首/末色点颜色，符合 AE 边界色点行为）
 *
 * @param stops 原始色点列表
 * @returns 归一化后的色点（长度可能变化）；少于 2 个有效色点返回 []
 */
export function normalizeGradientStops(stops: GradientStop[] | undefined): GradientStop[] {
  if (!stops || stops.length === 0) return [];
  const valid = stops
    .filter((s) => s && isValidHexColor(s.color))
    .map((s) => ({ color: s.color.trim(), position: Math.min(100, Math.max(0, Number(s.position) || 0)) }))
    .sort((a, b) => a.position - b.position);
  // 少于 2 个有效色点不成渐变（单色点复制为同色双端无意义，回退 color2/纯色路径）
  if (valid.length < 2) return [];
  if (valid[0].position > 0) valid.unshift({ ...valid[0], position: 0 });
  if (valid[valid.length - 1].position < 100) valid.push({ ...valid[valid.length - 1], position: 100 });
  return valid;
}

/**
 * 渐变色点列表 → CSS linear-gradient 色点串
 * @param stops 归一化后的色点
 * @returns 如 "#f00 0%, #0ff 50%, #ff0 100%"；色点数 <2 返回 null
 */
export function gradientStopsToCss(stops: GradientStop[]): string | null {
  if (!stops || stops.length < 2) return null;
  return stops.map((s) => `${s.color} ${s.position}%`).join(', ');
}

/**
 * 双色/多色渐变合成（渐变逻辑单一真源，v2.9 / v2.10）
 *
 * CSS 生成（custom-text-colors.ts）与 Modal 预览（color-picker-modal.ts）共用，
 * 保证所见即所得。在 mergeEffectDeclarations 输出的基础上就地修改：
 *
 * 优先级：gradientStops（≥2 有效色点，v2.10 多色渐变）> color2（v2.9 双色渐变）> 纯色
 * - 启用后：background-image 渐变 + background-clip: text + 文字填充透明
 * - 冲突消解（按属性维度，均在渐变成立的前提下，v2.12 全部共存化）：
 *   text-shadow    → filter: drop-shadow 三层等效发光（text-fill 透明会连带阴影透明）
 *   background     → 提取为多层背景效果层（marker/highlight 半透明层叠于渐变上层，均可见）
 *   outline 描边   → 保留 -webkit-text-stroke（stroke 绘制在边缘，fill 透明露出渐变）
 *
 * @param declarations mergeEffectDeclarations 的输出（就地修改）
 * @param color 主色（hex；多色模式下用于 glow 降级的发光基色与纯色兜底）
 * @param color2 辅助色（双色渐变终点；空串/非法/同色 = 不启用双色）
 * @param stops 多色渐变色点（可选，优先于 color2）
 * @param angle 渐变角度（度，默认 135）
 */
export function applyGradient(
  declarations: EffectDeclaration,
  color: string,
  color2: string,
  stops?: GradientStop[],
  angle?: number
): void {
  const deg = Math.min(360, Math.max(0, Number(angle ?? 135) || 0));

  // 预先提取效果背景层（marker 荧光条 / highlight 色罩走 background 简写；
  // background-image 为前向兼容保留）
  const prevImage = declarations['background-image'];
  const effectBg = declarations['background'];

  // 渐变层合成（多色优先，其次双色）
  const normalized = normalizeGradientStops(stops);
  const stopsCss = gradientStopsToCss(normalized);
  let gradientImage: string | null = null;
  if (stopsCss) {
    gradientImage = `linear-gradient(${deg}deg, ${stopsCss})`;
  } else if (color2 && isValidHexColor(color2) && isValidHexColor(color) && !hexEquals(color, color2)) {
    // 双色渐变（v2.9 兼容路径）
    gradientImage = `linear-gradient(${deg}deg, ${color}, ${color2})`;
  } else {
    return;
  }

  // 背景类效果与渐变共存（v2.12）：
  // background 简写会重置 background-image，故提取为独立层，
  // 合成多层背景 [效果层(上, 半透明可见), 渐变层(下)]，clip: text 下均裁剪至文字内
  const bgLayers: string[] = [];
  if (prevImage) bgLayers.push(prevImage);
  if (effectBg) {
    const v = effectBg.trim();
    // 纯色背景包装为同色渐变层；渐变背景直接作一层
    bgLayers.push(/^linear-gradient\(/i.test(v) ? v : `linear-gradient(${v}, ${v})`);
    delete declarations['background'];
    // 背景效果的圆角/内边距与渐变文字无冲突，保留
  }
  bgLayers.push(gradientImage);
  declarations['background-image'] = bgLayers.join(', ');

  declarations['-webkit-background-clip'] = 'text';
  declarations['background-clip'] = 'text';
  declarations['-webkit-text-fill-color'] = 'transparent';

  // 发光基色：多色取首色点，双色取主色
  const glowBase = stopsCss ? normalized[0].color : color;

  // text-shadow 与透明填充冲突 → drop-shadow 三层等效发光（保留发光层次，不只是单层 1px）
  if (declarations['text-shadow']) {
    declarations['filter'] =
      `drop-shadow(0 0 2px ${hexWithAlpha(glowBase, 0.55)}), ` +
      `drop-shadow(0 0 6px ${hexWithAlpha(glowBase, 0.30)}), ` +
      `drop-shadow(0 0 14px ${hexWithAlpha(glowBase, 0.12)})`;
    delete declarations['text-shadow'];
  }

  // outline 描边保留（v2.12）：stroke 绘制在文字边缘，fill 透明露出背景渐变
  // → "描边 + 渐变填充"共存，不再删除
}