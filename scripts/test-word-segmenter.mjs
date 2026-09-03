// test-word-segmenter.mjs — 词组分词器单元测试
// 运行命令：node --test scripts/test-word-segmenter.mjs（从 prompt-colorizer 目录运行）
// 使用 Node.js 内置 node:test 模块，无需额外依赖
// 通过 esbuild 编译 rule-compiler.ts 为临时 ESM 模块后导入测试

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

// ============================================================
// 编译 rule-compiler.ts 为可执行 ESM 模块
// rule-engine 目录无 obsidian 依赖，可直接 bundle
// ============================================================

const tmpDir = mkdtempSync(join(tmpdir(), 'pc-seg-test-'));
const outFile = join(tmpDir, 'rule-compiler.mjs');
await build({
  entryPoints: ['src/rule-engine/rule-compiler.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: outFile,
  logLevel: 'silent',
});
const { segmentByWordLexicon } = await import(pathToFileURL(outFile).href);

// ============================================================
// 测试数据构建工具
// ============================================================

/**
 * 构建编译后的词组词典分组（模拟 compileWordLexicon 的输出）
 * @param {string} name 分组名
 * @param {string} cssClass CSS 类名
 * @param {number} priority 优先级
 * @param {string[]} words 词组列表
 * @param {string|null} followedBy 后继标点正则（可选）
 * @returns {object} CompiledWordLexiconGroup
 */
function makeGroup(name, cssClass, priority, words, followedBy = null) {
  return {
    name,
    cssClass,
    priority,
    followedByRegex: followedBy ? new RegExp(followedBy) : null,
    wordSet: new Set(words),
    maxWordLength: words.length > 0 ? Math.max(...words.map((w) => w.length)) : 0,
  };
}

/** 默认分词器配置 */
const defaultConfig = { maxWordLength: 6, minWordLength: 2 };

// 测试用分组（按优先级降序，与编译器输出一致）
const constraintGroup = makeGroup(
  'constraint_phrase', 'dsl-constraint', 48,
  ['切勿', '切忌', '避免出现', '必须保持']
);
const paramKeyGroup = makeGroup(
  'param_key_phrase', 'dsl-param-key', 46,
  ['色温', '光圈', '快门速度'],
  '[：:]'
);
const emotionGroup = makeGroup(
  'emotion_phrase', 'dsl-emotion-word', 43,
  ['悲喜交加', '心花怒放']
);
const sceneGroup = makeGroup(
  'scene_description_phrase', 'dsl-narrative-term', 42,
  ['华灯初上', '车水马龙']
);

// 全部分组（按优先级降序排列，模拟编译器输出）
const allGroups = [constraintGroup, paramKeyGroup, emotionGroup, sceneGroup];

// ============================================================
// 测试用例
// ============================================================

describe('词组分词器 segmentByWordLexicon', () => {

  describe('基本分词功能', () => {
    it('单个词组能被正确识别', () => {
      const text = '切勿修改';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].from, 0);
      assert.equal(result[0].to, 2);
      assert.equal(result[0].cssClass, 'dsl-constraint');
      assert.equal(result[0].priority, 48);
      assert.equal(result[0].ruleId, 'word-lexicon:constraint_phrase');
    });

    it('四字词组能被正确识别', () => {
      const text = '避免出现问题';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].from, 0);
      assert.equal(result[0].to, 4);
      assert.equal(result[0].cssClass, 'dsl-constraint');
    });
  });

  describe('最大正向匹配算法', () => {
    it('长词优先于短词匹配', () => {
      // "避免出现"是4字词，应整体匹配而非拆分
      const text = '避免出现';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].to - result[0].from, 4);
    });

    it('窗口取全局最大词长与配置的较大值', () => {
      // 构造一个词长超过 segmenterConfig.maxWordLength 但在 group.maxWordLength 内的词
      const longWordGroup = makeGroup(
        'long_word', 'dsl-test', 50,
        ['这是一个六字词组']
      );
      // segmenterConfig.maxWordLength=4，但词长6，应仍能匹配
      const config = { maxWordLength: 4, minWordLength: 2 };
      const text = '这是一个六字词组';
      const result = segmentByWordLexicon(text, 0, text.length, [longWordGroup], config);
      assert.equal(result.length, 1);
      assert.equal(result[0].to - result[0].from, 8);
    });
  });

  describe('优先级处理', () => {
    it('同位置多分组命中时高优先级分组优先', () => {
      const highGroup = makeGroup('high', 'dsl-high', 50, ['测试词']);
      const lowGroup = makeGroup('low', 'dsl-low', 40, ['测试词']);
      const groups = [highGroup, lowGroup]; // 已按优先级降序
      const text = '测试词';
      const result = segmentByWordLexicon(text, 0, text.length, groups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].cssClass, 'dsl-high');
    });

    it('低优先级分组在高优先级未命中时兜底', () => {
      const highGroup = makeGroup('high', 'dsl-high', 50, ['高优先词']);
      const lowGroup = makeGroup('low', 'dsl-low', 40, ['低优先词']);
      const groups = [highGroup, lowGroup];
      const text = '低优先词';
      const result = segmentByWordLexicon(text, 0, text.length, groups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].cssClass, 'dsl-low');
    });
  });

  describe('followedBy 后继标点约束', () => {
    it('后接冒号时参数键匹配成功', () => {
      const text = '色温：5500K';
      const result = segmentByWordLexicon(text, 0, 3, allGroups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].from, 0);
      assert.equal(result[0].to, 2);
      assert.equal(result[0].cssClass, 'dsl-param-key');
    });

    it('后接非冒号字符时参数键不匹配', () => {
      const text = '色温是5500K';
      const result = segmentByWordLexicon(text, 0, 3, allGroups, defaultConfig);
      assert.equal(result.length, 0);
    });

    it('词在文本末尾无后继字符时followedBy不满足', () => {
      // "色温"在文本末尾，无后继字符，followedBy 不满足
      const text = '色温';
      const result = segmentByWordLexicon(text, 0, 2, allGroups, defaultConfig);
      assert.equal(result.length, 0);
    });

    it('followedBy 支持半角冒号', () => {
      const text = '色温: 5500';
      const result = segmentByWordLexicon(text, 0, 3, allGroups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].cssClass, 'dsl-param-key');
    });
  });

  describe('字符类型处理', () => {
    it('非CJK字符跳过', () => {
      const text = 'abc切勿def';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].from, 3);
      assert.equal(result[0].to, 5);
    });

    it('数字与标点跳过', () => {
      const text = '123切勿。';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].from, 3);
      assert.equal(result[0].to, 5);
    });

    it('CJK扩展区字符不进入分词（仅基本区）', () => {
      // 扩展区字符（如㐀㐁）不在基本区范围内，应被跳过
      const text = '㐀切勿';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].from, 1);
      assert.equal(result[0].to, 3);
    });
  });

  describe('未命中字符处理', () => {
    it('未命中的连续汉字逐字跳过', () => {
      const text = '未知词切勿';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].from, 3);
      assert.equal(result[0].to, 5);
    });

    it('全部未命中时返回空数组', () => {
      const text = '这些词都不在词典里';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 0);
    });
  });

  describe('gap 边界约束', () => {
    it('只在 gapStart~gapEnd 范围内分词', () => {
      const text = '切勿避免出现';
      // gap 从第2字开始，只看"避免出现"
      const result = segmentByWordLexicon(text, 2, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 1);
      assert.equal(result[0].from, 2);
      assert.equal(result[0].to, 6);
    });

    it('gap 范围内部分匹配', () => {
      const text = '切勿避免出现';
      // gap 只到第4字，"避免出现"被截断为"避免出"
      const result = segmentByWordLexicon(text, 2, 5, allGroups, defaultConfig);
      // "避免出"不在词典中，应无匹配
      assert.equal(result.length, 0);
    });
  });

  describe('空输入与边界条件', () => {
    it('空分组列表返回空数组', () => {
      const result = segmentByWordLexicon('切勿', 0, 2, [], defaultConfig);
      assert.equal(result.length, 0);
    });

    it('gapStart >= gapEnd 返回空数组', () => {
      const result = segmentByWordLexicon('切勿', 5, 5, allGroups, defaultConfig);
      assert.equal(result.length, 0);
    });

    it('gapStart > gapEnd 返回空数组', () => {
      const result = segmentByWordLexicon('切勿', 5, 3, allGroups, defaultConfig);
      assert.equal(result.length, 0);
    });

    it('空文本返回空数组', () => {
      const result = segmentByWordLexicon('', 0, 0, allGroups, defaultConfig);
      assert.equal(result.length, 0);
    });
  });

  describe('连续多词分词', () => {
    it('两个相邻词组被正确分割', () => {
      const text = '切勿避免出现';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 2);
      assert.equal(result[0].from, 0);
      assert.equal(result[0].to, 2);
      assert.equal(result[1].from, 2);
      assert.equal(result[1].to, 6);
    });

    it('多个词组与非匹配字符交替', () => {
      const text = '切勿然后避免出现';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 2);
      assert.equal(result[0].from, 0);
      assert.equal(result[0].to, 2);
      assert.equal(result[1].from, 4);
      assert.equal(result[1].to, 8);
    });

    it('不同分组的词组混合分词', () => {
      const text = '切勿华灯初上';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 2);
      assert.equal(result[0].cssClass, 'dsl-constraint');
      assert.equal(result[1].cssClass, 'dsl-narrative-term');
    });
  });

  describe('词长边界约束', () => {
    it('词长小于 minWordLength 时不匹配', () => {
      const config = { maxWordLength: 6, minWordLength: 3 };
      const text = '切勿'; // 2字，小于 minWordLength=3
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, config);
      assert.equal(result.length, 0);
    });

    it('词长等于 minWordLength 时匹配', () => {
      const config = { maxWordLength: 6, minWordLength: 2 };
      const text = '切勿'; // 2字，等于 minWordLength=2
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, config);
      assert.equal(result.length, 1);
    });

    it('词长超过 group.maxWordLength 时该组跳过', () => {
      // paramKeyGroup 的 maxWordLength 是 4（"快门速度"）
      // 构造一个5字词不在该组但检查 len > group.maxWordLength 的逻辑
      const singleGroup = makeGroup(
        'short_max', 'dsl-test', 50,
        ['短词']
      );
      // 该组 maxWordLength=2，"短词长句"4字超过该组maxWordLength
      const text = '短词长句';
      const result = segmentByWordLexicon(text, 0, text.length, [singleGroup], defaultConfig);
      // "短词长句"不在词典，"短词"是2字但窗口从最长开始尝试
      // globalMaxLen = max(6, 2) = 6，尝试 len=4,3,2
      // len=2 时 candidate="短词"，len<=group.maxWordLength=2，命中
      assert.equal(result.length, 1);
      assert.equal(result[0].from, 0);
      assert.equal(result[0].to, 2);
    });
  });

  describe('结果排序', () => {
    it('结果按 from 升序排列', () => {
      const text = '切勿避免出现必须保持';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result.length, 3);
      for (let i = 1; i < result.length; i++) {
        assert.ok(result[i].from >= result[i - 1].from, '结果应按 from 升序');
      }
    });
  });

  describe('ruleId 格式', () => {
    it('ruleId 包含分组名', () => {
      const text = '切勿';
      const result = segmentByWordLexicon(text, 0, text.length, allGroups, defaultConfig);
      assert.equal(result[0].ruleId, 'word-lexicon:constraint_phrase');
    });
  });
});
