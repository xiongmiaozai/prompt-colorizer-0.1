# Prompt Colorizer 提示词着色插件 — UI 设计规范 v3

> 版本：3.0（规划稿）｜适用插件：prompt-colorizer v2.7.0+｜作者：芝世
> 本规范用于指导插件界面（设置面板 / 浮动面板 / 文件浏览器标记 / 着色输出）的统一视觉设计与后续代码实现。
> 原则：**YAML 驱动着色、CSS 变量集中管理、kebab-case 语义命名、中文描述性命名、明暗双主题自适应。**

---

## 1. 设计目标与原则

### 1.1 目标

1. **零学习成本**：新用户 30 秒内理解插件能做什么、如何开启。
2. **规则可视化**：高亮规则不再是开关列表，而是「有颜色的、可预览的」对象。
3. **场景化配置**：用「智能体预设」把复杂的高亮组合抽象为一句人话（如「提示词工程师」）。
4. **与 Obsidian 浑然一体**：不制造割裂感，UI 完全基于 Obsidian 原生组件增强，而非重新造轮子。

### 1.2 六项设计原则

| 原则 | 说明 | 落地手段 |
| --- | --- | --- |
| P1 内容优先 | 着色是功能本身，设置是辅助 | 概览页放实时预览，开关二次化 |
| P2 可感知 | 状态即时可见（开关、规则、拉取状态） | 状态点、徽章、时间线 |
| P3 可反馈 | 每处交互有 hover / active / 焦点态 | 统一 `--pc-transition` |
| P4 可预期 | 同类元素同构型、同间距、同圆角 | 4px 基线网格 + 标准化组件 |
| P5 可容错 | 危险操作需确认、失败可回滚 | 重置确认框、拉取报告、缓存回滚 |
| P6 可降噪 | 高频设置显式呈现，低频规则折叠收纳 | Tab 分页 + 可折叠分区 |

---

## 2. 设计系统（Design Tokens）

> 命名硬性规范：**全部使用 kebab-case 小写 + 连字符**；语义化命名，禁止魔数散落。
> 两类变量各司其职：
> - `--pc-*`：插件界面静态 token（间距/圆角/阴影/中性色），写死在 `styles.css`。
> - `--dsl-*`：着色语义 token（语法颜色），由线上 YAML `colors:` 区块**动态生成**并注入 `#prompt-colorizer-color-vars`，插件代码与 UI 样式只 `var()` 引用，绝不硬编码颜色值。

### 2.1 命名规范

```
--pc-{组}-{语义}[-{变体}]
--dsl-{语义}[-{变体}]

示例：
--pc-space-xl          （间距）
--pc-radius-md         （圆角）
--pc-color-danger      （语义色）
--pc-color-danger-soft （语义色·柔和底）
--dsl-role-system      （DSL 角色色）
--dsl-role-user-soft   （DSL 角色色·柔和底）
```

### 2.2 间距（基于 4px 基线网格）

| Token | 值 | 用途 |
| --- | --- | --- |
| `--pc-space-xs` | 2px | 内联图标间距 |
| `--pc-space-sm` | 4px | 紧凑组件内边距 |
| `--pc-space-md` | 8px | 列表项内边距 |
| `--pc-space-lg` | 12px | 常规间距 |
| `--pc-space-xl` | 16px | 卡片内边距 |
| `--pc-space-2xl` | 20px | 卡片块间距 |
| `--pc-space-3xl` | 24px | 区块分隔 |
| `--pc-space-4xl` | 32px | 大区块 |
| `--pc-space-5xl` | 40px | 页级留白 |

### 2.3 圆角

| Token | 值 | 用途 |
| --- | --- | --- |
| `--pc-radius-sm` | 4px | 按钮、输入框 |
| `--pc-radius-md` | 8px | 设置卡片、浮层 |
| `--pc-radius-lg` | 12px | 大卡片、对话框 |
| `--pc-radius-xl` | 16px | 弹窗 |
| `--pc-radius-full` | 9999px | 圆点、胶囊、开关 |

