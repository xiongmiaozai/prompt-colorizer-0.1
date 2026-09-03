/**
 * 自定义文本颜色匹配器
 *
 * 功能：
 * - 根据用户配置的 CustomTextColor 列表，在文本中查找匹配区间
 * - 支持大小写敏感、全字匹配
 * - 转义正则特殊字符，避免注入风险
 * - 返回结果与编辑器/阅读模式统一兼容的 RuleMatchResult 结构
 *
 * 设计：
 * - 自定义文本颜色优先级最高（覆盖 DSL 规则）
 * - 每个 CustomTextColor 对应一个 CSS 类名 dsl-custom-text-{id}
 * - 类名样式由 main.ts 动态注入的 <style> 提供
 *
 * 不写入 md 文件：颜色信息仅保存在插件本地数据，匹配发生在内存中
 */

import type { CustomTextColor } from '../types';
import type { RuleMatchResult } from '../rule-engine/types';

/**
 * 转义字符串中的正则特殊字符
 * 避免用户输入的文本被当作正则模式解析
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 判断字符是否为「单词字符」（字母、数字、下划线、汉字）
 * 用于全字匹配的边界判断
 */
function isWordChar(ch: string): boolean {
  if (!ch) return false;
  // ASCII 字母、数字、下划线
  if (/[a-zA-Z0-9_]/.test(ch)) return true;
  // 汉字范围（CJK 基本区 + 扩展A区）
  if (/[\u4e00-\u9fff\u3400-\u4dbf]/.test(ch)) return true;
  return false;
}

/**
 * 构建单个 CustomTextColor 的正则表达式
 * @param item 自定义颜色项
 * @returns 编译后的 RegExp，失败返回 null
 */
function buildRegex(item: CustomTextColor): RegExp | null {
  const text = item.text;
  if (!text) return null;

  const escaped = escapeRegExp(text);
  let pattern: string;

  if (item.wholeWord) {
    // 全字匹配：使用自定义边界判断（兼容中英文混排）
    // 通过前置 (?<![\w\u4e00-\u9fff]) 和后置 (?![\w\u4e00-\u9fff]) 实现
    // 注意：JavaScript 正则支持 lookbehind（ES2018+），Obsidian Electron 环境支持
    pattern = `(?<![\\w\\u4e00-\\u9fff\\u3400-\\u4dbf])${escaped}(?![\\w\\u4e00-\\u9fff\\u3400-\\u4dbf])`;
  } else {
    pattern = escaped;
  }

  const flags = item.caseSensitive ? 'g' : 'gi';
  try {
    return new RegExp(pattern, flags);
  } catch (e) {
    // 正则编译失败（如不支持 lookbehind 的环境），降级为不带边界的简单匹配
    console.warn('[PromptColorizer] 自定义颜色规则正则编译失败，降级处理:', e);
    try {
      return new RegExp(escaped, flags);
    } catch {
      return null;
    }
  }
}

/**
 * 在文本中匹配所有自定义颜色规则
 * @param text 文档全文
 * @param colors 自定义颜色规则列表
 * @param enabled 是否启用（全局开关）
 * @returns 匹配结果数组（按 from 升序、去重）
 */
export function matchCustomTextColors(
  text: string,
  colors: CustomTextColor[],
  enabled: boolean
): RuleMatchResult[] {
  if (!enabled || !colors || colors.length === 0) return [];

  const results: RuleMatchResult[] = [];
  const docLength = text.length;

  for (const item of colors) {
    if (!item.enabled) continue;
    if (!item.text) continue;

    const regex = buildRegex(item);
    if (!regex) continue;

    let m: RegExpExecArray | null;
    regex.lastIndex = 0;
    while ((m = regex.exec(text)) !== null) {
      const from = m.index;
      const to = from + m[0].length;

      // 边界保护
      if (from === to || from >= docLength) {
        // 避免零宽匹配死循环
        if (m[0] === '') {
          regex.lastIndex++;
        }
        continue;
      }

      results.push({
        from: Math.max(0, from),
        to: Math.min(docLength, to),
        cssClass: `dsl-custom-text-${item.id}`,
        // 自定义颜色优先级最高，覆盖所有 DSL 规则
        priority: 1000,
        block: false,
        ruleId: `custom-text-${item.id}`,
      });

      // 避免零宽匹配死循环
      if (m[0] === '') {
        regex.lastIndex++;
      }
    }
  }

  // 按 from 升序排序
  results.sort((a, b) => a.from - b.from);

  // 去重处理：相同区间保留优先级最高的（这里所有自定义颜色优先级相同，保留第一个）
  // 同时合并相邻的同色区间以减少装饰数量
  if (results.length === 0) return [];

  const deduped: RuleMatchResult[] = [];
  for (const r of results) {
    const last = deduped[deduped.length - 1];
    if (last && last.to > r.from && last.from <= r.from) {
      // 区间重叠，保留先出现的（即 last），跳过 r
      // 同时如果 last 的 cssClass 与 r 相同，扩展 last 的 to
      if (last.cssClass === r.cssClass && last.to < r.to) {
        last.to = r.to;
      }
      continue;
    }
    deduped.push({ ...r });
  }

  return deduped;
}

/**
 * 检测给定区间是否与任何自定义颜色匹配区间重叠
 * 用于过滤 DSL 规则中与自定义颜色重叠的匹配（保留自定义颜色）
 * @param from 待检测区间起始
 * @param to 待检测区间结束
 * @param customMatches 自定义颜色匹配列表
 * @returns 是否重叠
 */
export function overlapsCustomColor(
  from: number,
  to: number,
  customMatches: RuleMatchResult[]
): boolean {
  for (const cm of customMatches) {
    // 区间相交判断：[from, to) 与 [cm.from, cm.to) 有交集
    if (from < cm.to && cm.from < to) {
      return true;
    }
  }
  return false;
}

/**
 * 根据自定义颜色列表生成对应的 CSS 样式文本
 * 注入到 document.head 后，类名 dsl-custom-text-{id} 即可生效
 * @param colors 自定义颜色规则列表
 * @returns CSS 文本（空字符串表示无需注入）
 */
export function generateCustomTextColorsCss(colors: CustomTextColor[]): string {
  if (!colors || colors.length === 0) return '';

  const lines: string[] = [];
  for (const c of colors) {
    if (!c.id || !c.color) continue;
    // 同时作用于编辑器（.cm-content 内）和阅读模式（.markdown-preview-view 内）
    // 使用 .dsl-custom-text-{id} 类选择器
    lines.push(`.dsl-custom-text-${c.id} { color: ${c.color}; }`);
  }
  return lines.join('\n');
}

/**
 * 根据文本内容查找匹配的自定义颜色规则
 * 用于「移除选中文本颜色」命令
 * @param text 选中的文本
 * @param colors 自定义颜色规则列表
 * @returns 匹配的规则 ID 列表（可能多个）
 */
export function findMatchingCustomColorIds(
  text: string,
  colors: CustomTextColor[]
): string[] {
  if (!text || !colors || colors.length === 0) return [];

  const ids: string[] = [];
  for (const item of colors) {
    if (!item.enabled || !item.text) continue;

    // 简化的等值判断（不考虑全字匹配，因为命令是按选中文本查找）
    const target = item.text;
    if (item.caseSensitive) {
      if (text === target) ids.push(item.id);
    } else {
      if (text.toLowerCase() === target.toLowerCase()) ids.push(item.id);
    }
  }
  return ids;
}
