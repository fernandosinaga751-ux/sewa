import { getCars, getSettings } from '@/lib/data';
import { CarCard, JsonLd, PageHead } from '@/components/ui';
import { SITE } from '@/lib/utils';

export const revalidate = 60;
export const metadata = {
  title: 'Armada Rental Mobil Medan: Harga Sewa Lepas Kunci, Dengan Supir & All Inclusive',
  description: 'Daftar armada sewa mobil di Medan lengkap dengan harga lepas kunci, mobil + supir, all inclusive dalam kota dan luar kota. Pesan mudah via WhatsApp.',
  alternates: { canonical: '/armada' },
};

export default async function Armada() {
  const [s, cars] = await Promise.all([getSettings(), getCars()]);
  const types = [...new Set(cars.map((c) => c.type))];
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: cars.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/armada/${c.id}`, name: c.name })) };
  return (
    <>
      <JsonLd data={ld} />
      <PageHead title="Armada Sewa Mobil Medan" sub="Pilih mobil dan paket sewa yang sesuai: lepas kunci, mobil + supir, atau all inclusive." />
      <div className="w pg">
      {types.map((t) => (
        <section key={t}><h2>{t}</h2>
          <div className="grid">{cars.filter((c) => c.type === t).map((c) => <CarCard key={c.id} c={c} s={s} />)}</div></section>))}
      {!cars.length && <p className="empty">Belum ada armada. Hubungi kami untuk informasi unit.</p>}
      </div>
    </>
  );
}
