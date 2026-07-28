import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    summary: z.string().optional(),
    cover: z.string().optional(),
    pinned: z.boolean().default(false),
  }),
});

const momentsCollection = defineCollection({
  type: "content",
  schema: z.object({
    date: z.date(),
  }),
});

export const collections = {
  posts: postsCollection,
  moments: momentsCollection,
};
