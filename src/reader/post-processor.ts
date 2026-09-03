/**
 * 提示词着色插件 — 阅读模式后处理器
 * 在阅读模式下渲染彩色提示词块
 *
 * v2 重构：
 * - 使用 RuleMatcher 动态规则引擎替代 collectAllMatches
 * - DSL 模式匹配（dsl-* 前缀类名）由 RuleMatcher 统一处理
 * - 保留 DOM 专用处理函数（代码块、标题、HTML 标签等）
 */

import { MarkdownPostProcessorContext } from 'obsidian';
import type { PromptColorizerSettings } from '../types';
import type { RuleMatcher } from '../rule-engine/matcher';
import { matchCustomTextColors } from '../highlighter/custom-text-colors';

/**
 * 阅读模式后处理器
 * 处理渲染后的 HTML，为提示词内容添加颜色
 * @param settings 插件设置
 * @param matcher 规则匹配器实例
 */
export function createPostProcessor(
  settings: PromptColorizerSettings,
  matcher: RuleMatcher | null = null
) {
  return (el: HTMLElement, ctx: MarkdownPostProcessorContext): void => {
    if (!settings.readerModeEnabled) return;

    // 处理代码块（DOM 专用，不依赖规则引擎）
    processCodeBlocks(el, settings);

    // 处理行内代码中的变量（DOM 专用）
    processInlineCode(el, settings);

    // 处理标题（角色标题，DOM 专用）
    processHeadings(el, settings);

    // 处理 HTML 标签（角色标签，DOM 专用）
    processHtmlTags(el, settings);

    // 处理注释（DOM 专用）
    processComments(el, settings);

    // 处理指令标记（DOM 专用）
    processInstructions(el, settings);

    // 处理 DSL 模式匹配（使用 RuleMatcher 统一处理）
    if (matcher) {
      processDslPatterns(el, settings, matcher);
    }

    // 处理自定义文本颜色（优先级最高，不写入 md 文件，按文本内容全局匹配）
    // 放在 DSL 之后处理：仅对未被 DSL 着色的纯文本节点应用自定义颜色
    // 用户主动指定的颜色应优先于 DSL 规则，但为避免重复着色，这里跳过已有 pc-reader-/dsl- 类的节点
    processCustomTextColors(el, settings);

    // 处理变量占位符（最后处理，避免与 DSL 模式冲突）
    processVariables(el, settings);
  };
}

/**
 * 处理代码块着色
 */
function processCodeBlocks(el: HTMLElement, settings: PromptColorizerSettings): void {
  if (!settings.highlightCodeBlocks && !settings.highlightJsonBlocks) return;

  const codeBlocks = el.querySelectorAll('pre > code');
  codeBlocks.forEach((code) => {
    const codeEl = code as HTMLElement;
    const lang = codeEl.className.match(/language-(\w+)/)?.[1]?.toLowerCase();

    if (lang === 'json' && settings.highlightJsonBlocks) {
      codeEl.parentElement?.addClass('pc-reader-codeblock-json');
    } else if (settings.highlightCodeBlocks) {
      codeEl.parentElement?.addClass('pc-reader-codeblock');
    }
  });
}

/**
 * 处理行内代码中的变量
 */
function processInlineCode(el: HTMLElement, settings: PromptColorizerSettings): void {
  if (!settings.highlightInlineCode) return;

  const inlineCodes = el.querySelectorAll('code:not(pre > code)');
  inlineCodes.forEach((code) => {
    const codeEl = code as HTMLElement;
    const text = codeEl.textContent || '';
    if (/^\{\{[^}]+\}\}$/.test(text) || /^\$\{[^}]+\}$/.test(text)) {
      codeEl.addClass('pc-reader-variable');
    } else {
      codeEl.addClass('pc-reader-inline-code');
    }
  });
}

/**
 * 处理标题（角色标题）
 */
function processHeadings(el: HTMLElement, settings: PromptColorizerSettings): void {
  if (!settings.highlightRoleHeaders) return;

  const headings = el.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading) => {
    const hEl = heading as HTMLElement;
    const text = hEl.textContent?.toLowerCase().trim() || '';

    if (text === 'system' || text === '系统') {
      hEl.addClass('pc-reader-role-system');
    } else if (text === 'user' || text === '用户') {
      hEl.addClass('pc-reader-role-user');
    } else if (text === 'assistant' || text === '助手' || text === 'ai') {
      hEl.addClass('pc-reader-role-assistant');
    } else if (text === 'tool' || text === '工具') {
      hEl.addClass('pc-reader-role-tool');
    }
  });
}

