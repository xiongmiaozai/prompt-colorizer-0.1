// split-word-lexicon.mjs — 将 07-word-lexicon.yaml 拆分为 07a-07f 子文件
// 并将原文件改造为索引文件（仅保留 segmenterConfig）
// 运行命令：node scripts/split-word-lexicon.mjs（从 prompt-colorizer 目录运行）

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);
const RULES_DIR = join(ROOT_DIR, 'rules');
const SOURCE_FILE = join(RULES_DIR, '07-word-lexicon.yaml');

// 分组到文件的映射（按 spec 定义）
const GROUP_TO_FILE = {
  // 07a-constraint-tech-phrase.yaml（约束与技术参数，5 个分组）
  constraint_phrase: '07a-constraint-tech-phrase.yaml',
  tech_param_phrase: '07a-constraint-tech-phrase.yaml',
  param_key_phrase: '07a-constraint-tech-phrase.yaml',
  commercial_design_phrase: '07a-constraint-tech-phrase.yaml',
  photography_phrase: '07a-constraint-tech-phrase.yaml',

  // 07b-narrative-scene-phrase.yaml（叙事场景，8 个分组）
  chapter_title_phrase: '07b-narrative-scene-phrase.yaml',
  scene_description_phrase: '07b-narrative-scene-phrase.yaml',
  character_action_phrase: '07b-narrative-scene-phrase.yaml',
  atmosphere_phrase: '07b-narrative-scene-phrase.yaml',
  time_season_phrase: '07b-narrative-scene-phrase.yaml',
  costume_makeup_phrase: '07b-narrative-scene-phrase.yaml',
  style_genre_phrase: '07b-narrative-scene-phrase.yaml',
  emotion_phrase: '07b-narrative-scene-phrase.yaml',

  // 07c-camera-action-phrase.yaml（镜头运动，1 个分组）
  camera_action_phrase: '07c-camera-action-phrase.yaml',

  // 07d-english-core-phrase.yaml（英文核心术语，10 个分组）
  english_quality_phrase: '07d-english-core-phrase.yaml',
  english_shot_phrase: '07d-english-core-phrase.yaml',
  english_light_phrase: '07d-english-core-phrase.yaml',
  english_style_phrase: '07d-english-core-phrase.yaml',
  english_render_phrase: '07d-english-core-phrase.yaml',
  english_material_phrase: '07d-english-core-phrase.yaml',
  english_artist_phrase: '07d-english-core-phrase.yaml',
  english_negative_phrase: '07d-english-core-phrase.yaml',
  english_mj_param_phrase: '07d-english-core-phrase.yaml',
  english_prompt_eng_phrase: '07d-english-core-phrase.yaml',

  // 07e-english-extended-phrase.yaml（英文扩展术语，9 个分组）
  english_photo_gear_phrase: '07e-english-extended-phrase.yaml',
  english_color_grading_phrase: '07e-english-extended-phrase.yaml',
  english_lens_effect_phrase: '07e-english-extended-phrase.yaml',
  english_mood_phrase: '07e-english-extended-phrase.yaml',
  english_composition_extended_phrase: '07e-english-extended-phrase.yaml',
  english_style_extended_phrase: '07e-english-extended-phrase.yaml',
  english_render_extended_phrase: '07e-english-extended-phrase.yaml',
  english_material_extended_phrase: '07e-english-extended-phrase.yaml',
  english_vfx_extended_phrase: '07e-english-extended-phrase.yaml',

  // 07f-english-subject-phrase.yaml（英文主题术语，7 个分组）
  english_pose_expression_phrase: '07f-english-subject-phrase.yaml',
  english_costume_fashion_phrase: '07f-english-subject-phrase.yaml',
  english_architecture_scene_phrase: '07f-english-subject-phrase.yaml',
  english_scifi_cyberpunk_phrase: '07f-english-subject-phrase.yaml',
  english_fantasy_myth_phrase: '07f-english-subject-phrase.yaml',
  english_creature_race_phrase: '07f-english-subject-phrase.yaml',
  english_weapon_gear_phrase: '07f-english-subject-phrase.yaml',
};

