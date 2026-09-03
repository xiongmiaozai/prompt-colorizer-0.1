// pre-release-check.mjs — 发布前自检脚本
// 运行命令：node scripts/pre-release-check.mjs（从 prompt-colorizer 目录运行）
// 检查规则文件完整性、颜色令牌引用、优先级冲突、版本一致性、远程可达性

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ============================================================
// 路径与常量定义
// ============================================================

// 脚本所在目录的父目录是 prompt-colorizer
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);
const RULES_DIR = join(ROOT_DIR, 'rules');

// ANSI 颜色码
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

// 需要检查的 5 个 YAML 文件
const YAML_FILES = [
  '01-base-patterns.yaml',
  '02-semantic-context.yaml',
  '03-lexicon-optional.yaml',
  '04-theme-color.yaml',
  '05-priority.yaml',
  '07-word-lexicon.yaml',
];

// ============================================================
// 结果收集与输出
// ============================================================

const results = [];

function pass(n, name) {
  results.push({ ok: true });
  console.log(`${GREEN}✓ 检查项 ${n}: ${name} - 通过${RESET}`);
}

function fail(n, name, reason) {
  results.push({ ok: false });
  console.log(`${RED}✗ 检查项 ${n}: ${name} - 失败: ${reason}${RESET}`);
}

// ============================================================
// YAML 解析器动态加载
// 优先尝试 'yaml' 包，其次 'js-yaml'，都不可用则报错
// ============================================================

async function getYamlParser() {
  // 尝试 'yaml' 包
  try {
    const mod = await import('yaml');
    if (mod.parse) return mod.parse;
    if (mod.default && mod.default.parse) return mod.default.parse;
  } catch (_) {
    // 'yaml' 包不可用，继续尝试 'js-yaml'
  }
  // 尝试 'js-yaml' 包
  try {
    const mod = await import('js-yaml');
    if (mod.load) return mod.load;
    if (mod.default && mod.default.load) return mod.default.load;
  } catch (_) {
    // 'js-yaml' 包也不可用
  }
  throw new Error('未找到 YAML 解析包（yaml 或 js-yaml），请先运行：npm install yaml');
}

/**
 * 获取宽松模式 YAML 解析器（允许重复 key）
 * 06-char-lexicon.yaml 中 quantifier.回 在 chapter 与 frequency 子分类下重复出现，
 * 与项目运行时使用的轻量级 yaml-parser.ts（后者覆盖前者，不报错）行为保持一致
 * @returns {Promise<((text: string) => any)|null>} 解析函数，不可用时返回 null
 */
async function getLenientYamlParser() {
  try {
    const mod = await import('yaml');
    const parseFn = mod.parse || (mod.default && mod.default.parse);
    if (parseFn) {
      // uniqueKeys: false 允许重复 key（后者覆盖前者）
      return (text) => parseFn(text, { uniqueKeys: false });
    }
  } catch (_) {
    // 'yaml' 包不可用
  }
  // js-yaml 默认即允许重复 key，直接返回 load 函数
  try {
    const mod = await import('js-yaml');
    return mod.load || (mod.default && mod.default.load);
  } catch (_) {
    // 'js-yaml' 包也不可用
  }
  return null;
}

// ============================================================
// 06-char-lexicon.yaml 校验（v2.5.0 新增）
// 包含 4 个检查项：YAML 语法、charLexicon 字段、combinationRules 字段、优先级冲突
// ============================================================

/** charLexicon 中 pos 字段的合法值集合 */
const VALID_POS_VALUES = ['adj', 'verb', 'noun', 'quantifier', 'number', 'punctuation', 'other'];

/** charLexicon 字数下限 */
const MIN_CHAR_COUNT = 200;

/** combinationRules 优先级范围 */
const COMB_PRIORITY_MIN = 40;
const COMB_PRIORITY_MAX = 50;

