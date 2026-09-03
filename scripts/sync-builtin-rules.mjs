// sync-builtin-rules.mjs — 同步 YAML 规则到 builtin-rules.ts
// 读取 rules/ 目录下的 7 个 YAML 文件，生成完整的 builtin-rules.ts
// 运行命令：node scripts/sync-builtin-rules.mjs（从 prompt-colorizer 目录运行）
// 每次 YAML 规则更新后需运行此脚本，确保内置规则与磁盘规则一致

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);
const RULES_DIR = join(ROOT_DIR, 'rules');
const OUTPUT_FILE = join(ROOT_DIR, 'src', 'rule-engine', 'builtin-rules.ts');

// 需要嵌入的 YAML 文件列表（按顺序）
// v2.7.0: 07-word-lexicon.yaml 改造为索引文件，新增 07a-07k 共 11 个子文件
const RULE_FILES = [
  '01-base-patterns.yaml',
  '02-semantic-context.yaml',
  '03-lexicon-optional.yaml',
  '04-theme-color.yaml',
  '05-priority.yaml',
  '06-char-lexicon.yaml',
  '07-word-lexicon.yaml',
  '07a-constraint-tech-phrase.yaml',
  '07b-narrative-scene-phrase.yaml',
  '07c-camera-action-phrase.yaml',
  '07d-english-core-phrase.yaml',
  '07e-english-extended-phrase.yaml',
  '07f-english-subject-phrase.yaml',
  '07g-director-cinematography.yaml',
  '07h-director-lighting-color.yaml',
  '07i-director-editing-sound.yaml',
  '07j-director-performance-screenplay.yaml',
  '07k-director-genre-production.yaml',
];

// 读取 version.json 获取版本号
const versionJson = JSON.parse(readFileSync(join(RULES_DIR, 'version.json'), 'utf8'));
const ruleVersion = versionJson.version || '1.0.0';
const updateTime = new Date().toISOString().slice(0, 10);

// 读取所有 YAML 文件内容
const yamlContents = {};
for (const fileName of RULE_FILES) {
  const content = readFileSync(join(RULES_DIR, fileName), 'utf8');
  yamlContents[fileName] = content;
}

// 生成常量名（如 01-base-patterns.yaml → BASE_PATTERNS_YAML）
function toConstantName(fileName) {
  const baseName = fileName.replace('.yaml', '');
  const parts = baseName.split('-').slice(1); // 去掉序号
  return parts.map(p => p.toUpperCase()).join('_') + '_YAML';
}

// 生成 TypeScript 文件内容
let tsContent = `/**
 * 内置规则加载器
 * 将 YAML 规则文件内容嵌入 TypeScript，作为 Git 远程规则的本地降级方案
 * 当 ruleSource 为 'builtin' 或缓存不可用时自动使用
 *
 * 此文件由 scripts/sync-builtin-rules.mjs 自动生成，请勿手动修改
 * 修改规则请编辑 rules/ 目录下的 YAML 文件后运行同步脚本
 */

/** 内置规则版本信息（与 rules/version.json 同步） */
export const BUILTIN_VERSION = '${ruleVersion}';
export const BUILTIN_UPDATE_TIME = '${updateTime}';

`;

// 为每个 YAML 文件生成常量定义
for (const fileName of RULE_FILES) {
  const constName = toConstantName(fileName);
  const rawContent = yamlContents[fileName];
  // 转义 TypeScript 模板字符串中的特殊字符：
  // 1. 反引号 ` → \`（YAML 注释和正则中可能包含反引号）
  // 2. ${ → \${（避免被识别为模板字符串插值）
  const escapedContent = rawContent.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  tsContent += `/** ${fileName} 内置内容 */\n`;
  tsContent += `const ${constName} = \`${escapedContent}\`;\n\n`;
}

// 生成 getBuiltinRuleFiles 函数
tsContent += `/**
 * 获取内置规则文件映射
 * @returns 文件名到文件内容的映射
 */
export function getBuiltinRuleFiles(): Record<string, string> {
  return {
`;

for (const fileName of RULE_FILES) {
  const constName = toConstantName(fileName);
  tsContent += `    '${fileName}': ${constName},\n`;
}

tsContent += `  };
}
`;

// 写入文件
writeFileSync(OUTPUT_FILE, tsContent, 'utf8');

// 统计信息
const totalLines = tsContent.split('\n').length;
const totalSize = Buffer.byteLength(tsContent, 'utf8');
console.log('=== 同步内置规则完成 ===');
console.log(`版本: ${ruleVersion}`);
console.log(`更新时间: ${updateTime}`);
console.log(`YAML 文件数: ${RULE_FILES.length}`);
console.log(`输出文件: ${OUTPUT_FILE}`);
console.log(`总行数: ${totalLines}`);
console.log(`文件大小: ${(totalSize / 1024).toFixed(1)} KB`);
console.log('');
console.log('各文件统计:');
for (const fileName of RULE_FILES) {
  const lines = yamlContents[fileName].split('\n').length;
  const size = Buffer.byteLength(yamlContents[fileName], 'utf8');
  console.log(`  ${fileName}: ${lines} 行, ${(size / 1024).toFixed(1)} KB`);
}
