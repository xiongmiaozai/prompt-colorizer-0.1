// analyze-english-terms.mjs — 英文提示词术语提取与分类
// 运行命令：node scripts/analyze-english-terms.mjs
// 输入：scripts/datasets/english-prompts-corpus.md
// 输出：scripts/datasets/english-terms.json

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CORPUS_PATH = join(__dirname, 'datasets', 'english-prompts-corpus.md');
const OUTPUT_PATH = join(__dirname, 'datasets', 'english-terms.json');

// ============================================================
// 英文术语分类规则
// ============================================================

/**
 * 将英文术语分类到语义分组
 * @param {string} term 英文术语（小写）
 * @returns {string|null} 分组名
 */
function classifyEnglishTerm(term) {
  // 负面提示词
  if (NEGATIVE_TERMS.has(term)) return 'english_negative_phrase';

  // 质量修饰词
  if (QUALITY_TERMS.has(term)) return 'english_quality_phrase';

  // Midjourney 参数（--ar, --v 等）
  if (/^--?(ar|c|chaos|q|quality|r|repeat|seed|s|stylize|w|weird|tile|niji|v|fast|turbo|relax|raw|draft|no|iw|sref|oref|p|profile|stealth|public)$/.test(term)) {
    return 'english_mj_param_phrase';
  }

  // LoRA / 模型加载
  if (/^<lora:/.test(term) || /^<lyco:/.test(term) || /^<embedding:/.test(term) || /^<hypernet:/.test(term)) {
    return 'english_lora_phrase';
  }

  // 镜头景别
  if (SHOT_TERMS.has(term)) return 'english_shot_phrase';

  // 摄影器材
  if (PHOTO_TERMS.has(term)) return 'english_photo_phrase';

  // 光影术语
  if (LIGHT_TERMS.has(term)) return 'english_light_phrase';

  // 艺术风格
  if (STYLE_TERMS.has(term)) return 'english_style_phrase';

  // 艺术家参考
  if (ARTIST_TERMS.has(term)) return 'english_artist_phrase';

  // 渲染引擎
  if (RENDER_TERMS.has(term)) return 'english_render_phrase';

  // 材质
  if (MATERIAL_TERMS.has(term)) return 'english_material_phrase';

  // 提示词工程
  if (PROMPT_ENG_TERMS.has(term)) return 'english_prompt_eng_phrase';

  return null;
}

// ============================================================
// 术语词典（基于语料整理）
// ============================================================

const NEGATIVE_TERMS = new Set([
  'worst', 'low', 'normal', 'quality', 'lowres', 'jpeg', 'artifacts', 'signature',
  'watermark', 'username', 'blurry', 'text', 'error', 'cropped', 'deformed',
  'distorted', 'disfigured', 'poorly', 'drawn', 'bad', 'anatomy', 'wrong',
  'extra', 'limb', 'missing', 'floating', 'limbs', 'mutated', 'hands', 'fingers',
  'disconnected', 'mutation', 'ugly', 'disgusting', 'amputation', 'face',
  'missing', 'fused', 'too', 'many', 'malformed', 'arms', 'legs', 'long', 'neck',
  'cloned', 'cartoon', 'anime', '3d', 'render', 'drawing', 'sketch', 'illustration',
  'painting', 'monochrome', 'grayscale', 'flat', 'color', 'photorealistic',
  'photograph', 'realistic', 'photo', 'dslr', 'bokeh', 'film', 'grain', 'studio',
  'lighting', 'letters', 'words', 'logo', 'chart', 'graph', 'diagram', 'map',
  'nsfw', 'easynegative', 'ng_deepnegative', 'bad_prompt', 'bad-hands', 'bad-artist',
  'bad-image', 'bad_quality', 'verybadimagenegative', 'vile_prompt',
]);

