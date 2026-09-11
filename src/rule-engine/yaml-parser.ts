/**
 * 轻量级 YAML 解析器
 * 不依赖外部库，支持项目所需的 YAML 语法子集：
 * - 键值对（含引号字符串）
 * - 数组（- item 语法和 [a, b] 内联语法）
 * - 嵌套对象（缩进）
 * - 注释（# 开头）
 * - 正则表达式字符串（单引号包裹）
 */

/** YAML 解析结果 */
export type YamlValue = string | number | boolean | YamlValue[] | { [key: string]: YamlValue };

/**
 * 解析 YAML 字符串为 JavaScript 对象
 * 支持有限语法子集，足够解析项目的 5 个规则配置文件
 */
export function parseYaml(text: string): YamlValue {
  // 移除 BOM 头
  const cleaned = text.replace(/^\uFEFF/, '');
  // 按行分割，过滤空行和注释行
  const lines: string[] = [];
  for (const rawLine of cleaned.split('\n')) {
    const trimmed = rawLine.replace(/\r$/, '');
    // 跳过空行和纯注释行
    if (trimmed.trim() === '' || /^\s*#/.test(trimmed)) continue;
    // 移除行内注释（但不清除引号内的 #）
    const decommented = stripInlineComment(trimmed);
    if (decommented.trim() === '') continue;
    lines.push(decommented);
  }

  const parser = new YamlLineParser(lines);
  return parser.parseObject(0);
}

/**
 * 移除行内注释（# 后面的内容），但保留引号内的 #
 */
function stripInlineComment(line: string): string {
  let inSingleQuote = false;
  let inDoubleQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === "'" && !inDoubleQuote) inSingleQuote = !inSingleQuote;
    else if (ch === '"' && !inSingleQuote) inDoubleQuote = !inDoubleQuote;
    else if (ch === '#' && !inSingleQuote && !inDoubleQuote) {
      // 检查 # 前面是否有空格（YAML 注释要求 # 前有空格或在行首）
      if (i === 0 || /\s/.test(line[i - 1])) {
        return line.slice(0, i);
      }
    }
  }
  return line;
}

/**
 * 获取行的缩进空格数
 */
function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

/**
 * 去除值字符串的引号包裹
 */
function unquote(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    // 单引号转义：'' → '
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    // 双引号支持转义
    return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  }
  return trimmed;
}

/**
 * 解析标量值（字符串、数字、布尔）
 */
function parseScalar(value: string): string | number | boolean {
  const trimmed = value.trim();

  // 带引号的字符串
  if ((trimmed.startsWith("'") && trimmed.endsWith("'")) ||
      (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
    return unquote(trimmed);
  }

  // 布尔值
  if (trimmed === 'true' || trimmed === 'True' || trimmed === 'TRUE') return true;
  if (trimmed === 'false' || trimmed === 'False' || trimmed === 'FALSE') return false;
  if (trimmed === 'null' || trimmed === 'Null' || trimmed === '~') return '' as any;

  // 数字
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);

  // 普通字符串
  return trimmed;
}

/**
 * 解析内联数组 [a, b, c]
 */
function parseInlineArray(value: string): YamlValue[] {
  const trimmed = value.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    return [parseScalar(trimmed)];
  }
  const inner = trimmed.slice(1, -1);
  if (inner.trim() === '') return [];

  // 按逗号分割（处理引号内的逗号）
  const items: string[] = [];
  let current = '';
  let inQuote = false;
  let quoteChar = '';
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (!inQuote && (ch === "'" || ch === '"')) {
      inQuote = true;
      quoteChar = ch;
      current += ch;
    } else if (inQuote && ch === quoteChar) {
      inQuote = false;
      current += ch;
    } else if (ch === ',' && !inQuote) {
      items.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) items.push(current);

  return items.map((item) => parseScalar(item));
}

/**
 * 在字符串中查找冒号位置（跳过引号内的冒号，要求冒号后跟空格或行尾）
 */
function findColonInString(s: string): number {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (ch === ':' && !inSingle && !inDouble) {
      if (i === s.length - 1 || s[i + 1] === ' ' || s[i + 1] === '\t') {
        return i;
      }
    }
  }
  return -1;
}

/**
 * 解析内联对象 { key: value, key2: value2 }
 * 支持 YAML inline map 语法，值可递归为内联数组/对象/标量
 */
function parseInlineMap(value: string): { [key: string]: YamlValue } {
  const trimmed = value.trim();
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
    return {};
  }
  const inner = trimmed.slice(1, -1);
  if (inner.trim() === '') return {};

  // 按逗号分割（处理引号内逗号）
  const items: string[] = [];
  let current = '';
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === "'" && !inDouble) { inSingle = !inSingle; current += ch; }
    else if (ch === '"' && !inSingle) { inDouble = !inDouble; current += ch; }
    else if (ch === ',' && !inSingle && !inDouble) { items.push(current); current = ''; }
    else current += ch;
  }
  if (current.trim()) items.push(current);

  const result: { [key: string]: YamlValue } = {};
  for (const item of items) {
    const colonIdx = findColonInString(item);
    if (colonIdx > 0) {
      const key = item.slice(0, colonIdx).trim();
      const val = item.slice(colonIdx + 1).trim();
      if (val.startsWith('[')) {
        result[key] = parseInlineArray(val);
      } else if (val.startsWith('{')) {
        result[key] = parseInlineMap(val);
      } else {
        result[key] = parseScalar(val);
      }
    }
  }
  return result;
}

/**
 * 行解析器
 */
class YamlLineParser {
  private lines: string[];
  private pos: number = 0;

  constructor(lines: string[]) {
    this.lines = lines;
  }

