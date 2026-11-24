import Link from 'next/link';
import { getPosts } from '@/lib/data';
import { Photo } from '@/components/ui';
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
    <div className="w pg">
      <h1>Artikel</h1>
      <p className="sub">Tips dan informasi seputar sewa mobil di Medan.</p>
      <div className="grid">{posts.map((p) => (
        <article className="card" key={p.id}>
          <Link href={`/artikel/${p.id}`} className="im"><Photo src={p.img} alt={p.title} /></Link>
          <div className="cb"><p className="m">{tgl(p.date)}</p><h2 className="h3"><Link href={`/artikel/${p.id}`}>{p.title}</Link></h2><p className="m">{p.desc}</p></div>
        </article>))}</div>
      {!posts.length && <p>Belum ada artikel.</p>}
    </div>
  );
}
