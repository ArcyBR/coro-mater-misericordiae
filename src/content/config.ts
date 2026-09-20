import { defineCollection, z } from 'astro:content';

const galleryField = z
  .array(
    z.object({
      image: z.string(),
      caption: z.string().optional(),
    })
  )
  .default([]);

const videosField = z
  .array(
    z.object({
      url: z.string(),
      caption: z.string().optional(),
    })
  )
  .default([]);

// Un "tema" = un evento/concerto/iniziativa del coro, con più foto e video associati.
const temi = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    cover: z.string().optional(),
    published: z.boolean().default(true),
    gallery: galleryField,
    videos: videosField,
  }),
});

// Tappe della Storia del coro: ognuna può collegarsi a un Tema esistente
// (per riusarne le foto/video) oppure avere una propria galleria dedicata.
const storia = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tema: z.string().optional(), // slug di un elemento della collezione "temi"
    gallery: galleryField,
    videos: videosField,
    published: z.boolean().default(true),
  }),
});

// Pagine di testo libero gestibili da CMS: Chi siamo, Audizioni, Contatti
const pagine = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    directorName: z.string().optional(),
    directorPhoto: z.string().optional(),
    directorPhotoAlt: z.string().optional(),
  }),
});

// Impostazioni generali del sito (es. immagine di sfondo della home)
const impostazioni = defineCollection({
  type: 'content',
  schema: z.object({
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
  }),
});

export const collections = { temi, storia, pagine, impostazioni };
