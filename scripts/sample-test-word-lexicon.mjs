// sample-test-word-lexicon.mjs — 词组分词器真实样本实测
// 运行命令：node scripts/sample-test-word-lexicon.mjs（从 prompt-colorizer 目录运行）
// 加载真实 07-word-lexicon.yaml，编译为分组，在真实提示词样本上运行分词
// 输出可视化着色结果（命中用 [词@cssClass] 标记），统计命中率与漏匹配字符

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { build } from 'esbuild';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// ============================================================
// 路径与常量
// ============================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);
const RULES_DIR = join(ROOT_DIR, 'rules');

// ANSI 颜色码（用于终端可视化）
const C = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

// cssClass → 终端颜色映射（便于肉眼区分）
const CSS_TO_COLOR = {
  'dsl-constraint': C.red,
  'dsl-tech-param': C.yellow,
  'dsl-param-key': C.blue,
  'dsl-cn-chapter': C.magenta,
  'dsl-camera-action': C.cyan,
  'dsl-emotion-word': C.green,
  'dsl-narrative-term': C.gray,
  'dsl-lexicon-performance': C.green,
  'dsl-light-word': C.yellow,
  'dsl-fashion-term': C.magenta,
};

// ============================================================
// 编译 rule-compiler.ts 为 ESM 模块，复用 compileWordLexicon 与 segmentByWordLexicon
// ============================================================

const tmpDir = mkdtempSync(join(tmpdir(), 'pc-sample-test-'));
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
// YAML 解析（优先使用 yaml 包，回退 js-yaml）
// ============================================================

async function getYamlParser() {
  try {
    const mod = await import('yaml');
    if (mod.parse) return mod.parse;
    if (mod.default?.parse) return mod.default.parse;
  } catch (_) {}
  try {
    const mod = await import('js-yaml');
    if (mod.load) return mod.load;
    if (mod.default?.load) return mod.default.load;
  } catch (_) {}
  throw new Error('未找到 YAML 解析包（yaml 或 js-yaml）');
}

const parseYaml = await getYamlParser();

// ============================================================
// 加载真实 07-word-lexicon.yaml 并编译为分组
// ============================================================

const wordLexiconText = readFileSync(join(RULES_DIR, '07-word-lexicon.yaml'), 'utf8');
const wordLexiconData = parseYaml(wordLexiconText);

/**
 * 复刻 rule-compiler.ts 中 compileWordLexicon 的逻辑
 * 将 YAML wordLexicon 区块编译为 CompiledWordLexiconGroup[]
 * @param {Record<string, object>} wordLexiconRaw
 * @returns {Array} 编译后的分组数组（按优先级降序）
 */
function compileWordLexicon(wordLexiconRaw) {
  if (!wordLexiconRaw || typeof wordLexiconRaw !== 'object') return [];
  const compiled = [];
  for (const [name, group] of Object.entries(wordLexiconRaw)) {
    if (!group || typeof group !== 'object') continue;
    if (!group.cssClass || typeof group.priority !== 'number' || !Array.isArray(group.words)) continue;
    const wordSet = new Set();
    let maxWordLength = 0;
    for (const word of group.words) {
      if (typeof word !== 'string' || word.length === 0) continue;
      // 英文术语统一转小写存储，支持大小写不敏感匹配（v2.6.4）
      const normalized = /[a-zA-Z]/.test(word) ? word.toLowerCase() : word;
      wordSet.add(normalized);
      if (word.length > maxWordLength) maxWordLength = word.length;
    }
    if (wordSet.size === 0) continue;
    compiled.push({
      name,
      cssClass: group.cssClass,
      priority: group.priority,
      followedByRegex: group.followedBy ? new RegExp(group.followedBy) : null,
      wordSet,
      maxWordLength,
    });
  }
  compiled.sort((a, b) => b.priority - a.priority);
  return compiled;
}

const groups = compileWordLexicon(wordLexiconData.wordLexicon);
const segmenterConfig = {
  maxWordLength: wordLexiconData.segmenterConfig?.maxWordLength ?? 6,
  minWordLength: wordLexiconData.segmenterConfig?.minWordLength ?? 2,
};