const QUALITY_TERMS = new Set([
  'masterpiece', 'best', 'ultra', 'detailed', 'intricate', 'details', 'highly',
  'hyperdetailed', 'hyper-realistic', 'ultra-realistic', 'photorealistic', 'sharp',
  'focus', 'professional', '8k', '4k', '16k', 'absurdres', 'highres', 'absurd',
  'resolution', 'ray', 'tracing', 'global', 'illumination', 'subsurface',
  'scattering', 'pbr', 'materials', 'physically', 'based', 'rendering', 'octane',
  'unreal', 'engine', 'unity', 'blender', 'cinema', '4d', 'houdini', 'zbrush',
  'substance', 'painter', 'ambient', 'occlusion', 'bloom', 'tone', 'mapping',
  'hdr', 'hdri', 'high', 'dynamic', 'range', 'srgb', 'linear', 'workflow',
  'normal', 'map', 'displacement', 'bump', 'roughness', 'metallic', 'albedo',
  'diffuse', 'specular', 'reflection', 'refraction', 'transmission', 'absorption',
  'scattering', 'fresnel', 'caustics', 'depth', 'field', 'bokeh', 'motion',
  'blur', 'lens', 'flare', 'chromatic', 'aberration', 'grain', 'noise',
  'dithering', 'anti-aliasing', 'msaa', 'fxaa', 'taa', 'dlss', 'fsr',
  'trending', 'artstation', 'concept', 'art',
]);

const SHOT_TERMS = new Set([
  'extreme', 'wide', 'long', 'full', 'medium', 'close-up', 'establishing',
  'cowboy', 'american', 'italian', 'over', 'shoulder', 'point', 'view', 'pov',
  'first', 'person', 'aerial', "bird's", 'eye', "worm's", 'high', 'low', 'angle',
  'dutch', 'canted', 'eye', 'level', 'top-down', 'bottom-up', 'side', 'front',
  'back', 'three-quarter', 'profile', 'macro', 'micro', 'zoom', 'in', 'out',
  'dolly', 'tracking', 'panning', 'tilting', 'rolling', 'crane', 'jib',
  'steadicam', 'handheld', 'shoulder', 'rig', 'tripod', 'monopod', 'gimbal',
  'drone', 'helicopter', 'satellite', 'underwater', 'split', 'diopter', 'rack',
  'pull', 'shallow', 'deep', 'circle', 'confusion', 'hyperfocal', 'distance',
  'focal', 'length', 'aperture', 'f-stop', 'shutter', 'speed', 'iso', 'exposure',
  'triangle', 'white', 'balance', 'color', 'temperature', 'kelvin', 'tint',
  'hue', 'saturation', 'luminance', 'brightness', 'contrast', 'gamma', 'gain',
  'offset', 'highlights', 'midtones', 'shadows', 'blacks', 'whites', 'curves',
  'levels', 'histogram',
]);

const PHOTO_TERMS = new Set([
  'canon', 'eos', 'r5', 'nikon', 'sony', 'alexa', 'mini', 'zeiss', 'master',
  'prime', 'lenses', '35mm', '50mm', '85mm', '135mm', 'panavision', 'g', 'series',
  'anamorphic', 'red', 'weapon', 'dragon', 'redcode', 'raw', '6k', 'cinealta',
  'f65', 'primo', '16-bit', 'arri', 'arriraw', 'sensor', 'wide', 'angle',
  'telephoto', 'fisheye', 'tilt-shift', 'beauty', 'dish', 'softbox', 'softboxes',
  'octabox', 'snoot', 'grid', 'reflector', 'diffuser', 'filter', 'nd', 'cpl',
  'uv', 'polarizer', 'hotshoe', 'flash', 'strobe', 'trigger', 'transmitter',
  'receiver', 'light', 'stand', 'boom', 'arm', 'sandbag', 'cstand', 'c-stand',
]);

const LIGHT_TERMS = new Set([
  'rim', 'key', 'fill', 'back', 'backlight', 'backlit', 'side', 'top', 'bottom',
  'front', 'overhead', 'practical', 'ambient', 'natural', 'artificial', 'mixed',
  'available', 'golden', 'hour', 'blue', 'magic', 'sunset', 'sunrise', 'dawn',
  'dusk', 'twilight', 'night', 'day', 'noon', 'morning', 'evening', 'afternoon',
  'cinematic', 'dramatic', 'soft', 'hard', 'diffused', 'specular', 'directional',
  'omnidirectional', 'point', 'spot', 'flood', 'wash', 'gradient', 'ramp',
  'volumetric', 'god', 'rays', 'tyndall', 'crepuscular', 'atmospheric',
  'perspective', 'haze', 'fog', 'mist', 'smoke', 'dust', 'particles',
  'caustics', 'subsurface', 'scattering', 'sss', 'fresnel', 'reflectance',
  'refraction', 'dispersion', 'absorption', 'emission', 'incandescence',
  'fluorescence', 'phosphorescence', 'bioluminescence', 'iridescence',
  'opalescence', 'dichroism', 'birefringence', 'polarization',
])

