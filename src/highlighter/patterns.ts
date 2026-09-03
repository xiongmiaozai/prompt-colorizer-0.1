/**
 * 提示词着色插件 — 提示词模式匹配引擎
 * 定义所有提示词语法模式的正则表达式
 */

/**
 * 提示词语法模式定义
 * 每个模式包含：正则、捕获组映射、CSS 类名
 */

/** 角色标签模式：<system>...</system> */
export const ROLE_TAG_PATTERNS: Record<string, {
  openTag: RegExp;
  closeTag: RegExp;
  cssClass: string;
  role: string;
}> = {
  system: {
    openTag: /<system>/gi,
    closeTag: /<\/system>/gi,
    cssClass: 'pc-role-system',
    role: 'system',
  },
  user: {
    openTag: /<user>/gi,
    closeTag: /<\/user>/gi,
    cssClass: 'pc-role-user',
    role: 'user',
  },
  assistant: {
    openTag: /<assistant>/gi,
    closeTag: /<\/assistant>/gi,
    cssClass: 'pc-role-assistant',
    role: 'assistant',
  },
  tool: {
    openTag: /<tool>/gi,
    closeTag: /<\/tool>/gi,
    cssClass: 'pc-role-tool',
    role: 'tool',
  },
};

/** 角色标题模式：### System / ### User / ### Assistant */
export const ROLE_HEADER_PATTERNS: { regex: RegExp; cssClass: string; role: string }[] = [
  { regex: /^#{1,6}\s*(?:system|系统)\s*$/gmi, cssClass: 'pc-role-system', role: 'system' },
  { regex: /^#{1,6}\s*(?:user|用户)\s*$/gmi, cssClass: 'pc-role-user', role: 'user' },
  { regex: /^#{1,6}\s*(?:assistant|助手|AI)\s*$/gmi, cssClass: 'pc-role-assistant', role: 'assistant' },
  { regex: /^#{1,6}\s*(?:tool|工具)\s*$/gmi, cssClass: 'pc-role-tool', role: 'tool' },
];

/** 指令标记模式：[INST]...[/INST] */
export const INSTRUCTION_PATTERNS: { regex: RegExp; cssClass: string }[] = [
  { regex: /\[INST\]/gi, cssClass: 'pc-instruction-open' },
  { regex: /\[\/INST\]/gi, cssClass: 'pc-instruction-close' },
  { regex: /\[SYS\]/gi, cssClass: 'pc-instruction-open' },
  { regex: /\[\/SYS\]/gi, cssClass: 'pc-instruction-close' },
];

/** 变量占位符模式 */
export const VARIABLE_PATTERNS: { regex: RegExp; cssClass: string; name: string }[] = [
  // {{variable}}
  { regex: /\{\{([^}]+)\}\}/g, cssClass: 'pc-variable', name: 'mustache' },
  // ${variable}
  { regex: /\$\{([^}]+)\}/g, cssClass: 'pc-variable', name: 'dollar-brace' },
  // <|variable|>
  { regex: /<\|([^|]+)\|>/g, cssClass: 'pc-variable', name: 'pipe' },
  // [VARIABLE_NAME]（全大写，至少3字符）
  { regex: /\[([A-Z][A-Z_]{2,})\]/g, cssClass: 'pc-variable', name: 'bracket-upper' },
];

/** 注释模式 */
export const COMMENT_PATTERNS: { regex: RegExp; cssClass: string }[] = [
  // HTML 注释 <!-- -->
  { regex: /<!--[\s\S]*?-->/g, cssClass: 'pc-comment' },
  // 行内注释 %%...%%（Obsidian 注释语法）
  { regex: /%%[\s\S]*?%%/g, cssClass: 'pc-comment' },
];

/** 代码块模式 */
export const CODE_BLOCK_PATTERNS = {
  // 围栏代码块开始 ```language
  fenceOpen: /^(`{3,}|~{3,})(\w+)?\s*$/gm,
  // 围栏代码块结束
  fenceClose: /^(`{3,}|~{3,})\s*$/gm,
  // JSON 代码块
  jsonBlock: /^(`{3,}|~{3,})(json|JSON)\s*$/gm,
};

/** 行内代码模式 */
export const INLINE_CODE_PATTERN = /`([^`\n]+)`/g;

/** Frontmatter 模式 */
export const FRONTMATTER_PATTERN = /^---\n([\s\S]*?)\n---/;

/**
 * 匹配结果类型
 */
export interface MatchResult {
  /** 起始位置 */
  from: number;
  /** 结束位置 */
  to: number;
  /** CSS 类名 */
  cssClass: string;
  /** 是否为块级装饰 */
  block: boolean;
}

/**
 * 在文本中查找所有角色标签的匹配
 */
export function findRoleTags(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  for (const [, pattern] of Object.entries(ROLE_TAG_PATTERNS)) {
    // 开标签
    let match: RegExpExecArray | null;
    const openRegex = new RegExp(pattern.openTag.source, pattern.openTag.flags);
    while ((match = openRegex.exec(text)) !== null) {
      results.push({
        from: match.index,
        to: match.index + match[0].length,
        cssClass: pattern.cssClass + '-tag',
        block: false,
      });
    }
    // 闭标签
    const closeRegex = new RegExp(pattern.closeTag.source, pattern.closeTag.flags);
    while ((match = closeRegex.exec(text)) !== null) {
      results.push({
        from: match.index,
        to: match.index + match[0].length,
        cssClass: pattern.cssClass + '-tag',
        block: false,
      });
    }
  }

  return results;
}

/**
 * 在文本中查找角色标题的匹配
 */
export function findRoleHeaders(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  for (const pattern of ROLE_HEADER_PATTERNS) {
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      results.push({
        from: match.index,
        to: match.index + match[0].length,
        cssClass: pattern.cssClass + '-header',
        block: true,
      });
    }
  }

  return results;
}

/**
 * 在文本中查找指令标记
 */
export function findInstructionMarkers(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  for (const pattern of INSTRUCTION_PATTERNS) {
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      results.push({
        from: match.index,
        to: match.index + match[0].length,
        cssClass: pattern.cssClass,
        block: false,
      });
    }
  }

  return results;
}

/**
 * 在文本中查找变量占位符
 */
export function findVariables(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  for (const pattern of VARIABLE_PATTERNS) {
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      results.push({
        from: match.index,
        to: match.index + match[0].length,
        cssClass: pattern.cssClass,
        block: false,
      });
    }
  }

  return results;
}

/**
 * 在文本中查找注释
 */
export function findComments(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  for (const pattern of COMMENT_PATTERNS) {
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      results.push({
        from: match.index,
        to: match.index + match[0].length,
        cssClass: pattern.cssClass,
        block: false,
      });
    }
  }

  return results;
}

/**
 * 在文本中查找代码块（返回代码块范围）
 */
export function findCodeBlocks(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];
  const lines = text.split('\n');

  let inBlock = false;
  let blockStart = 0;
  let blockLang = '';
  let offset = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineStart = offset;
    const lineEnd = offset + line.length;

    if (!inBlock) {
      // 检查是否为代码块开始
      const openMatch = /^(`{3,}|~{3,})(\w+)?\s*$/.exec(line);
      if (openMatch) {
        inBlock = true;
        blockStart = lineStart;
        blockLang = openMatch[2] || '';

        // 标记开始行
        const isJson = blockLang.toLowerCase() === 'json';
        results.push({
          from: lineStart,
          to: lineEnd,
          cssClass: isJson ? 'pc-codeblock-json-open' : 'pc-codeblock-open',
          block: true,
        });
      }
    } else {
      // 检查是否为代码块结束
      const closeMatch = /^(`{3,}|~{3,})\s*$/.exec(line);
      if (closeMatch) {
        inBlock = false;
        // 标记内容行
        const isJson = blockLang.toLowerCase() === 'json';
        results.push({
          from: lineStart,
          to: lineEnd,
          cssClass: isJson ? 'pc-codeblock-json-close' : 'pc-codeblock-close',
          block: true,
        });
        blockLang = '';
      } else {
        // 代码块内容行
        const isJson = blockLang.toLowerCase() === 'json';
        results.push({
          from: lineStart,
          to: lineEnd,
          cssClass: isJson ? 'pc-codeblock-json-content' : 'pc-codeblock-content',
          block: true,
        });
      }
    }

    offset = lineEnd + 1; // +1 for newline
  }

  return results;
}

