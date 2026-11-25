import Link from 'next/link';
import Image from 'next/image';
import { priceList, minPrice, rp, waLink } from '@/lib/utils';
import { Icon } from './icons';

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function PageHead({ title, sub }) {
  return (
    <div className="phead"><div className="w"><h1>{title}</h1>{sub && <p>{sub}</p>}</div></div>
  );
}

export function Photo({ src, alt, priority }) {
  return src
    ? <Image src={src} alt={alt} fill sizes="(max-width:700px) 100vw, 380px" priority={priority} style={{ objectFit: 'cover' }} />
    : <div className="ph" aria-hidden="true"><Icon n="car" size={56} /></div>;
}

export function CarCard({ c, s }) {
  const m = minPrice(c);
  return (
    <article className="car">
      <Link href={`/armada/${c.id}`} className="car-im" tabIndex={-1} aria-hidden="true"><Photo src={c.img} alt="" /><span className="tag">{c.type}</span></Link>
      <div className="car-b">
        <h3><Link href={`/armada/${c.id}`}>{c.name}</Link></h3>
        <ul className="spec"><li><Icon n="users" size={16} />{c.seats} kursi</li><li><Icon n="gear" size={16} />{c.trans}</li></ul>
        <div className="car-f">
          <p className="pr">{m ? <><small>Mulai</small><b>{rp(m)}</b><small>per hari</small></> : <b>Hubungi kami</b>}</p>
          <div className="car-a">
            <Link className="btn s" href={`/armada/${c.id}`}>Lihat harga</Link>
            <a className="btn s wa ico" aria-label={`Pesan ${c.name} lewat WhatsApp`} href={waLink(s, `Halo, saya ingin sewa ${c.name} di Medan`)} target="_blank" rel="noopener"><Icon n="wa" size={18} /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PriceTable({ c, s }) {
  const list = priceList(c);
  if (!list.length) return <p>Hubungi kami untuk informasi harga {c.name}.</p>;
  return (
    <div className="pks">
      {list.map((x) => (
        <div className="pk" key={x.k}>
          <h3>{x.l}</h3>
          <p className="pk-p"><b>{rp(x.v)}</b><small>per hari</small></p>
          <a className="btn s wa" href={waLink(s, `Halo, saya ingin pesan ${c.name} paket ${x.l} (${rp(x.v)})`)} target="_blank" rel="noopener"><Icon n="wa" size={16} />Pesan paket ini</a>
        </div>
      ))}
    </div>
  );
}

export function Body({ text }) {
  return String(text || '').split(/\n\s*\n/).map((p, i) =>
    p.startsWith('## ') ? <h2 key={i}>{p.slice(3)}</h2> : <p key={i}>{p}</p>);
}

// Ilustrasi hero: mobil melaju (roda berputar, marka jalan bergerak)
export function CarScene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="sun" />
      <svg viewBox="0 0 520 214" className="carsvg">
        <path d="M30 168 L28 112 Q28 92 52 84 L96 66 Q104 62 118 62 L300 62 Q330 62 352 84 L398 108 L462 116 Q490 122 494 144 L496 164 Q496 168 490 168 Z" fill="#f2f5f2" />
        <path d="M72 108 L88 80 Q94 72 106 72 L190 72 L190 108 Z" fill="#0e3b36" />
        <path d="M200 72 L296 72 Q316 74 330 92 L348 108 L200 108 Z" fill="#0e3b36" />
        <path d="M196 72 V166" stroke="#c9d4d0" strokeWidth="2" />
        <rect x="34" y="118" width="10" height="16" rx="3" fill="#e5484d" />
        <rect x="474" y="124" width="18" height="10" rx="4" fill="#f4b41a" />
        <path d="M78 168 A42 42 0 0 1 162 168 Z" fill="#0e3b36" />
        <path d="M362 168 A42 42 0 0 1 446 168 Z" fill="#0e3b36" />
        {[120, 404].map((x) => (
          <g key={x}>
            <circle cx={x} cy="168" r="34" fill="#11201e" />
            <g className="wheel" style={{ transformOrigin: `${x}px 168px` }}>
              <circle cx={x} cy="168" r="19" fill="#cfd8d4" />
              <path d={`M${x} 152 V184 M${x - 16} 168 H${x + 16} M${x - 11} 157 L${x + 11} 179 M${x + 11} 157 L${x - 11} 179`} stroke="#11201e" strokeWidth="3" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