console.log(`${C.bold}=== 词组分词器真实样本实测 ===${C.reset}`);
console.log(`已加载分组: ${groups.length} 个`);
console.log(`分组明细: ${groups.map((g) => `${g.name}(${g.wordSet.size}词,p${g.priority})`).join(', ')}`);
console.log(`分词器配置: maxWordLength=${segmenterConfig.maxWordLength}, minWordLength=${segmenterConfig.minWordLength}`);
console.log('');

// ============================================================
// 真实提示词样本（涵盖各语义场景）
// ============================================================

const samples = [
  {
    title: '样本1：约束指令（constraint_phrase）',
    text: '画面必须保持干净，切勿出现文字水印，避免出现畸形肢体，严格遵循构图规则，仅保留主体人物，不得超出画框范围。',
  },
  {
    title: '样本2：技术参数（tech_param_phrase）',
    text: '采用高帧率拍摄，输出分辨率为原生分辨率，色彩深度十位色深，逐行扫描编码，避免有损压缩导致画质损失。',
  },
  {
    title: '样本3：参数键（param_key_phrase，followedBy冒号）',
    text: '色温：3200K\n光圈：f/1.4\n快门速度：1/50s\n焦距：35mm\n景深：浅\n白平衡：自动\n机位：俯拍\n构图：三分法',
  },
  {
    title: '样本4：章节标题（chapter_title_phrase）',
    text: '第一集 开端\n第二集 冲突\n第三章 转折\n第十一场 高潮\n序章 引子\n尾声 结束',
  },
  {
    title: '样本5：镜头运动（camera_action_phrase）',
    text: '镜头缓推靠近主体，随后急拉拉开视野，再以小幅摇摄跟随动作，最后快速变焦聚焦眼神，焦点转换完成转场。',
  },
  {
    title: '样本6：情绪表演（emotion_phrase）',
    text: '角色悲喜交加，眉头紧锁，目光闪烁不定，瞬间欣喜若狂，又转为惊恐失色，最终心急如焚，提心吊胆地等待结果。',
  },
  {
    title: '样本7：场景描写（scene_description_phrase）',
    text: '夜幕降临，华灯初上，街道车水马龙，万家灯火通明，霓虹闪烁不定；远处山清水秀，近处鸟语花香，繁花似锦。',
  },
  {
    title: '样本8：人物动作（character_action_phrase）',
    text: '主角低头沉思片刻，抬头仰望天空，伸手触摸石壁，转身离去时迈步向前，大步流星穿过走廊，最终倚墙而立。',
  },
  {
    title: '样本9：环境氛围（atmosphere_phrase）',
    text: '清晨阳光明媚，午后日光倾洒，傍晚光影斑驳，夜间月色朦胧；雾气弥漫四周，烟雨朦胧远景，烛光摇曳室内。',
  },
  {
    title: '样本10：时间节令（time_season_phrase）',
    text: '清晨时分出发，正午时分抵达，黄昏时分告别，午夜时分归来；初春时节相遇，盛夏时节热恋，深秋时节分离。',
  },
  {
    title: '样本11：服饰妆容（costume_makeup_phrase）',
    text: '女子衣袂飘飘，珠光宝气，雍容华贵，面若桃花，肤若凝脂，明眸皓齿；男子风流倜傥，玉树临风，西装革履。',
  },
  {
    title: '样本12：混合多语义综合样本',
    text: '第一场 开场\n机位：俯拍\n色温：5600K\n镜头缓推靠近，角色眉头紧锁，悲喜交加；\n画面必须保持干净，避免出现畸变；\n清晨时分，华灯初上，雾气弥漫，光影斑驳；\n女子衣袂飘飘，男子风流倜傥，相视而笑。',
  },
  {
    title: '样本13：英文质量修饰词（english_quality_phrase）',
    text: 'masterpiece, best quality, ultra detailed, highly detailed, intricate details, hyperdetailed, hyper-realistic, ultra-realistic, photorealistic, sharp focus, 8k resolution, trending on artstation, ray tracing, global illumination, subsurface scattering, pbr materials, physically based rendering, ambient occlusion, bloom, glow, hdr10, dolby vision, wide color gamut.',
  },
  {
    title: '样本14：英文镜头景别与构图（english_shot_phrase）',
    text: 'extreme wide shot, wide shot, medium shot, close-up, extreme close-up, establishing shot, cowboy shot, over the shoulder, point of view, pov, aerial view, bird\'s eye view, worm\'s eye view, high angle, low angle, dutch angle, eye level, rule of thirds, golden ratio, golden spiral, leading lines, symmetrical composition, one-point perspective, two-point perspective, atmospheric perspective, panoramic view, fisheye view, top-down view, foreground, middleground, background, depth of field, shallow depth of field, bokeh, manual focus, auto focus, face detection, eye detection.',
  },
  {
    title: '样本15：英文光影与特效（english_light_phrase + english_lens_effect_phrase）',
    text: 'rim light, key light, fill light, back light, backlit, golden hour, blue hour, cinematic lighting, studio lighting, natural lighting, soft lighting, rembrandt lighting, three-point lighting, beauty dish, softbox, catchlight; lens flare, anamorphic flare, blue streak, sun flare, light leak, film burn, bloom, glare, halation, iridescence, chromatic aberration, purple fringing, vignette, grain, motion blur, radial blur, zoom blur, gaussian blur, creamy bokeh, swirly bokeh, circular bokeh, specular highlights, double exposure, long exposure, time lapse.',
  },
  {
    title: '样本16：英文艺术风格与艺术家（english_style_phrase + english_artist_phrase）',
    text: 'anime style, studio ghibli, pixar style, disney style, dreamworks style, cel shading, watercolor, oil painting, ink painting, sumi-e, ukiyo-e, matte painting, digital painting, illustration, concept art, baroque, impressionism, surrealism, minimalism, art nouveau, art deco, bauhaus, pop art, vaporwave, synthwave, cyberpunk, steampunk, post apocalyptic, 3d render, isometric, low poly, voxel, fashion editorial, beauty photography, editorial portrait, vintage look, retro look, analog film, lomography. by greg rutkowski, by alphonse mucha, by artgerm, by wlop, by makoto shinkai, by studio ghibli, van gogh, picasso, monet, rembrandt, h.r. giger, frank frazetta, moebius, norman rockwell, gustav klimt.',
  },
  {
    title: '样本17：英文渲染引擎与软件（english_render_phrase）',
    text: 'octane render, redshift render, arnold render, v-ray render, corona render, cycles render, eevee render, unreal engine 5, unity 2022, godot engine, blender, maya, 3ds max, cinema 4d, houdini, zbrush, substance painter, marvelous designer, davinci resolve, after effects, premiere pro, redcode, prores 4444, prores 422 hq, h.264, h.265, av1, raytracing, pathtracing, real-time rendering, denoising, dlss, fsr, webgl, vulkan, directx, cuda, optix, rtx.',
  },
  {
    title: '样本18：英文调色与色彩科学（english_color_grading_phrase）',
    text: 'cinematic color grading, amber-teal split, orange and teal, blockbuster look, hollywood look, netflix look, music video look, commercial look, black and white, sepia, vintage color, desaturated, hyper saturated, pastel, monochrome, duotone, split toning, color balance, color harmony, complementary colors, analogous colors, warm colors, cool colors, earth tones, jewel tones, vibrant colors, muted colors, srgb, adobe rgb, dci-p3, rec.709, rec.2020, wide gamut, hdr, sdr, hdr10, dolby vision, s-log3, c-log3, v-log.',
  },
  {
    title: '样本19：英文情绪氛围（english_mood_phrase）',
    text: 'ethereal, dreamy, surreal, mysterious, enigmatic, mystical, magical, fantasy, fairytale, epic, heroic, majestic, grand, magnificent, glorious, divine, celestial, heavenly, cosmic, spiritual, sublime, breathtaking, stunning, gorgeous, beautiful, charming, enchanting, captivating, mesmerizing, meditative, contemplative, melancholic, nostalgic, romantic, passionate, euphoric, joyful, peaceful, calm, serene, tranquil, tender, cozy, gloomy, somber, ominous, eerie, haunting, noir mood, neon-drenched atmosphere, desolate atmosphere, tense atmosphere, atmospheric light.',
  },
  {
    title: '样本20：英文Midjourney参数（english_mj_param_phrase）',
    text: '--ar 16:9 --ar 9:16 --ar 3:4 --chaos 50 --stylize 500 --style raw --v 6.1 --niji 6 --quality 2 --repeat 4 --seed 12345 --tile --weird 1000 --iw 1.5 --sref --oref --cref --no --fast --turbo --relax --draft --raw --public --stealth --video.',
  },
  {
    title: '样本21：英文负面提示词（english_negative_phrase）',
    text: 'worst quality, low quality, lowres, jpeg artifacts, blurry, text, error, cropped, deformed, distorted, disfigured, poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, mutated hands, mutated fingers, disconnected limbs, mutation, mutated, ugly, disgusting, amputation, bad face, bad hands, missing fingers, extra fingers, fused fingers, too many fingers, malformed limbs, extra arms, extra legs, long neck, cloned face, fused face, cartoon, anime, 3d, render, drawing, sketch, illustration, painting, monochrome, grayscale, flat color, nsfw, signature, watermark, logo.',
  },
  {
    title: '样本22：英文摄影器材与胶片（english_photo_gear_phrase）',
    text: 'canon, nikon, sony, fujifilm, leica, hasselblad, phase one, canon eos r5, sony a7iv, nikon z9, arri alexa mini, red weapon dragon, sony cinealta f65, zeiss master prime, panavision primo prime, sigma art, 35mm, 50mm, 85mm, anamorphic lens, f/1.2, f/1.4, f/2.8, softbox, octabox, beauty dish, reflector, diffuser, nd filter, kodak portra, fuji velvia, ilford hp5, cinestill 800t, kodak vision3, 35mm film, 120 film, polaroid, instant film, tilt-shift lens, fisheye lens, macro lens, prime lens, full frame, aps-c.',
  },
  {
    title: '样本23：混合中英文综合样本',
    text: 'masterpiece, best quality, 8k resolution, trending on artstation\n镜头缓推靠近主体，角色眉头紧锁，悲喜交加；\ncinematic lighting, golden hour, rim light, lens flare, bokeh\n画面必须保持干净，避免出现畸变；\nby greg rutkowski, by studio ghibli, anime style, concept art\n色温：3200K  光圈：f/1.4  焦距：35mm\noctane render, unreal engine 5, ray tracing, pbr materials\nethereal, dreamy, surreal, mysterious, atmospheric light\n--ar 16:9 --v 6.1 --style raw --stylize 500',
  },
  {
    title: '样本24：英文武器与装备（english_weapon_gear_phrase）',
    text: 'longsword, katana, greatsword, rapier, scimitar, claymore, zweihander, battle axe, halberd, glaive, spear, lance, trident, war hammer, morning star, flail, mace, dagger, shuriken, kunai, longbow, crossbow, sniper rifle, assault rifle, plasma rifle, lightsaber, power sword, chain sword, thunder hammer, power fist, energy shield, force field, bulletproof vest, tactical helmet, gas mask, bandolier, scabbard, sheath, holster, quiver, grappling hook.',
  },
  {
    title: '样本25：英文建筑与场景（english_architecture_scene_phrase）',
    text: 'gothic architecture, romanesque architecture, byzantine architecture, baroque architecture, rococo architecture, neoclassical architecture, brutalist architecture, cathedral interior, basilica, nave, transept, apse, flying buttress, ribbed vault, barrel vault, dome, cupola, rose window, gargoyle, crenellation, battlement, keep tower, moat, drawbridge, portcullis, barbican, great hall, throne room, courtyard, cloister, colonnade, atrium, rotunda, portico, pediment, frieze, cornice, doric order, ionic order, corinthian order, vaulted ceiling, coffered ceiling, mansard roof, gable roof.',
  },
  {
    title: '样本26：英文奇幻/神话（english_fantasy_myth_phrase）',
    text: 'enchanted forest, mystical glade, ancient ruins, forgotten temple, sacred grove, celestial realm, elven kingdom, dwarven stronghold, dragon lair, wizard tower, magic circle, summoning circle, ancient runes, arcane glyph, enchanted artifact, spellbook, grimoire, magic staff, crystal ball, potion bottle, magical aura, floating island, crystal palace, obsidian fortress, world tree, yggdrasil, sacred flame, ghostly apparition, wraith, banshee, fairy light, pixie dust, divine light, angelic halo, dragon wing, unicorn horn, phoenix feather, dragon scale, sphinx, centaur, minotaur, siren.',
  },
  {
    title: '样本27：英文科幻/赛博朋克（english_scifi_cyberpunk_phrase）',
    text: 'neon lights, holographic display, hologram projection, augmented reality, cybernetic implant, bionic eye, neural interface, data jack, synthetic skin, bionic arm, circuit pattern, data stream, digital rain, megacity, skyscraper forest, neon sign, flying car, maglev train, space elevator, orbital station, rain slicked street, dystopian slum, corporate tower, neon district, underground bunker, data center, control room, cryo chamber, mech suit, giant robot, android, cyborg, artificial intelligence, neural network, quantum computer, heads up display, spacesuit, eva suit.',
  },
  {
    title: '样本28：英文材质纹理（english_material_extended_phrase）',
    text: 'brushed metal, polished chrome, oxidized copper, weathered steel, patina, liquid metal, carbon fiber, oak grain, mahogany, polished marble, granite surface, sandstone, concrete texture, terrazzo, brick wall, cobblestone, jade stone, quartz crystal, velvet fabric, silk fabric, satin finish, brocade, lace fabric, chiffon, linen texture, denim, leather grain, suede, distressed leather, snake scale, mother of pearl, frosted glass, smoked glass, stained glass.',
  },
  {
    title: '样本29：英文服装与时尚（english_costume_fashion_phrase）',
    text: 'haute couture, runway fashion, avant-garde fashion, streetwear, techwear, victorian lace gown, corset bodice, ball gown, evening gown, kimono, yukata, hanfu, cheongsam, qipao, silk robe, military uniform, tactical vest, trench coat, bomber jacket, leather jacket, cape, cloak, hooded robe, wizard robe, plate armor, chainmail, brigandine, gauntlets, breastplate, cuirass, great helm.',
  },
  {
    title: '样本30：英文渲染技术扩展（english_render_extended_phrase）',
    text: 'path tracing, real-time ray tracing, caustics, photon mapping, bidirectional path tracing, diffuse interreflection, color bleeding, final gather, irradiance caching, radiosity, monte carlo integration, importance sampling, progressive rendering, gpu acceleration, pbr workflow, metallic workflow, albedo map, normal map, roughness map, metallic map, height map, displacement map, bump map, fresnel effect, anisotropic reflection, brdf, bsdf, bssrdf, shader, procedural texture, voronoi, perlin noise, clay render, toon shader, flat shading, phong shading.',
  },
  {
    title: '样本31：英文人物姿态与表情（english_pose_expression_phrase）',
    text: 'contrapposto, dynamic pose, heroic pose, power pose, action pose, fighting stance, casual pose, seated pose, kneeling position, leaping pose, running pose, sword drawing, aiming pose, thinking pose, profile view, three-quarter view, frontal view, bashful expression, shy expression, intense gaze, frowning, blushing, laughing, light smile, kubrick stare, expressive face, heterochromia, freckles, sharp jawline, high cheekbones, piercing eyes, seductive gaze, melancholic expression, joyful expression, surprised look, stoic expression, mischievous grin, smirk, clenched jaw, raised eyebrow.',
  },
  {
    title: '样本32：英文后期特效（english_vfx_extended_phrase）',
    text: 'color correction, teal and orange, bleach bypass, cross processing, sepia tone, vintage film look, film grain, digital noise, bloom effect, glow effect, god rays, volumetric light, volumetric fog, volumetric cloud, atmospheric haze, fog effect, mist effect, smoke simulation, dust particles, light particles, particle system, rain effect, splash effect, water ripples, water caustics, tilt-shift blur, depth of field blur, optical flow, distortion effect, warp effect, glitch effect, pixel sort, rgb split, scan lines, crt effect, vhs effect, infrared photography, thermal imaging, night vision, crushed blacks, lifted shadows, hdr toning, dodge and burn, filmic tonemapping, aces color space, lut, log footage.',
  },
  {
    title: '样本33：英文生物与角色种族（english_creature_race_phrase）',
    text: 'anthropomorphic, humanoid race, high elf, wood elf, dark elf, drow, dwarf race, halfling, gnome, orc, goblin, ogre, troll, frost giant, dragonborn, tiefling, aasimar, lizardfolk, kobold, merfolk, naga, medusa, basilisk, chimera, manticore, griffin, hippogriff, pegasus, unicorn, phoenix, wyvern, hydra, western dragon, eastern dragon, lich, vampire, werewolf, zombie, ghoul, wight, specter, ghost, demon, devil, gargoyle, angel, archangel, valkyrie, deity, titan.',
  },
];