/**
 * 在文本中查找行内代码
 */
export function findInlineCode(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  const regex = new RegExp(INLINE_CODE_PATTERN.source, INLINE_CODE_PATTERN.flags);
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-inline-code',
      block: false,
    });
  }

  return results;
}

// ============================================================
// 视频提示词模式匹配（区段/分镜/资源引用/字段/台词等）
// ============================================================

/** 区段标记模式：【整体设定】【分镜设计】 */
export function findSectionMarkers(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];
  const regex = /【([^】]+)】/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-section-marker',
      block: false,
    });
  }
  return results;
}

/** 分镜标题模式：镜头1（3秒） 镜头2（4秒） Shot 1 */
export function findShotHeaders(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];
  // 匹配 "镜头N" 或 "Shot N" 及后续的时长括号
  const regex = /(?:镜头|Shot|shot|SHOT)\s*(\d+)(\s*[（(]\s*\d+\.?\d*\s*(?:秒|s|S|Sec|sec)\s*[）)])?/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-shot-header',
      block: false,
    });
  }
  return results;
}

/**
 * 资源引用模式：@图1(安德烈) @图2(简)-参考图服装 [@图1(安德烈)-参考图服装]
 * 音频引用模式：@音频1 @音频2（单独高亮为音频色）
 */
