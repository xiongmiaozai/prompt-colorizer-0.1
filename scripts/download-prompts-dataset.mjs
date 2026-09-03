// download-prompts-dataset.mjs — 从 GitHub 下载公开中文提示词数据集
// 运行命令：node scripts/download-prompts-dataset.mjs（从 prompt-colorizer 目录运行）
//
// 数据源：gpt-img-2/ai-image-prompt-cookbook（GitHub 开源，MIT License）
//   - ai-nvzhuang-tishici.md    AI 女装提示词（63KB）
//   - ai-tongzhuang-tishici.md  AI 童装提示词（34KB）
//   - ecommerce-main-image.md   电商主图（5KB）
//   - poster-design.md          海报设计（5KB）
//   - product-photo.md          产品摄影（5KB）
//   - xiaohongshu-cover.md      小红书封面（5KB）
//
// 通过 curl 下载 raw 文件，保存到 scripts/datasets/raw/ 目录

import { writeFileSync, mkdirSync, existsSync, statSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);
const DATA_DIR = join(ROOT_DIR, 'scripts', 'datasets', 'raw');

// 确保数据目录存在
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

// ============================================================
// 数据源配置（GitHub raw URL）
// ============================================================

const GITHUB_BASE = 'https://raw.githubusercontent.com/gpt-img-2/ai-image-prompt-cookbook/main/prompts/zh';

const FILES = [
  {
    name: 'ai-nvzhuang-tishici.md',
    description: 'AI 女装提示词（63KB）',
    url: `${GITHUB_BASE}/ai-nvzhuang-tishici.md`,
  },
  {
    name: 'ai-tongzhuang-tishici.md',
    description: 'AI 童装提示词（34KB）',
    url: `${GITHUB_BASE}/ai-tongzhuang-tishici.md`,
  },
  {
    name: 'ecommerce-main-image.md',
    description: '电商主图提示词（5KB）',
    url: `${GITHUB_BASE}/ecommerce-main-image.md`,
  },
  {
    name: 'poster-design.md',
    description: '海报设计提示词（5KB）',
    url: `${GITHUB_BASE}/poster-design.md`,
  },
  {
    name: 'product-photo.md',
    description: '产品摄影提示词（5KB）',
    url: `${GITHUB_BASE}/product-photo.md`,
  },
  {
    name: 'xiaohongshu-cover.md',
    description: '小红书封面提示词（5KB）',
    url: `${GITHUB_BASE}/xiaohongshu-cover.md`,
  },
];

// ============================================================
// 下载函数（使用 curl，因为 Node fetch 在中国大陆访问 GitHub 不稳定）
// ============================================================

/**
 * 使用 curl 下载文件
 * @param {string} url 下载 URL
 * @param {string} outputPath 保存路径
 * @returns {boolean} 是否成功
 */
function downloadWithCurl(url, outputPath) {
  try {
    execSync(`curl -sL --max-time 30 -o "${outputPath}" "${url}"`, {
      stdio: 'pipe',
    });
    return true;
  } catch (e) {
    console.log(`  curl 失败: ${e.message}`);
    return false;
  }
}

// ============================================================
// 主流程
// ============================================================

function main() {
  console.log('=== 公开提示词数据集下载（GitHub 源）===');
  console.log(`数据源: gpt-img-2/ai-image-prompt-cookbook`);
  console.log(`保存目录: ${DATA_DIR}`);
  console.log('');

  let successCount = 0;
  let totalSize = 0;

  for (const file of FILES) {
    console.log(`--- 下载: ${file.description} ---`);
    console.log(`  URL: ${file.url}`);

    const outputPath = join(DATA_DIR, file.name);
    const ok = downloadWithCurl(file.url, outputPath);

    if (ok && existsSync(outputPath)) {
      const stats = statSync(outputPath);
      console.log(`  已保存: ${outputPath}（${(stats.size / 1024).toFixed(1)}KB）`);
      successCount++;
      totalSize += stats.size;

      // 显示前 200 字符预览
      const content = readFileSync(outputPath, 'utf8');
      const preview = content.slice(0, 200).replace(/\n/g, ' ');
      console.log(`  预览: ${preview}...`);
    } else {
      console.log(`  下载失败`);
    }
    console.log('');
  }

  console.log('=== 下载完成 ===');
  console.log(`成功: ${successCount}/${FILES.length} 个文件，总大小: ${(totalSize / 1024).toFixed(1)}KB`);
  console.log('下一步：运行 node scripts/analyze-prompts-dataset.mjs 分析词频并提取候选词');
}

main();