/**
 * 处理 HTML 标签（角色标签）
 */
function processHtmlTags(el: HTMLElement, settings: PromptColorizerSettings): void {
  if (!settings.highlightRoleTags) return;

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const text = node.textContent || '';
      if (/<\/?(system|user|assistant|tool)>/i.test(text)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });

  const nodesToProcess: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    nodesToProcess.push(current as Text);
  }

  for (const textNode of nodesToProcess) {
    const text = textNode.textContent || '';
    const parent = textNode.parentElement;
    if (!parent) continue;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    const regex = /<(\/?)(system|user|assistant|tool)>/gi;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index))
        );
      }

      const tagSpan = document.createElement('span');
      const role = match[2].toLowerCase();
      const isClose = match[1] === '/';
      tagSpan.className = `pc-reader-role-tag pc-reader-role-${role}${isClose ? '-close' : '-open'}`;
      tagSpan.textContent = match[0];
      fragment.appendChild(tagSpan);

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    parent.replaceChild(fragment, textNode);
  }
}

/**
 * 处理注释
 */
function processComments(el: HTMLElement, settings: PromptColorizerSettings): void {
  if (!settings.highlightComments) return;

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const text = node.textContent || '';
      if (/%%[\s\S]*?%%/.test(text) || /<!--[\s\S]*?-->/.test(text)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });

  const nodesToProcess: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    nodesToProcess.push(current as Text);
  }

  for (const textNode of nodesToProcess) {
    const text = textNode.textContent || '';
    const parent = textNode.parentElement;
    if (!parent) continue;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    const regex = /%%([\s\S]*?)%%/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index))
        );
      }

      const commentSpan = document.createElement('span');
      commentSpan.className = 'pc-reader-comment';
      commentSpan.textContent = match[0];
      fragment.appendChild(commentSpan);

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    parent.replaceChild(fragment, textNode);
  }
}

/**
 * 处理指令标记 [INST][/INST]
 */
function processInstructions(el: HTMLElement, settings: PromptColorizerSettings): void {
  if (!settings.highlightInstructionMarkers) return;

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest('code') || parent.closest('pre')) {
        return NodeFilter.FILTER_REJECT;
      }
      const text = node.textContent || '';
      if (/\[\/?(INST|SYS)\]/i.test(text)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });

  const nodesToProcess: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    nodesToProcess.push(current as Text);
  }

  for (const textNode of nodesToProcess) {
    const text = textNode.textContent || '';
    const parent = textNode.parentElement;
    if (!parent) continue;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    const regex = /(\[\/?(?:INST|SYS)\])/gi;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index))
        );
      }

      const instSpan = document.createElement('span');
      const isClose = match[0].includes('/');
      instSpan.className = isClose
        ? 'pc-reader-instruction-close'
        : 'pc-reader-instruction-open';
      instSpan.textContent = match[0];
      fragment.appendChild(instSpan);

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    parent.replaceChild(fragment, textNode);
  }
}

/**
 * 处理 DSL 模式匹配
 * 使用 RuleMatcher 对文本节点执行统一规则匹配，为匹配区间添加 CSS 类名
 * @param el HTML 元素根节点
 * @param settings 插件设置
 * @param matcher 规则匹配器
 */
function processDslPatterns(
  el: HTMLElement,
  settings: PromptColorizerSettings,
  matcher: RuleMatcher
): void {
  // 设置上下文和词典开关
  matcher.setContextEnabled(settings.contextSemanticEnabled);
  matcher.setLexiconEnabled(settings.lexiconEnabled);

  // 收集需要处理的文本节点
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      // 跳过代码块和行内代码
      if (parent.closest('code') || parent.closest('pre')) {
        return NodeFilter.FILTER_REJECT;
      }
      // 跳过已被着色处理的 span（避免重复处理）
      if (parent.closest('[class*="pc-reader-"]')) {
        return NodeFilter.FILTER_REJECT;
      }
      const text = node.textContent || '';
      if (text.trim().length === 0) {
        return NodeFilter.FILTER_SKIP;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodesToProcess: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    nodesToProcess.push(current as Text);
  }

  for (const textNode of nodesToProcess) {
    const text = textNode.textContent || '';
    const parent = textNode.parentElement;
    if (!parent) continue;

    // 使用 RuleMatcher 执行匹配
    const matches = matcher.match(text);

    if (matches.length === 0) continue;

    // 构建替换片段
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    for (const match of matches) {
      const from = Math.max(0, Math.min(match.from, text.length));
      const to = Math.max(from, Math.min(match.to, text.length));
      if (from === to) continue;

      // 添加匹配前的普通文本
      if (from > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, from))
        );
      }

      // 创建着色 span（使用 dsl- 前缀类名，与编辑器模式统一）
      const span = document.createElement('span');
      span.className = match.cssClass;
      span.textContent = text.slice(from, to);
      fragment.appendChild(span);

      lastIndex = to;
    }

    // 添加剩余文本
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    parent.replaceChild(fragment, textNode);
  }
}

