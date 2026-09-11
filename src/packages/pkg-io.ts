/**
 * .stylepkg 导入导出（v5 包管理模块）
 *
 * 包本体为引用索引目录；.stylepkg 是自包含完整数据包（清单 + 令牌 + 规则完整数据），
 * 用于跨库分享。桌面端使用 zlib deflate 压缩，移动端/解压失败自动降级为 JSON 文本。
 *
 * 导入规则：
 * - specVersion 低版本软件打开高规范版本包 → 拒绝导入
 * - ID 冲突自动生成全新 ID（不覆盖本地资源），映射表同步重写 overrides
 * - 令牌写入 customTextColors；规则写入 customRules（上层编译合并进规则集）
 */

import { Notice } from 'obsidian';
import type { CustomRuleDef, CustomTextColor, PackageManifest } from '../types';
import { PACKAGE_SPEC_VERSION } from '../types';
import type PromptColorizer from '../../main';
import type { LoadedPackage } from '../types';
import { compareSemver, generateResourceIdSafe } from './pkg-utils';
import { openExportPreviewModal, openImportPreviewModal } from './package-dialogs';

/** 桌面端 zlib（不可用时返回 null，走 JSON 文本降级） */
function requireZlib(): { deflateSync: (data: Uint8Array) => Uint8Array; inflateSync: (data: Uint8Array) => Uint8Array } | null {
  try {
    // Obsidian 桌面端 renderer 进程可经 require('zlib') 访问 Node 模块
    // eslint-disable-next-line
    const req = typeof (globalThis as { require?: unknown }).require === 'function'
      ? (globalThis as { require: (m: string) => unknown }).require
      : null;
    if (!req) return null;
    const zlib = req('zlib') as { deflateSync?: unknown; inflateSync?: unknown } | null;
    if (zlib && typeof zlib.deflateSync === 'function' && typeof zlib.inflateSync === 'function') {
      return zlib as { deflateSync: (d: Uint8Array) => Uint8Array; inflateSync: (d: Uint8Array) => Uint8Array };
    }
    return null;
  } catch {
    return null;
  }
}

/** .stylepkg 容器结构 */
export interface StylePkgExport {
  format: 'prompt-colorizer-stylepkg';
  specVersion: string;
  exportedAt: string;
  manifest: PackageManifest;
  tokens: CustomTextColor[];
  rules: CustomRuleDef[];
}

/** 导出包：弹预览清单 → 确认后打包下载 .stylepkg */
export function exportPackage(plugin: PromptColorizer, pkg: LoadedPackage): void {
  if (!pkg.manifest) {
    new Notice('无效包无法导出');
    return;
  }

  const tokens: CustomTextColor[] = [];
  for (const id of pkg.refTokenIds ?? []) {
    const c = plugin.settings.customTextColors.find((x) => x.id === id);
    if (c) tokens.push(structuredClone(c));
  }

  const rules: CustomRuleDef[] = [];
  for (const id of pkg.refRuleIds ?? []) {
    const def = ruleIdToDef(plugin, id);
    if (def) rules.push(def);
  }

  openExportPreviewModal(plugin.app, tokens, rules, () => {
    const payload: StylePkgExport = {
      format: 'prompt-colorizer-stylepkg',
      specVersion: PACKAGE_SPEC_VERSION,
      exportedAt: new Date().toISOString(),
      manifest: { ...structuredClone(pkg.manifest as PackageManifest), type: 'user' },
      tokens,
      rules,
    };
    downloadStylePkg(payload, `${pkg.dirName}.stylepkg`);
    new Notice(`已导出「${payload.manifest.name}」（${tokens.length} 令牌 / ${rules.length} 规则）`);
  });
}

/** 规则 ID → 可序列化定义（从规则集反推；导入过的 customRules 优先取原定义） */
function ruleIdToDef(plugin: PromptColorizer, id: string): CustomRuleDef | null {
  const imported = (plugin.settings.customRules ?? []).find((r) => r.id === id);
  if (imported) return structuredClone(imported);
  const compiled = (plugin.currentRuleSet?.rules ?? []).find((r) => r.id === id);
  if (!compiled) return null;
  const style = plugin.currentRuleSet?.styleRules?.[compiled.cssClass] ?? undefined;
  return {
    id: compiled.id,
    name: compiled.id,
    regex: compiled.regex.source,
    cssClass: compiled.cssClass,
    priority: compiled.priority,
    captureGroup: compiled.captureGroup,
    flags: compiled.regex.flags,
    style: style ? (JSON.parse(JSON.stringify(style)) as Record<string, string>) : undefined,
  };
}

