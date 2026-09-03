// 压缩 YAML 文件到 flow style
// 把 words 列表从多行 block style 改为单行 flow style
import { readFileSync, writeFileSync } from 'node:fs';

const RULES_DIR = '/Users/mac/Documents/ob插件/prompt-colorizer/rules';
const LOG = '/Users/mac/Documents/ob插件/prompt-colorizer/scripts/compress-log.txt';
let out = '';
const log = (m) => { out += m + '\n'; };

function compressWordLexicon(filename) {
  const content = readFileSync(`${RULES_DIR}/${filename}`, 'utf8');
  const lines = content.split('\n');

  let output = [];
  let currentGroup = null;
  let currentWords = [];
  let inWordsBlock = false;

  function flushGroup() {
    if (currentGroup && currentWords.length > 0) {
      output.push(currentGroup.line);
      for (const prop of currentGroup.props) {
        output.push(prop);
      }
      // flow style: words: ["词1", "词2", "词3"]
      const wordsStr = currentWords.map(w => JSON.stringify(w)).join(', ');
      output.push('    words: [' + wordsStr + ']');
      currentWords = [];
    }
  }

  for (const line of lines) {
    if (line.startsWith('#') || line.trim() === '') {
      output.push(line);
      continue;
    }

    const groupMatch = line.match(/^  ([a-z_]+):\s*$/);
    if (groupMatch) {
      flushGroup();
      currentGroup = { name: groupMatch[1], line: line, props: [] };
      inWordsBlock = false;
      continue;
    }

    if (currentGroup && /^    (cssClass|priority|followedBy):/.test(line)) {
      currentGroup.props.push(line);
      continue;
    }

    if (currentGroup && /^    words:/.test(line)) {
      inWordsBlock = true;
      continue;
    }

    if (inWordsBlock && /^      - /.test(line)) {
      let word = line.replace(/^      - /, '').trim();
      if ((word.startsWith('"') && word.endsWith('"')) ||
          (word.startsWith("'") && word.endsWith("'"))) {
        word = word.slice(1, -1);
      }
      currentWords.push(word);
      continue;
    }

    output.push(line);
  }
  flushGroup();

  const result = output.join('\n');
  writeFileSync(`${RULES_DIR}/${filename}.flow`, result);

  log(`=== ${filename} Flow Style 压缩 ===`);
  log(`原文件: ${content.length} 字符, ${Buffer.byteLength(content, 'utf8')} 字节`);
  log(`压缩后: ${result.length} 字符, ${Buffer.byteLength(result, 'utf8')} 字节`);
  log(`压缩率: ${((1 - result.length / content.length) * 100).toFixed(1)}%`);
  log('');
}

function compressLexiconOptional(filename) {
  const content = readFileSync(`${RULES_DIR}/${filename}`, 'utf8');
  const lines = content.split('\n');

  let output = [];
  let currentCategory = null;
  let currentWords = [];
  let inLexiconBlock = false;

  function flushCategory() {
    if (currentCategory && currentWords.length > 0) {
      output.push(`  ${currentCategory}:`);
      // flow style: 用嵌套数组格式
      const wordsStr = currentWords.map(w => JSON.stringify(w)).join(', ');
      output.push('    - [' + wordsStr + ']');
      currentWords = [];
    }
  }

  for (const line of lines) {
    if (line.startsWith('#') || line.trim() === '') {
      output.push(line);
      continue;
    }

    if (/^lexicon\s*:/.test(line)) {
      inLexiconBlock = true;
      output.push(line);
      continue;
    }

    if (inLexiconBlock && /^[a-zA-Z]/.test(line) && !/^lexicon/.test(line)) {
      flushCategory();
      inLexiconBlock = false;
      output.push(line);
      continue;
    }

    if (!inLexiconBlock) {
      output.push(line);
      continue;
    }

    const catMatch = line.match(/^  ([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
    if (catMatch) {
      flushCategory();
      currentCategory = catMatch[1];
      continue;
    }

    if (currentCategory && /^    - /.test(line)) {
      let word = line.replace(/^    - /, '').trim();
      if ((word.startsWith('"') && word.endsWith('"')) ||
          (word.startsWith("'") && word.endsWith("'"))) {
        word = word.slice(1, -1);
      }
      currentWords.push(word);
      continue;
    }
  }
  flushCategory();

  const result = output.join('\n');
  writeFileSync(`${RULES_DIR}/${filename}.flow`, result);

  log(`=== ${filename} Flow Style 压缩 ===`);
  log(`原文件: ${content.length} 字符, ${Buffer.byteLength(content, 'utf8')} 字节`);
  log(`压缩后: ${result.length} 字符, ${Buffer.byteLength(result, 'utf8')} 字节`);
  log(`压缩率: ${((1 - result.length / content.length) * 100).toFixed(1)}%`);
  log('');
}

// 执行压缩
compressWordLexicon('07-word-lexicon.yaml');
compressLexiconOptional('03-lexicon-optional.yaml');

// 验证 YAML 解析正确性
log('=== 验证 YAML 解析正确性 ===');
try {
  const { parse } = await import('yaml');

  const orig7 = parse(readFileSync(`${RULES_DIR}/07-word-lexicon.yaml`, 'utf8'));
  const flow7 = parse(readFileSync(`${RULES_DIR}/07-word-lexicon.yaml.flow`, 'utf8'));

  const origCount7 = Object.values(orig7.wordLexicon).reduce((s, g) => s + g.words.length, 0);
  const flowCount7 = Object.values(flow7.wordLexicon).reduce((s, g) => s + g.words.length, 0);

  log(`07-word-lexicon: 原词条数=${origCount7}, 压缩后=${flowCount7}, ${origCount7 === flowCount7 ? '✓ 一致' : '✗ 不一致'}`);

  const orig3 = parse(readFileSync(`${RULES_DIR}/03-lexicon-optional.yaml`, 'utf8'));
  const flow3 = parse(readFileSync(`${RULES_DIR}/03-lexicon-optional.yaml.flow`, 'utf8'));

  const origCount3 = Object.values(orig3.lexicon).reduce((s, w) => s + w.length, 0);
  const flowCount3 = Object.values(flow3.lexicon).reduce((s, w) => s + w.length, 0);

  log(`03-lexicon-optional: 原词条数=${origCount3}, 压缩后=${flowCount3}, ${origCount3 === flowCount3 ? '✓ 一致' : '✗ 不一致'}`);
} catch (e) {
  log('YAML 解析验证失败: ' + e.message);
}

writeFileSync(LOG, out);
console.log(out);