// 文件头注释模板
const FILE_HEADERS = {
  '07a-constraint-tech-phrase.yaml': `# ============================================================
# 07a-constraint-tech-phrase.yaml
# 词组词典·约束与技术参数（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（5 个）：
#   constraint_phrase         (priority 48, dsl-constraint)        约束指令词组
#   tech_param_phrase         (priority 47, dsl-tech-param)        技术参数词组
#   param_key_phrase          (priority 46, dsl-param-key)         参数键词组（含 followedBy）
#   commercial_design_phrase  (priority 39, dsl-tech-param)        商业设计词组
#   photography_phrase        (priority 39, dsl-tech-param)        摄影词组
# ============================================================

wordLexicon:

`,
  '07b-narrative-scene-phrase.yaml': `# ============================================================
# 07b-narrative-scene-phrase.yaml
# 词组词典·叙事场景（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（8 个）：
#   chapter_title_phrase       (priority 45, dsl-cn-chapter)           章节标题词组
#   scene_description_phrase   (priority 42, dsl-narrative-term)       场景描述词组
#   character_action_phrase    (priority 42, dsl-lexicon-performance)  人物动作词组
#   atmosphere_phrase          (priority 41, dsl-light-word)           氛围词组
#   time_season_phrase         (priority 41, dsl-narrative-term)       时间季节词组
#   costume_makeup_phrase      (priority 40, dsl-fashion-term)         服饰妆容词组
#   style_genre_phrase         (priority 39, dsl-narrative-term)       风格流派词组
#   emotion_phrase             (priority 43, dsl-emotion-word)         情绪词组
# ============================================================

wordLexicon:

`,
  '07c-camera-action-phrase.yaml': `# ============================================================
# 07c-camera-action-phrase.yaml
# 词组词典·镜头运动（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（1 个）：
#   camera_action_phrase  (priority 44, dsl-camera-action)  镜头运动词组
# ============================================================

wordLexicon:

`,
  '07d-english-core-phrase.yaml': `# ============================================================
# 07d-english-core-phrase.yaml
# 词组词典·英文核心术语（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（10 个）：
#   english_quality_phrase    (priority 47, dsl-tech-param)     质量修饰词
#   english_shot_phrase       (priority 44, dsl-camera-action)  镜头景别
#   english_light_phrase      (priority 41, dsl-light-word)     光影术语
#   english_style_phrase      (priority 39, dsl-narrative-term) 艺术风格
#   english_render_phrase     (priority 39, dsl-tech-param)     渲染技术
#   english_material_phrase   (priority 39, dsl-tech-param)     材质术语
#   english_artist_phrase     (priority 39, dsl-narrative-term) 艺术家
#   english_negative_phrase   (priority 48, dsl-constraint)     负面术语
#   english_mj_param_phrase   (priority 46, dsl-param-key)      MJ 参数
#   english_prompt_eng_phrase (priority 45, dsl-cn-chapter)     提示工程
# ============================================================

wordLexicon:

`,
  '07e-english-extended-phrase.yaml': `# ============================================================
# 07e-english-extended-phrase.yaml
# 词组词典·英文扩展术语（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（9 个）：
#   english_photo_gear_phrase            (priority 47, dsl-tech-param)     摄影器材
#   english_color_grading_phrase         (priority 46, dsl-tech-param)     调色术语
#   english_lens_effect_phrase           (priority 45, dsl-tech-param)     镜头特效
#   english_mood_phrase                  (priority 43, dsl-emotion-word)   情绪氛围
#   english_composition_extended_phrase  (priority 42, dsl-narrative-term) 构图扩展
#   english_style_extended_phrase        (priority 39, dsl-narrative-term) 风格扩展
#   english_render_extended_phrase       (priority 39, dsl-tech-param)     渲染扩展
#   english_material_extended_phrase     (priority 39, dsl-tech-param)     材质扩展
#   english_vfx_extended_phrase          (priority 39, dsl-tech-param)     VFX 扩展
# ============================================================

wordLexicon:

`,
  '07f-english-subject-phrase.yaml': `# ============================================================
# 07f-english-subject-phrase.yaml
# 词组词典·英文主题术语（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（7 个）：
#   english_pose_expression_phrase       (priority 43, dsl-emotion-word)   姿势表情
#   english_costume_fashion_phrase       (priority 40, dsl-fashion-term)   服饰时尚
#   english_architecture_scene_phrase    (priority 39, dsl-narrative-term) 建筑场景
#   english_scifi_cyberpunk_phrase       (priority 39, dsl-narrative-term) 科幻赛博朋克
#   english_fantasy_myth_phrase          (priority 39, dsl-narrative-term) 奇幻神话
#   english_creature_race_phrase         (priority 39, dsl-narrative-term) 生物种族
#   english_weapon_gear_phrase           (priority 39, dsl-tech-param)     武器装备
# ============================================================

wordLexicon:

`,
};

