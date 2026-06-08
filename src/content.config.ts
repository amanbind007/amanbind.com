import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    company: z.string(),
    companyUrl: z.string().url().optional(),
    role: z.string(),
    team: z.string().optional(),
    location: z.string(),
    start: z.string(),
    end: z.string(),
    current: z.boolean().default(false),
    /** Controls list order; higher sorts first. */
    order: z.number(),
    summary: z.string(),
    highlights: z.array(z.string()),
    stack: z.array(z.string()),
  }),
});

export const collections = { experience };
