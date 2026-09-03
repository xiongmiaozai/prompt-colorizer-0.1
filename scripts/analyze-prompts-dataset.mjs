// analyze-prompts-dataset.mjs — 分析提示词语料，提取候选词组
// 运行命令：node scripts/analyze-prompts-dataset.mjs（从 prompt-colorizer 目录运行）
//
// 算法：N-gram 频率统计
//   1. 从语料中提取所有 2-6 字的连续中文片段
//   2. 统计每个片段的出现频率
//   3. 过滤掉已存在于 07-word-lexicon.yaml 的词
//   4. 按频率排序，输出候选词列表
//
// 输出：scripts/datasets/candidate-words.json

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);
const RULES_DIR = join(ROOT_DIR, 'rules');
const DATA_DIR = join(ROOT_DIR, 'scripts', 'datasets');

// ============================================================
// YAML 解析
// ============================================================

async function getYamlParser() {
  try {
    const mod = await import('yaml');
    return mod.parse || mod.default?.parse;
  } catch (_) {}
  try {
    const mod = await import('js-yaml');
    return mod.load || mod.default?.load;
  } catch (_) {}
  throw new Error('未找到 YAML 解析包');
}

// ============================================================
// N-gram 提取算法
// ============================================================

/**
 * 从文本中提取所有 N-gram（2-6 字连续中文片段）
 * @param {string} text 输入文本
 * @param {number} minN 最小字数
 * @param {number} maxN 最大字数
 * @returns {Map<string, number>} N-gram → 频率
 */
function extractNgrams(text, minN = 2, maxN = 6) {
  const counts = new Map();
  // 匹配连续的中文段（基本区）
  const cjkSegments = text.match(/[\u4e00-\u9fff]+/g) || [];

  for (const segment of cjkSegments) {
    const len = segment.length;
    for (let n = minN; n <= maxN; n++) {
      for (let i = 0; i <= len - n; i++) {
        const gram = segment.substring(i, i + n);
        counts.set(gram, (counts.get(gram) || 0) + 1);
      }
    }
  }
  return counts;
}

/**
 * 过滤候选词
 * 规则：
 *   1. 频率 >= minFreq
 *   2. 长度 2-6
 *   3. 不在已有词库中
 *   4. 不包含常见停用字（的、了、是、在等）
 *   5. 严格子串去重：若当前词是某个频率≥自身的更长词的子串，则跳过
 * @param {Map<string, number>} ngrams N-gram 频率表
 * @param {Set<string>} existingWords 已有词集合
 * @param {number} minFreq 最小频率
 * @returns {Array<{word: string, freq: number, length: number}>}
 */
function filterCandidates(ngrams, existingWords, minFreq = 3) {
  // 停用字（作为首字或尾字时过滤）
  const stopChars = new Set([
    '的', '了', '是', '在', '和', '与', '或', '及', '但', '而', '则', '为', '把', '被', '让', '使', '给',
    '这', '那', '哪', '它', '他', '她', '我', '你', '们', '之', '其', '此', '该', '某', '每', '各', '另',
    '个', '只', '条', '张', '件', '种', '类', '些', '样', '下', '上', '中', '里', '外', '前', '后', '左', '右',
    '有', '无', '没', '非', '未', '勿', '别', '不', '要', '能', '会', '可', '应', '须',
    '都', '全', '皆', '俱', '任', '何', '所', '以', '于', '至', '到', '从', '由', '向', '往',
    '即', '若', '如', '似', '或', '且', '并', '与',
  ]);

  // 第一步：过滤与排序
  // 按 (频率降序, 长度降序) 排序：先处理高频长词，再处理低频短词
  const sorted = Array.from(ngrams.entries())
    .filter(([word, freq]) => freq >= minFreq && word.length >= 2 && word.length <= 6)
    .filter(([word]) => !stopChars.has(word[0]) && !stopChars.has(word[word.length - 1]))
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];      // 频率降序
      return b[0].length - a[0].length;            // 长度降序
    });

  // 第二步：严格子串去重
  // 对每个候选词，检查它是否是任何"频率≥自身频率的更长已选词"的子串
  const result = [];
  for (const [word, freq] of sorted) {
    if (existingWords.has(word)) continue;

    // 检查当前词是否是某个已选更长词的子串
    // 已选列表按 (频率降序, 长度降序) 排序，所以已选词的频率 >= 当前词频率
    let isSubsumed = false;
    for (const { word: selectedWord } of result) {
      // 只有当已选词比当前词更长，且当前词是已选词的子串时，才跳过
      if (selectedWord.length > word.length && selectedWord.includes(word)) {
        isSubsumed = true;
        break;
      }
    }
    if (!isSubsumed) {
      result.push({ word, freq, length: word.length });
    }
  }

  return result;
}