// 读取源文件
const content = readFileSync(SOURCE_FILE, 'utf8');
const lines = content.split('\n');

// 找到 wordLexicon: 行
const wordLexiconLineIdx = lines.findIndex(l => l.trim() === 'wordLexicon:');
if (wordLexiconLineIdx === -1) {
  console.error('未找到 wordLexicon: 行');
  process.exit(1);
}

// 找到 segmenterConfig 区块（通常在文件末尾）
// 从 'segmenterConfig:' 行开始，读取后续所有缩进行（含注释）
let segmenterConfigLines = [];
const segConfigIdx = lines.findIndex(l => l.startsWith('segmenterConfig:'));
if (segConfigIdx !== -1) {
  segmenterConfigLines.push(lines[segConfigIdx]);
  for (let i = segConfigIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    // segmenterConfig 的子项以空格开头（缩进），空行也算
    if (line.startsWith('  ') || line.trim() === '') {
      segmenterConfigLines.push(line);
    } else {
      break;
    }
  }
  // 去除末尾空行
  while (segmenterConfigLines.length > 0 && segmenterConfigLines[segmenterConfigLines.length - 1].trim() === '') {
    segmenterConfigLines.pop();
  }
}

// 如果没有找到 segmenterConfig，使用默认值
if (segmenterConfigLines.length === 0) {
  segmenterConfigLines = [
    'segmenterConfig:',
    '  maxWordLength: 6',
    '  minWordLength: 2',
  ];
}

// 解析所有分组：找到每个分组名及其内容行范围
const groups = [];
const groupLineRegex = /^  ([a-z_]+):$/;
for (let i = wordLexiconLineIdx + 1; i < lines.length; i++) {
  const line = lines[i];
  const match = line.match(groupLineRegex);
  if (match) {
    const groupName = match[1];
    groups.push({ name: groupName, startLine: i, content: [] });
  } else if (groups.length > 0) {
    // 将内容追加到当前分组（保留原始缩进和注释）
    groups[groups.length - 1].content.push(line);
  }
}

// 去除每个分组内容末尾的空行
for (const g of groups) {
  while (g.content.length > 0 && g.content[g.content.length - 1].trim() === '') {
    g.content.pop();
  }
  // 添加一个空行作为分组间分隔
  g.content.push('');
}

console.log(`解析到 ${groups.length} 个分组`);
for (const g of groups) {
  console.log(`  ${g.name}: ${g.content.length} 行`);
}

// 按文件归类分组
const fileGroups = {};
for (const g of groups) {
  const fileName = GROUP_TO_FILE[g.name];
  if (!fileName) {
    console.warn(`分组 ${g.name} 未归类到任何文件，已跳过`);
    continue;
  }
  if (!fileGroups[fileName]) fileGroups[fileName] = [];
  fileGroups[fileName].push(g);
}

// 写入拆分文件
for (const [fileName, groupList] of Object.entries(fileGroups)) {
  const header = FILE_HEADERS[fileName] || '';
  let fileContent = header;
  for (const g of groupList) {
    // 写入分组名（带 2 空格缩进）
    fileContent += `  ${g.name}:\n`;
    // 写入分组内容（已包含原始缩进）
    for (const line of g.content) {
      fileContent += line + '\n';
    }
  }
  const outputPath = join(RULES_DIR, fileName);
  writeFileSync(outputPath, fileContent, 'utf8');
  const size = Buffer.byteLength(fileContent, 'utf8');
  console.log(`写入 ${fileName}: ${groupList.length} 个分组, ${(size / 1024).toFixed(1)} KB`);
}

