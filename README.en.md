# Kang's Blog

A personal blog built with [Astro](https://astro.build/), deployed on [Cloudflare Pages](https://pages.cloudflare.com/).

## Features

- 🚀 **Astro 5** — Blazing-fast static site generator
- 📝 **Markdown Content Management** — Astro Content Collections with Frontmatter metadata
- 🏷️ **Tags & Categories** — Multi-dimensional article organization
- 📌 **Pinned Posts** — Pin important articles to the top
- 📡 **RSS Feed** — Auto-generated RSS subscription
- 🌓 **Dark/Light Theme** — Theme toggle supported
- 📱 **Responsive Design** — Adapts to all screen sizes
- 💎 **OKLCH Color System** — Modern color scheme
- 🪟 **Glassmorphism** — Frosted glass card design
- ⚡ **Cloudflare Pages Deployment** — Global CDN, zero cost
- ✨ **More Pages**: Archive, Friends, Gallery, Guestbook, Moments

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build static site
npm run build

# Preview build output locally
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── Footer.astro
│   ├── Header.astro
│   ├── HeroProfile.astro
│   ├── MomentItem.astro
│   ├── PostCard.astro
│   └── ThemeToggle.astro
├── content/           # Content collections
│   ├── config.ts      # Collection schema
│   ├── moments/       # Micro-moments
│   └── posts/         # Blog posts
├── layouts/           # Page layouts
│   └── BaseLayout.astro
├── pages/             # Page routes
│   ├── index.astro
│   ├── archive.astro
│   ├── categories.astro
│   ├── friends.astro
│   ├── gallery.astro
│   ├── guestbook.astro
│   ├── moments.astro
│   ├── tags/          # Tag pages
│   ├── posts/         # Post detail pages
│   └── rss.xml.js     # RSS generation
├── styles/
│   └── global.css     # Global styles
└── utils/
    └── date.ts        # Date utility functions
public/
├── assets/images/
│   └── og-default.svg
└── favicon.svg
```

## Writing a New Post

Create a `.md` file in `src/content/posts/` with the following Frontmatter:

```markdown
---
title: Post Title
date: 2026-07-21
category: Category Name
tags: ["tag1", "tag2"]
summary: Post summary
draft: false
pinned: false
cover: optional cover image path
---

Post body (Markdown)...
```

Micro-moments go in `src/content/moments/`:

```markdown
---
date: 2026-07-21
---

Today's moment content...
```

## Deployment

This blog is hosted on Cloudflare Pages, linked to its GitHub repository for auto-deployment. Every push to the `main` branch triggers an automatic build and publish.

### Build Configuration

| Setting | Value |
|---------|-------|
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20.x |

For a detailed deployment guide, see: [Deploy Astro Blog to Cloudflare Pages](./src/content/posts/cloudflare-deploy.md)

## Tech Stack

- [Astro](https://astro.build/) — Web framework
- [Cloudflare Pages](https://pages.cloudflare.com/) — Hosting & CDN
- [Shiki](https://shiki.style/) — Code syntax highlighting
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) — Cloudflare CLI

## License

MIT
