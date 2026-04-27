import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_NAME, SITE_DESCRIPTION } from '../lib/constants';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: context.site!.toString(),
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      author: post.data.author,
      categories: [post.data.niche, ...(post.data.tags ?? [])],
    })),
    customData: `<language>en-us</language>`,
  });
}
