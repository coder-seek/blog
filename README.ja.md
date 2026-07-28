# Kang's Blog

[Astro](https://astro.build/) で構築された個人ブログ。[Cloudflare Pages](https://pages.cloudflare.com/) にデプロイされています。

## 特徴

- 🚀 **Astro 5** — 高速な静的サイトジェネレーター
- 📝 **Markdown コンテンツ管理** — Astro Content Collections + Frontmatter メタデータ
- 🏷️ **タグ & カテゴリー** — 多角的な記事整理
- 📌 **ピン留め記事** — 重要な記事をトップに固定
- 📡 **RSS フィード** — 自動生成される RSS 購読
- 🌓 **ダーク/ライトテーマ** — テーマ切替対応
- 📱 **レスポンシブデザイン** — あらゆる画面サイズに対応
- 💎 **OKLCH 色彩システム** — モダンな配色
- 🪟 **グラスモーフィズム** — すりガラス調カードデザイン
- ⚡ **Cloudflare Pages デプロイ** — グローバル CDN、ゼロコスト
- ✨ **その他のページ**: アーカイブ、フレンズ、ギャラリー、ゲストブック、モーメンツ

## はじめに

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# 静的サイトのビルド
npm run build

# ビルド結果をローカルでプレビュー
npm run preview
```

## プロジェクト構成

```
src/
├── components/        # 再利用可能なコンポーネント
│   ├── Footer.astro
│   ├── Header.astro
│   ├── HeroProfile.astro
│   ├── MomentItem.astro
│   ├── PostCard.astro
│   └── ThemeToggle.astro
├── content/           # コンテンツコレクション
│   ├── config.ts      # コレクションスキーマ
│   ├── moments/       # モーメンツ（ひとこと日記）
│   └── posts/         # ブログ記事
├── layouts/           # ページレイアウト
│   └── BaseLayout.astro
├── pages/             # ページルート
│   ├── index.astro
│   ├── archive.astro
│   ├── categories.astro
│   ├── friends.astro
│   ├── gallery.astro
│   ├── guestbook.astro
│   ├── moments.astro
│   ├── tags/          # タグページ
│   ├── posts/         # 記事詳細ページ
│   └── rss.xml.js     # RSS 生成
├── styles/
│   └── global.css     # グローバルスタイル
└── utils/
    └── date.ts        # 日付ユーティリティ
public/
├── assets/images/
│   └── og-default.svg
└── favicon.svg
```

## 新しい記事を書く

`src/content/posts/` に `.md` ファイルを作成し、以下の Frontmatter を記述します：

```markdown
---
title: 記事タイトル
date: 2026-07-21
category: カテゴリ名
tags: ["タグ1", "タグ2"]
summary: 記事の要約
draft: false
pinned: false
cover: オプションのカバー画像パス
---

記事本文（Markdown）...
```

モーメンツは `src/content/moments/` に配置：

```markdown
---
date: 2026-07-21
---

今日のひとこと...
```

## デプロイ

このブログは Cloudflare Pages 上でホストされており、GitHub リポジトリと連携して自動デプロイされます。`main` ブランチにプッシュするたびに、自動的にビルドと公開が実行されます。

### ビルド設定

| 設定項目 | 値 |
|----------|-----|
| フレームワーク | Astro |
| ビルドコマンド | `npm run build` |
| 出力ディレクトリ | `dist` |
| Node バージョン | 20.x |

詳細なデプロイガイドはこちら：[Astro ブログを Cloudflare Pages にデプロイする](./src/content/posts/cloudflare-deploy.md)

## 技術スタック

- [Astro](https://astro.build/) — ウェブフレームワーク
- [Cloudflare Pages](https://pages.cloudflare.com/) — ホスティング & CDN
- [Shiki](https://shiki.style/) — コードシンタックスハイライト
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) — Cloudflare CLI

## ライセンス

MIT
