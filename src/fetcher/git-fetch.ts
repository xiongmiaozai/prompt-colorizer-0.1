/**
 * Git 远程规则拉取模块
 * 负责从 Git 仓库拉取远程规则版本信息和规则文件
 */

import { requestUrl } from 'obsidian';
import type { RemoteVersionInfo, LocalVersionInfo, PullFileResult, RuleCategoryStat } from '../rule-engine/types';

/** 规则文件名列表 */
const RULE_FILES: readonly string[] = [
  '01-base-patterns.yaml',
  '02-semantic-context.yaml',
  '03-lexicon-optional.yaml',
  '04-theme-color.yaml',
  '05-priority.yaml',
];

/** 请求超时时间（毫秒） */
const REQUEST_TIMEOUT = 10000;

/**
 * 将 raw.githubusercontent.com URL 转换为 jsdelivr CDN 镜像 URL
 * 用于直连失败时的兜底拉取（解决部分网络环境无法访问 raw.githubusercontent.com 的问题）
 *
 * 转换规则：
 *   https://raw.githubusercontent.com/{user}/{repo}/{branch}/{path}
 *   → https://cdn.jsdelivr.net/gh/{user}/{repo}@{branch}/{path}
 *
 * 非 raw.githubusercontent.com 域名直接返回原 URL（用户自定义镜像时不动）
 */
function toJsdelivrCdn(url: string): string {
  const m = url.match(/^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);
  if (!m) return url;
  const [, user, repo, branch, path] = m;
  return `https://cdn.jsdelivr.net/gh/${user}/${repo}@${branch}/${path}`;
}

/**
 * 带超时控制的网络请求
 * 使用 Obsidian 的 requestUrl API，避免 CORS 限制
 * 直连失败时自动尝试 jsdelivr CDN 镜像兜底
 * P1-6: 支持 token 认证头(用于私有仓库或提升 API 速率限制)
 * @param url 请求地址
 * @param token 可选认证 token(用于私有仓库)
 * @returns 响应文本，失败时返回 null
 */
async function fetchWithTimeout(url: string, token?: string): Promise<string | null> {
  // 第一轮：直连原始 URL
  const direct = await fetchOnce(url, token);
  if (direct !== null) return direct;

  // 第二轮：若原始 URL 是 raw.githubusercontent.com，尝试 jsdelivr CDN 镜像
  // 注意:CDN 镜像不支持 token 认证,仅用于公开仓库兜底
  const cdnUrl = toJsdelivrCdn(url);
  if (cdnUrl !== url) {
    return await fetchOnce(cdnUrl);
  }

  return null;
}

/**
 * 单次请求（带超时）
 * P1-6: 支持 token 认证头注入
 * @param url 请求地址
 * @param token 可选认证 token
 * @returns 响应文本，失败时返回 null
 */
async function fetchOnce(url: string, token?: string): Promise<string | null> {
  try {
    // 创建超时 Promise，10 秒后拒绝
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('请求超时')), REQUEST_TIMEOUT);
    });

    // 构建请求参数,P1-6 注入 token 认证头
    const requestOptions: { url: string; method: string; throw: boolean; headers?: Record<string, string> } = {
      url,
      method: 'GET',
      throw: false,
    };
    if (token) {
      // GitHub/Gitee/GitLab 通用 Authorization 头格式
      requestOptions.headers = { Authorization: `Bearer ${token}` };
    }

    // 使用 Promise.race 实现超时控制
    // requestUrl 不支持 AbortController，故通过 race 竞争实现
    const response = await Promise.race([
      requestUrl(requestOptions),
      timeoutPromise,
    ]);

    // 检查 HTTP 状态码，非 2xx 视为失败
    if (response.status < 200 || response.status >= 300) {
      return null;
    }

    return response.text;
  } catch {
    // 网络错误或超时，返回 null 不抛异常
    return null;
  }
}

/**
 * 拉取远程版本信息
 * 从 Git 仓库获取 version.json，判断是否有新版本规则
 * P1-6: 支持 token 认证(私有仓库)
 * @param rawBaseUrl Git 仓库 raw 文件基础地址
 * @param token 可选认证 token
 * @returns 远程版本信息，失败时返回 null
 */
export async function fetchRemoteVersion(
  rawBaseUrl: string,
  token?: string
): Promise<RemoteVersionInfo | null> {
  const text = await fetchWithTimeout(`${rawBaseUrl}/version.json`, token);
  if (text === null) {
    return null;
  }

  try {
    const data = JSON.parse(text);
    // 验证必要字段是否存在（hash 可选，缺失时由本地计算兜底）
    if (!data.version || !data.updateTime) {
      return null;
    }
    return {
      version: data.version,
      updateTime: data.updateTime,
      hash: data.hash ?? '',
      mainBranch: data.mainBranch ?? 'main',
      rawBaseUrl: data.rawBaseUrl ?? rawBaseUrl,
    } as RemoteVersionInfo;
  } catch {
    // JSON 解析失败
    return null;
  }
}

/**
 * 并发拉取所有规则文件
 * 同时请求 5 个 YAML 规则文件，任意文件失败则整体返回 null
 * @param rawBaseUrl Git 仓库 raw 文件基础地址
 * @returns 文件名到文件内容的映射，任意文件失败时返回 null
 */
export async function fetchRuleFiles(
  rawBaseUrl: string
): Promise<Record<string, string> | null> {
  const results: Record<string, string> = {};

  // 并发拉取所有规则文件
  const fetchPromises = RULE_FILES.map(async (fileName) => {
    const content = await fetchWithTimeout(`${rawBaseUrl}/${fileName}`);
    return { fileName, content };
  });

  const responses = await Promise.all(fetchPromises);

  // 检查是否所有文件都成功拉取
  for (const { fileName, content } of responses) {
    if (content === null) {
      // 任意文件拉取失败，整体返回 null（规则文件配套使用，缺一不可）
      return null;
    }
    results[fileName] = content;
  }

  return results;
}