export function findAssetRefs(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 图片/资源引用：@图N(名称) 或 @资源名(标签) 或 @资源名-子资源
  // 匹配 @后跟非空白字符，可包含括号标签和方括号
  const assetRegex = /@(图\d+|视频\d+|文件\d+|资源\d+|asset\d+)(\([^)]*\))?(-[^\s，。、,.)）\]]+)?/gi;
  let match: RegExpExecArray | null;
  while ((match = assetRegex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-asset-ref',
      block: false,
    });
  }

  // 方括号内的资源引用：[@图1(安德烈)-参考图服装]
  const bracketAssetRegex = /\[(@[^\]]+)\]/g;
  while ((match = bracketAssetRegex.exec(text)) !== null) {
    // 整个方括号范围
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-asset-bracket',
      block: false,
    });
  }

  return results;
}

/**
 * 音频引用模式：@音频1 @音频2
 * 音色 @音频1
 */
export function findAudioRefs(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // @音频N 引用
  const audioRegex = /@音频\s*(\d+)/g;
  let match: RegExpExecArray | null;
  while ((match = audioRegex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-audio-ref',
      block: false,
    });
  }

  // "音色" 前缀标签
  const toneRegex = /音色\s*/g;
  while ((match = toneRegex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-audio-tone',
      block: false,
    });
  }

  // "音效：" 字段标签
  const sfxRegex = /音效[：:]/g;
  while ((match = sfxRegex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-audio-sfx',
      block: false,
    });
  }

  return results;
}

/**
 * 字段标签模式：景别：运镜：光影：台词：焦点变化：等
 * 匹配中文字段名后跟冒号
 */
export function findFieldLabels(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 已知的提示词字段名
  const knownFields = [
    '资产绑定', '色温', '镜头设计', '景别策略',
    '人物与场景位置关系', '人物与镜头位置关系',
    '现场拍摄注意', '景别', '拍摄角度', '运镜',
    '焦点变化', '光影', '台词', '音效',
    '精细人物动作描述', '演员专属微表情提示词',
    '镜头呼吸感',
  ];

  // 构建正则：字段名 + 可选限定符(如"（全段锁定）") + 中文/英文冒号
  const fieldPattern = knownFields
    .map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  // 匹配已知字段名，可选跟随括号限定符，再跟冒号
  const regex = new RegExp(`(${fieldPattern})(?:\\s*[（(][^）)]*[）)])?\\s*[：:]`, 'g');
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-field-label',
      block: false,
    });
  }

  // 通用模式：任意2-10个中文字符 + 可选括号限定符 + 冒号（捕获未知字段名）
  const genericRegex = /([\u4e00-\u9fa5]{2,10})(?:\s*[（(][^）)]*[）)])?\s*[：:](?!\s*")/g;
  while ((match = genericRegex.exec(text)) !== null) {
    // 避免与已知字段重复
    const isDuplicate = results.some(
      (r) => r.from === match!.index
    );
    if (!isDuplicate) {
      results.push({
        from: match.index,
        to: match.index + match[0].length,
        cssClass: 'pc-field-label-generic',
        block: false,
      });
    }
  }

  return results;
}

/**
 * 台词内容模式：说："..." 或 台词：后的引号内容
 * 支持中文引号 ""、「」和英文引号 "..."
 */
