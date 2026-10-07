# 拾光记 · 前端版面重新规划

> 目标：**阅读优先**。让访客进站第一屏就看到文章，让长文有导航，让每个页面的骨架一致。
> 本文只做规划（含实测数据与逐文件改动清单），不含代码改动。

---

## 0. 结论摘要

现状的问题不是「不好看」——衬线标题 + 无衬线正文、oklch 暖纸配色、39 字/行的正文行宽，这些是**对的**，应当保留。
真正妨碍阅读的是三件事：**首屏被整屏海报占掉**、**列表行左侧 128px 空槽挤窄正文**、**页面骨架各写各的**。外加三处会直接挡住内容的硬缺陷。

### 规划指标（可度量）

| 指标 | 现状 | 目标 |
|---|---|---|
| 首页首篇文章标题纵坐标（1440×900） | ≈1017px（首屏之外） | ≤680px（首屏之内） |
| 首页列表行正文列宽（1440 视口） | 572px | ≥636px |
| 归档 / 标签页列表行正文列宽 | 512px | ≥700px（并加宽上限） |
| 文章正文每行字数 | 39 字 | 40–42 字（保持同档） |
| 页面顶部留白 | 8 处硬编码 `72px`，tags 两页缺失 | 统一 `calc(var(--header-h) + var(--space-3xl))` |
| 阅读进度条 | 2 条 DOM 叠加 | 1 条 |
| 小字对比度（`--text-muted`，亮色） | ≈3.87:1（低于 AA 4.5:1） | ≥4.5:1 |
| 长文导航 | 无目录 | ≥1200px 显示侧栏目录，以下折叠 |

---

## 1. 现状核实（实测，非估计）

### 1.1 构建基线

`npm run build` 通过：**19 页**，其中文章 4 篇（`hello-world` / `markdown-guide` / `why-blogging` / `cloudflare-deploy`），标签页 7 个（博客 / 思考 / Astro / Cloudflare / 部署 / Markdown / 写作）。

顺带确认一件**不是问题**的事：`src/content/posts/_template.md` 虽然写着 `draft: false`，但下划线前缀被 Astro 忽略，构建产物中不存在 `/posts/_template`——模板不会被误发布，命名约定有效，无需改动。

### 1.2 首屏被 Hero 整屏占用

- [HeroProfile.astro:98](../src/components/HeroProfile.astro:98)：`min-height: min(88vh, 860px)`
- [HeroProfile.astro:153](../src/components/HeroProfile.astro:153)：标题 `font-size: clamp(4.5rem, 16vw, 12.5rem)`

1440×900 视口下的实际纵坐标链：

```
hero 高度            = min(88vh=792, 860)              = 792px   （72px 的 header 内边距已含在 min-height 内）
+ .home-section 上边距 clamp(3rem, 8vh, 6rem)          =  72px   → 864
+ .section-head 行高（标题 4vw→2.5rem=40px ×1.25）      =  50px   → 914
+ .section-head 下边距 clamp(2rem, 5vh, 3.5rem)        =  45px   → 959
+ PostCard 上内边距 var(--space-3xl)                   =  32px   → 991
+ .post-entry-meta 行高 + 下边距                        =  26px   → 1017
首篇文章标题起始 y ≈ 1017px
```

即首篇文章**完整落在 900px 高的首屏之外**，访客必须滚动超过一整屏才能看到第一条内容。这是「方便阅读」最大的单点损耗。

另外 [HeroProfile.astro:76-89](../src/components/HeroProfile.astro:76-89) 的走马灯（`marqueeScroll 36s linear infinite`）是常驻动画，与阅读页的静止语境冲突。

### 1.3 列表行左侧 128px 空槽

- [PostCard.astro:75](../src/components/PostCard.astro:75)：`.post-entry-body { grid-template-columns: 128px 1fr }`

这个 128px 槽只承载两行小字：序号（1.05rem）与日期（0.72rem）——见 [PostCard.astro:25-30](../src/components/PostCard.astro:25-30)。

宽度账（首页 1440×900）：

