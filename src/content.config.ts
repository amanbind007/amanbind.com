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

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['platform', 'observability', 'cloud', 'ios', 'ml', 'homelab']),
    period: z.string(),
    summary: z.string(),
    /** Rendered as the pinned metric strip on the project card. */
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    stack: z.array(z.string()),
    repo: z.string().url().optional(),
    link: z.string().url().optional(),
    /** Internal/proprietary work has no public repo. */
    proprietary: z.boolean().default(false),
    featured: z.boolean().default(false),
    stars: z.number().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const certifications = defineCollection({
  loader: glob({ base: './src/content/certifications', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    code: z.string().optional(),
    issuer: z.string().default('Amazon Web Services'),
    level: z.enum(['Professional', 'Specialty', 'Associate', 'Foundational']),
    credential: z.string().url().optional(),
    order: z.number(),
  }),
});

export const collections = { experience, projects, certifications };