  /**
   * 解析对象结构
   * @param minIndent 最小缩进级别
   * @returns 解析出的对象
   */
  parseObject(minIndent: number): { [key: string]: YamlValue } {
    const result: { [key: string]: YamlValue } = {};

    while (this.pos < this.lines.length) {
      const line = this.lines[this.pos];
      const indent = getIndent(line);

      // 缩进小于最小值，结束当前层级
      if (indent < minIndent) break;

      // 缩进大于最小值，跳过（应由子解析器处理）
      if (indent > minIndent) {
        this.pos++;
        continue;
      }

      // 解析键值对
      const content = line.slice(indent);
      const colonIdx = this.findColon(content);

      if (colonIdx === -1) {
        // 不是键值对，跳过
        this.pos++;
        continue;
      }

      const key = content.slice(0, colonIdx).trim();
      const valueStr = content.slice(colonIdx + 1).trim();

      if (valueStr === '') {
        // 值为空，可能是嵌套对象或数组
        this.pos++;
        const nextIndent = this.peekNextIndent();

        if (nextIndent > indent) {
          // 嵌套结构 — 传入子层的实际缩进而非 indent+1
          const nextLine = this.lines[this.pos];
          if (nextLine && nextLine.trim().startsWith('-')) {
            // 数组
            result[key] = this.parseArray(nextIndent);
          } else {
            // 嵌套对象
            result[key] = this.parseObject(nextIndent);
          }
        } else {
          // 空值
          result[key] = '';
        }
      } else if (valueStr.startsWith('[')) {
        // 内联数组
        result[key] = parseInlineArray(valueStr);
        this.pos++;
      } else if (valueStr.startsWith('{')) {
        // 内联对象（inline map）
        result[key] = parseInlineMap(valueStr);
        this.pos++;
      } else {
        // 标量值
        result[key] = parseScalar(valueStr);
        this.pos++;
      }
    }

    return result;
  }


  /**
   * 解析数组结构
   * @param minIndent 最小缩进级别
   */
  parseArray(minIndent: number): YamlValue[] {
    const result: YamlValue[] = [];

    while (this.pos < this.lines.length) {
      const line = this.lines[this.pos];
      const indent = getIndent(line);

      if (indent < minIndent) break;
      if (indent > minIndent) {
        this.pos++;
        continue;
      }

      const content = line.slice(indent);
      if (!content.startsWith('-')) break;

      // 提取 - 后的内容
      const itemStr = content.slice(1).trim();

      if (itemStr === '') {
        // - 后为空，可能是嵌套结构
        this.pos++;
        const nextIndent = this.peekNextIndent();
        if (nextIndent > indent) {
          result.push(this.parseObject(nextIndent));
        } else {
          result.push('');
        }
      } else if (itemStr.includes(':') && !itemStr.startsWith("'") && !itemStr.startsWith('"')) {
        // - key: value 格式（数组项是对象）
        const colonIdx = this.findColon(itemStr);
        if (colonIdx > 0) {
          const key = itemStr.slice(0, colonIdx).trim();
          const val = itemStr.slice(colonIdx + 1).trim();
          const obj: { [key: string]: YamlValue } = {};
          if (val === '') {
            // 嵌套
            this.pos++;
            const nextIndent = this.peekNextIndent();
            if (nextIndent > indent + 2) {
              obj[key] = this.parseObject(nextIndent);
            } else {
              obj[key] = '';
            }
          } else if (val.startsWith('[')) {
            obj[key] = parseInlineArray(val);
            this.pos++;
          } else if (val.startsWith('{')) {
            obj[key] = parseInlineMap(val);
            this.pos++;
          } else {
            obj[key] = parseScalar(val);
            this.pos++;
          }
          // 继续解析同一数组项的后续键
          while (this.pos < this.lines.length) {
            const nextLine = this.lines[this.pos];
            const nextIndent = getIndent(nextLine);
            if (nextIndent <= indent) break;
            if (nextLine.trim().startsWith('-')) break;
            const nextContent = nextLine.slice(nextIndent);
            const nextColon = this.findColon(nextContent);
            if (nextColon > 0) {
              const k = nextContent.slice(0, nextColon).trim();
              const v = nextContent.slice(nextColon + 1).trim();
              if (v === '') {
                this.pos++;
                const subIndent = this.peekNextIndent();
                if (subIndent > nextIndent) {
                  obj[k] = this.parseObject(subIndent);
                } else {
                  obj[k] = '';
                }
              } else if (v.startsWith('[')) {
                obj[k] = parseInlineArray(v);
                this.pos++;
              } else if (v.startsWith('{')) {
                obj[k] = parseInlineMap(v);
                this.pos++;
              } else {
                obj[k] = parseScalar(v);
                this.pos++;
              }
            } else {
              this.pos++;
            }
          }
          result.push(obj);
        } else {
          result.push(parseScalar(itemStr));
          this.pos++;
        }
      } else {
        // 简单标量数组项
        result.push(parseScalar(itemStr));
        this.pos++;
      }
    }

    return result;
  }

  /**
   * 查找冒号位置（跳过引号内的冒号）
   */
  private findColon(content: string): number {
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < content.length; i++) {
      const ch = content[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === ':' && !inSingle && !inDouble) {
        // 冒号后面必须是空格或行尾
        if (i === content.length - 1 || content[i + 1] === ' ' || content[i + 1] === '\t') {
          return i;
        }
      }
    }
    return -1;
  }

  /**
   * 查看下一行的缩进
   */
  private peekNextIndent(): number {
    if (this.pos >= this.lines.length) return -1;
    return getIndent(this.lines[this.pos]);
  }
}