const STYLE_TERMS = new Set([
  'anime', 'ghibli', 'pixar', 'disney', 'cel', 'shading', 'watercolor',
  'oil', 'painting', 'ink', 'sumi-e', 'ukiyo-e', 'baroque', 'impressionism',
  'surrealism', 'minimalism', 'retro', 'pixel', 'ascii', 'fantasy', 'art',
  'sci-fi', 'dark', 'gothic', 'steampunk', 'cyberpunk', 'dieselpunk',
  'biopunk', 'vaporwave', 'synthwave', 'lofi', 'nouveau', 'deco', 'bauhaus',
  'pop', 'comic', 'book', 'manga', 'manhwa', 'webtoon', '3d', 'isometric',
  'low', 'poly', 'voxel', 'matte', 'illustration', 'digital', 'concept',
  'character', 'design', 'realistic', 'photorealistic', 'surreal', 'abstract',
  'expressionism', 'cubism', 'futurism', 'constructivism', 'suprematism',
  'deconstructivism', 'brutalism', 'art', 'fine',
])

const ARTIST_TERMS = new Set([
  'greg', 'rutkowski', 'alphonse', 'mucha', 'artgerm', 'stanley', 'lau',
  'wlop', 'rossdraws', 'ross', 'tran', 'makoto', 'shinkai', 'studio',
  'james', 'jean', 'andrei', 'riabovitchev', 'marc', 'simonetti', 'sakimi',
  'chan', 'donato', 'giancola', 'manchess', 'craig', 'mullins', 'kilian',
  'eng', 'jake', 'parker', 'syd', 'mead', 'luis', 'royo', 'masamune',
  'shirow', 'kuvshinov', 'alena', 'kopera', 'peter', 'mohrbacher', 'joseph',
  'christian', 'leyendecker', 'drew', 'struzan', 'ilya', 'ruan', 'jia',
  'huang', 'guangjian', 'gil', 'elvgren', 'sachin', 'teng', 'thomas',
  'kinkade', 'van', 'gogh', 'picasso', 'monet', 'rembrandt', 'davinci',
  'da', 'vinci', 'michelangelo', 'raphael', 'vermeer', 'caravaggio',
])

const RENDER_TERMS = new Set([
  'octane', 'redshift', 'arnold', 'vray', 'v-ray', 'cycles', 'eevee',
  'mantra', 'renderman', 'keyshot', 'marmoset', 'toolbag', 'substance',
  'painter', 'designer', 'alchemist', 'mari', 'mudbox', 'zbrush', 'blender',
  'maya', 'max', '3ds', 'cinema', '4d', 'c4d', 'houdini', 'katana', 'nuke',
  'houdini', 'sidefx', 'unreal', 'engine', 'unity', 'godot', 'cryengine',
  'source', 'filament', 'babylon', 'three', 'threejs', 'webgl', 'opengl',
  'vulkan', 'directx', 'dx11', 'dx12', 'metal', 'metal-cpp', 'metalkit',
  'cuda', 'optix', 'rtx', 'dxr', 'rt', 'rtrt', 'real-time', 'raytracing',
  'pathtracing', 'photon', 'caustics', 'bidirectional', 'metropolis',
  'mlt', 'bdpt', 'upsampling', 'denoising', 'dlss', 'fsr', 'xess',
])

