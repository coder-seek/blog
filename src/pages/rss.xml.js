import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: "拾光记",
    description: "技术笔记、生活随笔、读书记录、摄影",
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.summary || "",
      pubDate: post.data.date,
      link: `/posts/${post.id.replace(/\.md$/, "")}`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>zh-CN</language>`,
  });
}