// ============================================================
// 实测函数
// ============================================================

/**
 * 在样本上运行分词器，输出可视化结果
 * @param {string} text 样本文本
 * @returns {{visual: string, hits: number, misses: number, missChars: string[]}}
 */
function runSample(text) {
  const matches = segmentByWordLexicon(text, 0, text.length, groups, segmenterConfig);

  // 构建命中位置映射
  const hitMap = new Map(); // from -> {to, cssClass, word}
  for (const m of matches) {
    hitMap.set(m.from, m);
  }

  // 构建可视化字符串
  let visual = '';
  let i = 0;
  let hits = 0;
  const missChars = new Set();
  while (i < text.length) {
    const m = hitMap.get(i);
    if (m) {
      const word = text.substring(m.from, m.to);
      const color = CSS_TO_COLOR[m.cssClass] || C.bold;
      visual += `${color}[${word}@${m.cssClass}]${C.reset}`;
      i = m.to;
      hits++;
    } else {
      const ch = text[i];
      visual += ch;
      // 仅统计未命中的汉字
      if (/[\u4e00-\u9fff]/.test(ch)) {
        missChars.add(ch);
      }
      i++;
    }
  }

  // 统计样本中的汉字总数
  let cjkCount = 0;
  for (const ch of text) {
    if (/[\u4e00-\u9fff]/.test(ch)) cjkCount++;
  }
  // 命中汉字数
  let hitCjkCount = 0;
  for (const m of matches) {
    for (let j = m.from; j < m.to; j++) {
      if (/[\u4e00-\u9fff]/.test(text[j])) hitCjkCount++;
    }
  }
  const missCjkCount = cjkCount - hitCjkCount;
  const hitRate = cjkCount > 0 ? ((hitCjkCount / cjkCount) * 100).toFixed(1) : '0.0';

  // 统计英文术语命中数（v2.6.4 新增）
  let englishHits = 0;
  for (const m of matches) {
    const word = text.substring(m.from, m.to);
    if (/[a-zA-Z]/.test(word)) englishHits++;
  }

  return {
    visual,
    hits,
    cjkCount,
    hitCjkCount,
    missCjkCount,
    hitRate,
    englishHits,
    missChars: Array.from(missChars),
  };
}

