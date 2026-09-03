/**
 * 插件联动模块(P1-7)
 * 支持 Templater 与 Dataview 插件联动
 *
 * Templater 集成:注册 tp.prompt.section() / tp.prompt.shot() 等模板函数
 *   用户可在 Templater 模板中调用,快速插入提示词骨架
 *
 * Dataview 集成:为 DQL 查询结果表格按文件类型着色
 *   监听 Dataview 渲染事件,为表格行注入颜色标记
 */

import { App, Notice, TFile } from 'obsidian';
import type { PromptColorizerSettings, FileType } from '../types';
import { detectFileType, getFileTypeColor } from '../highlighter/file-colorizer';

/**
 * 联动管理器
 * 负责检测其他插件是否可用,并注册对应的联动能力
 */
export class IntegrationManager {
  constructor(
    private app: App,
    private settings: PromptColorizerSettings
  ) {}

  /**
   * 检测指定插件是否已安装并启用
   * @param pluginId 插件 ID(如 'templater-obsidian'、'dataview')
   * @returns 是否可用
   */
  private isPluginEnabled(pluginId: string): boolean {
    // Obsidian 内部 API:app.plugins.enabledPlugins 是 Set<string>
    const plugins = (this.app as any).plugins;
    if (!plugins) return false;
    return plugins.enabledPlugins?.has?.(pluginId) ?? false;
  }

  /**
   * 初始化所有联动
   * 在插件 onload 时调用,检测可用插件并注册对应能力
   */
  async initIntegrations(): Promise<void> {
    // Templater 联动
    if (this.isPluginEnabled('templater-obsidian')) {
      await this.registerTemplaterIntegration();
    }

    // Dataview 联动
    if (this.isPluginEnabled('dataview')) {
      this.registerDataviewIntegration();
    }
  }

  // ============================================================
  // Templater 联动
  // ============================================================

  /**
   * 注册 Templater 模板函数
   * 用户可在 Templater 模板中使用:
   *   <% tp.prompt.section("整体设定") %>
   *   <% tp.prompt.shot(1, 3) %>
   *   <% tp.prompt.role("system") %>
   *
   * Templater 通过 app.plugins.plugins['templater-obsidian'].templater 对象暴露
   * 我们向其注册自定义函数模块
   */
  private async registerTemplaterIntegration(): Promise<void> {
    try {
      const templater = (this.app as any).plugins?.plugins?.['templater-obsidian'];
      if (!templater) return;

      // 注册 prompt 函数模块到 Templater
      // Templater 的函数注册通过 templater.functions_parser.generated_user_functions 注入
      const promptModule = {
        // 插入区段标记 【sectionName】
        section: (sectionName: string): string => {
          return `【${sectionName}】`;
        },
        // 插入镜头标题 镜头N（M秒）
        shot: (shotNum: number, durationSec: number): string => {
          return `镜头${shotNum}（${durationSec}秒）`;
        },
        // 插入角色标签 <role>
        role: (role: string): string => {
          return `<${role}>`;
        },
        // 插入资源引用 @图N(描述)
        asset: (num: number, description: string): string => {
          return `@图${num}(${description})`;
        },
        // 插入字段标签 label:
        field: (label: string, value: string = ''): string => {
          return `${label}：${value}`;
        },
        // 插入完整分镜骨架
        storyboardSkeleton: (shotCount: number = 3): string => {
          const lines: string[] = ['【整体设定】', ''];
          for (let i = 1; i <= shotCount; i++) {
            lines.push(`镜头${i}（3秒）`);
            lines.push('景别：');
            lines.push('运镜：');
            lines.push('光影：');
            lines.push('画面：');
            lines.push('');
          }
          return lines.join('\n');
        },
      };

      // 将 prompt 模块注入到 Templater 的用户函数命名空间
      // Templater 通过 tp.<module>.<function> 访问
      if (templater.functions_parser) {
        templater.functions_parser.generated_user_functions =
          templater.functions_parser.generated_user_functions || {};
        templater.functions_parser.generated_user_functions.prompt = promptModule;
      }

      console.log('[PromptColorizer] Templater 联动已注册');
    } catch (err) {
      console.warn('[PromptColorizer] Templater 联动注册失败:', err);
    }
  }

