/**
 * 包管理模块共用工具函数（v5）
 */

/** 语义化版本比较：a > b 返回 1，a < b 返回 -1，相等 0 */
export function compareSemver(a: string, b: string): number {
  const pa = String(a || '').split('.').map((n) => parseInt(n, 10) || 0);
  const pb = String(b || '').split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] ?? 0) > (pb[i] ?? 0)) return 1;
    if ((pa[i] ?? 0) < (pb[i] ?? 0)) return -1;
  }
  return 0;
}

/** 生成全新资源 ID（导入 ID 冲突重生成 / 克隆深拷贝） */
export function generateResourceIdSafe(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}