import Link from 'next/link';
import { getPosts } from '@/lib/data';
import { Photo, PageHead } from '@/components/ui';
import { tgl } from '@/lib/utils';

export const revalidate = 60;
export const metadata = {
  title: 'Artikel Rental Mobil Medan: Tips Sewa Mobil & Wisata',
  description: 'Tips memilih rental mobil, rute wisata, dan panduan sewa mobil di Medan dan sekitarnya.',
  alternates: { canonical: '/artikel' },
};

export default async function Artikel() {
  const posts = await getPosts();
  return (
    <>
      <PageHead title="Artikel" sub="Tips dan informasi seputar sewa mobil di Medan." />
      <div className="w pg">
        <div className="grid">{posts.map((p) => (
          <article className="car" key={p.id}>
            <Link href={`/artikel/${p.id}`} className="car-im" tabIndex={-1} aria-hidden="true"><Photo src={p.img} alt="" /></Link>
            <div className="car-b"><p className="m">{tgl(p.date)}</p><h2><Link href={`/artikel/${p.id}`}>{p.title}</Link></h2><p className="m">{p.desc}</p></div>
          </article>))}</div>
        {!posts.length && <p className="empty">Belum ada artikel.</p>}
      </div>
    </>
  );
}