// ============================================================
// 运行所有样本并输出结果
// ============================================================

let totalHits = 0;
let totalCjk = 0;
let totalHitCjk = 0;
let totalEnglishHits = 0;

for (const sample of samples) {
  const result = runSample(sample.text);
  totalHits += result.hits;
  totalCjk += result.cjkCount;
  totalHitCjk += result.hitCjkCount;
  totalEnglishHits += result.englishHits;

  console.log(`${C.bold}--- ${sample.title} ---${C.reset}`);
  console.log(`${C.gray}原文：${C.reset}${sample.text.replace(/\n/g, ' / ')}`);
  console.log(`${C.gray}着色：${C.reset}${result.visual}`);
  console.log(
    `${C.gray}统计：${C.reset}命中词组 ${result.hits} 个 | 汉字 ${result.hitCjkCount}/${result.cjkCount}（命中率 ${result.hitRate}%） | 英文术语 ${result.englishHits} 个`
  );
  if (result.missChars.length > 0) {
    console.log(`${C.gray}漏匹配汉字：${C.reset}${result.missChars.join(' ')}`);
  }
  console.log('');
}

// ============================================================
// 汇总报告
// ============================================================

const overallRate = totalCjk > 0 ? ((totalHitCjk / totalCjk) * 100).toFixed(1) : '0.0';
console.log(`${C.bold}=== 汇总报告 ===${C.reset}`);
console.log(`样本数: ${samples.length}`);
console.log(`总命中词组: ${totalHits} 个`);
console.log(`总汉字命中: ${totalHitCjk}/${totalCjk}（命中率 ${overallRate}%）`);
console.log(`总英文术语命中: ${totalEnglishHits} 个`);
console.log('');
console.log(`${C.gray}说明：${C.reset}`);
console.log(`  - 命中率反映词组词典对样本中汉字的覆盖比例`);
console.log(`  - 英文术语命中数反映对英文提示词的识别能力（v2.6.4 新增）`);
console.log(`  - 漏匹配汉字会交由 06 字级组合规则兜底着色`);
console.log(`  - 命中率 > 30% 即为词组层达标（主匹配仍由 patterns/lexicons 完成）`);