```
container-wide 内容宽  = 1152 - 2×20                     = 1112px
home-grid 主列         = 1112 - 300(sidebar) - 72(gap)   =  740px
PostCard 正文列        = 740 - 2×8(padding) - 128 - 24   =  572px
```

**17% 的横向空间只服务两行元信息，正文列被压到 572px。**

同一个组件在归档页更窄——归档/标签页用 `.container`（720px）：

```
PostCard 正文列 = 680 - 2×8 - 128 - 24 = 512px   （约 30 字/行）
```

首页与归档页的正文列宽不一致（572 vs 512），且归档页内层只有 680px，在 1440px 屏幕上左右各空约 380px。

### 1.4 标签页标题被固定头部压住（硬缺陷）

- Header 是 `position: fixed; height: var(--header-h)`（72px），见 [Header.astro:106-140](../src/components/Header.astro:106-140)
- 6 个页面用 `.page-content { padding-top: 72px }` 做了补偿
- 但 [tags.astro:49](../src/pages/tags.astro:49) 与 [tags/[tag].astro:44](../src/pages/tags/[tag].astro:44) 只有 `.page-section { padding: var(--space-2xl) ... }` = **24px**

→ `/tags` 与 `/tags/<tag>` 的 `h1` 从 24px 处开始，被 72px 高的固定头覆盖约 48px。标签是主要的文章入口之一，标题看不见直接影响阅读。

### 1.5 两条阅读进度条叠加，且其中一条被头部遮住

- 布局层渲染 `.scroll-progress`（[BaseLayout.astro:57](../src/layouts/BaseLayout.astro:57)，样式在 [global.css:475-486](../src/styles/global.css:475-486)）：`position: fixed; top: 0; height: 2px; z-index: 200`，用 `scaleX`
- 文章页**又**渲染 `#readingProgress`（[[slug].astro:34](../src/pages/posts/[slug].astro:34)，样式 [221-236](../src/pages/posts/[slug].astro:221)）：`position: fixed; top: 0; height: 3px; z-index: 100`，用 `width`

两条都 `top: 0`：

- `.scroll-progress`（z-index 200）压在 `#readingProgress`（z-index 100）之上 → 文章页那条 3px 渐变条被盖住
- `#readingProgress` 与 Header 同为 z-index 100，而 Header 在 DOM 中更靠后（[[slug].astro:34-36](../src/pages/posts/[slug].astro:34)）→ 等 z-index 下后者胜出，Header 的玻璃态背景把进度条吃掉

净效果：文章页实际可见的是布局层那条 2px 条，文章页自己那条基本不可见。**两套实现，一条可见**。

### 1.6 页面骨架各写各的

| 现象 | 证据 |
|---|---|
| 顶部留白硬编码 8 处 | `archive:63`、`categories:43`、`friends:44`、`gallery:38`、`moments:39`、`guestbook:28`、`posts/[slug]:240`、`posts/[slug]:731` |
| 容器宽度混用 | `.container` 720px（归档/分类/标签/动态/友链/留言）vs `.container-wide` 1152px（首页/摄影） |
| `.page-title` 重复定义 6 份 | 归档 / 分类 / 摄影 / 友链 / 留言 / 动态各写一遍 `font-size: 1.75rem` |
| 卡片嵌套 | 友链页 `.page-card.card` 内再放 `.friend-card.card`；留言页 `.page-card.card` |
| 变量已存在但未统一使用 | `--header-h` 被 Header / Hero / 首页侧栏使用，其余 8 处仍写 `72px` |

分类页因为用 720px 容器，`repeat(auto-fill, minmax(220px, 1fr))` 在 1440px 屏上只排 **2 列**（每列约 332px），横向空间严重浪费。

### 1.7 小字对比度低于 WCAG AA

中性灰度下 OKLab 的 `L` 与线性亮度满足 `Y = L³`：

| 令牌 | 取值 | Y | 背景 | 对比度 |
|---|---|---|---|---|
| `--text-muted`（亮） | `oklch(0.58 0.015 70)` | 0.195 | `oklch(0.965 0.009 90)` Y=0.899 | **3.87:1** |
| `--text-muted`（暗） | `oklch(0.55 0.012 75)` | 0.166 | `oklch(0.185 0.012 65)` Y=0.0063 | **3.84:1** |

