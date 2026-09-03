/**
 * 提示词着色插件 — 文件浏览器颜色标记
 * 根据文件类型在文件浏览器中显示颜色圆点和类型标签
 *
 * 基于 UI界面可视化终极重构方案：
 * - 可感知：Mac 风格精致圆点 + 类型标签
 * - 可反馈：hover 放大 + 发光效果
 * - 可预期：统一的位置和视觉模式
 * - 跨平台：明暗模式自适应
 */

import { App, TFile, TFolder, CachedMetadata } from 'obsidian';
import type { PromptColorizerSettings, FileType, FileTypeColor } from '../types';

/** 文件类型简短标签映射 */
const FILE_TYPE_SHORT_LABELS: Record<FileType, { zh: string; en: string }> = {
  system:    { zh: '系统', en: 'SYS' },
  user:      { zh: '用户', en: 'USR' },
  assistant: { zh: '助手', en: 'AST' },
  tool:      { zh: '工具', en: 'TOL' },
  example:   { zh: '示例', en: 'EX' },
  variable:  { zh: '变量', en: 'VAR' },
  template:  { zh: '模板', en: 'TPL' },
  video:     { zh: '视频', en: 'VID' },
  none:      { zh: '', en: '' },
};

/**
 * 根据文件路径和元数据判断文件类型
 */