// ============================================================
// 语义分类启发式规则
// ============================================================

/**
 * 基于关键词模式将候选词分类到语义分组
 * 改进：使用 2+ 字前缀匹配，避免单字前缀误归类
 * @param {string} word 候选词
 * @returns {string|null} 分组名（匹配时），null 表示未匹配
 */
function classifyWord(word) {
  // 约束指令（2字前缀）
  if (/^(切勿|切忌|勿要|勿将|勿让|勿使|勿用|不得|不应|不可|不能|不允许|严禁|避免|杜绝|排除|必须|务必|保证|确保|锁定|严格|仅保|仅使|仅采|不要|不让|不变|不弯|不变形|不改|不夸|不添加|不出现|不生成|不使用|保持|确保|保留)/.test(word)) {
    return 'constraint_phrase';
  }
  // 技术参数（2字前缀）
  if (/^(高帧|低帧|标准帧|电影帧|广播帧|高分辨|低分辨|标准分辨|原生分辨|目标分辨|输出分辨|高色域|广色域|窄色域|标准色域|高动态|标准动态|色彩深度|色彩采样|色度抽样|高码率|低码率|恒定码率|可变码率|无损压缩|有损压缩|高压缩|低压缩|原生帧率|目标帧率|输出帧率|高比特|低比特|色彩精度|色域覆盖|动态范围|帧精度|场精度|逐行扫描|隔行扫描|高色深|低色深|八位色深|十位色深|十六位色深|色温|色调|色相|饱和度|明度|对比度|亮度|曝光|光圈|快门|焦距|焦段|景深|白平衡|感光度|画幅|宽高比|渲染精度|迭代步数|随机种子|权重强度)/.test(word)) {
    return 'tech_param_phrase';
  }
  // 参数键（后接冒号的词，2字前缀）
  if (/^(色温|色调|色相|饱和度|明度|对比度|亮度|曝光|光圈|快门|焦距|焦段|景深|白平衡|感光度|镜头|机位|构图|景别|角度|视角|音量|采样率|位深度|声道|降噪|锐化|模糊|色彩空间|伽马|画幅|宽高比|渲染|迭代|随机种子|权重|帧率|码率|比特率)/.test(word)) {
    return 'param_key_phrase';
  }
  // 镜头运动（2字前缀，避免单字"推""拉"误匹配）
  if (/^(缓推|急推|猛推|缓拉|急拉|猛拉|缓摇|急摇|快甩|慢甩|微推|微拉|微摇|微移|小幅推|小幅拉|大幅推|大幅拉|左摇|右摇|上摇|下摇|左移|右移|前推|后拉|横移|纵移|环绕跟拍|弧形推移|螺旋上升|螺旋下降|对角推移|之字形|波浪式|手持跟拍|稳定器跟拍|肩扛跟拍|胸托跟拍|低角度跟拍|高角度跟拍|缓推急拉|急推缓拉|快速横移|缓慢横移|快速纵移|缓慢纵移|大幅摇摄|小幅摇摄|连续跟拍|断续跟拍|匀速推进|匀速后拉|变速推拉|急停定格|缓停定格|快速变焦|缓慢变焦|焦点转换|焦点拉移|焦点甩动|靠近主体|拉开视野|跟随动作|聚焦眼神|完成转场|锁定主体|追踪主体|环绕主体|推进画面|拉远全景|镜头|推拉摇移|变焦|定格)/.test(word)) {
    return 'camera_action_phrase';
  }
  // 情绪表演（2字前缀，避免单字"面""眉""眼"误匹配）
  if (/^(悲喜|又惊|又爱|半信|将信|若有所思|若有所失|心神|心烦|心乱|心急|心花|心旷|心驰|心猿|眉头|眉开|眉飞|愁眉|喜笑|嬉皮|冷若|面如|面红|面带|面无|目光|眼含|怒目|横眉|挤眉|百感|百无聊赖|怅然|悲痛|欣喜|惊恐|惶恐|惊慌|惊魂|心惊|胆战|提心|忧心|愁肠|肝肠|痛不|痛心|撕心|喜出|喜不|喜上|喜形|笑容|笑逐|破涕|表情|情绪|神态|眼神)/.test(word)) {
    return 'emotion_phrase';
  }
  // 场景描写（2字前缀）
  if (/^(华灯|车水|人山|灯火|霓虹|高楼|熙熙|摩肩|川流|万家|山清|湖光|鸟语|万紫|繁花|绿树|郁郁|层林|漫山|一望|万籁|鸦雀|荒无|寸草|满目|断壁|残垣|人迹|穷山|不毛|风和|月黑|电闪|狂风|倾盆|细雨|微风|风起|云雾|烟波|夜幕|街道|远处|近处|清晨|午后|傍晚|夜间|室内|户外|棚拍|实景|台面|背景|墙面|地面|江南|园林|竹林|城市|夜市|街边|废墟|废土|末日|废墟|场景|环境|空间)/.test(word)) {
    return 'scene_description_phrase';
  }
  // 人物动作（2字前缀）
  if (/^(低头|抬头|点头|摇头|蹙眉|挑眉|闭目|睁大|眯眼|侧耳|伸手|挥手|握手|拍手|抚掌|双手|拱手|叉腰|抱臂|搓手|转身|迈步|后退|大步|步履|踉跄|跌跌|昂首|蹑手|东倒|正襟|翘腿|倚墙|盘腿|席地|挺直|弯腰|伏案|掩面|捶胸|站立|坐姿|手持|身着|穿戴|姿势|动作|肢体|身形)/.test(word)) {
    return 'character_action_phrase';
  }
  // 环境氛围（2字前缀）
  if (/^(阳光|烈日|星光|月色|月华|日光|光影|树影|波光|金光|雾气|烟雾|薄雾|烟雨|阴雨|细雨|雨幕|水汽|云雾|晨雾|漆黑|昏暗|明亮|幽光|暖光|冷光|烛光|火光|霞光|暮色|光线|棚拍光|主光|边缘光|背光|反射光|自然光|商业灯光|柔和|清晰|真实|高级|干净|简洁|温暖|清爽|克制|诱人|治愈|宁静|怀旧|专业|现代|科技|动感|热烈|真诚|秩序|氛围|光位|侧光|顶光|逆光|顺光|漫射光|丁达尔|色温|色调|氛围光|环境光|瓦斯灯|霓虹灯|暖色|冷色)/.test(word)) {
    return 'atmosphere_phrase';
  }
  // 服饰妆容（2字前缀）
  if (/^(衣袂|衣冠|珠光|雍容|清新|端庄|风流|玉树|亭亭|楚楚|素颜|浓妆|粉黛|蛾眉|唇红|面若|肤若|冰肌|明眸|粉面|披头|蓬头|衣衫|锦衣|布衣|戎装|披坚|凤冠|西装|长袍|穿搭|服装|服饰|妆容|品牌|商标|认证|包装|标签|纹理|材质|面料|皮革|玻璃|金属|木纹|纸质感|汉服|古装|团扇|油纸伞|配饰|首饰)/.test(word)) {
    return 'costume_makeup_phrase';
  }
  // 商业设计（2字前缀，新分类）
  if (/^(棚拍|主图|卖点|套装|促销|节日|详情页|首屏|留白|画幅|比例|层次|前景|背景|居中|构图|排版|视觉|素材|创意|品牌|海报|封面|图库|模板|图标|按钮|标题|副标题|文案|贴纸|装饰|分割线|网格|平铺|打卡|探店|种草|合集|教程|知识|卡片|改造|穿搭|美食|家居|工具|推荐|二维码|水印|乱码|虚假|夸张|承诺|质感|反射|折射|透明|半透明|磨砂|哑光|亮光|珠光|亚克力|陶瓷|布料|丝绸|棉麻|针织|牛仔|皮质|商品|产品|物品|物件|道具|餐桌|台面|场景|画面|图像)/.test(word)) {
    return 'commercial_design_phrase';
  }
  // 摄影器材与技术（新分类）
  if (/^(镜头|光圈|快门|焦距|焦段|广角|长焦|微距|标准镜头|定焦|变焦|三脚架|稳定器|柔光箱|反光板|色温|白平衡|感光度|曝光|景深|视场角|物理相机|渲染器| octane | v-ray | blender | c4d | yeti | xgen | pbr | hdr | iso)/.test(word)) {
    return 'photography_phrase';
  }
  // 风格流派（新分类）
  if (/^(扁平|水墨|国风|二次元|动漫|治愈|绘本|蒸汽朋克|赛博朋克|末日|废土|奇幻|科幻|写实|卡通|皮克斯|迪士尼|日系|欧美|极简|未来主义|解构主义|维多利亚|伦勃朗|赛璐璐|粉彩|工业设计|概念设定|商业|艺术|纪实|街头|棚拍|外拍)/.test(word)) {
    return 'style_genre_phrase';
  }
  return null;
}

