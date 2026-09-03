/**
 * 本地规则缓存模块
 * 负责管理规则文件和版本信息的本地缓存读写
 * 缓存目录结构：.obsidian/plugins/{pluginId}/cache/
 *   ├── version.json    版本信息
 *   └── rules/          规则文件目录
 */

import { App, TFile, TFolder, normalizePath } from 'obsidian';
import type { LocalVersionInfo } from '../rule-engine/types';

/**
 * 本地缓存管理类
 * 管理插件目录下的 cache 文件夹，存储远程拉取的规则文件和版本信息
 */
export class LocalCache {
  /**
   * @param app Obsidian App 实例
   * @param pluginId 插件 ID，用于定位插件目录
   */
  constructor(
    private app: App,
    private pluginId: string
  ) {}

  /**
   * 获取缓存目录路径
   * @returns 缓存目录的规范路径 .obsidian/plugins/{pluginId}/cache/
   */
  getCacheDir(): string {
    return normalizePath(`.obsidian/plugins/${this.pluginId}/cache`);
  }

  /**
   * 获取版本信息文件路径
   * @returns version.json 的规范路径
   */
  private getVersionFilePath(): string {
    return normalizePath(`${this.getCacheDir()}/version.json`);
  }

  /**
   * 获取规则文件目录路径
   * @returns rules 目录的规范路径
   */
  private getRulesDir(): string {
    return normalizePath(`${this.getCacheDir()}/rules`);
  }

  /**
   * 递归确保目录存在，不存在则逐级创建
   * @param path 目录路径（已规范化的路径）
   */
  private async ensureFolder(path: string): Promise<void> {
    const parts = path.split('/');
    let current = '';
    for (const part of parts) {
      if (!part) continue;
      current = current ? `${current}/${part}` : part;
      const exists = await this.app.vault.adapter.exists(current);
      if (!exists) {
        try {
          await this.app.vault.createFolder(current);
        } catch {
          // 目录可能已被其他操作创建，忽略错误
        }
      }
    }
  }

  /**
   * 写入文件内容（已存在则修改，不存在则创建）
   * 使用 vault.adapter.write 直接写入，绕过 Obsidian 文件缓存
   * 解决第二次拉取时 getAbstractFileByPath 返回 null 导致 create 抛出 "File already exists." 的问题
   * @param filePath 文件路径（已规范化）
   * @param content 文件内容
   */
  private async writeFile(filePath: string, content: string): Promise<void> {
    // 优先尝试 modify 已存在的文件（保持 Obsidian 文件事件正常触发）
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (file instanceof TFile) {
      await this.app.vault.modify(file, content);
      return;
    }
    // 文件不存在或 Obsidian 缓存未命中，用 adapter.write 直接写入
    // adapter.write 会自动处理文件存在/不存在两种情况，避免 create 抛错
    await this.app.vault.adapter.write(filePath, content);
  }

  /**
   * 保存版本信息到 cache/version.json
   * @param info 本地版本信息
   */
  async saveVersion(info: LocalVersionInfo): Promise<void> {
    await this.ensureFolder(this.getCacheDir());
    const filePath = this.getVersionFilePath();
    const content = JSON.stringify(info, null, 2);
    await this.writeFile(filePath, content);
  }

  /**
   * 读取本地版本信息
   * @returns 本地版本信息，不存在或解析失败时返回 null
   */
  async loadVersion(): Promise<LocalVersionInfo | null> {
    const filePath = this.getVersionFilePath();
    const exists = await this.app.vault.adapter.exists(filePath);
    if (!exists) {
      return null;
    }

    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (!(file instanceof TFile)) {
      return null;
    }

    try {
      const content = await this.app.vault.read(file);
      const data = JSON.parse(content);
      // 验证必要字段是否存在且类型正确
      if (
        !data.version ||
        !data.updateTime ||
        !data.hash ||
        typeof data.fetchedAt !== 'number'
      ) {
        return null;
      }
      return data as LocalVersionInfo;
    } catch {
      // JSON 解析失败或文件读取失败
      return null;
    }
  }

