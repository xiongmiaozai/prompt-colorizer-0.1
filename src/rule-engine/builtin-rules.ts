/**
 * 内置规则加载器
 * 将 YAML 规则文件内容嵌入 TypeScript，作为 Git 远程规则的本地降级方案
 * 当 ruleSource 为 'builtin' 或缓存不可用时自动使用
 *
 * 此文件由 scripts/sync-builtin-rules.mjs 自动生成，请勿手动修改
 * 修改规则请编辑 rules/ 目录下的 YAML 文件后运行同步脚本
 */

/** 内置规则版本信息（与 rules/version.json 同步） */
export const BUILTIN_VERSION = '2.7.0';
export const BUILTIN_UPDATE_TIME = '2026-07-24';

/** 01-base-patterns.yaml 内置内容 */
const BASE_PATTERNS_YAML = `# 基础结构正则规则（核心，无词典依赖）
# 新增格式仅追加节点，无需修改插件代码
# 包含：提示词语法 + Markdown 语法符号 + 操作标记
patterns:
  # ============================================================
  # 一、提示词语法匹配
  # ============================================================

  # 顶层章节块：【整体设定】【分镜设计】
  block_wrapper:
    regex: '【([^】]+)】'
    cssClass: "dsl-block-wrapper"
    captureGroup: 0
    priority: 30

  # 镜头标题：镜头1（3秒）、镜头3.5（2.5秒）
  shot_header:
    regex: '(?:镜头|Shot|shot|SHOT)\s*(\d+)\s*(?:[（(]\s*(\d+(?:-\d+)?\.?\d*\s*(?:秒|s|S|Sec|sec))?(?:\s*[｜|]\s*[^）)]*)?\s*[）)])?'
    cssClass: "dsl-shot-header"
    captureGroup: 0
    priority: 35

  # 资产引用：@图1(安德烈)、@音频1、@图1(安德烈)-参考图服装
  asset_ref:
    regex: '@(图\d+|视频\d+|文件\d+|资源\d+|asset\d+|音频\d+)(\([^)]*\))?(-[^\s，。、,.)）\]]+)?'
    cssClass: "dsl-asset"
    captureGroup: 0
    priority: 40

  # 方括号资源引用：[@图1(安德烈)-参考图服装]
  asset_bracket:
    regex: '\[(@[^\]]+)\]'
    cssClass: "dsl-asset-bracket"
    captureGroup: 0
    priority: 40

  # 键值参数：色温：、景别：、运镜：
  param_key:
    regex: '([\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]{2,10})(?:\s*[（(][^）)]*[）)])?\s*[：:](?!\s*")'
    cssClass: "dsl-param-key"
    captureGroup: 0
    priority: 40

  # 中文引号台词："..." 「...」
  dialogue_cn:
    regex: '[""「]([^""」]+)[""」]'
    cssClass: "dsl-dialogue"
    captureGroup: 0
    priority: 50

  # 英文引号台词（仅匹配 "说：" 后或行首的英文引号内容）
  dialogue_en:
    regex: '(?:说[：:]\s*|^[ \t]*|,\s*)"([^"\n]+)"'
    cssClass: "dsl-dialogue"
    captureGroup: 0
    priority: 50
    flags: 'gm'

  # 约束指令：禁止、排除、杜绝、保证、锁定、不得
  constraint:
    regex: '(?:排除|禁止|杜绝|不得|不允许|严禁|避免|切勿|勿要|保证|锁定|仅保留|严格)[^。.\n]*[。.]?'
    cssClass: "dsl-constraint"
    captureGroup: 0
    priority: 45

  # 技术参数：色温 3200K、时长 3秒、分辨率 1920x1080
  tech_param:
    regex: '\d{3,5}K|\d+\.?\d*\s*(?:秒|s|S)|\d{3,4}\s*[x×]\s*\d{3,4}|[48]K'
    cssClass: "dsl-tech-param"
    captureGroup: 0
    priority: 45

  # 括号注释：（粗俗、戏谑）（气场示威）
  parenthetical:
    regex: '（([^）]+)）'
    cssClass: "dsl-parenthetical"
    captureGroup: 0
    priority: 25

  # 变量占位符：{{variable}} \${variable} <|variable|>
  variable:
    regex: '\{\{([^}]+)\}\}|\$\{([^}]+)\}|<\|([^|]+)\|>'
    cssClass: "dsl-variable"
    captureGroup: 0
    priority: 20

  # 角色标签：<system> <user> <assistant> <tool>
  role_tag:
    regex: '<\/?(?:system|user|assistant|tool)>'
    cssClass: "dsl-role-tag"
    captureGroup: 0
    priority: 50
    flags: 'gi'

  # 指令标记：[INST] [/INST] [SYS]
  instruction:
    regex: '\[\/?(?:INST|SYS)\]'
    cssClass: "dsl-instruction"
    captureGroup: 0
    priority: 50
    flags: 'gi'

  # SD权重标记：(text:1.3)
  emphasis_weight:
    regex: '\(([^()]+):(\d+\.?\d*)\)'
    cssClass: "dsl-emphasis-weight"
    captureGroup: 0
    priority: 42

  # Lora/模型引用：<lora:name:0.8>
  lora_ref:
    regex: '<(?:lora|model|lyco|embedding|hypernet):[^:>]+(?::\d+\.?\d*)?>'
    cssClass: "dsl-lora-ref"
    captureGroup: 0
    priority: 48
    flags: 'gi'

  # 多重圆括号强调：((text)) (((text)))
  bracket_strong:
    regex: '(\({2,})([^()]+)(\){2,})'
    cssClass: "dsl-bracket-strong"
    captureGroup: 0
    priority: 38

  # 方括号弱化：[text]
  bracket_weak:
    regex: '\[([a-zA-Z\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff][^\[\]]{1,30})\]'
    cssClass: "dsl-bracket-weak"
    captureGroup: 0
    priority: 22

  # 质量标签：masterpiece, best quality
  quality_tag:
    regex: '\b(?:masterpiece|best quality|high quality|ultra detailed|highly detailed|extremely detailed|8k|4k|highres|absurdres|original|amazing quality|very aesthetic|aesthetic)\b'
    cssClass: "dsl-quality-tag"
    captureGroup: 0
    priority: 46
    flags: 'gi'

  # SD负面提示词头：Negative prompt:
  sd_negative_header:
    regex: '^(?:Negative prompt|负面提示词|负面提示)\s*[：:]\s*'
    cssClass: "dsl-sd-negative-header"
    captureGroup: 0
    priority: 55
    flags: 'gmi'
    blockLevel: true

  # 音频引用：@音频1 @音频2
  audio_ref:
    regex: '@音频\s*\d+'
    cssClass: "dsl-audio-ref"
    captureGroup: 0
    priority: 40

  # 音色标签
  audio_tone:
    regex: '音色\s*'
    cssClass: "dsl-audio-tone"
    captureGroup: 0
    priority: 40

  # 音效字段标签
  audio_sfx:
    regex: '音效[：:]'
    cssClass: "dsl-audio-sfx"
    captureGroup: 0
    priority: 45

  # SD参数：--ar 16:9 --v 6 --style raw
  sd_parameter:
    regex: '--(?:ar|v|niji|style|seed|s|w|h|c|chaos|stylize|tile|quality|fast|hd|relax|turbo)\s+\S+'
    cssClass: "dsl-sd-parameter"
    captureGroup: 0
    priority: 48
    flags: 'gi'

  # ============================================================
  # 二、Markdown 语法符号匹配
  # ============================================================

  # Frontmatter 分隔符：行首 ---
  md_frontmatter:
    regex: '^---\s*$'
    cssClass: "dsl-md-frontmatter"
    captureGroup: 0
    priority: 60
    flags: 'gm'
    blockLevel: true

  # 标题标记：# ## ### #### ##### ######
  md_heading:
    regex: '^(#{1,6})\s+(.+)$'
    cssClass: "dsl-md-heading"
    captureGroup: 0
    priority: 58
    flags: 'gm'
    blockLevel: true

  # 粗体标记：**text** __text__
  md_bold:
    regex: '\*\*([^*]+)\*\*|__([^_]+)__'
    cssClass: "dsl-md-bold"
    captureGroup: 0
    priority: 52

  # 斜体标记：*text* _text_（避免与粗体冲突）
  md_italic:
    regex: '(?<!\*)\*(?!\*)([^*\n]+)\*(?!\*)|(?<!_)_(?!_)([^_\n]+)_(?!_)'
    cssClass: "dsl-md-italic"
    captureGroup: 0
    priority: 51

  # 删除线：~~text~~
  md_strikethrough:
    regex: '~~([^~]+)~~'
    cssClass: "dsl-md-strikethrough"
    captureGroup: 0
    priority: 52

  # 代码块围栏：\`\`\`language
  md_code_fence:
    regex: '^\`\`\`[^\n]*$'
    cssClass: "dsl-md-code-fence"
    captureGroup: 0
    priority: 60
    flags: 'gm'
    blockLevel: true

  # 行内代码：\`code\`
  md_inline_code:
    regex: '\`([^\`\n]+)\`'
    cssClass: "dsl-md-inline-code"
    captureGroup: 0
    priority: 53

  # 链接：[text](url)
  md_link:
    regex: '\[([^\]]+)\]\(([^)]+)\)'
    cssClass: "dsl-md-link"
    captureGroup: 0
    priority: 54

  # 图片：![alt](url)
  md_image:
    regex: '!\[([^\]]*)\]\(([^)]+)\)'
    cssClass: "dsl-md-image"
    captureGroup: 0
    priority: 55

  # Wiki 链接：[[text]] 或 [[text|alias]]
  md_wiki_link:
    regex: '\[\[([^\]]+)(?:\|[^\]]+)?\]\]'
    cssClass: "dsl-md-wiki-link"
    captureGroup: 0
    priority: 56

  # 标签：#tag（非标题行的行首或空格后）
  md_tag:
    regex: '(?:^|\s)(#[a-zA-Z\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff][\w/\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff-]*)'
    cssClass: "dsl-md-tag"
    captureGroup: 0
    priority: 50
    flags: 'gm'

  # 任务列表标记：- [ ] 或 - [x]
  md_task_list:
    regex: '^(\s*[-*+]\s+\[)[xX ](\])'
    cssClass: "dsl-md-task"
    captureGroup: 0
    priority: 57
    flags: 'gm'

  # 脚注引用：[^1]
  md_footnote_ref:
    regex: '\[\^([^\]]+)\]'
    cssClass: "dsl-md-footnote"
    captureGroup: 0
    priority: 54

  # 脚注定义：[^1]:
  md_footnote_def:
    regex: '^\[\^([^\]]+)\]:\s*(.*)$'
    cssClass: "dsl-md-footnote-def"
    captureGroup: 0
    priority: 57
    flags: 'gm'

  # 数学公式块：$$ ... $$
  md_math_block:
    regex: '^\$\$'
    cssClass: "dsl-md-math"
    captureGroup: 0
    priority: 60
    flags: 'gm'
    blockLevel: true

  # 行内数学公式：$...$
  md_math_inline:
    regex: '(?<!\$)\$(?!\$)([^\$\n]+)\$(?!\$)'
    cssClass: "dsl-md-math-inline"
    captureGroup: 0
    priority: 53

  # 引用块：> text
  md_blockquote:
    regex: '^>\s*(.*)$'
    cssClass: "dsl-md-blockquote"
    captureGroup: 0
    priority: 55
    flags: 'gm'
    blockLevel: true

  # Callout 块：> [!note]
  md_callout:
    regex: '^>\s*\[!(\w+)\]'
    cssClass: "dsl-md-callout"
    captureGroup: 0
    priority: 60
    flags: 'gmi'
    blockLevel: true

  # 水平分割线：--- *** ___
  md_hr:
    regex: '^(?:-{3,}|\*{3,}|_{3,})\s*$'
    cssClass: "dsl-md-hr"
    captureGroup: 0
    priority: 56
    flags: 'gm'
    blockLevel: true

  # 表格分隔行：| --- | --- |
  md_table_sep:
    regex: '^\|?[\s-:|]+\|[\s-:|]+\|?\s*$'
    cssClass: "dsl-md-table-sep"
    captureGroup: 0
    priority: 58
    flags: 'gm'
    blockLevel: true

  # 表格行：| cell | cell |
  md_table_row:
    regex: '^\|.*\|\s*$'
    cssClass: "dsl-md-table-row"
    captureGroup: 0
    priority: 50
    flags: 'gm'
    blockLevel: true

  # 列表项：- * + 1.
  md_list_item:
    regex: '^(\s*)([-*+]|\d+\.)\s+'
    cssClass: "dsl-md-list-item"
    captureGroup: 0
    priority: 49
    flags: 'gm'
    blockLevel: true

  # 定义列表标记：: 术语
  md_definition:
    regex: '^:\s+'
    cssClass: "dsl-md-definition"
    captureGroup: 0
    priority: 50
    flags: 'gm'

  # 块引用 ID：^block-id
  md_block_id:
    regex: '\^([a-zA-Z0-9][\w-]*)\s*$'
    cssClass: "dsl-md-block-id"
    captureGroup: 0
    priority: 50
    flags: 'gm'

  # Obsidian 注释：%% ... %%
  md_comment:
    regex: '%%[\s\S]*?%%'
    cssClass: "dsl-md-comment"
    captureGroup: 0
    priority: 54
    flags: 'g'

  # Emoji 短码：:emoji:
  md_emoji_shortcode:
    regex: ':([a-z_]+):'
    cssClass: "dsl-md-emoji"
    captureGroup: 0
    priority: 48

  # 高亮标记：==text==
  md_highlight:
    regex: '==([^=]+)=='
    cssClass: "dsl-md-highlight"
    captureGroup: 0
    priority: 52

  # 键值对（YAML/JSON frontmatter）：key: value
  md_yaml_key:
    regex: '^([a-zA-Z_][\w-]*)\s*:\s*(.*)$'
    cssClass: "dsl-md-yaml-key"
    captureGroup: 0
    priority: 47
    flags: 'gm'

  # ============================================================
  # 三、操作档案标记
  # ============================================================

  # 时间戳：2026-07-24、2026/07/24、07:30:00
  timestamp:
    regex: '\d{4}[-/]\d{1,2}[-/]\d{1,2}(?:\s+\d{1,2}:\d{2}(?::\d{2})?)?|\d{1,2}:\d{2}(?::\d{2})?'
    cssClass: "dsl-timestamp"
    captureGroup: 0
    priority: 42

  # 版本号：v1.0.0、version 2.3
  version_number:
    regex: '(?:v|version\s+)?\d+\.\d+(?:\.\d+)?(?:-[a-zA-Z0-9]+)?'
    cssClass: "dsl-version-number"
    captureGroup: 0
    priority: 42
    flags: 'gi'

  # URL 链接
  url_link:
    regex: 'https?://[^\s<>"'')\]]+'
    cssClass: "dsl-url-link"
    captureGroup: 0
    priority: 44

  # 文件路径
  file_path:
    regex: '(?:\.?\/)?(?:[\w.-]+\/)+[\w.-]+(?:\.\w+)?'
    cssClass: "dsl-file-path"
    captureGroup: 0
    priority: 40

  # 命令行指令：以 > 或 $ 开头
  cli_command:
    regex: '^[>$#]\s+(.+)'
    cssClass: "dsl-cli-command"
    captureGroup: 0
    priority: 48
    flags: 'gm'
    blockLevel: true

  # 键盘快捷键：<kbd>Ctrl+C</kbd>
  kbd_tag:
    regex: '<kbd>([^<]+)</kbd>'
    cssClass: "dsl-kbd-tag"
    captureGroup: 0
    priority: 54
    flags: 'gi'

  # HTML 标签：<tag>...</tag>
  html_tag:
    regex: '<\/?[a-zA-Z][^>]*>'
    cssClass: "dsl-html-tag"
    captureGroup: 0
    priority: 46
    flags: 'gi'

  # 键值分隔符：key: value（通用）
  key_value:
    regex: '^([a-zA-Z\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff][\w\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\s]{0,20})[：:]\s*(.+)$'
    cssClass: "dsl-key-value"
    captureGroup: 0
    priority: 30
    flags: 'gm'

  # 引用标记：> 引用内容
  reference_marker:
    regex: '^>{1,}\s+'
    cssClass: "dsl-reference-marker"
    captureGroup: 0
    priority: 48
    flags: 'gm'

  # 分隔标记：=== 或 ---
  separator:
    regex: '^={3,}\s*$'
    cssClass: "dsl-separator"
    captureGroup: 0
    priority: 56
    flags: 'gm'
    blockLevel: true

  # ============================================================
  # 四、AI 工具结构化语法（2025-2026 趋势）
  # ============================================================

  # ANTML 命名空间标签：Claude 专属标记 <antml:thinking> 等
  antml_tag:
    regex: '<\/?antml:[a-z_]+>'
    cssClass: "dsl-antml-tag"
    captureGroup: 0
    priority: 58
    flags: 'gi'

  # 函数结果块：<function_results> </function_results>
  function_results_tag:
    regex: '<\/?function_results>'
    cssClass: "dsl-function-results"
    captureGroup: 0
    priority: 54
    flags: 'gi'

  # 结构化 XML 标签：<instructions> <context> <example> <output_format> <thinking> <answer>
  xml_block:
    regex: '<\/?(?:instructions|context|example|examples|output_format|thinking|answer|input|role|task|reasoning|reflection|critique|summary|steps|solution)>'
    cssClass: "dsl-xml-block"
    captureGroup: 0
    priority: 54
    flags: 'gi'

  # Chat Template Token：Qwen/Phi <|im_start|> <|im_end|> <|im_sep|>
  chat_token:
    regex: '<\|im_(?:start|end|sep)\|>'
    cssClass: "dsl-chat-token"
    captureGroup: 0
    priority: 58
    flags: 'g'

  # Llama 3 特殊 token：<|begin_of_text|> <|start_header_id|> <|end_header_id|>
  llama3_token:
    regex: '<\|(?:begin_of_text|start_header_id|end_header_id|eot_id|reserved)\|>'
    cssClass: "dsl-llama-token"
    captureGroup: 0
    priority: 58
    flags: 'g'

  # Gemma 对话标记：<start_of_turn> <end_of_turn>
  gemma_token:
    regex: '<\/?start_of_turn>|<\/?end_of_turn>'
    cssClass: "dsl-gemma-token"
    captureGroup: 0
    priority: 58
    flags: 'gi'

  # Llama 2/Mistral 系统标记：<<SYS>> <</SYS>>
  llama2_sys:
    regex: '<<\/?SYS>>'
    cssClass: "dsl-llama-sys"
    captureGroup: 0
    priority: 56
    flags: 'g'

  # 工作流分隔符：## ##（Dify 物理分隔）
  workflow_sep:
    regex: '^#{2}\s+.*$'
    cssClass: "dsl-workflow-sep"
    captureGroup: 0
    priority: 50
    flags: 'gm'
    blockLevel: true

  # JSON Schema 关键字：type/properties/required 等
  json_schema_key:
    regex: '"(?:type|properties|required|items|enum|const|description|response_format|json_schema|additionalProperties|definitions|\$ref)"'
    cssClass: "dsl-json-schema-key"
    captureGroup: 0
    priority: 46
    flags: 'g'

  # Jinja2 控制流：{% ... %}
  jinja_control:
    regex: '\{%[^%]*%\}'
    cssClass: "dsl-jinja-control"
    captureGroup: 0
    priority: 54

  # 工作流节点标识：node_1、start_node
  workflow_node:
    regex: '(?:node|节点)_[a-zA-Z0-9_]+'
    cssClass: "dsl-workflow-node"
    captureGroup: 0
    priority: 44

  # ============================================================
  # 五、Markdown 扩展语法
  # ============================================================

  # Mermaid 图表围栏：\`\`\`mermaid
  md_mermaid:
    regex: '^\`\`\`(?:mermaid|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|gitGraph|mindmap|timeline)\b'
    cssClass: "dsl-md-mermaid"
    captureGroup: 0
    priority: 60
    flags: 'gmi'
    blockLevel: true

  # 嵌套引用：>> text
  md_nested_quote:
    regex: '^>{2,}\s+'
    cssClass: "dsl-md-nested-quote"
    captureGroup: 0
    priority: 56
    flags: 'gm'
    blockLevel: true

  # 锚点链接：[text](#anchor)
  md_anchor_link:
    regex: '\[([^\]]+)\]\(#[^)]+\)'
    cssClass: "dsl-md-anchor-link"
    captureGroup: 0
    priority: 55

  # 引用块别名：> [!note]+ 折叠
  md_callout_meta:
    regex: '^>\s*\[!\w+\][+-]?'
    cssClass: "dsl-md-callout-meta"
    captureGroup: 0
    priority: 60
    flags: 'gm'
    blockLevel: true

  # Admonition：!!! note
  md_admonition:
    regex: '^!!!\s+\w+'
    cssClass: "dsl-md-admonition"
    captureGroup: 0
    priority: 60
    flags: 'gm'
    blockLevel: true

  # ============================================================
  # 六、操作档案扩展标记
  # ============================================================

  # 邮箱地址
  email:
    regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    cssClass: "dsl-email"
    captureGroup: 0
    priority: 44

  # IP 地址（IPv4）
  ip_address:
    regex: '\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b'
    cssClass: "dsl-ip-address"
    captureGroup: 0
    priority: 44

  # MAC 地址
  mac_address:
    regex: '(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}'
    cssClass: "dsl-mac-address"
    captureGroup: 0
    priority: 44

  # UUID
  uuid:
    regex: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
    cssClass: "dsl-uuid"
    captureGroup: 0
    priority: 44

  # 十六进制颜色值：#FF5733 #fff
  hex_color:
    regex: '#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b'
    cssClass: "dsl-hex-color"
    captureGroup: 0
    priority: 46

  # rgb/rgba/hsl 颜色函数
  css_color_func:
    regex: '\b(?:rgb|rgba|hsl|hsla)\([^)]+\)'
    cssClass: "dsl-css-color-func"
    captureGroup: 0
    priority: 46
    flags: 'gi'

  # 地理坐标：经纬度
  geo_coord:
    regex: '-?\d{1,3}\.\d{1,6},\s*-?\d{1,3}\.\d{1,6}'
    cssClass: "dsl-geo-coord"
    captureGroup: 0
    priority: 42

  # 货币金额
  currency:
    regex: '(?:¥|￥|\$|€|£)\s?\d+(?:,\d{3})*(?:\.\d+)?'
    cssClass: "dsl-currency"
    captureGroup: 0
    priority: 44

  # 百分比
  percentage:
    regex: '\d+(?:\.\d+)?\s*%'
    cssClass: "dsl-percentage"
    captureGroup: 0
    priority: 42

  # 度量单位
  measurement:
    regex: '\d+(?:\.\d+)?\s*(?:px|em|rem|vw|vh|pt|cm|mm|in|kg|g|km|m\b|°C|°F|°|Hz|MHz|GHz|kHz|ms|fps|dpi|ppi|lpx|pt)\b'
    cssClass: "dsl-measurement"
    captureGroup: 0
    priority: 42
    flags: 'gi'

  # ============================================================
  # 七、分镜脚本扩展语法（v2.3.0 新增）
  # ============================================================

  # 分镜编号：分镜 1-0-6-1、分镜 1-0-6-2（多段连字符编号，v2.3.1 新增）
  shot_id:
    regex: '分镜\s*\d+(?:-\d+)+'
    cssClass: "dsl-shot-id"
    captureGroup: 0
    priority: 52
    flags: 'g'

  # 段落标题：A 段 13s｜描述、B 段 14s｜描述（描述）
  segment_header:
    regex: '^[A-Z]\s*段\s*\d+\s*(?:秒|s|S)?\s*[｜|]\s*[^\n]+'
    cssClass: "dsl-segment-header"
    captureGroup: 0
    priority: 56
    flags: 'gm'
    blockLevel: true

  # 模块标题：模块 1 方向锁、模块 4 分镜头扩写
  module_header:
    regex: '^模块\s*\d+\s+[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\w]+'
    cssClass: "dsl-module-header"
    captureGroup: 0
    priority: 55
    flags: 'gm'
    blockLevel: true

  # 台词标注：台词 Draven（低哑蛊惑） {{Mixed 4}} ：
  dialogue_speaker:
    regex: '台词\s+\S+\s*[（(][^）)]*[）)]\s*(?:\{\{[^}]+\}\}\s*)?[：:]'
    cssClass: "dsl-dialogue-speaker"
    captureGroup: 0
    priority: 50

  # 角色定义：Draven（S 主，高位强势方）：
  character_def:
    regex: '^([A-Za-z\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff][\w\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]{0,20})\s*[（(]([^）)]+)[）)]\s*[：:]'
    cssClass: "dsl-character-def"
    captureGroup: 0
    priority: 48
    flags: 'gm'

  # 书名号引用：《他是龙》、《水形物语》
  book_title:
    regex: '《[^》]+》'
    cssClass: "dsl-book-title"
    captureGroup: 0
    priority: 44

  # 中文序号章节：一、二、三、
  cn_chapter:
    regex: '^(?:[一二三四五六七八九十百千]+[、，]|第[一二三四五六七八九十百千万]+[集章节幕回课])'
    cssClass: "dsl-cn-chapter"
    captureGroup: 0
    priority: 54
    flags: 'gm'

  # 时间范围：0-4s、4-9s、0-13s
  time_range:
    regex: '\b\d+-\d+\s*(?:秒|s|S)\b'
    cssClass: "dsl-time-range"
    captureGroup: 0
    priority: 46

  # 段落小标题：本段调度说明、全局约束
  section_note:
    regex: '^(?:本段|全局)[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]{2,12}$'
    cssClass: "dsl-section-note"
    captureGroup: 0
    priority: 52
    flags: 'gm'
    blockLevel: true

  # ============================================================
  # 八、AI 多模态扩展语法（v2.4.0 新增）
  # ============================================================

  # SSML 语音合成标签：<prosody rate="slow">、<emphasis>、<break time="1s">、<voice>、<say-as>
  ssml_tag:
    regex: '<\/?(?:prosody|emphasis|break|voice|say-as|speak|phoneme|sub|p|s|audio|mark|emphasis|lang|token|w)(?:\s+[^>]*)?>'
    cssClass: "dsl-ssml-tag"
    captureGroup: 0
    priority: 56
    flags: 'gi'

  # 歌词段落标签：[Verse] [Chorus] [Bridge] [Outro] [Intro] [Hook] [Pre-Chorus] [Instrumental]
  lyric_section:
    regex: '\[(?:Verse|Chorus|Bridge|Outro|Intro|Hook|Pre-Chorus|Pre Chorus|Instrumental|Refrain|Interlude|Solo|Drop|Build|Beat Drop|Spoken|Spoken Word|Ad lib|Ad-lib|Vamp|Coda|Post-Chorus|Post Chorus|Tag|Lead In|Lead-In)(?:\s+\d+)?\]'
    cssClass: "dsl-lyric-section"
    captureGroup: 0
    priority: 52
    flags: 'gi'

  # Suno 风格元标签：[style: pop] [genre: rock] [mood: happy]
  suno_meta:
    regex: '\[(?:style|genre|mood|tempo|key|bpm|instrument|vocal|language|voice)\s*[:：]\s*[^\]]+\]'
    cssClass: "dsl-suno-meta"
    captureGroup: 0
    priority: 50
    flags: 'gi'

  # 数字人/虚拟主播指令标签：[emotion]happy[/emotion] [gesture]wave[/gesture] [pause] [action]smile[/action]
  avatar_directive:
    regex: '\[(?:emotion|gesture|action|pause|expression|pose|movement|gaze|blink|head|hand|body|camera|scene|transition)(?:\s+[^\]]*)?\](?:[^\[]*)?\[\/(?:emotion|gesture|action|expression|pose|movement|gaze|blink|head|hand|body|camera|scene|transition)\]|\[(?:pause|blink|nod|shake|wave|smile|frown|wink)\]'
    cssClass: "dsl-avatar-directive"
    captureGroup: 0
    priority: 54
    flags: 'gi'

  # Excel Copilot 函数：=COPILOT("提示词", A1:A100)
  copilot_formula:
    regex: '=(?:COPILOT|AI|GPT|CHATGPT|CLAUDE|GEMINI)\s*\([^)]*\)'
    cssClass: "dsl-copilot-formula"
    captureGroup: 0
    priority: 56
    flags: 'gi'

  # ReAct Agent 标记：Thought: / Action: / Observation: / Final Answer:
  react_marker:
    regex: '^(?:Thought|Action|Observation|Final Answer|Action Input|Question|Answer)\s*[:：]'
    cssClass: "dsl-react-marker"
    captureGroup: 0
    priority: 54
    flags: 'gmi'
    blockLevel: true

  # CoT 触发短语：Let's think step by step / 让我们一步步思考
  cot_trigger:
    regex: "(?:Let's think|让我们|请|逐步|step[- ]by[- ]step|一步一步|按步骤|think step by step|reason step by step|chain of thought|思维链)[^。.\\n]*"
    cssClass: "dsl-cot-trigger"
    captureGroup: 0
    priority: 48
    flags: 'gi'

  # AI 模型标识符：gpt-4、claude-3-opus、gemini-pro、dall-e-3、midjourney-v6
  model_identifier:
    regex: '\b(?:gpt[- ]?\d(?:\.\d)?(?:\s*(?:turbo|mini|nano))?|claude[- ]?\d(?:\.\d)?(?:\s*(?:opus|sonnet|haiku|instant))?|gemini[- ]?(?:pro|ultra|flash|nano)?|dall[- ]?e[- ]?\d|midjourney[- ]?v\d|stable[- ]?diffusion[- ]?(?:xl|3|2|1)|sora|pika|runway[- ]?gen[- ]?\d|seedance|kling|hunyuan|qwen[- ]?\d|llama[- ]?\d|mistral|mixtral|phi[- ]?\d|gemma[- ]?\d|deepseek|yi[- ]?\d|baichuan|chatglm)\b'
    cssClass: "dsl-model-identifier"
    captureGroup: 0
    priority: 46
    flags: 'gi'

  # ComfyUI 节点调用：KSampler(...)、CLIPTextEncode(...)、VAEDecode(...)
  comfyui_node:
    regex: '\b(?:KSampler|CLIPTextEncode|VAEDecode|VAEEncode|CheckpointLoader|LoadCheckpoint|LoadVAE|LoadLoRA|LoraLoader|ControlNetApply|ControlNetLoader|IPAdapterApply|IPAdapterModelLoader|SaveImage|PreviewImage|LoadImage|UpscaleModelLoader|ESRGANUpscale|LatentUpscale|EmptyLatentImage|VAESave|ModelSamplingDiscrete|SamplerCustom|StableCascade_StageB|StableCascade_StageC|SwarmUI|UltimateSDUpscale|ImpactPack|AnimateDiff|AnimateDiffLoader|Deforum|FrameInterpolator|Reroute|PrimitiveNode|Note|Reroute|Seed|Context|SaveImageWebsocket|PreviewImageWebsocket)\s*\('
    cssClass: "dsl-comfyui-node"
    captureGroup: 0
    priority: 50
    flags: 'g'

  # Pika 视频参数：--camera pan right、--motion 5、--fps 24
  pika_parameter:
    regex: '--(?:camera|motion|fps|duration|aspect|ar|guidance|negative|prompt|strength|seed|loop|canvas|zoom|pan|tilt|rotate)\s+\S+'
    cssClass: "dsl-pika-parameter"
    captureGroup: 0
    priority: 48
    flags: 'gi'

  # Runway Gen 参数：--prompt、--motion_score、--safety_check
  runway_parameter:
    regex: '--(?:prompt|motion_score|safety_check|seed|text_prompt|image_prompt|seconds|fps|resolution|model|style)\s+\S+'
    cssClass: "dsl-runway-parameter"
    captureGroup: 0
    priority: 48
    flags: 'gi'

  # 翻译任务标记：Source: / Target: / 原文： / 译文：
  translation_marker:
    regex: '^(?:Source|Target|原文|译文|源文|Source Text|Target Text|SL|TL)\s*[:：]'
    cssClass: "dsl-translation-marker"
    captureGroup: 0
    priority: 52
    flags: 'gmi'
    blockLevel: true

  # Few-shot 示例标记：Example: / 示例： / Q: / A:
  fewshot_marker:
    regex: '^(?:Example|示例|例子|案例|样例|Q|A|Question|Answer|Input|Output|输入|输出|问题|回答)\s*[:：]'
    cssClass: "dsl-fewshot-marker"
    captureGroup: 0
    priority: 50
    flags: 'gmi'
    blockLevel: true

  # 3D 生成平台标识：[Meshy] [Hunyuan3D] [Rodin] [Genie]
  gen3d_platform:
    regex: '\[(?:Meshy|Hunyuan3D|Rodin|Hyper3D|Genie|Shap-E|DreamFusion|3DGen|Tripo3D|Tripo3)\]'
    cssClass: "dsl-gen3d-platform"
    captureGroup: 0
    priority: 50
    flags: 'gi'

  # ============================================================
  # 九、显式边界标记（v2.5.0 新增，借鉴文言语言「」机制）
  # ============================================================

  # 显式标识符：「标识符」、『标识符』（借鉴文言的标识符包裹机制）
  explicit_identifier:
    regex: '「([^」]+)」|『([^』]+)』'
    cssClass: "dsl-explicit-identifier"
    captureGroup: 0
    priority: 65
    flags: 'g'

  # 显式字符串：「"字符串"」、『"字符串"』（双层引号，借鉴文言字面量语法）
  explicit_string:
    regex: '「"([^"]+)"」|『"([^"]+)"』'
    cssClass: "dsl-explicit-string"
    captureGroup: 0
    priority: 59
    flags: 'g'

  # ============================================================
  # 十、约束关键字分层（v2.5.0 新增，借鉴易语言保留字分层）
  # ============================================================

  # 绝对约束关键字：禁止/严禁/杜绝/不得/不允许/切勿/勿要
  # 前位否定词断言避免"无禁止"误匹配，后接任意内容均可（中文词本身独立）
  constraint_absolute:
    regex: '(?<!无|不|非|未)(禁止|严禁|杜绝|不得|不允许|切勿|勿要)'
    cssClass: "dsl-constraint"
    captureGroup: 0
    priority: 55
    flags: 'gi'

  # 软约束关键字：排除/避免/保证/锁定/仅保留/严格
  # 需后接冒号才高亮（上下文消歧）
  constraint_soft:
    regex: '(排除|避免|保证|锁定|仅保留|严格)(?=[：:])'
    cssClass: "dsl-constraint"
    captureGroup: 0
    priority: 50
    flags: 'gi'

  # ============================================================
  # 十一、参数键位置消歧（v2.5.0 新增，借鉴中蟒语法位置判断）
  # ============================================================

  # 严格参数键：前位为行首/空格/标点，后位必须有值
  param_key_strict:
    regex: '(?<=^|\s|[，。、；])([\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]{2,10})(?:\s*[（(][^）)]*[）)])?\s*[：:](?!\s*")(?=\S)'
    cssClass: "dsl-param-key"
    captureGroup: 0
    priority: 46
    flags: 'gm'

  # ============================================================
  # 十二、台词与括号边界断言（v2.5.0 新增，借鉴中文编程语言词边界）
  # ============================================================

  # 严格中文引号台词：前位为行首/空格/标点/说字（后位不限制，允许台词后接动词）
  dialogue_cn_strict:
    regex: '(?<=^|\s|[，。、；：]|说)[""「]([^""」]+)[""」]'
    cssClass: "dsl-dialogue"
    captureGroup: 0
    priority: 52
    flags: 'gm'

  # 严格全角括号注释：前位为行首/空格/标点
  parenthetical_strict:
    regex: '(?<=^|\s|[，。、；：])（([^）]+)）'
    cssClass: "dsl-parenthetical"
    captureGroup: 0
    priority: 27

  # 半角括号注释（非数字内容）：与 emphasis_weight 分层
  parenthetical_half:
    regex: '\(([^()0-9]+)\)'
    cssClass: "dsl-parenthetical-half"
    captureGroup: 0
    priority: 26
`;

/** 02-semantic-context.yaml 内置内容 */
const SEMANTIC_CONTEXT_YAML = `# 上下文语义体系（高级着色核心）
# 实现父级区块决定子内容着色逻辑，新增章节无需修改插件
# 父级区块 -> 子节点生效规则映射

contextMap:
  # ============================================================
  # 一、影视分镜类区块
  # ============================================================
  "【整体设定】":
    allowPatterns:
      - asset_ref
      - asset_bracket
      - param_key
      - constraint
      - tech_param
      - audio_ref
      - audio_tone

  "【分镜设计】":
    allowPatterns:
      - shot_header
      - asset_ref
      - asset_bracket
      - param_key
      - dialogue_cn
      - dialogue_en
      - constraint
      - tech_param
      - parenthetical
      - audio_ref
      - audio_tone
      - audio_sfx

  "【角色设定】":
    allowPatterns:
      - param_key
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - asset_ref
      - asset_bracket

  "【人物设定】":
    allowPatterns:
      - param_key
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - asset_ref

  "【世界观】":
    allowPatterns:
      - param_key
      - constraint
      - asset_ref
      - tech_param

  "【世界设定】":
    allowPatterns:
      - param_key
      - constraint
      - asset_ref
      - tech_param

  "【剧情大纲】":
    allowPatterns:
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - shot_header

  "【剧情梗概】":
    allowPatterns:
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical

  "【台词脚本】":
    allowPatterns:
      - dialogue_cn
      - dialogue_en
      - constraint
      - parenthetical
      - role_tag

  "【对白设计】":
    allowPatterns:
      - dialogue_cn
      - dialogue_en
      - constraint
      - parenthetical

  "【音效设计】":
    allowPatterns:
      - audio_ref
      - audio_tone
      - audio_sfx
      - param_key
      - constraint
      - tech_param

  "【音频设计】":
    allowPatterns:
      - audio_ref
      - audio_tone
      - audio_sfx
      - param_key
      - constraint

  "【后期调色】":
    allowPatterns:
      - tech_param
      - param_key
      - constraint
      - hex_color
      - css_color_func

  "【色彩方案】":
    allowPatterns:
      - tech_param
      - param_key
      - constraint
      - hex_color
      - css_color_func

  "【镜头清单】":
    allowPatterns:
      - shot_header
      - param_key
      - tech_param
      - asset_ref
      - asset_bracket
      - constraint

  "【资产清单】":
    allowPatterns:
      - asset_ref
      - asset_bracket
      - param_key
      - file_path
      - url_link

  "【转场设计】":
    allowPatterns:
      - param_key
      - constraint
      - tech_param

  "【场景设定】":
    allowPatterns:
      - param_key
      - constraint
      - asset_ref
      - tech_param
      - parenthetical

  # ============================================================
  # 二、AI 提示词工程区块
  # ============================================================
  "【系统提示】":
    allowPatterns:
      - role_tag
      - instruction
      - xml_block
      - antml_tag
      - chat_token
      - llama2_sys
      - llama3_token
      - gemma_token
      - constraint
      - param_key
      - variable
      - jinja_control
      - json_schema_key

  "【用户输入】":
    allowPatterns:
      - variable
      - param_key
      - constraint
      - parenthetical

  "【输出格式】":
    allowPatterns:
      - xml_block
      - json_schema_key
      - param_key
      - constraint
      - jinja_control

  "【示例】":
    allowPatterns:
      - role_tag
      - instruction
      - xml_block
      - dialogue_en
      - dialogue_cn
      - param_key

  "【负面提示词】":
    allowPatterns:
      - sd_negative_header
      - constraint
      - param_key

  "【采样参数】":
    allowPatterns:
      - tech_param
      - sd_parameter
      - param_key
      - measurement
      - percentage
      - param_key_strict

  "【参数配置】":
    allowPatterns:
      - tech_param
      - sd_parameter
      - param_key
      - measurement
      - percentage
      - version_number
      - param_key_strict

  "【LoRA配置】":
    allowPatterns:
      - lora_ref
      - param_key
      - tech_param
      - sd_parameter
      - param_key_strict

  "【工作流】":
    allowPatterns:
      - workflow_sep
      - workflow_node
      - variable
      - jinja_control
      - param_key
      - constraint

  # ============================================================
  # 三、分镜脚本扩展区块（v2.3.0 新增）
  # ============================================================
  "段落说明":
    allowPatterns:
      - segment_header
      - module_header
      - section_note
      - param_key
      - parenthetical
      - time_range
      - tech_param

  "分镜模块":
    allowPatterns:
      - shot_header
      - shot_id
      - param_key
      - dialogue_speaker
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - time_range
      - constraint
      - variable

  "调度设计":
    allowPatterns:
      - param_key
      - constraint
      - parenthetical
      - book_title
      - cn_chapter

  "角色设定扩展":
    allowPatterns:
      - character_def
      - param_key
      - constraint
      - parenthetical
      - dialogue_cn
      - dialogue_en
      - variable
      - measurement

  "全局设定":
    allowPatterns:
      - cn_chapter
      - param_key
      - constraint
      - tech_param
      - parenthetical
      - measurement
      - character_def

  "影视对标":
    allowPatterns:
      - book_title
      - param_key
      - parenthetical

  # ============================================================
  # 四、AI 多模态扩展区块（v2.4.0 新增）
  # ============================================================
  "【语音合成】":
    allowPatterns:
      - ssml_tag
      - param_key
      - constraint
      - tech_param
      - parenthetical

  "【SSML配置】":
    allowPatterns:
      - ssml_tag
      - param_key
      - constraint
      - measurement
      - percentage

  "【数字人】":
    allowPatterns:
      - avatar_directive
      - param_key
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - tech_param

  "【虚拟主播】":
    allowPatterns:
      - avatar_directive
      - param_key
      - dialogue_cn
      - dialogue_en
      - parenthetical

  "【音乐生成】":
    allowPatterns:
      - lyric_section
      - suno_meta
      - param_key
      - constraint
      - tech_param
      - parenthetical

  "【歌词创作】":
    allowPatterns:
      - lyric_section
      - suno_meta
      - dialogue_cn
      - dialogue_en
      - parenthetical

  "【3D建模】":
    allowPatterns:
      - gen3d_platform
      - param_key
      - constraint
      - tech_param
      - measurement
      - parenthetical

  "【3D生成】":
    allowPatterns:
      - gen3d_platform
      - param_key
      - constraint
      - tech_param
      - parenthetical

  "【数据分析】":
    allowPatterns:
      - copilot_formula
      - param_key
      - constraint
      - tech_param
      - measurement
      - percentage

  "【Excel AI】":
    allowPatterns:
      - copilot_formula
      - param_key
      - constraint
      - measurement

  "【Agent系统】":
    allowPatterns:
      - react_marker
      - cot_trigger
      - model_identifier
      - xml_block
      - function_results_tag
      - json_schema_key
      - param_key
      - constraint
      - variable

  "【ReAct流程】":
    allowPatterns:
      - react_marker
      - cot_trigger
      - model_identifier
      - param_key
      - constraint
      - variable

  "【CoT推理】":
    allowPatterns:
      - cot_trigger
      - param_key
      - constraint
      - variable

  "【Logo设计】":
    allowPatterns:
      - param_key
      - constraint
      - hex_color
      - css_color_func
      - parenthetical
      - tech_param

  "【图标设计】":
    allowPatterns:
      - param_key
      - constraint
      - hex_color
      - css_color_func
      - parenthetical

  "【室内设计】":
    allowPatterns:
      - param_key
      - constraint
      - hex_color
      - css_color_func
      - measurement
      - parenthetical
      - tech_param

  "【建筑设计】":
    allowPatterns:
      - param_key
      - constraint
      - hex_color
      - css_color_func
      - measurement
      - parenthetical
      - tech_param

  "【漫画创作】":
    allowPatterns:
      - shot_header
      - param_key
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - constraint
      - tech_param

  "【绘本创作】":
    allowPatterns:
      - param_key
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - constraint

  "【游戏开发】":
    allowPatterns:
      - param_key
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - variable
      - tech_param

  "【NPC对话】":
    allowPatterns:
      - dialogue_cn
      - dialogue_en
      - param_key
      - parenthetical
      - constraint
      - variable

  "【翻译任务】":
    allowPatterns:
      - translation_marker
      - dialogue_cn
      - dialogue_en
      - param_key
      - constraint

  "【Few-shot示例】":
    allowPatterns:
      - fewshot_marker
      - dialogue_cn
      - dialogue_en
      - param_key
      - parenthetical

  "【模型对比】":
    allowPatterns:
      - model_identifier
      - param_key
      - constraint
      - tech_param
      - percentage
      - measurement

  "【ComfyUI工作流】":
    allowPatterns:
      - comfyui_node
      - param_key
      - sd_parameter
      - tech_param
      - measurement
      - constraint

  "【视频生成】":
    allowPatterns:
      - pika_parameter
      - runway_parameter
      - model_identifier
      - param_key
      - tech_param
      - constraint
      - parenthetical

  # ============================================================
  # 五、中文编程标识逻辑扩展区块（v2.5.0 新增）
  # 支持软关键字上下文识别与显式标识符声明
  # ============================================================
  "【约束】":
    allowPatterns:
      - constraint_absolute
      - constraint_soft
      - constraint
      - param_key
      - param_key_strict
      - parenthetical
      - parenthetical_strict

# 跨行状态定义（解决多行注释、跨段落资产解析错乱）
scanStateEnum:
  Normal: 0
  InQuoteDialogue: 1
  InBlockWrapper: 2
  InCodeFence: 3
  InMathBlock: 4
  InComment: 5
`;

/** 03-lexicon-optional.yaml 内置内容 */
const LEXICON_OPTIONAL_YAML = `# 可选业务词典（轻量化）
# 仅做精细化二次上色，删除后基础高亮完全正常运行
# 新增关键词仅追加数组，无需修改插件代码
# 本文件包含 25 个行业类别的中英文专业术语
# 所有字符串均用双引号包裹以避免 YAML 特殊字符解析问题

lexicon:
  # ============================================================
  # 1. 镜头运动术语
  # ============================================================
  camera_move:
    # --- 已有中文术语 ---
    - "推镜头"
    - "拉镜头"
    - "摇镜头"
    - "跟镜头"
    - "移镜头"
    - "升降镜头"
    - "微推镜头"
    - "短促轻推"
    - "轻微后拉"
    - "微摇镜头"
    - "缓慢推镜头"
    - "快速推镜头"
    - "环绕镜头"
    - "旋转镜头"
    - "俯仰镜头"
    - "横移镜头"
    - "纵移镜头"
    - "弧形运动"
    - "微固定"
    - "镜头呼吸感"
    # --- 已有英文术语 ---
    - "push in"
    - "pull back"
    - "pan left"
    - "pan right"
    - "tilt up"
    - "tilt down"
    - "zoom in"
    - "zoom out"
    - "tracking shot"
    - "dolly shot"
    - "crane shot"
    - "handheld"
    - "steady cam"
    - "drone shot"
    - "aerial shot"
    - "orbit shot"
    - "rotate shot"
    - "rack focus"
    - "whip pan"
    # --- 扩展英文术语 ---
    - "Dutch angle"
    - "Steadicam"
    - "Gimbal"
    - "FPV"
    - "Bird's eye view"
    - "Worm's eye view"
    - "Jib shot"
    - "Arc shot"
    - "Dolly zoom"
    - "Vertigo effect"
    - "Snap zoom"
    - "Tilt-shift"
    - "Dutch tilt"
    - "Low angle"
    - "High angle"
    - "Eye level"
    - "Over the shoulder"
    - "Point of view"
    - "Establishing shot"
    - "Insert shot"
    - "Cutaway"
    - "Two shot"
    - "Three shot"
    - "Group shot"
    - "Wide shot"
    - "Extreme wide shot"
    - "Medium shot"
    - "Medium close-up"
    - "Close-up"
    - "Extreme close-up"
    - "Cowboy shot"
    - "Full shot"
    - "Master shot"
    # --- 扩展中文术语 ---
    - "荷兰角"
    - "稳定器"
    - "鸟瞰"
    - "虫瞰"
    - "弧线镜头"
    - "推轨变焦"
    - "眩晕效果"
    - "甩镜头"
    - "急速变焦"
    - "焦点转换"
    - "移轴"
    - "低位仰拍"
    - "高位俯拍"
    - "平视"
    - "过肩镜头"
    - "主观视角"
    - "建立镜头"
    - "插入镜头"
    - "切出镜头"
    - "双人镜头"
    - "三人镜头"
    - "群像镜头"
    - "远景"
    - "大远景"
    - "中景"
    - "中近景"
    - "近景"
    - "特写"
    - "大特写"
    - "牛仔镜头"
    - "全景"
    - "主镜头"

  # ============================================================
  # 景别组合术语（v2.3.0 新增）
  # ============================================================
  shot_size:
    - "双人近景"
    - "双人中景"
    - "双人全身"
    - "上半身特写"
    - "下半身特写"
    - "肌肤局部特写"
    - "面部特写"
    - "眼神特写"
    - "嘴唇特写"
    - "锁骨特写"
    - "手部特写"
    - "正反特写"
    - "过肩特写"
    - "背影特写"
    - "剪影特写"
    - "轮廓特写"
    # --- v2.3.1 扩展组合景别 ---
    - "手部极致微距特写"
    - "竖屏单人近景"
    - "微距特写"
    - "极致微距"

  # ============================================================
  # 机位固定与运动组合（v2.3.0 新增）
  # ============================================================
  camera_fixed:
    - "微俯固定"
    - "微仰固定"
    - "平视固定"
    - "侧光固定"
    - "顶光固定"
    - "逆光固定"
    - "顺光固定"
    - "固定不动"
    - "固定机位"
    - "固定特写"
    - "固定镜头"
    - "固定近景"
    - "固定中景"
    - "固定全景"
    - "缓慢前推"
    - "快速前推"
    - "缓慢后拉"
    - "快速后拉"
    - "微前推"
    - "微后拉"
    - "横移跟随"
    - "纵移跟随"
    - "弧形围绕"
    - "环绕跟随"
    # --- v2.3.1 扩展运镜术语 ---
    - "跟手动态运镜"
    - "匀速移动"
    - "平稳拉镜"
    - "微推锁定"
    - "呼吸晃动"
    - "静止定格"
    - "小幅拉镜"
    - "小幅前推"
    - "小幅后拉"

  # ============================================================
  # 影视调度术语（v2.3.0 新增）
  # ============================================================
  blocking:
    - "场面调度"
    - "空间调度"
    - "人物站位调度"
    - "镜头调度"
    - "光影调度"
    - "表演调度"
    - "动作调度"
    - "色彩调度"
    - "声音调度"
    - "动线"
    - "站位"
    - "轴线"
    - "越轴"
    - "对轴"
    - "机位"
    - "景深"
    - "压缩空间"
    - "拉开空间"
    - "贴身对峙"
    - "高低位差"
    - "强弱区"
    - "视觉重心"
    - "前景遮挡"
    - "背景虚化"
    - "空间锚定"
    - "方向锁"
    - "角色锁定"
    - "段尾钩子"
    - "戏剧内核"
    - "戏剧反差"
    - "表演分层"
    - "镜头递进"

  # ============================================================
  # 焦段术语（v2.3.1 新增）
  # ============================================================
  focal_length:
    - "长焦微距"
    - "人像焦段"
    - "广角焦段"
    - "标准焦段"
    - "长焦焦段"
    - "微距焦段"
    - "鱼眼焦段"
    - "移轴焦段"
    - "中焦焦段"
    - "短焦焦段"

  # ============================================================
  # 影视表演术语（v2.3.1 新增）
  # ============================================================
  performance:
    - "腰背挺直"
    - "侧脸冷硬"
    - "冷淡无视"
    - "娇柔谄媚"
    - "柔媚笑意"
    - "肢体动作连贯"
    - "呼吸刻意放轻"
    - "情绪起伏"
    - "刻意讨好"
    - "视线黏在"
    - "脑袋轻靠"
    - "肩膀蹭动"
    - "眉眼弯起"
    - "毫无情绪起伏"

  # ============================================================
  # 2. 光影术语
  # ============================================================
  light_effect:
    # --- 已有中文术语 ---
    - "侧光"
    - "冷调"
    - "暖调"
    - "轮廓光"
    - "火光照明"
    - "昏暗阴影"
    - "侧面强光"
    - "半边脸隐在暗中"
    - "自然光"
    - "逆光"
    - "顶光"
    - "柔光"
    - "硬光"
    # --- 扩展英文术语 ---
    - "Key light"
    - "Fill light"
    - "Back light"
    - "Rim light"
    - "Ambient light"
    - "Practical light"
    - "Hard light"
    - "Soft light"
    - "Directional light"
    - "Diffused light"
    - "Spotlight"
    - "Floodlight"
    - "Neon light"
    - "Candlelight"
    - "Moonlight"
    - "Sunlight"
    - "Golden hour"
    - "Blue hour"
    - "Magic hour"
    - "Rembrandt lighting"
    - "Butterfly lighting"
    - "Split lighting"
    - "Loop lighting"
    - "Broad lighting"
    - "Short lighting"
    - "High key"
    - "Low key"
    - "Chiaroscuro"
    - "Three-point lighting"
    - "Studio lighting"
    - "Natural lighting"
    - "Silhouette"
    - "Lens flare"
    - "God rays"
    - "Volumetric lighting"
    - "Caustics"
    - "Subsurface scattering"
    - "Global illumination"
    - "Ambient occlusion"
    - "Ray tracing"
    - "HDR"
    - "Bloom"
    - "Tone mapping"
    # --- 扩展中文术语 ---
    - "主光"
    - "补光"
    - "背光"
    - "边缘光"
    - "环境光"
    - "实景光"
    - "定向光"
    - "漫射光"
    - "聚光灯"
    - "泛光灯"
    - "霓虹灯"
    - "烛光"
    - "月光"
    - "阳光"
    - "黄金时刻"
    - "蓝色时刻"
    - "魔术时刻"
    - "伦勃朗布光"
    - "蝴蝶布光"
    - "分割布光"
    - "环形布光"
    - "宽光"
    - "短光"
    - "高调"
    - "低调"
    - "明暗对比"
    - "三点布光"
    - "影棚布光"
    - "剪影"
    - "镜头光晕"
    - "丁达尔效应"
    - "体积光"
    - "焦散"
    - "次表面散射"
    - "全局光照"
    - "环境光遮蔽"
    - "光线追踪"
    - "泛光"
    - "色调映射"
    # --- v2.3.1 扩展影视光影术语 ---
    - "局部单点烛光"
    - "明暗分割"
    - "明暗交界"
    - "大面积虚化压暗"
    - "大面积暗调虚化"
    - "深暗背景"

  # ============================================================
  # 3. 情绪/表情术语
  # ============================================================
  emotion_word:
    # --- 已有中文术语 ---
    - "倔强"
    - "戒备"
    - "阴狠"
    - "戏谑"
    - "冷静"
    - "不怀好意"
    - "挑衅"
    - "玩味"
    - "粗鲁"
    - "清冷"
    - "紧绷"
    - "凶狠"
    # --- 扩展英文术语 ---
    - "Happy"
    - "Sad"
    - "Angry"
    - "Surprised"
    - "Disgusted"
    - "Fearful"
    - "Contemptuous"
    - "Excited"
    - "Calm"
    - "Anxious"
    - "Nostalgic"
    - "Melancholic"
    - "Euphoric"
    - "Serene"
    - "Tense"
    - "Relaxed"
    - "Confident"
    - "Insecure"
    - "Curious"
    - "Bored"
    - "Hopeful"
    - "Desperate"
    - "Proud"
    - "Ashamed"
    - "Jealous"
    - "Envious"
    - "Grateful"
    - "Resentful"
    - "Lonely"
    - "Loved"
    - "Heartbroken"
    - "Passionate"
    - "Indifferent"
    - "Determined"
    - "Hesitant"
    - "Brave"
    - "Cowardly"
    - "Wise"
    - "Foolish"
    - "Kind"
    - "Cruel"
    - "Generous"
    - "Selfish"
    - "Humble"
    - "Arrogant"
    - "Honest"
    - "Deceitful"
    - "Loyal"
    - "Treacherous"
    # --- 扩展中文术语 ---
    - "快乐"
    - "悲伤"
    - "愤怒"
    - "惊讶"
    - "厌恶"
    - "恐惧"
    - "轻蔑"
    - "兴奋"
    - "平静"
    - "焦虑"
    - "怀旧"
    - "忧郁"
    - "欣快"
    - "宁静"
    - "紧张"
    - "放松"
    - "自信"
    - "不安"
    - "好奇"
    - "无聊"
    - "希望"
    - "绝望"
    - "骄傲"
    - "羞愧"
    - "嫉妒"
    - "羡慕"
    - "感恩"
    - "怨恨"
    - "孤独"
    - "被爱"
    - "心碎"
    - "热情"
    - "冷漠"
    - "坚定"
    - "犹豫"
    - "勇敢"
    - "懦弱"
    - "智慧"
    - "愚蠢"
    - "善良"
    - "残忍"
    - "慷慨"
    - "自私"
    - "谦逊"
    - "傲慢"
    - "诚实"
    - "狡诈"
    - "忠诚"
    - "背叛"

  # ============================================================
  # 4. 转场标记
  # ============================================================
  scene_transition:
    # --- 已有中文术语 ---
    - "转场"
    - "淡入"
    - "淡出"
    - "叠化"
    - "划像"
    - "硬切"
    - "闪白"
    - "闪黑"
    - "溶解"
    - "渐变"
    # --- 已有英文术语 ---
    - "fade in"
    - "fade out"
    - "dissolve"
    - "wipe"
    - "cut to"
    - "smash cut"
    - "jump cut"
    - "match cut"
    - "cross dissolve"

  # ============================================================
  # 5. AI/机器学习术语
  # ============================================================
  ai_ml_term:
    # --- 英文术语 ---
    - "LLM"
    - "GPT"
    - "Transformer"
    - "Token"
    - "Embedding"
    - "Fine-tuning"
    - "Fine-tune"
    - "RAG"
    - "Prompt engineering"
    - "Chain of thought"
    - "Few-shot"
    - "Zero-shot"
    - "LoRA"
    - "QLoRA"
    - "PEFT"
    - "RLHF"
    - "DPO"
    - "PPO"
    - "Hallucination"
    - "Context window"
    - "Temperature"
    - "Top-p"
    - "Top-k"
    - "Beam search"
    - "Greedy decoding"
    - "Attention mechanism"
    - "Self-attention"
    - "Multi-head attention"
    - "BERT"
    - "GPT-4"
    - "Claude"
    - "Gemini"
    - "Llama"
    - "Mistral"
    - "Quantization"
    - "Pruning"
    - "Distillation"
    - "Inference"
    - "Training"
    - "Epoch"
    - "Batch size"
    - "Learning rate"
    - "Gradient descent"
    - "Backpropagation"
    - "Overfitting"
    - "Underfitting"
    - "Regularization"
    - "Dropout"
    - "Batch normalization"
    - "Activation function"
    - "Softmax"
    - "ReLU"
    - "Sigmoid"
    - "Loss function"
    - "Cross-entropy"
    - "MSE"
    - "Optimizer"
    - "Adam"
    - "SGD"
    - "AdamW"
    - "Checkpoint"
    - "Weights"
    - "Biases"
    - "Parameters"
    - "Hyperparameters"
    - "Embedding space"
    - "Vector database"
    - "Semantic search"
    - "Cosine similarity"
    - "Dot product"
    - "Dimensionality reduction"
    - "PCA"
    - "t-SNE"
    - "UMAP"
    - "Clustering"
    - "K-means"
    - "DBSCAN"
    - "Classification"
    - "Regression"
    - "Reinforcement learning"
    - "Supervised learning"
    - "Unsupervised learning"
    - "Transfer learning"
    - "Data augmentation"
    - "Feature extraction"
    - "Feature engineering"
    - "Model compression"
    - "Edge inference"
    - "Latency"
    - "Throughput"
    - "FLOPS"
    - "GPU"
    - "TPU"
    - "CUDA"
    - "Tensor"
    - "Matrix multiplication"
    - "Forward pass"
    - "Backward pass"
    - "Gradient clipping"
    - "Early stopping"
    - "Learning rate scheduler"
    - "Warmup"
    - "Cosine annealing"
    - "Linear schedule"
    - "Exponential decay"
    # --- 中文术语 ---
    - "大语言模型"
    - "提示词工程"
    - "思维链"
    - "少样本"
    - "零样本"
    - "微调"
    - "检索增强生成"
    - "幻觉"
    - "上下文窗口"
    - "温度"
    - "注意力机制"
    - "自注意力"
    - "多头注意力"
    - "量化"
    - "剪枝"
    - "蒸馏"
    - "推理"
    - "训练"
    - "轮次"
    - "批大小"
    - "学习率"
    - "梯度下降"
    - "反向传播"
    - "过拟合"
    - "欠拟合"
    - "正则化"
    - "丢弃"
    - "批归一化"
    - "激活函数"
    - "损失函数"
    - "交叉熵"
    - "优化器"
    - "检查点"
    - "权重"
    - "偏置"
    - "参数"
    - "超参数"
    - "嵌入空间"
    - "向量数据库"
    - "语义搜索"
    - "余弦相似度"
    - "降维"
    - "聚类"
    - "分类"
    - "回归"
    - "强化学习"
    - "监督学习"
    - "无监督学习"
    - "迁移学习"
    - "数据增强"
    - "特征提取"
    - "特征工程"
    - "模型压缩"
    - "边缘推理"
    - "延迟"
    - "吞吐量"

  # ============================================================
  # 6. SD/图像生成术语
  # ============================================================
  sd_image_term:
    # --- 英文术语 ---
    - "Checkpoint"
    - "Sampler"
    - "DPM++"
    - "Karras"
    - "Euler a"
    - "CFG scale"
    - "Steps"
    - "Denoising strength"
    - "VAE"
    - "CLIP"
    - "Tokenizer"
    - "Latent space"
    - "Upscale"
    - "Hires fix"
    - "ControlNet"
    - "IP-Adapter"
    - "Textual inversion"
    - "LoRA"
    - "LyCORIS"
    - "Hypernetwork"
    - "VAE decode"
    - "Img2img"
    - "Inpainting"
    - "Outpainting"
    - "Inpaint"
    - "Outpaint"
    - "Mask"
    - "Region"
    - "Seed"
    - "Variation"
    - "Blend"
    - "Merge"
    - "Concat"
    - "Merge model"
    - "Prune"
    - "EMA"
    - "FP16"
    - "BF16"
    - "Safetensors"
    - "Ckpt"
    - "Pth"
    - "Diffusion"
    - "Stable Diffusion"
    - "SDXL"
    - "SD 1.5"
    - "SD 2.1"
    - "SD 3"
    - "Flux"
    - "Midjourney"
    - "DALL-E"
    - "DALLE"
    - "NovelAI"
    - "NAI"
    - "Pony"
    - "Illustrious"
    - "NoobAI"
    - "Animagine"
    - "AnythingV3"
    - "Realistic Vision"
    - "DreamShaper"
    - "Civitai"
    - "A1111"
    - "Forge"
    - "ComfyUI"
    - "InvokeAI"
    # --- 中文术语 ---
    - "推理步数"
    - "采样器"
    - "降噪强度"
    - "潜空间"
    - "放大"
    - "高清修复"
    - "蒙版"
    - "区域"
    - "种子"
    - "变体"
    - "混合"
    - "合并模型"
    - "剪枝"
    - "扩散"
    - "稳定扩散"

  # ============================================================
  # 7. 摄影术语
  # ============================================================
  photography_term:
    # --- 英文术语 ---
    - "Aperture"
    - "Shutter speed"
    - "ISO"
    - "Exposure"
    - "Bokeh"
    - "Depth of field"
    - "DOF"
    - "Focal length"
    - "Wide angle"
    - "Telephoto"
    - "Macro"
    - "Fisheye"
    - "Tilt-shift"
    - "Lens flare"
    - "Chromatic aberration"
    - "Vignette"
    - "Grain"
    - "Noise"
    - "HDR"
    - "Bracketing"
    - "Long exposure"
    - "Double exposure"
    - "Multiple exposure"
    - "Panorama"
    - "Time-lapse"
    - "Bulb"
    - "RAW"
    - "JPEG"
    - "TIFF"
    - "Color space"
    - "sRGB"
    - "Adobe RGB"
    - "ProPhoto"
    - "White balance"
    - "AWB"
    - "Kelvin"
    - "Color temperature"
    - "Tungsten"
    - "Fluorescent"
    - "Daylight"
    - "Cloudy"
    - "Shade"
    - "Rule of thirds"
    - "Golden ratio"
    - "Leading lines"
    - "Framing"
    - "Symmetry"
    - "Patterns"
    - "Texture"
    - "Negative space"
    - "Foreground"
    - "Background"
    - "Midground"
    - "Subject"
    - "Composition"
    - "Aspect ratio"
    - "Megapixel"
    - "Resolution"
    - "Dynamic range"
    - "Histogram"
    - "Clipping"
    - "Blowout"
    - "Underexposed"
    - "Overexposed"
    - "Metering"
    - "Spot metering"
    - "Matrix metering"
    - "Center-weighted"
    - "Autofocus"
    - "Manual focus"
    - "AF-S"
    - "AF-C"
    - "AF point"
    - "Image stabilization"
    - "IS"
    - "VR"
    - "OIS"
    - "Tripod"
    - "Monopod"
    - "Gimbal"
    - "Filter"
    - "ND filter"
    - "Polarizer"
    - "UV filter"
    - "Gradient filter"
    - "Star filter"
    - "Soft focus"
    # --- 中文术语 ---
    - "光圈"
    - "快门速度"
    - "感光度"
    - "曝光"
    - "景深"
    - "焦距"
    - "广角"
    - "长焦"
    - "微距"
    - "鱼眼"
    - "移轴"
    - "镜头光晕"
    - "色差"
    - "暗角"
    - "颗粒"
    - "噪点"
    - "包围曝光"
    - "长曝光"
    - "双重曝光"
    - "多重曝光"
    - "全景"
    - "延时摄影"
    - "RAW格式"
    - "色彩空间"
    - "白平衡"
    - "色温"
    - "三分法"
    - "黄金比例"
    - "引导线"
    - "构图"
    - "画幅比"
    - "动态范围"
    - "直方图"
    - "测光"
    - "自动对焦"
    - "手动对焦"
    - "图像防抖"
    - "三脚架"
    - "滤镜"

  # ============================================================
  # 8. 艺术风格术语
  # ============================================================
  art_style:
    # --- 英文术语 ---
    - "Impressionism"
    - "Surrealism"
    - "Cubism"
    - "Abstract"
    - "Expressionism"
    - "Minimalism"
    - "Baroque"
    - "Rococo"
    - "Renaissance"
    - "Gothic"
    - "Art Deco"
    - "Art Nouveau"
    - "Bauhaus"
    - "Pop Art"
    - "Op Art"
    - "Conceptual art"
    - "Contemporary"
    - "Modern"
    - "Classical"
    - "Neo-classical"
    - "Romanticism"
    - "Realism"
    - "Photorealism"
    - "Hyperrealism"
    - "Stylized"
    - "Cartoon"
    - "Anime"
    - "Manga"
    - "Pixel art"
    - "Vector art"
    - "Watercolor"
    - "Oil painting"
    - "Acrylic"
    - "Charcoal"
    - "Pencil sketch"
    - "Ink"
    - "Pastel"
    - "Gouache"
    - "Tempera"
    - "Fresco"
    - "Engraving"
    - "Lithography"
    - "Screen printing"
    - "Digital painting"
    - "Matte painting"
    - "Concept art"
    - "Character design"
    - "Environment design"
    - "Storyboard"
    - "Comic book"
    - "Graphic novel"
    - "Cel shading"
    - "Flat shading"
    - "Gouraud shading"
    - "Phong shading"
    - "Toon shading"
    - "Hatching"
    - "Cross-hatching"
    - "Stippling"
    - "Pointillism"
    - "Sfumato"
    - "Impasto"
    - "Glazing"
    - "Scumbling"
    - "Dry brush"
    - "Wet on wet"
    - "Alla prima"
    # --- 中文术语 ---
    - "印象派"
    - "超现实主义"
    - "立体主义"
    - "抽象"
    - "表现主义"
    - "极简主义"
    - "巴洛克"
    - "洛可可"
    - "文艺复兴"
    - "哥特式"
    - "装饰艺术"
    - "新艺术运动"
    - "包豪斯"
    - "波普艺术"
    - "当代"
    - "现代"
    - "古典"
    - "新古典"
    - "浪漫主义"
    - "现实主义"
    - "照片级写实"
    - "超写实"
    - "风格化"
    - "卡通"
    - "动漫"
    - "漫画"
    - "像素艺术"
    - "矢量艺术"
    - "水彩"
    - "油画"
    - "丙烯"
    - "炭笔"
    - "铅笔素描"
    - "水墨"
    - "粉彩"
    - "数字绘画"
    - "概念艺术"
    - "角色设计"
    - "环境设计"
    - "分镜"
    - "漫画书"
    - "图像小说"
    - "赛璐璐着色"
    - "平面着色"
    - "排线"
    - "交叉排线"
    - "点画"
    - "晕涂法"
    - "厚涂"

  # ============================================================
  # 9. 色彩理论术语
  # ============================================================
  color_term:
    # --- 英文术语 ---
    - "Complementary colors"
    - "Analogous colors"
    - "Triadic"
    - "Tetradic"
    - "Monochromatic"
    - "Warm colors"
    - "Cool colors"
    - "Primary colors"
    - "Secondary colors"
    - "Tertiary colors"
    - "Hue"
    - "Saturation"
    - "Brightness"
    - "Value"
    - "Lightness"
    - "Chroma"
    - "Tint"
    - "Shade"
    - "Tone"
    - "Color wheel"
    - "Color palette"
    - "Color scheme"
    - "Color harmony"
    - "Color temperature"
    - "Color grading"
    - "Color correction"
    - "Color space"
    - "RGB"
    - "CMYK"
    - "HSL"
    - "HSV"
    - "LAB"
    - "YUV"
    - "Grayscale"
    - "Sepia"
    - "Duotone"
    - "Tritone"
    - "Quadtone"
    - "Gradient"
    - "Ombre"
    - "Iridescent"
    - "Holographic"
    - "Pearlescent"
    - "Metallic"
    - "Matte"
    - "Glossy"
    - "Satin"
    - "Vibrant"
    - "Muted"
    - "Pastel"
    - "Neon"
    - "Earth tones"
    - "Skin tones"
    - "Flesh tones"
    # --- 中文术语 ---
    - "互补色"
    - "类似色"
    - "三元色"
    - "四元色"
    - "单色"
    - "暖色"
    - "冷色"
    - "原色"
    - "间色"
    - "复色"
    - "色相"
    - "饱和度"
    - "明度"
    - "色度"
    - "色调"
    - "色轮"
    - "调色板"
    - "配色方案"
    - "色彩和谐"
    - "色温"
    - "调色"
    - "校色"
    - "色彩空间"
    - "灰度"
    - "棕褐色"
    - "双色调"
    - "渐变"
    - "彩虹色"
    - "全息"
    - "珠光"
    - "金属色"
    - "哑光"
    - "光泽"
    - "缎面"
    - "鲜艳"
    - "柔和"
    - "粉彩"
    - "霓虹"
    - "大地色系"
    - "肤色"

  # ============================================================
  # 10. 构图术语
  # ============================================================
  composition_term:
    # --- 英文术语 ---
    - "Rule of thirds"
    - "Golden ratio"
    - "Golden spiral"
    - "Fibonacci spiral"
    - "Leading lines"
    - "Framing"
    - "Symmetry"
    - "Asymmetry"
    - "Balance"
    - "Radial balance"
    - "Negative space"
    - "Positive space"
    - "Foreground interest"
    - "Layering"
    - "Depth"
    - "Perspective"
    - "Vanishing point"
    - "Horizon line"
    - "Eye level"
    - "Bird's eye"
    - "Worm's eye"
    - "Dutch angle"
    - "Dutch tilt"
    - "Overhead"
    - "Top-down"
    - "Isometric"
    - "Orthographic"
    - "Foreshortening"
    - "Scale"
    - "Proportion"
    - "Scale comparison"
    - "Juxtaposition"
    - "Repetition"
    - "Pattern"
    - "Rhythm"
    - "Unity"
    - "Variety"
    - "Emphasis"
    - "Focal point"
    - "Center of interest"
    - "Visual weight"
    - "Visual flow"
    - "S-curve"
    - "C-curve"
    - "L-shape"
    - "Triangle"
    - "Diagonal"
    - "Horizontal"
    - "Vertical"
    - "Grid"
    - "Modular grid"
    - "Column"
    - "Row"
    - "Margin"
    - "Gutter"
    - "Bleed"
    - "Trim"
    - "Safe area"
    # --- 中文术语 ---
    - "三分法"
    - "黄金比例"
    - "黄金螺旋"
    - "引导线"
    - "框架构图"
    - "对称"
    - "不对称"
    - "平衡"
    - "留白"
    - "前景"
    - "层次"
    - "纵深"
    - "透视"
    - "消失点"
    - "地平线"
    - "荷兰角"
    - "俯视"
    - "仰视"
    - "等距投影"
    - "正交投影"
    - "透视缩短"
    - "比例"
    - "并置"
    - "重复"
    - "图案"
    - "节奏"
    - "统一"
    - "多样"
    - "强调"
    - "焦点"
    - "视觉重量"
    - "视觉引导线"
    - "S曲线"
    - "三角构图"
    - "对角线"
    - "网格"

  # ============================================================
  # 11. 音乐音频术语
  # ============================================================
  music_audio_term:
    # --- 英文术语 ---
    - "Tempo"
    - "BPM"
    - "Pitch"
    - "Tone"
    - "Note"
    - "Chord"
    - "Melody"
    - "Harmony"
    - "Rhythm"
    - "Beat"
    - "Bass"
    - "Treble"
    - "Mid range"
    - "Frequency"
    - "Hertz"
    - "Decibel"
    - "dB"
    - "Volume"
    - "Gain"
    - "Pan"
    - "Reverb"
    - "Echo"
    - "Delay"
    - "Chorus"
    - "Flanger"
    - "Phaser"
    - "Distortion"
    - "Overdrive"
    - "Fuzz"
    - "Compressor"
    - "Limiter"
    - "Equalizer"
    - "EQ"
    - "Filter"
    - "Low-pass"
    - "High-pass"
    - "Band-pass"
    - "Notch"
    - "Envelope"
    - "ADSR"
    - "Attack"
    - "Decay"
    - "Sustain"
    - "Release"
    - "LFO"
    - "Oscillator"
    - "Synthesizer"
    - "Sampler"
    - "Drum machine"
    - "Sequencer"
    - "MIDI"
    - "Audio interface"
    - "Microphone"
    - "Condenser"
    - "Dynamic"
    - "Ribbon"
    - "Cardioid"
    - "Omnidirectional"
    - "Bidirectional"
    - "Stereo"
    - "Mono"
    - "Surround"
    - "5.1"
    - "7.1"
    - "Atmos"
    - "Ambisonic"
    - "Binaural"
    - "Foley"
    - "Sound effect"
    - "SFX"
    - "Background music"
    - "BGM"
    - "Soundtrack"
    - "Score"
    - "Jingle"
    - "Stinger"
    - "Bed"
    - "Sweetener"
    - "Stem"
    - "Mix"
    - "Master"
    - "Remix"
    - "Dub"
    - "Dubstep"
    - "EDM"
    - "Techno"
    - "House"
    - "Trance"
    - "Drum and bass"
    - "Ambient"
    - "Lo-fi"
    - "Hip hop"
    - "Rock"
    - "Jazz"
    - "Classical"
    - "Folk"
    - "Country"
    - "Pop"
    - "R&B"
    - "Soul"
    - "Funk"
    - "Reggae"
    - "Metal"
    - "Punk"
    - "Blues"
    # --- 中文术语 ---
    - "节奏"
    - "旋律"
    - "和声"
    - "低音"
    - "高音"
    - "频率"
    - "赫兹"
    - "分贝"
    - "音量"
    - "增益"
    - "声像"
    - "混响"
    - "回声"
    - "延迟"
    - "合唱"
    - "镶边"
    - "移相"
    - "失真"
    - "压缩器"
    - "限制器"
    - "均衡器"
    - "滤波器"
    - "低通"
    - "高通"
    - "包络"
    - "振荡器"
    - "合成器"
    - "采样器"
    - "鼓机"
    - "音序器"
    - "麦克风"
    - "电容话筒"
    - "动圈话筒"
    - "立体声"
    - "单声道"
    - "环绕声"
    - "拟音"
    - "音效"
    - "背景音乐"
    - "配乐"
    - "混音"
    - "母带"
    - "电子舞曲"

  # ============================================================
  # 12. 编程术语
  # ============================================================
  programming_term:
    # --- 英文术语 ---
    - "Function"
    - "Variable"
    - "Constant"
    - "Class"
    - "Object"
    - "Method"
    - "Property"
    - "Interface"
    - "Type"
    - "Enum"
    - "Struct"
    - "Array"
    - "List"
    - "Dictionary"
    - "Map"
    - "Set"
    - "Tuple"
    - "String"
    - "Integer"
    - "Float"
    - "Boolean"
    - "Null"
    - "Undefined"
    - "Void"
    - "Async"
    - "Await"
    - "Promise"
    - "Callback"
    - "Event"
    - "Listener"
    - "Handler"
    - "Observer"
    - "Iterator"
    - "Generator"
    - "Decorator"
    - "Wrapper"
    - "Module"
    - "Package"
    - "Import"
    - "Export"
    - "Namespace"
    - "Scope"
    - "Closure"
    - "Hoisting"
    - "Prototype"
    - "Inheritance"
    - "Polymorphism"
    - "Encapsulation"
    - "Abstraction"
    - "Constructor"
    - "Destructor"
    - "Getter"
    - "Setter"
    - "Static"
    - "Instance"
    - "This"
    - "Self"
    - "Super"
    - "Extend"
    - "Implement"
    - "Override"
    - "Overload"
    - "Recursive"
    - "Iteration"
    - "Loop"
    - "For"
    - "While"
    - "Switch"
    - "Case"
    - "If"
    - "Else"
    - "Try"
    - "Catch"
    - "Finally"
    - "Throw"
    - "Exception"
    - "Error"
    - "Warning"
    - "Debug"
    - "Breakpoint"
    - "Log"
    - "Console"
    - "Print"
    - "Assert"
    - "Test"
    - "Unit test"
    - "Integration test"
    - "Mock"
    - "Stub"
    - "Spy"
    - "Fixture"
    - "Coverage"
    - "CI"
    - "CD"
    - "Git"
    - "Branch"
    - "Commit"
    - "Push"
    - "Pull"
    - "Merge"
    - "Rebase"
    - "Conflict"
    - "Tag"
    - "Release"
    - "Deploy"
    - "Rollback"
    - "API"
    - "REST"
    - "GraphQL"
    - "gRPC"
    - "WebSocket"
    - "HTTP"
    - "HTTPS"
    - "TCP"
    - "UDP"
    - "DNS"
    - "CDN"
    - "SSL"
    - "TLS"
    - "CORS"
    - "Authentication"
    - "Authorization"
    - "JWT"
    - "OAuth"
    - "Session"
    - "Cookie"
    - "Token"
    - "Cache"
    - "Queue"
    - "Stack"
    - "Heap"
    - "Buffer"
    - "Stream"
    - "Pipe"
    - "Thread"
    - "Process"
    - "Worker"
    - "Daemon"
    - "Cron"
    # --- 中文术语 ---
    - "函数"
    - "变量"
    - "常量"
    - "类"
    - "对象"
    - "方法"
    - "属性"
    - "接口"
    - "类型"
    - "枚举"
    - "结构体"
    - "数组"
    - "字典"
    - "字符串"
    - "整数"
    - "浮点数"
    - "布尔值"
    - "异步"
    - "回调"
    - "事件"
    - "闭包"
    - "原型"
    - "继承"
    - "多态"
    - "封装"
    - "抽象"
    - "构造函数"
    - "作用域"
    - "模块"
    - "命名空间"
    - "递归"
    - "循环"
    - "异常"
    - "错误"
    - "调试"
    - "断点"
    - "单元测试"
    - "集成测试"
    - "持续集成"
    - "持续部署"
    - "分支"
    - "提交"
    - "合并"
    - "缓存"
    - "队列"
    - "栈"
    - "堆"
    - "线程"
    - "进程"

  # ============================================================
  # 13. 数据科学术语
  # ============================================================
  data_science_term:
    # --- 英文术语 ---
    - "Dataset"
    - "Dataframe"
    - "Series"
    - "Index"
    - "Column"
    - "Row"
    - "Cell"
    - "Missing value"
    - "NaN"
    - "Null"
    - "Outlier"
    - "Normalization"
    - "Standardization"
    - "Min-max"
    - "Z-score"
    - "One-hot encoding"
    - "Label encoding"
    - "Feature"
    - "Feature engineering"
    - "Feature selection"
    - "Dimensionality"
    - "PCA"
    - "t-SNE"
    - "Correlation"
    - "Covariance"
    - "P-value"
    - "Hypothesis"
    - "A/B testing"
    - "Statistical significance"
    - "Confidence interval"
    - "Regression"
    - "Logistic regression"
    - "Linear regression"
    - "Decision tree"
    - "Random forest"
    - "Gradient boosting"
    - "XGBoost"
    - "LightGBM"
    - "CatBoost"
    - "Neural network"
    - "CNN"
    - "RNN"
    - "LSTM"
    - "GRU"
    - "GAN"
    - "VAE"
    - "Autoencoder"
    - "Transformer"
    - "BERT"
    - "GPT"
    - "Clustering"
    - "K-means"
    - "Hierarchical"
    - "DBSCAN"
    - "Silhouette"
    - "Elbow method"
    - "Confusion matrix"
    - "Precision"
    - "Recall"
    - "F1 score"
    - "Accuracy"
    - "ROC"
    - "AUC"
    - "Precision-recall curve"
    - "True positive"
    - "False positive"
    - "True negative"
    - "False negative"
    - "Sensitivity"
    - "Specificity"
    - "Overfitting"
    - "Underfitting"
    - "Cross-validation"
    - "K-fold"
    - "Train test split"
    - "Hyperparameter"
    - "Grid search"
    - "Random search"
    - "Bayesian optimization"
    - "Pipeline"
    - "Scikit-learn"
    - "TensorFlow"
    - "PyTorch"
    - "Keras"
    - "Pandas"
    - "NumPy"
    - "Matplotlib"
    - "Seaborn"
    - "Plotly"
    - "Jupyter"
    - "Colab"
    # --- 中文术语 ---
    - "数据集"
    - "数据框"
    - "缺失值"
    - "异常值"
    - "归一化"
    - "标准化"
    - "独热编码"
    - "特征"
    - "特征工程"
    - "特征选择"
    - "降维"
    - "相关性"
    - "协方差"
    - "P值"
    - "假设检验"
    - "A/B测试"
    - "统计显著性"
    - "置信区间"
    - "回归"
    - "逻辑回归"
    - "线性回归"
    - "决策树"
    - "随机森林"
    - "梯度提升"
    - "神经网络"
    - "卷积神经网络"
    - "循环神经网络"
    - "生成对抗网络"
    - "变分自编码器"
    - "自编码器"
    - "聚类"
    - "混淆矩阵"
    - "精确率"
    - "召回率"
    - "F1分数"
    - "准确率"
    - "过拟合"
    - "交叉验证"
    - "超参数"
    - "网格搜索"
    - "管道"

  # ============================================================
  # 14. 叙事写作术语
  # ============================================================
  narrative_term:
    # --- 英文术语 ---
    - "Protagonist"
    - "Antagonist"
    - "Character"
    - "Character arc"
    - "Backstory"
    - "Motivation"
    - "Goal"
    - "Conflict"
    - "Internal conflict"
    - "External conflict"
    - "Rising action"
    - "Climax"
    - "Falling action"
    - "Resolution"
    - "Denouement"
    - "Exposition"
    - "Inciting incident"
    - "Plot twist"
    - "Foreshadowing"
    - "Flashback"
    - "Flash-forward"
    - "Suspense"
    - "Tension"
    - "Pacing"
    - "Theme"
    - "Motif"
    - "Symbol"
    - "Symbolism"
    - "Metaphor"
    - "Simile"
    - "Allegory"
    - "Irony"
    - "Dramatic irony"
    - "Verbal irony"
    - "Situational irony"
    - "Personification"
    - "Hyperbole"
    - "Alliteration"
    - "Assonance"
    - "Consonance"
    - "Onomatopoeia"
    - "Imagery"
    - "Tone"
    - "Mood"
    - "Voice"
    - "Style"
    - "Point of view"
    - "First person"
    - "Second person"
    - "Third person"
    - "Omniscient"
    - "Limited"
    - "Stream of consciousness"
    - "Dialogue"
    - "Monologue"
    - "Soliloquy"
    - "Aside"
    - "Narrator"
    - "Narration"
    - "Setting"
    - "World-building"
    - "Lore"
    - "Canon"
    - "Continuity"
    - "Genre"
    - "Subplot"
    - "B-story"
    - "Act"
    - "Scene"
    - "Sequence"
    - "Beat"
    - "Treatment"
    - "Outline"
    - "Synopsis"
    - "Logline"
    - "Pitch"
    - "Draft"
    - "Revision"
    - "Edit"
    - "Proofread"
    # --- 中文术语 ---
    - "主角"
    - "反派"
    - "角色"
    - "角色弧线"
    - "背景故事"
    - "动机"
    - "目标"
    - "冲突"
    - "内心冲突"
    - "外部冲突"
    - "上升动作"
    - "高潮"
    - "下降动作"
    - "结局"
    - "铺垫"
    - "触发事件"
    - "情节反转"
    - "伏笔"
    - "闪回"
    - "闪前"
    - "悬念"
    - "张力"
    - "节奏"
    - "主题"
    - "母题"
    - "象征"
    - "隐喻"
    - "明喻"
    - "寓言"
    - "反讽"
    - "拟人"
    - "夸张"
    - "头韵"
    - "意象"
    - "语调"
    - "氛围"
    - "视角"
    - "第一人称"
    - "第三人称"
    - "全知视角"
    - "对话"
    - "独白"
    - "旁白"
    - "叙述者"
    - "场景设定"
    - "世界观构建"
    - "设定集"
    - "正典"
    - "连续性"
    - "体裁"
    - "副线"
    - "幕"
    - "场景"
    - "序列"
    - "节拍"
    - "大纲"
    - "梗概"
    - "一句话概要"
    - "草稿"
    - "修订"

  # ============================================================
  # 15. 营销术语
  # ============================================================
  marketing_term:
    # --- 英文术语 ---
    - "CTA"
    - "Call to action"
    - "Conversion"
    - "Conversion rate"
    - "Bounce rate"
    - "Click-through rate"
    - "CTR"
    - "ROI"
    - "ROAS"
    - "CPA"
    - "CPL"
    - "CAC"
    - "LTV"
    - "KPI"
    - "OKR"
    - "SEO"
    - "SEM"
    - "SERP"
    - "Backlink"
    - "Keyword"
    - "Long tail"
    - "SERP feature"
    - "Organic traffic"
    - "Paid traffic"
    - "Direct traffic"
    - "Referral traffic"
    - "Social media"
    - "SMM"
    - "Content marketing"
    - "Inbound marketing"
    - "Outbound marketing"
    - "Email marketing"
    - "Drip campaign"
    - "Newsletter"
    - "Lead"
    - "Lead generation"
    - "Lead scoring"
    - "Lead nurturing"
    - "Funnel"
    - "TOFU"
    - "MOFU"
    - "BOFU"
    - "Awareness"
    - "Consideration"
    - "Decision"
    - "Retention"
    - "Advocacy"
    - "Brand"
    - "Branding"
    - "Brand identity"
    - "Brand awareness"
    - "Brand loyalty"
    - "Positioning"
    - "Differentiation"
    - "Value proposition"
    - "Unique selling proposition"
    - "USP"
    - "Target audience"
    - "Persona"
    - "Customer journey"
    - "Touchpoint"
    - "Omnichannel"
    - "Multichannel"
    - "A/B testing"
    - "Multivariate testing"
    - "Heatmap"
    - "Session recording"
    - "Funnel analysis"
    - "Cohort analysis"
    - "Retention rate"
    - "Churn rate"
    - "NPS"
    - "Net promoter score"
    - "CSAT"
    - "CES"
    # --- 中文术语 ---
    - "用户画像"
    - "转化率"
    - "跳出率"
    - "点击率"
    - "投资回报率"
    - "搜索引擎优化"
    - "搜索引擎营销"
    - "内容营销"
    - "邮件营销"
    - "漏斗"
    - "品牌认知"
    - "品牌忠诚度"
    - "定位"
    - "差异化"
    - "价值主张"
    - "目标受众"
    - "客户旅程"
    - "全渠道"
    - "A/B测试"
    - "热力图"
    - "留存率"
    - "流失率"
    - "净推荐值"

  # ============================================================
  # 16. 游戏开发术语
  # ============================================================
  game_dev_term:
    # --- 英文术语 ---
    - "NPC"
    - "FPS"
    - "TPS"
    - "RPG"
    - "MMORPG"
    - "MOBA"
    - "RTS"
    - "Turn-based"
    - "Real-time"
    - "Physics engine"
    - "Collision detection"
    - "Raycasting"
    - "Pathfinding"
    - "A*"
    - "NavMesh"
    - "Steering behaviors"
    - "State machine"
    - "FSM"
    - "Behavior tree"
    - "ECS"
    - "Entity component system"
    - "Rendering"
    - "Rasterization"
    - "Ray tracing"
    - "Path tracing"
    - "Shader"
    - "Vertex shader"
    - "Fragment shader"
    - "Compute shader"
    - "Texture"
    - "UV mapping"
    - "Normal map"
    - "Bump map"
    - "Displacement map"
    - "Specular map"
    - "Roughness map"
    - "Metallic map"
    - "Ambient occlusion map"
    - "Albedo"
    - "PBR"
    - "Physically based rendering"
    - "LOD"
    - "Level of detail"
    - "Culling"
    - "Frustum culling"
    - "Occlusion culling"
    - "Draw call"
    - "Batch"
    - "Instancing"
    - "Atlas"
    - "Sprite"
    - "Sprite sheet"
    - "Animation"
    - "Skeletal animation"
    - "Blend tree"
    - "Inverse kinematics"
    - "IK"
    - "Forward kinematics"
    - "FK"
    - "Particle system"
    - "VFX"
    - "Post-processing"
    - "Bloom"
    - "Depth of field"
    - "Motion blur"
    - "Screen space reflections"
    - "SSR"
    - "Screen space ambient occlusion"
    - "SSAO"
    - "Tone mapping"
    - "Color grading"
    - "LUT"
    - "Frame rate"
    - "Delta time"
    - "Fixed update"
    - "Game loop"
    - "Coroutine"
    - "Async"
    - "Asset"
    - "Prefab"
    - "Scene"
    - "GameObject"
    - "Component"
    - "Transform"
    - "Collider"
    - "Rigidbody"
    - "Trigger"
    - "Raycast"
    - "Non-player character"
    - "Non playable character"
    - "Procedural generation"
    - "Roguelike"
    - "Metroidvania"
    - "Open world"
    - "Sandbox"
    - "Tutorial"
    - "Difficulty curve"
    - "Balance"
    - "Patch"
    - "Hotfix"
    - "DLC"
    - "Microtransaction"
    - "Loot box"
    # --- 中文术语 ---
    - "非玩家角色"
    - "第一人称射击"
    - "第三人称射击"
    - "角色扮演"
    - "物理引擎"
    - "碰撞检测"
    - "寻路"
    - "状态机"
    - "行为树"
    - "渲染"
    - "光线追踪"
    - "着色器"
    - "纹理"
    - "UV映射"
    - "法线贴图"
    - "物理渲染"
    - "细节层次"
    - "剔除"
    - "绘制调用"
    - "精灵图"
    - "动画"
    - "骨骼动画"
    - "逆运动学"
    - "粒子系统"
    - "特效"
    - "后处理"
    - "泛光"
    - "运动模糊"
    - "色调映射"
    - "帧率"
    - "游戏循环"
    - "协程"
    - "资源"
    - "预制体"
    - "场景"
    - "碰撞体"
    - "刚体"
    - "程序化生成"
    - "开放世界"
    - "沙盒"
    - "难度曲线"
    - "平衡性"
    - "补丁"
    - "热修复"

  # ============================================================
  # 17. 扩展质量标签
  # ============================================================
  quality_tag_ext:
    # --- 英文术语 ---
    - "ultra high quality"
    - "ultra HD"
    - "UHD"
    - "full HD"
    - "FHD"
    - "1080p"
    - "1440p"
    - "2K"
    - "4K"
    - "8K"
    - "16K"
    - "ultra-detailed"
    - "insanely detailed"
    - "intricate details"
    - "fine details"
    - "razor sharp"
    - "sharp focus"
    - "perfect composition"
    - "award winning"
    - "professional"
    - "studio quality"
    - "photorealistic"
    - "hyper-realistic"
    - "ultra-realistic"
    - "cinematic"
    - "cinematic lighting"
    - "cinematic composition"
    - "dramatic lighting"
    - "volumetric lighting"
    - "god rays"
    - "anamorphic"
    - "film grain"
    - "bokeh"
    - "shallow depth of field"
    - "depth of field"
    - "motion blur"
    - "long exposure"
    - "HDR"
    - "tone mapped"
    - "color graded"
    - "pristine"
    - "flawless"
    - "impeccable"
    - "sublime"
    - "breathtaking"
    - "stunning"
    - "gorgeous"
    - "magnificent"
    - "spectacular"
    - "awe-inspiring"
    # --- 中文术语 ---
    - "超高质量"
    - "超高清"
    - "全高清"
    - "超精细"
    - "极致细节"
    - "锐利对焦"
    - "完美构图"
    - "获奖"
    - "专业级"
    - "影棚级"
    - "照片级"
    - "超写实"
    - "电影感"
    - "电影级布光"
    - "戏剧性光照"
    - "体积光"
    - "变形宽屏"
    - "胶片颗粒"
    - "浅景深"
    - "高动态范围"
    - "无瑕疵"
    - "令人惊叹"
    - "壮观"
    - "绝美"

  # ============================================================
  # 18. SD 负面提示词标签
  # ============================================================
  negative_tag:
    # --- 英文术语 ---
    - "worst quality"
    - "low quality"
    - "normal quality"
    - "lowres"
    - "bad anatomy"
    - "bad hands"
    - "text"
    - "error"
    - "missing fingers"
    - "extra digit"
    - "fewer digits"
    - "cropped"
    - "jpeg artifacts"
    - "signature"
    - "watermark"
    - "username"
    - "blurry"
    - "artist name"
    - "deformed"
    - "ugly"
    - "duplicate"
    - "mutated"
    - "mutation"
    - "disfigured"
    - "poorly drawn"
    - "extra limbs"
    - "missing limbs"
    - "floating limbs"
    - "disconnected limbs"
    - "malformed hands"
    - "long neck"
    - "cross-eyed"
    - "mutated hands"
    - "poorly drawn hands"
    - "poorly drawn face"
    - "extra arms"
    - "extra legs"
    - "fused fingers"
    - "too many fingers"
    - "clone"
    - "bad proportions"
    - "gross proportions"
    - "malformed"
    - "missing arms"
    - "missing legs"
    - "extra ears"
    - "bad feet"
    - "distorted"
    - "grainy"
    - "cluttered"
    - "busy background"
    - "messy"
    - "chaotic"
    - "nsfw"
    # --- 中文术语 ---
    - "最低质量"
    - "低质量"
    - "低分辨率"
    - "错误的人体结构"
    - "错误的手"
    - "文字"
    - "错误"
    - "缺失手指"
    - "多余手指"
    - "裁切"
    - "JPEG伪影"
    - "签名"
    - "水印"
    - "用户名"
    - "模糊"
    - "艺术家名"
    - "畸形"
    - "丑陋"
    - "重复"
    - "变异"
    - "毁容"
    - "画得差"
    - "多余肢体"
    - "缺失肢体"
    - "悬浮肢体"
    - "断裂肢体"
    - "畸形手"
    - "长脖子"
    - "斗鸡眼"
    - "多余手臂"
    - "多余腿"
    - "手指融合"
    - "手指过多"
    - "克隆"
    - "比例失调"
    - "背景杂乱"
    - "凌乱"
    - "混乱"
    - "不安全内容"

  # ============================================================
  # 19. 医学术语
  # ============================================================
  medical_term:
    # --- 英文术语 ---
    - "Diagnosis"
    - "Treatment"
    - "Therapy"
    - "Medication"
    - "Prescription"
    - "Dosage"
    - "Symptom"
    - "Syndrome"
    - "Chronic"
    - "Acute"
    - "Benign"
    - "Malignant"
    - "Tumor"
    - "Cancer"
    - "Infection"
    - "Inflammation"
    - "Immune system"
    - "Vaccine"
    - "Vaccination"
    - "Antibody"
    - "Antigen"
    - "Pathogen"
    - "Bacteria"
    - "Virus"
    - "Fungal"
    - "Blood pressure"
    - "Heart rate"
    - "Pulse"
    - "Temperature"
    - "Respiration"
    - "MRI"
    - "CT scan"
    - "X-ray"
    - "Ultrasound"
    - "Biopsy"
    - "Blood test"
    - "Urine test"
    - "Surgery"
    - "Operation"
    - "Anesthesia"
    - "Recovery"
    - "Rehabilitation"
    - "Physical therapy"
    - "Occupational therapy"
    - "Prognosis"
    - "Complication"
    - "Side effect"
    - "Contraindication"
    - "Allergy"
    - "Allergic reaction"
    # --- 中文术语 ---
    - "诊断"
    - "治疗"
    - "疗法"
    - "药物"
    - "处方"
    - "剂量"
    - "症状"
    - "综合征"
    - "慢性"
    - "急性"
    - "良性"
    - "恶性"
    - "肿瘤"
    - "癌症"
    - "感染"
    - "炎症"
    - "免疫系统"
    - "疫苗"
    - "接种"
    - "抗体"
    - "抗原"
    - "病原体"
    - "细菌"
    - "病毒"
    - "血压"
    - "心率"
    - "脉搏"
    - "体温"
    - "呼吸"
    - "核磁共振"
    - "CT扫描"
    - "X光"
    - "超声波"
    - "活检"
    - "血液检查"
    - "尿检"
    - "手术"
    - "麻醉"
    - "恢复"
    - "康复"
    - "预后"
    - "并发症"
    - "副作用"
    - "禁忌症"
    - "过敏"

  # ============================================================
  # 20. 法律术语
  # ============================================================
  legal_term:
    # --- 英文术语 ---
    - "Contract"
    - "Agreement"
    - "Clause"
    - "Provision"
    - "Term"
    - "Condition"
    - "Party"
    - "Plaintiff"
    - "Defendant"
    - "Respondent"
    - "Petitioner"
    - "Appellant"
    - "Appellee"
    - "Jurisdiction"
    - "Court"
    - "Tribunal"
    - "Judge"
    - "Jury"
    - "Attorney"
    - "Lawyer"
    - "Counsel"
    - "Barrister"
    - "Solicitor"
    - "Litigation"
    - "Lawsuit"
    - "Suit"
    - "Filing"
    - "Motion"
    - "Petition"
    - "Appeal"
    - "Verdict"
    - "Judgment"
    - "Ruling"
    - "Order"
    - "Injunction"
    - "Restraining order"
    - "Subpoena"
    - "Summons"
    - "Deposition"
    - "Testimony"
    - "Evidence"
    - "Exhibit"
    - "Witness"
    - "Expert witness"
    - "Cross-examination"
    - "Direct examination"
    - "Objection"
    - "Sustained"
    - "Overruled"
    - "Settlement"
    - "Mediation"
    - "Arbitration"
    - "Negligence"
    - "Liability"
    - "Damages"
    - "Compensation"
    - "Restitution"
    - "Intellectual property"
    - "Copyright"
    - "Trademark"
    - "Patent"
    - "Trade secret"
    - "Breach"
    - "Violation"
    - "Infringement"
    - "Compliance"
    - "Regulatory"
    - "Statute"
    - "Law"
    - "Act"
    - "Bill"
    - "Legislation"
    - "Regulation"
    - "Ordinance"
    # --- 中文术语 ---
    - "合同"
    - "协议"
    - "条款"
    - "规定"
    - "条件"
    - "当事人"
    - "原告"
    - "被告"
    - "管辖权"
    - "法院"
    - "法官"
    - "陪审团"
    - "律师"
    - "诉讼"
    - "起诉"
    - "动议"
    - "上诉"
    - "判决"
    - "裁决"
    - "禁令"
    - "传票"
    - "传唤"
    - "证词"
    - "证据"
    - "证人"
    - "交叉询问"
    - "异议"
    - "和解"
    - "调解"
    - "仲裁"
    - "过失"
    - "责任"
    - "赔偿"
    - "知识产权"
    - "版权"
    - "商标"
    - "专利"
    - "商业秘密"
    - "违约"
    - "侵权"
    - "合规"
    - "法规"
    - "法律"
    - "法案"

  # ============================================================
  # 21. 金融术语
  # ============================================================
  finance_term:
    # --- 英文术语 ---
    - "Asset"
    - "Liability"
    - "Equity"
    - "Revenue"
    - "Expense"
    - "Profit"
    - "Loss"
    - "Income"
    - "Cash flow"
    - "Balance sheet"
    - "Income statement"
    - "Cash flow statement"
    - "P&L"
    - "EBITDA"
    - "EBIT"
    - "Net income"
    - "Gross profit"
    - "Operating profit"
    - "Margin"
    - "ROI"
    - "ROE"
    - "ROA"
    - "P/E ratio"
    - "EPS"
    - "Dividend"
    - "Yield"
    - "Bond"
    - "Stock"
    - "Share"
    - "Market cap"
    - "Capitalization"
    - "Portfolio"
    - "Diversification"
    - "Risk"
    - "Volatility"
    - "Liquidity"
    - "Solvency"
    - "Leverage"
    - "Debt"
    - "Credit"
    - "Loan"
    - "Mortgage"
    - "Interest"
    - "Principal"
    - "Amortization"
    - "Depreciation"
    - "Appreciation"
    - "Inflation"
    - "Deflation"
    - "Recession"
    - "Depression"
    - "GDP"
    - "CPI"
    - "PMI"
    - "Bull market"
    - "Bear market"
    - "IPO"
    - "M&A"
    - "Acquisition"
    - "Merger"
    - "LBO"
    - "Venture capital"
    - "Private equity"
    - "Angel investor"
    - "Seed funding"
    - "Series A"
    - "Series B"
    - "Series C"
    - "Valuation"
    - "Pre-money"
    - "Post-money"
    - "Due diligence"
    - "Term sheet"
    - "Cap table"
    - "ESOP"
    # --- 中文术语 ---
    - "资产"
    - "负债"
    - "权益"
    - "收入"
    - "支出"
    - "利润"
    - "亏损"
    - "现金流"
    - "资产负债表"
    - "利润表"
    - "现金流量表"
    - "净利润"
    - "毛利润"
    - "营业利润"
    - "利润率"
    - "投资回报率"
    - "股本回报率"
    - "资产回报率"
    - "市盈率"
    - "每股收益"
    - "股息"
    - "收益率"
    - "债券"
    - "股票"
    - "市值"
    - "投资组合"
    - "多元化"
    - "风险"
    - "波动率"
    - "流动性"
    - "偿付能力"
    - "杠杆"
    - "债务"
    - "信贷"
    - "贷款"
    - "抵押贷款"
    - "利息"
    - "本金"
    - "折旧"
    - "升值"
    - "通胀"
    - "通缩"
    - "衰退"
    - "萧条"
    - "牛市"
    - "熊市"
    - "首次公开募股"
    - "并购"
    - "收购"
    - "合并"
    - "风险投资"
    - "私募股权"
    - "天使投资人"
    - "种子轮"
    - "A轮"
    - "B轮"
    - "估值"
    - "尽职调查"
    - "条款清单"

  # ============================================================
  # 22. 建筑术语
  # ============================================================
  architecture_term:
    # --- 英文术语 ---
    - "Facade"
    - "Elevation"
    - "Floor plan"
    - "Section"
    - "Detail"
    - "Blueprint"
    - "Foundation"
    - "Column"
    - "Beam"
    - "Slab"
    - "Wall"
    - "Roof"
    - "Ceiling"
    - "Floor"
    - "Staircase"
    - "Elevator"
    - "Escalator"
    - "Corridor"
    - "Hall"
    - "Atrium"
    - "Lobby"
    - "Entrance"
    - "Exit"
    - "Window"
    - "Door"
    - "Arch"
    - "Vault"
    - "Dome"
    - "Cantilever"
    - "Truss"
    - "Frame"
    - "Structure"
    - "Load bearing"
    - "Reinforced concrete"
    - "Steel frame"
    - "Glass curtain wall"
    - "Cladding"
    - "Insulation"
    - "HVAC"
    - "Plumbing"
    - "Electrical"
    - "Sustainability"
    - "LEED"
    - "Green building"
    - "Passive house"
    - "Solar panel"
    - "Rainwater harvesting"
    - "Urban planning"
    - "Zoning"
    - "Site plan"
    - "Landscape"
    - "Courtyard"
    - "Terrace"
    - "Balcony"
    - "Pergola"
    - "Gazebo"
    - "Pavilion"
    - "Modernism"
    - "Brutalism"
    - "Deconstructivism"
    - "Parametric"
    - "Organic architecture"
    # --- 中文术语 ---
    - "立面"
    - "平面图"
    - "剖面图"
    - "基础"
    - "柱"
    - "梁"
    - "板"
    - "墙"
    - "屋顶"
    - "天花板"
    - "楼梯"
    - "电梯"
    - "走廊"
    - "大厅"
    - "中庭"
    - "门厅"
    - "入口"
    - "出口"
    - "窗"
    - "门"
    - "拱"
    - "拱顶"
    - "穹顶"
    - "悬臂"
    - "桁架"
    - "框架"
    - "承重"
    - "钢筋混凝土"
    - "钢框架"
    - "玻璃幕墙"
    - "外挂板"
    - "保温"
    - "暖通空调"
    - "可持续建筑"
    - "绿色建筑"
    - "被动房"
    - "太阳能板"
    - "城市规划"
    - "分区规划"
    - "总平面"
    - "景观"
    - "庭院"
    - "露台"
    - "阳台"
    - "花架"
    - "凉亭"
    - "现代主义"
    - "粗野主义"
    - "解构主义"
    - "参数化设计"
    - "有机建筑"

  # ============================================================
  # 23. 时尚术语
  # ============================================================
  fashion_term:
    # --- 英文术语 ---
    - "Haute couture"
    - "Prêt-à-porter"
    - "Ready to wear"
    - "Runway"
    - "Catwalk"
    - "Lookbook"
    - "Collection"
    - "Line"
    - "Season"
    - "Silhouette"
    - "Cut"
    - "Drape"
    - "Hem"
    - "Seam"
    - "Stitch"
    - "Fabric"
    - "Textile"
    - "Cotton"
    - "Silk"
    - "Wool"
    - "Linen"
    - "Polyester"
    - "Nylon"
    - "Leather"
    - "Suede"
    - "Denim"
    - "Velvet"
    - "Lace"
    - "Chiffon"
    - "Satin"
    - "Organza"
    - "Tulle"
    - "Tweed"
    - "Cashmere"
    - "Mohair"
    - "Pattern"
    - "Print"
    - "Embroidery"
    - "Beading"
    - "Sequin"
    - "Appliqué"
    - "Pleat"
    - "Ruffle"
    - "Frill"
    - "Flounce"
    - "Gather"
    - "Dart"
    - "Waistline"
    - "Neckline"
    - "Collar"
    - "Cuff"
    - "Sleeve"
    - "Lapel"
    - "Button"
    - "Zipper"
    - "Snap"
    - "Hook"
    - "Avant-garde"
    - "Minimalist"
    - "Streetwear"
    - "Athleisure"
    - "Vintage"
    - "Retro"
    - "Bohemian"
    - "Preppy"
    - "Grunge"
    - "Glamour"
    - "Elegant"
    - "Casual"
    - "Formal"
    # --- 中文术语 ---
    - "高级定制"
    - "成衣"
    - "秀场"
    - "画册"
    - "系列"
    - "轮廓"
    - "剪裁"
    - "垂感"
    - "下摆"
    - "接缝"
    - "缝线"
    - "面料"
    - "棉"
    - "丝绸"
    - "羊毛"
    - "亚麻"
    - "聚酯纤维"
    - "尼龙"
    - "皮革"
    - "麂皮"
    - "牛仔"
    - "天鹅绒"
    - "蕾丝"
    - "雪纺"
    - "缎"
    - "欧根纱"
    - "薄纱"
    - "粗花呢"
    - "羊绒"
    - "马海毛"
    - "图案"
    - "印花"
    - "刺绣"
    - "珠饰"
    - "亮片"
    - "褶裥"
    - "荷叶边"
    - "收腰"
    - "领口"
    - "领子"
    - "袖口"
    - "袖子"
    - "翻领"
    - "纽扣"
    - "拉链"
    - "前卫"
    - "极简"
    - "街头风"
    - "运动休闲"
    - "复古"
    - "波西米亚"
    - "学院风"
    - "优雅"
    - "休闲"
    - "正式"

  # ============================================================
  # 24. 美食烹饪术语
  # ============================================================
  food_term:
    # --- 英文术语 ---
    - "Cuisine"
    - "Recipe"
    - "Ingredient"
    - "Seasoning"
    - "Spice"
    - "Herb"
    - "Marinade"
    - "Sauce"
    - "Dressing"
    - "Glaze"
    - "Rub"
    - "Brine"
    - "Cure"
    - "Smoke"
    - "Grill"
    - "Roast"
    - "Bake"
    - "Broil"
    - "Sear"
    - "Sauté"
    - "Fry"
    - "Deep fry"
    - "Steam"
    - "Poach"
    - "Boil"
    - "Simmer"
    - "Braise"
    - "Stew"
    - "Blanch"
    - "Parboil"
    - "Caramelize"
    - "Deglaze"
    - "Reduce"
    - "Emulsify"
    - "Whip"
    - "Fold"
    - "Knead"
    - "Proof"
    - "Ferment"
    - "Infuse"
    - "Garnish"
    - "Plate"
    - "Plating"
    - "Texture"
    - "Mouthfeel"
    - "Umami"
    - "Sour"
    - "Sweet"
    - "Bitter"
    - "Salty"
    - "Savory"
    - "Spicy"
    - "Acidic"
    - "Rich"
    - "Light"
    - "Heavy"
    - "Crispy"
    - "Crunchy"
    - "Chewy"
    - "Tender"
    - "Juicy"
    - "Dry"
    - "Moist"
    - "Flakey"
    - "Creamy"
    - "Frothy"
    - "Velvety"
    - "Silky"
    - "Gourmet"
    - "Delicacy"
    - "Appetizer"
    - "Entree"
    - "Dessert"
    - "Beverage"
    # --- 中文术语 ---
    - "烹饪"
    - "菜谱"
    - "食材"
    - "调味"
    - "香料"
    - "香草"
    - "腌料"
    - "酱汁"
    - "沙拉酱"
    - "釉料"
    - "烤"
    - "煎"
    - "炒"
    - "炸"
    - "蒸"
    - "煮"
    - "炖"
    - "焯"
    - "焦糖化"
    - "收汁"
    - "乳化"
    - "打发"
    - "折叠"
    - "揉面"
    - "发酵"
    - "浸泡"
    - "装饰"
    - "摆盘"
    - "质地"
    - "口感"
    - "鲜味"
    - "酸"
    - "甜"
    - "苦"
    - "咸"
    - "辣"
    - "酥脆"
    - "有嚼劲"
    - "嫩"
    - "多汁"
    - "干"
    - "湿润"
    - "酥松"
    - "奶油状"
    - "细腻"
    - "开胃菜"
    - "主菜"
    - "甜点"
    - "饮品"

  # ============================================================
  # 25. 物理科学术语
  # ============================================================
  physics_term:
    # --- 英文术语 ---
    - "Velocity"
    - "Acceleration"
    - "Force"
    - "Mass"
    - "Weight"
    - "Momentum"
    - "Energy"
    - "Kinetic energy"
    - "Potential energy"
    - "Work"
    - "Power"
    - "Friction"
    - "Gravity"
    - "Inertia"
    - "Torque"
    - "Angular momentum"
    - "Frequency"
    - "Wavelength"
    - "Amplitude"
    - "Phase"
    - "Refraction"
    - "Reflection"
    - "Diffraction"
    - "Interference"
    - "Polarization"
    - "Electromagnetic"
    - "Magnetic field"
    - "Electric field"
    - "Voltage"
    - "Current"
    - "Resistance"
    - "Capacitance"
    - "Inductance"
    - "Conductor"
    - "Insulator"
    - "Semiconductor"
    - "Thermodynamics"
    - "Entropy"
    - "Enthalpy"
    - "Heat"
    - "Temperature"
    - "Conduction"
    - "Convection"
    - "Radiation"
    - "Quantum"
    - "Photon"
    - "Electron"
    - "Proton"
    - "Neutron"
    - "Nucleus"
    - "Isotope"
    - "Fission"
    - "Fusion"
    - "Relativity"
    - "Space-time"
    - "Black hole"
    # --- 中文术语 ---
    - "速度"
    - "加速度"
    - "力"
    - "质量"
    - "重量"
    - "动量"
    - "能量"
    - "动能"
    - "势能"
    - "功"
    - "功率"
    - "摩擦力"
    - "重力"
    - "惯性"
    - "力矩"
    - "角动量"
    - "频率"
    - "波长"
    - "振幅"
    - "折射"
    - "反射"
    - "衍射"
    - "干涉"
    - "偏振"
    - "电磁"
    - "磁场"
    - "电场"
    - "电压"
    - "电流"
    - "电阻"
    - "热力学"
    - "熵"
    - "焓"
    - "热量"
    - "温度"
    - "传导"
    - "对流"
    - "辐射"
    - "量子"
    - "光子"
    - "电子"
    - "质子"
    - "中子"
    - "原子核"
    - "同位素"
    - "裂变"
    - "聚变"
    - "相对论"
    - "时空"
    - "黑洞"

  # ============================================================
  # 26. UI/UX 设计术语
  # ============================================================
  ui_ux_term:
    # --- 英文术语 ---
    - "Wireframe"
    - "Prototype"
    - "Mockup"
    - "Design System"
    - "Component Library"
    - "Design Token"
    - "Responsive Design"
    - "Adaptive Layout"
    - "Grid System"
    - "Spacing System"
    - "Visual Hierarchy"
    - "Information Architecture"
    - "User Journey"
    - "Usability Testing"
    - "Accessibility"
    - "Breadcrumb Navigation"
    - "Hamburger Menu"
    - "Floating Action Button"
    - "Skeleton Screen"
    - "Empty State"
    - "Onboarding"
    - "Microinteraction"
    - "Hover State"
    - "Focus State"
    - "Touch Target"
    - "Elevation"
    - "Border Radius"
    - "Typography"
    - "Font Weight"
    - "Line Height"
    - "Letter Spacing"
    - "Contrast Ratio"
    - "Color Mode"
    - "User Interface"
    - "User Experience"
    - "Interaction Design"
    - "Persona"
    # --- 中文术语 ---
    - "线框图"
    - "原型"
    - "模型"
    - "设计系统"
    - "组件库"
    - "设计令牌"
    - "响应式设计"
    - "自适应布局"
    - "网格系统"
    - "间距系统"
    - "视觉层级"
    - "信息架构"
    - "用户旅程"
    - "可用性测试"
    - "无障碍设计"
    - "面包屑导航"
    - "汉堡菜单"
    - "浮动操作按钮"
    - "骨架屏"
    - "空状态"
    - "引导动画"
    - "微交互"
    - "悬停状态"
    - "聚焦状态"
    - "点击区域"
    - "阴影"
    - "圆角"
    - "字体排印"
    - "字重"
    - "行高"
    - "字间距"
    - "对比度"
    - "色彩模式"

  # ============================================================
  # 27. 3D建模/CG 术语
  # ============================================================
  cg_term:
    # --- 英文术语 ---
    - "Polygon Modeling"
    - "Mesh"
    - "Vertex"
    - "Edge"
    - "Normal"
    - "UV Mapping"
    - "UV Unwrapping"
    - "Material"
    - "Shader"
    - "Node Material"
    - "Procedural Texture"
    - "Bump Mapping"
    - "Normal Mapping"
    - "Displacement Mapping"
    - "Roughness"
    - "Metalness"
    - "Specular"
    - "Emission"
    - "Global Illumination"
    - "Ray Tracing"
    - "Path Tracing"
    - "Renderer"
    - "Sampling"
    - "Denoising"
    - "Rigging"
    - "Skinning"
    - "Weight Painting"
    - "Keyframe Animation"
    - "Particle System"
    - "Cloth Simulation"
    - "Fluid Simulation"
    - "Rigid Body Dynamics"
    - "Soft Body Dynamics"
    - "Boolean Operation"
    - "Subdivision Surface"
    - "Modifier"
    - "Topology"
    - "Retopology"
    - "Albedo"
    - "Physically Based Rendering"
    - "Level of Detail"
    - "Frustum Culling"
    - "Occlusion Culling"
    - "Draw Call"
    - "Instancing"
    - "Sprite Atlas"
    # --- 中文术语 ---
    - "多边形建模"
    - "网格"
    - "顶点"
    - "法线"
    - "UV展开"
    - "材质"
    - "纹理"
    - "着色器"
    - "节点材质"
    - "程序化纹理"
    - "凹凸贴图"
    - "法线贴图"
    - "位移贴图"
    - "粗糙度"
    - "金属度"
    - "高光"
    - "自发光"
    - "环境光遮蔽"
    - "全局光照"
    - "光线追踪"
    - "路径追踪"
    - "渲染器"
    - "采样"
    - "降噪"
    - "骨骼绑定"
    - "蒙皮"
    - "权重绘制"
    - "关键帧动画"
    - "粒子系统"
    - "布料模拟"
    - "流体模拟"
    - "刚体动力学"
    - "软体动力学"
    - "布尔运算"
    - "细分曲面"
    - "修改器"
    - "拓扑"
    - "重新拓扑"
    - "物理渲染"
    - "细节层次"
    - "剔除"
    - "绘制调用"
    - "实例化"

  # ============================================================
  # 28. 影视后期/VFX 术语
  # ============================================================
  vfx_term:
    # --- 英文术语 ---
    - "Compositing"
    - "Keying"
    - "Chroma Key"
    - "Luma Key"
    - "Rotoscoping"
    - "Motion Tracking"
    - "2D Tracking"
    - "3D Tracking"
    - "Camera Solving"
    - "Node-based Compositing"
    - "Layer-based Compositing"
    - "Pre-compose"
    - "Color Grading"
    - "Color Correction"
    - "Color Space"
    - "Gamut"
    - "Color Depth"
    - "Look-Up Table"
    - "Node Tree"
    - "Alpha Channel"
    - "Z-Depth Pass"
    - "Motion Blur"
    - "Depth of Field"
    - "Bloom"
    - "Glow"
    - "Lens Flare"
    - "Particle Effects"
    - "Smoke Simulation"
    - "Explosion FX"
    - "Matte Painting"
    - "Set Extension"
    - "Wire Removal"
    - "Cleanup"
    - "Time Remapping"
    - "Frame Blending"
    - "Optical Flow"
    - "Title Sequence"
    - "Film Scan"
    - "Film Grain"
    # --- 中文术语 ---
    - "合成"
    - "抠像"
    - "色度键"
    - "亮度键"
    - "遮罩"
    - "蒙版绘制"
    - "运动跟踪"
    - "2D跟踪"
    - "3D跟踪"
    - "摄像机解算"
    - "节点合成"
    - "图层合成"
    - "预合成"
    - "调色"
    - "校色"
    - "色彩空间"
    - "色域"
    - "色彩深度"
    - "节点树"
    - "通道"
    - "Alpha通道"
    - "深度通道"
    - "运动模糊"
    - "景深"
    - "辉光"
    - "镜头光晕"
    - "粒子特效"
    - "烟雾模拟"
    - "爆炸特效"
    - "数字绘景"
    - "实景延伸"
    - "擦除"
    - "威亚去除"
    - "时间重映射"
    - "帧融合"
    - "光流法"
    - "片头"
    - "底片扫描"
    - "胶片颗粒"

  # ============================================================
  # 29. 动效设计术语
  # ============================================================
  motion_term:
    # --- 英文术语 ---
    - "Motion Graphics"
    - "Keyframe"
    - "Easing"
    - "Bézier Curve"
    - "Timeline"
    - "Time Remap"
    - "Frame Rate"
    - "Path Animation"
    - "Morphing"
    - "Text on Path"
    - "Kinetics"
    - "Physics Simulation"
    - "Spring Animation"
    - "Damping"
    - "Amplitude"
    - "Frequency"
    - "Phase"
    - "Loop Animation"
    - "Expression"
    - "Script-driven"
    - "Emitter"
    - "Vector Animation"
    - "Skeletal Animation"
    - "Frame-by-frame Animation"
    - "Tweening"
    - "Mask Animation"
    - "Mask Tracking"
    - "Preset"
    - "Render Queue"
    - "Codec"
    - "Bitrate"
    - "Compression"
    - "Transparent Video"
    - "Image Sequence"
    # --- 中文术语 ---
    - "动态图形"
    - "关键帧"
    - "缓动"
    - "贝塞尔曲线"
    - "时间轴"
    - "时间线"
    - "帧速率"
    - "路径动画"
    - "形变动画"
    - "路径文字"
    - "动力学"
    - "物理模拟"
    - "刚体"
    - "弹簧动画"
    - "阻尼"
    - "振幅"
    - "频率"
    - "相位"
    - "循环动画"
    - "表达式"
    - "脚本驱动"
    - "发射器"
    - "矢量动画"
    - "骨骼动画"
    - "逐帧动画"
    - "补间动画"
    - "蒙版动画"
    - "遮罩追踪"
    - "预设"
    - "渲染队列"
    - "编解码器"
    - "比特率"
    - "压缩"
    - "透明视频"
    - "序列帧"

  # ============================================================
  # 30. 电商运营术语
  # ============================================================
  ecommerce_term:
    # --- 英文术语 ---
    - "Conversion Rate"
    - "Average Order Value"
    - "Customer Acquisition Cost"
    - "Customer Lifetime Value"
    - "Return Rate"
    - "Repurchase Rate"
    - "Add-to-cart Rate"
    - "Bounce Rate"
    - "Gross Merchandise Volume"
    - "Stock Keeping Unit"
    - "Product Detail Page"
    - "Landing Page"
    - "Funnel Analysis"
    - "Flash Sale"
    - "Group Buy"
    - "Full Reduction"
    - "Coupon"
    - "Loyalty Program"
    - "Private Domain Traffic"
    - "Product Seeding"
    - "Livestream Selling"
    - "Product Selection"
    - "Product Testing"
    - "Stocking"
    - "Sell-through Rate"
    - "Inventory Turnover"
    - "Supply Chain"
    - "Dropshipping"
    - "Cross-border E-commerce"
    - "Independent Store"
    - "Brand Going Global"
    - "Store Decoration"
    - "Main Image"
    - "White Background Image"
    - "Detail Image"
    # --- 中文术语 ---
    - "转化率"
    - "客单价"
    - "获客成本"
    - "客户终身价值"
    - "退货率"
    - "复购率"
    - "加购率"
    - "跳出率"
    - "商品详情页"
    - "落地页"
    - "漏斗分析"
    - "秒杀"
    - "拼团"
    - "满减"
    - "优惠券"
    - "会员体系"
    - "私域流量"
    - "种草"
    - "带货"
    - "选品"
    - "测款"
    - "备货"
    - "动销率"
    - "库存周转"
    - "供应链"
    - "一件代发"
    - "跨境电商"
    - "独立站"
    - "品牌出海"
    - "详情页装修"
    - "主图"
    - "白底图"
    - "详情图"

  # ============================================================
  # 31. 教育学术语
  # ============================================================
  education_term:
    # --- 英文术语 ---
    - "Instructional Design"
    - "Curriculum Development"
    - "Bloom's Taxonomy"
    - "Formative Assessment"
    - "Summative Assessment"
    - "Blended Learning"
    - "Flipped Classroom"
    - "Project-Based Learning"
    - "Inquiry-Based Learning"
    - "Differentiated Instruction"
    - "Scaffolding"
    - "Constructivism"
    - "Cognitive Load"
    - "Metacognition"
    - "Learning Objective"
    - "Syllabus"
    - "Lesson Plan"
    - "Learning Outcome"
    - "Competency Map"
    - "Microlearning"
    - "Gamification"
    - "Self-directed Learning"
    - "Collaborative Learning"
    - "Situated Learning"
    - "Prior Knowledge"
    - "Transfer of Learning"
    - "Deliberate Practice"
    - "Spaced Repetition"
    - "Ebbinghaus Forgetting Curve"
    - "Formative Feedback"
    - "Learning Analytics"
    - "Open Educational Resources"
    - "Massive Open Online Course"
    # --- 中文术语 ---
    - "教学设计"
    - "课程开发"
    - "布鲁姆分类法"
    - "形成性评价"
    - "总结性评价"
    - "混合式学习"
    - "翻转课堂"
    - "项目式学习"
    - "探究式学习"
    - "差异化教学"
    - "脚手架"
    - "建构主义"
    - "认知负荷"
    - "元认知"
    - "学习目标"
    - "教学大纲"
    - "教案"
    - "学习成果"
    - "能力图谱"
    - "微学习"
    - "游戏化学习"
    - "自主学习"
    - "协作学习"
    - "情境学习"
    - "支架式教学"
    - "先备知识"
    - "迁移学习"
    - "刻意练习"
    - "间隔重复"
    - "艾宾浩斯遗忘曲线"
    - "形成性反馈"
    - "学习分析"
    - "开放教育资源"
    - "慕课"

  # ============================================================
  # 32. 心理学术语
  # ============================================================
  psychology_term:
    # --- 英文术语 ---
    - "Cognitive Behavioral Therapy"
    - "Classical Conditioning"
    - "Operant Conditioning"
    - "Positive Reinforcement"
    - "Negative Reinforcement"
    - "Punishment"
    - "Extinction"
    - "Maslow's Hierarchy of Needs"
    - "Self-actualization"
    - "Flow State"
    - "Intrinsic Motivation"
    - "Extrinsic Motivation"
    - "Cognitive Dissonance"
    - "Confirmation Bias"
    - "Anchoring Effect"
    - "Framing Effect"
    - "Availability Heuristic"
    - "Dunning-Kruger Effect"
    - "Bystander Effect"
    - "Self-fulfilling Prophecy"
    - "Attachment Theory"
    - "Defense Mechanism"
    - "Projection"
    - "Rationalization"
    - "Repression"
    - "Sublimation"
    - "Personality Traits"
    - "Emotion Regulation"
    - "Mindfulness"
    - "Empathy"
    - "Self-efficacy"
    - "Learned Helplessness"
    - "Resilience"
    - "Post-traumatic Growth"
    - "Schema Therapy"
    # --- 中文术语 ---
    - "认知行为疗法"
    - "经典条件反射"
    - "操作性条件反射"
    - "正强化"
    - "负强化"
    - "惩罚"
    - "消退"
    - "马斯洛需求层次"
    - "自我实现"
    - "心流状态"
    - "内在动机"
    - "外在动机"
    - "认知失调"
    - "确认偏误"
    - "锚定效应"
    - "框架效应"
    - "可用性启发"
    - "达克效应"
    - "旁观者效应"
    - "自证预言"
    - "依恋理论"
    - "心理防御机制"
    - "投射"
    - "合理化"
    - "压抑"
    - "升华"
    - "人格特质"
    - "情绪调节"
    - "正念"
    - "共情"
    - "自我效能感"
    - "习得性无助"
    - "心理韧性"
    - "创伤后成长"
    - "图式治疗"

  # ============================================================
  # 33. 化学术语
  # ============================================================
  chemistry_term:
    # --- 英文术语 ---
    - "Chemical Reaction"
    - "Catalyst"
    - "Organic Chemistry"
    - "Inorganic Chemistry"
    - "Biochemistry"
    - "Stoichiometry"
    - "Molecule"
    - "Atom"
    - "Ion"
    - "Covalent Bond"
    - "Ionic Bond"
    - "Hydrogen Bond"
    - "Intermolecular Force"
    - "Functional Group"
    - "Polymer"
    - "Monomer"
    - "Isomer"
    - "Chirality"
    - "Stereochemistry"
    - "Redox Reaction"
    - "Hydrolysis"
    - "Synthesis"
    - "Extraction"
    - "Distillation"
    - "Crystallization"
    - "Titration"
    - "Spectroscopy"
    - "Chromatography"
    - "Activation Energy"
    - "Exothermic Reaction"
    - "Endothermic Reaction"
    - "Equilibrium Constant"
    - "Reaction Rate"
    - "Solubility"
    - "Concentration"
    - "Molar Mass"
    # --- 中文术语 ---
    - "化学反应"
    - "催化剂"
    - "酸碱度"
    - "有机化学"
    - "无机化学"
    - "生物化学"
    - "化学计量学"
    - "摩尔"
    - "分子"
    - "原子"
    - "离子"
    - "共价键"
    - "离子键"
    - "氢键"
    - "分子间作用力"
    - "官能团"
    - "聚合物"
    - "单体"
    - "同分异构体"
    - "手性"
    - "立体化学"
    - "氧化还原反应"
    - "水解"
    - "合成"
    - "萃取"
    - "蒸馏"
    - "结晶"
    - "滴定"
    - "光谱学"
    - "色谱法"
    - "活化能"
    - "放热反应"
    - "吸热反应"
    - "平衡常数"
    - "反应速率"
    - "溶解度"
    - "浓度"
    - "摩尔质量"

  # ============================================================
  # 34. 生物学术语
  # ============================================================
  biology_term:
    # --- 英文术语 ---
    - "Cell"
    - "Deoxyribonucleic Acid"
    - "Ribonucleic Acid"
    - "Gene"
    - "Protein"
    - "Enzyme"
    - "Organelle"
    - "Mitochondria"
    - "Nucleus"
    - "Ribosome"
    - "Cell Division"
    - "Mitosis"
    - "Meiosis"
    - "Gene Expression"
    - "Transcription"
    - "Translation"
    - "Mutation"
    - "Heredity"
    - "Epigenetics"
    - "Evolution"
    - "Natural Selection"
    - "Ecosystem"
    - "Biodiversity"
    - "Food Chain"
    - "Symbiosis"
    - "Photosynthesis"
    - "Cellular Respiration"
    - "Metabolism"
    - "Anabolism"
    - "Catabolism"
    - "Taxonomy"
    - "Tissue"
    - "Organ"
    - "Organ System"
    - "Neuron"
    - "Synapse"
    - "Hormone"
    - "Immune System"
    - "Antibody"
    # --- 中文术语 ---
    - "细胞"
    - "脱氧核糖核酸"
    - "核糖核酸"
    - "基因"
    - "蛋白质"
    - "酶"
    - "细胞器"
    - "线粒体"
    - "细胞核"
    - "核糖体"
    - "细胞分裂"
    - "有丝分裂"
    - "减数分裂"
    - "基因表达"
    - "转录"
    - "翻译"
    - "突变"
    - "遗传"
    - "表观遗传学"
    - "进化"
    - "自然选择"
    - "生态系统"
    - "生物多样性"
    - "食物链"
    - "共生"
    - "光合作用"
    - "细胞呼吸"
    - "代谢"
    - "同化作用"
    - "异化作用"
    - "分类学"
    - "组织"
    - "器官"
    - "神经元"
    - "突触"
    - "激素"
    - "免疫系统"
    - "抗体"

  # ============================================================
  # 35. 地理/GIS 术语
  # ============================================================
  geography_term:
    # --- 英文术语 ---
    - "Spatial Analysis"
    - "Geographic Information System"
    - "Remote Sensing"
    - "Urban Sprawl"
    - "Gentrification"
    - "Environmental Justice"
    - "Place Attachment"
    - "Biogeography"
    - "Watershed"
    - "Geomorphology"
    - "Raster Data"
    - "Vector Data"
    - "Interpolation"
    - "Spatial Autocorrelation"
    - "Coordinate System"
    - "Map Projection"
    - "Geodesy"
    - "Contour Line"
    - "Digital Elevation Model"
    - "Buffer Analysis"
    - "Overlay Analysis"
    - "Network Analysis"
    - "Heat Map"
    - "Spatial Interpolation"
    - "Kriging"
    - "Geostatistics"
    - "Longitude"
    - "Latitude"
    - "Equator"
    - "Prime Meridian"
    - "Time Zone"
    - "Plate Tectonics"
    - "Climate Zone"
    - "Ocean Current"
    - "Monsoon"
    - "El Niño"
    - "Karst Topography"
    - "Alluvial Plain"
    - "Delta"
    - "Isotherm"
    # --- 中文术语 ---
    - "空间分析"
    - "地理信息系统"
    - "遥感"
    - "城市蔓延"
    - "士绅化"
    - "环境正义"
    - "地方依恋"
    - "生物地理学"
    - "流域"
    - "地貌学"
    - "栅格数据"
    - "矢量数据"
    - "插值"
    - "空间自相关"
    - "坐标系"
    - "投影"
    - "大地测量"
    - "等高线"
    - "数字高程模型"
    - "缓冲区分析"
    - "叠加分析"
    - "网络分析"
    - "热力图"
    - "空间插值"
    - "克里金插值"
    - "地统计学"
    - "经度"
    - "纬度"
    - "赤道"
    - "本初子午线"
    - "时区"
    - "板块构造"
    - "气候带"
    - "洋流"
    - "季风"
    - "厄尔尼诺"
    - "喀斯特地貌"
    - "冲积平原"
    - "三角洲"
    - "等温线"

  # ============================================================
  # 36. 航空航天术语
  # ============================================================
  aerospace_term:
    # --- 英文术语 ---
    - "Aerodynamics"
    - "Thrust"
    - "Lift"
    - "Drag"
    - "Airfoil"
    - "Angle of Attack"
    - "Aspect Ratio"
    - "Mach Number"
    - "Supersonic"
    - "Hypersonic"
    - "Subsonic"
    - "Transonic"
    - "Thrust-to-weight Ratio"
    - "Orbital Mechanics"
    - "Kepler's Laws"
    - "Orbital Inclination"
    - "Perigee"
    - "Apogee"
    - "Geostationary Orbit"
    - "Low Earth Orbit"
    - "Escape Velocity"
    - "Attitude Control"
    - "Propulsion System"
    - "Turbofan Engine"
    - "Ramjet"
    - "Scramjet"
    - "Rocket Propulsion"
    - "Specific Impulse"
    - "Combustion Chamber"
    - "Nozzle"
    - "Payload"
    - "Avionics"
    - "Flight Control System"
    - "Navigation"
    - "Inertial Navigation"
    - "Space Debris"
    - "Atmospheric Reentry"
    - "Thermal Protection System"
    # --- 中文术语 ---
    - "空气动力学"
    - "推力"
    - "升力"
    - "阻力"
    - "翼型"
    - "迎角"
    - "展弦比"
    - "马赫数"
    - "超音速"
    - "高超音速"
    - "亚音速"
    - "跨音速"
    - "推重比"
    - "轨道力学"
    - "开普勒定律"
    - "轨道倾角"
    - "近地点"
    - "远地点"
    - "同步轨道"
    - "低地球轨道"
    - "脱轨速度"
    - "姿态控制"
    - "推进系统"
    - "涡轮风扇发动机"
    - "冲压发动机"
    - "超燃冲压发动机"
    - "火箭推进"
    - "比冲"
    - "燃烧室"
    - "喷管"
    - "有效载荷"
    - "航电系统"
    - "飞控系统"
    - "导航"
    - "惯性导航"
    - "太空碎片"
    - "再入大气层"
    - "热防护系统"

  # ============================================================
  # 37. 军事/国防术语
  # ============================================================
  military_term:
    # --- 英文术语 ---
    - "Situational Awareness"
    - "Command and Control"
    - "Electronic Warfare"
    - "Radar"
    - "Sonar"
    - "Stealth Technology"
    - "Guided Weapon"
    - "Precision Strike"
    - "Ballistic Missile"
    - "Cruise Missile"
    - "Unmanned Aerial Vehicle"
    - "Swarm Tactics"
    - "Air Defense System"
    - "Airborne Early Warning"
    - "Electronic Countermeasures"
    - "Signals Intelligence"
    - "Satellite Reconnaissance"
    - "Tactical Data Link"
    - "Infrared Guidance"
    - "Laser Guidance"
    - "GPS Guidance"
    - "Armored Vehicle"
    - "Main Battle Tank"
    - "Infantry Fighting Vehicle"
    - "Artillery"
    - "Multiple Launch Rocket System"
    - "Torpedo"
    - "Naval Mine"
    - "Anti-submarine Warfare"
    - "Carrier Strike Group"
    - "Amphibious Operation"
    - "Special Operations"
    - "Urban Warfare"
    - "Asymmetric Warfare"
    - "Hybrid Warfare"
    - "Cognitive Warfare"
    - "Cyber Warfare"
    - "Psychological Warfare"
    - "Logistics"
    # --- 中文术语 ---
    - "态势感知"
    - "指挥控制"
    - "电子战"
    - "声呐"
    - "隐身技术"
    - "制导武器"
    - "精确打击"
    - "弹道导弹"
    - "巡航导弹"
    - "无人机"
    - "蜂群战术"
    - "防空系统"
    - "预警机"
    - "电子对抗"
    - "信号情报"
    - "卫星侦察"
    - "战术数据链"
    - "红外制导"
    - "激光制导"
    - "装甲车辆"
    - "主战坦克"
    - "步兵战车"
    - "火炮"
    - "多管火箭炮"
    - "鱼雷"
    - "水雷"
    - "反潜战"
    - "航母战斗群"
    - "两栖作战"
    - "特种作战"
    - "城市战"
    - "非对称作战"
    - "混合战争"
    - "认知战"
    - "网络战"
    - "心理战"
    - "后勤补给"

  # ============================================================
  # 38. 体育/运动科学术语
  # ============================================================
  sports_term:
    # --- 英文术语 ---
    - "Aerobic Exercise"
    - "Anaerobic Exercise"
    - "VO2 Max"
    - "Heart Rate Zone"
    - "Lactate Threshold"
    - "Core Strength"
    - "Flexibility"
    - "Explosive Power"
    - "Endurance"
    - "Agility"
    - "Coordination"
    - "Balance"
    - "Reaction Time"
    - "Hypertrophy"
    - "Muscular Endurance"
    - "Eccentric Contraction"
    - "Concentric Contraction"
    - "Isometric Contraction"
    - "Dynamic Stretching"
    - "Static Stretching"
    - "Sports Injury"
    - "Rehabilitation"
    - "Periodization"
    - "Supercompensation"
    - "Overtraining"
    - "Sports Nutrition"
    - "Hydration"
    - "Electrolyte"
    - "Protein Synthesis"
    - "Muscle Glycogen"
    - "Body Fat Percentage"
    - "Basal Metabolic Rate"
    - "Tactical Formation"
    - "Transition"
    - "Man-to-man Defense"
    - "Zone Defense"
    - "High Press"
    - "Counterattack"
    - "Tactical Analysis"
    - "Sports Biomechanics"
    # --- 中文术语 ---
    - "有氧运动"
    - "无氧运动"
    - "最大摄氧量"
    - "心率区间"
    - "乳酸阈值"
    - "核心力量"
    - "柔韧性"
    - "爆发力"
    - "耐力"
    - "敏捷性"
    - "协调性"
    - "平衡能力"
    - "反应时间"
    - "肌肥大"
    - "肌耐力"
    - "离心收缩"
    - "向心收缩"
    - "等长收缩"
    - "动态拉伸"
    - "静态拉伸"
    - "运动损伤"
    - "康复训练"
    - "周期化训练"
    - "超量恢复"
    - "过度训练"
    - "运动营养"
    - "补水"
    - "电解质"
    - "蛋白质合成"
    - "肌糖原"
    - "体脂率"
    - "基础代谢率"
    - "战术布置"
    - "攻防转换"
    - "盯人防守"
    - "区域防守"
    - "高位逼抢"
    - "反击"
    - "战术分析"
    - "运动生物力学"

  # ============================================================
  # 39. 农业/农学术语
  # ============================================================
  agriculture_term:
    # --- 英文术语 ---
    - "Precision Agriculture"
    - "Crop Rotation"
    - "Intercropping"
    - "Irrigation System"
    - "Drip Irrigation"
    - "Fertilization"
    - "Organic Farming"
    - "Soil Fertility"
    - "Soil pH"
    - "Composting"
    - "Pest Management"
    - "Biological Control"
    - "Pesticide"
    - "Herbicide"
    - "Fungicide"
    - "Insecticide"
    - "Genetically Modified Crop"
    - "Hybrid Breeding"
    - "Seed Treatment"
    - "Seedling Nursery"
    - "Transplanting"
    - "Harvesting"
    - "Yield"
    - "Cash Crop"
    - "Grain Crop"
    - "Greenhouse Cultivation"
    - "Hydroponics"
    - "Vertical Farming"
    - "Agricultural IoT"
    - "Drone Spraying"
    - "Remote Sensing Monitoring"
    - "Soil Moisture"
    - "Water-saving Irrigation"
    - "Agricultural Mechanization"
    - "Combine Harvester"
    - "Agricultural Traceability"
    - "Fallow"
    - "Saline-alkali Soil Improvement"
    - "Agrometeorology"
    # --- 中文术语 ---
    - "精准农业"
    - "轮作"
    - "间作套种"
    - "灌溉系统"
    - "滴灌"
    - "施肥"
    - "有机农业"
    - "土壤肥力"
    - "土壤酸碱度"
    - "堆肥"
    - "病虫害防治"
    - "生物防治"
    - "农药"
    - "除草剂"
    - "杀菌剂"
    - "杀虫剂"
    - "转基因作物"
    - "杂交育种"
    - "种子处理"
    - "育苗"
    - "移栽"
    - "收割"
    - "产量"
    - "经济作物"
    - "粮食作物"
    - "温室种植"
    - "水培"
    - "垂直农业"
    - "农业物联网"
    - "无人机植保"
    - "遥感监测"
    - "土壤墒情"
    - "节水灌溉"
    - "农业机械化"
    - "联合收割机"
    - "农产品溯源"
    - "休耕"
    - "盐碱地改良"
    - "农业气象"

  # ============================================================
  # 26. 音乐结构术语（v2.4.0 新增）
  # ============================================================
  music_structure:
    - "Verse"
    - "Chorus"
    - "Bridge"
    - "Outro"
    - "Intro"
    - "Hook"
    - "Pre-Chorus"
    - "Instrumental"
    - "Refrain"
    - "Interlude"
    - "Solo"
    - "Drop"
    - "Build"
    - "Beat Drop"
    - "Spoken Word"
    - "Ad lib"
    - "Vamp"
    - "Coda"
    - "Post-Chorus"
    - "主歌"
    - "副歌"
    - "桥段"
    - "前奏"
    - "尾奏"
    - "间奏"
    - "独奏"
    - "副段"

  # ============================================================
  # 27. 数字人情绪指令（v2.4.0 新增）
  # ============================================================
  avatar_emotion:
    - "happy"
    - "sad"
    - "angry"
    - "surprised"
    - "disgusted"
    - "fearful"
    - "neutral"
    - "excited"
    - "bored"
    - "confused"
    - "proud"
    - "ashamed"
    - "jealous"
    - "grateful"
    - "hopeful"
    - "anxious"
    - "calm"
    - "love"
    - "contempt"
    - "amused"
    - "开心"
    - "悲伤"
    - "愤怒"
    - "惊讶"
    - "厌恶"
    - "恐惧"
    - "兴奋"
    - "平静"
    - "焦虑"
    - "感激"

  # ============================================================
  # 28. 数字人手势指令（v2.4.0 新增）
  # ============================================================
  avatar_gesture:
    - "wave"
    - "nod"
    - "shake"
    - "point"
    - "thumbs up"
    - "thumbs down"
    - "clap"
    - "snap"
    - "raise hand"
    - "cross arms"
    - "fold hands"
    - "scratch head"
    - "rub chin"
    - "stroke chin"
    - "touch face"
    - "cover mouth"
    - "wink"
    - "blink"
    - "roll eyes"
    - "raise eyebrow"
    - "frown"
    - "smile"
    - "laugh"
    - "cry"
    - "yawn"
    - "sigh"
    - "摇头"
    - "点头"
    - "挥手"
    - "眨眼"
    - "微笑"

  # ============================================================
  # 29. TTS 语音情绪标签（v2.4.0 新增）
  # ============================================================
  tts_emotion:
    - "cheerful"
    - "sad"
    - "angry"
    - "fearful"
    - "disgusted"
    - "surprised"
    - "calm"
    - "gentle"
    - "serious"
    - "friendly"
    - "whisper"
    - "shouting"
    - "singing"
    - "narration"
    - "announcement"
    - "newscast"
    - "customer service"
    - "assertive"
    - "empathetic"
    - "professional"
    - "warm"
    - "bright"
    - "soft"
    - " firm"
    - "energetic"

  # ============================================================
  # 30. 室内设计风格（v2.4.0 新增）
  # ============================================================
  interior_style:
    - "Shabby Chic"
    - "Industrial"
    - "Scandinavian"
    - "Mid-century"
    - "Bohemian"
    - "Minimalist"
    - "Modern"
    - "Contemporary"
    - "Traditional"
    - "Rustic"
    - "Farmhouse"
    - "Coastal"
    - "Mediterranean"
    - "Japanese"
    - "Chinese"
    - "Art Deco"
    - "Victorian"
    - "Gothic"
    - "Baroque"
    - "Rococo"
    - "波西米亚"
    - "北欧"
    - "极简"
    - "现代"
    - "复古"
    - "工业风"
    - "日式"
    - "新中式"

  # ============================================================
  # 31. Logo 设计风格（v2.4.0 新增）
  # ============================================================
  logo_style:
    - "minimalist"
    - "modern"
    - "vintage"
    - "retro"
    - "geometric"
    - "abstract"
    - "mascot"
    - "emblem"
    - "wordmark"
    - "lettermark"
    - "combination"
    - "pictorial"
    - "dynamic"
    - "3D"
    - "gradient"
    - "flat"
    - "line art"
    - "watercolor"
    - "hand drawn"
    - "luxury"
    - "极简"
    - "现代"
    - "复古"
    - "几何"
    - "抽象"
    - "徽章"
    - "文字"
    - "字母"
    - "组合"
    - "扁平"
    - "线条"

# ============================================================
# 词典 -> CSS 类名映射
# ============================================================
cssClassMap:
  camera_move: "dsl-camera-word"
  light_effect: "dsl-light-word"
  emotion_word: "dsl-emotion-word"
  scene_transition: "dsl-scene-transition"
  ai_ml_term: "dsl-ai-ml-term"
  sd_image_term: "dsl-sd-image-term"
  photography_term: "dsl-photography-term"
  art_style: "dsl-art-style"
  color_term: "dsl-color-term"
  composition_term: "dsl-composition-term"
  music_audio_term: "dsl-music-audio-term"
  programming_term: "dsl-programming-term"
  data_science_term: "dsl-data-science-term"
  narrative_term: "dsl-narrative-term"
  marketing_term: "dsl-marketing-term"
  game_dev_term: "dsl-game-dev-term"
  quality_tag_ext: "dsl-quality-tag-ext"
  negative_tag: "dsl-negative-tag"
  medical_term: "dsl-medical-term"
  legal_term: "dsl-legal-term"
  finance_term: "dsl-finance-term"
  architecture_term: "dsl-architecture-term"
  fashion_term: "dsl-fashion-term"
  food_term: "dsl-food-term"
  physics_term: "dsl-physics-term"
  ui_ux_term: "dsl-ui-ux-term"
  cg_term: "dsl-cg-term"
  vfx_term: "dsl-vfx-term"
  motion_term: "dsl-motion-term"
  ecommerce_term: "dsl-ecommerce-term"
  education_term: "dsl-education-term"
  psychology_term: "dsl-psychology-term"
  chemistry_term: "dsl-chemistry-term"
  biology_term: "dsl-biology-term"
  geography_term: "dsl-geography-term"
  aerospace_term: "dsl-aerospace-term"
  military_term: "dsl-military-term"
  sports_term: "dsl-sports-term"
  agriculture_term: "dsl-agriculture-term"
  # v2.3.0 分镜脚本扩展分类
  shot_size: "dsl-lexicon-shot-size"
  camera_fixed: "dsl-lexicon-camera-fixed"
  blocking: "dsl-lexicon-blocking"
  # v2.3.1 新增分类
  focal_length: "dsl-lexicon-focal-length"
  performance: "dsl-lexicon-performance"

  # v2.4.0 新增词典映射
  music_structure: "dsl-lexicon-music-structure"
  avatar_emotion: "dsl-lexicon-avatar-emotion"
  avatar_gesture: "dsl-lexicon-avatar-gesture"
  tts_emotion: "dsl-lexicon-tts-emotion"
  interior_style: "dsl-lexicon-interior-style"
  logo_style: "dsl-lexicon-logo-style"
`;

/** 04-theme-color.yaml 内置内容 */
const THEME_COLOR_YAML = `# 动态颜色配置 — 颜色完全由 YAML 驱动，支持无限扩展
# 工作原理：colors 区定义令牌 → 插件生成 CSS 变量 → styleRules 区引用令牌名
#
# 修改颜色步骤：
# 1. 在 colors 区找到对应令牌
# 2. 修改 light/dark 值
# 3. 保存后插件自动重新加载（或重启 Obsidian）
#
# 新增颜色步骤：
# 1. 在 colors 区添加新令牌（如 mycolor: { light: "#ff0000", dark: "#ff5555" }）
# 2. 在 styleRules 中用令牌名引用（如 color: "mycolor"）
# 3. 支持 .soft 和 .border 修饰（如 background: "mycolor.soft"）

# ============================================================
# 颜色定义区 — 定义所有可用的颜色令牌
# 每个令牌自动生成 3 个 CSS 变量：
#   --dsl-{name}        → 主色
#   --dsl-{name}-soft   → 半透明背景（自动计算 6% 透明度）
#   --dsl-{name}-border → 边框色（自动计算 15% 透明度）
# ============================================================
colors:
  # ---- 基础 10 令牌 ----
  danger:
    light: "#ef4444"
    dark: "#f87171"
    name: { zh: "红色（排除/禁止）", en: "Red (Exclude)" }
    desc: { zh: "排除规则、SD 负面提示词头", en: "Exclusion rules, SD negative" }
  success:
    light: "#10b981"
    dark: "#34d399"
    name: { zh: "绿色（成功/台词）", en: "Green (Success)" }
    desc: { zh: "台词内容、质量标签", en: "Dialogue, quality tags" }
  warning:
    light: "#d97706"
    dark: "#f59e0b"
    name: { zh: "黄色（警告/参数）", en: "Yellow (Warning)" }
    desc: { zh: "技术参数、变量、权重标记", en: "Tech params, variables, weights" }
  info:
    light: "#3b82f6"
    dark: "#60a5fa"
    name: { zh: "蓝色（信息/标签）", en: "Blue (Info)" }
    desc: { zh: "字段标签、括号强调", en: "Field labels, bracket emphasis" }
  purple:
    light: "#8b5cf6"
    dark: "#a78bfa"
    name: { zh: "紫色（区段/指令）", en: "Purple (Section)" }
    desc: { zh: "区段标记、角色标签、指令标记", en: "Section markers, role tags" }
  cyan:
    light: "#0891b2"
    dark: "#22d3ee"
    name: { zh: "青色（分镜/运镜）", en: "Cyan (Shot)" }
    desc: { zh: "分镜标题、镜头运动术语", en: "Shot headers, camera moves" }
  pink:
    light: "#db2777"
    dark: "#f472b6"
    name: { zh: "粉色（音频）", en: "Pink (Audio)" }
    desc: { zh: "音频引用、音色标签", en: "Audio references, tone tags" }
  amber:
    light: "#b45309"
    dark: "#d97706"
    name: { zh: "棕色（资源引用）", en: "Amber (Asset)" }
    desc: { zh: "资源引用、Lora 模型引用", en: "Asset refs, Lora models" }
  orange:
    light: "#ea580c"
    dark: "#fb923c"
    name: { zh: "橙色（光效）", en: "Orange (Light)" }
    desc: { zh: "光效术语", en: "Light effect terms" }
  paren:
    light: "#94a3b8"
    dark: "#94a3b8"
    name: { zh: "灰色（括号注释）", en: "Gray (Parenthetical)" }
    desc: { zh: "括号注释、弱化标记", en: "Parenthetical notes, weak markers" }

  # ---- 扩展令牌 ----
  violet:
    light: "#7c3aed"
    dark: "#818cf8"
    name: { zh: "深紫（ANTML/AI 语法）", en: "Violet (ANTML)" }
    desc: { zh: "ANTML 标签、AI 工具语法", en: "ANTML tags, AI syntax" }
  indigo:
    light: "#6366f1"
    dark: "#818cf8"
    name: { zh: "靛蓝（Chat Token）", en: "Indigo (Chat Token)" }
    desc: { zh: "Chat Template Token", en: "Chat tokens, special markers" }
  emerald:
    light: "#059669"
    dark: "#10b981"
    name: { zh: "翠绿（Mermaid/命令）", en: "Emerald (Mermaid)" }
    desc: { zh: "Mermaid 图表、命令行指令", en: "Mermaid diagrams, CLI commands" }
  slate:
    light: "#64748b"
    dark: "#94a3b8"
    name: { zh: "石板灰（引用/注释）", en: "Slate (Quote)" }
    desc: { zh: "嵌套引用、Frontmatter", en: "Nested quotes, frontmatter" }
  darkslate:
    light: "#1e293b"
    dark: "#e2e8f0"
    name: { zh: "深石板（标题）", en: "Dark Slate (Heading)" }
    desc: { zh: "Markdown 标题", en: "Markdown headings" }
  blue:
    light: "#2563eb"
    dark: "#60a5fa"
    name: { zh: "蓝色（链接/邮箱）", en: "Blue (Link)" }
    desc: { zh: "链接、邮箱地址", en: "Links, email addresses" }
  slategray:
    light: "#475569"
    dark: "#94a3b8"
    name: { zh: "中灰（文件路径/Kbd）", en: "Slate Gray (Path)" }
    desc: { zh: "文件路径、键盘快捷键", en: "File paths, keyboard shortcuts" }
  sky:
    light: "#0284c7"
    dark: "#0ea5e9"
    name: { zh: "天蓝（时间戳/地理）", en: "Sky (Timestamp)" }
    desc: { zh: "时间戳、地理坐标", en: "Timestamps, coordinates" }
  indigodeep:
    light: "#4f46e5"
    dark: "#6366f1"
    name: { zh: "深靛蓝（构图/法律）", en: "Indigo Deep (Composition)" }
    desc: { zh: "构图术语、法律术语", en: "Composition, legal terms" }
  fuchsia:
    light: "#c026d3"
    dark: "#e879f9"
    name: { zh: "品红（音乐/时尚）", en: "Fuchsia (Music)" }
    desc: { zh: "音乐音频、时尚设计", en: "Music audio, fashion design" }
  teal:
    light: "#0d9488"
    dark: "#2dd4bf"
    name: { zh: "青绿（数据科学/教育）", en: "Teal (Data)" }
    desc: { zh: "数据科学、教育学术语", en: "Data science, education terms" }
  rose:
    light: "#e11d48"
    dark: "#fb7185"
    name: { zh: "玫瑰红（医学）", en: "Rose (Medical)" }
    desc: { zh: "医学术语", en: "Medical terms" }
  lime:
    light: "#65a30d"
    dark: "#a3e635"
    name: { zh: "黄绿（地理/农业）", en: "Lime (Geography)" }
    desc: { zh: "地理/GIS、农业术语", en: "Geography, agriculture terms" }
  green:
    light: "#16a34a"
    dark: "#22c55e"
    name: { zh: "绿色（化学/生物）", en: "Green (Chemistry)" }
    desc: { zh: "化学、生物学术语", en: "Chemistry, biology terms" }
  slatelight:
    light: "#cbd5e1"
    dark: "#475569"
    name: { zh: "浅灰（分割线）", en: "Slate Light (Separator)" }
    desc: { zh: "水平分割线、表格分隔", en: "Horizontal rules, separators" }
  yellow:
    light: "#facc15"
    dark: "#fde047"
    name: { zh: "黄色（高亮）", en: "Yellow (Highlight)" }
    desc: { zh: "高亮标记", en: "Highlight markers" }

  # ---- 分镜脚本扩展令牌（v2.3.0 新增）----
  segment:
    light: "#be185d"
    dark: "#f472b6"
    name: { zh: "深红（段落标题）", en: "Segment (Header)" }
    desc: { zh: "分镜段落标题（A 段/B 段）", en: "Shot segment headers" }
  module:
    light: "#0e7490"
    dark: "#22d3ee"
    name: { zh: "深青（模块标题）", en: "Module (Header)" }
    desc: { zh: "分镜模块标题（模块 1/2/3）", en: "Shot module headers" }
  reference:
    light: "#6d28d9"
    dark: "#a78bfa"
    name: { zh: "深紫罗兰（引用）", en: "Reference (Cite)" }
    desc: { zh: "书名号引用、影视对标", en: "Book titles, references" }

  # ---- v2.4.0 多模态扩展令牌 ----
  music:
    light: "#c026d3"
    dark: "#e879f9"
    name: { zh: "品红（音乐生成）", en: "Music (Magenta)" }
    desc: { zh: "Suno 歌词段落、音乐元标签", en: "Suno lyrics, music meta tags" }
  avatar:
    light: "#ec4899"
    dark: "#f472b6"
    name: { zh: "粉色（数字人）", en: "Avatar (Pink)" }
    desc: { zh: "数字人情绪、手势指令", en: "Avatar emotion, gesture" }
  tts:
    light: "#f97316"
    dark: "#fb923c"
    name: { zh: "橙色（语音合成）", en: "TTS (Orange)" }
    desc: { zh: "SSML 标签、TTS 情绪", en: "SSML tags, TTS emotion" }
  agent:
    light: "#7c3aed"
    dark: "#818cf8"
    name: { zh: "深紫（Agent）", en: "Agent (Violet)" }
    desc: { zh: "ReAct 标记、CoT 触发", en: "ReAct markers, CoT triggers" }
  excel:
    light: "#059669"
    dark: "#10b981"
    name: { zh: "翠绿（Excel AI）", en: "Excel (Emerald)" }
    desc: { zh: "Copilot 函数、Excel AI", en: "Copilot formulas, Excel AI" }
  gen3d:
    light: "#0891b2"
    dark: "#22d3ee"
    name: { zh: "青色（3D 生成）", en: "3D Gen (Cyan)" }
    desc: { zh: "3D 生成平台标识", en: "3D gen platform tags" }
  comfyui:
    light: "#0d9488"
    dark: "#2dd4bf"
    name: { zh: "青绿（ComfyUI）", en: "ComfyUI (Teal)" }
    desc: { zh: "ComfyUI 节点调用", en: "ComfyUI node calls" }
  runway:
    light: "#6366f1"
    dark: "#818cf8"
    name: { zh: "靛蓝（Runway/Pika）", en: "Runway (Indigo)" }
    desc: { zh: "Runway/Pika 视频参数", en: "Runway/Pika video params" }

# ============================================================
# 样式规则区 — 每条规则引用颜色令牌名
# 引用格式：
#   "danger"         → var(--dsl-danger)
#   "danger.soft"    → var(--dsl-danger-soft)（半透明背景）
#   "danger.border"  → var(--dsl-danger-border)（边框色）
#   "1px solid danger.border" → 1px solid var(--dsl-danger-border)
# ============================================================
styleRules:
  # ============================================================
  # 一、基础结构
  # ============================================================
  dsl-block-wrapper:
    color: "purple"
    fontWeight: "bold"
    background: "purple.soft"
    border: "1px solid purple.border"
    borderRadius: "8px"
    padding: "1px 12px"

  dsl-shot-header:
    color: "cyan"
    fontWeight: "bold"

  dsl-asset:
    color: "amber"
    fontWeight: "600"

  dsl-asset-bracket:
    color: "amber"
    fontWeight: "500"

  dsl-param-key:
    color: "info"
    fontWeight: "600"

  dsl-dialogue:
    color: "success"
    fontStyle: "italic"
    background: "success.soft"
    borderRadius: "4px"
    padding: "0 2px"

  # 中文引号「」『』弱化（v2.4.1 新增，突出引号内台词）
  dsl-dialogue-quote:
    color: "paren"
    opacity: "0.60"

  dsl-constraint:
    color: "danger"
    fontWeight: "600"
    background: "danger.soft"
    borderRadius: "4px"
    padding: "0 2px"

  dsl-tech-param:
    color: "warning"
    fontWeight: "600"

  dsl-parenthetical:
    color: "paren"
    fontStyle: "italic"
    opacity: "0.70"

  dsl-variable:
    color: "warning"
    fontWeight: "600"

  dsl-role-tag:
    color: "purple"
    fontWeight: "bold"

  dsl-instruction:
    color: "purple"
    fontWeight: "bold"

  # ============================================================
  # 二、SD/ComfyUI 扩展
  # ============================================================
  dsl-emphasis-weight:
    color: "warning"
    fontWeight: "600"
    background: "warning.soft"
    borderRadius: "4px"
    padding: "0 2px"

  dsl-lora-ref:
    color: "amber"
    fontWeight: "bold"
    background: "amber.soft"
    borderRadius: "4px"
    padding: "0 2px"

  dsl-bracket-strong:
    color: "info"
    fontWeight: "bold"

  dsl-bracket-weak:
    color: "paren"
    opacity: "0.75"

  dsl-quality-tag:
    color: "success"
    fontWeight: "600"

  dsl-sd-negative-header:
    color: "danger"
    fontWeight: "bold"
    background: "danger.soft"
    borderLeft: "3px solid danger"
    paddingLeft: "12px"
    borderRadius: "0 4px 4px 0"

  # SD 参数标记：--ar 16:9 --v 6
  dsl-sd-parameter:
    color: "violet"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "violet.soft"
    borderRadius: "3px"
    padding: "0 3px"

  # 音频相关
  dsl-audio-ref:
    color: "pink"
    fontWeight: "600"

  dsl-audio-tone:
    color: "pink"
    fontWeight: "500"
    fontStyle: "italic"

  dsl-audio-sfx:
    color: "pink"
    fontWeight: "600"

  # ============================================================
  # 三、AI 工具结构化语法（2025-2026 趋势，紫蓝科技系）
  # ============================================================
  # ANTML 命名空间标签（最高优先级强调）
  dsl-antml-tag:
    color: "violet"
    fontWeight: "bold"
    background: "violet.soft"
    borderRadius: "4px"
    padding: "0 2px"

  dsl-function-results:
    color: "purple"
    fontWeight: "600"
    background: "purple.soft"
    borderRadius: "4px"

  dsl-xml-block:
    color: "purple"
    fontWeight: "600"

  dsl-chat-token:
    color: "indigo"
    fontWeight: "bold"

  dsl-llama-token:
    color: "indigo"
    fontWeight: "bold"

  dsl-gemma-token:
    color: "info"
    fontWeight: "bold"

  dsl-llama-sys:
    color: "purple"
    fontWeight: "bold"

  dsl-workflow-sep:
    color: "paren"
    fontWeight: "600"
    fontStyle: "italic"

  dsl-json-schema-key:
    color: "warning"
    fontWeight: "600"

  dsl-jinja-control:
    color: "purple"
    fontWeight: "600"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 2px"

  dsl-workflow-node:
    color: "cyan"
    fontWeight: "600"

  # ============================================================
  # 四、Markdown 扩展语法
  # ============================================================
  dsl-md-mermaid:
    color: "emerald"
    fontWeight: "bold"
    background: "emerald.soft"
    borderRadius: "4px"

  dsl-md-nested-quote:
    color: "slate"
    fontStyle: "italic"

  dsl-md-anchor-link:
    color: "info"
    fontWeight: "500"
    textDecoration: "underline dotted"

  dsl-md-callout-meta:
    color: "warning"
    fontWeight: "bold"
    background: "warning.soft"
    borderRadius: "4px"
    padding: "0 4px"

  dsl-md-admonition:
    color: "warning"
    fontWeight: "bold"
    background: "warning.soft"
    borderRadius: "4px"

  # ============================================================
  # 四-B、基础 Markdown 语法
  # ============================================================
  # Frontmatter 分隔符
  dsl-md-frontmatter:
    color: "slate"
    fontWeight: "bold"
    opacity: "0.60"

  # 标题标记
  dsl-md-heading:
    color: "darkslate"
    fontWeight: "bold"

  # 粗体
  dsl-md-bold:
    fontWeight: "bold"

  # 斜体
  dsl-md-italic:
    fontStyle: "italic"

  # 删除线
  dsl-md-strikethrough:
    color: "paren"
    textDecoration: "line-through"

  # 代码块围栏
  dsl-md-code-fence:
    color: "slate"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "slate.soft"
    borderRadius: "4px"

  # 行内代码
  dsl-md-inline-code:
    color: "pink"
    fontFamily: "monospace"
    background: "pink.soft"
    borderRadius: "3px"
    padding: "0 3px"

  # 链接
  dsl-md-link:
    color: "blue"
    textDecoration: "underline"

  # 图片
  dsl-md-image:
    color: "cyan"
    fontWeight: "500"

  # Wiki 链接
  dsl-md-wiki-link:
    color: "blue"
    fontWeight: "500"

  # 标签 #tag
  dsl-md-tag:
    color: "violet"
    fontWeight: "500"

  # 任务列表标记
  dsl-md-task:
    color: "emerald"
    fontWeight: "bold"

  # 脚注引用
  dsl-md-footnote:
    color: "indigo"
    fontWeight: "500"
    fontSize: "0.85em"

  # 脚注定义
  dsl-md-footnote-def:
    color: "indigo"
    fontWeight: "600"

  # 数学公式块
  dsl-md-math:
    color: "violet"
    fontWeight: "bold"

  # 行内数学公式
  dsl-md-math-inline:
    color: "violet"

  # 引用块
  dsl-md-blockquote:
    color: "slate"
    fontStyle: "italic"
    borderLeft: "3px solid slate.border"
    paddingLeft: "12px"

  # Callout 块
  dsl-md-callout:
    color: "warning"
    fontWeight: "bold"
    background: "warning.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # 水平分割线
  dsl-md-hr:
    color: "slatelight"
    opacity: "0.50"

  # 表格分隔行
  dsl-md-table-sep:
    color: "paren"
    fontFamily: "monospace"

  # 表格行
  dsl-md-table-row:
    color: "slategray"
    fontFamily: "monospace"

  # 列表项
  dsl-md-list-item:
    color: "slate"
    fontWeight: "600"

  # 定义列表
  dsl-md-definition:
    color: "cyan"
    fontWeight: "500"

  # 块引用 ID
  dsl-md-block-id:
    color: "paren"
    fontFamily: "monospace"
    fontSize: "0.85em"

  # Obsidian 注释
  dsl-md-comment:
    color: "paren"
    fontStyle: "italic"
    opacity: "0.50"

  # Emoji 短码
  dsl-md-emoji:
    color: "emerald"

  # 高亮标记
  dsl-md-highlight:
    background: "yellow.soft"
    borderRadius: "3px"
    padding: "0 2px"

  # YAML/JSON 键值
  dsl-md-yaml-key:
    color: "warning"
    fontWeight: "600"

  # ============================================================
  # 五、操作档案扩展标记
  # ============================================================
  dsl-email:
    color: "blue"
    fontWeight: "500"

  dsl-ip-address:
    color: "cyan"
    fontWeight: "500"
    fontFamily: "monospace"

  dsl-mac-address:
    color: "cyan"
    fontWeight: "500"
    fontFamily: "monospace"

  dsl-uuid:
    color: "slate"
    fontWeight: "500"
    fontFamily: "monospace"

  dsl-hex-color:
    color: "warning"
    fontWeight: "600"
    fontFamily: "monospace"

  dsl-css-color-func:
    color: "warning"
    fontWeight: "500"
    fontFamily: "monospace"

  dsl-geo-coord:
    color: "cyan"
    fontWeight: "500"
    fontFamily: "monospace"

  dsl-currency:
    color: "emerald"
    fontWeight: "600"

  dsl-percentage:
    color: "warning"
    fontWeight: "600"

  dsl-measurement:
    color: "warning"
    fontWeight: "500"

  # ============================================================
  # 五-B、基础操作档案标记
  # ============================================================
  # 时间戳
  dsl-timestamp:
    color: "sky"
    fontWeight: "500"
    fontFamily: "monospace"

  # 版本号
  dsl-version-number:
    color: "violet"
    fontWeight: "600"
    fontFamily: "monospace"

  # URL 链接
  dsl-url-link:
    color: "blue"
    textDecoration: "underline"

  # 文件路径
  dsl-file-path:
    color: "slategray"
    fontFamily: "monospace"
    background: "slategray.soft"
    borderRadius: "3px"
    padding: "0 2px"

  # 命令行指令
  dsl-cli-command:
    color: "emerald"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "emerald.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # 键盘快捷键
  dsl-kbd-tag:
    color: "slategray"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "slategray.soft"
    borderRadius: "4px"
    padding: "1px 6px"
    border: "1px solid slategray.border"

  # HTML 标签
  dsl-html-tag:
    color: "purple"
    fontWeight: "500"
    fontFamily: "monospace"

  # 键值分隔符
  dsl-key-value:
    color: "warning"
    fontWeight: "500"

  # 引用标记
  dsl-reference-marker:
    color: "slate"
    fontWeight: "600"

  # 分隔标记
  dsl-separator:
    color: "slatelight"
    opacity: "0.50"

  # ============================================================
  # 六、词典精细化着色（按行业色相分区）
  # ============================================================
  # 镜头运动 - 青色系
  dsl-camera-word:
    color: "cyan"
    fontWeight: "600"

  # 光影 - 橙色系
  dsl-light-word:
    color: "orange"
    fontWeight: "500"

  # 情绪 - 紫色系
  dsl-emotion-word:
    color: "purple"
    fontStyle: "italic"

  # 转场 - 紫色系
  dsl-scene-transition:
    color: "purple"
    fontWeight: "600"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 2px"

  # AI/机器学习 - 紫色科技系
  dsl-ai-ml-term:
    color: "purple"
    fontWeight: "600"

  # SD/图像生成 - 青色系
  dsl-sd-image-term:
    color: "cyan"
    fontWeight: "600"

  # 摄影 - 蓝色系
  dsl-photography-term:
    color: "blue"
    fontWeight: "600"

  # 艺术风格 - 粉色系
  dsl-art-style:
    color: "pink"
    fontWeight: "500"
    fontStyle: "italic"

  # 色彩理论 - 橙色系
  dsl-color-term:
    color: "orange"
    fontWeight: "500"

  # 构图 - 靛蓝系
  dsl-composition-term:
    color: "indigodeep"
    fontWeight: "500"

  # 音乐音频 - 紫红系
  dsl-music-audio-term:
    color: "fuchsia"
    fontWeight: "500"

  # 编程 - 绿色系
  dsl-programming-term:
    color: "emerald"
    fontWeight: "600"
    fontFamily: "monospace"

  # 数据科学 - 青绿系
  dsl-data-science-term:
    color: "teal"
    fontWeight: "600"

  # 叙事写作 - 琥珀系
  dsl-narrative-term:
    color: "warning"
    fontWeight: "500"
    fontStyle: "italic"

  # 营销 - 红色系
  dsl-marketing-term:
    color: "danger"
    fontWeight: "600"

  # 游戏开发 - 紫色系
  dsl-game-dev-term:
    color: "violet"
    fontWeight: "600"

  # 质量标签 - 绿色系
  dsl-quality-tag-ext:
    color: "success"
    fontWeight: "600"

  # 负面标签 - 红色系
  dsl-negative-tag:
    color: "danger"
    fontWeight: "500"
    opacity: "0.85"

  # 医学 - 玫红系
  dsl-medical-term:
    color: "rose"
    fontWeight: "500"

  # 法律 - 靛蓝系
  dsl-legal-term:
    color: "indigodeep"
    fontWeight: "600"

  # 金融 - 翠绿系
  dsl-finance-term:
    color: "emerald"
    fontWeight: "600"

  # 建筑 - 石板灰系
  dsl-architecture-term:
    color: "slategray"
    fontWeight: "500"

  # 时尚 - 粉紫系
  dsl-fashion-term:
    color: "fuchsia"
    fontWeight: "500"
    fontStyle: "italic"

  # 美食烹饪 - 橙红系
  dsl-food-term:
    color: "orange"
    fontWeight: "500"

  # 物理科学 - 靛紫系
  dsl-physics-term:
    color: "indigo"
    fontWeight: "500"

  # ============================================================
  # 七、扩展行业词典（新增 14 个领域）
  # ============================================================
  # UI/UX 设计 - 蓝色系
  dsl-ui-ux-term:
    color: "blue"
    fontWeight: "600"

  # 3D建模/CG - 青色系
  dsl-cg-term:
    color: "cyan"
    fontWeight: "600"

  # 影视后期/VFX - 紫色系
  dsl-vfx-term:
    color: "violet"
    fontWeight: "600"

  # 动效设计 - 粉色系
  dsl-motion-term:
    color: "pink"
    fontWeight: "500"

  # 电商运营 - 橙色系
  dsl-ecommerce-term:
    color: "orange"
    fontWeight: "600"

  # 教育学 - 蓝绿系
  dsl-education-term:
    color: "teal"
    fontWeight: "500"

  # 心理学 - 紫色系
  dsl-psychology-term:
    color: "purple"
    fontWeight: "500"
    fontStyle: "italic"

  # 化学 - 绿色系
  dsl-chemistry-term:
    color: "green"
    fontWeight: "500"

  # 生物学 - 翠绿系
  dsl-biology-term:
    color: "emerald"
    fontWeight: "500"

  # 地理/GIS - 黄绿系
  dsl-geography-term:
    color: "lime"
    fontWeight: "500"

  # 航空航天 - 天蓝系
  dsl-aerospace-term:
    color: "sky"
    fontWeight: "600"

  # 军事 - 暗灰系
  dsl-military-term:
    color: "slategray"
    fontWeight: "600"

  # 体育/运动科学 - 橙色系
  dsl-sports-term:
    color: "orange"
    fontWeight: "500"

  # 农业 - 草绿系
  dsl-agriculture-term:
    color: "green"
    fontWeight: "500"

  # ============================================================
  # 八、分镜脚本扩展样式（v2.3.0 新增）
  # ============================================================
  dsl-segment-header:
    color: "segment"
    fontWeight: "bold"
    fontSize: "1.1em"
  dsl-module-header:
    color: "module"
    fontWeight: "bold"
  dsl-dialogue-speaker:
    color: "info"
    fontWeight: "bold"
  dsl-character-def:
    color: "purple"
    fontWeight: "bold"
  dsl-book-title:
    color: "reference"
    fontStyle: "italic"
  dsl-cn-chapter:
    color: "darkslate"
    fontWeight: "bold"
    fontSize: "1.15em"
  dsl-time-range:
    color: "warning"
  dsl-section-note:
    color: "slate"
    fontWeight: "bold"
  dsl-lexicon-blocking:
    color: "indigodeep"
  dsl-lexicon-camera-fixed:
    color: "cyan"
  dsl-lexicon-shot-size:
    color: "cyan"

  # ============================================================
  # 九、分镜脚本扩展样式（v2.3.1 新增）
  # ============================================================
  dsl-shot-id:
    color: "cyan"
    fontWeight: "bold"
  dsl-lexicon-focal-length:
    color: "orange"
  dsl-lexicon-performance:
    color: "pink"

  # ============================================================
  # 十、AI 多模态扩展样式（v2.4.0 新增）
  # ============================================================
  # SSML 语音合成标签
  dsl-ssml-tag:
    color: "tts"
    fontWeight: "bold"
    background: "tts.soft"
    borderRadius: "4px"
    padding: "0 2px"

  # 歌词段落标签 [Verse] [Chorus]
  dsl-lyric-section:
    color: "music"
    fontWeight: "bold"
    background: "music.soft"
    borderRadius: "4px"
    padding: "0 6px"

  # Suno 风格元标签 [style: pop]
  dsl-suno-meta:
    color: "music"
    fontWeight: "600"
    background: "music.soft"
    borderRadius: "3px"
    padding: "0 3px"

  # 数字人指令标签 [emotion]happy[/emotion]
  dsl-avatar-directive:
    color: "avatar"
    fontWeight: "bold"
    background: "avatar.soft"
    borderRadius: "4px"
    padding: "0 2px"

  # Excel Copilot 函数 =COPILOT(...)
  dsl-copilot-formula:
    color: "excel"
    fontWeight: "bold"
    fontFamily: "monospace"
    background: "excel.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # ReAct Agent 标记 Thought: / Action:
  dsl-react-marker:
    color: "agent"
    fontWeight: "bold"
    background: "agent.soft"
    borderRadius: "4px"
    padding: "0 6px"

  # CoT 触发短语
  dsl-cot-trigger:
    color: "agent"
    fontWeight: "600"
    fontStyle: "italic"
    background: "agent.soft"
    borderRadius: "4px"
    padding: "0 2px"

  # AI 模型标识符 gpt-4、claude-3
  dsl-model-identifier:
    color: "violet"
    fontWeight: "600"
    fontFamily: "monospace"

  # ComfyUI 节点调用 KSampler(...)
  dsl-comfyui-node:
    color: "comfyui"
    fontWeight: "bold"
    fontFamily: "monospace"
    background: "comfyui.soft"
    borderRadius: "4px"
    padding: "0 3px"

  # Pika 视频参数 --camera
  dsl-pika-parameter:
    color: "runway"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "runway.soft"
    borderRadius: "3px"
    padding: "0 3px"

  # Runway Gen 参数
  dsl-runway-parameter:
    color: "runway"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "runway.soft"
    borderRadius: "3px"
    padding: "0 3px"

  # 翻译任务标记 Source: / Target:
  dsl-translation-marker:
    color: "purple"
    fontWeight: "bold"

  # Few-shot 示例标记 Example: / Q:
  dsl-fewshot-marker:
    color: "purple"
    fontWeight: "600"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # 3D 生成平台标识 [Meshy] [Hunyuan3D]
  dsl-gen3d-platform:
    color: "gen3d"
    fontWeight: "bold"
    background: "gen3d.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # v2.4.0 词典扩展样式
  dsl-lexicon-music-structure:
    color: "music"
    fontWeight: "600"
  dsl-lexicon-avatar-emotion:
    color: "avatar"
    fontWeight: "500"
  dsl-lexicon-avatar-gesture:
    color: "avatar"
    fontWeight: "500"
    fontStyle: "italic"
  dsl-lexicon-tts-emotion:
    color: "tts"
    fontWeight: "500"
  dsl-lexicon-interior-style:
    color: "slategray"
    fontWeight: "500"
    fontStyle: "italic"
  dsl-lexicon-logo-style:
    color: "indigodeep"
    fontWeight: "500"

  # ============================================================
  # 十一、中文编程标识逻辑扩展样式（v2.5.0 新增）
  # ============================================================
  # 显式标识符（借鉴文言「」包裹机制）
  dsl-explicit-identifier:
    color: "purple"
    fontWeight: "bold"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # 显式字符串（借鉴文言双层引号字面量）
  dsl-explicit-string:
    color: "success"
    fontStyle: "italic"
    background: "success.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # 半角括号注释（与全角 parenthetical 视觉一致）
  dsl-parenthetical-half:
    color: "paren"
    fontStyle: "italic"
    opacity: "0.70"

  # ============================================================
  # 十一、组合规则样式（v2.5.0 新增）
  # ============================================================
  # 镜头动作指令（动宾结构识别）
  dsl-camera-action:
    color: "cyan"
    fontWeight: "600"

  # 情绪标注（并列结构识别）
  dsl-emotion-parallel:
    color: "pink"
    fontStyle: "italic"
    fontWeight: "500"
`;

/** 05-priority.yaml 内置内容 */
const PRIORITY_YAML = `# 优先级控制（解决多层高亮覆盖冲突）
# 数值越大渲染越晚、优先级越高，自动覆盖低层样式

priority:
  # 原生 Markdown 语法（最低层，由 Obsidian 处理）
  native-markdown: 10

  # 基础结构正则匹配
  base-pattern: 30

  # 上下文语义过滤后的匹配
  semantic-context: 60

  # 词典关键词精细化着色（最高层）
  lexicon-keyword: 80

  # ============================================================
  # v2.5.0 新增 pattern 级别优先级映射（中文编程语言标识逻辑）
  # ============================================================

  # 显式边界标记（借鉴文言语言「」机制，高于 semantic-context 层确保最优先）
  explicit_identifier: 65
  explicit_string: 59

  # 约束关键字分层（借鉴易语言保留字分层）
  constraint_absolute: 55
  constraint_soft: 50
  constraint: 45            # 兜底，从 55 降级

  # 参数键位置消歧（借鉴中蟒语法位置判断）
  param_key_strict: 46
  param_key: 40             # 兜底，从 45 降级

  # 台词与括号边界断言（借鉴中文编程语言词边界）
  dialogue_cn_strict: 52
  parenthetical_strict: 27
  parenthetical_half: 26

  # ---- 组合规则优先级（v2.5.0 新增）----
  # 组合规则层位于 patterns（50+）与兜底（40-）之间
  # 仅在 patterns/lexicons 匹配失败时触发
  combination_constraint_verb_prefix: 48
  combination_tech_param_num_quant: 47
  combination_param_key_adj_noun: 46
  combination_param_key_noun_noun: 46
  combination_chapter_title: 45
  combination_camera_action_verb_noun: 44
  combination_emotion_parallel: 43

  # ---- 词组词典优先级（v2.6.0 新增，v2.6.1 扩展，v2.7.0 拆分+导演知识整合）----
  # 词组分词层位于组合规则之后，作为字级规则的兜底前置层
  # 优先级与 07a-07k 各子文件中分组的 priority 字段保持一致
  # v2.6.0 基础分组（07a-07f，从原 07-word-lexicon.yaml 拆分）
  word_lexicon_constraint_phrase: 48
  word_lexicon_tech_param_phrase: 47
  word_lexicon_param_key_phrase: 46
  word_lexicon_chapter_title_phrase: 45
  word_lexicon_camera_action_phrase: 44
  word_lexicon_emotion_phrase: 43
  word_lexicon_scene_description_phrase: 42
  word_lexicon_character_action_phrase: 42
  word_lexicon_atmosphere_phrase: 41
  word_lexicon_time_season_phrase: 41
  word_lexicon_costume_makeup_phrase: 40

  # v2.7.0 导演必学·摄影与镜头语言（07g-director-cinematography.yaml）
  word_lexicon_cinematography_basic: 46
  word_lexicon_shot_size_extended: 44
  word_lexicon_camera_angle_extended: 44
  word_lexicon_camera_movement_extended: 44
  word_lexicon_focal_length_phrase: 47
  word_lexicon_composition_phrase: 46
  word_lexicon_depth_of_field_phrase: 47

  # v2.7.0 导演必学·光影与色彩（07h-director-lighting-color.yaml）
  word_lexicon_lighting_basic: 41
  word_lexicon_light_quality: 41
  word_lexicon_light_ratio: 41
  word_lexicon_color_theory: 46
  word_lexicon_color_psychology: 42
  word_lexicon_color_grading_style: 39

  # v2.7.0 导演必学·剪辑与声音（07i-director-editing-sound.yaml）
  word_lexicon_editing_basic: 39
  word_lexicon_montage_theory: 39
  word_lexicon_editing_rhythm: 39
  word_lexicon_sound_design: 39
  word_lexicon_music_score: 39

  # v2.7.0 导演必学·表演与剧作（07j-director-performance-screenplay.yaml）
  word_lexicon_performance_theory: 43
  word_lexicon_emotion_expression: 43
  word_lexicon_body_language: 42
  word_lexicon_screenplay_structure: 39
  word_lexicon_story_element: 39
  word_lexicon_dialogue_craft: 39

  # v2.7.0 导演必学·类型/制片/电影史（07k-director-genre-production.yaml）
  word_lexicon_genre_film: 39
  word_lexicon_film_movement: 39
  word_lexicon_production_management: 38
  word_lexicon_post_production: 39
  word_lexicon_film_theory: 39

# 默认优先级（当 pattern 未指定 priority 时使用）
defaultPatternPriority: 30

# 词典优先级固定为最高
lexiconPriority: 80
`;

/** 06-char-lexicon.yaml 内置内容 */
const CHAR_LEXICON_YAML = `# ============================================================
# 06-char-lexicon.yaml
# 汉字词性词典驱动的组合判断规则（v2.5.0 新增）
# ------------------------------------------------------------
# 本文件提供基于汉字词性的组合识别能力：
#   1. charLexicon: 按词性分类录入汉字，每个字标注 pos 与 category
#   2. combinationRules: 定义 6 种组合规则（偏正/动宾/量词/约束/并列/标题）
# 组合规则优先级：
#   constraint(48) > tech_param(47) > param_key(46)
#   > chapter_title(45) > camera_action(44) > emotion(43)
# ============================================================

charLexicon:

  # ============================================================
  # 形容词类（adj）—— 视觉/空间/速度/质感/程度/温度属性
  # ============================================================
  adj:
    # --- 视觉属性 ---
    色: { pos: adj, category: visual }
    明: { pos: adj, category: visual }
    暗: { pos: adj, category: visual }
    深: { pos: adj, category: visual }
    浅: { pos: adj, category: visual }
    浓: { pos: adj, category: visual }
    淡: { pos: adj, category: visual }
    鲜: { pos: adj, category: visual }
    艳: { pos: adj, category: visual }
    亮: { pos: adj, category: visual }
    晦: { pos: adj, category: visual }
    灿: { pos: adj, category: visual }

    # --- 空间属性 ---
    长: { pos: adj, category: spatial }
    短: { pos: adj, category: spatial }
    高: { pos: adj, category: spatial }
    低: { pos: adj, category: spatial }
    大: { pos: adj, category: spatial }
    小: { pos: adj, category: spatial }
    宽: { pos: adj, category: spatial }
    窄: { pos: adj, category: spatial }
    厚: { pos: adj, category: spatial }
    薄: { pos: adj, category: spatial }
    远: { pos: adj, category: spatial }
    近: { pos: adj, category: spatial }
    粗: { pos: adj, category: spatial }
    细: { pos: adj, category: spatial }

    # --- 速度属性 ---
    快: { pos: adj, category: speed }
    慢: { pos: adj, category: speed }
    急: { pos: adj, category: speed }
    缓: { pos: adj, category: speed }
    迅: { pos: adj, category: speed }
    速: { pos: adj, category: speed }
    迟: { pos: adj, category: speed }

    # --- 质感属性 ---
    硬: { pos: adj, category: texture }
    软: { pos: adj, category: texture }
    滑: { pos: adj, category: texture }
    糙: { pos: adj, category: texture }
    韧: { pos: adj, category: texture }
    脆: { pos: adj, category: texture }

    # --- 程度属性 ---
    强: { pos: adj, category: degree }
    弱: { pos: adj, category: degree }
    重: { pos: adj, category: degree }
    轻: { pos: adj, category: degree }
    极: { pos: adj, category: degree }
    最: { pos: adj, category: degree }
    颇: { pos: adj, category: degree }
    稍: { pos: adj, category: degree }

    # --- 温度属性 ---
    暖: { pos: adj, category: temperature }
    冷: { pos: adj, category: temperature }
    热: { pos: adj, category: temperature }
    凉: { pos: adj, category: temperature }
    冰: { pos: adj, category: temperature }

  # ============================================================
  # 动词类（verb）—— 镜头运动/约束指令/动作指令/表演动作
  # ============================================================
  verb:
    # --- 镜头运动 ---
    推: { pos: verb, category: camera_motion }
    拉: { pos: verb, category: camera_motion }
    摇: { pos: verb, category: camera_motion }
    移: { pos: verb, category: camera_motion }
    跟: { pos: verb, category: camera_motion }
    升: { pos: verb, category: camera_motion }
    降: { pos: verb, category: camera_motion }
    甩: { pos: verb, category: camera_motion }
    旋: { pos: verb, category: camera_motion }
    环: { pos: verb, category: camera_motion }
    绕: { pos: verb, category: camera_motion }
    俯: { pos: verb, category: camera_motion }
    仰: { pos: verb, category: camera_motion }

    # --- 约束指令 ---
    排: { pos: verb, category: constraint }
    避: { pos: verb, category: constraint }
    锁: { pos: verb, category: constraint }
    定: { pos: verb, category: constraint }
    禁: { pos: verb, category: constraint }
    严: { pos: verb, category: constraint }
    杜: { pos: verb, category: constraint }
    绝: { pos: verb, category: constraint }
    切: { pos: verb, category: constraint }
    勿: { pos: verb, category: constraint }
    止: { pos: verb, category: constraint }
    防: { pos: verb, category: constraint }
    阻: { pos: verb, category: constraint }
    拒: { pos: verb, category: constraint }

    # --- 动作指令 ---
    保: { pos: verb, category: action }
    留: { pos: verb, category: action }
    显: { pos: verb, category: action }
    隐: { pos: verb, category: action }
    换: { pos: verb, category: action }
    开: { pos: verb, category: action }
    关: { pos: verb, category: action }
    启: { pos: verb, category: action }
    停: { pos: verb, category: action }
    加: { pos: verb, category: action }
    减: { pos: verb, category: action }
    增: { pos: verb, category: action }
    删: { pos: verb, category: action }
    改: { pos: verb, category: action }

    # --- 表演动作 ---
    看: { pos: verb, category: performance }
    望: { pos: verb, category: performance }
    盯: { pos: verb, category: performance }
    瞥: { pos: verb, category: performance }
    凝: { pos: verb, category: performance }
    转: { pos: verb, category: performance }
    回: { pos: verb, category: performance }
    起: { pos: verb, category: performance }
    坐: { pos: verb, category: performance }
    立: { pos: verb, category: performance }
    行: { pos: verb, category: performance }
    跑: { pos: verb, category: performance }
    跳: { pos: verb, category: performance }
    蹲: { pos: verb, category: performance }

  # ============================================================
  # 名词类（noun）—— 物理量/视觉对象/场景对象/抽象概念
  # ============================================================
  noun:
    # --- 物理量 ---
    温: { pos: noun, category: physical }
    焦: { pos: noun, category: physical }
    距: { pos: noun, category: physical }
    度: { pos: noun, category: physical }
    比: { pos: noun, category: physical }
    率: { pos: noun, category: physical }
    量: { pos: noun, category: physical }
    速: { pos: noun, category: physical }
    频: { pos: noun, category: physical }
    压: { pos: noun, category: physical }
    流: { pos: noun, category: physical }
    密: { pos: noun, category: physical }
    浓: { pos: noun, category: physical }

    # --- 视觉对象 ---
    光: { pos: noun, category: visual_object }
    影: { pos: noun, category: visual_object }
    镜: { pos: noun, category: visual_object }
    头: { pos: noun, category: visual_object }
    画: { pos: noun, category: visual_object }
    面: { pos: noun, category: visual_object }
    形: { pos: noun, category: visual_object }
    态: { pos: noun, category: visual_object }
    势: { pos: noun, category: visual_object }
    色: { pos: noun, category: visual_object }
    彩: { pos: noun, category: visual_object }
    调: { pos: noun, category: visual_object }
    纹: { pos: noun, category: visual_object }

    # --- 场景对象 ---
    人: { pos: noun, category: scene_object }
    物: { pos: noun, category: scene_object }
    景: { pos: noun, category: scene_object }
    场: { pos: noun, category: scene_object }
    车: { pos: noun, category: scene_object }
    房: { pos: noun, category: scene_object }
    树: { pos: noun, category: scene_object }
    花: { pos: noun, category: scene_object }
    水: { pos: noun, category: scene_object }
    山: { pos: noun, category: scene_object }
    云: { pos: noun, category: scene_object }
    风: { pos: noun, category: scene_object }
    雨: { pos: noun, category: scene_object }
    雪: { pos: noun, category: scene_object }

    # --- 抽象概念 ---
    时: { pos: noun, category: abstract }
    空: { pos: noun, category: abstract }
    线: { pos: noun, category: abstract }
    点: { pos: noun, category: abstract }
    区: { pos: noun, category: abstract }
    层: { pos: noun, category: abstract }
    级: { pos: noun, category: abstract }
    类: { pos: noun, category: abstract }
    种: { pos: noun, category: abstract }
    组: { pos: noun, category: abstract }
    段: { pos: noun, category: abstract }
    步: { pos: noun, category: abstract }
    次: { pos: noun, category: abstract }
    轮: { pos: noun, category: abstract }

  # ============================================================
  # 量词类（quantifier）—— 时间/影视/章节/频次/数量
  # ============================================================
  quantifier:
    # --- 时间 ---
    秒: { pos: quantifier, category: time }
    分: { pos: quantifier, category: time }
    时: { pos: quantifier, category: time }
    天: { pos: quantifier, category: time }
    周: { pos: quantifier, category: time }
    月: { pos: quantifier, category: time }
    年: { pos: quantifier, category: time }

    # --- 影视 ---
    帧: { pos: quantifier, category: film }
    集: { pos: quantifier, category: film }
    幕: { pos: quantifier, category: film }
    场: { pos: quantifier, category: film }
    镜: { pos: quantifier, category: film }
    段: { pos: quantifier, category: film }

    # --- 章节 ---
    章: { pos: quantifier, category: chapter }
    节: { pos: quantifier, category: chapter }
    回: { pos: quantifier, category: chapter }
    课: { pos: quantifier, category: chapter }
    篇: { pos: quantifier, category: chapter }
    卷: { pos: quantifier, category: chapter }

    # --- 频次 ---
    次: { pos: quantifier, category: frequency }
    遍: { pos: quantifier, category: frequency }
    轮: { pos: quantifier, category: frequency }
    回: { pos: quantifier, category: frequency }
    趟: { pos: quantifier, category: frequency }
    番: { pos: quantifier, category: frequency }

    # --- 数量 ---
    个: { pos: quantifier, category: quantity }
    只: { pos: quantifier, category: quantity }
    条: { pos: quantifier, category: quantity }
    件: { pos: quantifier, category: quantity }
    项: { pos: quantifier, category: quantity }
    类: { pos: quantifier, category: quantity }
    种: { pos: quantifier, category: quantity }
    组: { pos: quantifier, category: quantity }
    批: { pos: quantifier, category: quantity }
    堆: { pos: quantifier, category: quantity }
    束: { pos: quantifier, category: quantity }
    串: { pos: quantifier, category: quantity }

  # ============================================================
  # 数词类（number）—— 中文数字/大数/序数
  # ============================================================
  number:
    # --- 中文数字 ---
    零: { pos: number, category: digit }
    一: { pos: number, category: digit }
    二: { pos: number, category: digit }
    三: { pos: number, category: digit }
    四: { pos: number, category: digit }
    五: { pos: number, category: digit }
    六: { pos: number, category: digit }
    七: { pos: number, category: digit }
    八: { pos: number, category: digit }
    九: { pos: number, category: digit }
    十: { pos: number, category: digit }

    # --- 阿拉伯数字（v2.5.0 补充，使"3秒"等量词组合可匹配）---
    "0": { pos: number, category: digit }
    "1": { pos: number, category: digit }
    "2": { pos: number, category: digit }
    "3": { pos: number, category: digit }
    "4": { pos: number, category: digit }
    "5": { pos: number, category: digit }
    "6": { pos: number, category: digit }
    "7": { pos: number, category: digit }
    "8": { pos: number, category: digit }
    "9": { pos: number, category: digit }

    # --- 大数 ---
    百: { pos: number, category: big }
    千: { pos: number, category: big }
    万: { pos: number, category: big }
    亿: { pos: number, category: big }

    # --- 序数 ---
    第: { pos: number, category: ordinal }
    首: { pos: number, category: ordinal }
    末: { pos: number, category: ordinal }
    初: { pos: number, category: ordinal }
    终: { pos: number, category: ordinal }

  # ============================================================
  # 标点类（punctuation）—— 冒号/逗号/顿号/句号/分号/引号/括号/感叹号/问号/破折号/省略号
  # 所有标点 key 均用双引号包裹，避免 YAML 特殊字符解析问题
  # ============================================================
  punctuation:
    # --- 冒号 ---
    ":": { pos: punctuation, category: colon }
    "：": { pos: punctuation, category: colon }
    # --- 逗号 ---
    ",": { pos: punctuation, category: comma }
    "，": { pos: punctuation, category: comma }
    # --- 顿号 ---
    "、": { pos: punctuation, category: enumeration }
    # --- 句号 ---
    ".": { pos: punctuation, category: period }
    "。": { pos: punctuation, category: period }
    # --- 分号 ---
    ";": { pos: punctuation, category: semicolon }
    "；": { pos: punctuation, category: semicolon }
    # --- 引号 ---
    "\"": { pos: punctuation, category: quote }
    "“": { pos: punctuation, category: quote }
    "”": { pos: punctuation, category: quote }
    "「": { pos: punctuation, category: quote }
    "」": { pos: punctuation, category: quote }
    "『": { pos: punctuation, category: quote }
    "』": { pos: punctuation, category: quote }
    # --- 括号 ---
    "(": { pos: punctuation, category: bracket }
    ")": { pos: punctuation, category: bracket }
    "（": { pos: punctuation, category: bracket }
    "）": { pos: punctuation, category: bracket }
    # --- 感叹号 ---
    "!": { pos: punctuation, category: exclamation }
    "！": { pos: punctuation, category: exclamation }
    # --- 问号 ---
    "?": { pos: punctuation, category: question }
    "？": { pos: punctuation, category: question }
    # --- 破折号 ---
    "-": { pos: punctuation, category: dash }
    "——": { pos: punctuation, category: dash }
    # --- 省略号 ---
    "…": { pos: punctuation, category: ellipsis }
    "...": { pos: punctuation, category: ellipsis }

# ============================================================
# 组合规则定义（combinationRules）
# ------------------------------------------------------------
# 6 种组合规则：偏正/动宾/量词/约束/并列/标题
# 优先级数值越大越优先匹配（48 > 47 > 46 > 45 > 44 > 43）
# ============================================================
combinationRules:
  # 偏正结构：形容词 + 名词 → 参数键
  - name: param_key_adj_noun
    firstCharPos: adj
    lastCharPos: noun
    length: { min: 2, max: 4 }
    followedBy: "[：:]"
    cssClass: "dsl-param-key"
    priority: 46

  # 偏正结构（名词修饰名词）：焦距/色温/速度 → 参数键
  # 与 param_key_adj_noun 同优先级，定义在其后（稳定排序保证 adj 规则先匹配）
  - name: param_key_noun_noun
    firstCharPos: noun
    lastCharPos: noun
    length: { min: 2, max: 4 }
    followedBy: "[：:]"
    cssClass: "dsl-param-key"
    priority: 46

  # 动宾结构：动词 + 名词 → 动作指令
  - name: camera_action_verb_noun
    firstCharPos: verb
    lastCharPos: noun
    length: { min: 2, max: 4 }
    cssClass: "dsl-camera-action"
    priority: 44

  # 量词结构：数词 + 量词 → 技术参数
  # 限定首字 category=digit（中文/阿拉伯数字），排除 ordinal（"第"字开头归 chapter_title）
  # 避免"第一集"被本规则抢占（priority 47 高于 chapter_title 45）
  - name: tech_param_num_quant
    firstCharPos: number
    firstCharCategory: digit
    lastCharPos: quantifier
    length: { min: 2, max: 4 }
    cssClass: "dsl-tech-param"
    priority: 47

  # 约束结构：约束动词 + 任意 → 约束指令
  - name: constraint_verb_prefix
    firstCharPos: verb
    firstCharCategory: constraint
    length: { min: 2, max: 6 }
    cssClass: "dsl-constraint"
    priority: 48

  # 并列结构：同词性 + 顿号分隔 → 情绪标注
  - name: emotion_parallel
    separator: "、"
    samePosRequired: true
    length: { min: 2, max: 8 }
    cssClass: "dsl-emotion-parallel"
    priority: 43

  # 标题结构：序数标记 + 数词 + 量词 → 章节标题
  # 首字限定 ordinal（"第"字开头），避免与 tech_param（digit）冲突
  - name: chapter_title
    firstCharPos: number
    firstCharCategory: ordinal
    midCharPos: number
    lastCharPos: quantifier
    length: { min: 3, max: 4 }
    cssClass: "dsl-cn-chapter"
    priority: 45
`;

/** 07-word-lexicon.yaml 内置内容 */
const WORD_LEXICON_YAML = `# ============================================================
# 07-word-lexicon.yaml
# 词组语义分词词典·索引文件（v2.7.0 改造为多文件合并加载）
# ------------------------------------------------------------
# 本文件是词组词典系列的索引文件，仅保留分词器配置（segmenterConfig）。
# 所有词组分组已迁移到 07a-07k 子文件，由 rule-compiler.ts 的
# loadMergedWordLexicon 函数按字母升序合并加载。
#
# 文件加载顺序（按字母升序）：
#   07-word-lexicon.yaml（本文件，索引 + segmenterConfig）
#   → 07a-constraint-tech-phrase.yaml（约束与技术参数，5 分组）
#   → 07b-narrative-scene-phrase.yaml（叙事场景，8 分组）
#   → 07c-camera-action-phrase.yaml（镜头运动，1 分组）
#   → 07d-english-core-phrase.yaml（英文核心术语，10 分组）
#   → 07e-english-extended-phrase.yaml（英文扩展术语，9 分组）
#   → 07f-english-subject-phrase.yaml（英文主题术语，7 分组）
#   → 07g-director-cinematography.yaml（导演·摄影与镜头语言，7 分组）
#   → 07h-director-lighting-color.yaml（导演·光影与色彩，6 分组）
#   → 07i-director-editing-sound.yaml（导演·剪辑与声音，5 分组）
#   → 07j-director-performance-screenplay.yaml（导演·表演与剧作，6 分组）
#   → 07k-director-genre-production.yaml（导演·类型/制片/电影史，5 分组）
#
# 子文件分组映射表：
#   07a: constraint_phrase, tech_param_phrase, param_key_phrase,
#        commercial_design_phrase, photography_phrase
#   07b: chapter_title_phrase, scene_description_phrase, character_action_phrase,
#        atmosphere_phrase, time_season_phrase, costume_makeup_phrase,
#        style_genre_phrase, emotion_phrase
#   07c: camera_action_phrase
#   07d: english_quality_phrase, english_shot_phrase, english_light_phrase,
#        english_style_phrase, english_render_phrase, english_material_phrase,
#        english_artist_phrase, english_negative_phrase, english_mj_param_phrase,
#        english_prompt_eng_phrase
#   07e: english_photo_gear_phrase, english_color_grading_phrase,
#        english_lens_effect_phrase, english_mood_phrase,
#        english_composition_extended_phrase, english_style_extended_phrase,
#        english_render_extended_phrase, english_material_extended_phrase,
#        english_vfx_extended_phrase
#   07f: english_pose_expression_phrase, english_costume_fashion_phrase,
#        english_architecture_scene_phrase, english_scifi_cyberpunk_phrase,
#        english_fantasy_myth_phrase, english_creature_race_phrase,
#        english_weapon_gear_phrase
#   07g: cinematography_basic, shot_size_extended, camera_angle_extended,
#        camera_movement_extended, focal_length_phrase, composition_phrase,
#        depth_of_field_phrase
#   07h: lighting_basic, light_quality, light_ratio, color_theory,
#        color_psychology, color_grading_style
#   07i: editing_basic, montage_theory, editing_rhythm, sound_design,
#        music_score
#   07j: performance_theory, emotion_expression, body_language,
#        screenplay_structure, story_element, dialogue_craft
#   07k: genre_film, film_movement, production_management,
#        post_production, film_theory
# ============================================================

segmenterConfig:
  # 最大词长（字符数），超过此长度的词不会被匹配
  # 建议值 4-8，过大增加扫描成本，过小漏匹配长词
  maxWordLength: 6
  # 最小词长（字符数），小于此长度的连续段不进入分词
  # 设为 2 表示单字直接交由 06 字级规则处理
  minWordLength: 2
`;

/** 07a-constraint-tech-phrase.yaml 内置内容 */
const CONSTRAINT_TECH_PHRASE_YAML = `# ============================================================
# 07a-constraint-tech-phrase.yaml
# 词组词典·约束与技术参数（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（5 个）：
#   constraint_phrase         (priority 48, dsl-constraint)        约束指令词组
#   tech_param_phrase         (priority 47, dsl-tech-param)        技术参数词组
#   param_key_phrase          (priority 46, dsl-param-key)         参数键词组（含 followedBy）
#   commercial_design_phrase  (priority 39, dsl-tech-param)        商业设计词组
#   photography_phrase        (priority 39, dsl-tech-param)        摄影词组
# ============================================================

wordLexicon:

  constraint_phrase:
    cssClass: "dsl-constraint"
    priority: 48
    words:
      # --- 否定约束 ---
      - "切勿"
      - "切忌"
      - "勿要"
      - "勿将"
      - "勿让"
      - "勿使"
      - "勿用"
      - "不得有"
      - "不应有"
      - "不可有"
      - "不能有"
      - "不允许有"
      - "严禁有"
      - "避免出现"
      - "避免使用"
      - "避免产生"
      - "避免造成"
      - "排除干扰"
      - "排除杂讯"
      - "杜绝出现"
      - "杜绝使用"
      # --- 否定约束（v2.6.1 扩展）---
      - "切忌出现"
      - "切忌使用"
      - "切勿让"
      - "勿使出现"
      - "不得出现"
      - "不应出现"
      - "不可出现"
      - "严禁出现"
      - "杜绝产生"
      - "避免重复"
      - "避免歧义"
      - "避免冲突"
      - "避免遗漏"
      - "避免错位"
      - "避免越界"
      - "排除误差"
      - "排除噪声"
      - "排除偏差"
      # --- 肯定约束 ---
      - "必须保持"
      - "必须确保"
      - "必须包含"
      - "务必保持"
      - "务必确保"
      - "务必包含"
      - "保证不"
      - "确保不"
      - "锁定为"
      - "严格按"
      - "严格遵循"
      - "严格保持"
      - "仅保留"
      - "仅使用"
      - "仅采用"
      # --- 肯定约束（v2.6.1 扩展）---
      - "必须一致"
      - "必须匹配"
      - "必须对齐"
      - "务必精确"
      - "务必对齐"
      - "确保一致"
      - "确保匹配"
      - "确保对齐"
      - "严格匹配"
      - "严格遵守"
      - "严格控制"
      - "仅限使用"
      - "仅限于"
      - "不得修改"
      - "不可更改"
      - "不可省略"
      - "不得省略"
      - "不得超出"
      - "不可超出"
      # --- 高频动词约束（v2.6.2 语料训练补充）---
      - "保留"
      - "保持"
      - "保持产品"
      - "保持真实"
      - "保持真实形状"
      - "保持产品结构"
      - "保留干净"
      - "保留价格"
      - "避免"
      - "避免出现"
      - "避免使用"
      - "避免重复"
      - "避免歧义"
      - "不要添加"
      - "不要让"
      - "不要改变"
      - "不要过度"
      - "不要生成"
      - "不要使用"

  # ============================================================
  # 2. 技术参数词组（补充 03 sd_image_term/photography_term）
  # ============================================================

  tech_param_phrase:
    cssClass: "dsl-tech-param"
    priority: 47
    words:
      # --- 分辨率/帧率组合 ---
      - "高帧率"
      - "低帧率"
      - "标准帧率"
      - "电影帧率"
      - "广播帧率"
      - "高分辨率"
      - "低分辨率"
      - "标准分辨率"
      - "原生分辨率"
      - "目标分辨率"
      - "输出分辨率"
      # --- 色彩参数组合 ---
      - "高色域"
      - "广色域"
      - "窄色域"
      - "标准色域"
      - "高动态范围"
      - "标准动态范围"
      - "色彩深度"
      - "色彩采样"
      - "色度抽样"
      # --- 编码参数组合 ---
      - "高码率"
      - "低码率"
      - "恒定码率"
      - "可变码率"
      - "无损压缩"
      - "有损压缩"
      - "高压缩比"
      - "低压缩比"
      # --- 技术参数（v2.6.1 扩展）---
      - "原生帧率"
      - "目标帧率"
      - "输出帧率"
      - "高比特率"
      - "低比特率"
      - "原生比特率"
      - "色彩精度"
      - "色域覆盖"
      - "动态范围"
      - "帧精度"
      - "场精度"
      - "逐行扫描"
      - "隔行扫描"
      - "高色深"
      - "低色深"
      - "八位色深"
      - "十位色深"
      - "十六位色深"

  # ============================================================
  # 3. 参数键词组（补充 01 param_key 正则遗漏的固定搭配）
  # 仅在后接冒号时触发（followedBy 约束）
  # ============================================================

  param_key_phrase:
    cssClass: "dsl-param-key"
    priority: 46
    followedBy: "[：:]"
    words:
      # --- 视觉参数 ---
      - "色温"
      - "色调"
      - "色相"
      - "饱和度"
      - "明度"
      - "对比度"
      - "亮度"
      - "曝光"
      - "光圈"
      - "快门"
      - "焦距"
      - "焦段"
      - "景深"
      - "白平衡"
      - "感光度"
      # --- 镜头参数 ---
      - "镜头"
      - "焦段范围"
      - "光圈值"
      - "快门速度"
      - "拍摄距离"
      - "对焦距离"
      - "最近对焦"
      - "镜头视角"
      - "视角范围"
      # --- 构图参数 ---
      - "构图"
      - "机位"
      - "景别"
      - "拍摄角度"
      - "俯仰角"
      - "航向角"
      - "视场角"
      # --- 音频参数 ---
      - "音量"
      - "采样率"
      - "位深度"
      - "声道数"
      # --- 后期参数 ---
      - "降噪"
      - "锐化"
      - "模糊"
      - "色彩空间"
      - "伽马值"
      - "色调映射"
      # --- 参数键（v2.6.1 扩展）---
      - "帧率"
      - "码率"
      - "比特率"
      - "采样格式"
      - "色彩矩阵"
      - "传输特性"
      - "原色色域"
      - "参考白"
      - "参考黑"
      - "显示亮度"
      - "环境光"
      - "反射率"
      - "宽高比"
      - "画幅比"
      - "渲染精度"
      - "迭代步数"
      - "随机种子"
      - "权重强度"

  # ============================================================
  # 4. 章节标题词组（补充 06 chapter_title 组合规则）
  # ============================================================

  commercial_design_phrase:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- 电商核心对象 ---
      - "产品"
      - "产品名称"
      - "产品摄影"
      - "产品摄影图"
      - "产品图"
      - "产品广告"
      - "产品广告海报"
      - "产品占画面"
      - "产品细节"
      - "产品标签"
      - "产品主图"
      - "产品真实"
      - "主图"
      - "卖点主图"
      - "电商主图"
      - "详情页"
      - "详情页首屏"
      - "首屏"
      - "首屏产品"
      - "套装组合"
      # --- 商业内容类型 ---
      - "海报"
      - "封面"
      - "主视觉"
      - "视觉"
      - "广告"
      - "广告海报"
      - "促销"
      - "促销海报"
      - "节日促销"
      - "活动"
      - "文案"
      - "标题"
      - "标题文字"
      - "标题区域"
      - "副标题"
      - "短标题"
      - "卖点"
      - "二维码"
      - "按钮"
      - "按钮区域"
      - "图标"
      - "卡片"
      - "贴纸"
      - "装饰"
      - "分割线"
      - "排版"
      - "构图"
      # --- 小红书/社媒 ---
      - "小红书"
      - "种草"
      - "探店"
      - "合集"
      - "教程"
      - "知识"
      - "家居"
      - "改造"
      - "穿搭"
      - "美食"
      - "美食摄影"
      - "美食封面"
      - "探店封面"
      - "家居改造"
      - "工具推荐"
      # --- 视觉质量描述 ---
      - "质感"
      - "质感真实"
      - "层次"
      - "留白"
      - "留白充足"
      - "画面"
      - "画面包含"
      - "画面右侧"
      - "画面中心"
      - "画面下方"
      - "画面明亮"
      - "画面清晰"
      - "视觉重心"
      - "占比"
      - "比例"
      # --- 负面约束对象 ---
      - "水印"
      - "乱码"
      - "乱码文字"
      - "虚假"
      - "夸张"
      - "承诺"
      - "商标"
      - "随机文字"
      - "虚假地址"
      - "假认证"

  # ============================================================
  # 13. 风格流派词组（v2.6.2 语料训练新增）
  # 收录艺术风格/创作流派/场景类型词
  # 复用 dsl-narrative-term 配色，priority 39
  # ============================================================

  photography_phrase:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- 镜头类型 ---
      - "广角"
      - "广角镜头"
      - "广角构图"
      - "长焦"
      - "长焦镜头"
      - "微距"
      - "微距镜头"
      - "标准镜头"
      - "定焦"
      - "变焦"
      - "鱼眼"
      - "移轴"
      # --- 器材配件 ---
      - "三脚架"
      - "三脚架稳定"
      - "稳定器"
      - "柔光箱"
      - "反光板"
      - "闪光灯"
      - "遮光罩"
      - "滤镜"
      - "偏振镜"
      # --- 拍摄参数 ---
      - "物理相机"
      - "视点"
      - "视场角"
      - "色温"
      - "白平衡"
      - "感光度"
      - "曝光"
      - "景深"
      - "浅景深"
      - "深景深"
      - "长曝光"
      - "多重曝光"
      - "包围曝光"
      - "低角度"
      - "高角度"
      - "俯拍"
      - "仰拍"
      - "平视"
      - "鸟瞰"
      # --- 渲染器/软件 ---
      - "渲染器"
      - "渲染图"
      - "渲染"
      - "材质"
      - "PBR"
      - "次表面散射"
      - "全局光照"
      - "光线追踪"

  # ============================================================
  # 15. 英文质量修饰词组（v2.6.3 国外语料训练新增）
  # 收录 masterpiece/8k/ray tracing 等高频质量词
  # 复用 dsl-tech-param 配色，priority 47
  # ============================================================

`;

/** 07b-narrative-scene-phrase.yaml 内置内容 */
const NARRATIVE_SCENE_PHRASE_YAML = `# ============================================================
# 07b-narrative-scene-phrase.yaml
# 词组词典·叙事场景（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（8 个）：
#   chapter_title_phrase       (priority 45, dsl-cn-chapter)           章节标题词组
#   scene_description_phrase   (priority 42, dsl-narrative-term)       场景描述词组
#   character_action_phrase    (priority 42, dsl-lexicon-performance)  人物动作词组
#   atmosphere_phrase          (priority 41, dsl-light-word)           氛围词组
#   time_season_phrase         (priority 41, dsl-narrative-term)       时间季节词组
#   costume_makeup_phrase      (priority 40, dsl-fashion-term)         服饰妆容词组
#   style_genre_phrase         (priority 39, dsl-narrative-term)       风格流派词组
#   emotion_phrase             (priority 43, dsl-emotion-word)         情绪词组
# ============================================================

wordLexicon:

  chapter_title_phrase:
    cssClass: "dsl-cn-chapter"
    priority: 45
    words:
      # --- 影视分集 ---
      - "第一集"
      - "第二集"
      - "第三集"
      - "第四集"
      - "第五集"
      - "第六集"
      - "第七集"
      - "第八集"
      - "第九集"
      - "第十集"
      # --- 章节标题 ---
      - "第一章"
      - "第二章"
      - "第三章"
      - "第四章"
      - "第五章"
      - "第六章"
      - "第七章"
      - "第八章"
      - "第九章"
      - "第十章"
      # --- 节/段落 ---
      - "第一节"
      - "第二节"
      - "第三节"
      - "第四节"
      - "第五节"
      # --- 场次/镜头序 ---
      - "第一场"
      - "第二场"
      - "第三场"
      - "第四场"
      - "第五场"
      - "第六场"
      - "第七场"
      - "第八场"
      - "第九场"
      - "第十场"
      # --- 序号扩展（v2.6.1 第十一至第二十）---
      - "第十一集"
      - "第十二集"
      - "第十三集"
      - "第十四集"
      - "第十五集"
      - "第十六集"
      - "第十七集"
      - "第十八集"
      - "第十九集"
      - "第二十集"
      - "第十一章"
      - "第十二章"
      - "第十三章"
      - "第十四章"
      - "第十五章"
      - "第十六章"
      - "第十七章"
      - "第十八章"
      - "第十九章"
      - "第二十章"
      - "第十一场"
      - "第十二场"
      - "第十三场"
      - "第十四场"
      - "第十五场"
      # --- 结构性标题（v2.6.1 新增）---
      - "序章"
      - "尾声"
      - "楔子"
      - "番外"
      - "终章"
      - "首章"
      - "末章"
      - "引子"
      - "后记"
      - "跋文"

  # ============================================================
  # 5. 镜头运动词组（补充 03 camera_move 词表外组合）
  # 覆盖"修饰词 + 镜头动作"的常见搭配
  # ============================================================

  emotion_phrase:
    cssClass: "dsl-emotion-word"
    priority: 43
    words:
      # --- 复合情绪 ---
      - "悲喜交加"
      - "又惊又喜"
      - "又爱又恨"
      - "半信半疑"
      - "将信将疑"
      - "若有所思"
      - "若有所失"
      - "心神不宁"
      - "心烦意乱"
      - "心乱如麻"
      - "心急如焚"
      - "心花怒放"
      - "心旷神怡"
      - "心驰神往"
      - "心猿意马"
      # --- 表情状态 ---
      - "眉头紧锁"
      - "眉开眼笑"
      - "眉飞色舞"
      - "愁眉苦脸"
      - "愁眉不展"
      - "喜笑颜开"
      - "嬉皮笑脸"
      - "冷若冰霜"
      - "面如死灰"
      - "面红耳赤"
      - "面带微笑"
      - "面无表情"
      # --- 眼神状态 ---
      - "目光炯炯"
      - "目光闪烁"
      - "目光呆滞"
      - "目光如炬"
      - "目光如豆"
      - "眼含秋水"
      - "眼含热泪"
      - "眼含笑意"
      - "怒目而视"
      - "怒目圆睁"
      - "横眉冷目"
      - "挤眉弄眼"
      # --- 复合情绪（v2.6.1 扩展）---
      - "百感交集"
      - "百无聊赖"
      - "怅然若失"
      - "悲痛欲绝"
      - "悲痛万分"
      - "欣喜若狂"
      - "欣喜万分"
      - "惊恐万分"
      - "惊恐失色"
      - "惶恐不安"
      - "惊慌失措"
      - "惊魂未定"
      - "心惊肉跳"
      - "心惊胆战"
      - "胆战心惊"
      - "提心吊胆"
      - "忧心忡忡"
      - "愁肠百结"
      - "愁肠寸断"
      - "肝肠寸断"
      - "痛不欲生"
      - "痛心疾首"
      - "撕心裂肺"
      - "喜出望外"
      - "喜不自胜"
      - "喜上眉梢"
      - "喜形于色"
      - "笑容可掬"
      - "笑逐颜开"
      - "破涕为笑"
      # --- 表演核心词（v2.6.2 语料训练补充）---
      - "表情"
      - "情绪"
      - "神态"
      - "眼神"
      - "目光"
      - "笑容"
      - "神色"

  # ============================================================
  # 7. 场景描写词组（v2.6.1 新增）
  # 补充 03 narrative_term 未覆盖的四字场景成语
  # ============================================================

  scene_description_phrase:
    cssClass: "dsl-narrative-term"
    priority: 42
    words:
      # --- 都市/市井场景 ---
      - "华灯初上"
      - "车水马龙"
      - "人山人海"
      - "灯火通明"
      - "霓虹闪烁"
      - "高楼林立"
      - "熙熙攘攘"
      - "摩肩接踵"
      - "川流不息"
      - "万家灯火"
      # --- 自然/田园场景 ---
      - "山清水秀"
      - "湖光山色"
      - "鸟语花香"
      - "万紫千红"
      - "繁花似锦"
      - "绿树成荫"
      - "郁郁葱葱"
      - "层林尽染"
      - "漫山遍野"
      - "一望无际"
      # --- 荒凉/寂寥场景 ---
      - "万籁俱寂"
      - "鸦雀无声"
      - "荒无人烟"
      - "寸草不生"
      - "满目疮痍"
      - "断壁残垣"
      - "残垣断壁"
      - "人迹罕至"
      - "穷山恶水"
      - "不毛之地"
      # --- 动态/氛围场景 ---
      - "风和日丽"
      - "月黑风高"
      - "电闪雷鸣"
      - "狂风暴雨"
      - "倾盆大雨"
      - "细雨绵绵"
      - "微风拂面"
      - "风起云涌"
      - "云雾缭绕"
      - "烟波浩渺"
      # --- 场景核心词（v2.6.2 语料训练补充）---
      - "背景"
      - "背景简洁"
      - "背景干净"
      - "背景为深"
      - "背景为纯"
      - "场景"
      - "场景描述"
      - "场景概念"
      - "场景渲染"
      - "场景化"
      - "空间"
      - "空间层次"
      - "空间类型"
      - "空间感"
      - "环境"
      - "棚拍"
      - "棚拍环境"
      - "棚拍光"
      - "实景"
      - "户外场景"
      - "室内"
      - "室内空间"
      - "霓虹"
      - "霓虹灯"
      - "城市"
      - "城市夜景"
      - "街道"
      - "台面"
      - "清晨"
      - "末日废土"

  # ============================================================
  # 8. 人物动作词组（v2.6.1 新增）
  # 补充 03 performance 未覆盖的动作搭配
  # ============================================================

  character_action_phrase:
    cssClass: "dsl-lexicon-performance"
    priority: 42
    words:
      # --- 头部/面部动作 ---
      - "低头沉思"
      - "抬头仰望"
      - "点头示意"
      - "摇头否认"
      - "蹙眉深思"
      - "挑眉轻笑"
      - "闭目养神"
      - "睁大双眼"
      - "眯眼细看"
      - "侧耳倾听"
      # --- 手部/肢体动作 ---
      - "伸手触摸"
      - "挥手告别"
      - "握手言和"
      - "拍手称快"
      - "抚掌大笑"
      - "双手合十"
      - "拱手作揖"
      - "叉腰而立"
      - "抱臂旁观"
      - "搓手顿足"
      # --- 行走/位移动作 ---
      - "转身离去"
      - "迈步向前"
      - "后退一步"
      - "大步流星"
      - "步履蹒跚"
      - "踉踉跄跄"
      - "跌跌撞撞"
      - "昂首阔步"
      - "蹑手蹑脚"
      - "东倒西歪"
      # --- 姿态/体态动作 ---
      - "正襟危坐"
      - "翘腿而坐"
      - "倚墙而立"
      - "盘腿而坐"
      - "席地而坐"
      - "挺直腰背"
      - "弯腰鞠躬"
      - "伏案疾书"
      - "掩面而泣"
      - "捶胸顿足"
      # --- 通用动作词（v2.6.2 语料训练补充）---
      - "姿势"
      - "手持"
      - "身着"
      - "穿戴"
      - "站立"
      - "坐姿"
      - "动作"
      - "肢体"
      - "身形"

  # ============================================================
  # 9. 环境氛围词组（v2.6.1 新增）
  # 补充 03 light_effect 未覆盖的氛围描写词组
  # ============================================================

  atmosphere_phrase:
    cssClass: "dsl-light-word"
    priority: 41
    words:
      # --- 光影氛围 ---
      - "阳光明媚"
      - "烈日当空"
      - "星光璀璨"
      - "月色朦胧"
      - "月华如水"
      - "日光倾洒"
      - "光影斑驳"
      - "树影婆娑"
      - "波光粼粼"
      - "金光闪闪"
      # --- 雾气/水汽氛围 ---
      - "雾气弥漫"
      - "烟雾缭绕"
      - "薄雾笼罩"
      - "烟雨朦胧"
      - "阴雨绵绵"
      - "细雨如丝"
      - "雨幕低垂"
      - "水汽氤氲"
      - "云雾翻涌"
      - "晨雾初散"
      # --- 明暗/色调氛围 ---
      - "漆黑一片"
      - "昏暗幽深"
      - "明亮通透"
      - "幽光闪烁"
      - "暖光融融"
      - "冷光森森"
      - "烛光摇曳"
      - "火光冲天"
      - "霞光万丈"
      - "暮色四合"
      # --- 视觉质量/氛围词（v2.6.2 语料训练补充）---
      - "清晰"
      - "清晰可见"
      - "真实"
      - "真实清晰"
      - "光线"
      - "光线自然"
      - "光线柔和"
      - "简洁"
      - "氛围"
      - "氛围神秘"
      - "现代"
      - "现代科技"
      - "干净"
      - "高级"
      - "高级棚拍"
      - "温暖"
      - "自然光"
      - "主光"
      - "边缘光"
      - "侧光"
      - "顶光"
      - "逆光"
      - "顺光"
      - "漫射光"
      - "环境光"
      - "氛围光"
      - "光影"
      - "阳光"
      - "克制"
      - "明亮"
      - "专业"
      - "暖色"
      - "冷色"
      - "科技"
      - "诱人"
      - "治愈"
      - "宁静"
      - "怀旧"

  # ============================================================
  # 10. 时间节令词组（v2.6.1 新增）
  # 补充 03 narrative_term 未覆盖的时间节令搭配
  # ============================================================

  time_season_phrase:
    cssClass: "dsl-narrative-term"
    priority: 41
    words:
      # --- 时段 ---
      - "清晨时分"
      - "黎明时分"
      - "拂晓时分"
      - "正午时分"
      - "午后时分"
      - "黄昏时分"
      - "日落时分"
      - "傍晚时分"
      - "午夜时分"
      - "深夜时分"
      # --- 时节 ---
      - "初春时节"
      - "仲春时节"
      - "暮春时节"
      - "盛夏时节"
      - "初夏时节"
      - "仲夏时节"
      - "深秋时节"
      - "初秋时节"
      - "隆冬时节"
      - "严冬时节"
      # --- 节令变化 ---
      - "四季更替"
      - "昼夜交替"
      - "春去秋来"
      - "寒来暑往"
      - "斗转星移"
      - "日复一日"
      - "年复一年"
      - "时光荏苒"
      - "岁月如梭"
      - "白驹过隙"

  # ============================================================
  # 11. 服饰妆容词组（v2.6.1 新增）
  # 补充 03 fashion_term 未覆盖的服饰妆容搭配
  # ============================================================

  costume_makeup_phrase:
    cssClass: "dsl-fashion-term"
    priority: 40
    words:
      # --- 服饰风格 ---
      - "衣袂飘飘"
      - "衣冠楚楚"
      - "珠光宝气"
      - "雍容华贵"
      - "清新脱俗"
      - "端庄秀丽"
      - "风流倜傥"
      - "玉树临风"
      - "亭亭玉立"
      - "楚楚动人"
      # --- 妆容状态 ---
      - "素颜淡妆"
      - "浓妆艳抹"
      - "粉黛未施"
      - "蛾眉淡扫"
      - "唇红齿白"
      - "面若桃花"
      - "肤若凝脂"
      - "冰肌玉骨"
      - "明眸皓齿"
      - "粉面桃腮"
      # --- 仪态/妆扮 ---
      - "披头散发"
      - "蓬头垢面"
      - "衣衫褴褛"
      - "锦衣华服"
      - "布衣蔬食"
      - "戎装在身"
      - "披坚执锐"
      - "凤冠霞帔"
      - "西装革履"
      - "长袍马褂"
      # --- 材质/品牌（v2.6.2 语料训练补充）---
      - "材质"
      - "品牌"
      - "标签"
      - "包装"
      - "商标"
      - "纹理"
      - "穿搭"
      - "玻璃"
      - "金属"
      - "服装"
      - "配饰"
      - "包装盒"
      - "品牌色"
      - "材质真实"
      - "材质微距"
      - "服装细节"
      - "玻璃幕墙"
      - "金属配件"
      - "皮质感"
      - "布料褶皱"

  # ============================================================
  # 12. 商业设计词组（v2.6.2 语料训练新增）
  # 收录电商/小红书/海报/封面等商业设计场景的高频核心词
  # 复用 dsl-tech-param 配色，priority 39
  # ============================================================

  style_genre_phrase:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 艺术风格 ---
      - "写实"
      - "写实人物"
      - "写实风格"
      - "商业"
      - "商业插画"
      - "艺术"
      - "概念"
      - "概念设定"
      - "概念设定图"
      - "设定"
      - "极简"
      - "扁平"
      - "卡通"
      - "卡通角色"
      - "二次元"
      - "动漫"
      - "国风"
      - "水墨"
      - "水墨国风"
      - "赛璐璐"
      - "粉彩"
      - "治愈系"
      - "绘本"
      # --- 流派/主题 ---
      - "蒸汽朋克"
      - "蒸汽朋克场景"
      - "赛博朋克"
      - "赛博朋克场景"
      - "科幻"
      - "科幻场景"
      - "科幻机甲"
      - "奇幻"
      - "奇幻世界"
      - "末日废土"
      - "维多利亚"
      - "未来主义"
      - "解构主义"
      - "工业设计"
      # --- 摄影类型 ---
      - "街头"
      - "街头人像"
      - "街头小吃"
      - "人像"
      - "肖像"
      - "棚拍"
      - "外拍"
      - "纪实"
      - "极简建筑"
      - "概念建筑"
      # --- 光线技法 ---
      - "伦勃朗光"
      - "丁达尔效应"
      - "三点布光"
      - "戏剧性光"

  # ============================================================
  # 14. 摄影器材与技术词组（v2.6.2 语料训练新增）
  # 收录镜头/器材/技术参数搭配词
  # 复用 dsl-tech-param 配色，priority 39
  # ============================================================

`;

/** 07c-camera-action-phrase.yaml 内置内容 */
const CAMERA_ACTION_PHRASE_YAML = `# ============================================================
# 07c-camera-action-phrase.yaml
# 词组词典·镜头运动（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（1 个）：
#   camera_action_phrase  (priority 44, dsl-camera-action)  镜头运动词组
# ============================================================

wordLexicon:

  camera_action_phrase:
    cssClass: "dsl-camera-action"
    priority: 44
    words:
      # --- 速度修饰 ---
      - "缓推"
      - "急推"
      - "猛推"
      - "缓拉"
      - "急拉"
      - "猛拉"
      - "缓摇"
      - "急摇"
      - "快甩"
      - "慢甩"
      # --- 幅度修饰 ---
      - "微推"
      - "微拉"
      - "微摇"
      - "微移"
      - "小幅推"
      - "小幅拉"
      - "大幅推"
      - "大幅拉"
      # --- 方向修饰 ---
      - "左摇"
      - "右摇"
      - "上摇"
      - "下摇"
      - "左移"
      - "右移"
      - "前推"
      - "后拉"
      - "横移"
      - "纵移"
      # --- 复合运动 ---
      - "环绕跟拍"
      - "弧形推移"
      - "螺旋上升"
      - "螺旋下降"
      - "对角推移"
      - "之字形移动"
      - "波浪式推进"
      # --- 运镜状态 ---
      - "手持跟拍"
      - "稳定器跟拍"
      - "肩扛跟拍"
      - "胸托跟拍"
      - "低角度跟拍"
      - "高角度跟拍"
      # --- 复合运动（v2.6.1 扩展）---
      - "缓推急拉"
      - "急推缓拉"
      - "快速横移"
      - "缓慢横移"
      - "快速纵移"
      - "缓慢纵移"
      - "大幅摇摄"
      - "小幅摇摄"
      - "连续跟拍"
      - "断续跟拍"
      - "匀速推进"
      - "匀速后拉"
      - "变速推拉"
      - "急停定格"
      - "缓停定格"
      - "快速变焦"
      - "缓慢变焦"
      - "焦点转换"
      - "焦点拉移"
      - "焦点甩动"
      # --- 镜头动词搭配（v2.6.1 实测补充）---
      - "靠近主体"
      - "拉开视野"
      - "跟随动作"
      - "聚焦眼神"
      - "完成转场"
      - "锁定主体"
      - "追踪主体"
      - "环绕主体"
      - "推进画面"
      - "拉远全景"

  # ============================================================
  # 6. 情绪/表演词组（补充 03 emotion_word/performance）
  # ============================================================

`;

/** 07d-english-core-phrase.yaml 内置内容 */
const ENGLISH_CORE_PHRASE_YAML = `# ============================================================
# 07d-english-core-phrase.yaml
# 词组词典·英文核心术语（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（10 个）：
#   english_quality_phrase    (priority 47, dsl-tech-param)     质量修饰词
#   english_shot_phrase       (priority 44, dsl-camera-action)  镜头景别
#   english_light_phrase      (priority 41, dsl-light-word)     光影术语
#   english_style_phrase      (priority 39, dsl-narrative-term) 艺术风格
#   english_render_phrase     (priority 39, dsl-tech-param)     渲染技术
#   english_material_phrase   (priority 39, dsl-tech-param)     材质术语
#   english_artist_phrase     (priority 39, dsl-narrative-term) 艺术家
#   english_negative_phrase   (priority 48, dsl-constraint)     负面术语
#   english_mj_param_phrase   (priority 46, dsl-param-key)      MJ 参数
#   english_prompt_eng_phrase (priority 45, dsl-cn-chapter)     提示工程
# ============================================================

wordLexicon:

  english_quality_phrase:
    cssClass: "dsl-tech-param"
    priority: 47
    words:
      # --- 画质核心词 ---
      - "masterpiece"
      - "best quality"
      - "ultra detailed"
      - "highly detailed"
      - "intricate details"
      - "hyperdetailed"
      - "hyper-realistic"
      - "ultra-realistic"
      - "photorealistic"
      - "sharp focus"
      - "professional lighting"
      - "professional color grading"
      # --- 分辨率修饰 ---
      - "8k"
      - "4k"
      - "16k"
      - "absurdres"
      - "highres"
      - "8k resolution"
      - "absurd resolution"
      # --- 渲染技术 ---
      - "ray tracing"
      - "global illumination"
      - "subsurface scattering"
      - "pbr"
      - "pbr materials"
      - "physically based rendering"
      - "ambient occlusion"
      - "tone mapping"
      - "hdr"
      - "hdri"
      - "high dynamic range"
      # --- 贴图与材质通道 ---
      - "normal map"
      - "displacement map"
      - "bump map"
      - "roughness map"
      - "metallic map"
      - "albedo"
      - "diffuse"
      - "specular"
      - "reflection"
      - "refraction"
      - "fresnel"
      - "caustics"
      # --- 镜头特效 ---
      - "depth of field"
      - "shallow depth of field"
      - "deep depth of field"
      - "bokeh"
      - "motion blur"
      - "lens flare"
      - "chromatic aberration"
      - "film grain"
      # --- 平台标签 ---
      - "trending on artstation"
      - "concept art"
      - "artstation winner"
      - "artstation hall of fame"
      - "artstation featured"
      - "artstation top"
      - "artstation trending"
      - "artstation popular"
      - "artstation pick of the day"
      - "behance featured"
      - "behance curated"
      - "awwwards winner"
      - "awwwards site of the day"
      # --- 高质量画质词（v2.6.4 国外语料扩展）---
      - "highest quality"
      - "ultra quality"
      - "premium quality"
      - "professional quality"
      - "studio quality"
      - "commercial quality"
      - "broadcast quality"
      - "cinema quality"
      - "theatrical quality"
      - "imax quality"
      - "ultra hd"
      - "uhd"
      - "super hd"
      - "full hd"
      - "4k uhd"
      - "8k uhd"
      - "4k hdr"
      - "8k hdr"
      - "hdr10"
      - "hdr10+"
      - "dolby vision"
      - "wide color gamut"
      - "deep color"
      - "10-bit color"
      - "12-bit color"
      - "16-bit color"
      - "high dynamic range"
      - "extended dynamic range"
      - "standard dynamic range"
      # --- 渲染材质通道（v2.6.4 国外语料扩展）---
      - "transmission"
      - "absorption"
      - "scattering"
      - "occlusion"
      - "ambient occlusion"
      - "bloom"
      - "glow"
      - "glare"
      - "halation"
      - "iridescence"
      - "noise"
      - "dithering"
      - "posterization"
      - "banding"
      - "aliasing"
      - "moire"
      - "jaggies"
      - "edge enhancement"
      - "sharpening"
      - "blurring"
      - "gaussian blur"
      - "anti-aliasing"
      - "displacement"

  # ============================================================
  # 16. 英文镜头景别词组（v2.6.3 国外语料训练新增）
  # 收录 shot 类型、运镜、视角术语
  # 复用 dsl-camera-action 配色，priority 44
  # ============================================================

  english_shot_phrase:
    cssClass: "dsl-camera-action"
    priority: 44
    words:
      # --- 景别 ---
      - "extreme wide shot"
      - "wide shot"
      - "long shot"
      - "full shot"
      - "medium shot"
      - "medium close-up"
      - "close-up"
      - "extreme close-up"
      - "establishing shot"
      - "cowboy shot"
      - "american shot"
      - "italian shot"
      - "over the shoulder"
      # --- 视角 ---
      - "point of view"
      - "pov"
      - "first person view"
      - "aerial view"
      - "bird's eye view"
      - "worm's eye view"
      - "high angle"
      - "low angle"
      - "dutch angle"
      - "canted angle"
      - "eye level"
      - "top-down"
      - "bottom-up"
      - "side view"
      - "front view"
      - "back view"
      - "three-quarter view"
      - "profile"
      # --- 运镜 ---
      - "zoom in"
      - "zoom out"
      - "dolly in"
      - "dolly out"
      - "tracking shot"
      - "panning"
      - "tilting"
      - "rolling"
      - "crane shot"
      - "jib shot"
      - "steadicam"
      - "handheld"
      - "drone shot"
      - "helicopter shot"
      - "underwater"
      - "rack focus"
      - "pull focus"
      - "dolly zoom"
      # --- 摄影参数 ---
      - "focal length"
      - "aperture"
      - "f-stop"
      - "shutter speed"
      - "iso"
      - "exposure"
      - "white balance"
      - "color temperature"
      - "kelvin"
      - "hyperfocal distance"
      - "circle of confusion"
      # --- 构图法则（v2.6.4 国外语料扩展）---
      - "rule of thirds"
      - "golden ratio"
      - "golden spiral"
      - "fibonacci spiral"
      - "phi grid"
      - "leading lines"
      - "diagonal lines"
      - "converging lines"
      - "symmetrical composition"
      - "asymmetrical composition"
      - "balanced composition"
      - "centered composition"
      - "off-center composition"
      - "dynamic composition"
      - "static composition"
      # --- 透视法 ---
      - "linear perspective"
      - "one-point perspective"
      - "two-point perspective"
      - "three-point perspective"
      - "four-point perspective"
      - "five-point perspective"
      - "aerial perspective"
      - "atmospheric perspective"
      - "isometric perspective"
      - "dimetric perspective"
      - "trimetric perspective"
      - "oblique projection"
      - "orthographic projection"
      # --- 全景视角 ---
      - "panoramic view"
      - "360 degree view"
      - "spherical view"
      - "fisheye view"
      - "ultrawide view"
      - "macro view"
      - "micro view"
      - "telephoto view"
      - "wide-angle view"
      - "human eye view"
      - "top-down view"
      - "bottom-up view"
      # --- 层次 ---
      - "foreground"
      - "middleground"
      - "background"
      - "depth layering"
      # --- 对焦模式 ---
      - "manual focus"
      - "auto focus"
      - "continuous focus"
      - "face detection"
      - "eye detection"
      - "subject tracking"
      - "zone focus"
      - "infinity focus"

  # ============================================================
  # 17. 英文光影术语词组（v2.6.3 国外语料训练新增）
  # 收录 lighting/cinematic/golden hour 等光影词
  # 复用 dsl-light-word 配色，priority 41
  # ============================================================

  english_light_phrase:
    cssClass: "dsl-light-word"
    priority: 41
    words:
      # --- 光位 ---
      - "rim light"
      - "key light"
      - "fill light"
      - "back light"
      - "backlight"
      - "backlit"
      - "side light"
      - "top light"
      - "overhead lighting"
      - "practical lighting"
      # --- 光质 ---
      - "ambient lighting"
      - "natural lighting"
      - "artificial lighting"
      - "soft lighting"
      - "hard lighting"
      - "diffused lighting"
      - "directional lighting"
      # --- 时段光 ---
      - "golden hour"
      - "blue hour"
      - "magic hour"
      - "sunset glow"
      - "sunrise"
      - "dawn"
      - "dusk"
      - "twilight"
      # --- 电影感光影 ---
      - "cinematic lighting"
      - "cinematic color grading"
      - "dramatic shadows"
      - "high contrast"
      - "low contrast"
      - "rembrandt lighting"
      - "three-point lighting"
      - "beauty dish"
      - "softbox"
      - "catchlight"
      # --- 体积光 ---
      - "volumetric lighting"
      - "volumetric fog"
      - "volumetric atmosphere"
      - "god rays"
      - "tyndall effect"
      - "crepuscular rays"
      - "atmospheric perspective"
      # --- 氛围光 ---
      - "neon noir"
      - "neon-drenched"
      - "amber-teal split"
      - "warm amber"
      - "cool teal"
      - "complementary color contrast"
      - "desolate atmosphere"
      - "tense atmosphere"
      - "noir mood"
      - "film noir style"

  # ============================================================
  # 18. 英文艺术风格词组（v2.6.3 国外语料训练新增）
  # 收录 anime/cyberpunk/steampunk 等风格流派
  # 复用 dsl-narrative-term 配色，priority 39
  # ============================================================

  english_style_phrase:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 动漫风格 ---
      - "anime style"
      - "studio ghibli"
      - "pixar style"
      - "disney style"
      - "cel shading"
      - "manga"
      - "manhwa"
      - "webtoon"
      # --- 绘画媒介 ---
      - "watercolor"
      - "oil painting"
      - "ink painting"
      - "sumi-e"
      - "ukiyo-e"
      - "matte painting"
      - "digital painting"
      - "digital art"
      - "illustration"
      - "concept art"
      - "character design"
      # --- 艺术流派 ---
      - "baroque"
      - "impressionism"
      - "surrealism"
      - "minimalism"
      - "art nouveau"
      - "art deco"
      - "bauhaus"
      - "pop art"
      - "expressionism"
      - "cubism"
      - "futurism"
      - "constructivism"
      - "deconstructivism"
      - "brutalism"
      # --- 复古与像素 ---
      - "retro artstyle"
      - "pixel art"
      - "ascii art"
      - "vaporwave"
      - "synthwave"
      - "lofi"
      # --- 科幻与奇幻 ---
      - "fantasy art"
      - "sci-fi art"
      - "dark fantasy"
      - "gothic"
      - "steampunk"
      - "cyberpunk"
      - "dieselpunk"
      - "biopunk"
      - "post apocalyptic"
      # --- 3D 风格 ---
      - "3d render"
      - "isometric"
      - "low poly"
      - "voxel"
      - "comic book style"
      # --- 动漫工作室与导演（v2.6.4 国外语料扩展）---
      - "dreamworks style"
      - "otomo katsuhiro"
      - "akira toriyama"
      - "hayao miyazaki"
      - "ghibli"
      # --- 艺术流派扩展 ---
      - "romanticism"
      - "realism"
      - "neoclassicism"
      - "rococo"
      - "mannerism"
      - "byzantine"
      - "gothic art"
      - "renaissance"
      - "mannerism"
      - "pre-raphaelite"
      - "post-impressionism"
      - "neo-impressionism"
      - "pointillism"
      - "fauvism"
      - "dadaism"
      - "suprematism"
      - "de stijl"
      - "fluxus"
      - "kinetic art"
      - "op art"
      - "outsider art"
      - "naive art"
      - "folk art"
      - "street art"
      - "graffiti art"
      - "sticker art"
      - "paste-up art"
      - "mural art"
      # --- 媒介扩展 ---
      - "gouache"
      - "acrylic"
      - "tempera"
      - "fresco"
      - "encaustic"
      - "pastel"
      - "charcoal"
      - "pencil sketch"
      - "pen and ink"
      - "etching"
      - "lithograph"
      - "woodcut"
      - "screen print"
      - "linocut"
      - "collage"
      - "mixed media"
      - "assemblage"
      - "installation art"
      - "performance art"
      - "video art"
      - "new media art"
      - "digital illustration"
      - "vector art"
      - "fractal art"
      - "generative art"
      - "algorithmic art"
      - "glitch art"
      - "datamoshing"
      - "circuit bending"
      # --- 时尚摄影风格 ---
      - "fashion editorial"
      - "beauty photography"
      - "editorial portrait"
      - "fashion portrait"
      - "beauty portrait"
      - "glamour shot"
      - "fashion photography"
      # --- 复古与现代 ---
      - "vintage look"
      - "retro look"
      - "analog film"
      - "toy camera effect"
      - "diorama effect"
      - "miniature effect"
      - "lomography"

  # ============================================================
  # 19. 英文渲染引擎词组（v2.6.3 国外语料训练新增）
  # 收录 octane/unreal/blender 等渲染器与软件名
  # 复用 dsl-tech-param 配色，priority 46
  # ============================================================

  english_render_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- 渲染器 ---
      - "octane render"
      - "redshift"
      - "arnold"
      - "vray"
      - "v-ray"
      - "cycles"
      - "eevee"
      - "renderman"
      - "keyshot"
      - "marmoset toolbag"
      # --- 3D 软件 ---
      - "blender"
      - "maya"
      - "3ds max"
      - "cinema 4d"
      - "c4d"
      - "houdini"
      - "zbrush"
      - "substance painter"
      - "substance designer"
      - "mari"
      - "mudbox"
      - "katana"
      - "nuke"
      # --- 游戏引擎 ---
      - "unreal engine"
      - "unreal engine 5"
      - "unity"
      - "godot"
      - "cryengine"
      # --- 图形 API ---
      - "webgl"
      - "opengl"
      - "vulkan"
      - "directx"
      - "metal"
      - "cuda"
      - "optix"
      - "rtx"
      - "dxr"
      # --- 渲染技术 ---
      - "raytracing"
      - "pathtracing"
      - "real-time rendering"
      - "denoising"
      - "dlss"
      - "fsr"
      - "xess"
      # --- 渲染器与后期软件（v2.6.4 国外语料扩展）---
      - "redshift render"
      - "arnold render"
      - "v-ray render"
      - "corona render"
      - "cycles render"
      - "eevee render"
      - "luxcore render"
      - "mitsuba render"
      - "unreal engine 5"
      - "unity 2022"
      - "godot engine"
      - "source engine"
      - "blender cycles"
      - "blender eevee"
      - "marvelous designer"
      - "modo"
      - "lightwave"
      - "softimage"
      - "after effects"
      - "premiere pro"
      - "davinci resolve"
      - "fusion"
      - "houdini fx"
      - "realflow"
      - "phoenix fd"
      - "fumefx"
      - "thinking particles"
      - "x-particles"
      - "tyflow"
      - "bifrost"
      - "particle flow"
      # --- 编码与压缩 ---
      - "redcode"
      - "prores"
      - "prores 4444"
      - "prores 422"
      - "prores 422 hq"
      - "prores 422 lt"
      - "prores 422 proxy"
      - "dnxhr"
      - "h.264"
      - "h.265"
      - "av1"
      - "vp9"
      - "vp8"

  # ============================================================
  # 20. 英文材质词组（v2.6.3 国外语料训练新增）
  # 收录 velvet/metallic/marble 等材质术语
  # 复用 dsl-tech-param 配色，priority 39
  # ============================================================

  english_material_phrase:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- 视觉属性 ---
      - "velvet"
      - "metallic"
      - "translucent"
      - "glowing"
      - "iridescent"
      - "holographic"
      - "glossy"
      - "matte"
      - "rough"
      - "smooth"
      - "bumpy"
      - "porous"
      - "crystalline"
      - "glassy"
      # --- 织物 ---
      - "fabric"
      - "silk"
      - "cotton"
      - "linen"
      - "wool"
      - "denim"
      - "leather"
      - "fur"
      - "feather"
      - "satin"
      - "lace"
      - "chiffon"
      - "taffeta"
      - "organza"
      - "tulle"
      - "cashmere"
      - "tweed"
      - "flannel"
      - "corduroy"
      - "canvas"
      - "fleece"
      - "felt"
      - "suede"
      - "pleather"
      - "pvc"
      - "latex"
      - "rubber"
      - "neoprene"
      - "spandex"
      - "nylon"
      - "polyester"
      # --- 金属 ---
      - "metal"
      - "steel"
      - "iron"
      - "copper"
      - "brass"
      - "bronze"
      - "gold"
      - "silver"
      - "platinum"
      - "titanium"
      - "aluminum"
      - "chrome"
      - "nickel"
      # --- 木材 ---
      - "wooden"
      - "oak"
      - "pine"
      - "cedar"
      - "mahogany"
      - "walnut"
      - "cherry"
      - "maple"
      - "birch"
      - "beech"
      - "teak"
      - "rosewood"
      - "sandalwood"
      - "ebony"
      - "bamboo"
      - "rattan"
      - "wicker"
      # --- 石材与陶瓷 ---
      - "stone"
      - "marble"
      - "granite"
      - "sandstone"
      - "concrete"
      - "brick"
      - "slate"
      - "limestone"
      - "ceramic"
      - "porcelain"
      - "clay"
      - "terracotta"
      # --- 其他 ---
      - "plastic"
      - "silicone"
      - "paper"
      - "cardboard"
      - "parchment"
      - "vellum"
      - "wax"
      - "glass"
      - "crystal"
      - "ivory"
      - "bone"
      - "horn"
      - "shell"
      - "coral"
      - "pearl"
      - "jade"
      - "turquoise"
      - "quartz"
      - "diamond"
      - "ruby"
      - "sapphire"
      - "emerald"
      - "topaz"
      - "opal"

  # ============================================================
  # 21. 英文艺术家参考词组（v2.6.3 国外语料训练新增）
  # 收录 greg rutkowski/artgerm/wlop 等艺术家名
  # 复用 dsl-narrative-term 配色，priority 38
  # ============================================================

  english_artist_phrase:
    cssClass: "dsl-narrative-term"
    priority: 38
    words:
      # --- 知名数字艺术家 ---
      - "greg rutkowski"
      - "alphonse mucha"
      - "artgerm"
      - "stanley artgerm lau"
      - "wlop"
      - "rossdraws"
      - "ross tran"
      - "makoto shinkai"
      - "studio ghibli"
      - "james jean"
      - "andrei riabovitchev"
      - "marc simonetti"
      - "sakimi chan"
      - "donato giancola"
      - "greg manchess"
      - "craig mullins"
      - "kilian eng"
      - "jake parker"
      - "syd mead"
      - "luis royo"
      - "masamune shirow"
      - "kuvshinov"
      - "peter mohrbacher"
      - "joseph christian leyendecker"
      - "drew struzan"
      - "ilya kuvshinov"
      - "ruan jia"
      - "huang guangjian"
      - "gil elvgren"
      - "sachin teng"
      - "thomas kinkade"
      # --- 古典大师 ---
      - "van gogh"
      - "picasso"
      - "monet"
      - "rembrandt"
      - "davinci"
      - "da vinci"
      - "michelangelo"
      - "raphael"
      - "vermeer"
      - "caravaggio"
      # --- 古典大师扩展（v2.6.4 国外语料扩展）---
      - "h.r. giger"
      - "zdzislaw beksinski"
      - "frank frazetta"
      - "moebius"
      - "jean giraud"
      - "frank miller"
      - "mike mignola"
      - "todd mcfarlane"
      - "jim lee"
      - "frank cho"
      - "adam hughes"
      - "alex ross"
      - "norman rockwell"
      - "n.c. wyeth"
      - "maxfield parrish"
      - "gustav klimt"
      - "alfons mucha"
      - "aubrey beardsley"
      - "edward burne-jones"
      - "dante gabriel rossetti"
      - "john everett millais"
      - "william holman hunt"
      - "john william waterhouse"
      - "lawrence alma-tadema"
      - "frederic leighton"
      - "albert moore"
      - "john singer sargent"
      - "joaquin sorolla"
      - "anders zorn"
      - "peder sever kroyer"
      - "edward hopper"
      - "andrew wyeth"
      - "jamie wyeth"
      - "newell convers wyeth"
      - "howard pyle"
      - "jc leyendecker"
      # --- "by" 前缀艺术家 ---
      - "by greg rutkowski"
      - "by alphonse mucha"
      - "by artgerm"
      - "by wlop"
      - "by rossdraws"
      - "by stanley artgerm lau"
      - "by james jean"
      - "by andrei riabovitchev"
      - "by marc simonetti"
      - "by sakimi chan"
      - "by donato giancola"
      - "by greg manchess"
      - "by craig mullins"
      - "by kilian eng"
      - "by jake parker"
      - "by syd mead"
      - "by luis royo"
      - "by masamune shirow"
      - "by kuvshinov"
      - "by alena kopera"
      - "by peter mohrbacher"
      - "by joseph christian leyendecker"
      - "by drew struzan"
      - "by ilya kuvshinov"
      - "by ruan jia"
      - "by huang guangjian"
      - "by gil elvgren"
      - "by sachin teng"
      - "by thomas kinkade"
      - "by makoto shinkai"
      - "by studio ghibli"
      - "by pixar"
      - "by disney"

  # ============================================================
  # 22. 英文负面提示词组（v2.6.3 国外语料训练新增）
  # 收录 worst quality/deformed/blurry 等负面词
  # 复用 dsl-constraint 配色，priority 48
  # ============================================================

  english_negative_phrase:
    cssClass: "dsl-constraint"
    priority: 48
    words:
      # --- 画质负面 ---
      - "worst quality"
      - "low quality"
      - "normal quality"
      - "lowres"
      - "jpeg artifacts"
      - "blurry"
      - "text"
      - "error"
      - "cropped"
      # --- 人体结构负面 ---
      - "deformed"
      - "distorted"
      - "disfigured"
      - "poorly drawn"
      - "bad anatomy"
      - "wrong anatomy"
      - "extra limb"
      - "missing limb"
      - "floating limbs"
      - "mutated hands"
      - "mutated fingers"
      - "disconnected limbs"
      - "mutation"
      - "mutated"
      - "ugly"
      - "disgusting"
      - "amputation"
      - "bad face"
      - "bad hands"
      - "missing fingers"
      - "extra fingers"
      - "fused fingers"
      - "too many fingers"
      - "malformed limbs"
      - "extra arms"
      - "extra legs"
      - "long neck"
      - "cloned face"
      - "fused face"
      # --- 风格隔离负面 ---
      - "cartoon"
      - "anime"
      - "3d"
      - "render"
      - "drawing"
      - "sketch"
      - "illustration"
      - "painting"
      - "monochrome"
      - "grayscale"
      - "flat color"
      - "photorealistic"
      - "photograph"
      - "realistic photo"
      - "dslr"
      - "bokeh"
      - "film grain"
      - "studio lighting"
      # --- 内容隔离负面 ---
      - "letters"
      - "words"
      - "logo"
      - "signature"
      - "watermark"
      - "chart"
      - "graph"
      - "diagram"
      - "map"
      - "nsfw"
      # --- 嵌入向量负面 ---
      - "easynegative"
      - "ng_deepnegative_v1_75t"
      - "bad_prompt_version2"
      - "bad-hands-5"
      - "bad-artist-anime"
      - "bad-image-v2-39000"
      - "bad_quality"
      - "verybadimagenegative_v1"
      - "vile_prompt3"

  # ============================================================
  # 23. 英文 Midjourney 参数词组（v2.6.3 国外语料训练新增）
  # 收录 --ar/--v/--seed 等 MJ 参数
  # 复用 dsl-param-key 配色，priority 46
  # ============================================================

  english_mj_param_phrase:
    cssClass: "dsl-param-key"
    priority: 46
    words:
      - "--ar"
      - "--ar 16:9"
      - "--ar 21:9"
      - "--ar 2:3"
      - "--ar 9:16"
      - "--ar 1:1"
      - "--ar 4:3"
      - "--ar 3:2"
      - "--ar 3:4"
      - "--c"
      - "--chaos"
      - "--q"
      - "--quality"
      - "--r"
      - "--repeat"
      - "--seed"
      - "--s"
      - "--stylize"
      - "--w"
      - "--weird"
      - "--tile"
      - "--niji"
      - "--v"
      - "--v 6"
      - "--v 6.1"
      - "--v 6.2"
      - "--v 7"
      - "--v 7.0"
      - "--fast"
      - "--turbo"
      - "--relax"
      - "--raw"
      - "--style raw"
      - "--style cute"
      - "--style scenic"
      - "--style expressive"
      - "--draft"
      - "--no"
      - "--iw"
      - "--sref"
      - "--oref"
      - "--cref"
      - "--cw"
      - "--ss"
      - "--sv"
      - "--p"
      - "--profile"
      - "--stealth"
      - "--public"
      - "--video"

  # ============================================================
  # 24. 英文提示词工程词组（v2.6.3 国外语料训练新增）
  # 收录 lora/controlnet/cfg scale 等工程术语
  # 复用 dsl-tech-param 配色，priority 46
  # ============================================================

  english_prompt_eng_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- 权重与语法 ---
      - "prompt weighting"
      - "BREAK"
      - "AND"
      - "AT STEP"
      - "alternating sampling"
      - "dynamic prompt"
      - "wildcard"
      # --- 模型与微调 ---
      - "embedding"
      - "textual inversion"
      - "hypernetwork"
      - "lora"
      - "lyco"
      - "checkpoint"
      - "vae"
      - "dreambooth"
      - "locon"
      - "lokr"
      - "loha"
      - "dylora"
      - "ia3"
      # --- ControlNet ---
      - "controlnet"
      - "openpose"
      - "canny edge"
      - "depth map"
      - "lineart"
      - "softedge"
      - "scribble"
      - "mlsd"
      - "normal map"
      - "segmentation"
      - "tile"
      - "ip-adapter"
      - "reference only"
      - "t2i adapter"
      - "instruct pix2pix"
      # --- 采样参数 ---
      - "steps"
      - "sampler"
      - "cfg scale"
      - "denoising strength"
      - "clip skip"
      - "ensd"
      - "eta"
      # --- 高清修复 ---
      - "highres fix"
      - "upscale"
      - "latent upscale"
      - "tiling diffusion"
      - "multidiffusion"
      - "regional prompter"
      - "latent couple"
      # --- 模型格式 ---
      - "safetensors"
      - "ckpt"
      - "pruned"
      - "fp16"
      - "fp32"
      - "bf16"
      - "fp8"
      # --- 加速后端 ---
      - "cuda"
      - "optix"
      - "rtx"
      - "dlss"
      - "fsr"
      - "xess"

  # ============================================================
  # 25. 英文摄影器材词组（v2.6.3 国外语料训练新增）
  # 收录相机型号、镜头品牌、布光器材
  # 复用 dsl-tech-param 配色，priority 45
  # ============================================================

`;

/** 07e-english-extended-phrase.yaml 内置内容 */
const ENGLISH_EXTENDED_PHRASE_YAML = `# ============================================================
# 07e-english-extended-phrase.yaml
# 词组词典·英文扩展术语（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（9 个）：
#   english_photo_gear_phrase            (priority 47, dsl-tech-param)     摄影器材
#   english_color_grading_phrase         (priority 46, dsl-tech-param)     调色术语
#   english_lens_effect_phrase           (priority 45, dsl-tech-param)     镜头特效
#   english_mood_phrase                  (priority 43, dsl-emotion-word)   情绪氛围
#   english_composition_extended_phrase  (priority 42, dsl-narrative-term) 构图扩展
#   english_style_extended_phrase        (priority 39, dsl-narrative-term) 风格扩展
#   english_render_extended_phrase       (priority 39, dsl-tech-param)     渲染扩展
#   english_material_extended_phrase     (priority 39, dsl-tech-param)     材质扩展
#   english_vfx_extended_phrase          (priority 39, dsl-tech-param)     VFX 扩展
# ============================================================

wordLexicon:

  english_photo_gear_phrase:
    cssClass: "dsl-tech-param"
    priority: 45
    words:
      # --- 相机品牌 ---
      - "canon"
      - "nikon"
      - "sony"
      - "fujifilm"
      - "leica"
      - "hasselblad"
      - "phase one"
      - "pentax"
      - "olympus"
      - "panasonic"
      # --- 相机型号 ---
      - "canon eos r5"
      - "canon eos r6"
      - "sony a7"
      - "sony a7iv"
      - "nikon z9"
      - "fujifilm x-t5"
      # --- 电影机 ---
      - "arri alexa mini"
      - "red weapon dragon"
      - "sony cinealta f65"
      - "arri"
      - "arriraw"
      - "redcode raw"
      # --- 镜头品牌 ---
      - "zeiss"
      - "zeiss master prime"
      - "panavision"
      - "panavision g series"
      - "panavision primo prime"
      - "sigma art"
      - "tamron"
      - "tokina"
      # --- 镜头参数 ---
      - "35mm"
      - "50mm"
      - "85mm"
      - "135mm"
      - "16-35mm"
      - "24-70mm"
      - "70-200mm"
      - "anamorphic"
      - "anamorphic lens"
      - "f/1.2"
      - "f/1.4"
      - "f/2.8"
      - "f/4"
      - "f/8"
      - "f/11"
      # --- 布光器材 ---
      - "softbox"
      - "octabox"
      - "beauty dish"
      - "snoot"
      - "grid"
      - "reflector"
      - "diffuser"
      - "filter"
      - "nd filter"
      - "cpl"
      - "polarizer"
      - "hotshoe"
      - "flash"
      - "strobe"
      - "trigger"
      - "light stand"
      - "boom arm"
      - "c-stand"
      # --- 胶片类型（v2.6.4 国外语料扩展）---
      - "kodak portra"
      - "fuji velvia"
      - "ilford hp5"
      - "cinestill 800t"
      - "kodak vision3"
      - "kodak ektar"
      - "kodak gold"
      - "fuji superia"
      - "agfa vista"
      - "lomography color"
      - "black and white film"
      - "sepia tone"
      - "cyanotype"
      - "platinum print"
      - "silver gelatin"
      - "wet plate"
      - "daguerreotype"
      - "calotype"
      - "tintype"
      - "ambrotype"
      # --- 画幅 ---
      - "35mm film"
      - "120 film"
      - "4x5 large format"
      - "8x10 large format"
      - "instant film"
      - "holga"
      - "diana"
      - "medium format camera"
      - "large format camera"
      # --- 镜头类型 ---
      - "tilt-shift lens"
      - "fisheye lens"
      - "wide angle lens"
      - "telephoto lens"
      - "macro lens"
      - "prime lens"
      - "zoom lens"
      - "fast lens"
      - "slow lens"
      - "full frame"
      - "aps-c"
      - "micro four thirds"
      # --- 摄影风格 ---
      - "fashion editorial photography"
      - "beauty photography"
      - "editorial portrait"
      - "fashion portrait"
      - "beauty portrait"
      - "glamour shot"
      - "polaroid"
      - "polaroid camera"
      - "double eyelid"
      - "sony a7iii"
      - "high quality portrait"
      - "professional female model"
      - "shot on hasselblad"

# ============================================================
# 24. 英文调色与色彩科学词组（v2.6.4 国外语料扩展新增）
# 收录 cinematic color grading/orange and teal 等调色词
# 复用 dsl-tech-param 配色，priority 46
# ============================================================

  english_color_grading_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- 电影调色 ---
      - "cinematic color grading"
      - "amber-teal split"
      - "warm amber key light"
      - "cool teal fill light"
      - "complementary color contrast"
      - "cinematic color separation"
      - "orange and teal"
      - "blockbuster look"
      - "hollywood look"
      - "netflix look"
      - "music video look"
      - "commercial look"
      - "fashion look"
      - "beauty look"
      - "product look"
      - "automotive look"
      - "food look"
      - "interior look"
      - "architectural look"
      - "travel look"
      - "documentary look"
      - "wedding look"
      - "portrait look"
      - "landscape look"
      # --- 色彩处理 ---
      - "black and white"
      - "high contrast black and white"
      - "low contrast black and white"
      - "sepia"
      - "vintage color"
      - "faded color"
      - "desaturated"
      - "hyper saturated"
      - "pastel"
      - "monochrome"
      - "duotone"
      - "tritone"
      - "quadtone"
      - "split toning"
      - "color balance"
      - "color harmony"
      - "color theory"
      - "complementary colors"
      - "analogous colors"
      - "triadic colors"
      - "tetradic colors"
      - "monochromatic colors"
      - "warm colors"
      - "cool colors"
      - "neutral colors"
      - "earth tones"
      - "jewel tones"
      - "pastel colors"
      - "neon colors"
      - "vibrant colors"
      - "muted colors"
      - "subtle colors"
      - "rich colors"
      - "deep colors"
      # --- 色彩科学 ---
      - "primary colors"
      - "secondary colors"
      - "tertiary colors"
      - "rgb"
      - "cmyk"
      - "hsl"
      - "hsv"
      - "lab"
      - "xyz"
      - "yuv"
      - "ycbcr"
      - "srgb"
      - "adobe rgb"
      - "dci-p3"
      - "rec.709"
      - "rec.2020"
      - "prophoto rgb"
      - "wide gamut"
      - "narrow gamut"
      - "color space"
      - "color profile"
      - "icc profile"
      - "color management"
      - "color calibration"
      - "color accuracy"
      - "color reproduction"
      - "color fidelity"
      - "color gamut"
      - "color depth"
      - "8-bit color"
      - "10-bit color"
      - "12-bit color"
      - "14-bit color"
      - "16-bit color"
      - "32-bit color"
      - "hdr"
      - "sdr"
      - "pq"
      - "hlg"
      - "dolby vision"
      - "hdr10"
      - "hdr10+"
      - "dolby atmos"
      # --- Log 曲线 ---
      - "log"
      - "s-log"
      - "s-log3"
      - "c-log"
      - "c-log2"
      - "c-log3"
      - "v-log"
      - "n-log"

# ============================================================
# 25. 英文镜头光晕与特效词组（v2.6.4 国外语料扩展新增）
# 收录 lens flare/anamorphic flare/bloom 等特效术语
# 复用 dsl-light-word 配色，priority 40
# ============================================================

  english_lens_effect_phrase:
    cssClass: "dsl-light-word"
    priority: 40
    words:
      # --- 镜头光晕 ---
      - "lens flare"
      - "anamorphic flare"
      - "horizontal flare"
      - "blue streak"
      - "blue streak flare"
      - "star burst"
      - "sun flare"
      - "light leak"
      - "film burn"
      - "light bleed"
      # --- 后期特效 ---
      - "bloom"
      - "glow"
      - "glare"
      - "halation"
      - "iridescence"
      - "chromatic aberration"
      - "purple fringing"
      - "spherical aberration"
      - "coma"
      - "distortion"
      - "vignette"
      - "dark corners"
      - "grain"
      - "noise"
      - "dithering"
      - "posterization"
      - "banding"
      - "aliasing"
      - "moire"
      - "jaggies"
      - "stair-stepping"
      - "edge enhancement"
      - "sharpening"
      - "blurring"
      - "gaussian blur"
      - "motion blur"
      - "radial blur"
      - "zoom blur"
      - "tilt-shift blur"
      # --- 景深特效 ---
      - "depth of field"
      - "bokeh"
      - "circle of confusion"
      - "depth blur"
      - "background blur"
      - "foreground blur"
      - "tilt blur"
      - "shift blur"
      - "swing blur"
      - "rack focus"
      - "pull focus"
      - "follow focus"
      - "manual focus"
      - "auto focus"
      - "continuous focus"
      - "single focus"
      - "touch focus"
      - "face detection"
      - "eye detection"
      - "subject tracking"
      - "zone focus"
      - "hyperfocal"
      - "infinity focus"
      - "close focus"
      - "minimum focus distance"
      # --- 散景类型 ---
      - "creamy bokeh"
      - "swirly bokeh"
      - "busy bokeh"
      - "smooth bokeh"
      - "circular bokeh"
      - "hexagonal bokeh"
      - "octagonal bokeh"
      - "specular highlights"
      - "catchlights"
      - "starburst effect"
      # --- 曝光技法 ---
      - "double exposure"
      - "multiple exposure"
      - "long exposure"
      - "time lapse"
      - "motion blur"
      - "panning blur"
      - "zoom blur"
      - "radial blur"
      - "tilt-shift blur"
      - "miniature effect"
      - "diorama effect"
      - "toy camera effect"
      # --- 放大倍率 ---
      - "magnification ratio"
      - "reproduction ratio"
      - "macro ratio"
      - "micro ratio"
      - "life size"
      - "1:1 magnification"
      - "1:2 magnification"
      - "2:1 magnification"
      - "5:1 magnification"
      - "10:1 magnification"

# ============================================================
# 26. 英文情绪氛围词组（v2.6.4 国外语料扩展新增）
# 收录 ethereal/dreamy/mysterious 等情绪氛围词
# 复用 dsl-emotion-word 配色，priority 40
# ============================================================

  english_mood_phrase:
    cssClass: "dsl-emotion-word"
    priority: 40
    words:
      # --- 超现实与梦幻 ---
      - "ethereal"
      - "dreamy"
      - "surreal"
      - "mysterious"
      - "enigmatic"
      - "mystical"
      - "magical"
      - "fantasy"
      - "fairytale"
      - "folklore"
      - "mythological"
      - "legendary"
      # --- 史诗与英雄 ---
      - "epic"
      - "heroic"
      - "majestic"
      - "grand"
      - "magnificent"
      - "splendid"
      - "glorious"
      - "divine"
      - "sacred"
      - "holy"
      - "blessed"
      - "angelic"
      - "celestial"
      - "heavenly"
      - "cosmic"
      - "galactic"
      - "interstellar"
      - "astral"
      - "spiritual"
      - "transcendent"
      - "sublime"
      # --- 惊艳与美丽 ---
      - "awesome"
      - "breathtaking"
      - "stunning"
      - "gorgeous"
      - "beautiful"
      - "pretty"
      - "lovely"
      - "charming"
      - "delightful"
      - "enchanting"
      - "captivating"
      - "alluring"
      - "fascinating"
      - "intriguing"
      # --- 情绪 ---
      - "interesting"
      - "engaging"
      - "compelling"
      - "gripping"
      - "enthralling"
      - "mesmerizing"
      - "hypnotic"
      - "trance-like"
      - "meditative"
      - "contemplative"
      - "reflective"
      - "introspective"
      - "pensive"
      - "thoughtful"
      - "wistful"
      - "melancholic"
      - "nostalgic"
      - "sentimental"
      - "romantic"
      - "passionate"
      - "ardent"
      - "fervent"
      - "zealous"
      - "enthusiastic"
      - "eager"
      - "excited"
      - "thrilled"
      - "exhilarated"
      - "euphoric"
      - "ecstatic"
      - "rapturous"
      - "blissful"
      - "joyful"
      - "happy"
      - "cheerful"
      - "glad"
      - "delighted"
      - "pleased"
      - "satisfied"
      - "contented"
      - "content"
      - "peaceful"
      - "calm"
      - "serene"
      - "tranquil"
      - "placid"
      - "quiet"
      - "still"
      - "silent"
      - "hushed"
      - "muted"
      - "soft"
      - "gentle"
      - "mild"
      - "tender"
      - "loving"
      - "affectionate"
      - "caring"
      - "warm"
      - "cozy"
      - "comfortable"
      - "snug"
      - "safe"
      - "secure"
      # --- 神秘与黑暗 ---
      - "dark"
      - "gloomy"
      - "somber"
      - "ominous"
      - "foreboding"
      - "eerie"
      - "creepy"
      - "spooky"
      - "haunting"
      - "ghostly"
      - "shadowy"
      - "murky"
      - "dim"
      - "faint"
      - "obscure"
      - "vague"
      - "ambiguous"
      - "uncertain"
      - "doubtful"
      - "suspicious"
      # --- 氛围场景 ---
      - "noir mood"
      - "neon-drenched atmosphere"
      - "desolate atmosphere"
      - "tense atmosphere"
      - "atmospheric light"

# ============================================================
# 国外语料扩展（v2.6.5 第二批）
# 来源：Lexica / PromptHero / Civitai / OpenArt / PromptBase / Midlibrary
# 新增 880+ 英文专业术语，覆盖 12 个类别
# ============================================================

  # ============================================================
  # 25. 摄影构图扩展词组（v2.6.5 国外语料扩展新增）
  # 收录 rule of space / negative space / fibonacci spiral 等
  # 复用 dsl-camera-action 配色，priority 45
  # ============================================================

  english_composition_extended_phrase:
    cssClass: "dsl-camera-action"
    priority: 45
    words:
      - "rule of space"
      - "negative space"
      - "leading lines composition"
      - "golden spiral"
      - "golden triangle composition"
      - "fibonacci spiral"
      - "framing composition"
      - "symmetrical balance"
      - "asymmetrical balance"
      - "radial composition"
      - "diagonal composition"
      - "triangular composition"
      - "centered composition"
      - "foreground interest"
      - "middle ground"
      - "background separation"
      - "layering composition"
      - "visual weight"
      - "focal point"
      - "vanishing point"
      - "three-point perspective"
      - "isometric view"
      - "telephoto compression"
      - "wide angle distortion"
      - "deep depth of field"
      - "panning shot"
      - "hdr photography"
      - "low key lighting"
      - "high key lighting"
      - "chiaroscuro"
      - "split lighting"
      - "butterfly lighting"
      - "loop lighting"

  # ============================================================
  # 26. 艺术风格与流派扩展词组（v2.6.5 国外语料扩展新增）
  # 收录 abstract expressionism / pointillism / art brut 等
  # 复用 dsl-narrative-term 配色，priority 45
  # ============================================================

  english_style_extended_phrase:
    cssClass: "dsl-narrative-term"
    priority: 45
    words:
      - "abstract expressionism"
      - "action painting"
      - "color field painting"
      - "brutalism"
      - "cartoon style"
      - "chibi"
      - "cinematic style"
      - "collage"
      - "comic book art"
      - "constructivism"
      - "cross-hatching"
      - "cubism"
      - "dark fantasy"
      - "expressionism"
      - "fantasy art"
      - "flat design"
      - "futurism"
      - "glitch art"
      - "gothic"
      - "graffiti"
      - "hyperrealism"
      - "japanese woodblock"
      - "kawaii"
      - "line art"
      - "linocut"
      - "mosaic"
      - "neon style"
      - "pastel"
      - "pencil sketch"
      - "pixel art"
      - "pointillism"
      - "psychedelic"
      - "retro vintage"
      - "storybook illustration"
      - "rococo"
      - "mannerism"
      - "suprematism"
      - "de stijl"
      - "dadaism"
      - "orphism"
      - "fauvism"
      - "post-impressionism"
      - "neo-classicism"
      - "romanticism"
      - "realism movement"
      - "pre-raphaelite"
      - "art brut"
      - "outsider art"
      - "nouveau realisme"
      - "fluxus"

  # ============================================================
  # 27. 渲染技术扩展词组（v2.6.5 国外语料扩展新增）
  # 收录 path tracing / photon mapping / fresnel effect 等
  # 复用 dsl-tech-param 配色，priority 46
  # ============================================================

  english_render_extended_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      - "path tracing"
      - "real-time ray tracing"
      - "caustics"
      - "photon mapping"
      - "bidirectional path tracing"
      - "metropolis light transport"
      - "diffuse interreflection"
      - "color bleeding"
      - "final gather"
      - "irradiance caching"
      - "light caching"
      - "brute force gi"
      - "radiosity"
      - "monte carlo integration"
      - "russian roulette"
      - "importance sampling"
      - "temporal accumulation"
      - "progressive rendering"
      - "bucket rendering"
      - "gpu acceleration"
      - "pbr workflow"
      - "metallic workflow"
      - "specular workflow"
      - "albedo map"
      - "normal map"
      - "roughness map"
      - "metallic map"
      - "ambient occlusion map"
      - "height map"
      - "displacement map"
      - "bump map"
      - "emission map"
      - "subsurface map"
      - "refraction index"
      - "fresnel effect"
      - "dielectric material"
      - "conductor material"
      - "anisotropic reflection"
      - "microfacet theory"
      - "energy conservation"
      - "albedo"
      - "fresnel"
      - "brdf"
      - "bsdf"
      - "bssrdf"
      - "shader"
      - "node-based material"
      - "procedural texture"
      - "noise pattern"
      - "voronoi"
      - "perlin noise"
      - "fractal noise"
      - "wireframe render"
      - "clay render"
      - "toon shader"
      - "flat shading"
      - "phong shading"
      - "gouraud shading"

  # ============================================================
  # 28. 材质纹理扩展词组（v2.6.5 国外语料扩展新增）
  # 收录 brushed metal / polished marble / velvet fabric 等
  # 复用 dsl-tech-param 配色，priority 45
  # ============================================================

  english_material_extended_phrase:
    cssClass: "dsl-tech-param"
    priority: 45
    words:
      - "brushed metal"
      - "polished chrome"
      - "oxidized copper"
      - "weathered steel"
      - "rust texture"
      - "patina"
      - "anodized aluminum"
      - "liquid metal"
      - "molten metal"
      - "forged iron"
      - "cast iron"
      - "wrought iron"
      - "gunmetal"
      - "brass fitting"
      - "bronze patina"
      - "titanium alloy"
      - "carbon fiber"
      - "kevlar weave"
      - "fiberglass"
      - "carbon composite"
      - "oak grain"
      - "mahogany"
      - "walnut burl"
      - "bamboo weave"
      - "rattan"
      - "weathered barn wood"
      - "reclaimed timber"
      - "polished marble"
      - "travertine"
      - "granite surface"
      - "slate tile"
      - "sandstone"
      - "basalt rock"
      - "limestone"
      - "concrete texture"
      - "exposed aggregate"
      - "polished concrete"
      - "terrazzo"
      - "stucco wall"
      - "plaster texture"
      - "brick wall"
      - "cobblestone"
      - "fieldstone"
      - "river rock"
      - "jade stone"
      - "onyx"
      - "quartz crystal"
      - "amethyst geode"
      - "velvet fabric"
      - "silk fabric"
      - "satin finish"
      - "brocade"
      - "damask pattern"
      - "lace fabric"
      - "chiffon"
      - "organza"
      - "tweed weave"
      - "linen texture"
      - "burlap"
      - "canvas fabric"
      - "denim"
      - "leather grain"
      - "suede"
      - "distressed leather"
      - "reptile skin"
      - "snake scale"
      - "crocodile leather"
      - "shagreen"
      - "mother of pearl"
      - "tortoiseshell"
      - "abalone shell"
      - "frosted glass"
      - "smoked glass"
      - "stained glass"
      - "leaded glass"

  # ============================================================
  # 29. 后期特效扩展词组（v2.6.5 国外语料扩展新增）
  # 收录 bleach bypass / volumetric fog / god rays 等
  # 复用 dsl-tech-param 配色，priority 46
  # ============================================================

  english_vfx_extended_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      - "color correction"
      - "teal and orange"
      - "bleach bypass"
      - "cross processing"
      - "sepia tone"
      - "vintage film look"
      - "film grain"
      - "digital noise"
      - "ghosting flare"
      - "bloom effect"
      - "glow effect"
      - "glare effect"
      - "god rays"
      - "volumetric light"
      - "volumetric fog"
      - "volumetric cloud"
      - "atmospheric haze"
      - "depth haze"
      - "fog effect"
      - "mist effect"
      - "smoke simulation"
      - "dust particles"
      - "floating particles"
      - "light particles"
      - "particle system"
      - "particle simulation"
      - "bokeh particles"
      - "snow particles"
      - "rain effect"
      - "splash effect"
      - "water droplet"
      - "water ripples"
      - "water caustics"
      - "foam texture"
      - "bubble effect"
      - "tilt-shift blur"
      - "depth of field blur"
      - "z-depth blur"
      - "optical flow"
      - "distortion effect"
      - "warp effect"
      - "displacement"
      - "refraction distortion"
      - "heat haze"
      - "mirage effect"
      - "glitch effect"
      - "datamosh"
      - "pixel sort"
      - "rgb split"
      - "scan lines"
      - "crt effect"
      - "vhs effect"
      - "retro filter"
      - "infrared photography"
      - "thermal imaging"
      - "x-ray effect"
      - "night vision"
      - "crushed blacks"
      - "lifted shadows"
      - "blown highlights"
      - "hdr toning"
      - "dodge and burn"
      - "frequency separation"
      - "sharpening"
      - "edge enhancement"
      - "filmic tonemapping"
      - "aces color space"
      - "lut"
      - "log footage"

  # ============================================================
  # 30. 人物姿态与表情词组（v2.6.5 国外语料扩展新增）
  # 收录 contrapposto / dynamic pose / heroic pose 等
  # 复用 dsl-emotion-word 配色，priority 45
  # ============================================================

`;

/** 07f-english-subject-phrase.yaml 内置内容 */
const ENGLISH_SUBJECT_PHRASE_YAML = `# ============================================================
# 07f-english-subject-phrase.yaml
# 词组词典·英文主题术语（v2.7.0 从 07-word-lexicon.yaml 拆分）
# ------------------------------------------------------------
# 包含分组（7 个）：
#   english_pose_expression_phrase       (priority 43, dsl-emotion-word)   姿势表情
#   english_costume_fashion_phrase       (priority 40, dsl-fashion-term)   服饰时尚
#   english_architecture_scene_phrase    (priority 39, dsl-narrative-term) 建筑场景
#   english_scifi_cyberpunk_phrase       (priority 39, dsl-narrative-term) 科幻赛博朋克
#   english_fantasy_myth_phrase          (priority 39, dsl-narrative-term) 奇幻神话
#   english_creature_race_phrase         (priority 39, dsl-narrative-term) 生物种族
#   english_weapon_gear_phrase           (priority 39, dsl-tech-param)     武器装备
# ============================================================

wordLexicon:

  english_pose_expression_phrase:
    cssClass: "dsl-emotion-word"
    priority: 45
    words:
      - "contrapposto"
      - "dynamic pose"
      - "heroic pose"
      - "power pose"
      - "action pose"
      - "fighting stance"
      - "battle ready stance"
      - "casual pose"
      - "relaxed stance"
      - "seated pose"
      - "kneeling position"
      - "crouching stance"
      - "leaping pose"
      - "jumping pose"
      - "running pose"
      - "walking pose"
      - "sprinting"
      - "lunging"
      - "kicking"
      - "punching"
      - "sword drawing"
      - "aiming pose"
      - "thinking pose"
      - "looking away"
      - "looking back"
      - "profile view"
      - "three-quarter view"
      - "frontal view"
      - "back view"
      - "bashful expression"
      - "shy expression"
      - "embarrassed look"
      - "sleepy expression"
      - "relaxed expression"
      - "distracted look"
      - "intense gaze"
      - "fierce gaze"
      - "frowning"
      - "blushing"
      - "laughing"
      - "light smile"
      - "tearing up"
      - "kubrick stare"
      - "pout"
      - "symmetrical face"
      - "expressive face"
      - "bright eyes"
      - "straight nose"
      - "pronounced nose"
      - "heterochromia"
      - "freckles"
      - "sharp jawline"
      - "high cheekbones"
      - "full lips"
      - "thin lips"
      - "arched eyebrows"
      - "furrowed brow"
      - "piercing eyes"
      - "seductive gaze"
      - "menacing glare"
      - "contemplative expression"
      - "melancholic expression"
      - "joyful expression"
      - "surprised look"
      - "shocked expression"
      - "fearful expression"
      - "stoic expression"
      - "serene expression"
      - "mischievous grin"
      - "sly smile"
      - "wry smile"
      - "smirk"
      - "gritted teeth"
      - "clenched jaw"
      - "flared nostrils"
      - "raised eyebrow"

  # ============================================================
  # 31. 服装与时尚词组（v2.6.5 国外语料扩展新增）
  # 收录 haute couture / plate armor / kimono 等
  # 复用 dsl-fashion-term 配色，priority 45
  # ============================================================

  english_costume_fashion_phrase:
    cssClass: "dsl-fashion-term"
    priority: 45
    words:
      - "haute couture"
      - "runway fashion"
      - "avant-garde fashion"
      - "streetwear"
      - "techwear"
      - "victorian lace gown"
      - "edwardian dress"
      - "corset bodice"
      - "bustle skirt"
      - "crinoline"
      - "chemise"
      - "petticoat"
      - "bodice"
      - "train dress"
      - "ball gown"
      - "evening gown"
      - "cocktail dress"
      - "slip dress"
      - "wrap dress"
      - "kimono"
      - "yukata"
      - "hakama"
      - "haori"
      - "obi sash"
      - "hanfu"
      - "cheongsam"
      - "qipao"
      - "tang suit"
      - "mandarin collar"
      - "frog buttons"
      - "dragon embroidery"
      - "phoenix embroidery"
      - "silk robe"
      - "military uniform"
      - "tactical vest"
      - "combat gear"
      - "plate carrier"
      - "load bearing vest"
      - "duty belt"
      - "epaulets"
      - "brass buttons"
      - "peaked cap"
      - "trench coat"
      - "bomber jacket"
      - "flight jacket"
      - "leather jacket"
      - "moto jacket"
      - "biker jacket"
      - "denim jacket"
      - "parka coat"
      - "pea coat"
      - "duster coat"
      - "cape"
      - "cloak"
      - "mantle"
      - "cowl"
      - "hooded robe"
      - "wizard robe"
      - "battle mage attire"
      - "ceremonial robe"
      - "monastic habit"
      - "vestments"
      - "liturgical garments"
      - "plate armor"
      - "chainmail"
      - "brigandine"
      - "gambeson"
      - "spaulders"
      - "vambraces"
      - "greaves"
      - "sabatons"
      - "gauntlets"
      - "gorget"
      - "breastplate"
      - "cuirass"
      - "sallet helmet"
      - "great helm"
      - "armet"
      - "burgonet"
      - "barbuta"
      - "kettle hat"

  # ============================================================
  # 32. 建筑与场景词组（v2.6.5 国外语料扩展新增）
  # 收录 gothic architecture / flying buttress / nave 等
  # 复用 dsl-narrative-term 配色，priority 44
  # ============================================================

  english_architecture_scene_phrase:
    cssClass: "dsl-narrative-term"
    priority: 44
    words:
      - "brutalist architecture"
      - "gothic architecture"
      - "gothic revival"
      - "romanesque architecture"
      - "byzantine architecture"
      - "renaissance architecture"
      - "baroque architecture"
      - "rococo architecture"
      - "neoclassical architecture"
      - "art deco architecture"
      - "modernist architecture"
      - "postmodern architecture"
      - "deconstructivism"
      - "international style"
      - "bauhaus architecture"
      - "prairie style"
      - "victorian architecture"
      - "queen anne style"
      - "tudor style"
      - "colonial architecture"
      - "georgian architecture"
      - "federal style"
      - "greek revival"
      - "craftsman style"
      - "streamliner moderne"
      - "cathedral interior"
      - "basilica"
      - "nave"
      - "transept"
      - "apse"
      - "choir"
      - "ambulatory"
      - "flying buttress"
      - "ribbed vault"
      - "groin vault"
      - "barrel vault"
      - "dome"
      - "cupola"
      - "clerestory"
      - "rose window"
      - "tracery"
      - "pinnacle"
      - "gargoyle"
      - "grotesque"
      - "machicolation"
      - "crenellation"
      - "battlement"
      - "parapet"
      - "keep tower"
      - "moat"
      - "drawbridge"
      - "portcullis"
      - "barbican"
      - "bailey"
      - "great hall"
      - "throne room"
      - "courtyard"
      - "cloister"
      - "colonnade"
      - "peristyle"
      - "atrium"
      - "rotunda"
      - "portico"
      - "pediment"
      - "entablature"
      - "frieze"
      - "cornice"
      - "architrave"
      - "capital"
      - "fluted column"
      - "doric order"
      - "ionic order"
      - "corinthian order"
      - "composite order"
      - "tuscan order"
      - "rustication"
      - "quoins"
      - "string course"
      - "bay window"
      - "oriel window"
      - "dormer window"
      - "mansard roof"
      - "gable roof"
      - "hip roof"
      - "vaulted ceiling"
      - "coffered ceiling"
      - "tray ceiling"

  # ============================================================
  # 33. 科幻/赛博朋克词组（v2.6.5 国外语料扩展新增）
  # 收录 holographic display / cybernetic implant / megacity 等
  # 复用 dsl-tech-param 配色，priority 45
  # ============================================================

  english_scifi_cyberpunk_phrase:
    cssClass: "dsl-tech-param"
    priority: 45
    words:
      - "neon lights"
      - "holographic display"
      - "hologram projection"
      - "augmented reality"
      - "virtual reality"
      - "cybernetic implant"
      - "cybernetic enhancement"
      - "prosthetic limb"
      - "bionic eye"
      - "neural interface"
      - "brain computer interface"
      - "data jack"
      - "cortex chip"
      - "optical implant"
      - "synthetic skin"
      - "bionic arm"
      - "mechanical prosthetic"
      - "hydraulic joint"
      - "servo motor"
      - "circuit pattern"
      - "led accent"
      - "fiber optic hair"
      - "data stream"
      - "digital rain"
      - "glitch artifact"
      - "pixelated distortion"
      - "rgb channel split"
      - "scan line"
      - "crt monitor"
      - "vhs distortion"
      - "megacity"
      - "arcology"
      - "skyscraper forest"
      - "neon sign"
      - "holographic advertisement"
      - "flying car"
      - "hover vehicle"
      - "maglev train"
      - "space elevator"
      - "orbital station"
      - "rain slicked street"
      - "dystopian slum"
      - "corporate tower"
      - "neon district"
      - "black market alley"
      - "underground bunker"
      - "data center"
      - "server room"
      - "control room"
      - "command bridge"
      - "cockpit interior"
      - "cryo chamber"
      - "stasis pod"
      - "cloning vat"
      - "medical bay"
      - "laboratory interior"
      - "research facility"
      - "containment cell"
      - "force field"
      - "energy shield"
      - "plasma window"
      - "tractor beam"
      - "anti gravity"
      - "maglev platform"
      - "hover bike"
      - "power armor"
      - "exoskeleton"
      - "mech suit"
      - "giant robot"
      - "bipedal mech"
      - "quadruped drone"
      - "surveillance drone"
      - "combat drone"
      - "security bot"
      - "android"
      - "gynoid"
      - "replicant"
      - "cyborg"
      - "synthetic human"
      - "artificial intelligence"
      - "neural network"
      - "quantum computer"
      - "touch interface"
      - "heads up display"
      - "augmented visor"
      - "cyber visor"
      - "tech goggles"
      - "rebreather mask"
      - "oxygen mask"
      - "environment suit"
      - "hazard suit"
      - "spacesuit"
      - "eva suit"

  # ============================================================
  # 34. 奇幻/神话词组（v2.6.5 国外语料扩展新增）
  # 收录 enchanted forest / magic circle / yggdrasil 等
  # 复用 dsl-narrative-term 配色，priority 44
  # ============================================================

  english_fantasy_myth_phrase:
    cssClass: "dsl-narrative-term"
    priority: 44
    words:
      - "enchanted forest"
      - "mystical glade"
      - "ancient ruins"
      - "forgotten temple"
      - "sacred grove"
      - "celestial realm"
      - "astral plane"
      - "spirit world"
      - "fairy realm"
      - "elven kingdom"
      - "dwarven stronghold"
      - "dragon lair"
      - "wizard tower"
      - "magic circle"
      - "summoning circle"
      - "runic inscription"
      - "ancient runes"
      - "mystical symbol"
      - "arcane glyph"
      - "enchanted artifact"
      - "magical artifact"
      - "holy relic"
      - "cursed object"
      - "ancient scroll"
      - "spellbook"
      - "grimoire"
      - "tome of knowledge"
      - "magic staff"
      - "wizard staff"
      - "sorcerer wand"
      - "crystal ball"
      - "scrying mirror"
      - "alchemical apparatus"
      - "potion bottle"
      - "elixir flask"
      - "magical aura"
      - "mystical energy"
      - "arcane particle"
      - "glowing rune"
      - "floating island"
      - "celestial castle"
      - "crystal palace"
      - "obsidian fortress"
      - "marble sanctuary"
      - "golden temple"
      - "jade pagoda"
      - "bonsai garden"
      - "zen garden"
      - "cherry blossom"
      - "spirit tree"
      - "world tree"
      - "yggdrasil"
      - "sacred flame"
      - "eternal flame"
      - "magical mist"
      - "spectral fog"
      - "ghostly apparition"
      - "spectral being"
      - "wraith"
      - "banshee"
      - "will-o-wisp"
      - "fairy light"
      - "pixie dust"
      - "magical spark"
      - "eldritch energy"
      - "cosmic energy"
      - "divine light"
      - "holy radiance"
      - "cursed aura"
      - "demonic aura"
      - "angelic halo"
      - "celestial wings"
      - "feathered wing"
      - "leathery wing"
      - "bat wing"
      - "dragon wing"
      - "fairy wing"
      - "butterfly wing"
      - "moth wing"
      - "unicorn horn"
      - "phoenix feather"
      - "dragon scale"
      - "basilisk eye"
      - "hydra head"
      - "griffin feather"
      - "kirin"
      - "qilin"
      - "thunderbird"
      - "roc bird"
      - "sphinx"
      - "centaur"
      - "minotaur"
      - "satyr"
      - "faun"
      - "nymph"
      - "dryad"
      - "nereid"
      - "siren"

  # ============================================================
  # 35. 生物与角色种族词组（v2.6.5 国外语料扩展新增）
  # 收录 anthropomorphic / high elf / dragonborn / lich 等
  # 复用 dsl-narrative-term 配色，priority 44
  # ============================================================

  english_creature_race_phrase:
    cssClass: "dsl-narrative-term"
    priority: 44
    words:
      - "anthropomorphic"
      - "humanoid race"
      - "elf race"
      - "high elf"
      - "wood elf"
      - "dark elf"
      - "drow"
      - "blood elf"
      - "dwarf race"
      - "mountain dwarf"
      - "hill dwarf"
      - "halfling"
      - "gnome"
      - "orc"
      - "goblin"
      - "hobgoblin"
      - "bugbear"
      - "ogre"
      - "troll"
      - "giant kin"
      - "frost giant"
      - "fire giant"
      - "storm giant"
      - "cloud giant"
      - "dragonborn"
      - "tiefling"
      - "aasimar"
      - "genasi"
      - "goliath"
      - "tabaxi"
      - "dragonkin"
      - "lizardfolk"
      - "kobold"
      - "draconian"
      - "saurian"
      - "arachnid"
      - "insectoid"
      - "mantis warrior"
      - "beetle warrior"
      - "mothman"
      - "arachne"
      - "merfolk"
      - "triton"
      - "naga"
      - "lamia"
      - "gorgon"
      - "medusa"
      - "basilisk"
      - "cockatrice"
      - "chimera"
      - "manticore"
      - "griffin"
      - "hippogriff"
      - "pegasus"
      - "unicorn"
      - "alicorn"
      - "phoenix"
      - "wyvern"
      - "hydra"
      - "western dragon"
      - "eastern dragon"
      - "wyrm"
      - "lindwurm"
      - "amphiptere"
      - "lich"
      - "vampire"
      - "werewolf"
      - "lycanthrope"
      - "zombie"
      - "ghoul"
      - "wight"
      - "specter"
      - "ghost"
      - "revenant"
      - "reaper"
      - "demon"
      - "devil"
      - "imp"
      - "gargoyle"
      - "angel"
      - "archangel"
      - "seraph"
      - "cherub"
      - "valkyrie"
      - "deity"
      - "demigod"
      - "titan"
      - "primordial"

  # ============================================================
  # 36. 武器与装备词组（v2.6.5 国外语料扩展新增）
  # 收录 longsword / katana / plasma rifle / lightsaber 等
  # 复用 dsl-tech-param 配色，priority 44
  # ============================================================

  english_weapon_gear_phrase:
    cssClass: "dsl-tech-param"
    priority: 44
    words:
      - "longsword"
      - "bastard sword"
      - "greatsword"
      - "arming sword"
      - "rapier"
      - "foil"
      - "sabre"
      - "cutlass"
      - "katana"
      - "wakizashi"
      - "nodachi"
      - "odachi"
      - "tanto"
      - "ninjato"
      - "scimitar"
      - "shamshir"
      - "falchion"
      - "gladius"
      - "spatha"
      - "viking sword"
      - "claymore"
      - "zweihander"
      - "battle axe"
      - "war axe"
      - "hand axe"
      - "throwing axe"
      - "bearded axe"
      - "double bladed axe"
      - "greataxe"
      - "halberd"
      - "glaive"
      - "guisarme"
      - "bardiche"
      - "voulge"
      - "ranseur"
      - "spetum"
      - "partisan"
      - "spear"
      - "pike"
      - "lance"
      - "javelin"
      - "trident"
      - "harpoon"
      - "bo staff"
      - "quarterstaff"
      - "war hammer"
      - "battle hammer"
      - "maul"
      - "morning star"
      - "flail"
      - "mace"
      - "club"
      - "cudgel"
      - "bludgeon"
      - "dagger"
      - "stiletto"
      - "dirk"
      - "kris"
      - "main gauche"
      - "throwing knife"
      - "shuriken"
      - "kunai"
      - "chakram"
      - "sling"
      - "blowgun"
      - "short bow"
      - "longbow"
      - "recurve bow"
      - "compound bow"
      - "crossbow"
      - "arbalest"
      - "hand cannon"
      - "flintlock pistol"
      - "musket"
      - "blunderbuss"
      - "arquebus"
      - "matchlock"
      - "wheellock"
      - "sniper rifle"
      - "assault rifle"
      - "plasma rifle"
      - "laser rifle"
      - "beam weapon"
      - "pulse weapon"
      - "railgun"
      - "gauss rifle"
      - "energy blade"
      - "plasma sword"
      - "lightsaber"
      - "vibro blade"
      - "power sword"
      - "chain sword"
      - "thunder hammer"
      - "power fist"
      - "shield generator"
      - "energy shield"
      - "force field"
      - "bulletproof vest"
      - "flak jacket"
      - "ballistic plate"
      - "riot gear"
      - "swat gear"
      - "tactical helmet"
      - "ballistic helmet"
      - "night vision goggle"
      - "gas mask"
      - "rebreather"
      - "bandolier"
      - "ammunition pouch"
      - "scabbard"
      - "sheath"
      - "holster"
      - "quiver"
      - "grappling hook"
      - "glowstick"

# ============================================================
# 分词器配置（可选，未配置时使用默认值）
# ============================================================
segmenterConfig:
  # 最大词长（字符数），超过此长度的词不会被匹配
  # 建议值 4-8，过大增加扫描成本，过小漏匹配长词
  maxWordLength: 6
  # 最小词长（字符数），小于此长度的连续段不进入分词
  # 设为 2 表示单字直接交由 06 字级规则处理
  minWordLength: 2

`;

/** 07g-director-cinematography.yaml 内置内容 */
const DIRECTOR_CINEMATOGRAPHY_YAML = `# ============================================================
# 07g-director-cinematography.yaml
# 词组词典·导演必学·摄影与镜头语言（v2.7.0 新增）
# ------------------------------------------------------------
# 包含分组（7 个）：
#   cinematography_basic       (priority 46, dsl-tech-param)     摄影基础
#   shot_size_extended         (priority 44, dsl-camera-action)  景别扩展
#   camera_angle_extended      (priority 44, dsl-camera-action)  机位角度
#   camera_movement_extended   (priority 44, dsl-camera-action)  运镜扩展
#   focal_length_phrase        (priority 47, dsl-tech-param)     焦距镜头
#   composition_phrase         (priority 46, dsl-tech-param)     构图方法
#   depth_of_field_phrase      (priority 47, dsl-tech-param)     景深控制
# ============================================================

wordLexicon:

  cinematography_basic:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- 曝光三角与拍摄模式 ---
      - "曝光三角"
      - "光圈优先"
      - "快门优先"
      - "手动模式"
      - "程序自动"
      - "全自动模式"
      - "情景模式"
      - "光圈值"
      - "f值"
      - "快门速度"
      - "感光度"
      - "ISO"
      - "曝光补偿"
      - "过曝"
      - "欠曝"
      - "正确曝光"
      - "曝光量"
      - "曝光组合"
      # --- 测光与对焦 ---
      - "评价测光"
      - "中央重点测光"
      - "点测光"
      - "局部测光"
      - "矩阵测光"
      - "自动对焦"
      - "单次自动对焦"
      - "连续自动对焦"
      - "手动对焦"
      - "AF-S"
      - "AF-C"
      - "AF-F"
      - "对焦距离"
      - "最近对焦"
      # --- 白平衡与画幅 ---
      - "白平衡"
      - "自动白平衡"
      - "色温"
      - "画幅"
      - "APS-C画幅"
      - "全画幅"
      - "中画幅"
      - "大画幅"
      - "画幅比"
      - "宽高比"
      - "视角"
      - "透视"
      - "放大倍率"
      - "焦距转换系数"

  shot_size_extended:
    cssClass: "dsl-camera-action"
    priority: 44
    words:
      # --- 基础景别 ---
      - "大远景"
      - "远景"
      - "全景"
      - "中全景"
      - "中景"
      - "中近景"
      - "近景"
      - "特写"
      - "大特写"
      # --- 人物景别 ---
      - "膝像"
      - "胸像"
      - "全身"
      - "半身"
      - "七分身"
      - "头肩像"
      - "面部特写"
      - "眼部特写"
      - "手部特写"
      # --- 特殊景别 ---
      - "极远景"
      - "超远景"
      - "极特写"
      - "微距景别"
      - "环境景别"
      - "细节景别"

  camera_angle_extended:
    cssClass: "dsl-camera-action"
    priority: 44
    words:
      # --- 水平角度 ---
      - "正面角度"
      - "侧面角度"
      - "背面角度"
      - "前侧面"
      - "后侧面"
      # --- 垂直角度 ---
      - "仰拍"
      - "俯拍"
      - "平视"
      - "鸟瞰"
      - "虫眼视角"
      # --- 特殊角度 ---
      - "荷兰角"
      - "倾斜角度"
      - "过肩镜头"
      - "主观视角"
      - "客观视角"
      - "上帝视角"
      - "全知视角"
      # --- 视点类型 ---
      - "主观视点"
      - "客观视点"
      - "全知视点"
      - "旁观者视点"
      - "第一人称视角"
      - "第三人称视角"

  camera_movement_extended:
    cssClass: "dsl-camera-action"
    priority: 44
    words:
      # --- 基础运镜 ---
      - "推镜头"
      - "拉镜头"
      - "摇镜头"
      - "移镜头"
      - "跟镜头"
      - "升降镜头"
      - "变焦镜头"
      # --- 复合运镜 ---
      - "综合运镜"
      - "弧形运镜"
      - "螺旋运镜"
      - "之字形运镜"
      - "波浪式运镜"
      - "对角推移"
      # --- 运镜方式 ---
      - "手持摄影"
      - "稳定器"
      - "肩扛"
      - "胸托"
      - "低角度跟拍"
      - "高角度跟拍"
      - "斯坦尼康"
      - "航拍"
      - "无人机拍摄"
      # --- 长镜头 ---
      - "长镜头"
      - "内部蒙太奇"
      - "一镜到底"
      - "调度长镜头"
      - "深焦长镜头"

  focal_length_phrase:
    cssClass: "dsl-tech-param"
    priority: 47
    words:
      # --- 镜头类型 ---
      - "标准镜头"
      - "广角镜头"
      - "长焦镜头"
      - "鱼眼镜头"
      - "微距镜头"
      - "定焦镜头"
      - "变焦镜头"
      - "移轴镜头"
      - "折返镜头"
      - "软焦镜头"
      # --- 焦段分类 ---
      - "超广角"
      - "广角"
      - "标准焦段"
      - "中长焦"
      - "长焦"
      - "超长焦"
      - "望远镜头"
      # --- 光圈特性 ---
      - "大光圈"
      - "小光圈"
      - "恒定光圈"
      - "非恒定光圈"
      - "最大光圈"
      - "最小光圈"
      # --- 镜头参数 ---
      - "焦距"
      - "焦段"
      - "焦段范围"
      - "视角范围"
      - "最近对焦距离"
      - "放大倍率"

  composition_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- 基础构图 ---
      - "三分法"
      - "黄金分割"
      - "对称构图"
      - "引导线构图"
      - "框中框"
      - "对角线构图"
      - "螺旋构图"
      - "圆形构图"
      # --- 几何构图 ---
      - "三角形构图"
      - "L形构图"
      - "S形构图"
      - "十字形构图"
      - "放射形构图"
      - "对分构图"
      # --- 构图元素 ---
      - "留白"
      - "画框"
      - "视觉中心"
      - "画面主体"
      - "前景"
      - "中景"
      - "背景"
      - "层次感"
      - "纵深感"
      - "视觉引导"
      # --- 构图原则 ---
      - "平衡构图"
      - "不平衡构图"
      - "动态构图"
      - "静态构图"
      - "封闭式构图"
      - "开放式构图"

  depth_of_field_phrase:
    cssClass: "dsl-tech-param"
    priority: 47
    words:
      # --- 景深类型 ---
      - "浅景深"
      - "深景深"
      - "中等景深"
      - "极浅景深"
      - "超焦距"
      # --- 景深要素 ---
      - "焦平面"
      - "弥散圆"
      - "景深预览"
      - "景深范围"
      - "清晰范围"
      # --- 景深控制 ---
      - "光圈与景深"
      - "焦距与景深"
      - "拍摄距离与景深"
      - "背景虚化"
      - "前景虚化"
      - "焦外成像"
`;

/** 07h-director-lighting-color.yaml 内置内容 */
const DIRECTOR_LIGHTING_COLOR_YAML = `# ============================================================
# 07h-director-lighting-color.yaml
# 词组词典·导演必学·光影与色彩（v2.7.0 新增）
# ------------------------------------------------------------
# 包含分组（6 个）：
#   lighting_basic       (priority 41, dsl-light-word)       布光基础
#   light_quality        (priority 41, dsl-light-word)       光质光位
#   light_ratio          (priority 41, dsl-light-word)       光比反差
#   color_theory         (priority 46, dsl-tech-param)       色彩理论
#   color_psychology     (priority 42, dsl-narrative-term)   色彩心理
#   color_grading_style  (priority 39, dsl-tech-param)       调色风格
# ============================================================

wordLexicon:

  lighting_basic:
    cssClass: "dsl-light-word"
    priority: 41
    words:
      # --- 三点布光 ---
      - "主光"
      - "辅光"
      - "轮廓光"
      - "背景光"
      - "眼神光"
      - "发丝光"
      - "侧光"
      - "顶光"
      - "底光"
      # --- 光位 ---
      - "顺光"
      - "逆光"
      - "侧逆光"
      - "前侧光"
      - "正侧光"
      - "后侧光"
      - "顶光"
      - "底光"
      - "背景光"
      # --- 特殊布光 ---
      - "伦勃朗光"
      - "蝴蝶光"
      - "环形光"
      - "分割光"
      - "修饰光"
      - "效果光"
      - "环境光"

  light_quality:
    cssClass: "dsl-light-word"
    priority: 41
    words:
      # --- 光质 ---
      - "硬光"
      - "软光"
      - "柔光"
      - "散射光"
      - "直射光"
      - "反射光"
      # --- 光源类型 ---
      - "自然光"
      - "人造光"
      - "混合光"
      - "连续光"
      - "闪光光"
      - "钨丝灯"
      - "日光灯"
      - "LED灯"
      - "HMI灯"
      # --- 光位变化 ---
      - "高位光"
      - "中位光"
      - "低位光"
      - "水平光"
      - "垂直光"
      - "斜射光"

  light_ratio:
    cssClass: "dsl-light-word"
    priority: 41
    words:
      # --- 影调 ---
      - "高调"
      - "低调"
      - "中调"
      - "高反差"
      - "低反差"
      - "明暗对比"
      - "中间调"
      # --- 光比 ---
      - "大光比"
      - "小光比"
      - "光比控制"
      - "明暗分布"
      - "阴影处理"
      - "高光保留"
      # --- 反差控制 ---
      - "对比度"
      - "层次感"
      - "立体感"
      - "平面感"
      - "空间感"

  color_theory:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- 色彩三要素 ---
      - "色相"
      - "饱和度"
      - "明度"
      - "HSL"
      - "HSV"
      - "RGB"
      - "CMYK"
      # --- 色彩系统 ---
      - "色温"
      - "色调"
      - "色域"
      - "色相环"
      - "色轮"
      - "三原色"
      - "三间色"
      - "再间色"
      # --- 色彩关系 ---
      - "互补色"
      - "相邻色"
      - "对比色"
      - "同类色"
      - "消色"

  color_psychology:
    cssClass: "dsl-narrative-term"
    priority: 42
    words:
      # --- 色彩温度 ---
      - "暖色"
      - "冷色"
      - "中性色"
      - "暖色调"
      - "冷色调"
      # --- 配色方案 ---
      - "单色配色"
      - "类比配色"
      - "互补配色"
      - "三角配色"
      - "分裂互补"
      - "矩形配色"
      # --- 色彩象征 ---
      - "红色象征"
      - "蓝色象征"
      - "黄色象征"
      - "绿色象征"
      - "紫色象征"
      - "黑色象征"
      - "白色象征"
      # --- 色彩情绪 ---
      - "热情色彩"
      - "忧郁色彩"
      - "宁静色彩"
      - "紧张色彩"
      - "温暖色彩"
      - "冷漠色彩"

  color_grading_style:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- 调色风格 ---
      - "青橙调"
      - "黑白调"
      - "复古调"
      - "日系调"
      - "电影感调色"
      - "高饱和"
      - "低饱和"
      - "高级灰"
      # --- 色调倾向 ---
      - "暖色调"
      - "冷色调"
      - "中性色调"
      - "低对比"
      - "高对比"
      - "棕褐色调"
      - "蓝色调"
      # --- 调色类型 ---
      - "一级调色"
      - "二级调色"
      - "风格化调色"
      - "LUT应用"
      - "色彩匹配"
`;

/** 07i-director-editing-sound.yaml 内置内容 */
const DIRECTOR_EDITING_SOUND_YAML = `# ============================================================
# 07i-director-editing-sound.yaml
# 词组词典·导演必学·剪辑与声音（v2.7.0 新增）
# ------------------------------------------------------------
# 包含分组（5 个）：
#   editing_basic      (priority 39, dsl-narrative-term)  剪辑基础
#   montage_theory     (priority 39, dsl-narrative-term)  蒙太奇理论
#   editing_rhythm     (priority 39, dsl-narrative-term)  剪辑节奏
#   sound_design       (priority 39, dsl-tech-param)      声音设计
#   music_score        (priority 39, dsl-narrative-term)  配乐音乐
# ============================================================

wordLexicon:

  editing_basic:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 基础剪辑 ---
      - "切"
      - "叠化"
      - "淡入淡出"
      - "划像"
      - "定格"
      - "倒放"
      - "黑场"
      - "白场"
      # --- 剪辑类型 ---
      - "连贯性剪辑"
      - "非连贯性剪辑"
      - "跳切"
      - "匹配剪辑"
      - "动作剪辑"
      - "L切"
      - "J切"
      # --- 转场技巧 ---
      - "技巧转场"
      - "无技巧转场"
      - "直接切"
      - "淡入"
      - "淡出"
      - "溶解"
      - "划变"

  montage_theory:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 叙事蒙太奇 ---
      - "叙事蒙太奇"
      - "平行蒙太奇"
      - "交叉蒙太奇"
      - "连续蒙太奇"
      - "重复蒙太奇"
      - "线形蒙太奇"
      # --- 表现蒙太奇 ---
      - "表现蒙太奇"
      - "隐喻蒙太奇"
      - "对比蒙太奇"
      - "心理蒙太奇"
      - "抒情蒙太奇"
      - "象征蒙太奇"
      - "联想蒙太奇"
      # --- 理性蒙太奇 ---
      - "理性蒙太奇"
      - "杂耍蒙太奇"
      - "反射蒙太奇"
      - "思想蒙太奇"
      - "节奏蒙太奇"
      # --- 经典理论 ---
      - "爱森斯坦蒙太奇"
      - "库里肖夫效应"
      - "敖德萨阶梯"
      - "吸引力蒙太奇"

  editing_rhythm:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 节奏类型 ---
      - "快剪"
      - "慢剪"
      - "跳切"
      - "长镜头"
      - "节奏点"
      - "情绪剪辑"
      - "内部节奏"
      - "外部节奏"
      # --- 节奏控制 ---
      - "剪辑节奏"
      - "镜头长度"
      - "节奏变化"
      - "节奏对比"
      - "节奏递进"
      - "节奏高潮"
      # --- 情绪剪辑 ---
      - "情绪剪辑"
      - "心理剪辑"
      - "意识流剪辑"
      - "回忆剪辑"
      - "梦境剪辑"
      - "幻觉剪辑"

  sound_design:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- 声音元素 ---
      - "对白"
      - "音效"
      - "环境音"
      - "画内音"
      - "画外音"
      - "静音"
      - "拟音"
      - "混音"
      # --- 同期声 ---
      - "同期声"
      - "同期录音"
      - "现场声"
      - "Room Tone"
      - "房间声"
      - "底噪"
      # --- 后期声音 ---
      - "ADR"
      - "自动对白替换"
      - "配音"
      - "旁白"
      - "群杂"
      - "Walla"
      - "Foley"
      - "拟音"
      - "SFX"
      - "音效"
      - "SPFX"
      - "特殊音效"
      # --- 声音技术 ---
      - "声像"
      - "立体声"
      - "环绕声"
      - "全景声"
      - "Dolby Atmos"
      - "混录"
      - "M&E"
      - "国际声轨"

  music_score:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 音乐类型 ---
      - "主题音乐"
      - "场景音乐"
      - "源音乐"
      - "配乐"
      - "原声带"
      - "Leitmotif"
      - "主导动机"
      # --- 声源类型 ---
      - "有声源音乐"
      - "无声源音乐"
      - "画内音乐"
      - "画外音乐"
      # --- 声画关系 ---
      - "声画同步"
      - "声画对立"
      - "声画对位"
      - "声画分离"
`;

/** 07j-director-performance-screenplay.yaml 内置内容 */
const DIRECTOR_PERFORMANCE_SCREENPLAY_YAML = `# ============================================================
# 07j-director-performance-screenplay.yaml
# 词组词典·导演必学·表演与剧作（v2.7.0 新增）
# ------------------------------------------------------------
# 包含分组（6 个）：
#   performance_theory     (priority 43, dsl-emotion-word)        表演理论
#   emotion_expression     (priority 43, dsl-emotion-word)        情绪表达
#   body_language          (priority 42, dsl-lexicon-performance) 肢体语言
#   screenplay_structure   (priority 39, dsl-narrative-term)      剧作结构
#   story_element          (priority 39, dsl-narrative-term)      故事元素
#   dialogue_craft         (priority 39, dsl-narrative-term)      对白技巧
# ============================================================

wordLexicon:

  performance_theory:
    cssClass: "dsl-emotion-word"
    priority: 43
    words:
      # --- 三大体系 ---
      - "体验派"
      - "表现派"
      - "方法派"
      - "斯坦尼斯拉夫斯基"
      - "布莱希特"
      - "梅兰芳"
      # --- 表演流派 ---
      - "斯派"
      - "布派"
      - "梅派"
      - "即兴表演"
      - "社会表演"
      - "人类表演学"
      # --- 理论概念 ---
      - "间离效果"
      - "陌生化效果"
      - "情绪记忆"
      - "规定情境"
      - "真实信念"
      - "解放天性"
      # --- 训练方法 ---
      - "动物模拟"
      - "无实物练习"
      - "观察生活练习"
      - "即兴创作"

  emotion_expression:
    cssClass: "dsl-emotion-word"
    priority: 43
    words:
      # --- 基础情绪 ---
      - "喜"
      - "怒"
      - "哀"
      - "惧"
      - "惊讶"
      - "厌恶"
      - "轻蔑"
      - "羞愧"
      # --- 复合情绪 ---
      - "悲喜交加"
      - "百感交集"
      - "心旷神怡"
      - "心猿意马"
      - "若有所思"
      - "若有所失"
      # --- 情绪状态 ---
      - "激动"
      - "平静"
      - "紧张"
      - "放松"
      - "焦虑"
      - "安心"
      - "兴奋"
      - "沮丧"

  body_language:
    cssClass: "dsl-lexicon-performance"
    priority: 42
    words:
      # --- 表情 ---
      - "眼神"
      - "目光"
      - "笑容"
      - "神色"
      - "表情"
      - "面部表情"
      - "微表情"
      # --- 动作 ---
      - "手势"
      - "体态"
      - "走位"
      - "姿态"
      - "肢体动作"
      - "形体动作"
      - "心理动作"
      - "语言动作"
      # --- 程式化 ---
      - "台步"
      - "手势"
      - "身段"
      - "唱念做打"
      - "手眼身法步"
      - "生旦净丑"

  screenplay_structure:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 结构类型 ---
      - "三幕结构"
      - "五幕结构"
      - "英雄之旅"
      - "起承转合"
      - "悉德菲尔德范式"
      # --- 结构要素 ---
      - "激励事件"
      - "故事中点"
      - "灵魂黑夜"
      - "高潮"
      - "结局"
      - "情节点一"
      - "情节点二"
      # --- 结构层级 ---
      - "幕"
      - "序列"
      - "场景"
      - "节拍"
      - "段落"
      - "场次"
      # --- 叙事方式 ---
      - "线性叙事"
      - "非线性叙事"
      - "环形叙事"
      - "倒叙"
      - "插叙"
      - "多线叙事"
      - "重复线性叙事"

  story_element:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 人物元素 ---
      - "人物弧光"
      - "正向弧光"
      - "负向弧光"
      - "静态弧光"
      - "人物动机"
      - "人物目标"
      # --- 冲突元素 ---
      - "冲突"
      - "阻碍"
      - "转折"
      - "伏笔"
      - "悬念"
      - "铺垫"
      - "呼应"
      # --- 故事核心 ---
      - "主题"
      - "题材"
      - "类型"
      - "故事核心"
      - "故事梗概"
      - "人物小传"

  dialogue_craft:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 对白形式 ---
      - "潜台词"
      - "独白"
      - "旁白"
      - "对白节奏"
      - "画外音"
      - "独角戏"
      # --- 对白技巧 ---
      - "人物语言"
      - "动作语言"
      - "对白铺垫"
      - "对白呼应"
      - "对白冲突"
`;

/** 07k-director-genre-production.yaml 内置内容 */
const DIRECTOR_GENRE_PRODUCTION_YAML = `# ============================================================
# 07k-director-genre-production.yaml
# 词组词典·导演必学·类型/制片/电影史（v2.7.0 新增）
# ------------------------------------------------------------
# 包含分组（5 个）：
#   genre_film             (priority 39, dsl-narrative-term) 类型片
#   film_movement          (priority 39, dsl-narrative-term) 电影流派
#   production_management  (priority 38, dsl-param-key)      制片管理
#   post_production        (priority 39, dsl-tech-param)     后期制作
#   film_theory            (priority 39, dsl-narrative-term) 电影理论
# ============================================================

wordLexicon:

  genre_film:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 基础类型 ---
      - "剧情片"
      - "喜剧片"
      - "悬疑片"
      - "恐怖片"
      - "动作片"
      - "科幻片"
      - "奇幻片"
      - "纪录片"
      - "动画片"
      # --- 经典类型 ---
      - "黑色电影"
      - "西部片"
      - "歌舞片"
      - "爱情片"
      - "犯罪片"
      - "惊悚片"
      - "冒险片"
      - "战争片"
      # --- 扩展类型 ---
      - "传记片"
      - "历史片"
      - "灾难片"
      - "武侠片"
      - "神话片"
      - "音乐片"
      - "家庭片"
      - "史诗片"
      - "警匪片"
      # --- 子类型 ---
      - "神经喜剧"
      - "黑帮片"
      - "太空歌剧"
      - "超级英雄片"
      - "B级片"
      - "独立电影"
      - "艺术片"
      - "商业片"

  film_movement:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 经典流派 ---
      - "德国表现主义"
      - "意大利新现实主义"
      - "法国新浪潮"
      - "新好莱坞"
      - "苏联蒙太奇学派"
      # --- 欧洲流派 ---
      - "法国诗意现实主义"
      - "英国自由电影"
      - "新德国电影"
      - "Dogme 95"
      # --- 先锋派 ---
      - "超现实主义"
      - "印象派电影"
      - "达达主义"
      - "表现主义电影"
      # --- 亚洲流派 ---
      - "日本电影新浪潮"
      - "中国第五代导演"
      - "中国第六代导演"
      - "香港新浪潮"
      - "台湾新电影"

  production_management:
    cssClass: "dsl-param-key"
    priority: 38
    words:
      # --- 制片流程 ---
      - "前期制作"
      - "拍摄期间"
      - "后期制作"
      - "试映"
      - "首映"
      - "发行"
      # --- 制片管理 ---
      - "拍摄计划"
      - "预算控制"
      - "场景管理"
      - "演员调度"
      - "通告单"
      - "分镜表"
      - "剧本拆解"
      # --- 制片角色 ---
      - "制片人"
      - "执行制片人"
      - "制片主任"
      - "场记"
      - "剧务"
      - "统筹"
      - "外联制片"
      # --- 拍摄管理 ---
      - "拍摄日程"
      - "场景调度"
      - "通告时间"
      - "拍摄地点"
      - "演员档期"
      - "设备租赁"

  post_production:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- 剪辑流程 ---
      - "粗剪"
      - "精剪"
      - "画面锁定"
      - "EDL"
      - "数字中间片"
      - "剪辑决策清单"
      # --- 后期环节 ---
      - "剪辑"
      - "特效"
      - "调色"
      - "混音"
      - "字幕"
      - "输出格式"
      - "合成"
      - "视觉特效"
      - "VFX"
      - "CGI"
      # --- 后期角色 ---
      - "剪辑师"
      - "调色师"
      - "混音师"
      - "特效师"
      - "合成师"
      - "字幕师"
      # --- 后期软件 ---
      - "Premiere"
      - "Final Cut"
      - "Avid"
      - "DaVinci Resolve"
      - "After Effects"
      - "Nuke"
      # --- 输出格式 ---
      - "院线版本"
      - "流媒体版本"
      - "电视版本"
      - "IMAX版本"
      - "3D版本"
      - "4K版本"

  film_theory:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- 经典理论 ---
      - "作者论"
      - "类型论"
      - "形式主义"
      - "写实主义"
      - "现实主义"
      - "现象学"
      # --- 现代理论 ---
      - "符号学"
      - "精神分析"
      - "女性主义"
      - "意识形态批评"
      - "文化研究"
      - "结构主义"
      - "后现代主义"
      # --- 理论家 ---
      - "巴赞"
      - "爱森斯坦"
      - "麦茨"
      - "米特里"
      - "德勒兹"
      - "拉康"
      - "阿尔都塞"
      # --- 理论概念 ---
      - "场面调度"
      - "长镜头理论"
      - "景深镜头"
      - "蒙太奇理论"
      - "镜像理论"
      - "凝视理论"
`;

/**
 * 获取内置规则文件映射
 * @returns 文件名到文件内容的映射
 */
export function getBuiltinRuleFiles(): Record<string, string> {
  return {
    '01-base-patterns.yaml': BASE_PATTERNS_YAML,
    '02-semantic-context.yaml': SEMANTIC_CONTEXT_YAML,
    '03-lexicon-optional.yaml': LEXICON_OPTIONAL_YAML,
    '04-theme-color.yaml': THEME_COLOR_YAML,
    '05-priority.yaml': PRIORITY_YAML,
    '06-char-lexicon.yaml': CHAR_LEXICON_YAML,
    '07-word-lexicon.yaml': WORD_LEXICON_YAML,
    '07a-constraint-tech-phrase.yaml': CONSTRAINT_TECH_PHRASE_YAML,
    '07b-narrative-scene-phrase.yaml': NARRATIVE_SCENE_PHRASE_YAML,
    '07c-camera-action-phrase.yaml': CAMERA_ACTION_PHRASE_YAML,
    '07d-english-core-phrase.yaml': ENGLISH_CORE_PHRASE_YAML,
    '07e-english-extended-phrase.yaml': ENGLISH_EXTENDED_PHRASE_YAML,
    '07f-english-subject-phrase.yaml': ENGLISH_SUBJECT_PHRASE_YAML,
    '07g-director-cinematography.yaml': DIRECTOR_CINEMATOGRAPHY_YAML,
    '07h-director-lighting-color.yaml': DIRECTOR_LIGHTING_COLOR_YAML,
    '07i-director-editing-sound.yaml': DIRECTOR_EDITING_SOUND_YAML,
    '07j-director-performance-screenplay.yaml': DIRECTOR_PERFORMANCE_SCREENPLAY_YAML,
    '07k-director-genre-production.yaml': DIRECTOR_GENRE_PRODUCTION_YAML,
  };
}