而 `--text-muted` 被用在 0.72rem 的 eyebrow、0.72rem 的列表日期、0.8rem 的摘要行、`hero-desc`（0.95rem）上——**小字 + 低对比度**，是对 AA 4.5:1 的明确不达标。

对照：`--text-secondary`（亮色 L=0.45，Y=0.091）为 6.70:1，达标。所以只需调整 `--text-muted` 一档。

### 1.8 中文正文首字下沉不适用

[global.css:392-402](../src/styles/global.css:392-402) 对所有 `> p:first-of-type::first-letter` 施加 `float: left; font-size: 3.8em; text-transform: uppercase`。

站点现有 4 篇文章全部为中文。中文无大小写，`uppercase` 无意义；把首个汉字拉成 3.8em 的大字块压在首行左侧，会破坏中文方块字的行首对齐节奏。这是从西文模板继承来的规则。

### 1.9 层级污染（次要）

[global.css:147-155](../src/styles/global.css:147-155) 的纸张颗粒层：`position: fixed; inset: 0; z-index: 999`，`opacity: calc(0.028 * var(--grain-opacity) * 10)` → 亮色 0.098、暗色 0.14。

实际叠加浓度还需乘 SVG 内 `rect opacity="0.4"` 与噪声自身 alpha，**对正文对比度的实际损耗很小（约 2%–4%）**，不是主要问题。但 `z-index: 999` 使它位于 Header（100）与进度条之上，属于层级设计问题，应收敛到内容层之下。

### 1.10 内容侧附带缺陷

| 问题 | 证据 |
|---|---|
| 摄影页两张配图 404 | [gallery.astro:7-8](../src/pages/gallery.astro:7) 引用 `/assets/images/photography-placeholder-1.jpg`、`-2.jpg`；`public/assets/images/` 与构建产物 `dist/assets/images/` 均只有 `og-default.svg` |
| sitemap 死链 | [BaseLayout.astro:32](../src/layouts/BaseLayout.astro:32) 输出 `<link rel="sitemap" href="/sitemap-index.xml">`，但 `package.json` 无 `@astrojs/sitemap`，构建产物无该文件 |
| 站点域名未替换 | [astro.config.mjs:4](../astro.config.mjs:4) `site: "https://example.com"`，导致 RSS 与 `og:image`（[BaseLayout.astro:29](../src/layouts/BaseLayout.astro:29)）的绝对地址指向 example.com |

> 图片优化链路本身是好的：`why-blogging.md` 里 `![alt text](image/why-blogging/joi.jpg)` 经 Astro 处理输出 `dist/_astro/joi.Bx5dZ4Bg_Z2maX1D.webp`（48kB → 33kB）。这个「文章内相对路径引图」的约定应当保留并写进 `_template.md` 的说明。

---

## 2. 重新规划

### 2.1 版面原则

1. **首屏必须出现文章。** 站点的门面是内容，不是海报。
2. **阅读列有下限、也有上限。** 任何承载正文的区域都给一个宽度区间，不随容器无限拉伸。
3. **元信息贴着标题。** 分类、日期、标签与标题在同一视觉单元内，不跨一个空槽遥相呼应。
4. **一套骨架。** 顶部留白、容器宽度、页面标题只定义一次。
5. **保留已有的风格资产。** 衬线标题 / 无衬线正文的双轨、oklch 暖纸色、序号式编目语言、滚动渐入，全部保留；只调整比例与结构。

### 2.2 令牌与骨架（`global.css`）

在 `:root` 增补 / 调整：

```css
:root {
  /* 阅读测量 — 新增 */
  --prose-width: 688px;        /* 正文列固定宽，约 41 字/行 */
  --prose-max: 44rem;          /* 列表行正文列上限，约 42 字/行 */
  --toc-width: 240px;          /* 目录列 */
  --container-prose: 720px;    /* 线型阅读页容器（文章 / 动态 / 留言） */

  /* 层级 — 新增，收敛散落的 z-index */
  --z-grain: 50;
  --z-header: 100;
  --z-progress: 101;

  /* 对比度修正 */
  --text-muted: oklch(0.52 0.015 70);   /* 亮色 0.58 → 0.52，3.87:1 → 4.98:1 */
}

[data-theme="dark"] {
  --text-muted: oklch(0.66 0.012 75);   /* 暗色 0.55 → 0.66，3.84:1 → 5.99:1 */
}
```