/**
 * 对比本地与远程版本，判断是否需要更新
 * 当版本号不一致，或 hash 不一致（双方均存在 hash 时）需要更新
 * 远程无 hash 时降级为仅版本号比对，hash 由本地重新计算后保存
 * @param local 本地版本信息（null 表示无本地缓存）
 * @param remote 远程版本信息
 * @returns 是否需要更新
 */
export function compareVersions(
  local: LocalVersionInfo | null,
  remote: RemoteVersionInfo
): boolean {
  // 本地无版本信息，需要更新
  if (!local) {
    return true;
  }
  // 版本号不同，需要更新
  if (local.version !== remote.version) {
    return true;
  }
  // 双方均有 hash 且不一致，需要更新
  // 远程 hash 缺失时降级为仅版本号比对，避免误判
  if (remote.hash && local.hash && local.hash !== remote.hash) {
    return true;
  }
  // 版本号一致且无 hash 冲突，无需更新
  return false;
}

/**
 * 计算字符串的简单哈希值（djb2 算法）
 * 用于版本对比，非加密用途
 * @param content 待计算的内容
 * @returns 十六进制哈希字符串
 */
export function calculateHash(content: string): string {
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    // hash * 33 + charCode（通过位运算优化乘法）
    hash = ((hash << 5) + hash) + content.charCodeAt(i);
    // 转为 32 位有符号整数，避免溢出
    hash = hash & hash;
  }
  // 转为无符号 32 位整数后输出十六进制字符串
  return (hash >>> 0).toString(16);
}

/**
 * 带报告的规则文件拉取
 * 逐个文件拉取，记录每个文件的成功/失败状态和大小
 * P1-6: 支持 token 认证(私有仓库)
 * @param rawBaseUrl Git 仓库 raw 文件基础地址
 * @param token 可选认证 token
 * @returns 文件内容映射和逐文件拉取结果
 */
export async function fetchRuleFilesWithReport(
  rawBaseUrl: string,
  token?: string
): Promise<{ files: Record<string, string> | null; results: PullFileResult[] }> {
  const results: PullFileResult[] = [];
  const files: Record<string, string> = {};

  // 逐个文件拉取，记录详细结果
  for (const fileName of RULE_FILES) {
    const content = await fetchWithTimeout(`${rawBaseUrl}/${fileName}`, token);
    if (content !== null) {
      files[fileName] = content;
      results.push({
        fileName,
        success: true,
        size: new Blob([content]).size,
      });
    } else {
      results.push({
        fileName,
        success: false,
        size: 0,
        error: '网络请求失败或超时',
      });
    }
  }

  // 全部成功才返回文件映射，否则返回 null
  const allSuccess = results.every((r) => r.success);
  return {
    files: allSuccess ? files : null,
    results,
  };
}

/**
 * 解析规则文件分类统计
 * 对拉取到的 YAML 文件内容做简单解析，统计各分类条目数
 * @param files 文件名到内容的映射
 * @returns 分类统计列表
 */
export function parseRuleCategories(files: Record<string, string>): RuleCategoryStat[] {
  const stats: RuleCategoryStat[] = [];

  for (const [fileName, content] of Object.entries(files)) {
    let parsed = true;
    let count = 0;
    let name = '';

    try {
      if (fileName === '01-base-patterns.yaml') {
        // 统计 pattern 数量：匹配顶层缩进的两字符+冒号
        name = '基础正则规则';
        const matches = content.match(/^  \w+:\s*$/gm);
        count = matches ? matches.length : 0;
      } else if (fileName === '02-semantic-context.yaml') {
        name = '上下文映射';
        // 统计 contextMap 下的区块数
        const ctxMatches = content.match(/^  "[^"]+":\s*$/gm);
        count = ctxMatches ? ctxMatches.length : 0;
      } else if (fileName === '03-lexicon-optional.yaml') {
        name = '行业词典';
        // 统计词典分类数
        const lexMatches = content.match(/^  \w+:\s*$/gm);
        count = lexMatches ? lexMatches.length : 0;
        // 减去 cssClassMap（它不是词典）
        const cssMapIdx = content.indexOf('cssClassMap:');
        if (cssMapIdx > -1) {
          const beforeMap = content.substring(0, cssMapIdx);
          const lexOnly = beforeMap.match(/^  \w+:\s*$/gm);
          count = lexOnly ? lexOnly.length : 0;
        }
      } else if (fileName === '04-theme-color.yaml') {
        name = '配色定义';
        const styleMatches = content.match(/^  dsl-[\w-]+:\s*$/gm);
        count = styleMatches ? styleMatches.length : 0;
      } else if (fileName === '05-priority.yaml') {
        name = '优先级层级';
        const priMatches = content.match(/^  \w+:\s*\d+/gm);
        count = priMatches ? priMatches.length : 0;
      }
    } catch {
      parsed = false;
    }

    stats.push({ name: name || fileName, file: fileName, count, parsed });
  }

  return stats;
}

/**
 * 统计词典术语总数
 * @param files 文件名到内容的映射
 * @returns 术语总数
 */
export function countLexiconTerms(files: Record<string, string>): number {
  const content = files['03-lexicon-optional.yaml'];
  if (!content) return 0;

  // 统计所有列表项（- "..." 格式）
  const matches = content.match(/^\s+- "[^"]+"/gm);
  return matches ? matches.length : 0;
}
