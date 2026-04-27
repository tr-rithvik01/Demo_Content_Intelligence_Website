tester
# GrowthMarketing Hub

Production-ready growth marketing resource website built with Astro 5, Tailwind CSS v4, and deployed on Cloudflare Pages.

## Tech Stack Decisions

| Choice | Reason |
|--------|--------|
| **Astro 5** | Islands architecture = minimal JS shipped. Best-in-class Core Web Vitals for content sites. Native MDX support and content collections. |
| **Tailwind CSS v4** | CSS-first config, `@plugin` for extensions, faster builds via the Vite plugin. |
| **Cloudflare Pages + Workers** | Edge SSR, global CDN, free tier generous. API routes (subscribe, contact) run as Workers. |
| **Decap CMS** | Git-based, free, no vendor lock-in. Editorial UI at `/admin`. Works on the same repo. |
| **Pagefind** | Zero-JS static search generated at build time. Runs in the browser from the `/pagefind/` output. |
| **MDX** | Full Markdown + JSX components in articles. Lets authors embed interactive elements. |

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Optional: Decap CMS local editing

```bash
# In a second terminal, run the Decap proxy server
npx decap-server

# Uncomment `local_backend: true` in public/admin/config.yml
# Then visit http://localhost:4321/admin
```

## Environment Variables

Create a `.env` file at the project root:

```
# Email provider (Buttondown example)
BUTTONDOWN_API_KEY=your_key_here

# Cloudflare Turnstile (contact form spam protection)
TURNSTILE_SECRET_KEY=your_secret_here

# Optional: Resend for contact form emails
RESEND_API_KEY=your_key_here
```

For Cloudflare Pages deployment, set these in **Settings > Environment Variables**.

## Project Structure

```
/
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── admin/
│       ├── index.html      ← Decap CMS entry point
│       └── config.yml      ← Decap CMS collection config
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── blog/
│   │   │   ├── ArticleCard.astro
│   │   │   ├── AuthorBio.astro
│   │   │   └── TableOfContents.astro
│   │   ├── home/
│   │   │   └── Newsletter.astro
│   │   └── ui/
│   │       └── SEOHead.astro
│   ├── content/
│   │   └── blog/           ← MDX blog posts live here
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogLayout.astro
│   ├── lib/
│   │   └── constants.ts    ← NICHES, INDUSTRIES, SITE_NAME, etc.
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── resources.astro
│   │   ├── search.astro
│   │   ├── 404.astro
│   │   ├── rss.xml.ts
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── niches/
│   │   │   ├── index.astro
│   │   │   └── [niche].astro
│   │   ├── industries/
│   │   │   ├── index.astro
│   │   │   └── [industry].astro
│   │   └── api/
│   │       ├── subscribe.ts
│   │       └── contact.ts
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   └── seo.ts
│   └── content.config.ts   ← Astro 5 content collection schema
├── astro.config.mjs
├── wrangler.jsonc
└── package.json
```

## How to Add a New Blog Post

**Option A: Via Decap CMS (recommended)**
1. Go to `/admin` on your live site (or `localhost:4321/admin` with local backend)
2. Click **New Blog Posts**
3. Fill in all fields — title, description (≤160 chars), niche, author
4. Set **Draft** to `false` when ready to publish
5. Click **Publish** — Decap commits the MDX file directly to the repo

**Option B: Manual MDX**
1. Create `src/content/blog/your-post-slug.mdx`
2. Add required frontmatter:
```mdx
---
title: "Your Post Title (under 60 chars)"
description: "Compelling meta description under 160 characters."
publishDate: 2025-05-01
author: "Your Name"
authorSlug: "your-name"
authorBio: "Short bio (1-2 sentences)."
niche: "seo"  # one of the 8 niche slugs
tags: ["tag1", "tag2"]
featured: false
draft: false
readingTime: 8
---

Your MDX content here...
```
3. The post appears at `/blog/your-post-slug` automatically.

## How to Add a New Niche or Industry

**Adding a new niche:**
1. Open `src/lib/constants.ts`
2. Add an entry to the `NICHES` array
3. Add the slug to the `niche` enum in `src/content.config.ts`
4. Add descriptive content to the `nicheContent` map in `src/pages/niches/[niche].astro`
5. The hub page, sitemap, and navigation all update automatically