/** 触发 .stylepkg 下载（桌面 zlib deflate 二进制；不可用时 JSON 文本） */
function downloadStylePkg(payload: StylePkgExport, filename: string): void {
  const json = JSON.stringify(payload, null, 2);
  let blob: Blob;
  try {
    const zlib = requireZlib();
    if (zlib) {
      // 格式魔数 + deflate 数据
      const magic = new TextEncoder().encode('PCPKG1');
      const data: Uint8Array = zlib.deflateSync(Buffer.from(json, 'utf-8'));
      const merged = new Uint8Array(magic.length + data.length);
      merged.set(magic, 0);
      merged.set(data, magic.length);
      blob = new Blob([merged], { type: 'application/octet-stream' });
    } else {
      throw new Error('zlib unavailable');
    }
  } catch {
    blob = new Blob([json], { type: 'application/json' });
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** 从 File 读取并解析 .stylepkg（自动识别 deflate 二进制 / JSON 文本） */
async function readStylePkg(file: File): Promise<StylePkgExport> {
  const buf = new Uint8Array(await file.arrayBuffer());
  let json: string;
  const magic = new TextDecoder().decode(buf.slice(0, 6));
  if (magic === 'PCPKG1') {
    const zlib = requireZlib();
    if (!zlib) throw new Error('当前环境不支持解压 deflate 格式 .stylepkg');
    const inflated: Uint8Array = zlib.inflateSync(Buffer.from(buf.slice(6)));
    json = new TextDecoder().decode(inflated);
  } else {
    json = new TextDecoder().decode(buf);
  }
  const obj = JSON.parse(json) as StylePkgExport;
  if (!obj || obj.format !== 'prompt-colorizer-stylepkg' || !obj.manifest) {
    throw new Error('不是有效的 .stylepkg 包文件');
  }
  return obj;
}

/** 导入 .stylepkg 入口（文件选择 → 校验 → 预览 → 执行导入） */
export function importStylePkg(plugin: PromptColorizer, onComplete?: () => void): void {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.stylepkg,.json';
  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (!file) return;
    void (async () => {
      try {
        const payload = await readStylePkg(file);
        // specVersion 兼容校验：低版本软件打开高规范版本包 → 拒绝
        if (compareSemver(payload.specVersion, PACKAGE_SPEC_VERSION) > 0) {
          new Notice(`导入失败：包规范版本 ${payload.specVersion} 高于当前支持版本 ${PACKAGE_SPEC_VERSION}，请升级软件后重试`);
          return;
        }
        const plan = buildImportPlan(plugin, payload);
        openImportPreviewModal(
          plugin.app,
          payload.manifest.name,
          plan.newTokens,
          plan.newRules,
          plan.tokenIdConflicts,
          plan.ruleIdConflicts,
          () => void executeImport(plugin, payload, plan).then(() => onComplete?.())
        );
      } catch (e) {
        new Notice(`导入失败: ${e instanceof Error ? e.message : String(e)}`);
      }
    })();
  });
  input.click();
}

/** 导入计划（ID 冲突分析与新 ID 分配） */
interface ImportPlan {
  newTokens: Array<{ token: CustomTextColor; newId: string }>;
  newRules: Array<{ rule: CustomRuleDef; newId: string; newCssClass: string }>;
  tokenIdConflicts: number;
  ruleIdConflicts: number;
  /** 旧 token ID → 新 token ID */
  tokenIdMap: Record<string, string>;
  /** 旧 rule ID → 新 rule ID */
  ruleIdMap: Record<string, string>;
  newDirName: string;
}

