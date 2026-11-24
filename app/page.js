import Link from 'next/link';
import { getCars, getPosts, getSettings } from '@/lib/data';
import { CarCard, JsonLd } from '@/components/ui';
import { waLink, tgl, SITE } from '@/lib/utils';
import { Photo } from '@/components/ui';

export const revalidate = 60;
export const metadata = { alternates: { canonical: '/' } };

const FAQ = [
  ['Apa saja pilihan paket sewa mobil di Medan?', 'Tersedia empat pilihan: sewa mobil lepas kunci, mobil + supir, all inclusive dalam kota, dan all inclusive luar kota. Harga tiap paket ditampilkan di halaman masing-masing mobil.'],
  ['Bagaimana cara memesan mobil?', 'Pilih mobil di halaman Armada, lalu klik tombol WhatsApp atau hubungi nomor telepon kami. Kami akan konfirmasi ketersediaan unit.'],
  ['Di mana lokasi rental mobil ini?', 'Kantor kami berada di Medan. Alamat lengkap dan peta ada di halaman Kontak.'],
];

export default async function Home() {
  const [s, cars, posts] = await Promise.all([getSettings(), getCars(), getPosts()]);
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  return (
    <>
      <JsonLd data={ld} />
      <section className="hero"><div className="w">
        <div>
          <h1>Sewa Mobil Di Medan <em>Terpercaya</em></h1>
          <p>Rental mobil Medan lepas kunci, mobil + supir, dan paket all inclusive dalam maupun luar kota. Unit terawat, harga jelas, pemesanan mudah lewat WhatsApp.</p>
          <a className="btn" href={waLink(s, 'Halo, saya ingin sewa mobil di Medan')} target="_blank" rel="noopener">Pesan via WhatsApp</a> <Link className="btn o" href="/armada">Lihat Armada</Link>
        </div>
        <div className="big" aria-hidden="true">🚙</div>
      </div></section>

      <section className="w sec">
        <h2>Kenapa Memilih Rental Mobil Kami di Medan</h2>
        <p className="sub">Layanan sewa mobil Medan yang mengutamakan kenyamanan dan kepastian harga.</p>
        <div className="feat">
          <div className="f"><b>✅</b><h3>Terpercaya</h3><p>Proses sewa jelas dan transparan.</p></div>
          <div className="f"><b>🔧</b><h3>Unit Terawat</h3><p>Armada bersih dan siap jalan.</p></div>
          <div className="f"><b>💰</b><h3>Harga Transparan</h3><p>Tersedia paket lepas kunci hingga all inclusive.</p></div>
          <div className="f"><b>🕒</b><h3>Respon Cepat</h3><p>Hubungi kami kapan saja lewat WhatsApp.</p></div>
        </div>
      </section>

      <section className="w sec">
        <h2>Armada Sewa Mobil Medan</h2>
        <p className="sub">Pilih mobil sesuai kebutuhan perjalanan Anda.</p>
        <div className="grid">{cars.slice(0, 6).map((c) => <CarCard key={c.id} c={c} s={s} />)}</div>
        {!cars.length && <p>Armada segera hadir. Hubungi kami untuk informasi.</p>}
        <p className="ctr"><Link className="btn" href="/armada">Semua Armada</Link></p>
      </section>

      <section className="w sec">
        <h2>Pertanyaan yang Sering Diajukan</h2>
        {FAQ.map(([q, a]) => <details key={q} className="fq"><summary>{q}</summary><p>{a}</p></details>)}
      </section>

      {posts.length > 0 && <section className="w sec">
        <h2>Artikel Terbaru</h2>
        <div className="grid">{posts.slice(0, 3).map((p) => (
          <article className="card" key={p.id}>
            <Link href={`/artikel/${p.id}`} className="im"><Photo src={p.img} alt={p.title} /></Link>
            <div className="cb"><p className="m">{tgl(p.date)}</p><h3><Link href={`/artikel/${p.id}`}>{p.title}</Link></h3><p className="m">{p.desc}</p></div>
          </article>))}</div>
      </section>}

      <div className="w sec"><div className="cta"><h2>Siap Berangkat? Pesan Sekarang</h2><p>Konfirmasi cepat melalui WhatsApp.</p>
        <a className="btn" href={waLink(s, 'Halo, saya ingin sewa mobil di Medan')} target="_blank" rel="noopener">Chat WhatsApp</a></div></div>
    </>
  );
}
