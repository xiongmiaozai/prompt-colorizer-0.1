#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const dir = "packages/mdplus";
fs.mkdirSync(path.join(dir, "tokens"), { recursive: true });
fs.mkdirSync(path.join(dir, "rules"), { recursive: true });

const manifest = {
  packageId: "mdplus",
  name: "✨ Markdown 显示优化包",
  tagColor: "#a78bfa",
  description: "引用全部 Markdown 语法规则，让普通 md 文件的结构元素获得更清晰的视觉层次",
  version: "1.0.0",
  specVersion: "1.0",
  type: "user",
  usageTag: "通用显示优化",
  previewSampleText: "# 标题\n\n**加粗** *斜体* ~~删除~~ `代码`\n\n[[双链]] [链接](url) #标签\n\n> 引用块\n\n- [x] 任务\n\n| 列 | 值 |\n|---|---|\n| A | B |\n\n==高亮== $$公式$$",
  tokenOverrides: {},
  ruleOverrides: {},
};
fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(manifest, null, 2));

const ruleIds = [
  "md_frontmatter","md_heading","md_bold","md_italic","md_strikethrough",
  "md_code_fence","md_inline_code","md_link","md_image","md_wiki_link",
  "md_tag","md_task_list","md_footnote_ref","md_footnote_def","md_math_block",
  "md_math_inline","md_blockquote","md_callout","md_hr","md_table_sep",
  "md_table_row","md_list_item","md_definition","md_block_id","md_comment",
  "md_emoji_shortcode","md_highlight","md_yaml_key","md_mermaid","md_nested_quote",
  "md_anchor_link","md_callout_meta","md_admonition",
];

const rules = ruleIds.map(id => ({
  id,
  name: id,
  regex: "",
  cssClass: "dsl-" + id.replace(/_/g, "-"),
  priority: 30,
}));
fs.writeFileSync(path.join(dir, "rules/未分类.json"), JSON.stringify(rules, null, 2));

console.log("✅ mdplus 包已生成:");
console.log("   " + dir + "/package.json");
console.log("   " + dir + "/rules/未分类.json (" + rules.length + " 条规则)");