/**
 * 校验 06-char-lexicon.yaml 文件
 * 包含 4 个检查项（编号 7-10）：
 *   7. YAML 语法合法（宽松模式，允许重复 key，与运行时行为一致）
 *   8. charLexicon 字段校验（pos 必填且合法、至少 200 字）
 *   9. combinationRules 字段校验（name/cssClass/priority 必填、priority 范围 40-50、length 必填）
 *  10. 组合规则优先级与 05-priority.yaml 中 combination_<name> 一致性校验
 *
 * @param {object} priorityConfig 05-priority.yaml 解析后的配置（含 priority 映射）
 */
async function checkCharLexicon(priorityConfig) {
  const CHAR_LEXICON_FILE = '06-char-lexicon.yaml';
  const filePath = join(RULES_DIR, CHAR_LEXICON_FILE);

  // ===== 检查项 7：YAML 语法合法（宽松模式）=====
  let lenientParser = null;
  try {
    lenientParser = await getLenientYamlParser();
  } catch (_) {
    lenientParser = null;
  }

  let charLexiconData = null;
  let syntaxOk = false;
  let syntaxError = '';

  if (!existsSync(filePath)) {
    syntaxError = `${CHAR_LEXICON_FILE} 文件不存在`;
  } else if (!lenientParser) {
    syntaxError = '未找到 YAML 解析包（yaml 或 js-yaml）';
  } else {
    try {
      const content = readFileSync(filePath, 'utf8');
      charLexiconData = lenientParser(content);
      syntaxOk = true;
    } catch (e) {
      syntaxError = e.message;
    }
  }

  if (syntaxOk) {
    pass(7, `${CHAR_LEXICON_FILE} YAML 语法合法`);
  } else {
    fail(7, `${CHAR_LEXICON_FILE} YAML 语法合法`, syntaxError);
  }

  // ===== 检查项 8：charLexicon 字段校验 =====
  let charLexiconOk = false;
  let charLexiconError = '';
  let charCount = 0;

  if (charLexiconData && charLexiconData.charLexicon && typeof charLexiconData.charLexicon === 'object') {
    const charLexicon = charLexiconData.charLexicon;
    const invalidEntries = [];

    // 遍历每个 pos 类别（adj/verb/noun/...）下的字符条目
    for (const [posCategory, chars] of Object.entries(charLexicon)) {
      if (typeof chars !== 'object' || chars === null) continue;
      for (const [char, prop] of Object.entries(chars)) {
        charCount++;
        if (typeof prop !== 'object' || prop === null) {
          invalidEntries.push(`${posCategory}.${char}: 属性不是对象`);
          continue;
        }
        if (typeof prop.pos !== 'string' || prop.pos === '') {
          invalidEntries.push(`${posCategory}.${char}: 缺少 pos 字段`);
          continue;
        }
        if (!VALID_POS_VALUES.includes(prop.pos)) {
          invalidEntries.push(`${posCategory}.${char}: pos="${prop.pos}" 不在合法值列表 [${VALID_POS_VALUES.join('/')}] 中`);
        }
      }
    }

    if (invalidEntries.length > 0) {
      const preview = invalidEntries.slice(0, 5).join('; ');
      const suffix = invalidEntries.length > 5 ? ` 等 ${invalidEntries.length} 项` : '';
      charLexiconError = `非法条目${suffix}: ${preview}`;
    } else if (charCount < MIN_CHAR_COUNT) {
      charLexiconError = `字数不足，实际 ${charCount} 字，要求至少 ${MIN_CHAR_COUNT} 字`;
    } else {
      charLexiconOk = true;
    }
  } else {
    charLexiconError = 'charLexicon 字段缺失或非对象';
  }

  if (charLexiconOk) {
    pass(8, `charLexicon 字段校验（${charCount} 字，≥ ${MIN_CHAR_COUNT}）`);
  } else {
    fail(8, 'charLexicon 字段校验', charLexiconError);
  }

  // ===== 检查项 9：combinationRules 字段校验 =====
  let combRulesOk = false;
  let combRulesError = '';
  let combRulesCount = 0;

  if (charLexiconData && Array.isArray(charLexiconData.combinationRules)) {
    const rules = charLexiconData.combinationRules;
    combRulesCount = rules.length;
    const ruleErrors = [];

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const label = rule?.name || `规则#${i + 1}`;
      // name 必填
      if (typeof rule.name !== 'string' || rule.name === '') {
        ruleErrors.push(`${label}: 缺少 name`);
      }
      // cssClass 必填
      if (typeof rule.cssClass !== 'string' || rule.cssClass === '') {
        ruleErrors.push(`${label}: 缺少 cssClass`);
      }
      // priority 必填且范围 40-50
      if (typeof rule.priority !== 'number') {
        ruleErrors.push(`${label}: 缺少 priority 或非数值`);
      } else if (rule.priority < COMB_PRIORITY_MIN || rule.priority > COMB_PRIORITY_MAX) {
        ruleErrors.push(`${label}: priority=${rule.priority} 不在 ${COMB_PRIORITY_MIN}-${COMB_PRIORITY_MAX} 范围内`);
      }
      // length 字段必填
      if (!rule.length || typeof rule.length !== 'object') {
        ruleErrors.push(`${label}: 缺少 length`);
      } else if (typeof rule.length.min !== 'number' || typeof rule.length.max !== 'number') {
        ruleErrors.push(`${label}: length.min/max 必须为数值`);
      }
    }

    if (ruleErrors.length > 0) {
      combRulesError = ruleErrors.join('; ');
    } else {
      combRulesOk = true;
    }
  } else {
    combRulesError = 'combinationRules 字段缺失或非数组';
  }

  if (combRulesOk) {
    pass(9, `combinationRules 字段校验（${combRulesCount} 条，priority ∈ [${COMB_PRIORITY_MIN}, ${COMB_PRIORITY_MAX}]）`);
  } else {
    fail(9, 'combinationRules 字段校验', combRulesError);
  }

  // ===== 检查项 10：组合规则优先级与 05-priority.yaml 一致性校验 =====
  let priorityOk = false;
  let priorityError = '';
  const conflicts = [];

  if (charLexiconData && Array.isArray(charLexiconData.combinationRules) && priorityConfig && priorityConfig.priority) {
    const priorityMap = priorityConfig.priority;
    for (const rule of charLexiconData.combinationRules) {
      if (typeof rule.name !== 'string' || typeof rule.priority !== 'number') continue;
      // 05-priority.yaml 中对应的 key 为 combination_<name>
      const expectedKey = `combination_${rule.name}`;
      const expectedPriority = priorityMap[expectedKey];
      if (expectedPriority === undefined) {
        // 05 中未登记该组合规则，跳过（不视为冲突，但记录提示）
        continue;
      }
      if (expectedPriority !== rule.priority) {
        conflicts.push(`${rule.name}: 06 priority=${rule.priority}, 05 ${expectedKey}=${expectedPriority}`);
      }
    }

    if (conflicts.length > 0) {
      priorityError = `优先级不一致 [${conflicts.length}]: ${conflicts.join(', ')}`;
    } else {
      priorityOk = true;
    }
  } else {
    priorityError = '缺少 combinationRules 或 priorityConfig，无法校验';
  }

  if (priorityOk) {
    pass(10, '组合规则优先级与 05-priority.yaml 一致');
  } else {
    fail(10, '组合规则优先级与 05-priority.yaml 一致', priorityError);
  }
}

