// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://growthmarketinghub.com',
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap({
      customPages: [
        'https://growthmarketinghub.com/niches/seo',
        'https://growthmarketinghub.com/niches/ppc',
        'https://growthmarketinghub.com/niches/social-media',
        'https://growthmarketinghub.com/niches/local-seo',
        'https://growthmarketinghub.com/niches/content-marketing',
        'https://growthmarketinghub.com/niches/email-marketing',
        'https://growthmarketinghub.com/niches/ai-tools',
        'https://growthmarketinghub.com/niches/analytics-cro',
        'https://growthmarketinghub.com/industries/real-estate',
        'https://growthmarketinghub.com/industries/saas-b2b',
        'https://growthmarketinghub.com/industries/ecommerce',
        'https://growthmarketinghub.com/industries/healthcare',
        'https://growthmarketinghub.com/industries/fintech',
        'https://growthmarketinghub.com/industries/professional-services',
        'https://growthmarketinghub.com/industries/logistics',
        'https://growthmarketinghub.com/industries/hospitality',
      ],
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['node:path', 'node:url', 'node:fs'],
    },
  },
});