export function findDialogue(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 中文引号内容："..."  「...」
  const cnRegex = /[""「]([^""」]+)[""」]/g;
  let match: RegExpExecArray | null;
  while ((match = cnRegex.exec(text)) !== null) {
    // 仅高亮引号内的内容
    const innerStart = match.index + 1; // 跳过开引号
    const innerEnd = match.index + match[0].length - 1; // 跳过闭引号
    results.push({
      from: innerStart,
      to: innerEnd,
      cssClass: 'pc-dialogue',
      block: false,
    });
  }

  // 英文引号内容："..."（仅匹配 "说：" 后面的，或行首的英文引号内容）
  // 避免误匹配普通英文文本中的引号
  const enRegex = /(?:说[：:]\s*|^[ \t]*|,\s*)"([^"\n]+)"/gm;
  while ((match = enRegex.exec(text)) !== null) {
    const innerStart = match.index + match[0].length - match[1].length - 1;
    const innerEnd = match.index + match[0].length - 1;
    results.push({
      from: innerStart,
      to: innerEnd,
      cssClass: 'pc-dialogue',
      block: false,
    });
  }

  return results;
}

/**
 * 排除/禁止规则模式：排除... 禁止... 杜绝...
 */
export function findNegativePrompts(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 匹配排除/禁止/杜绝/不得/不允许 开头的句子（到句号或行尾）
  const regex = /(?:排除|禁止|杜绝|不得|不允许|严禁|避免|切勿|勿要)[^。.\n]*[。.]?/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-negative-prompt',
      block: false,
    });
  }

  return results;
}

/**
 * 技术参数模式：3200K 3秒 4秒 2.5秒 等
 */
export function findTechParams(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 色温：数字+K
  const tempRegex = /\d{3,5}K/g;
  let match: RegExpExecArray | null;
  while ((match = tempRegex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-tech-param',
      block: false,
    });
  }

  // 时长：数字+秒/s
  const durationRegex = /\d+\.?\d*\s*(?:秒|s|S)/g;
  while ((match = durationRegex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-tech-param',
      block: false,
    });
  }

  // 分辨率：1920x1080 4K 8K
  const resRegex = /\d{3,4}\s*[x×]\s*\d{3,4}|[48]K/g;
  while ((match = resRegex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-tech-param',
      block: false,
    });
  }

  return results;
}

/**
 * 括号注释模式：（粗俗、戏谑）（气场示威）（3秒）
 * 注意：需要排除分镜时长括号（已由 findShotHeaders 处理）
 */
export function findParentheticals(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 中文括号 （...）
  const regex = /（([^）]+)）/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    // 跳过纯数字时长（如（3秒）由 techParam 处理）
    if (/^\d+\.?\d*\s*秒$/.test(match[1])) continue;
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-parenthetical',
      block: false,
    });
  }

  // 英文括号 (...)（仅提示词上下文中的）
  const enRegex = /\(([^)]+)\)/g;
  while ((match = enRegex.exec(text)) !== null) {
    if (/^\d+\.?\d*\s*s?$/i.test(match[1])) continue;
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-parenthetical',
      block: false,
    });
  }

  return results;
}

// ============================================================
// SD/ComfyUI 扩展模式匹配
// ============================================================

/**
 * 权重标记模式：(text:1.3) (text:0.8)
 * Stable Diffusion / ComfyUI 风格的权重调整语法
 */
export function findEmphasisWeights(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 匹配 (text:1.3) 格式 — 文本 + 冒号 + 数字权重
  const regex = /\(([^()]+):(\d+\.?\d*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-emphasis-weight',
      block: false,
    });
  }

  return results;
}

/**
 * Lora/模型引用模式：<lora:name:0.8> <model:name> <lyco:name>
 * Stable Diffusion WebUI 风格的模型引用语法
 */
export function findLoraRefs(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 匹配 <lora:name:weight> <model:name> <lyco:name:weight> <embedding:name>
  const regex = /<(lora|model|lyco|embedding|hypernet):([^:>]+)(?::(\d+\.?\d*))?>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-lora-ref',
      block: false,
    });
  }

  return results;
}

/**
 * 括号强调模式：(text) ((text)) [text] {text}
 * SD 风格的强调/弱化语法（不含权重的纯括号包裹）
 * 注意：仅匹配连续括号包裹的短文本，避免误匹配
 */
