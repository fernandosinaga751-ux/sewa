import { getCars, getPosts } from '@/lib/data';
import { SITE } from '@/lib/utils';

export const revalidate = 3600;

export default async function sitemap() {
  const [cars, posts] = await Promise.all([getCars(), getPosts()]);
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: SITE + '/armada', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: SITE + '/artikel', lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: SITE + '/kontak', lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    ...cars.map((c) => ({ url: `${SITE}/armada/${c.id}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 })),
    ...posts.map((p) => ({ url: `${SITE}/artikel/${p.id}`, lastModified: new Date(p.updated || p.date || now), changeFrequency: 'monthly', priority: 0.6 })),
  ];
}