### 2.4 阴影与过渡

| Token | 值 | 用途 |
| --- | --- | --- |
| `--pc-shadow-xs` | 0 1px 2px rgba(0,0,0,.03) | 按钮 hover |
| `--pc-shadow-sm` | 0 1px 3px, 0 1px 2px | 默认卡片 |
| `--pc-shadow-md` | 0 3px 10px, 0 1px 3px | 卡片 hover |
| `--pc-shadow-lg` | 0 6px 20px, 0 2px 6px | 弹窗/浮层 |
| `--pc-shadow-focus` | 0 0 0 3px rgba(59,130,246,.12) | 聚焦环 |
| `--pc-transition-fast` | 100ms cubic-bezier(.25,.46,.45,.94) | 微交互 |
| `--pc-transition` | 150ms cubic-bezier(.25,.46,.45,.94) | 常规过渡 |
| `--pc-transition-slow` | 250ms cubic-bezier(.25,.46,.45,.94) | 进出场动画 |

> 实际取值以 `styles.css` 顶部 `:root` 区块为准，参见 §6 代码示例。

### 2.5 语义色（`--pc-*` 静态）

| Token | 默认 | 用途 |
| --- | --- | --- |
| `--pc-accent` | #3b82f6 | 主交互色（强调） |
| `--pc-info` `--pc-info-soft` `--pc-info-border` | #3b82f6 系 | 信息/主按钮/聚焦 |
| `--pc-success` 系 | #10b981 | 成功、开启态、拉取成功 |
| `--pc-warning` 系 | #d97706 | 警告 |
| `--pc-danger` 系 | #ef4444 | 危险、重置、失败 |
| `--pc-purple` `--pc-cyan` `--pc-pink` `--pc-orange` `--pc-amber` 系 | 对应色阶 | 文件类型/分类色 |
| `--pc-gray-100…700` | #f8fafc…#475569 | 中性灰阶 |

> 全部语义色**必须以 `var(--dsl-*)` 优先回退**（如 `--pc-danger: var(--dsl-danger, #ef4444)`），保证由 YAML colors 令牌可整体换肤。

### 2.6 字体排版

| Token | 说明 |
| --- | --- |
| `--pc-font-cn` | 中文字体栈（PingFang SC / 微软雅黑...） |
| `--pc-font-mono` | 等宽字体栈（JetBrains Mono） |
| `--pc-weight-*` | 400/500/600/700/800 六级字重 |
| 正文/标题/说明 | 统一使用 Obsidian `--font-ui-smaller` 等字号变量 |

### 2.7 毛玻璃（Glassmorphism）

- 卡片背景：`var(--pc-card-bg)` + `backdrop-filter: blur(var(--pc-blur-amount)) saturate(...)`。
- 移动端（≤600px）关闭毛玻璃，避免性能损耗。

---

## 3. 组件库（Component Library）

### 3.1 通用结构约定

所有组件类名以 `pc-` 前缀 + kebab-case 命名。同类交互组件的 hover / active / focus 状态必须完整提供。

### 3.2 组件总览

| 组件 | 类名 | 说明 |
| --- | --- | --- |
| 状态概览条 | `.pc-status-bar` | 插件三大能力开关状态 + 规则计数 |
| 预设/智能体条 | `.pc-preset-bar` / `.pc-agent-bar` | 智能体预设快速切换（v3 升级） |
| 设置卡片 | `.pc-setting-card` | 分区容器，含图标标题与描述 |
| 设置项 | `.setting-item`（原生）| 一行设置：名称/描述/控件 |
| 可折叠分区 | `.pc-collapsible` | 规则组收纳，默认折叠 |
| Tab 导航 | `.pc-tab-nav` / `.pc-tab-item` | 4 页面切换 |
| 颜色预览圆点 | `.pc-color-preview` / `.pc-rule-color-dot` | 颜色可视化 |
| 颜色浮层面板 | `.pc-color-popover` | 选中文本后的快速着色 |
| 颜色选择弹窗 | 使用原生 Modal 封装 | 新建/编辑自定义文本色 |
| 批量操作行 | `.pc-batch-row` / `.pc-batch-btn` | 全选/清空/批量操作 |
| 文件标记 | `.pc-file-dot` / `.pc-file-type-badge` | 文件浏览器着色 |
| 拉取报告 | `.pc-pull-report` 系 | 规则更新详情 |

