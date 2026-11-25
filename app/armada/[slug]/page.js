import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCars, getSettings } from '@/lib/data';
import { Photo, PriceTable, JsonLd, CarCard } from '@/components/ui';
import { Icon } from '@/components/icons';
import { SITE, minPrice, priceList, waLink } from '@/lib/utils';

export const revalidate = 60;

export async function generateStaticParams() { return (await getCars()).map((c) => ({ slug: c.id })); }

export async function generateMetadata({ params }) {
  const c = (await getCars()).find((x) => x.id === params.slug);
  if (!c) return {};
  const m = minPrice(c);
  return {
    title: `Sewa ${c.name} di Medan${m ? ' Mulai Rp ' + m.toLocaleString('id-ID') : ''}`,
    description: `Sewa ${c.name} di Medan: lepas kunci, dengan supir, all inclusive dalam & luar kota. ${c.desc || ''}`.slice(0, 158),
    alternates: { canonical: `/armada/${c.id}` },
    openGraph: { images: c.img ? [c.img] : undefined },
  };
}

export default async function Detail({ params }) {
  const [s, cars] = await Promise.all([getSettings(), getCars()]);
  const c = cars.find((x) => x.id === params.slug);
  if (!c) notFound();
  const pl = priceList(c);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name: `Sewa ${c.name} di Medan`, description: c.desc, image: c.img || undefined,
    brand: { '@type': 'Brand', name: c.name.split(' ')[0] }, category: c.type,
    offers: pl.length ? { '@type': 'AggregateOffer', priceCurrency: 'IDR', lowPrice: Math.min(...pl.map((x) => x.v)), highPrice: Math.max(...pl.map((x) => x.v)), offerCount: pl.length, availability: 'https://schema.org/InStock', url: `${SITE}/armada/${c.id}` } : undefined,
  };
  const bc = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ['Armada', '/armada'], [c.name, `/armada/${c.id}`]].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) };
  const lain = cars.filter((x) => x.id !== c.id && x.type === c.type).slice(0, 3);
  return (
    <div className="w pg">
      <JsonLd data={ld} /><JsonLd data={bc} />
      <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/armada">Armada</Link><span>/</span><span>{c.name}</span></nav>
      <div className="dt">
        <div className="im big-im"><Photo src={c.img} alt={`Sewa ${c.name} di Medan`} priority /></div>
        <div>
          <span className="tag">{c.type}</span>
          <h1>Sewa {c.name} di Medan</h1>
          <ul className="spec"><li><Icon n="users" size={16} />{c.seats} kursi</li><li><Icon n="gear" size={16} />{c.trans}</li></ul>
          <p>{c.desc}</p>
          <a className="btn wa" href={waLink(s, `Halo, saya ingin sewa ${c.name} di Medan`)} target="_blank" rel="noopener"><Icon n="wa" size={18} />Pesan via WhatsApp</a>
        </div>
      </div>
      <h2>Harga Sewa {c.name}</h2>
      <PriceTable c={c} s={s} />
      {lain.length > 0 && <><h2>Mobil {c.type} Lainnya</h2><div className="grid">{lain.map((x) => <CarCard key={x.id} c={x} s={s} />)}</div></>}
    </div>
  );
}
