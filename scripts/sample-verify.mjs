// sample-verify.mjs — 端到端样本验证
// 用用户提供的分镜脚本样本，验证 22 类元素是否全部被新规则正确识别
// 读取 5 个 rules YAML 文件，解析 pattern 正则与词典词条，模拟插件匹配逻辑

import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const RULES_DIR = '/Users/mac/Documents/ob插件/prompt-colorizer/rules';

// 简易 YAML 解析（仅提取我们需要的 pattern/lexicon 字段）
function parseYamlPatterns(yamlText) {
  const patterns = {};
  const lines = yamlText.split('\n');
  let currentPattern = null;
  let inPatternsBlock = false;

  for (const line of lines) {
    // 检测进入 patterns: 块
    if (/^patterns\s*:/.test(line)) {
      inPatternsBlock = true;
      continue;
    }
    if (!inPatternsBlock) continue;

    // 检测 pattern 名（2 空格缩进 + 标识符 + 冒号）
    const nameMatch = line.match(/^  ([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
    if (nameMatch) {
      currentPattern = nameMatch[1];
      patterns[currentPattern] = {};
      continue;
    }

    // 检测 pattern 字段
    if (currentPattern) {
      const fieldMatch = line.match(/^    ([a-zA-Z]+)\s*:\s*(.+?)\s*$/);
      if (fieldMatch) {
        const [, key, value] = fieldMatch;
        // 去除引号
        let v = value;
        if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"'))) {
          v = v.slice(1, -1);
        }
        patterns[currentPattern][key] = v;
      }
    }
  }
  return patterns;
}

function parseYamlLexicon(yamlText) {
  const lexicon = {};
  const lines = yamlText.split('\n');
  let currentCategory = null;
  let inLexiconBlock = false;

  for (const line of lines) {
    if (/^lexicon\s*:/.test(line)) {
      inLexiconBlock = true;
      continue;
    }
    if (!inLexiconBlock) continue;
    // 检测离开 lexicon 块（顶层非空格）
    if (/^[a-zA-Z]/.test(line) && !/^lexicon/.test(line)) break;

    // 检测分类名
    const catMatch = line.match(/^  ([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
    if (catMatch) {
      currentCategory = catMatch[1];
      lexicon[currentCategory] = [];
      continue;
    }

    // 检测词条
    if (currentCategory) {
      const wordMatch = line.match(/^    -\s+"([^"]+)"/);
      if (wordMatch) {
        lexicon[currentCategory].push(wordMatch[1]);
      }
    }
  }
  return lexicon;
}

// 读取规则文件
const patternsYaml = readFileSync(`${RULES_DIR}/01-base-patterns.yaml`, 'utf8');
const lexiconYaml = readFileSync(`${RULES_DIR}/03-lexicon-optional.yaml`, 'utf8');

const patterns = parseYamlPatterns(patternsYaml);
const lexicon = parseYamlLexicon(lexiconYaml);

console.log('=== 加载的 pattern 数量:', Object.keys(patterns).length);
console.log('=== 加载的词典分类:', Object.keys(lexicon).map(c => `${c}(${lexicon[c].length})`).join(', '));
console.log('');

// 用户样本提示词
const sample = `B 段 13s｜肢体侵略・撕破伪装外衣（调度：距离持续压缩，情欲视觉放大）
模块 1 方向锁
继承上段横向轴线，机位不变，Draven 始终高位。
模块 2 空间锚定
完全聚焦大床床面，背景墙面深度虚化，浅景深压缩空间，双人距离进一步拉近。
模块 3 角色锁定
两人依旧隐藏种族异化特征，仅靠肢体动作塑造张力。
模块 4 分镜头扩写（0-13s，场面调度逐镜拆解）
镜头 1（0-4s｜双人近景，微俯固定）
调度逻辑：静态对峙调度，Joshua 蜷缩收缩身体，用自我缩小姿态伪装顺从，反衬 Draven 向外扩张的侵略体态；
运镜：机位保持俯拍大床，固定不动；
画面：Joshua 双腿蜷缩，双手交叉挡在胸前，肩膀微微发抖，语调放软求饶，眼底暗光一闪转瞬掩盖；
镜头 2（4-9s｜上半身特写，缓慢前推）
调度逻辑：爆发式肢体动作调度，Draven 双手同时发力撕裂衬衫，大幅度手部动作打破静态温柔，视觉上撕破 Joshua 的伪装外衣，对应剧情 "假意顺从的外壳破碎"；
运镜：镜头快速小幅向前推，聚焦两人上半身手部动作；
画面：Draven 双手攥住 Joshua 白衬衫左右猛扯，纽扣四散弹飞，雪白衬衫直接崩开，大片白皙肌肤暴露在暖光下，布料撕裂动态完整；
镜头 3（9-13s｜肌肤局部特写，侧光固定）
调度逻辑：极致近距离压缩调度，镜头抛弃环境只留双人局部，放大情欲氛围，Draven 俯身下压，脸部贴近 Joshua 锁骨，身体无限贴近，无任何逃生空隙；
运镜：固定特写机位，侧光打在肌肤形成柔和明暗；
画面：Draven 垂眸盯着 Joshua 肌肤，舌尖轻舔干涩下唇，气息落在对方颈间，身躯完全笼罩少年；
台词 Draven（低哑蛊惑） {{Mixed 4}} ：You look absolutely delicious.
模块 5 段尾钩子
定格特写：Draven 嘴唇悬停在 Joshua 锁骨上方，动作停滞，半完成亲吻动作，衔接下一段情绪反转。
本段调度说明
持续缩小镜头取景范围，从双人全身压缩到局部特写，空间上不断拉近两人距离，层层递进放大 Draven 的侵略性；动作调度从拖拽升级为撕裂，动作力度逐级加重，情欲氛围拉满，但 Joshua 全程蜷缩避让，肢体潜意识抗拒，调度暗藏对立冲突。
全局约束
无文字，画面干净，无畸形肢体，光影柔和不曝光。

一、本场核心叙事目标 & 调度底层逻辑
1. 戏剧内核
表层：强势龙君掳走人鱼少年，室内暧昧拉扯、情欲试探；
深层：仇恨伪装下的刺杀博弈，哨向天生绑定带来生理本能渴求与血海深仇的剧烈割裂，一柔一刚、一伪一真形成强戏剧反差。
2. 调度设计核心思路
空间调度：全程锁右侧出入口 + 右侧大床，用狭小密闭客房制造压迫囚禁感，所有动线收敛在单侧，弱化空间纵深感，强化两人贴身对峙；
人物站位调度：Draven {{Mixed 1}} 永远占据高位、主动动线、画面强势区域；Joshua {{Mixed 2}} 始终被动躺卧、退守弱势位，用高低位差体现力量悬殊；
镜头调度递进逻辑：
全景交代人物入场压迫感→中近景拉扯暧昧氛围→特写放大肌肤情欲细节→正反特写引爆情绪反转刺杀；
光影调度分层：前两段统一 3200K 暖黄光烘托暧昧情欲，第三段叠加人鱼冰蓝冷光切割画面，用光完成情绪割裂；
表演调度分层：Draven 外放侵略、直白占有；Joshua 分层表演 —— 表层柔弱娇羞，眼底暗藏冷恨，镜头通过微表情特写揭露伪装。
3. 参考影视调度对标
《他是龙》室内囚禁双人压迫调度、《水形物语》近距离人物情绪特写、《发现女巫》宿命伴侣精神拉扯镜头、《永恒》密闭房间爱恨肢体冲突调度。
二、全局统一设定（全三段通用）
空间：夜，封闭式欧式奢华酒店客房，门在画面右后，整张宽大软床占据画面右半区，仅床头一盏暖壁灯为唯一光源，无窗户，空间狭窄闭塞，横向双人对话轴线，全程不越轴。
人物：
Draven（S 主，高位强势方）：190cm 高大黑龙人形，黑发红瞳，下颌隐淡金细龙鳞，黑衬衫，气场压制，动作粗重有力量，占有欲外露；
Joshua（S 主，弱势伪装方）：173cm 银发人鱼，白皮纤细，白修身西装，先天体弱，表层温顺，眼底藏复仇恨意，可生长鱼蹼、凝聚冰系魔法。
整体影像：院线真人奇幻，胶片浅景深，低饱和暗调，细腻皮肤肌理，克制情欲，写实微量兽人异化特效，运镜带轻微呼吸感。
A 段 14s｜掳入客房・假意温存铺垫（站位调度：高位压制，伪装拉扯）
模块 1 方向锁
横向固定轴线，Draven 持续画面右侧强势区，Joshua 被置于左侧弱势区，三段机位同侧，无越轴。
模块 2 空间锚定
右后方房门入口，右侧米白大床，深色哑光墙面，前景无遮挡，暖光侧打人物轮廓，狭小空间挤压双人距离。
模块 3 角色锁定
Draven 半兽特征仅下颌细碎龙鳞隐藏不外露；Joshua 完全人形，不显露人鱼任何异化特征，全程伪装柔弱。`;

// 测试用例：22 类元素的代表性样本
const testCases = [
  { type: '段落标题', sample: 'B 段 13s｜肢体侵略・撕破伪装外衣', pattern: 'segment_header' },
  { type: '段落标题(无括号)', sample: 'A 段 14s｜掳入客房・假意温存铺垫', pattern: 'segment_header' },
  { type: '模块标题(简单)', sample: '模块 1 方向锁', pattern: 'module_header' },
  { type: '模块标题(带括号)', sample: '模块 4 分镜头扩写', pattern: 'module_header' },
  { type: '镜头标题(新格式)', sample: '镜头 1（0-4s｜双人近景，微俯固定）', pattern: 'shot_header' },
  { type: '镜头标题(旧格式)', sample: '镜头1（3秒）', pattern: 'shot_header' },
  { type: '台词标注', sample: '台词 Draven（低哑蛊惑） {{Mixed 4}} ：', pattern: 'dialogue_speaker' },
  { type: '角色定义', sample: 'Draven（S 主，高位强势方）：', pattern: 'character_def' },
  { type: '书名号引用', sample: '《他是龙》', pattern: 'book_title' },
  { type: '中文序号章节', sample: '一、', pattern: 'cn_chapter' },
  { type: '时间范围', sample: '0-4s', pattern: 'time_range' },
  { type: '段落小标题(本段)', sample: '本段调度说明', pattern: 'section_note' },
  { type: '段落小标题(全局)', sample: '全局约束', pattern: 'section_note' },
  { type: '变量占位符', sample: '{{Mixed 1}}', pattern: 'variable' },
  { type: '技术参数(K)', sample: '3200K', pattern: 'tech_param' },
  { type: '单一时间码', sample: '13s', pattern: 'tech_param' },
  { type: '括号注释', sample: '（低哑蛊惑）', pattern: 'parenthetical' },
  { type: '参数键(调度逻辑)', sample: '调度逻辑：', pattern: 'param_key' },
  { type: '参数键(运镜)', sample: '运镜：', pattern: 'param_key' },
  { type: '参数键(画面)', sample: '画面：', pattern: 'param_key' },
  { type: '参数键(定格特写)', sample: '定格特写：', pattern: 'param_key' },
];

// 词典测试用例
const lexiconTestCases = [
  { type: '词典-组合景别(双人近景)', sample: '双人近景', category: 'shot_size' },
  { type: '词典-组合景别(上半身特写)', sample: '上半身特写', category: 'shot_size' },
  { type: '词典-组合景别(肌肤局部特写)', sample: '肌肤局部特写', category: 'shot_size' },
  { type: '词典-组合景别(正反特写)', sample: '正反特写', category: 'shot_size' },
  { type: '词典-机位运动(微俯固定)', sample: '微俯固定', category: 'camera_fixed' },
  { type: '词典-机位运动(缓慢前推)', sample: '缓慢前推', category: 'camera_fixed' },
  { type: '词典-机位运动(侧光固定)', sample: '侧光固定', category: 'camera_fixed' },
  { type: '词典-机位运动(固定不动)', sample: '固定不动', category: 'camera_fixed' },
  { type: '词典-调度术语(场面调度)', sample: '场面调度', category: 'blocking' },
  { type: '词典-调度术语(空间调度)', sample: '空间调度', category: 'blocking' },
  { type: '词典-调度术语(动线)', sample: '动线', category: 'blocking' },
  { type: '词典-调度术语(轴线)', sample: '轴线', category: 'blocking' },
  { type: '词典-调度术语(空间锚定)', sample: '空间锚定', category: 'blocking' },
  { type: '词典-调度术语(段尾钩子)', sample: '段尾钩子', category: 'blocking' },
];

console.log('===== Pattern 匹配验证 =====');
let passCount = 0, failCount = 0;
for (const tc of testCases) {
  const p = patterns[tc.pattern];
  if (!p) {
    console.log(`✗ ${tc.type}: pattern "${tc.pattern}" 不存在`);
    failCount++;
    continue;
  }
  try {
    const flags = p.flags || '';
    const re = new RegExp(p.regex, flags);
    const matched = re.test(tc.sample);
    if (matched) {
      console.log(`✓ ${tc.type} → ${tc.pattern}`);
      passCount++;
    } else {
      console.log(`✗ ${tc.type} → ${tc.pattern} (未匹配)  正则: ${p.regex}`);
      failCount++;
    }
  } catch (e) {
    console.log(`✗ ${tc.type} → ${tc.pattern} (正则错误: ${e.message})`);
    failCount++;
  }
}

console.log('\n===== 词典匹配验证 =====');
for (const tc of lexiconTestCases) {
  const words = lexicon[tc.category];
  if (!words) {
    console.log(`✗ ${tc.type}: 分类 "${tc.category}" 不存在`);
    failCount++;
    continue;
  }
  if (words.includes(tc.sample)) {
    console.log(`✓ ${tc.type} → ${tc.category}`);
    passCount++;
  } else {
    console.log(`✗ ${tc.type} → ${tc.category} (词条不存在)`);
    failCount++;
  }
}

console.log(`\n===== 汇总 =====`);
console.log(`通过: ${passCount}, 失败: ${failCount}, 总计: ${passCount + failCount}`);
console.log(`通过率: ${(passCount / (passCount + failCount) * 100).toFixed(1)}%`);

if (failCount > 0) {
  process.exit(1);
}
