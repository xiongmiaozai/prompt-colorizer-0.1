/**
 * 包默认源（v5.2 恢复默认功能）
 *
 * 出厂默认配置仓库：packageId → 默认令牌/规则全集。
 * 「恢复默认」按 packageId 查此表重建包内嵌数据（引用 + 覆盖样式一并复位）。
 * 数据来源：随插件分发的权威包快照（生成自仓库 packages/ 数据）。
 */

import type { CustomTextColor, CustomRuleDef } from '../types';

export interface PackageDefaults {
  /** 默认令牌全集（含 category 等本体字段） */
  tokens: CustomTextColor[];
  /** 默认规则全集（含 name 中文名 / regex / cssClass / priority） */
  rules: CustomRuleDef[];
}

/** mdplus — Markdown 显示优化包（38 条规则，v1.1.0 出厂快照） */
const MDPLUS_DEFAULT_RULES: CustomRuleDef[] = [
  {
    "id": "kbd_tag",
    "name": "键盘键标签",
    "regex": "",
    "cssClass": "dsl-kbd-tag",
    "priority": 30
  },
  {
    "id": "html_tag",
    "name": "HTML 标签",
    "regex": "",
    "cssClass": "dsl-html-tag",
    "priority": 30
  },
  {
    "id": "md_code_fence",
    "name": "代码块围栏",
    "regex": "",
    "cssClass": "dsl-md-code-fence",
    "priority": 30
  },
  {
    "id": "md_inline_code",
    "name": "行内代码",
    "regex": "",
    "cssClass": "dsl-md-inline-code",
    "priority": 30
  },
  {
    "id": "md_mermaid",
    "name": "图表代码块",
    "regex": "",
    "cssClass": "dsl-md-mermaid",
    "priority": 30
  },
  {
    "id": "md_yaml_key",
    "name": "YAML 属性键",
    "regex": "",
    "cssClass": "dsl-md-yaml-key",
    "priority": 30
  },
  {
    "id": "md_hr",
    "name": "水平分割线",
    "regex": "",
    "cssClass": "dsl-md-hr",
    "priority": 30
  },
  {
    "id": "md_comment",
    "name": "注释",
    "regex": "",
    "cssClass": "dsl-md-comment",
    "priority": 30
  },
  {
    "id": "md_definition",
    "name": "定义列表",
    "regex": "",
    "cssClass": "dsl-md-definition",
    "priority": 30
  },
  {
    "id": "md_block_id",
    "name": "块 ID",
    "regex": "",
    "cssClass": "dsl-md-block-id",
    "priority": 30
  },
  {
    "id": "reference_marker",
    "name": "引用标记",
    "regex": "",
    "cssClass": "dsl-reference-marker",
    "priority": 30
  },
  {
    "id": "md_list_item",
    "name": "列表项",
    "regex": "",
    "cssClass": "dsl-md-list-item",
    "priority": 30
  },
  {
    "id": "md_task_list",
    "name": "任务列表",
    "regex": "",
    "cssClass": "dsl-md-task-list",
    "priority": 30
  },
  {
    "id": "md_blockquote",
    "name": "引用块",
    "regex": "",
    "cssClass": "dsl-md-blockquote",
    "priority": 30
  },
  {
    "id": "md_nested_quote",
    "name": "嵌套引用",
    "regex": "",
    "cssClass": "dsl-md-nested-quote",
    "priority": 30
  },
  {
    "id": "md_callout",
    "name": "标注框",
    "regex": "",
    "cssClass": "dsl-md-callout",
    "priority": 30
  },
  {
    "id": "md_callout_meta",
    "name": "标注元数据",
    "regex": "",
    "cssClass": "dsl-md-callout-meta",
    "priority": 30
  },
  {
    "id": "md_admonition",
    "name": "警示块",
    "regex": "",
    "cssClass": "dsl-md-admonition",
    "priority": 30
  },
  {
    "id": "md_frontmatter",
    "name": "元数据起始线",
    "regex": "",
    "cssClass": "dsl-md-frontmatter",
    "priority": 30
  },
  {
    "id": "md_heading",
    "name": "标题",
    "regex": "",
    "cssClass": "dsl-md-heading",
    "priority": 30
  },
  {
    "id": "md_bold",
    "name": "粗体",
    "regex": "",
    "cssClass": "dsl-md-bold",
    "priority": 30
  },
  {
    "id": "md_italic",
    "name": "斜体",
    "regex": "",
    "cssClass": "dsl-md-italic",
    "priority": 30
  },
  {
    "id": "md_strikethrough",
    "name": "删除线",
    "regex": "",
    "cssClass": "dsl-md-strikethrough",
    "priority": 30
  },
  {
    "id": "md_highlight",
    "name": "高亮",
    "regex": "",
    "cssClass": "dsl-md-highlight",
    "priority": 30
  },
  {
    "id": "md_subscript",
    "name": "下标",
    "regex": "",
    "cssClass": "dsl-md-subscript",
    "priority": 30
  },
  {
    "id": "md_superscript",
    "name": "上标",
    "regex": "",
    "cssClass": "dsl-md-superscript",
    "priority": 30
  },
  {
    "id": "md_math_inline",
    "name": "行内公式",
    "regex": "",
    "cssClass": "dsl-md-math-inline",
    "priority": 30
  },
  {
    "id": "md_math_block",
    "name": "块级公式",
    "regex": "",
    "cssClass": "dsl-md-math-block",
    "priority": 30
  },
  {
    "id": "md_tag",
    "name": "标签",
    "regex": "",
    "cssClass": "dsl-md-tag",
    "priority": 30
  },
  {
    "id": "md_emoji_shortcode",
    "name": "表情代码",
    "regex": "",
    "cssClass": "dsl-md-emoji-shortcode",
    "priority": 30
  },
  {
    "id": "md_footnote_ref",
    "name": "脚注引用",
    "regex": "",
    "cssClass": "dsl-md-footnote-ref",
    "priority": 30
  },
  {
    "id": "md_footnote_def",
    "name": "脚注定义",
    "regex": "",
    "cssClass": "dsl-md-footnote-def",
    "priority": 30
  },
  {
    "id": "md_table_sep",
    "name": "表格分隔行",
    "regex": "",
    "cssClass": "dsl-md-table-sep",
    "priority": 30
  },
  {
    "id": "md_table_row",
    "name": "表格行",
    "regex": "",
    "cssClass": "dsl-md-table-row",
    "priority": 30
  },
  {
    "id": "md_link",
    "name": "外部链接",
    "regex": "",
    "cssClass": "dsl-md-link",
    "priority": 30
  },
  {
    "id": "md_image",
    "name": "图片引用",
    "regex": "",
    "cssClass": "dsl-md-image",
    "priority": 30
  },
  {
    "id": "md_wiki_link",
    "name": "双链",
    "regex": "",
    "cssClass": "dsl-md-wiki-link",
    "priority": 30
  },
  {
    "id": "md_anchor_link",
    "name": "锚点链接",
    "regex": "",
    "cssClass": "dsl-md-anchor-link",
    "priority": 30
  }
];

const PACKAGE_DEFAULTS: Record<string, PackageDefaults> = {
  mdplus: {
    tokens: [],
    rules: MDPLUS_DEFAULT_RULES,
  },
};

/** 获取包出厂默认源（无默认源的包返回 null，UI 据此置灰按钮） */
export function getBuiltinPackageDefaults(packageId: string): PackageDefaults | null {
  return PACKAGE_DEFAULTS[packageId] ?? null;
}