  /**
   * 保存规则文件到 cache/rules/ 目录
   * @param files 文件名到文件内容的映射
   */
  async saveRuleFiles(files: Record<string, string>): Promise<void> {
    const rulesDir = this.getRulesDir();
    await this.ensureFolder(rulesDir);

    for (const [name, content] of Object.entries(files)) {
      const filePath = normalizePath(`${rulesDir}/${name}`);
      await this.writeFile(filePath, content);
    }
  }

  /**
   * 读取本地所有规则文件
   * @returns 文件名到文件内容的映射，目录不存在或无文件时返回 null
   */
  async loadRuleFiles(): Promise<Record<string, string> | null> {
    const rulesDir = this.getRulesDir();
    const exists = await this.app.vault.adapter.exists(rulesDir);
    if (!exists) {
      return null;
    }

    const folder = this.app.vault.getAbstractFileByPath(rulesDir);
    if (!(folder instanceof TFolder)) {
      return null;
    }

    const result: Record<string, string> = {};
    for (const child of folder.children) {
      if (child instanceof TFile) {
        try {
          const content = await this.app.vault.read(child);
          result[child.name] = content;
        } catch {
          // 单个文件读取失败，跳过该文件
        }
      }
    }

    return Object.keys(result).length > 0 ? result : null;
  }

  /**
   * 读取单个规则文件
   * @param name 文件名
   * @returns 文件内容，不存在或读取失败时返回 null
   */
  async getRuleFile(name: string): Promise<string | null> {
    const filePath = normalizePath(`${this.getRulesDir()}/${name}`);
    const exists = await this.app.vault.adapter.exists(filePath);
    if (!exists) {
      return null;
    }

    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (!(file instanceof TFile)) {
      return null;
    }

    try {
      return await this.app.vault.read(file);
    } catch {
      return null;
    }
  }

  /**
   * 清空缓存目录下的所有内容
   * 保留 cache 目录本身，删除其下所有文件和子目录
   */
  async clearCache(): Promise<void> {
    const cacheDir = this.getCacheDir();
    const exists = await this.app.vault.adapter.exists(cacheDir);
    if (!exists) {
      return;
    }

    const folder = this.app.vault.getAbstractFileByPath(cacheDir);
    if (!(folder instanceof TFolder)) {
      return;
    }

    // 复制 children 数组（删除过程中原数组会被修改）
    const children = [...folder.children];
    for (const child of children) {
      try {
        // force=true 确保文件夹也能被删除
        await this.app.vault.delete(child, true);
      } catch {
        // 单个文件删除失败，跳过继续
      }
    }
  }

  // ============================================================
  // 缓存回滚机制(P1-5)
  // ============================================================

  /**
   * 获取备份目录路径 cache/prev/
   * @returns prev 目录的规范路径
   */
  private getPrevDir(): string {
    return normalizePath(`${this.getCacheDir()}/prev`);
  }

  /**
   * 在拉取新版本前备份当前缓存
   * 将 cache/rules/ 与 cache/version.json 复制到 cache/prev/
   * 若当前无缓存则跳过(首次拉取无需备份)
   * @returns 是否成功创建了备份(无当前缓存时返回 false)
   */
  async backupCurrentCache(): Promise<boolean> {
    const rulesDir = this.getRulesDir();
    const versionFile = this.getVersionFilePath();
    const prevDir = this.getPrevDir();
    const prevRulesDir = normalizePath(`${prevDir}/rules`);

    // 检查当前缓存是否存在
    const rulesExist = await this.app.vault.adapter.exists(rulesDir);
    const versionExists = await this.app.vault.adapter.exists(versionFile);
    if (!rulesExist && !versionExists) {
      // 无当前缓存,无需备份
      return false;
    }

    // 清理旧备份,确保 prev 目录干净
    await this.clearPrevBackup();

    // 创建 prev 目录结构
    await this.ensureFolder(prevRulesDir);

    // 备份 version.json
    if (versionExists) {
      try {
        const versionContent = await this.app.vault.adapter.read(versionFile);
        await this.app.vault.adapter.write(
          normalizePath(`${prevDir}/version.json`),
          versionContent
        );
      } catch {
        // version.json 读取失败,跳过(非致命)
      }
    }

    // 备份 rules 目录下所有文件
    if (rulesExist) {
      const rulesFolder = this.app.vault.getAbstractFileByPath(rulesDir);
      if (rulesFolder instanceof TFolder) {
        for (const child of rulesFolder.children) {
          if (child instanceof TFile) {
            try {
              const content = await this.app.vault.read(child);
              await this.app.vault.adapter.write(
                normalizePath(`${prevRulesDir}/${child.name}`),
                content
              );
            } catch {
              // 单个文件备份失败,跳过继续
            }
          }
        }
      }
    }

    return true;
  }

