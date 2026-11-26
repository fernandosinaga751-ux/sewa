'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './icons';

export default function Slider({ imgs, alt }) {
  const n = imgs.length;
  const [i, setI] = useState(0);
  const hover = useRef(false);
  const last = useRef(0);
  const x0 = useRef(null);

  const go = (k) => { last.current = Date.now(); setI(((k % n) + n) % n); };

  useEffect(() => {
    if (n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      if (!hover.current && !document.hidden && Date.now() - last.current > 5000) setI((v) => (v + 1) % n);
    }, 4000);
    return () => clearInterval(t);
  }, [n]);

  if (!n) return <div className="sl"><div className="ph" aria-hidden="true"><Icon n="car" size={72} /></div></div>;

  return (
    <div className="slw">
      <div className="sl" role="group" aria-roledescription="carousel" aria-label={`Foto ${alt}`}
        onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}
        onTouchStart={(e) => { x0.current = e.touches[0].clientX; hover.current = true; }}
        onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - x0.current; if (Math.abs(d) > 40) go(i + (d < 0 ? 1 : -1)); hover.current = false; }}>
        <div className="sl-t" style={{ transform: `translateX(-${i * 100}%)` }}>
          {imgs.map((u, k) => (
            <div className="sl-s" key={u} aria-hidden={k !== i} role="group" aria-roledescription="slide" aria-label={`${k + 1} dari ${n}`}>
              <Image src={u} alt={k === 0 ? alt : `${alt}, foto ${k + 1}`} fill sizes="(max-width:860px) 100vw, 620px" priority={k === 0} style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        {n > 1 && <>
          <button className="sl-b l" onClick={() => go(i - 1)} aria-label="Foto sebelumnya"><Icon n="prev" size={22} /></button>
          <button className="sl-b r" onClick={() => go(i + 1)} aria-label="Foto berikutnya"><Icon n="next" size={22} /></button>
          <span className="sl-c">{i + 1} / {n}</span>
        </>}
      </div>
      {n > 1 && (
        <div className="sl-th">
          {imgs.map((u, k) => (
            <button key={u} className={k === i ? 'on' : ''} onClick={() => go(k)} aria-label={`Lihat foto ${k + 1}`} aria-current={k === i}>
              <Image src={u} alt="" fill sizes="96px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