### 3.3 关键组件详设

#### 3.3.1 智能体预设（v3 新增 / 替代旧「快速预设」）

**背景**：旧版 4 个固定预设（全部/基础/视频/极简）不可自定义、不跨设备。v3 升级为「智能体预设」：每个预设是**一组可命名的高亮规则集合 + 推荐文件类型映射**，可创建、编辑、导入导出。

```
┌────────────────────────────────────────────┐
│  智能体预设  （+ 新建预设）                    │
│  ┌───────┐ ┌──────────┐ ┌───────────┐     │
│  │提示词工程师│ │ 视频分镜师  │ │ SD 画师    │ +   │
│  │  ✓启用  │ │  ✓12规则  │ │  ✓9规则    │     │
│  └───────┘ └──────────┘ └───────────┘     │
└────────────────────────────────────────────┘
```

**规范**：
- 每个预设为一张小卡（`pc-agent-card`）：图标 + 中文名 + 短描述 + 规则数徽章 + 启用开关。
- 选中态：`active`（`--pc-info` 强调色 + 左侧 3px 实色条）。
- 支持「重命名为中文描述性名称」，例如「提示词工程师」「视频分镜师」「SD 画师」。
- 功能点：新建 / 重命名 / 复制 / 导出 / 删除；删除需确认框。

#### 3.3.2 状态概览条

```
[●编辑器已开启] [●文件着色已开启] [●阅读渲染已开启]   已加载 128 条规则
```

- 每个能力项 = 状态圆点（6px，`.on` 绿色亮光 / `.off` 灰）+ 中文标签。
- 右侧右对齐：规则计数（`pc-status-count`，数字用 `--pc-accent` 加粗）。

#### 3.3.3 高亮规则组（可折叠分区）

```
▾ 基础高亮规则（8/8）                [全选][反选]
   ├─ ● 变量占位符            ⚑{{variable}}     [已开]
   ├─ ● 角色标签              ⚑<system>        [已开]
   └ ...（折叠时收起来）
```

- **颜色预览圆点**（`pc-rule-color-dot`）读取该规则对应 `--dsl-*` 的实际颜色——规则不是抽象的开关，而是「一个颜色」。
- 右侧规则计数徽章：`已启用/总数`；批量操作行在分区内显式呈现但不干扰。

#### 3.3.4 颜色浮层面板（Popover）

```
┌── 为选中文本着色 ──────────────┐
│ 文本「梵高风格」                  │
│ ○ ○ ● ○ ○ ○ ○ ○ ○ ○          │   ← 常用色格
│ [自定义...] [移除颜色]     │
└─────────────────────────────────└
```

- 触发：选中文本后 350ms 自动弹出（可配置、可关闭）。
- 位置：选区下方优先，空间不足自动翻转（`.pc-popover-above`）。
- 动效：`pc-popover-visible` 淡入上移；隐藏时 `pc-popover-hiding` 淡出。

#### 3.3.5 颜色选择弹窗（Modal）

- 标题：中文「为选中文本添加颜色」。
- 控件：文本（预填选中内容，可改）+ 色板 + 十六进制输入 + 大小写/全词匹配开关。
- 底部操作：确定（主按钮）/ 取消。
- 编辑态：预填既有规则，标题变「编辑颜色规则」。

#### 3.3.6 文件浏览器标记

| 形态 | 类名 | 规则 |
| --- | --- | --- |
| 颜色圆点 | `.pc-file-dot` | 8px 实心圆，文件名左侧，hover 放大 1.2x |
| 类型小标 | `.pc-file-type-badge` | 胶囊文字徽章（可选显示） |
| 文件名着色 | 直接在 `.nav-file-title` 上加类型色内联 var | 可选 |

