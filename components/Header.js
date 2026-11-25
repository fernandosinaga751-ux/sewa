'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './icons';

const NAV = [['/', 'Home'], ['/armada', 'Armada'], ['/artikel', 'Artikel'], ['/kontak', 'Kontak']];

export default function Header({ wa, phone }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  const on = (h) => (h === '/' ? path === '/' : path.startsWith(h));

  useEffect(() => {
    const f = () => setSc(window.scrollY > 12);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const k = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`sh${sc ? ' sc' : ''}${open ? ' open' : ''}`}>
      <div className="w sh-in">
        <Link className="lg" href="/" aria-label="Sewa Mobil Medan, ke beranda">
          <span className="lg-i"><Icon n="car" size={22} /></span>
          <span>Sewa Mobil <b>Medan</b></span>
        </Link>
        <nav className="dnav" aria-label="Menu utama">
          {NAV.map(([h, n]) => <Link key={h} href={h} className={on(h) ? 'on' : ''} aria-current={on(h) ? 'page' : undefined}>{n}</Link>)}
        </nav>
        <a className="btn s wa dcta" href={wa} target="_blank" rel="noopener"><Icon n="wa" size={16} />Chat WhatsApp</a>
        <button className="burger" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} aria-controls="panel" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
      <div className="panel" id="panel">
        <nav aria-label="Menu seluler">
          {NAV.map(([h, n], i) => <Link key={h} href={h} className={on(h) ? 'on' : ''} style={{ '--i': i }} tabIndex={open ? 0 : -1}>{n}</Link>)}
        </nav>
        <div className="panel-f" style={{ '--i': 4 }}>
          <a className="btn wa" href={wa} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}><Icon n="wa" size={18} />Chat WhatsApp</a>
          <a className="panel-tel" href={'tel:' + phone} tabIndex={open ? 0 : -1}><Icon n="phone" size={16} />{phone}</a>
        </div>
      </div>
    </header>
  );
}
