import { defineCollection, z } from 'astro:content';

const temi = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    cover: z.string().optional(),
    published: z.boolean().default(true),
    gallery: z
      .array(
        z.object({
          image: z.string(),
          caption: z.string().optional(),
        })
      )
      .default([]),
    videos: z
      .array(
        z.object({
          url: z.string(),
          caption: z.string().optional(),
        })
      )
      .default([]),
  }),
});

const pagine = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { temi, pagine };