文件类型 9 类颜色：system→红 / user→蓝 / assistant→绿 / tool→橙 / example→青 / variable→琥珀 / template→紫 / video→粉 / none→灰。**颜色值须从 `--dsl-*` 或 `--pc-*` 引用，YAML 可覆盖。**

### 3.4 交互状态规范

| 状态 | 通用表现 |
| --- | --- |
| default | 卡片描边 `--pc-card-border`，扁平 |
| hover | 卡片阴影升 `--pc-shadow-md`，描边变深；按钮上移 1px |
| active | 缩放 0.97；开关开态 `--pc-toggle-on` |
| focus | `--pc-shadow-focus` 聚焦环 |
| disabled | 透明度 0.5，禁止指针 |
| transition | 全部经统一 `--pc-transition` |

---

## 4. 页面布局与线框图（设置面板 4 Tab）

```
┌──────────────────────────────────────────────┐
│ [▧概览] [✓高亮规则] [☁规则引擎] [📁文件与显示]    │  ← pc-tab-nav（固定顶）
├──────────────────────────────────────────────┤
│                                              │
│  ▍状态概览条（能力开关 + 规则数）                │
│  ▍智能体预设条（提示词工程师/视频分镜师/SD画师）    │
│  ▍实时预览卡片：示例提示词 → 实际着色效果          │  ← v3 新增
│  ▍核心设置卡片（全局开关/颜色模式/语言）           │
└──────────────────────────────────────────────┘
```

### 4.1 概览 Tab（overview）

- **状态概览条**：三大能力即时状态（§3.3.1）。
- **智能体预设条**：一键切换整套规则组合（§3.3.1）。
- **实时高亮预览卡（v3 新增）**：内置一段示例提示词，按当前规则组合实时渲染着色，`data-` 驱动 + 插件高亮引擎渲染。改动规则后立即可视，无需跳转。
- **核心设置卡**：全局开关 ×3、颜色模式、界面语言。

### 4.2 高亮规则 Tab（highlight）

- 顶部预设条与全局「启用编辑器高亮」开关。
- 四个可折叠分区（基础 / 视频提示词 / SD·ComfyUI / 视频扩展），分区由规则类别自动归类（来自 YAML `categories`）。
- 每个规则项：颜色圆点 + 中文名 + 简短示例（等宽字体）+ 开关。

### 4.3 规则引擎 Tab（engine）

- **源状态卡**：当前激活源（GitHub 官方 / Gitee 镜像 / jsDelivr CDN），卡片式三选一 + 连通性图标（✓ 可达 / ✗ 失败），带 token 输入（密码框）。
- **更新控制卡**：立即检查更新按钮 + 自动更新开关 + 更新间隔滑块 + 清缓存 + 重载规则。
- **拉取报告卡**：上次拉取的时间线总结（成功徽章 / 失败徽章 + 原因），文件列表与规则/词条统计。

### 4.4 文件与显示 Tab（files）

- **文件类型颜色表**：9 行列表，每行 = 色圆点 + 中文类型名 + 色板选择器 + 图标名。
- **类型检测卡**：frontmatter / 文件夹 / 文件名前缀三开关 + 文件夹映射列表（可增删）。
- **显示选项卡**：颜色圆点开关 + 大小滑块、文件名着色、角色边框。

---

## 5. 动效与过渡规范

| 场景 | 动效 | 时长 |
| --- | --- | --- |
| 卡片入场 | 淡入 + 上移 6px | 200ms |
| 状态条入场 | 淡入 + 左移6px | 250ms |
| hover | 阴影抬升 / 上移1px | 150ms |
| 浮层显隐 | 淡入上移 / 淡出 | 180ms |
| 折叠 | 高度过渡（≤240ms 快速） | 200ms |
| Tab 切换 | 内容淡入（可省） | 150ms |

> 动效**克制**：只用于「过渡与聚焦」，禁止持续动画与弹跳。

---

## 6. 代码规范示例

### 6.1 CSS 变量骨架（`styles.css`）

