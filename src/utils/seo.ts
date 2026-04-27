import { SITE_NAME, SITE_URL, SITE_OG_IMAGE } from '../lib/constants';

export function buildTitle(pageTitle?: string): string {
  if (!pageTitle) return `${SITE_NAME} — Growth Marketing Strategies & Resources`;
  return `${pageTitle} | ${SITE_NAME}`;
}

export function buildCanonical(path: string): string {
  return `${SITE_URL}${path}`;
}

export function buildOgImageUrl(slug?: string): string {
  if (!slug) return `${SITE_URL}${SITE_OG_IMAGE}`;
  return `${SITE_URL}/og/${slug}.png`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 240;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
