/**
 * 配置导出/导入工具
 * 支持选择性导出、多文件导入合并
 */

import type { PromptColorizerSettings } from '../types';

/** 不导出的字段（内部状态/敏感/规则源托管） */
const EXPORT_BLACKLIST = new Set([
  'ruleSource', 'gitRawBaseUrl', 'gitBranch', 'autoUpdateRules', 'autoUpdateInterval', 'lastCheckTime',
  'ruleSources', 'activeRuleSourceId',
  'gitTokenEnabled', 'gitToken',
  'gitReportEnabled', 'downloadToCache', 'lastPullReport',
  'enabledRuleIds',
]);

/** 导出数据结构 */
export interface ConfigExport {
  version: string;
  exportedAt: string;
  plugin: string;
  settings: Partial<PromptColorizerSettings>;
}

/** 构建导出数据 */
export function buildExportData(settings: PromptColorizerSettings, pluginVersion: string): ConfigExport {
  const exportable: Record<string, unknown> = {};
  for (const key of Object.keys(settings) as (keyof PromptColorizerSettings)[]) {
    if (EXPORT_BLACKLIST.has(key)) continue;
    (exportable as Record<string, unknown>)[key] = settings[key];
  }
  return {
    version: pluginVersion,
    exportedAt: new Date().toISOString(),
    plugin: 'prompt-colorizer',
    settings: exportable as Partial<PromptColorizerSettings>,
  };
}

/** 合并单个导入数据到基础设置（智能合并） */
export function mergeSettings(
  base: PromptColorizerSettings,
  imported: Partial<PromptColorizerSettings>
): PromptColorizerSettings {
  const result = { ...base };
  for (const [key, value] of Object.entries(imported) as [keyof PromptColorizerSettings, unknown][]) {
    if (value === undefined) continue;
    const baseValue = result[key];

    if (Array.isArray(value) && Array.isArray(baseValue)) {
      // 数组按 id 去重合并（导入覆盖同 id）；无 id 数组直接替换
      if (value.length > 0 && typeof (value[0] as { id?: unknown }).id !== 'undefined') {
        const map = new Map<unknown, unknown>();
        for (const item of baseValue) map.set((item as { id: unknown }).id, item);
        for (const item of value) map.set((item as { id: unknown }).id, item);
        (result as Record<string, unknown>)[key] = [...map.values()];
      } else {
        (result as Record<string, unknown>)[key] = value;
      }
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)
               && typeof baseValue === 'object' && baseValue !== null) {
      (result as Record<string, unknown>)[key] = { ...(baseValue as object), ...(value as object) };
    } else {
      (result as Record<string, unknown>)[key] = value;
    }
  }
  return result;
}

/** 多文件依次合并导入（后者覆盖前者同字段） */
export function mergeMultipleImports(
  base: PromptColorizerSettings,
  dataList: Partial<PromptColorizerSettings>[]
): PromptColorizerSettings {
  let result = { ...base };
  for (const data of dataList) {
    result = mergeSettings(result, data);
  }
  return result;
}

/** 解析导入 JSON（校验格式） */
export function parseConfigJson(text: string): Partial<PromptColorizerSettings> {
  const parsed = JSON.parse(text);
  // 兼容两种格式：直接 settings 对象，或 { settings: {...} } 包装
  if (parsed && typeof parsed === 'object' && 'settings' in parsed && parsed.settings) {
    return parsed.settings as Partial<PromptColorizerSettings>;
  }
  if (parsed && typeof parsed === 'object') {
    return parsed as Partial<PromptColorizerSettings>;
  }
  throw new Error('Invalid config format');
}

/** 触发 JSON 文件下载 */
export function downloadConfigJson(data: ConfigExport, filename?: string): void {
  const name = filename || `prompt-colorizer-config-${new Date().toISOString().slice(0, 10)}.json`;
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}