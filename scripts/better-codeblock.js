#!/usr/bin/env node
/**
 * 把 md 文件中所有代码块转换为 Better CodeBlock 格式：
 *   ```lang title="第一行非空内容" lineCount=非空行数 timestamp="YYYY-MM-DD HH:mm"
 *   内容
 *   ```
 *
 * 用法: node scripts/better-codeblock.js <md文件路径>
 */
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
if (!file) { console.error('用法: node scripts/better-codeblock.js <md文件路径>'); process.exit(1); }

let content = fs.readFileSync(file, 'utf8');
const timestamp = require('child_process').execSync('date "+%Y-%m-%d %H:%M"').toString().trim();

// 匹配所有代码块 ```lang ... ```
const codeBlockRe = /```([\w-]*)\n([\s\S]*?)```/g;
let count = 0;

content = content.replace(codeBlockRe, (match, lang, body) => {
  const lines = body.split('\n');
  // 第一行非空文本作为 title
  const firstLine = lines.find(l => l.trim().length > 0) || '';
  // 清理 title：去掉前导符号/注释标记，截断到 60 字符
  let title = firstLine
    .replace(/^>/, '')
    .replace(/^\/\//, '')
    .replace(/^\/\*/, '')
    .replace(/^\*/, '')
    .replace(/^#/, '')
    .replace(/^--/, '')
    .trim();
  if (title.length > 60) title = title.slice(0, 57) + '...';
  if (!title) title = '代码块';

  // 统计有效非空文本行数
  const lineCount = lines.filter(l => l.trim().length > 0).length;

  count++;
  return '```' + lang + ` title="${title}" lineCount=${lineCount} timestamp="${timestamp}"\n` + body + '```';
});

fs.writeFileSync(file, content, 'utf8');
console.log(`✅ 处理完成：${count} 个代码块已转换为 Better CodeBlock 格式`);
console.log(`   时间戳：${timestamp}`);
console.log(`   文件：${file}`);