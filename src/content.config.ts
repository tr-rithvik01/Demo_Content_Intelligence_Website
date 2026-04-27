import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    authorSlug: z.string(),
    authorBio: z.string().optional(),
    authorAvatar: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    niche: z.enum(['seo', 'ppc', 'social-media', 'local-seo', 'content-marketing', 'email-marketing', 'ai-tools', 'analytics-cro']),
    industry: z.enum(['real-estate', 'saas-b2b', 'ecommerce', 'healthcare', 'fintech', 'professional-services', 'logistics', 'hospitality', 'general']).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    readingTime: z.number().optional(),
    canonicalUrl: z.string().url().optional(),
  }),
});

export const collections = { blog };
