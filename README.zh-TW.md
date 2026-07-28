# Joi's Blog

基於 [Astro](https://astro.build/) 構建的個人部落格，部署在 [Cloudflare Pages](https://pages.cloudflare.com/) 上。

## 特性

- 🚀 **Astro 5** — 快速的靜態網站產生器
- 📝 **Markdown 內容管理** — 基於 Astro Content Collections，支援 Frontmatter 元資料
- 🏷️ **標籤 & 分類** — 文章多維組織，按標籤/分類瀏覽
- 📌 **置頂文章** — 支援將重要文章置頂
- 📡 **RSS 訂閱** — 自動產生 RSS Feed
- 🌓 **深色/淺色主題** — 支援主題切換
- 📱 **響應式設計** — 適配各種螢幕尺寸
- 💎 **OKLCH 色彩系統** — 現代色彩方案
- 🪟 **毛玻璃效果** — Glassmorphism 卡片設計
- ⚡ **Cloudflare Pages 部署** — 全球 CDN，零成本
- ✨ **更多頁面**：歸檔、友鏈、圖庫、留言板、微動態

## 開始使用

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置靜態網站
npm run build

# 本地預覽建置結果
npm run preview
```

## 專案結構

```
src/
├── components/        # 可複用元件
│   ├── Footer.astro
│   ├── Header.astro
│   ├── HeroProfile.astro
│   ├── MomentItem.astro
│   ├── PostCard.astro
│   └── ThemeToggle.astro
├── content/           # 內容集合
│   ├── config.ts      # 內容集合 schema
│   ├── moments/       # 微動態
│   └── posts/         # 部落格文章
├── layouts/           # 頁面佈局
│   └── BaseLayout.astro
├── pages/             # 頁面路由
│   ├── index.astro
│   ├── archive.astro
│   ├── categories.astro
│   ├── friends.astro
│   ├── gallery.astro
│   ├── guestbook.astro
│   ├── moments.astro
│   ├── tags/          # 標籤頁
│   ├── posts/         # 文章詳情頁
│   └── rss.xml.js     # RSS 生成
├── styles/
│   └── global.css     # 全域樣式
└── utils/
    └── date.ts        # 日期工具函式
public/
├── assets/images/
│   └── og-default.svg
└── favicon.svg
```

## 寫新文章

在 `src/content/posts/` 下建立 `.md` 檔案，Frontmatter 格式：

```markdown
---
title: 文章標題
date: 2026-07-21
category: 分類名稱
tags: ["標籤1", "標籤2"]
summary: 文章摘要
draft: false
pinned: false
cover: 可選封面圖路徑
---

文章正文（Markdown）...
```

微動態放在 `src/content/moments/` 下：

```markdown
---
date: 2026-07-21
---

今天的微動態內容...
```

## 部署

本部落格託管在 Cloudflare Pages，關聯 GitHub 倉庫自動部署。每次推送 `main` 分支到 GitHub 都會觸發自動建置和發佈。

### 建置配置

| 配置項 | 值 |
|--------|-----|
| 框架預設 | Astro |
| 建置命令 | `npm run build` |
| 輸出目錄 | `dist` |
| Node 版本 | 20.x |

詳細部署指南參見：[將 Astro 部落格部署到 Cloudflare Pages](./src/content/posts/cloudflare-deploy.md)

## 技術棧

- [Astro](https://astro.build/) — 網頁框架
- [Cloudflare Pages](https://pages.cloudflare.com/) — 託管與 CDN
- [Shiki](https://shiki.style/) — 程式碼語法高亮
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) — Cloudflare CLI

## License

MIT
