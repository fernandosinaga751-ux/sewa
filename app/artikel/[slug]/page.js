import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPosts, getSettings } from '@/lib/data';
import { Photo, Body, JsonLd } from '@/components/ui';
import { SITE, tgl } from '@/lib/utils';

export const revalidate = 60;

export async function generateStaticParams() { return (await getPosts()).map((p) => ({ slug: p.id })); }

export async function generateMetadata({ params }) {
  const p = (await getPosts()).find((x) => x.id === params.slug);
  if (!p) return {};
  const d = (p.desc || p.body || '').replace(/\s+/g, ' ').slice(0, 158);
  return {
    title: p.title, description: d, alternates: { canonical: `/artikel/${p.id}` },
    openGraph: { type: 'article', publishedTime: p.date, modifiedTime: p.updated || p.date, images: p.img ? [p.img] : undefined },
  };
}

export default async function Post({ params }) {
  const [s, posts] = await Promise.all([getSettings(), getPosts()]);
  const p = posts.find((x) => x.id === params.slug);
  if (!p) notFound();
  const ld = {
    '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.desc, image: p.img || undefined,
    datePublished: p.date, dateModified: p.updated || p.date, mainEntityOfPage: `${SITE}/artikel/${p.id}`,
    author: { '@type': 'Organization', name: s.name }, publisher: { '@type': 'Organization', name: s.name },
  };
  return (
    <div className="w pg"><JsonLd data={ld} />
      <article className="art">
        <p className="m"><Link href="/artikel">← Artikel</Link> · <time dateTime={p.date}>{tgl(p.date)}</time></p>
        <h1>{p.title}</h1>
        {p.img && <div className="im big-im"><Photo src={p.img} alt={p.title} priority /></div>}
        <Body text={p.body} />
        <p><Link className="btn" href="/armada">Lihat Armada & Harga</Link></p>
      </article>
    </div>
  );
}