// ============================================================
// 主流程
// ============================================================

async function main() {
  console.log('=== 提示词语料分析 ===');

  // 1. 读取语料
  const corpusPath = join(DATA_DIR, 'prompts-corpus.md');
  if (!existsSync(corpusPath)) {
    console.log(`语料文件不存在: ${corpusPath}`);
    console.log('请先运行 node scripts/download-prompts-dataset.mjs');
    process.exit(1);
  }
  const corpus = readFileSync(corpusPath, 'utf8');
  console.log(`已加载语料: ${corpusPath}（${(corpus.length / 1024).toFixed(1)}KB）`);

  // 2. 加载现有词库
  const parseYaml = await getYamlParser();
  const wordLexiconText = readFileSync(join(RULES_DIR, '07-word-lexicon.yaml'), 'utf8');
  const wordLexiconData = parseYaml(wordLexiconText);

  const existingWords = new Set();
  let existingCount = 0;
  for (const group of Object.values(wordLexiconData.wordLexicon || {})) {
    for (const word of group.words || []) {
      existingWords.add(word);
      existingCount++;
    }
  }
  console.log(`已有词库: ${existingCount} 个词`);
  console.log('');

  // 3. 提取 N-gram
  console.log('--- N-gram 提取 ---');
  const ngrams = extractNgrams(corpus, 2, 6);
  console.log(`N-gram 总数: ${ngrams.size}`);

  // 4. 过滤候选词
  const candidates = filterCandidates(ngrams, existingWords, 2);
  console.log(`候选词数（去重后）: ${candidates.length}`);
  console.log('');

  // 5. 按语义分类
  console.log('--- 语义分类 ---');
  const classified = {};
  const unclassified = [];
  for (const c of candidates) {
    const group = classifyWord(c.word);
    if (group) {
      if (!classified[group]) classified[group] = [];
      classified[group].push(c);
    } else {
      unclassified.push(c);
    }
  }

  // 输出分类结果
  for (const [group, words] of Object.entries(classified).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${group}: ${words.length} 个候选词`);
    // 显示前 10 个
    const preview = words.slice(0, 10).map((w) => `${w.word}(${w.freq})`).join(', ');
    console.log(`    前 10: ${preview}`);
  }
  console.log(`  未分类: ${unclassified.length} 个`);
  if (unclassified.length > 0) {
    const preview = unclassified.slice(0, 20).map((w) => `${w.word}(${w.freq})`).join(', ');
    console.log(`    前 20: ${preview}`);
  }
  console.log('');

  // 6. 保存结果
  const outputPath = join(DATA_DIR, 'candidate-words.json');
  const output = {
    summary: {
      corpusSize: corpus.length,
      existingWords: existingCount,
      totalNgrams: ngrams.size,
      candidateCount: candidates.length,
      classifiedCount: candidates.length - unclassified.length,
      unclassifiedCount: unclassified.length,
    },
    classified,
    unclassified: unclassified.slice(0, 100), // 只保存前 100 个未分类词
  };
  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`候选词已保存: ${outputPath}`);
  console.log('');
  console.log('=== 分析完成 ===');
  console.log('下一步：人工审核 candidate-words.json，将合适的新词整合到 07-word-lexicon.yaml');
}

main().catch((e) => {
  console.error('分析过程出错:', e);
  process.exit(1);
});