// ============================================================
// 07-word-lexicon.yaml 校验（v2.6.0 新增，v2.7.0 改造为多文件合并校验）
// 包含 2 个检查项（编号 11-12）：
//  11. wordLexicon 字段校验（每组 name/cssClass/priority/words 必填、词长范围合法）
//  12. 词组词典优先级与 05-priority.yaml 一致性校验
// ============================================================

/** 词组词典优先级范围（v2.7.0 调整为 38-50，支持导演必学的 production_management priority 38） */
const WORD_LEXICON_PRIORITY_MIN = 38;
const WORD_LEXICON_PRIORITY_MAX = 50;

/** 词组最小词长（v2.7.0 调整为 1，容纳导演必学的单字术语如「切」「喜」「怒」「哀」） */
const WORD_MIN_LENGTH = 1;
/** 词组最大词长（v2.7.0 调整为 35，容纳含空格的英文艺术家全名如 "by joseph christian leyendecker"） */
const WORD_MAX_LENGTH = 35;

/**
 * 校验 07-word-lexicon.yaml 及其子文件（v2.7.0 改造为多文件合并校验）
 * 扫描所有 07*.yaml 文件，合并 wordLexicon 分组后统一校验
 * @param {object} priorityConfig 05-priority.yaml 解析后的配置
 */