配套三处收口：

- `.scroll-progress { z-index: var(--z-progress) }`（原 200）
- `body::before { z-index: var(--z-grain) }`（原 999）
- 首字下沉加语言门控：`.post-content-inner:lang(en) > p:first-of-type::first-letter`（或改为由 frontmatter `dropcap: true` 显式开启），中文正文不再触发

新增统一骨架类，替代 8 处硬编码：

```css
.page-shell {
  padding-top: calc(var(--header-h) + var(--space-3xl));
  padding-bottom: var(--space-5xl);
}

.page-title {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: var(--space-xl);
}

.page-lede {                     /* 页面副标题，原 .page-desc */
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--border);
}
```

**容器分配规则（改后唯一）**

| 页面类型 | 容器 | 宽度 |
|---|---|---|
| 文章详情、动态、留言 | `.container`（prose） | 720px |
| 首页、归档、分类、标签、摄影、友链 | `.container-wide` | 1152px |

### 2.3 首页

**Hero 从「整屏海报」降为「刊头」**

| 属性 | 现状 | 改后 |
|---|---|---|
| `min-height` | `min(88vh, 860px)` | `min(52vh, 460px)` |
| 标题 `font-size` | `clamp(4.5rem, 16vw, 12.5rem)` | `clamp(2.75rem, 8vw, 5.5rem)` |
| 走马灯 | 常驻 36s 无限滚动 | 删除（或降级为一行静态标签） |
| `.home-section` 上边距 | `clamp(3rem, 8vh, 6rem)` | `clamp(2rem, 5vh, 4rem)` |

逐字升场动画（`riseIn`）、暖光背景、CTA 与社交链接保留——它们是站点识别度的一部分，只是不再占用整屏。

改后纵坐标（1440×900）：

```
hero 高度 min(52vh=468, 460)                    = 460px
+ .home-section 上边距 clamp(2rem, 5vh, 4rem)   =  45px   → 505
+ .section-head 行高                             =  50px   → 555
+ .section-head 下边距 clamp(2rem, 5vh, 3.5rem)  =  45px   → 600
+ PostCard 上内边距                              =  32px   → 632
+ meta 行高 + 下边距                             =  26px   → 658
首篇文章标题起始 y ≈ 658px   ✅ 进入首屏（≤680）
```

**侧栏保持不动**（300px，sticky）。分类目录 / 最新动态 / 站点统计三块的信息密度合理，且 ≤1024px 会落到正文之后，不影响小屏阅读。

### 2.4 列表行（`PostCard`）

**改动：128px 槽 → 64px 槽，日期并入 meta 行。**

```
改后：
┌──────┬──────────────────────────────────────────────────────────┐
│  01  │  技术 · 2026年7月21日  [置顶]                            │
│      │  Markdown 写作快速指南                                    │
│      │  掌握 Markdown 基础语法，让写作更专注内容本身。           │
│      │  #Markdown  #写作                                        │
└──────┴──────────────────────────────────────────────────────────┘
  64px        正文列 636px（首页）／上限 44rem=704px（宽容器页）
```

- `.post-entry-body { grid-template-columns: 64px 1fr }`
- `.post-entry-main { max-width: var(--prose-max) }` — **新增宽度上限**，使归档/标签等宽容器页的标题不会拉成 1000px 长行
- 日期从 `.post-entry-side` 移入 `.post-entry-meta`，与分类、置顶同行
- `.post-entry-summary` 保留 2 行截断与 `max-width: 42em`

宽度账：`740 - 16 - 64 - 24 = 636px`（首页 ✅ 达标）；归档/标签页宽容器下 1008px → 被 `44rem` 截到 704px ✅。

### 2.5 文章详情页

