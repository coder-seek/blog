# Joi's Blog

> **🌐 其他语言 / Other Languages / 他の言語**
>
> [English](README.en.md) · [日本語](README.ja.md) · [繁體中文](README.zh-TW.md)

一个基于 [Astro](https://astro.build/) 构建的个人博客，部署在 [Cloudflare Pages](https://pages.cloudflare.com/) 上。

## 特性

- 🚀 **Astro 5** — 快速的静态站点生成器
- 📝 **Markdown 内容管理** — 基于 Astro Content Collections，支持 Frontmatter 元数据
- 🏷️ **标签 & 分类** — 文章多维组织，按标签/分类浏览
- 📌 **置顶文章** — 支持将重要文章置顶
- 📡 **RSS 订阅** — 自动生成 RSS Feed
- 🌓 **深色/浅色主题** — 支持主题切换
- 📱 **响应式设计** — 适配各种屏幕尺寸
- 💎 **OKLCH 色彩系统** — 现代色彩方案
- 🪟 **毛玻璃效果** — Glassmorphism 卡片设计
- ⚡ **Cloudflare Pages 部署** — 全球 CDN，零成本
- ✨ **更多页面**：归档、友链、图库、留言板、微动态

## 开始使用

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态站点
npm run build

# 本地预览构建结果
npm run preview
```

## 项目结构

```
src/
├── components/        # 可复用组件
│   ├── Footer.astro
│   ├── Header.astro
│   ├── HeroProfile.astro
│   ├── MomentItem.astro
│   ├── PostCard.astro
│   └── ThemeToggle.astro
├── content/           # 内容集合
│   ├── config.ts      # 内容集合 schema
│   ├── moments/       # 微动态
│   └── posts/         # 博客文章
├── layouts/           # 页面布局
│   └── BaseLayout.astro
├── pages/             # 页面路由
│   ├── index.astro
│   ├── archive.astro
│   ├── categories.astro
│   ├── friends.astro
│   ├── gallery.astro
│   ├── guestbook.astro
│   ├── moments.astro
│   ├── tags/          # 标签页
│   ├── posts/         # 文章详情页
│   └── rss.xml.js     # RSS 生成
├── styles/
│   └── global.css     # 全局样式
└── utils/
    └── date.ts        # 日期工具函数
public/
├── assets/images/
│   └── og-default.svg
└── favicon.svg
```

## 写新文章

在 `src/content/posts/` 下创建 `.md` 文件，Frontmatter 格式：

```markdown
---
title: 文章标题
date: 2026-07-21
category: 分类名称
tags: ["标签1", "标签2"]
summary: 文章摘要
draft: false
pinned: false
cover: 可选封面图路径
---

文章正文（Markdown）...
```

微动态放在 `src/content/moments/` 下：

```markdown
---
date: 2026-07-21
---

今天的微动态内容...
```

## 部署

本博客托管在 Cloudflare Pages，关联 GitHub 仓库自动部署。每次推送 `main` 分支到 GitHub 都会触发自动构建和发布。

### 构建配置

| 配置项 | 值 |
|--------|-----|
| 框架预设 | Astro |
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |
| Node 版本 | 20.x |

详细部署指南参见：[将 Astro 博客部署到 Cloudflare Pages](./src/content/posts/cloudflare-deploy.md)

## 技术栈

- [Astro](https://astro.build/) — 网页框架
- [Cloudflare Pages](https://pages.cloudflare.com/) — 托管与 CDN
- [Shiki](https://shiki.style/) — 代码语法高亮
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) — Cloudflare CLI

## License

MIT
