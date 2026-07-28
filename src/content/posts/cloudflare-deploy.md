---
title: 将 Astro 博客部署到 Cloudflare Pages
date: 2026-07-18
category: 部署
tags: ["Astro", "Cloudflare", "部署"]
summary: 手把手教你用 Cloudflare Pages 部署 Astro 静态博客，零成本上线。
---

Cloudflare Pages 是部署静态网站的绝佳选择：全球 CDN、无限带宽、免费 SSL。

## 前置条件

1. 一个 GitHub / GitLab 账号
2. 将博客代码推送到 Git 仓库
3. 注册 Cloudflare 账号

## 步骤

### 1. 连接仓库

登录 Cloudflare Dashboard，进入 Workers & Pages → Pages → 连接到 Git。

选择你的博客仓库。

### 2. 配置构建设置

| 设置项 | 值 |
|--------|-----|
| 框架预设 | Astro |
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |
| Node 版本 | 20.x |

### 3. 部署

点击保存并部署，Cloudflare 会自动构建并部署你的站点。

### 4. 绑定自定义域名

在 Pages 项目的"自定义域"中，添加你的域名并按照指引配置 DNS。

---

部署完成后，每次 `git push` 都会自动触发新的构建和部署。整个过程零成本，而且速度很快。
