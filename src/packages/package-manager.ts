/**
 * 包管理器（v5 包管理模块）
 *
 * 职责：
 * - 扫描加载内置包（内嵌定义）与用户包（vault 根 packages/ 目录，一包一文件夹）
 * - JSON 合法性校验与部分损坏降级（单索引损坏不拖垮整包；package.json 损坏整包无效）
 * - 包 ID 冲突检测（后加载者标记禁用）
 * - 单选/叠加启用集合收集 + 多包样式覆盖按优先级自上而下合并
 *
 * 约束：不改动令牌/规则原有存储、解析、渲染逻辑；本模块仅提供上层容器与覆盖层数据。
 */

import { App, Notice } from 'obsidian';
import type {
  LoadedPackage,
  PackageManifest,
  PackageMode,
  PromptColorizerSettings,
  RuleOverride,
  TokenOverride,
} from '../types';
import { PACKAGE_SPEC_VERSION } from '../types';
import { BUILTIN_PACKAGE_MANIFESTS, BUILTIN_PACKAGE_REFS } from './builtin-package-defs';
import { compareSemver } from './pkg-utils';

/** 用户包根目录（vault 相对路径） */
export const USER_PACKAGES_DIR = 'packages';

/** 从 JSON 文本安全解析对象（失败返回 null） */
function safeParseJson<T>(raw: string): T | null {
  try {
    const obj = JSON.parse(raw);
    return obj && typeof obj === 'object' ? (obj as T) : null;
  } catch {
    return null;
  }
}

export class PackageManager {
  constructor(
    private app: App,
    private getSettings: () => PromptColorizerSettings
  ) {}

  /** 用户包根目录是否存在 */
  async userDirExists(): Promise<boolean> {
    try {
      return await this.app.vault.adapter.exists(USER_PACKAGES_DIR);
    } catch {
      return false;
    }
  }

  /** 列出用户包目录名（仅目录，按名称排序保证加载顺序稳定） */
  async listUserPackageDirs(): Promise<string[]> {
    const adapter = this.app.vault.adapter;
    try {
      if (!(await adapter.exists(USER_PACKAGES_DIR))) return [];
      const listing = await adapter.list(USER_PACKAGES_DIR);
      return listing.folders
        .map((f) => f.replace(/\/$/, '').split('/').pop() ?? '')
        .filter((n) => n.length > 0 && !n.startsWith('.'))
        .sort();
    } catch {
      return [];
    }
  }

  /** 读取单个用户包目录（含降级校验） */
  private async readUserPackage(dirName: string): Promise<LoadedPackage> {
    const adapter = this.app.vault.adapter;
    const dirPath = `${USER_PACKAGES_DIR}/${dirName}`;
    const pkg: LoadedPackage = {
      dirName,
      dirPath,
      manifest: null,
      refTokenIds: [],
      refRuleIds: [],
      isBuiltin: false,
      status: 'ok',
    };

    // package.json：损坏 → 整包无效
    try {
      const manifestPath = `${dirPath}/package.json`;
      if (await adapter.exists(manifestPath)) {
        const manifest = safeParseJson<PackageManifest>(await adapter.read(manifestPath));
        if (manifest && typeof manifest.packageId === 'string' && manifest.packageId.length > 0) {
          pkg.manifest = { ...manifest, type: 'user' };
        } else {
          pkg.status = 'invalid';
          pkg.statusMessage = 'package.json 格式非法';
        }
      } else {
        pkg.status = 'invalid';
        pkg.statusMessage = '缺少 package.json';
      }
    } catch (e) {
      pkg.status = 'invalid';
      pkg.statusMessage = `package.json 读取失败: ${e instanceof Error ? e.message : String(e)}`;
    }

    // tokens/token_index.json：损坏 → 分组部分失效
    pkg.refTokenIds = await this.readRefIndex(`${dirPath}/tokens/token_index.json`, 'refTokenIds');
    // rules/rule_index.json：损坏 → 分组部分失效
    pkg.refRuleIds = await this.readRefIndex(`${dirPath}/rules/rule_index.json`, 'refRuleIds');

    if (pkg.refTokenIds === null || pkg.refRuleIds === null) {
      pkg.status = pkg.status === 'invalid' ? 'invalid' : 'partial';
      if (pkg.status === 'partial' && !pkg.statusMessage) {
        pkg.statusMessage = pkg.refTokenIds === null ? 'token_index.json 损坏' : 'rule_index.json 损坏';
      }
    }
    return pkg;
  }

