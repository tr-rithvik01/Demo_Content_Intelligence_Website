export const SITE_NAME = 'GrowthMarketing Hub';
export const SITE_URL = 'https://growthmarketinghub.com';
export const SITE_DESCRIPTION = 'The one-stop hub for growth marketing news, guides, case studies, and actionable strategies across every channel and industry.';
export const SITE_TWITTER = '@GrowthMktHub';
export const SITE_OG_IMAGE = '/og-default.png';

export const NICHES = [
  { slug: 'seo', label: 'SEO', icon: '🔍', color: 'blue', description: 'Technical, on-page, off-page & local SEO strategies.' },
  { slug: 'ppc', label: 'PPC & Paid Media', icon: '💰', color: 'green', description: 'Google Ads, Meta Ads, LinkedIn Ads & beyond.' },
  { slug: 'social-media', label: 'Social Media', icon: '📱', color: 'pink', description: 'Organic growth across every social platform.' },
  { slug: 'local-seo', label: 'Local SEO', icon: '📍', color: 'orange', description: 'Google Business Profile & local search domination.' },
  { slug: 'content-marketing', label: 'Content Marketing', icon: '✍️', color: 'purple', description: 'Strategy, creation & distribution at scale.' },
  { slug: 'email-marketing', label: 'Email & Automation', icon: '📧', color: 'teal', description: 'Campaigns, sequences & marketing automation.' },
  { slug: 'ai-tools', label: 'AI Marketing Tools', icon: '🤖', color: 'violet', description: 'AI-powered tools transforming modern marketing.' },
  { slug: 'analytics-cro', label: 'Analytics & CRO', icon: '📊', color: 'amber', description: 'Data-driven decisions & conversion optimization.' },
] as const;

export const INDUSTRIES = [
  { slug: 'real-estate', label: 'Real Estate', icon: '🏠', description: 'Marketing strategies for agents, brokers & proptech.' },
  { slug: 'saas-b2b', label: 'SaaS & B2B Tech', icon: '💻', description: 'PLG, demand gen & ABM for SaaS companies.' },
  { slug: 'ecommerce', label: 'E-commerce & DTC', icon: '🛒', description: 'Growth playbooks for online stores & D2C brands.' },
  { slug: 'healthcare', label: 'Healthcare & MedTech', icon: '🏥', description: 'HIPAA-compliant marketing for healthcare brands.' },
  { slug: 'fintech', label: 'Fintech & Finance', icon: '💳', description: 'Compliant, trust-building marketing for finance.' },
  { slug: 'professional-services', label: 'Professional Services', icon: '⚖️', description: 'Marketing for law firms, consultancies & accountants.' },
  { slug: 'logistics', label: 'Logistics & Supply Chain', icon: '🚚', description: 'B2B marketing for logistics & supply chain companies.' },
  { slug: 'hospitality', label: 'Hospitality & Travel', icon: '✈️', description: 'Direct bookings & brand building for travel brands.' },
] as const;

export type NicheSlug = typeof NICHES[number]['slug'];
export type IndustrySlug = typeof INDUSTRIES[number]['slug'];