const MATERIAL_TERMS = new Set([
  'velvet', 'metallic', 'translucent', 'glowing', 'iridescent', 'holographic',
  'glossy', 'matte', 'rough', 'smooth', 'bumpy', 'porous', 'crystalline',
  'glassy', 'wooden', 'leathery', 'fabric', 'silk', 'cotton', 'linen', 'wool',
  'denim', 'leather', 'fur', 'feather', 'scale', 'skin', 'bark', 'stone',
  'marble', 'granite', 'sandstone', 'concrete', 'brick', 'metal', 'steel',
  'iron', 'copper', 'brass', 'bronze', 'gold', 'silver', 'platinum',
  'titanium', 'aluminum', 'chrome', 'nickel', 'zinc', 'lead', 'mercury',
  'plastic', 'rubber', 'silicone', 'ceramic', 'porcelain', 'clay', 'terracotta',
  'paper', 'cardboard', 'parchment', 'vellum', 'wax', 'soap', 'bubble', 'foam',
  'sponge', 'satin', 'lace', 'chiffon', 'taffeta', 'organza', 'tulle',
  'cashmere', 'mohair', 'angora', 'tweed', 'flannel', 'corduroy', 'canvas',
  'fleece', 'felt', 'suede', 'pleather', 'pvc', 'latex', 'neoprene', 'spandex',
  'lycra', 'nylon', 'polyester', 'acrylic', 'rayon', 'viscose', 'hemp', 'jute',
  'sisal', 'rattan', 'wicker', 'bamboo', 'oak', 'pine', 'cedar', 'mahogany',
  'walnut', 'cherry', 'maple', 'birch', 'beech', 'ash', 'elm', 'teak',
  'rosewood', 'sandalwood', 'ebony', 'ivory', 'bone', 'horn', 'antler',
  'shell', 'coral', 'pearl', 'jade', 'turquoise', 'lapis', 'amethyst', 'quartz',
  'crystal', 'diamond', 'ruby', 'sapphire', 'emerald', 'topaz', 'opal',
])

const PROMPT_ENG_TERMS = new Set([
  'prompt', 'weighting', 'keyword', 'break', 'and', 'at', 'step', 'alternating',
  'sampling', 'dynamic', 'wildcard', 'variable', 'embedding', 'textual',
  'inversion', 'hypernetwork', 'lora', 'lyco', 'checkpoint', 'vae', 'controlnet',
  'openpose', 'canny', 'edge', 'depth', 'map', 'lineart', 'softedge', 'scribble',
  'mlsd', 'normal', 'segmentation', 'tile', 'ip-adapter', 'reference', 'only',
  'adain', 't2i', 'adapter', 'instruction', 'pix2pix', 'instruct', 'dreambooth',
  'locon', 'lokr', 'loha', 'dylora', 'ia3', 'steps', 'sampler', 'cfg', 'scale',
  'denoising', 'strength', 'clip', 'skip', 'ensd', 'eta', 's_churn', 's_tmin',
  's_tmax', 's_noise', 'override', 'settings', 'refiner', 'switch', 'highres',
  'fix', 'upscale', 'by', 'latent', 'tiling', 'diffusion', 'multidiffusion',
  'regional', 'prompter', 'couple', 'thresholds', 'thresholding', 'enabled',
  'mimicscale', 'top_k', 'bottom_k', 'interpolation', 'slerp', 'spherical',
  'lerp', 'linear', 'editing', 'schedule', 'perp', 'perpendicular', 'orthogonal',
  'orthogonalization', 'multi', 'token', 'merging', 'ratio', 'pruned', 'fp16',
  'fp32', 'bf16', 'fp8', 'safetensors', 'ckpt', 'pt', 'pth', 'bin', 'onnx',
  'openvino', 'tensorrt', 'coreml', 'cuda', 'rocm', 'directml', 'mps',
])

// ============================================================
// 英文术语提取
// ============================================================

/**
 * 从文本中提取英文术语
 * 策略：
 *   1. 按非字母字符分割
 *   2. 过滤单字符（除 a, i 外）
 *   3. 过滤停用词
 *   4. 提取多词组合（如 "cinematic lighting", "depth of field"）
 * @param {string} text 文本
 * @returns {Map<string, number>} 术语频率表
 */