  /** 读取单个引用索引文件；文件不存在返回 []；JSON 非法返回 null（分组失效标记） */
  private async readRefIndex(path: string, key: 'refTokenIds' | 'refRuleIds'): Promise<string[] | null> {
    const adapter = this.app.vault.adapter;
    try {
      if (!(await adapter.exists(path))) return [];
      const obj = safeParseJson<Record<string, unknown>>(await adapter.read(path));
      if (!obj) return null;
      const arr = obj[key];
      if (!Array.isArray(arr)) return [];
      return arr.filter((v): v is string => typeof v === 'string');
    } catch {
      return null;
    }
  }

  /**
   * 加载全部包：内置优先，再扫描用户目录。
   * packageId 冲突时后加载的包标记 id-conflict 禁用；内置包版本对比产生更新提示。
   */
  async loadAll(): Promise<{ packages: LoadedPackage[]; builtinUpdates: { packageId: string; from: string; to: string }[] }> {
    const packages: LoadedPackage[] = [];
    const builtinUpdates: { packageId: string; from: string; to: string }[] = [];
    const seenIds = new Set<string>();

    // 1. 内置包（内嵌定义，虚拟目录）
    for (const manifest of BUILTIN_PACKAGE_MANIFESTS) {
      const refs = BUILTIN_PACKAGE_REFS[manifest.packageId] ?? { refTokenIds: [], refRuleIds: [] };
      packages.push({
        dirName: manifest.packageId,
        dirPath: `builtin://${manifest.packageId}`,
        manifest: { ...manifest },
        refTokenIds: [...refs.refTokenIds],
        refRuleIds: [...refs.refRuleIds],
        isBuiltin: true,
        status: 'ok',
      });
      seenIds.add(manifest.packageId);

      // 内置包版本对比：检测到新版本提示更新（只弹一次，记录已通知版本）
      const settings = this.getSettings();
      const notified = settings.builtinVersionNotified?.[manifest.packageId];
      if (notified && compareSemver(manifest.version, notified) > 0) {
        builtinUpdates.push({ packageId: manifest.packageId, from: notified, to: manifest.version });
      }
    }

    // 2. 用户包（磁盘扫描，目录名字母序 = 加载顺序）
    const dirNames = await this.listUserPackageDirs();
    for (const dirName of dirNames) {
      const pkg = await this.readUserPackage(dirName);
      const pkgId = pkg.manifest?.packageId ?? dirName;
      if (seenIds.has(pkgId)) {
        // 包 ID 冲突：后加载者禁用
        pkg.status = pkg.status === 'invalid' ? 'invalid' : 'id-conflict';
        pkg.statusMessage = `包 ID「${pkgId}」与已有包重复，已禁用`;
      } else {
        seenIds.add(pkgId);
      }
      packages.push(pkg);
    }

    return { packages, builtinUpdates };
  }

  /** 按设置顺序排序包（packageOrder 上方优先级高；未记录的按加载顺序排后） */
  sortPackages(packages: LoadedPackage[]): LoadedPackage[] {
    const order = this.getSettings().packageOrder ?? [];
    const rank = new Map(order.map((id, i) => [id, i]));
    return [...packages].sort((a, b) => {
      const ra = rank.has(a.dirName) ? (rank.get(a.dirName) as number) : order.length;
      const rb = rank.has(b.dirName) ? (rank.get(b.dirName) as number) : order.length;
      if (ra !== rb) return ra - rb;
      return 0;
    });
  }

  /** 可用包（排除无效/ID冲突禁用包） */
  getAvailablePackages(packages: LoadedPackage[]): LoadedPackage[] {
    return packages.filter((p) => p.manifest && (p.status === 'ok' || p.status === 'partial'));
  }

  /** 当前启用中的包（按优先级排序，叠加模式取全部勾选，单选模式取第一个勾选） */
  getEnabledPackages(packages: LoadedPackage[]): LoadedPackage[] {
    const settings = this.getSettings();
    const mode: PackageMode = settings.packageMode ?? 'single';
    const enabled = new Set(settings.enabledPackageIds ?? []);
    const available = this.sortPackages(this.getAvailablePackages(packages)).filter((p) =>
      enabled.has(p.dirName)
    );
    if (mode === 'single') return available.slice(0, 1);
    return available;
  }

  /** 收集启用包的引用 ID 集合（叠加合并，自动去重） */
  collectEnabledRefIds(enabledPackages: LoadedPackage[]): { tokenIds: Set<string>; ruleIds: Set<string> } {
    const tokenIds = new Set<string>();
    const ruleIds = new Set<string>();
    for (const pkg of enabledPackages) {
      for (const id of pkg.refTokenIds ?? []) tokenIds.add(id);
      for (const id of pkg.refRuleIds ?? []) ruleIds.add(id);
    }
    return { tokenIds, ruleIds };
  }

