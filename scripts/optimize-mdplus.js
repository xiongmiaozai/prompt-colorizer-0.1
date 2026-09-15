#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const dir = "packages/mdplus";
fs.mkdirSync(path.join(dir, "tokens"), { recursive: true });
fs.mkdirSync(path.join(dir, "rules"), { recursive: true });

// 更新 package.json
const manifest = {
  packageId: "mdplus",
  name: "✨ Markdown 显示优化包",
  tagColor: "#a78bfa",
  description: "引用全部 Markdown 语法规则（含 Obsidian 扩展），让普通 md 文件的结构元素获得更清晰的视觉层次",
  version: "1.1.0",
  specVersion: "1.0",
  type: "user",
  usageTag: "通用显示优化",
  previewSampleText: [
    "---",
    "title: 笔记标题",
    "tags: [前端, React]",
    "---",
    "",
    "# 一级标题",
    "",
    "## 二级标题",
    "",
    "**粗体** *斜体* ~~删除~~ ==高亮== `代码`",
    "",
    "H~2~O 与 E=mc^2^ 以及 <kbd>Ctrl</kbd>",
    "",
    "[[双链]] [链接](url) ![图片](img.png) #标签",
    "",
    "> [!tip] 提示",
    "> 这是一个 Callout",
    "",
    "- [x] 已完成",
    "- [ ] 待办",
    "",
    "| 列A | 列B |",
    "|-----|-----|",
    "| 1   | 2   |",
    "",
    "$$E=mc^2$$",
    "",
    "%%注释%% :smile:",
  ].join("\n"),
  tokenOverrides: {},
  ruleOverrides: {},
};
fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(manifest, null, 2));

// 按分类分组的规则定义
const groups = {
  "基础结构": [
    "md_frontmatter", "md_heading", "md_bold", "md_italic",
    "md_strikethrough", "md_highlight", "md_subscript", "md_superscript",
  ],
  "代码": [
    "md_code_fence", "md_inline_code", "md_mermaid",
  ],
  "链接": [
    "md_link", "md_image", "md_wiki_link", "md_anchor_link",
  ],
  "块级": [
    "md_blockquote", "md_nested_quote", "md_callout", "md_callout_meta", "md_admonition",
  ],
  "列表": [
    "md_list_item", "md_task_list",
  ],
  "表格": [
    "md_table_sep", "md_table_row",
  ],
  "数学": [
    "md_math_inline", "md_math_block",
  ],
  "脚注": [
    "md_footnote_ref", "md_footnote_def",
  ],
  "元数据": [
    "md_yaml_key",
  ],
  "标签": [
    "md_tag", "md_emoji_shortcode",
  ],
  "HTML扩展": [
    "kbd_tag", "html_tag",
  ],
  "其他": [
    "md_hr", "md_comment", "md_definition", "md_block_id", "reference_marker",

  ],
};

// 去重：从所有分组收集唯一规则 ID
const allRules = new Set();
for (const ids of Object.values(groups)) {
  for (const id of ids) allRules.add(id);
}

// 清空旧规则文件
const rulesDir = path.join(dir, "rules");
for (const f of fs.readdirSync(rulesDir)) {
  if (f.endsWith(".json")) fs.unlinkSync(path.join(rulesDir, f));
}

// 按分组写入 JSON 文件
let total = 0;
for (const [cat, ids] of Object.entries(groups)) {
  const rules = ids.map(id => ({
    id,
    name: id,
    regex: "",
    cssClass: id.startsWith("md_") ? "dsl-" + id.replace(/_/g, "-") : "dsl-" + id.replace(/_/g, "-"),
    priority: 30,
  }));
  if (rules.length === 0) continue;
  const fileName = cat + ".json";
  fs.writeFileSync(path.join(rulesDir, fileName), JSON.stringify(rules, null, 2));
  total += rules.length;
  console.log(`  ${fileName}: ${rules.length} 条`);
}

console.log(`\n✅ mdplus 包已优化:`);
console.log(`   规则总数: ${total} 条（去重后 ${allRules.size} 条）`);
console.log(`   分组数: ${Object.keys(groups).length} 个`);
console.log(`   版本: 1.0.0 → 1.1.0`);