function extractEnglishTerms(text) {
  const counts = new Map();
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'of', 'in', 'on', 'at', 'to', 'for',
    'with', 'by', 'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'can', 'shall', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me',
    'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their',
    'mine', 'yours', 'hers', 'ours', 'theirs', 'what', 'which', 'who', 'whom',
    'whose', 'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both',
    'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
    'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'just', 'don',
    'now', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
    'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then',
    'once', 'here', 'there', 'about', 'against', 'between', 'among', 'if',
    'because', 'while', 'until', 'though', 'although', 'since', 'unless',
    'whether', 'else', 'also', 'besides', 'however', 'moreover', 'nevertheless',
    'nonetheless', 'therefore', 'thus', 'hence', 'accordingly', 'consequently',
    'meanwhile', 'likewise', 'similarly', 'rather', 'indeed', 'instead',
  ]);

  // 单词分割
  const words = text.toLowerCase().match(/[a-z][a-z'-]*/g) || [];

  // 单词频率统计
  for (const word of words) {
    if (word.length < 2) continue;
    if (stopWords.has(word)) continue;
    counts.set(word, (counts.get(word) || 0) + 1);
  }

  // 多词组合提取（2-3 词）
  // 匹配如 "cinematic lighting", "depth of field", "shallow depth of field"
  const phrases = text.toLowerCase().match(/[a-z][a-z'-]*(?:\s+(?:of|the|and|on|in)\s+[a-z][a-z'-]*)+/g) || [];
  for (const phrase of phrases) {
    if (phrase.length < 5 || phrase.length > 40) continue;
    counts.set(phrase, (counts.get(phrase) || 0) + 1);
  }

  return counts;
}

// ============================================================
// 主流程
// ============================================================

function main() {
  console.log('='.repeat(60));
  console.log('英文提示词术语提取与分类');
  console.log('='.repeat(60));

  // 读取语料
  const corpus = readFileSync(CORPUS_PATH, 'utf8');
  console.log(`语料大小: ${(corpus.length / 1024).toFixed(2)} KB`);

  // 提取术语
  const termCounts = extractEnglishTerms(corpus);
  console.log(`提取术语总数: ${termCounts.size}`);

  // 分类
  const classified = {};
  const unclassified = [];
  for (const [term, freq] of termCounts.entries()) {
    if (freq < 1) continue;
    const group = classifyEnglishTerm(term);
    if (group) {
      if (!classified[group]) classified[group] = [];
      classified[group].push({ term, freq, length: term.length });
    } else if (freq >= 2 && term.length >= 3) {
      unclassified.push({ term, freq, length: term.length });
    }
  }

  // 每组按频率降序排序
  for (const group of Object.keys(classified)) {
    classified[group].sort((a, b) => b.freq - a.freq || b.length - a.length);
  }
  unclassified.sort((a, b) => b.freq - a.freq || b.length - a.length);

  // 统计
  console.log('\n分类统计:');
  let totalClassified = 0;
  for (const [group, terms] of Object.entries(classified)) {
    console.log(`  ${group}: ${terms.length} 个术语`);
    totalClassified += terms.length;
  }
  console.log(`  未分类: ${unclassified.length} 个术语`);
  console.log(`  总计: ${totalClassified + unclassified.length} 个术语`);
  console.log(`  分类成功率: ${((totalClassified / (totalClassified + unclassified.length)) * 100).toFixed(1)}%`);

  // 输出前 10 个未分类术语（供人工审核参考）
  console.log('\n未分类高频术语（前 20 个）:');
  for (const { term, freq } of unclassified.slice(0, 20)) {
    console.log(`  ${term} (${freq})`);
  }

  // 输出 JSON
  const output = {
    generatedAt: new Date().toISOString(),
    corpusSize: corpus.length,
    totalTerms: totalClassified + unclassified.length,
    classifiedCount: totalClassified,
    unclassifiedCount: unclassified.length,
    classificationRate: parseFloat(((totalClassified / (totalClassified + unclassified.length)) * 100).toFixed(1)),
    groups: classified,
    unclassified: unclassified.slice(0, 100), // 只保留前 100 个供审核
  };

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n候选术语已写入: ${OUTPUT_PATH}`);
}

main();