  /**
   * 从备份回滚到上一版本
   * 编译失败时调用,将 cache/prev/ 内容恢复到 cache/rules/ 与 cache/version.json
   * @returns 是否成功回滚(无备份或恢复失败时返回 false)
   */
  async rollbackToPrevCache(): Promise<boolean> {
    const prevDir = this.getPrevDir();
    const prevRulesDir = normalizePath(`${prevDir}/rules`);
    const prevVersionFile = normalizePath(`${prevDir}/version.json`);

    // 检查备份是否存在
    const prevExists = await this.app.vault.adapter.exists(prevDir);
    if (!prevExists) {
      return false;
    }

    // 清理当前 rules 目录(可能含半成品文件)
    const rulesDir = this.getRulesDir();
    const rulesExist = await this.app.vault.adapter.exists(rulesDir);
    if (rulesExist) {
      const rulesFolder = this.app.vault.getAbstractFileByPath(rulesDir);
      if (rulesFolder instanceof TFolder) {
        const children = [...rulesFolder.children];
        for (const child of children) {
          try {
            await this.app.vault.delete(child, true);
          } catch {
            // 删除失败跳过
          }
        }
      }
    } else {
      await this.ensureFolder(rulesDir);
    }

    // 恢复 version.json
    const prevVersionExists = await this.app.vault.adapter.exists(prevVersionFile);
    if (prevVersionExists) {
      try {
        const versionContent = await this.app.vault.adapter.read(prevVersionFile);
        await this.app.vault.adapter.write(this.getVersionFilePath(), versionContent);
      } catch {
        // 恢复 version.json 失败,继续尝试恢复 rules
      }
    }

    // 恢复 rules 目录
    const prevRulesExist = await this.app.vault.adapter.exists(prevRulesDir);
    if (prevRulesExist) {
      const prevRulesFolder = this.app.vault.getAbstractFileByPath(prevRulesDir);
      if (prevRulesFolder instanceof TFolder) {
        let restoredCount = 0;
        for (const child of prevRulesFolder.children) {
          if (child instanceof TFile) {
            try {
              const content = await this.app.vault.read(child);
              await this.app.vault.adapter.write(
                normalizePath(`${rulesDir}/${child.name}`),
                content
              );
              restoredCount++;
            } catch {
              // 单个文件恢复失败,跳过
            }
          }
        }
        // 至少恢复一个文件才认为回滚成功
        if (restoredCount === 0) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * 清理旧的备份数据
   * 在创建新备份前调用,避免 prev 目录累积多层历史
   */
  async clearPrevBackup(): Promise<void> {
    const prevDir = this.getPrevDir();
    const exists = await this.app.vault.adapter.exists(prevDir);
    if (!exists) return;

    const folder = this.app.vault.getAbstractFileByPath(prevDir);
    if (!(folder instanceof TFolder)) return;

    const children = [...folder.children];
    for (const child of children) {
      try {
        await this.app.vault.delete(child, true);
      } catch {
        // 删除失败跳过
      }
    }
  }
}