```css
/* ===== 1. 设计 Token ==== */
:root {
  /* 空间： --pc-space-*（§2.2） */
  --pc-space-md: 8px;

  /* 圆角： --pc-radius-*（§2.3） */
  --pc-radius-md: 8px;

  /* 语义色：优先引用 --dsl-*，YAML 可整体换肤 */
  --pc-danger: var(--dsl-danger, #ef4444);
  --pc-danger-soft: var(--dsl-danger-soft, rgba(239, 68, 68, 0.06));

  /* 静态色 */
  --pc-accent: #3b82f6;
}
body.theme-dark {
  /* 暗色覆写：卡片背景 / 描边 / 强调 */
}
```

### 6.2 组件 DOM 骨架（以可折叠分区为例）

```ts
// 组名：prompt-colorizer-rule-group（可折叠分区）
const col = parent.createDiv({ cls: 'pc-collapsible' });
col.createDiv({ cls: 'pc-collapsible-header', text: t('settings.basicRules') });
const body = col.createDiv({ cls: 'pc-collapsible-content' });

// 打开/折叠
col.toggleClass('collapsed', !open);
```

### 6.3 DSL 着色注入（保持 YAML 驱动，禁止硬编码）

```css
/* 生成物（勿手写）：由 generateStyleCss() 依据 rule-set 的 styleRules 输出 */
.dsl-role-user { color: var(--dsl-role-user); }
.dsl-role-system { color: var(--dsl-role-system); }
/* 动态注入 #prompt-colorizer-dsl-styles / #prompt-colorizer-color-vars */
```

---

## 7. 可访问性与无障碍

1. **对比度**：正文文字与背景对比度 ≥ 4.5:1（WCAG AA）；着色强调色仅用于装饰不承载唯一信息（同时有边界/图标可辨）。
2. **键盘可达**：所有交互组件可用 Tab / Enter / Space 操作（Tab 导航、折叠头、开关、色板）。
3. **焦点可见**：聚焦时统一 `--pc-shadow-focus` 环。
4. **文案清晰**：所有标签使用中文描述性名称；危险操作按钮文案含明确动词（「清空缓存」「确认重置」）。
5. **缩放适配**：≥4 倍缩放与 600px 窄窗均可用（已有 768/600 断点）。

---

## 8. 实施检查清单（Checklist）

| # | 项 | 状态 | 关联 |
| --- | --- | --- | --- |
| 1 | 设计 Token 全部 kebab-case 语义化 | — | §2 |
| 2 | DSL 着色无硬编码色值，全部 var(--dsl-*) | — | §6.3 |
| 3 | 智能体预设支持创建/重命名/导入导出 | — | §3.3.1 |
| 4 | 概览页实时高亮预览 | — | §4.1 |
| 5 | 高亮规则条目显示实际颜色圆点 | — | §3.3.3 |
| 6 | 引擎页多源卡片 + 连通性状态 | — | §4.3 |
| 7 | 全部危险操作有确认 | — | §1.2 P5 |
| 8 | 明暗两主题完整适配 | — | §2.7 |
| 9 | 中英双语文案齐备 | — | §3.4 |
| 10 | 600/768断点 + 无障碍验证 | — | §7 |

---

## 9. 与现有实现的映射

| 本规范 | 现有代码（v2.7.0） |
| --- | --- |
| StatusBar | `src/settings/setting-tab.ts` → `renderStatusBar()` |
| PresetBar → AgentBar | `renderPresetBar()` + `PRESETS` 常量 |
| SettingCard | `renderCard()` + `.pc-setting-card` |
| Collapsible | `.pc-collapsible` |
| TabNav | `renderTabNav()` + `TABS` |
| 颜色圆点 | `.pc-color-preview`、`.pc-rule-color-dot`、`.pc-file-dot` |
| Popover | `src/ui/color-popover.ts` |
| ColorModal | `src/ui/color-picker-modal.ts` |
| 规则引擎 | `renderEngineTab()` + `.pc-pull-report` |

---

*本文档为 UI 设计规范 v3 建议稿。请确认后按 Checklist 逐项实施。*