export function detectFileType(
  app: App,
  file: TFile,
  settings: PromptColorizerSettings
): FileType {
  // 1. 基于 frontmatter type 字段
  if (settings.detectByFrontmatter) {
    const cache: CachedMetadata | null = app.metadataCache.getFileCache(file);
    const fmType = cache?.frontmatter?.['type'] as string | undefined;
    if (fmType) {
      const normalized = fmType.toLowerCase().trim();
      if (isValidFileType(normalized)) {
        return normalized as FileType;
      }
    }

    // 也检查 tags
    const tags = cache?.frontmatter?.['tags'];
    if (tags) {
      const tagList = Array.isArray(tags) ? tags : [tags];
      for (const tag of tagList) {
        const tagStr = String(tag).toLowerCase().replace(/^#/, '');
        if (tagStr === 'system-prompt' || tagStr === 'system') return 'system';
        if (tagStr === 'user-prompt' || tagStr === 'user') return 'user';
        if (tagStr === 'assistant-prompt' || tagStr === 'assistant') return 'assistant';
        if (tagStr === 'tool-prompt' || tagStr === 'tool') return 'tool';
        if (tagStr === 'example' || tagStr === 'few-shot') return 'example';
        if (tagStr === 'variable' || tagStr === 'variables') return 'variable';
        if (tagStr === 'template') return 'template';
        if (tagStr === 'video-prompt' || tagStr === 'video' || tagStr === 'storyboard') return 'video';
      }
    }
  }

  // 2. 基于文件夹路径(最长路径优先,避免父路径短路子路径)
  if (settings.detectByFolder) {
    const filePath = file.path.toLowerCase();
    // 按映射路径长度降序排序,确保更具体的子路径先匹配
    // 例如配置了 'prompts/' 和 'prompts/video/',后者应优先命中
    const sortedMappings = [...settings.folderMappings].sort(
      (a, b) => b.path.length - a.path.length
    );
    for (const mapping of sortedMappings) {
      const folderPath = mapping.path.toLowerCase();
      // 严格按路径段匹配:必须以 'folderPath/' 开头,或完全等于 folderPath
      // 避免 'prompts-test/' 误命中 'prompts' 这类前缀陷阱
      if (filePath === folderPath || filePath.startsWith(folderPath + '/')) {
        return mapping.type;
      }
    }
  }

  // 3. 基于文件名前缀
  if (settings.detectByFilename) {
    const name = file.basename.toLowerCase();
    if (name.startsWith('sys-') || name.startsWith('system-')) return 'system';
    if (name.startsWith('user-')) return 'user';
    if (name.startsWith('assistant-') || name.startsWith('ast-')) return 'assistant';
    if (name.startsWith('tool-') || name.startsWith('tol-')) return 'tool';
    if (name.startsWith('example-') || name.startsWith('few-shot-')) return 'example';
    if (name.startsWith('var-') || name.startsWith('variable-')) return 'variable';
    if (name.startsWith('template-') || name.startsWith('tpl-')) return 'template';
    if (name.startsWith('video-') || name.startsWith('vid-') || name.startsWith('shot-')) return 'video';
  }

  return 'none';
}

/**
 * 检查是否为有效的文件类型
 */
function isValidFileType(type: string): boolean {
  return ['system', 'user', 'assistant', 'tool', 'example', 'variable', 'template', 'video', 'none'].includes(type);
}

/**
 * 获取文件类型对应的颜色配置
 */
export function getFileTypeColor(
  type: FileType,
  settings: PromptColorizerSettings
): FileTypeColor | undefined {
  return settings.fileTypeColors.find((c) => c.type === type);
}

/**
 * 获取文件类型的简短标签文字
 */
function getTypeLabel(type: FileType, lang: 'zh' | 'en'): string {
  const labels = FILE_TYPE_SHORT_LABELS[type];
  if (!labels) return '';
  return lang === 'zh' ? labels.zh : labels.en;
}

/**
 * 将十六进制颜色转换为带透明度的 rgba
 */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * 为文件浏览器中的文件项添加颜色标记
 */
export function colorizeFileExplorer(
  app: App,
  settings: PromptColorizerSettings
): void {
  if (!settings.fileColorizerEnabled) return;

  // 获取文件浏览器中的所有文件项
  const fileExplorerItem = app.workspace.getLeavesOfType('file-explorer');

  for (const leaf of fileExplorerItem) {
    const container = leaf.view.containerEl;
    if (!container) continue;

    // 查找所有文件项
    const fileItems = container.querySelectorAll('.tree-item-self');
    fileItems.forEach((item) => {
      const itemEl = item as HTMLElement;
      // 检查是否已处理
      if (itemEl.dataset.pcProcessed === 'true') return;

      // 获取文件路径(优先使用 data-path 属性精确匹配,避免同名文件误命中)
      // Obsidian 文件浏览器项的父级 .tree-item 元素含 data-path 属性,值为文件相对路径
      const treeItem = itemEl.closest('.tree-item') as HTMLElement | null;
      const filePath = treeItem?.dataset?.path;

      let matchedFile: TFile | null = null;
      if (filePath) {
        // 精确路径匹配(推荐路径,无歧义)
        const abstractFile = app.vault.getAbstractFileByPath(filePath);
        if (abstractFile instanceof TFile) {
          matchedFile = abstractFile;
        }
      }

      // 兜底:无法获取 data-path 时,回退到 basename 匹配(保留向后兼容)
      // 注:此分支在同名文件场景下可能误命中,仅作为 DOM 结构异常时的降级
      if (!matchedFile) {
        const fileLink = itemEl.querySelector('.tree-item-inner');
        if (!fileLink) return;
        const fileName = fileLink.textContent || '';
        const allFiles = app.vault.getMarkdownFiles();
        matchedFile = allFiles.find((f) => f.basename === fileName) ?? null;
      }

      if (matchedFile) {
        const fileType = detectFileType(app, matchedFile, settings);
        const colorConfig = getFileTypeColor(fileType, settings);

        if (colorConfig && fileType !== 'none') {
          itemEl.dataset.pcProcessed = 'true';
          itemEl.dataset.pcType = fileType;

          // 获取 fileLink 用于插入圆点和标签
          const fileLink = itemEl.querySelector('.tree-item-inner');
          if (!fileLink) return;

          // 添加颜色圆点
          if (settings.showColorDot) {
            const dot = itemEl.createEl('span', {
              cls: 'pc-file-dot',
            });
            dot.style.width = `${settings.colorDotSize}px`;
            dot.style.height = `${settings.colorDotSize}px`;
            dot.style.backgroundColor = colorConfig.color;
            dot.style.setProperty('--pc-dot-color', colorConfig.color);
            dot.style.flexShrink = '0';
            // 插入到文件名前
            fileLink.parentElement?.insertBefore(dot, fileLink);
          }

          // 添加文件类型标签（药丸样式）
          const typeLabel = getTypeLabel(fileType, settings.language);
          if (typeLabel) {
            const badge = itemEl.createEl('span', {
              cls: 'pc-file-type-badge',
              text: typeLabel,
            });
            badge.style.color = colorConfig.color;
            badge.style.backgroundColor = hexToRgba(colorConfig.color, 0.08);
            badge.style.border = `1px solid ${hexToRgba(colorConfig.color, 0.15)}`;
            // 插入到文件名后
            fileLink.parentElement?.insertBefore(badge, fileLink.nextSibling);
          }

          // 修改文件名颜色
          if (settings.modifyFileNameColor) {
            (fileLink as HTMLElement).style.color = colorConfig.color;
          }
        }
      }
    });
  }
}

/**
 * 清除文件浏览器中的颜色标记
 */
export function clearFileExplorerColors(app: App): void {
  const fileExplorerItem = app.workspace.getLeavesOfType('file-explorer');

  for (const leaf of fileExplorerItem) {
    const container = leaf.view.containerEl;
    if (!container) continue;

    // 移除颜色圆点
    container.querySelectorAll('.pc-file-dot').forEach((dot) => dot.remove());

    // 移除文件类型标签
    container.querySelectorAll('.pc-file-type-badge').forEach((badge) => badge.remove());

    // 移除文件名颜色
    container.querySelectorAll('[data-pc-processed]').forEach((item) => {
      const itemEl = item as HTMLElement;
      itemEl.removeAttribute('data-pc-processed');
      itemEl.removeAttribute('data-pc-type');
      const fileLink = itemEl.querySelector('.tree-item-inner');
      if (fileLink) {
        (fileLink as HTMLElement).style.color = '';
      }
    });
  }
}

/**
 * 为标签页标题添加颜色标记
 */
export function colorizeTabTitle(
  app: App,
  file: TFile | null,
  settings: PromptColorizerSettings
): void {
  if (!file || !settings.fileColorizerEnabled) return;

  const fileType = detectFileType(app, file, settings);
  const colorConfig = getFileTypeColor(fileType, settings);

  if (!colorConfig || fileType === 'none') return;

  // 获取所有标签页
  const leaves = app.workspace.getLeavesOfType('markdown');
  for (const leaf of leaves) {
    if (leaf.getViewState().state?.file === file.path) {
      // 使用类型断言访问 tabHeaderEl（Obsidian 内部属性）
      const tabHeader = (leaf as any).tabHeaderEl as HTMLElement | undefined;
      if (!tabHeader) continue;

      // 添加颜色指示器
      if (!tabHeader.querySelector('.pc-tab-indicator')) {
        const indicator = tabHeader.createEl('span', { cls: 'pc-tab-indicator' });
        indicator.style.borderBottomColor = colorConfig.color;
      }
    }
  }
}