async function checkWordLexicon(priorityConfig) {
  // ===== 检查项 11：wordLexicon 字段校验 =====
  let lenientParser = null;
  try {
    lenientParser = await getLenientYamlParser();
  } catch (_) {
    lenientParser = null;
  }

  let wordLexiconOk = false;
  let wordLexiconError = '';
  let groupCount = 0;
  let wordCount = 0;
  // 合并后的 wordLexicon 对象（用于检查项 12）
  const mergedWordLexicon = {};

  // 扫描 rules 目录下所有 07*.yaml 文件
  let wordLexiconFiles = [];
  if (existsSync(RULES_DIR)) {
    const allFiles = readdirSync(RULES_DIR);
    wordLexiconFiles = allFiles
      .filter(name => name.startsWith('07') && name.endsWith('.yaml'))
      .sort();
  }

  if (wordLexiconFiles.length === 0) {
    wordLexiconError = '未找到任何 07*.yaml 文件';
  } else if (!lenientParser) {
    wordLexiconError = '未找到 YAML 解析包（yaml 或 js-yaml）';
  } else {
    const invalidEntries = [];

    for (const fileName of wordLexiconFiles) {
      const filePath = join(RULES_DIR, fileName);
      try {
        const content = readFileSync(filePath, 'utf8');
        const fileData = lenientParser(content);
        if (!fileData || !fileData.wordLexicon || typeof fileData.wordLexicon !== 'object') {
          // 07-word-lexicon.yaml 索引文件无 wordLexicon 字段是正常的
          continue;
        }

        for (const [groupName, group] of Object.entries(fileData.wordLexicon)) {
          // 同名分组先到先得（与 rule-compiler.ts 行为一致）
          if (groupName in mergedWordLexicon) {
            invalidEntries.push(`${groupName}: 分组重名（${fileName} 与先加载文件冲突）`);
            continue;
          }

          if (!group || typeof group !== 'object') {
            invalidEntries.push(`${groupName}: 非对象`);
            continue;
          }
          // cssClass 必填
          if (typeof group.cssClass !== 'string' || group.cssClass === '') {
            invalidEntries.push(`${groupName}: 缺少 cssClass`);
            continue;
          }
          // priority 必填且范围合法
          if (typeof group.priority !== 'number') {
            invalidEntries.push(`${groupName}: 缺少 priority 或非数值`);
            continue;
          } else if (group.priority < WORD_LEXICON_PRIORITY_MIN || group.priority > WORD_LEXICON_PRIORITY_MAX) {
            invalidEntries.push(
              `${groupName}: priority=${group.priority} 不在 ${WORD_LEXICON_PRIORITY_MIN}-${WORD_LEXICON_PRIORITY_MAX} 范围内`
            );
            continue;
          }
          // words 必填且非空数组
          if (!Array.isArray(group.words) || group.words.length === 0) {
            invalidEntries.push(`${groupName}: 缺少 words 或为空数组`);
            continue;
          }

          // 记录到合并对象
          mergedWordLexicon[groupName] = group;
          groupCount++;
          // 校验每个词的长度
          for (const word of group.words) {
            if (typeof word !== 'string' || word.length === 0) {
              invalidEntries.push(`${groupName}: 存在非字符串或空词`);
              continue;
            }
            if (word.length < WORD_MIN_LENGTH || word.length > WORD_MAX_LENGTH) {
              invalidEntries.push(
                `${groupName}: 词"${word}"长度=${word.length} 不在 ${WORD_MIN_LENGTH}-${WORD_MAX_LENGTH} 范围内`
              );
            }
            wordCount++;
          }
        }
      } catch (e) {
        invalidEntries.push(`${fileName}: 解析失败 - ${e.message}`);
      }
    }

    if (invalidEntries.length > 0) {
      const preview = invalidEntries.slice(0, 5).join('; ');
      const suffix = invalidEntries.length > 5 ? ` 等 ${invalidEntries.length} 项` : '';
      wordLexiconError = `非法条目${suffix}: ${preview}`;
    } else if (groupCount === 0) {
      // 允许所有 07*.yaml 文件均无 wordLexicon 字段（兼容降级）
      wordLexiconOk = true;
      wordCount = 0;
    } else {
      wordLexiconOk = true;
    }
  }

  if (wordLexiconOk) {
    pass(11, `wordLexicon 字段校验（${groupCount} 组 / ${wordCount} 词，${wordLexiconFiles.length} 文件）`);
  } else {
    fail(11, 'wordLexicon 字段校验', wordLexiconError);
  }

  // ===== 检查项 12：词组优先级与 05-priority.yaml 一致性 =====
  let priorityOk = false;
  let priorityError = '';
  const conflicts = [];

  if (
    Object.keys(mergedWordLexicon).length > 0 &&
    priorityConfig &&
    priorityConfig.priority
  ) {
    const priorityMap = priorityConfig.priority;
    for (const [groupName, group] of Object.entries(mergedWordLexicon)) {
      if (!group || typeof group.priority !== 'number') continue;
      // 05-priority.yaml 中对应的 key 为 word_lexicon_<name>
      const expectedKey = `word_lexicon_${groupName}`;
      const expectedPriority = priorityMap[expectedKey];
      if (expectedPriority === undefined) {
        // 05 中未登记该分组，跳过（不视为冲突）
        continue;
      }
      if (expectedPriority !== group.priority) {
        conflicts.push(`${groupName}: 07 priority=${group.priority}, 05 ${expectedKey}=${expectedPriority}`);
      }
    }

    if (conflicts.length > 0) {
      priorityError = `优先级不一致 [${conflicts.length}]: ${conflicts.join(', ')}`;
    } else {
      priorityOk = true;
    }
  } else {
    priorityError = '缺少 wordLexicon 或 priorityConfig，无法校验';
  }

  if (priorityOk) {
    pass(12, '词组词典优先级与 05-priority.yaml 一致');
  } else {
    fail(12, '词组词典优先级与 05-priority.yaml 一致', priorityError);
  }
}

