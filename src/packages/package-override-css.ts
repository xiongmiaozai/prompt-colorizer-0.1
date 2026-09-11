/**
 * 包样式覆盖层 CSS 生成（v5 包管理模块）
 *
 * 包内 tokenOverrides / ruleOverrides 仅作用于本包索引引用的 ID；
 * 多包合并后的覆盖声明在原有令牌/规则样式之上叠加，全部声明带 !important
 * （与 v2.13.1 自定义样式优先级策略一致，压过主题重置）。
 *
 * 渲染容错：覆盖表中的 ID 若本体不存在（规则集无此 cssClass / 令牌已删除），直接跳过。
 */

import type { RuleOverride, TokenOverride } from '../types';

/** 令牌覆盖 → CSS 声明（color 覆盖时清渐变残留） */
function tokenOverrideDeclarations(ov: TokenOverride): string[] {
  const decls: string[] = [];
  if (ov.color) {
    decls.push(`color: ${ov.color} !important`);
    // 覆盖纯色时清除渐变背景，避免 background-clip:text 吞掉颜色
    decls.push('background: none !important');
    decls.push('-webkit-background-clip: initial !important');
    decls.push('background-clip: initial !important');
    decls.push('-webkit-text-fill-color: currentColor !important');
  }
  if (ov.fontStyle === 'bold') decls.push('font-weight: 700 !important');
  else if (ov.fontStyle === 'italic') decls.push('font-style: italic !important');
  else if (ov.fontStyle === 'normal') {
    decls.push('font-weight: 400 !important');
    decls.push('font-style: normal !important');
  }
  return decls;
}

/** 规则覆盖 → CSS 声明 */
function ruleOverrideDeclarations(ov: RuleOverride): string[] {
  const decls: string[] = [];
  if (ov.bgColor) decls.push(`background: ${ov.bgColor} !important`);
  if (ov.border) decls.push(`border: 1px ${ov.border} currentColor !important`);
  if (ov.color) decls.push(`color: ${ov.color} !important`);
  return decls;
}

/**
 * 生成包覆盖层 CSS
 * @param tokenOverrides 合并后的令牌覆盖表（tokenId → 覆盖）
 * @param ruleOverrides 合并后的规则覆盖表（ruleId → 覆盖）
 * @param validTokenIds 存在的令牌 ID 集合（容错过滤）
 * @param ruleIdToCssClass 规则 ID → CSS 类映射（容错过滤）
 */
export function generatePackageOverrideCss(
  tokenOverrides: Record<string, TokenOverride>,
  ruleOverrides: Record<string, RuleOverride>,
  validTokenIds: Set<string>,
  ruleIdToCssClass: Record<string, string>
): string {
  const blocks: string[] = [];

  for (const [tokenId, ov] of Object.entries(tokenOverrides)) {
    if (!validTokenIds.has(tokenId)) continue;
    const decls = tokenOverrideDeclarations(ov);
    if (decls.length === 0) continue;
    const sel = `.dsl-custom-text-${tokenId}`;
    blocks.push(`${sel} {\n  ${decls.join(';\n  ')};\n}`);
  }

  for (const [ruleId, ov] of Object.entries(ruleOverrides)) {
    const cssClass = ruleIdToCssClass[ruleId];
    if (!cssClass) continue;
    const decls = ruleOverrideDeclarations(ov);
    if (decls.length === 0) continue;
    // 编辑器与阅读模式双选择器
    blocks.push(`.cm-line .${cssClass},\n.${cssClass} {\n  ${decls.join(';\n  ')};\n}`);
  }

  return blocks.join('\n\n');
}