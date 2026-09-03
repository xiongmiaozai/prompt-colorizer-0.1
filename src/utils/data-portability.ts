/**
 * 数据导出/导入工具模块
 * 支持全量设置、自定义文本颜色、文件夹映射的导出与导入
 * 用于配置备份、迁移、分享
 */

import { Notice, TFile } from 'obsidian';
import type { PromptColorizerSettings, CustomTextColor } from '../types';

/** 导出文件格式版本号,用于后续版本迁移 */
const EXPORT_FORMAT_VERSION = 1;

/** 导出数据类型 */
export type ExportKind = 'full' | 'customTextColors' | 'folderMappings';

/** 导出数据包结构 */
export interface ExportPackage {
  /** 导出格式版本 */
  formatVersion: number;
  /** 导出类型 */
  kind: ExportKind;
  /** 导出时间(ISO 字符串) */
  exportedAt: string;
  /** 源插件版本 */
  pluginVersion: string;
  /** 导出数据(类型不同内容不同) */
  data: unknown;
}

/**
 * 构建导出数据包
 */
function buildPackage(kind: ExportKind, data: unknown, pluginVersion: string): ExportPackage {
  return {
    formatVersion: EXPORT_FORMAT_VERSION,
    kind,
    exportedAt: new Date().toISOString(),
    pluginVersion,
    data,
  };
}

/**
 * 生成导出文件名
 * @param kind 导出类型
 * @returns 形如 prompt-colorizer-full-20260730-153000.json
 */
function generateFileName(kind: ExportKind): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `prompt-colorizer-${kind}-${ts}.json`;
}

/**
 * 导出全量设置
 * @param settings 当前插件设置
 * @param pluginVersion 插件版本号
 * @param app Obsidian App 实例(用于写入文件到 Vault)
 */
export async function exportFullSettings(
  settings: PromptColorizerSettings,
  pluginVersion: string,
  app: { vault: { create: (path: string, content: string) => Promise<TFile>; adapter: { exists: (path: string) => Promise<boolean> } } }
): Promise<void> {
  const pkg = buildPackage('full', settings, pluginVersion);
  const fileName = generateFileName('full');
  // 导出到 Vault 根目录,用户可见、可分享
  const path = await writePackageToVault(app, fileName, pkg);
  new Notice(`已导出全量设置到 ${path}`, 5000);
}

/**
 * 导出自定义文本颜色列表
 */
export async function exportCustomTextColors(
  customTextColors: CustomTextColor[],
  pluginVersion: string,
  app: { vault: { create: (path: string, content: string) => Promise<TFile>; adapter: { exists: (path: string) => Promise<boolean> } } }
): Promise<void> {
  const pkg = buildPackage('customTextColors', customTextColors, pluginVersion);
  const fileName = generateFileName('customTextColors');
  const path = await writePackageToVault(app, fileName, pkg);
  new Notice(`已导出 ${customTextColors.length} 条自定义文本颜色到 ${path}`, 5000);
}

/**
 * 导出文件夹映射列表
 */
export async function exportFolderMappings(
  folderMappings: { path: string; type: string }[],
  pluginVersion: string,
  app: { vault: { create: (path: string, content: string) => Promise<TFile>; adapter: { exists: (path: string) => Promise<boolean> } } }
): Promise<void> {
  const pkg = buildPackage('folderMappings', folderMappings, pluginVersion);
  const fileName = generateFileName('folderMappings');
  const path = await writePackageToVault(app, fileName, pkg);
  new Notice(`已导出 ${folderMappings.length} 条文件夹映射到 ${path}`, 5000);
}

/**
 * 写入导出包到 Vault
 * 同名文件自动追加数字后缀,避免覆盖
 */
async function writePackageToVault(
  app: { vault: { create: (path: string, content: string) => Promise<TFile>; adapter: { exists: (path: string) => Promise<boolean> } } },
  fileName: string,
  pkg: ExportPackage
): Promise<string> {
  const basePath = fileName.replace(/\.json$/, '');
  let finalPath = fileName;
  let counter = 1;
  // 同名文件追加 -1, -2 后缀
  while (await app.vault.adapter.exists(finalPath)) {
    finalPath = `${basePath}-${counter}.json`;
    counter++;
  }
  const content = JSON.stringify(pkg, null, 2);
  await app.vault.create(finalPath, content);
  return finalPath;
}

/**
 * 从 JSON 字符串解析导出包
 * @param jsonString JSON 字符串
 * @returns 解析后的导出包,失败返回 null
 */
export function parseExportPackage(jsonString: string): ExportPackage | null {
  try {
    const parsed = JSON.parse(jsonString) as ExportPackage;
    // 基础校验
    if (
      typeof parsed.formatVersion !== 'number' ||
      typeof parsed.kind !== 'string' ||
      typeof parsed.exportedAt !== 'string' ||
      parsed.data === undefined
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * 应用导入的全量设置
 * 保留当前 schemaVersion 等运行时字段,只覆盖可导入字段
 * @param pkg 已解析的导出包
 * @param currentSettings 当前设置(用于保留运行时字段)
 * @returns 合并后的设置
 */
export function applyImportedFullSettings(
  pkg: ExportPackage,
  currentSettings: PromptColorizerSettings
): PromptColorizerSettings {
  if (pkg.kind !== 'full') {
    throw new Error('导出包类型不是 full');
  }
  const imported = pkg.data as Partial<PromptColorizerSettings>;
  // 保留运行时字段:lastCheckTime、lastPullReport
  // 其余字段从导入数据覆盖
  return {
    ...currentSettings,
    ...imported,
    // 保留运行时状态(避免覆盖用户当前状态)
    lastCheckTime: currentSettings.lastCheckTime,
    lastPullReport: currentSettings.lastPullReport,
  };
}

/**
 * 应用导入的自定义文本颜色列表(替换当前列表)
 */
export function applyImportedCustomTextColors(
  pkg: ExportPackage
): CustomTextColor[] {
  if (pkg.kind !== 'customTextColors') {
    throw new Error('导出包类型不是 customTextColors');
  }
  const imported = pkg.data as CustomTextColor[];
  if (!Array.isArray(imported)) {
    throw new Error('导入数据不是数组');
  }
  // 基础校验每条记录
  return imported.filter(
    (item) =>
      item &&
      typeof item.id === 'string' &&
      typeof item.text === 'string' &&
      typeof item.color === 'string'
  );
}

/**
 * 应用导入的文件夹映射列表(替换当前列表)
 */
export function applyImportedFolderMappings(
  pkg: ExportPackage
): { path: string; type: string }[] {
  if (pkg.kind !== 'folderMappings') {
    throw new Error('导出包类型不是 folderMappings');
  }
  const imported = pkg.data as { path: string; type: string }[];
  if (!Array.isArray(imported)) {
    throw new Error('导入数据不是数组');
  }
  return imported.filter(
    (item) =>
      item &&
      typeof item.path === 'string' &&
      typeof item.type === 'string'
  );
}