export function findBracketEmphasis(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 多重圆括号强调：((text)) (((text)))
  const multiParenRegex = /(\({2,})([^()]+)(\){2,})/g;
  let match: RegExpExecArray | null;
  while ((match = multiParenRegex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-bracket-emphasis-strong',
      block: false,
    });
  }

  // 单层方括号弱化：[text]（非资源引用、非指令标记）
  const bracketRegex = /\[([a-zA-Z\u4e00-\u9fa5][^\[\]]{1,30})\]/g;
  while ((match = bracketRegex.exec(text)) !== null) {
    // 跳过已被其他模式匹配的范围（如 [@图1] 资源引用）
    const inner = match[1];
    if (inner.startsWith('@')) continue;
    // 跳过 [INST] [SYS] 等指令标记
    if (/^(INST|SYS|\/INST|\/SYS)$/i.test(inner)) continue;
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-bracket-emphasis-weak',
      block: false,
    });
  }

  return results;
}

/**
 * 质量标签模式：masterpiece, best quality, highly detailed 等
 * SD 风格的质量增强标签
 */
export function findQualityTags(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  const qualityKeywords = [
    'masterpiece', 'best quality', 'high quality', 'ultra detailed',
    'highly detailed', 'extremely detailed', '8k', '4k', '8K', '4K',
    'highres', 'absurdres', 'original', 'extremely high quality',
    'amazing quality', 'very aesthetic', 'aesthetic',
  ];

  // 构建正则：词边界匹配
  const pattern = qualityKeywords
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-quality-tag',
      block: false,
    });
  }

  return results;
}

/**
 * SD 负面提示词头模式：Negative prompt: 
 * Stable Diffusion WebUI 风格的负面提示词分隔标记
 */
export function findSdNegativeHeader(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 匹配 "Negative prompt:" 或 "负面提示词：" 开头的行
  const regex = /^(Negative prompt|负面提示词|负面提示)\s*[：:]\s*/gmi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-sd-negative-header',
      block: true,
    });
  }

  return results;
}

// ============================================================
// 视频提示词扩展模式匹配
// ============================================================

/**
 * 镜头运动术语模式：推镜头、拉镜头、摇镜头、跟镜头、移镜头、升降镜头
 * 微推镜头、短促轻推、轻微后拉 等变体
 */
export function findCameraMoves(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  // 中文镜头运动术语
  const cnMoves = [
    '推镜头', '拉镜头', '摇镜头', '跟镜头', '移镜头', '升降镜头',
    '微推镜头', '短促轻推', '轻微后拉', '微摇镜头', '缓慢推镜头',
    '快速推镜头', '环绕镜头', '旋转镜头', '俯仰镜头', '横移镜头',
    '纵移镜头', '弧形运动', '微固定',
  ];

  // 英文镜头运动术语
  const enMoves = [
    'push in', 'pull back', 'pan left', 'pan right', 'tilt up', 'tilt down',
    'zoom in', 'zoom out', 'tracking shot', 'dolly shot', 'crane shot',
    'handheld', 'steady cam', 'steady-cam', 'drone shot', 'aerial shot',
    'orbit shot', 'rotate shot', 'rack focus', 'whip pan',
  ];

  const allMoves = [...cnMoves, ...enMoves];
  const pattern = allMoves
    .map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-camera-move',
      block: false,
    });
  }

  return results;
}

/**
 * 转场标记模式：转场、淡入、淡出、叠化、划像、硬切
 */
export function findSceneTransitions(text: string, enabled: boolean): MatchResult[] {
  if (!enabled) return [];
  const results: MatchResult[] = [];

  const transitions = [
    '转场', '淡入', '淡出', '叠化', '划像', '硬切', '闪白', '闪黑',
    '溶解', '渐变', 'fade in', 'fade out', 'dissolve', 'wipe', 'cut to',
    'smash cut', 'jump cut', 'match cut', 'cross dissolve',
  ];

  const pattern = transitions
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      from: match.index,
      to: match.index + match[0].length,
      cssClass: 'pc-scene-transition',
      block: false,
    });
  }

  return results;
}

/**
 * 收集所有匹配结果（按优先级排序，处理重叠）
 */