/** 分析 ID 冲突并预分配新 ID（不落盘） */
function buildImportPlan(plugin: PromptColorizer, payload: StylePkgExport): ImportPlan {
  const existingTokenIds = new Set((plugin.settings.customTextColors ?? []).map((c) => c.id));
  const existingRuleIds = new Set([
    ...(plugin.currentRuleSet?.rules ?? []).map((r) => r.id),
    ...(plugin.settings.customRules ?? []).map((r) => r.id),
  ]);

  const newTokens: Array<{ token: CustomTextColor; newId: string }> = [];
  const tokenIdMap: Record<string, string> = {};
  let tokenIdConflicts = 0;
  for (const raw of payload.tokens ?? []) {
    const token = structuredClone(raw);
    let newId = token.id;
    if (existingTokenIds.has(newId)) {
      newId = generateResourceIdSafe('token');
      tokenIdConflicts++;
    }
    existingTokenIds.add(newId);
    tokenIdMap[token.id] = newId;
    token.id = newId;
    newTokens.push({ token, newId });
  }

  const newRules: Array<{ rule: CustomRuleDef; newId: string; newCssClass: string }> = [];
  const ruleIdMap: Record<string, string> = {};
  let ruleIdConflicts = 0;
  for (const raw of payload.rules ?? []) {
    const rule = structuredClone(raw);
    let newId = rule.id;
    let newCssClass = rule.cssClass;
    if (existingRuleIds.has(newId)) {
      newId = generateResourceIdSafe('rule');
      newCssClass = `dsl-pkg-${newId}`;
      ruleIdConflicts++;
    }
    existingRuleIds.add(newId);
    ruleIdMap[rule.id] = newId;
    rule.id = newId;
    rule.cssClass = newCssClass;
    newRules.push({ rule, newId, newCssClass });
  }

  // 新包目录名（冲突自动加后缀）
  const baseDir = sanitizeDirName(payload.manifest.packageId || payload.manifest.name || 'imported_pack');
  let newDirName = baseDir;
  let i = 2;
  while (plugin.loadedPackages.some((p) => p.dirName === newDirName)) {
    newDirName = `${baseDir}_${i++}`;
  }

  return { newTokens, newRules, tokenIdConflicts, ruleIdConflicts, tokenIdMap, ruleIdMap, newDirName };
}

/** 执行导入：写令牌/规则 + 重写 overrides + 建包目录 + 刷新 */
async function executeImport(plugin: PromptColorizer, payload: StylePkgExport, plan: ImportPlan): Promise<void> {
  // 1. 写令牌（映射 ID 已在 plan 中重写）
  for (const { token } of plan.newTokens) {
    plugin.settings.customTextColors.push(token);
  }

  // 2. 写规则（ID/cssClass 已重写）
  for (const { rule } of plan.newRules) {
    plugin.settings.customRules.push(rule);
  }

  // 3. 重写包覆盖表：旧 ID → 新 ID
  const manifest: PackageManifest = structuredClone(payload.manifest);
  const tokenOverrides: PackageManifest['tokenOverrides'] = {};
  for (const [oldId, ov] of Object.entries(manifest.tokenOverrides ?? {})) {
    const newId = plan.tokenIdMap[oldId] ?? oldId;
    tokenOverrides[newId] = ov;
  }
  const ruleOverrides: PackageManifest['ruleOverrides'] = {};
  for (const [oldId, ov] of Object.entries(manifest.ruleOverrides ?? {})) {
    const newId = plan.ruleIdMap[oldId] ?? oldId;
    ruleOverrides[newId] = ov;
  }
  manifest.tokenOverrides = tokenOverrides;
  manifest.ruleOverrides = ruleOverrides;
  manifest.packageId = plan.newDirName;
  manifest.specVersion = payload.specVersion || PACKAGE_SPEC_VERSION;
  manifest.type = 'user';

  // 4. 新建包目录（引用新 ID）
  await plugin.pkgManager.createPackage(
    manifest,
    plan.newTokens.map((t) => t.token.id),
    plan.newRules.map((r) => r.rule.id)
  );

  // 5. 保存 + 全链路刷新
  await plugin.saveSettings();
  plugin.applyCustomTextColorsStyles();
  plugin.appendCustomRules();
  plugin.refreshEditorExtensions();
  await plugin.reloadPackages();
  plugin.app.workspace.trigger('prompt-colorizer:custom-colors-changed');

  new Notice(
    `导入完成：「${manifest.name}」 新增令牌 ${plan.newTokens.length} 个、规则 ${plan.newRules.length} 个` +
    (plan.tokenIdConflicts + plan.ruleIdConflicts > 0
      ? `（${plan.tokenIdConflicts + plan.ruleIdConflicts} 个 ID 冲突已自动重生成）`
      : '')
  );
}

/** 目录名清理（去除非法字符） */
function sanitizeDirName(name: string): string {
  const cleaned = name.replace(/[\\/:*?"<>|#^[\]]/g, '_').trim();
  return cleaned.length > 0 ? cleaned : 'imported_pack';
}
