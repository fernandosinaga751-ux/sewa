import Link from 'next/link';
import Image from 'next/image';
import { priceList, minPrice, rp, waLink } from '@/lib/utils';

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function Photo({ src, alt, priority }) {
  return src
    ? <Image src={src} alt={alt} fill sizes="(max-width:700px) 100vw, 380px" priority={priority} style={{ objectFit: 'cover' }} />
    : <div className="ph" aria-hidden="true">🚗</div>;
}

export function CarCard({ c, s }) {
  const m = minPrice(c);
  return (
    <article className="card">
      <Link href={`/armada/${c.id}`} className="im"><Photo src={c.img} alt={`Sewa ${c.name} di Medan`} /></Link>
      <div className="cb">
        <span className="tag">{c.type}</span>
        <h3><Link href={`/armada/${c.id}`}>{c.name}</Link></h3>
        <p className="m">👥 {c.seats} kursi · ⚙️ {c.trans}</p>
        <p className="pr">{m ? <>Mulai {rp(m)} <small>/ hari</small></> : 'Hubungi kami'}</p>
        <Link className="btn s" href={`/armada/${c.id}`}>Lihat Semua Harga</Link>
        <a className="btn s wa" href={waLink(s, `Halo, saya ingin sewa ${c.name} di Medan`)} target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </article>
  );
}

export function PriceTable({ c, s }) {
  const list = priceList(c);
  if (!list.length) return <p>Hubungi kami untuk informasi harga {c.name}.</p>;
  return (
    <table className="pt">
      <caption className="sr">Daftar harga sewa {c.name} di Medan</caption>
      <thead><tr><th>Paket</th><th>Harga / hari</th><th></th></tr></thead>
      <tbody>
        {list.map((x) => (
          <tr key={x.k}>
            <td>{x.l}</td><td><b>{rp(x.v)}</b></td>
            <td><a className="btn s wa" href={waLink(s, `Halo, saya ingin pesan ${c.name} paket ${x.l} (${rp(x.v)})`)} target="_blank" rel="noopener">Pesan</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Body({ text }) {
  return String(text || '').split(/\n\s*\n/).map((p, i) =>
    p.startsWith('## ') ? <h2 key={i}>{p.slice(3)}</h2> : <p key={i}>{p}</p>);
}