**Adding a new industry:**
1. Same process: `INDUSTRIES` array in `constants.ts`, `industry` enum in `content.config.ts`, `industryContent` map in `[industry].astro`

## Deployment to Cloudflare Pages

### First deployment

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) > Create a project > Connect to Git
3. Select your repo
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Add environment variables (see above)
6. Deploy

### Custom Domain

1. In Cloudflare Pages > your project > **Custom domains**
2. Add your domain (e.g. `growthmarketinghub.com`)
3. If your domain is already on Cloudflare DNS, it auto-configures. Otherwise update your nameservers.

### Wrangler (local preview with Workers)

```bash
npm run build
npx wrangler pages dev dist
```

## Decap CMS Setup

1. In `public/admin/config.yml`, replace `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME` with your actual repo
2. Enable GitHub OAuth in Cloudflare Pages: **Settings > Access & Identity** or use Netlify Identity (works cross-host)
3. The CMS will be live at `https://yourdomain.com/admin`

## SEO Launch Checklist

- [ ] Update `SITE_URL` in `src/lib/constants.ts` and `astro.config.mjs` to your real domain
- [ ] Replace `REPLACE_WITH_YOUR_TOKEN` in `BaseLayout.astro` with your Cloudflare Web Analytics token
- [ ] Replace `REPLACE_WITH_TURNSTILE_SITE_KEY` in `contact.astro` with your Turnstile site key
- [ ] Add Turnstile secret key to environment variables
- [ ] Create and upload `public/og-default.png` (1200×630px)
- [ ] Create and upload `public/logo.svg`
- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap-index.xml`
- [ ] Verify site in Google Search Console (HTML tag or DNS method)
- [ ] Set up GA4 (optional) with consent banner if targeting EU
- [ ] Test contact form and newsletter subscribe endpoints
- [ ] Run Lighthouse on key pages — target 95+

## Content Style Guide

**Tone:** Expert but approachable. Write for smart practitioners, not beginners. Skip the "what is SEO?" preamble — assume your reader knows the basics and wants the how.

**Format:**
- H2 for major sections, H3 for sub-sections. One H1 per article (the title).
- Bold key terms on first use. Use tables for comparisons.
- Code blocks for any technical snippets (URLs, schema, scripts).
- Bullet/numbered lists for processes, checklists, and sequential steps.

**Length:** 1,500–3,000 words for guides. 800–1,200 for news/updates.

**SEO per-post checklist:**
- [ ] Title under 60 characters, includes primary keyword
- [ ] Description under 160 characters, compelling and specific
- [ ] Primary keyword in H1, naturally in first 100 words
- [ ] At least 2–3 internal links to related content
- [ ] At least 1 external link to a credible source
- [ ] All images have descriptive alt text
- [ ] `readingTime` set in frontmatter
- [ ] Article reviewed for factual accuracy before `draft: false`

## Content Niches & Selection Rationale

| Niche | Rationale |
|-------|-----------|
| SEO | Highest search volume, durable demand, strong commercial intent |
| PPC & Paid Media | High commercial intent queries, practitioners constantly seeking edge |
| Social Media | Massive audience, fast-changing platform landscape creates content demand |
| Local SEO | Underserved niche with strong small-business commercial intent |
| Content Marketing | Foundational for all digital marketing; ties every other niche together |
| Email & Automation | Highest ROI channel; practitioners need tactical help with platforms |
| AI Marketing Tools | Fastest-growing area; first-mover advantage available now |
| Analytics & CRO | High commercial intent; directly tied to revenue outcomes |

## Industry Vertical Selection Rationale

| Industry | Rationale |
|----------|-----------|
| Real Estate | Huge market, hyperlocal = SEO-hungry, high agent/broker lifetime value |
| SaaS & B2B Tech | Highest CPCs on the internet; marketers have large budgets and urgent needs |
| E-commerce & DTC | Meta/Google Ads-heavy; massive addressable audience; high content demand |
| Healthcare & MedTech | Complex compliance needs create differentiated content opportunity |
| Fintech & Finance | Trust-building content in high-competition, regulated market |
| Professional Services | Underserved; high per-client value drives willingness to invest in marketing |
| Logistics & Supply Chain | B2B niche with growing digital marketing adoption |
| Hospitality & Travel | Direct bookings vs OTA dependency is a perennial hot-button topic |
a302323 (Initial commit)
