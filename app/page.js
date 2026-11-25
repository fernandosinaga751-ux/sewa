import Link from 'next/link';
import { getCars, getPosts, getSettings } from '@/lib/data';
import { CarCard, CarScene, JsonLd, Photo } from '@/components/ui';
import { Icon } from '@/components/icons';
import { waLink, tel, tgl } from '@/lib/utils';

export const revalidate = 60;
export const metadata = { alternates: { canonical: '/' } };

const FAQ = [
  ['Apa saja pilihan paket sewa mobil di Medan?', 'Tersedia empat pilihan: sewa mobil lepas kunci, mobil + supir, all inclusive dalam kota, dan all inclusive luar kota. Harga tiap paket ditampilkan di halaman masing-masing mobil.'],
  ['Bagaimana cara memesan mobil?', 'Pilih mobil di halaman Armada, lalu klik tombol WhatsApp atau hubungi nomor telepon kami. Kami akan konfirmasi ketersediaan unit.'],
  ['Di mana lokasi rental mobil ini?', 'Kantor kami berada di Medan. Alamat lengkap dan peta ada di halaman Kontak.'],
];
const PACK = [
  ['key', 'Lepas Kunci', 'Anda yang mengemudi sendiri.'],
  ['users', 'Mobil + Supir', 'Duduk tenang, sopir kami yang mengemudi.'],
  ['pin', 'All Inclusive Dalam Kota', 'Paket menyeluruh untuk perjalanan di dalam kota.'],
  ['compass', 'All Inclusive Luar Kota', 'Paket menyeluruh untuk perjalanan ke luar kota.'],
];
const WHY = [
  ['shield', 'Terpercaya', 'Proses sewa jelas, tanpa biaya yang disembunyikan.'],
  ['wrench', 'Unit terawat', 'Armada bersih, diperiksa, dan siap jalan jauh.'],
  ['tag', 'Harga terbuka', 'Setiap paket punya harga yang tertera di halaman mobil.'],
  ['clock', 'Respon cepat', 'Tanya ketersediaan kapan saja lewat WhatsApp.'],
];

export default async function Home() {
  const [s, cars, posts] = await Promise.all([getSettings(), getCars(), getPosts()]);
  const wa = waLink(s, 'Halo, saya ingin sewa mobil di Medan');
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  return (
    <>
      <JsonLd data={ld} />
      <section className="hero">
        <div className="w hero-in">
          <div className="hero-t">
            <h1>
              <span className="ln"><span style={{ '--d': '0ms' }}>Sewa Mobil</span></span>
              <span className="ln"><span style={{ '--d': '120ms' }}>Di Medan</span></span>
              <span className="ln"><span style={{ '--d': '240ms' }}>Terpercaya</span></span>
            </h1>
            <p>Rental mobil lepas kunci, dengan sopir, dan paket all inclusive dalam maupun luar kota. Unit terawat, harga jelas, pesan cukup lewat WhatsApp.</p>
            <div className="hero-a">
              <a className="btn wa" href={wa} target="_blank" rel="noopener"><Icon n="wa" size={18} />Pesan via WhatsApp</a>
              <Link className="btn o" href="/armada">Lihat armada</Link>
            </div>
            <a className="hero-tel" href={tel(s.phone1)}><Icon n="phone" size={16} />{s.phone1}</a>
          </div>
          <CarScene />
        </div>
        <div className="road" aria-hidden="true" />
      </section>

      <section className="w sec">
        <h2>Empat cara sewa, harga jelas di setiap mobil</h2>
        <div className="paket">
          {PACK.map(([i, t, d]) => (
            <Link href="/armada" className="pak" key={t}><span className="ic"><Icon n={i} size={22} /></span><h3>{t}</h3><p>{d}</p></Link>
          ))}
        </div>
      </section>

      <section className="w sec">
        <div className="sh2"><h2>Armada sewa mobil Medan</h2><Link className="lnk" href="/armada">Semua armada</Link></div>
        <div className="grid">{cars.slice(0, 6).map((c) => <CarCard key={c.id} c={c} s={s} />)}</div>
        {!cars.length && <p className="empty">Armada segera hadir. Hubungi kami untuk informasi unit yang tersedia.</p>}
      </section>

      <section className="w sec">
        <div className="split">
          <div><h2>Kenapa menyewa di sini</h2><p className="sub">Layanan sewa mobil Medan yang mengutamakan kenyamanan dan kepastian harga.</p>
            <a className="btn" href={wa} target="_blank" rel="noopener">Tanya ketersediaan</a></div>
          <ul className="why">{WHY.map(([i, t, d]) => <li key={t}><span className="ic"><Icon n={i} size={22} /></span><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul>
        </div>
      </section>

      <section className="w sec">
        <h2>Cara memesan</h2>
        <ol className="steps">
          <li><h3>Pilih mobil dan paket</h3><p>Lihat harga lepas kunci, dengan sopir, atau all inclusive di halaman Armada.</p></li>
          <li><h3>Kirim pesan WhatsApp</h3><p>Tekan tombol pesan, pesan otomatis sudah berisi mobil dan paket pilihan Anda.</p></li>
          <li><h3>Kami konfirmasi</h3><p>Kami cek ketersediaan unit dan jadwal, lalu mengabari Anda.</p></li>
        </ol>
      </section>

      <section className="w sec faq">
        <h2>Pertanyaan yang sering diajukan</h2>
        {FAQ.map(([q, a]) => <details key={q} className="fq"><summary>{q}<Icon n="chev" size={20} /></summary><p>{a}</p></details>)}
      </section>

      {posts.length > 0 && <section className="w sec">
        <div className="sh2"><h2>Artikel terbaru</h2><Link className="lnk" href="/artikel">Semua artikel</Link></div>
        <div className="grid">{posts.slice(0, 3).map((p) => (
          <article className="car" key={p.id}>
            <Link href={`/artikel/${p.id}`} className="car-im" tabIndex={-1} aria-hidden="true"><Photo src={p.img} alt="" /></Link>
            <div className="car-b"><p className="m">{tgl(p.date)}</p><h3><Link href={`/artikel/${p.id}`}>{p.title}</Link></h3><p className="m">{p.desc}</p></div>
          </article>))}</div>
      </section>}

      <section className="w sec"><div className="cta">
        <h2>Siap berangkat? Pesan sekarang</h2><p>Konfirmasi cepat melalui WhatsApp.</p>
        <a className="btn wa" href={wa} target="_blank" rel="noopener"><Icon n="wa" size={18} />Chat WhatsApp</a>
      </div></section>
    </>
  );
}
