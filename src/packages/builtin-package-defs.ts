/**
 * 内置只读包定义（v5 包管理模块）
 *
 * 内置包随插件代码内嵌分发（安装 zip 不含额外目录），
 * 运行时以虚拟目录形式加载：只读、不可删除/重命名，可复制为用户副本。
 */

import type { PackageManifest } from '../types';

/**
 * 内置包清单列表
 * refTokenIds 引用自定义文本令牌（customTextColors[].id，内置包通常为空），
 * refRuleIds 引用 DSL 规则 ID（rules/*.yaml 的 pattern key）
 */
export const BUILTIN_PACKAGE_MANIFESTS: PackageManifest[] = [
  {
    packageId: 'default_markdown',
    name: 'Obsidian Markdown 标注包',
    tagColor: '#8b5cf6',
    description: 'Obsidian Markdown 完整语法标注：基础 CommonMark + GFM 扩展 + OB 专属语法（双链/高亮/注释/标签/块ID/Callout/Frontmatter/公式/HTML内嵌）',
    version: '2.0.0',
    specVersion: '1.0.0',
    type: 'builtin',
    usageTag: 'Obsidian 语法',
    previewSampleText: '# Obsidian 语法速览\n\n[[笔记名称|双链别名]] 与 ==高亮文本==，#分类/子分类 标签\n\n> [!tip]+ Callout 提示块\n> 引用块嵌套内容\n\n- [x] 已完成任务\n- [ ] 待办任务\n\n`行内代码` 与 $E=mc^2$ 行内公式，%% 隐藏注释 %%',
    tokenOverrides: {},
    ruleOverrides: {},
  },
];

/** 内置包默认引用的 DSL 规则 ID（渲染时按规则集存在性容错过滤） */
export const BUILTIN_PACKAGE_REFS: Record<string, { refTokenIds: string[]; refRuleIds: string[] }> = {
  default_markdown: {
    refTokenIds: [],
    refRuleIds: [
      // 基础 CommonMark
      'md_heading',
      'md_bold',
      'md_italic',
      'md_inline_code',
      'md_code_fence',
      'md_blockquote',
      'reference_marker',
      'md_link',
      'md_image',
      'md_hr',
      'md_list_item',
      // GFM 扩展
      'md_table_sep',
      'md_table_row',
      'md_task_list',
      'md_strikethrough',
      'md_footnote_ref',
      'md_footnote_def',
      // Obsidian 专属
      'md_wiki_link',
      'md_highlight',
      'md_comment',
      'md_tag',
      'md_block_id',
      'md_callout',
      'md_frontmatter',
      'md_yaml_key',
      'md_math_block',
      'md_math_inline',
      // HTML 内嵌
      'html_tag',
      'kbd_tag',
    ],
  },
};