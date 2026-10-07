import { defineConfig } from "astro/config";

export default defineConfig({
  // 站点绝对地址，只写 origin：RSS 的 <link>/<guid> 与 og:image 都靠它拼绝对 URL。
  // 不要把页面路径（如 /archive/）写进来，否则所有条目都会拼到那个路径下面
  site: "https://blog-95q.pages.dev",

  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },

  build: {
    inlineStylesheets: "auto",
  },
});