// 改造 07-word-lexicon.yaml 为索引文件
const indexContent = `# ============================================================
# 07-word-lexicon.yaml
# 词组语义分词词典·索引文件（v2.7.0 改造为多文件合并加载）
# ------------------------------------------------------------
# 本文件是词组词典系列的索引文件，仅保留分词器配置（segmenterConfig）。
# 所有词组分组已迁移到 07a-07k 子文件，由 rule-compiler.ts 的
# loadMergedWordLexicon 函数按字母升序合并加载。
#
# 文件加载顺序（按字母升序）：
#   07-word-lexicon.yaml（本文件，索引 + segmenterConfig）
#   → 07a-constraint-tech-phrase.yaml（约束与技术参数，5 分组）
#   → 07b-narrative-scene-phrase.yaml（叙事场景，8 分组）
#   → 07c-camera-action-phrase.yaml（镜头运动，1 分组）
#   → 07d-english-core-phrase.yaml（英文核心术语，10 分组）
#   → 07e-english-extended-phrase.yaml（英文扩展术语，9 分组）
#   → 07f-english-subject-phrase.yaml（英文主题术语，7 分组）
#   → 07g-director-cinematography.yaml（导演·摄影与镜头语言，7 分组）
#   → 07h-director-lighting-color.yaml（导演·光影与色彩，6 分组）
#   → 07i-director-editing-sound.yaml（导演·剪辑与声音，5 分组）
#   → 07j-director-performance-screenplay.yaml（导演·表演与剧作，6 分组）
#   → 07k-director-genre-production.yaml（导演·类型/制片/电影史，5 分组）
#
# 子文件分组映射表：
#   07a: constraint_phrase, tech_param_phrase, param_key_phrase,
#        commercial_design_phrase, photography_phrase
#   07b: chapter_title_phrase, scene_description_phrase, character_action_phrase,
#        atmosphere_phrase, time_season_phrase, costume_makeup_phrase,
#        style_genre_phrase, emotion_phrase
#   07c: camera_action_phrase
#   07d: english_quality_phrase, english_shot_phrase, english_light_phrase,
#        english_style_phrase, english_render_phrase, english_material_phrase,
#        english_artist_phrase, english_negative_phrase, english_mj_param_phrase,
#        english_prompt_eng_phrase
#   07e: english_photo_gear_phrase, english_color_grading_phrase,
#        english_lens_effect_phrase, english_mood_phrase,
#        english_composition_extended_phrase, english_style_extended_phrase,
#        english_render_extended_phrase, english_material_extended_phrase,
#        english_vfx_extended_phrase
#   07f: english_pose_expression_phrase, english_costume_fashion_phrase,
#        english_architecture_scene_phrase, english_scifi_cyberpunk_phrase,
#        english_fantasy_myth_phrase, english_creature_race_phrase,
#        english_weapon_gear_phrase
#   07g: cinematography_basic, shot_size_extended, camera_angle_extended,
#        camera_movement_extended, focal_length_phrase, composition_phrase,
#        depth_of_field_phrase
#   07h: lighting_basic, light_quality, light_ratio, color_theory,
#        color_psychology, color_grading_style
#   07i: editing_basic, montage_theory, editing_rhythm, sound_design,
#        music_score
#   07j: performance_theory, emotion_expression, body_language,
#        screenplay_structure, story_element, dialogue_craft
#   07k: genre_film, film_movement, production_management,
#        post_production, film_theory
# ============================================================

${segmenterConfigLines.join('\n')}
`;

writeFileSync(SOURCE_FILE, indexContent, 'utf8');
const indexSize = Buffer.byteLength(indexContent, 'utf8');
console.log(`\n改造 07-word-lexicon.yaml 为索引文件: ${(indexSize / 1024).toFixed(1)} KB`);
console.log('\n=== 拆分完成 ===');