**这是本次改动的重点。**

```
改后（≥1200px）：
                    ┌────────────────────────────┬──────────────┐
   分类 · 日期 · 8 分钟  │  目录（sticky）            │
   文章标题（左对齐）    │  ▸ 基础语法                │
   #标签                │    · 标题                 │
   ─────────────────    │    · 强调                 │
   正文列 688px         │    · 代码                 │
   （41 字/行，无卡片）  │  ▸ 写在最后                │
                    └────────────────────────────┴──────────────┘
                        688px            64px gap      240px
                                总宽 992px
```

改动点：

1. **删除重复进度条。** 移除 [[slug].astro:34](../src/pages/posts/[slug].astro:34) 的 `#readingProgress` div、[170-193](../src/pages/posts/[slug].astro:170) 的脚本、[221-236](../src/pages/posts/[slug].astro:221) 的样式。只保留 `BaseLayout` 的 `.scroll-progress`（`z-index: var(--z-progress)` 保证它压在 Header 之上可见）。
2. **两栏布局。** `.post-article { max-width: 760px }` → `.post-layout { max-width: 992px; display: grid; grid-template-columns: minmax(0, 1fr) var(--toc-width); gap: 64px }`。
3. **新增目录组件** `src/components/TableOfContents.astro`。数据源现成：`const { Content } = await post.render()`（[[slug].astro:27](../src/pages/posts/[slug].astro:27)）改为 `const { Content, headings } = await post.render()` 即可拿到标题树。锚点体系也已就绪——`h2/h3/h4[id]` 已有 `scroll-margin-top: 96px` 与 hover `#`（[global.css:404-416](../src/styles/global.css:404-416)），只是没人用。
   - ≥1200px：右侧 sticky 目录，当前小节高亮
   - <1200px：折叠为正文上方的 `<details>`，不占用首屏高度
4. **去卡片外壳。** `.post-content.card`（[88](../src/pages/posts/[slug].astro:88)）→ 直接铺在页面上，`.post-content-inner` 的 `padding: 2rem` 移除，正文宽度由 `--prose-width: 688px` 控制。理由：正文外框会产生「窗口感」并把行宽压到 656px；去掉后行宽稳定在 688px（41 字/行），且长文滚动时边缘更干净。
5. **文章头改左对齐，meta 上移。** 现状是 `text-align: center` + 分类/日期/阅读时长/标签全居中（[[slug].astro:44-67](../src/pages/posts/[slug].astro:44)）。居中标题的每行起止位置都不一样，扫读成本高于左对齐。改为：
   - 第一行：`分类 · 日期 · N 分钟`
   - 第二行：`h1` 标题（左对齐）
   - 第三行：标签 chip
6. 封面图、文末授权、上下篇导航、回到顶部按钮、评论区**全部保留**。

### 2.6 归档 / 分类 / 标签

| 页面 | 改动 |
|---|---|
| 归档 | `.container` → `.container-wide`；`.page-shell` 替代硬编码 padding；年份分组与左侧 2px 朱砂下划线保留 |
| 分类 | 容器改宽后 `auto-fill minmax(220px, 1fr)` 在 1440px 下由 **2 列 → 4 列**（列宽约 266px） |
| 标签 | 补齐顶部留白（P0）；容器改宽；`tag-cloud` 现有字号随计数缩放的规则保留 |

### 2.7 动态 / 摄影 / 友链 / 留言

- 统一套用 `.page-shell` + `.page-title` + `.page-lede`，删除各页重复的标题样式
- 去掉 `.page-card.card` 外层卡片（内层内容卡片保留）——卡片嵌卡片让层级信号互相抵消
- 摄影页：补两张真实图片，或在无图时走已有的 `.empty-hint` 空态（现为死链 + 破图）
- 留言页的 Giscus 组件（[CommentSection.astro](../src/components/CommentSection.astro)）**不动**，`data-repo-id` / `data-category-id` 仍是占位值，需在部署前替换

### 2.8 头部与页脚