export function collectAllMatches(
  text: string,
  settings: {
    // 基础模式
    highlightVariables: boolean;
    highlightRoleTags: boolean;
    highlightRoleHeaders: boolean;
    highlightInstructionMarkers: boolean;
    highlightComments: boolean;
    highlightCodeBlocks: boolean;
    highlightJsonBlocks: boolean;
    highlightInlineCode: boolean;
    // 视频提示词模式
    highlightSectionMarkers: boolean;
    highlightShotHeaders: boolean;
    highlightAssetRefs: boolean;
    highlightFieldLabels: boolean;
    highlightDialogue: boolean;
    highlightAudioRefs: boolean;
    highlightNegativePrompts: boolean;
    highlightTechParams: boolean;
    highlightParentheticals: boolean;
    // SD/ComfyUI 扩展模式
    highlightEmphasisWeights: boolean;
    highlightLoraRefs: boolean;
    highlightBracketEmphasis: boolean;
    highlightQualityTags: boolean;
    highlightSdNegativeHeader: boolean;
    // 视频提示词扩展模式
    highlightCameraMoves: boolean;
    highlightSceneTransitions: boolean;
  }
): MatchResult[] {
  let results: MatchResult[] = [];

  // === 优先级1：代码块（避免代码块内容被其他规则匹配）===
  results.push(...findCodeBlocks(text, settings.highlightCodeBlocks || settings.highlightJsonBlocks));

  // === 优先级2：注释 ===
  results.push(...findComments(text, settings.highlightComments));

  // === 优先级3：区段标记【】===
  results.push(...findSectionMarkers(text, settings.highlightSectionMarkers));

  // === 优先级4：排除/禁止规则（整句） ===
  results.push(...findNegativePrompts(text, settings.highlightNegativePrompts));

  // === 优先级4.5：SD 负面提示词头（行级标记） ===
  results.push(...findSdNegativeHeader(text, settings.highlightSdNegativeHeader));

  // === 优先级5：角色标签和标题 ===
  results.push(...findRoleTags(text, settings.highlightRoleTags));
  results.push(...findRoleHeaders(text, settings.highlightRoleHeaders));

  // === 优先级5.5：Lora/模型引用（尖括号语法，优先于变量占位符） ===
  results.push(...findLoraRefs(text, settings.highlightLoraRefs));

  // === 优先级6：分镜标题 ===
  results.push(...findShotHeaders(text, settings.highlightShotHeaders));

  // === 优先级6.5：镜头运动术语 ===
  results.push(...findCameraMoves(text, settings.highlightCameraMoves));

  // === 优先级6.6：转场标记 ===
  results.push(...findSceneTransitions(text, settings.highlightSceneTransitions));

  // === 优先级7：字段标签 ===
  results.push(...findFieldLabels(text, settings.highlightFieldLabels));

  // === 优先级8：台词内容（引号内） ===
  results.push(...findDialogue(text, settings.highlightDialogue));

  // === 优先级9：资源引用和音频引用 ===
  results.push(...findAssetRefs(text, settings.highlightAssetRefs));
  results.push(...findAudioRefs(text, settings.highlightAudioRefs));

  // === 优先级9.5：权重标记 (text:1.3) ===
  results.push(...findEmphasisWeights(text, settings.highlightEmphasisWeights));

  // === 优先级9.6：括号强调 ((text)) [text] ===
  results.push(...findBracketEmphasis(text, settings.highlightBracketEmphasis));

  // === 优先级10：技术参数 ===
  results.push(...findTechParams(text, settings.highlightTechParams));

  // === 优先级10.5：质量标签 ===
  results.push(...findQualityTags(text, settings.highlightQualityTags));

  // === 优先级11：括号注释 ===
  results.push(...findParentheticals(text, settings.highlightParentheticals));

  // === 优先级12：基础模式 ===
  results.push(...findInstructionMarkers(text, settings.highlightInstructionMarkers));
  results.push(...findVariables(text, settings.highlightVariables));
  results.push(...findInlineCode(text, settings.highlightInlineCode));

  // 按位置排序
  results.sort((a, b) => a.from - b.from || b.to - a.to);

  // 移除重叠的匹配（保留先出现的，即高优先级的）
  const filtered: MatchResult[] = [];
  let lastEnd = -1;
  for (const r of results) {
    if (r.from >= lastEnd) {
      filtered.push(r);
      lastEnd = r.to;
    }
  }

  return filtered;
}