// ============================================================
// 主检查流程
// ============================================================

async function main() {
  // 加载 YAML 解析器
  let parseYaml = null;
  let yamlParserError = null;
  try {
    parseYaml = await getYamlParser();
  } catch (e) {
    yamlParserError = e.message;
  }

  // 存储解析后的 YAML 数据（供后续检查项使用）
  const parsedYaml = {};

  // ===== 检查项 1：YAML 语法合法 =====
  let yamlOk = true;
  let yamlError = '';
  if (parseYaml) {
    for (const file of YAML_FILES) {
      try {
        const content = readFileSync(join(RULES_DIR, file), 'utf8');
        parsedYaml[file] = parseYaml(content);
      } catch (e) {
        yamlOk = false;
        yamlError = `${file}: ${e.message}`;
        break;
      }
    }
    if (yamlOk) {
      pass(1, 'YAML 语法合法');
    } else {
      fail(1, 'YAML 语法合法', yamlError);
    }
  } else {
    fail(1, 'YAML 语法合法', yamlParserError);
  }

  // ===== 检查项 2：颜色令牌引用一致性 =====
  const themeColor = parsedYaml['04-theme-color.yaml'] || {};
  const colorsDef = themeColor.colors || {};
  const styleRules = themeColor.styleRules || {};
  const definedTokens = Object.keys(colorsDef);

  const undefinedRefs = [];
  if (definedTokens.length > 0 && Object.keys(styleRules).length > 0) {
    for (const [className, rule] of Object.entries(styleRules)) {
      // 检查 color 字段引用的令牌名
      const colorRef = rule.color;
      if (typeof colorRef === 'string' && colorRef.trim() !== '') {
        if (!definedTokens.includes(colorRef)) {
          undefinedRefs.push(`${className}.color -> "${colorRef}"`);
        }
      }
    }
  }

  if (undefinedRefs.length === 0) {
    pass(2, '颜色令牌引用一致性');
  } else {
    fail(2, '颜色令牌引用一致性', `未定义的引用 [${undefinedRefs.length}]: ${undefinedRefs.join(', ')}`);
  }

  // ===== 检查项 3：优先级无冲突（同层内不重复，跨层允许重叠）=====
  const priorityConfig = parsedYaml['05-priority.yaml'] || {};
  const priorityMap = priorityConfig.priority || {};
  // 区分 pattern 层、combination 层、word_lexicon 层：
  // combination_ 前缀为字级组合规则层，word_lexicon_ 前缀为词组分词层
  // 这两层均在 patterns/lexicons 失败时触发，与 pattern 层分层运行，数值重叠是设计决策
  const patternEntries = Object.entries(priorityMap).filter(
    ([k, v]) => typeof v === 'number' && !k.startsWith('combination_') && !k.startsWith('word_lexicon_')
  );
  const combinationEntries = Object.entries(priorityMap).filter(
    ([k, v]) => typeof v === 'number' && k.startsWith('combination_')
  );

  // 检查 pattern 层内部无重复
  const patternValueCount = {};
  for (const [, v] of patternEntries) {
    patternValueCount[v] = (patternValueCount[v] || 0) + 1;
  }
  const patternDuplicates = Object.entries(patternValueCount)
    .filter(([, count]) => count > 1)
    .map(([v, count]) => `pattern 层值 ${v} 出现 ${count} 次`);

  // 检查 combination 层内部无冲突（同 cssClass 的规则允许共享优先级，靠定义顺序区分）
  // 按优先级分组，每组内若存在不同 cssClass 则报冲突
  const charLexiconParsed = parsedYaml['06-char-lexicon.yaml'] || {};
  const combinationRulesList = charLexiconParsed.combinationRules || [];
  const comboByPriority = {};
  for (const [k, v] of combinationEntries) {
    const rule = combinationRulesList.find(
      (r) => `combination_${r.name}` === k
    );
    const cc = rule?.cssClass ?? 'unknown';
    if (!comboByPriority[v]) comboByPriority[v] = new Set();
    comboByPriority[v].add(cc);
  }
  const combinationDuplicates = Object.entries(comboByPriority)
    .filter(([, cssClasses]) => cssClasses.size > 1)
    .map(([v, cssClasses]) => `combination 层值 ${v} 跨 cssClass 冲突: ${[...cssClasses].join('/')}`);

  const allDuplicates = [...patternDuplicates, ...combinationDuplicates];

  if (allDuplicates.length === 0) {
    pass(3, '优先级无冲突（同层内无重复，跨层重叠为设计决策）');
  } else {
    fail(3, '优先级无冲突', `重复项: ${allDuplicates.join(', ')}`);
  }

  // ===== 检查项 4：version.json 字段完整 =====
  const versionPath = join(RULES_DIR, 'version.json');
  let versionOk = true;
  let versionError = '';
  let versionData = null;

  try {
    const content = readFileSync(versionPath, 'utf8');
    versionData = JSON.parse(content);
    const requiredFields = ['version', 'updateTime', 'mainBranch', 'rawBaseUrl'];
    const missingFields = requiredFields.filter((f) => !(f in versionData));

    if (missingFields.length > 0) {
      versionOk = false;
      versionError = `缺少字段: ${missingFields.join(', ')}`;
    } else {
      // mainBranch 必须等于 "main"
      if (versionData.mainBranch !== 'main') {
        versionOk = false;
        versionError = `mainBranch 应为 "main"，实际为 "${versionData.mainBranch}"`;
      }
      // version 必须符合语义化版本正则
      const versionRegex = /^\d+\.\d+\.\d+$/;
      if (versionOk && !versionRegex.test(versionData.version)) {
        versionOk = false;
        versionError = `version 不符合 X.Y.Z 格式，实际为 "${versionData.version}"`;
      }
      // updateTime 必须符合 YYYY-MM-DD 格式
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (versionOk && !dateRegex.test(versionData.updateTime)) {
        versionOk = false;
        versionError = `updateTime 不符合 YYYY-MM-DD 格式，实际为 "${versionData.updateTime}"`;
      }
      // rawBaseUrl 必须以 /main/rules 结尾且不带尾斜杠
      if (
        versionOk &&
        (!versionData.rawBaseUrl.endsWith('/main/rules') ||
          versionData.rawBaseUrl.endsWith('/'))
      ) {
        versionOk = false;
        versionError = `rawBaseUrl 应以 /main/rules 结尾且无尾斜杠，实际为 "${versionData.rawBaseUrl}"`;
      }
    }
  } catch (e) {
    versionOk = false;
    versionError = e.message;
  }

  if (versionOk) {
    pass(4, 'version.json 字段完整');
  } else {
    fail(4, 'version.json 字段完整', versionError);
  }

  // ===== 检查项 5：CHANGELOG 与 version.json 版本一致 =====
  const changelogPath = join(RULES_DIR, 'CHANGELOG.md');
  let changelogOk = true;
  let changelogError = '';

  try {
    if (!existsSync(changelogPath)) {
      changelogOk = false;
      changelogError = 'CHANGELOG.md 文件不存在';
    } else {
      const content = readFileSync(changelogPath, 'utf8');
      // 提取顶部第一个版本号（格式 ## [vX.Y.Z] 或 ## [X.Y.Z]）
      const match = content.match(/## \[v?(\d+\.\d+\.\d+)\]/);
      if (!match) {
        changelogOk = false;
        changelogError = '未找到版本号标题（格式 ## [vX.Y.Z]）';
      } else {
        const changelogVersion = match[1];
        const jsonVersion = versionData ? versionData.version : '';
        if (changelogVersion !== jsonVersion) {
          changelogOk = false;
          changelogError = `CHANGELOG 顶部版本 ${changelogVersion} 与 version.json 的 ${jsonVersion} 不一致`;
        }
      }
    }
  } catch (e) {
    changelogOk = false;
    changelogError = e.message;
  }

  if (changelogOk) {
    pass(5, 'CHANGELOG 与 version.json 版本一致');
  } else {
    fail(5, 'CHANGELOG 与 version.json 版本一致', changelogError);
  }

  // ===== 检查项 6：rawBaseUrl 可达性 =====
  let reachOk = false;
  let reachError = '';

  if (versionData && versionData.rawBaseUrl) {
    const url = `${versionData.rawBaseUrl}/version.json`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.status === 200) {
        reachOk = true;
      } else {
        reachError = `HTTP 状态码 ${res.status}`;
      }
    } catch (e) {
      reachError =
        e.name === 'AbortError' ? '请求超时（10 秒）' : e.message;
    }
  } else {
    reachError = 'version.json 中无 rawBaseUrl 字段';
  }

  if (reachOk) {
    pass(6, 'rawBaseUrl 可达性');
  } else {
    fail(6, 'rawBaseUrl 可达性', reachError);
  }

  // ===== 检查项 7-10：06-char-lexicon.yaml 校验（v2.5.0 新增）=====
  await checkCharLexicon(priorityConfig);

  // ===== 检查项 11-12：07-word-lexicon.yaml 校验（v2.6.0 新增）=====
  await checkWordLexicon(priorityConfig);

  // ===== 汇总结果 =====
  const allPassed = results.every((r) => r.ok);
  if (allPassed) {
    console.log(`\n${GREEN}所有检查通过！可以发布。${RESET}`);
    process.exit(0);
  } else {
    console.log(`\n${RED}检查失败！请修复上述问题后再发布。${RESET}`);
    process.exit(1);
  }
}

// 启动主流程
main().catch((e) => {
  console.error(`${RED}脚本异常: ${e.message}${RESET}`);
  process.exit(1);
});