/**
 * 处理文本中的变量占位符
 */
function processVariables(el: HTMLElement, settings: PromptColorizerSettings): void {
  if (!settings.highlightVariables) return;

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest('code') || parent.closest('pre')) {
        return NodeFilter.FILTER_REJECT;
      }
      const text = node.textContent || '';
      if (/\{\{[^}]+\}\}|\$\{[^}]+\}|<\|[^|]+\|>/.test(text)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });

  const nodesToProcess: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    nodesToProcess.push(current as Text);
  }

  for (const textNode of nodesToProcess) {
    const text = textNode.textContent || '';
    const parent = textNode.parentElement;
    if (!parent) continue;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    const regex = /(\{\{[^}]+\}\}|\$\{[^}]+\}|<\|[^|]+\|>)/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index))
        );
      }

      const varSpan = document.createElement('span');
      varSpan.className = 'pc-reader-variable';
      varSpan.textContent = match[0];
      fragment.appendChild(varSpan);

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    parent.replaceChild(fragment, textNode);
  }
}

/**
 * 处理自定义文本颜色
 * 在阅读模式下，遍历剩余的纯文本节点，对匹配自定义颜色规则的文本应用颜色
 *
 * 设计：
 * - 仅处理未被其他着色函数处理过的纯文本节点
 * - 跳过代码块、行内代码、已有 pc-reader-/dsl- 类的节点
 * - 颜色信息不写入 md 文件，仅通过 CSS 类名应用
 * - CSS 类名样式由 main.ts 动态注入的 <style> 提供
 *
 * @param el HTML 元素根节点
 * @param settings 插件设置
 */
function processCustomTextColors(
  el: HTMLElement,
  settings: PromptColorizerSettings
): void {
  if (settings.customTextColorsEnabled === false) return;
  if (!settings.customTextColors || settings.customTextColors.length === 0) return;
  // 启用开关已确认开启，下面统一传入 true 简化类型推断

  // 收集需要处理的文本节点
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      // 跳过代码块和行内代码
      if (parent.closest('code') || parent.closest('pre')) {
        return NodeFilter.FILTER_REJECT;
      }
      // 跳过已被着色处理的 span（避免重复处理）
      // 已有 pc-reader-* 或 dsl-* 类的节点表示已被其他流程着色
      if (parent.closest('[class*="pc-reader-"]')) {
        return NodeFilter.FILTER_REJECT;
      }
      if (parent.closest('[class*="dsl-"]')) {
        return NodeFilter.FILTER_REJECT;
      }
      const text = node.textContent || '';
      if (text.trim().length === 0) {
        return NodeFilter.FILTER_SKIP;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodesToProcess: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    nodesToProcess.push(current as Text);
  }

  for (const textNode of nodesToProcess) {
    const text = textNode.textContent || '';
    const parent = textNode.parentElement;
    if (!parent) continue;

    // 使用自定义颜色匹配器查找匹配区间
    // 启用状态已在函数入口判断，此处直接传 true
    const matches = matchCustomTextColors(
      text,
      settings.customTextColors,
      true
    );

    if (matches.length === 0) continue;

    // 构建替换片段
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    for (const match of matches) {
      const from = Math.max(0, Math.min(match.from, text.length));
      const to = Math.max(from, Math.min(match.to, text.length));
      if (from === to) continue;

      // 添加匹配前的普通文本
      if (from > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, from))
        );
      }

      // 创建着色 span（使用 dsl-custom-text-{id} 类名，与编辑器模式统一）
      const span = document.createElement('span');
      span.className = match.cssClass;
      span.textContent = text.slice(from, to);
      fragment.appendChild(span);

      lastIndex = to;
    }

    // 添加剩余文本
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    parent.replaceChild(fragment, textNode);
  }
}