  // ============================================================
  // Dataview 联动
  // ============================================================

  /**
   * 注册 Dataview 集成
   * 监听 Dataview 表格渲染,为每行根据对应文件类型注入颜色标记
   *
   * Dataview 通过触发 'dataview:refresh-views' 和 'dataview:metadata' 事件
   * 表格渲染后 DOM 中含 .dataview-table 类
   */
  private registerDataviewIntegration(): void {
    // 监听 Dataview 视图刷新事件
    this.app.workspace.on('layout-change', () => {
      this.colorizeDataviewTables();
    });

    // Dataview 异步渲染,延迟一帧后再处理
    // 注:'dataview:refresh-views' 为 Dataview 插件自定义事件,Obsidian 类型未导出
    this.app.workspace.on('dataview:refresh-views' as never, () => {
      setTimeout(() => this.colorizeDataviewTables(), 100);
    });

    console.log('[PromptColorizer] Dataview 联动已注册');
  }

  /**
   * 为当前所有 Dataview 表格注入文件类型颜色
   * 检测表格首列文件链接,根据其目标文件类型添加颜色圆点
   */
  private colorizeDataviewTables(): void {
    if (!this.settings.fileColorizerEnabled) return;

    // 查询所有 Dataview 表格
    const tables = document.querySelectorAll('.dataview-table');
    tables.forEach((table) => {
      const tableEl = table as HTMLElement;
      if (tableEl.dataset.pcDataviewProcessed === 'true') return;

      const rows = tableEl.querySelectorAll('tr');
      rows.forEach((row, idx) => {
        // 跳过表头
        if (idx === 0) return;

        const firstCell = row.querySelector('td');
        if (!firstCell) return;

        // 查找单元格内的文件链接
        const link = firstCell.querySelector('a.internal-link, a.data-link');
        if (!link) return;

        const linkEl = link as HTMLElement;
        // 获取链接目标文件路径(data-href 属性)
        const targetPath = linkEl.dataset.href || linkEl.getAttribute('data-href') || linkEl.textContent;
        if (!targetPath) return;

        const file = this.app.vault.getAbstractFileByPath(targetPath);
        if (!(file)) return;

        // 需要 TFile 实例
        const { TFile } = require('obsidian');
        if (!(file instanceof TFile)) return;

        const fileType = detectFileType(this.app, file as TFile, this.settings);
        if (fileType === 'none') return;

        const colorConfig = getFileTypeColor(fileType, this.settings);
        if (!colorConfig) return;

        // 在首列前插入颜色圆点
        if (!firstCell.querySelector('.pc-dataview-dot')) {
          const dot = firstCell.createEl('span', { cls: 'pc-dataview-dot' });
          dot.style.display = 'inline-block';
          dot.style.width = '6px';
          dot.style.height = '6px';
          dot.style.borderRadius = '50%';
          dot.style.backgroundColor = colorConfig.color;
          dot.style.marginRight = '6px';
          dot.style.flexShrink = '0';
          firstCell.insertBefore(dot, firstCell.firstChild);
        }
      });

      tableEl.dataset.pcDataviewProcessed = 'true';
    });
  }

  /**
   * 清理联动(插件卸载时调用)
   * 移除 Templater 注册的函数与 Dataview DOM 标记
   */
  cleanup(): void {
    // 清理 Dataview 表格标记
    document.querySelectorAll('.pc-dataview-dot').forEach((dot) => dot.remove());
    document.querySelectorAll('[data-pc-dataview-processed]').forEach((el) => {
      (el as HTMLElement).removeAttribute('data-pc-dataview-processed');
    });

    // Templater 函数清理(可选,Templater 卸载时自动清理)
    try {
      const templater = (this.app as any).plugins?.plugins?.['templater-obsidian'];
      if (templater?.functions_parser?.generated_user_functions?.prompt) {
        delete templater.functions_parser.generated_user_functions.prompt;
      }
    } catch {
      // 清理失败忽略
    }
  }
}
