export const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const DEFAULT_SETTINGS = {
  name: 'Sewa Mobil Di Medan Terpercaya',
  phone1: '0811664492',
  phone2: '0818520057',
  wa: '0811664492',
  address: 'Jl Surya Haji Komplek Mentari Ion, Medan',
  mapQuery: '',
  instagram: '',
  tiktok: '',
  types: ['MPV', 'SUV', 'Minibus', 'Sedan'],
};

// key di database, label di website
export const PRICE = [
  ['lepasKunci', 'Sewa Mobil (Lepas Kunci)'],
  ['denganSupir', 'Mobil + Supir'],
  ['aiDalam', 'All Inclusive Dalam Kota'],
  ['aiLuar', 'All Inclusive Luar Kota'],
];

export const rp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
export const slugify = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70);
export const waNum = (n) => { const d = String(n || '').replace(/\D/g, ''); return d.startsWith('0') ? '62' + d.slice(1) : d; };
export const waLink = (s, t) => `https://wa.me/${waNum(s.wa)}?text=${encodeURIComponent(t)}`;
export const tel = (n) => 'tel:+' + waNum(n);
export const priceList = (c) => PRICE.map(([k, l]) => ({ k, l, v: Number(c.prices?.[k]) || 0 })).filter((x) => x.v > 0);
export const minPrice = (c) => { const p = priceList(c); return p.length ? Math.min(...p.map((x) => x.v)) : 0; };
export const tgl = (d) => (d ? new Date(d).toLocaleDateString('id-ID', { dateStyle: 'long' }) : '');

// foto mobil: maksimal 6, kompatibel dengan data lama (satu foto)
export const carImgs = (c) => { const a = Array.isArray(c.imgs) ? c.imgs.filter(Boolean) : []; return a.length ? a.slice(0, 6) : (c.img ? [c.img] : []); };
export const socialUrl = (k, v) => {
  v = String(v || '').trim(); if (!v) return '';
  if (/^https?:\/\//i.test(v)) return v;
  const u = v.replace(/^@/, '').replace(/^(www\.)?(instagram\.com|tiktok\.com)\/@?/i, '');
  return k === 'ig' ? `https://www.instagram.com/${u}` : `https://www.tiktok.com/@${u}`;
};
export const mapSrc = (s) => `https://www.google.com/maps?q=${encodeURIComponent(s.mapQuery || s.address)}&z=16&output=embed`;
export const mapLink = (s) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery || s.address)}`;