- **可选（P2）：** 桌面导航 8 项 → 5 项主序列（首页 / 归档 / 分类 / 标签 / 动态），把 摄影 / 友链 / 留言 移到页脚。头部减负后「阅读入口」更突出；移动端菜单同步收敛。
- 页脚导航已按 Index / Meta 两列分组，**不动**。
- Header 的 `z-index: 100` 改用 `var(--z-header)`。

---

## 3. 逐文件改动清单

| 文件 | 改动 | 优先级 |
|---|---|---|
| `src/styles/global.css` | 令牌调整（`--text-muted`、`--prose-width`、`--prose-max`、`--toc-width`、`--z-*`）；新增 `.page-shell` / `.page-title` / `.page-lede`；首字下沉加语言门控；收敛 `z-index` | P0 |
| `src/pages/tags.astro` | **补顶部留白**，改 `.page-shell` | P0 |
| `src/pages/tags/[tag].astro` | **补顶部留白**，改 `.page-shell` | P0 |
| `src/pages/posts/[slug].astro` | 删重复进度条；`.post-article` → `.post-layout` 两栏；文章头左对齐 + meta 上移；去 `.card` 外壳；接入 `<TableOfContents>` | P0/P1 |
| `src/components/TableOfContents.astro` | **新增**目录组件 | P1 |
| `src/components/PostCard.astro` | 128px → 64px 槽；日期并入 meta；`.post-entry-main` 加 `max-width` | P1 |
| `src/components/HeroProfile.astro` | `min-height` 与标题 clamp 收敛；删走马灯 | P1 |
| `src/pages/index.astro` | `.home-section` 上边距收敛；`.section-head` 下边距收敛 | P1 |
| `src/pages/archive.astro` | 容器改宽；套 `.page-shell`；删本地 `.page-title` | P1 |
| `src/pages/categories.astro` | 容器改宽；套 `.page-shell`；删本地 `.page-title` | P1 |
| `src/pages/gallery.astro` | 补图或回退空态；套 `.page-shell` | P1 |
| `src/pages/moments.astro`、`friends.astro`、`guestbook.astro` | 去外层卡片嵌套；套 `.page-shell` | P2 |
| `src/components/Header.astro` | `navItems` 8 → 5；`z-index` 用变量 | P2 |
| `src/layouts/BaseLayout.astro` | `sitemap` link 在接入插件前移除；`site` 域名替换 | P2 |
| `astro.config.mjs` | `site` 改为真实域名 | P2 |

---

## 4. 验收标准

改完后逐条核对（均为可测量项）：

1. `npm run build` 通过，页面数仍为 19。
2. `/tags` 与 `/tags/Astro`：`h1` 顶边距 ≥ 72px（改前 24px，被头部覆盖）。
3. 首页 1440×900：首篇文章标题起始 `y ≤ 680px`（改前 ≈1017px）。
4. 文章页 `#readingProgress` 不存在，页面上只有一条进度条；滚动进度随滚动更新且可见。
5. 首页 PostCard 正文列 ≥ 636px；归档/标签页正文列 ≤ 704px（有上限）。
6. 文章正文行宽 688px 且每行 40–42 个汉字。
7. `--text-muted` 在亮/暗两色下对比度 ≥ 4.5:1。
8. ≥1200px 时文章页出现右侧目录且锚点跳转正确；<1200px 时目录折叠且不挤占首屏。
9. `/gallery` 无 404 请求。
10. 全站页面顶部留白一致（不再出现 `padding-top: 72px` 字面量）。

---

## 5. 明确不做的事（范围边界）

- 不改配色方向、不改字体组合（Fraunces × Noto Serif SC × Inter 的双轨结构有效）
- 不改内容模型（`posts` / `moments` schema 不动）
- 不改评论与 RSS 实现
- 不引入 CSS 框架或 UI 库（当前是纯 Astro 组件 + scoped CSS，保持一致）
- 不做暗色/亮色主题逻辑改动（`ThemeToggle` 与防闪烁脚本保持原样）

---

## 6. 后续动作

本次交付为规划。若确认执行，建议按 **P0 → P1 → P2** 分批提交，每批各自跑一次 `npm run build` 并核对第 4 节对应条目，便于回滚定位。