  /** 收集全部包（无论启用与否）的引用 ID 集合（资源状态判定用） */
  collectAllRefIds(packages: LoadedPackage[]): { tokenIds: Set<string>; ruleIds: Set<string> } {
    const tokenIds = new Set<string>();
    const ruleIds = new Set<string>();
    for (const pkg of packages) {
      for (const id of pkg.refTokenIds ?? []) tokenIds.add(id);
      for (const id of pkg.refRuleIds ?? []) ruleIds.add(id);
    }
    return { tokenIds, ruleIds };
  }

  /**
   * 多包叠加样式合并：按优先级从上到下依次合并；
   * 高优先级包只覆盖自身声明的样式字段，未声明字段继承下层包配置。
   */
  mergeTokenOverrides(enabledPackages: LoadedPackage[]): Record<string, TokenOverride> {
    const merged: Record<string, TokenOverride> = {};
    // 从最低优先级（列表尾）向最高优先级（列表头）合并，高优先级后写覆盖
    for (let i = enabledPackages.length - 1; i >= 0; i--) {
      const overrides = enabledPackages[i].manifest?.tokenOverrides;
      if (!overrides) continue;
      for (const [tokenId, ov] of Object.entries(overrides)) {
        if (!ov || typeof ov !== 'object') continue;
        const target = merged[tokenId] ?? (merged[tokenId] = {});
        if (typeof ov.color === 'string') target.color = ov.color;
        if (typeof ov.fontStyle === 'string') target.fontStyle = ov.fontStyle;
      }
    }
    return merged;
  }

  /** 规则覆盖合并（同 tokenOverrides 合并策略） */
  mergeRuleOverrides(enabledPackages: LoadedPackage[]): Record<string, RuleOverride> {
    const merged: Record<string, RuleOverride> = {};
    for (let i = enabledPackages.length - 1; i >= 0; i--) {
      const overrides = enabledPackages[i].manifest?.ruleOverrides;
      if (!overrides) continue;
      for (const [ruleId, ov] of Object.entries(overrides)) {
        if (!ov || typeof ov !== 'object') continue;
        const target = merged[ruleId] ?? (merged[ruleId] = {});
        if (typeof ov.bgColor === 'string') target.bgColor = ov.bgColor;
        if (typeof ov.border === 'string') target.border = ov.border;
        if (typeof ov.color === 'string') target.color = ov.color;
      }
    }
    return merged;
  }

  /** 递归创建目录（adapter.mkdir 逐级创建） */
  private async mkdirp(path: string): Promise<void> {
    const adapter = this.app.vault.adapter;
    const segments = path.split('/').filter(Boolean);
    let cur = '';
    for (const seg of segments) {
      cur = cur ? `${cur}/${seg}` : seg;
      if (!(await adapter.exists(cur))) {
        await adapter.mkdir(cur);
      }
    }
  }

  /** 写入包的三个文件（package.json + 两个索引） */
  async writePackage(
    dirName: string,
    manifest: PackageManifest,
    refTokenIds: string[],
    refRuleIds: string[]
  ): Promise<void> {
    const adapter = this.app.vault.adapter;
    const dirPath = `${USER_PACKAGES_DIR}/${dirName}`;
    await this.mkdirp(`${dirPath}/tokens`);
    await this.mkdirp(`${dirPath}/rules`);
    const manifestJson: PackageManifest = {
      ...manifest,
      packageId: dirName,
      specVersion: manifest.specVersion || PACKAGE_SPEC_VERSION,
    };
    await adapter.write(`${dirPath}/package.json`, JSON.stringify(manifestJson, null, 2));
    await adapter.write(`${dirPath}/tokens/token_index.json`, JSON.stringify({ refTokenIds }, null, 2));
    await adapter.write(`${dirPath}/rules/rule_index.json`, JSON.stringify({ refRuleIds }, null, 2));
  }

  /** 新建用户包（目录名 = packageId；已存在同名目录时报错） */
  async createPackage(
    manifest: PackageManifest,
    refTokenIds: string[],
    refRuleIds: string[]
  ): Promise<void> {
    const dirName = manifest.packageId;
    if (await this.app.vault.adapter.exists(`${USER_PACKAGES_DIR}/${dirName}`)) {
      throw new Error(`包目录已存在: ${dirName}`);
    }
    await this.writePackage(dirName, manifest, refTokenIds, refRuleIds);
  }

  /** 删除用户包（仅删除 packages/ 下对应文件夹，不删资源本体） */
  async deletePackage(dirName: string): Promise<void> {
    const adapter = this.app.vault.adapter;
    const dirPath = `${USER_PACKAGES_DIR}/${dirName}`;
    if (!(await adapter.exists(dirPath))) return;
    try {
      await adapter.rmdir(dirPath, true);
    } catch (e) {
      new Notice(`删除包目录失败: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}