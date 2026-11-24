import { getSettings } from '@/lib/data';
import { tel, waLink } from '@/lib/utils';

export const revalidate = 60;
export const metadata = {
  title: 'Kontak & Alamat Rental Mobil Medan',
  description: 'Hubungi rental mobil Medan terpercaya. Alamat, nomor telepon, dan WhatsApp untuk pemesanan sewa mobil.',
  alternates: { canonical: '/kontak' },
};

export default async function Kontak() {
  const s = await getSettings();
  return (
    <div className="w pg">
      <h1>Kontak Kami</h1>
      <p className="sub">Hubungi kami untuk pemesanan dan informasi tarif sewa mobil di Medan.</p>
      <div className="feat">
        <div className="f"><b>📍</b><h2 className="h3">Alamat</h2><p>{s.address}</p>
          <p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`} target="_blank" rel="noopener">Buka di Google Maps</a></p></div>
        <div className="f"><b>📞</b><h2 className="h3">Telepon</h2><p><a href={tel(s.phone1)}>{s.phone1}</a>{s.phone2 && <><br /><a href={tel(s.phone2)}>{s.phone2}</a></>}</p></div>
        <div className="f"><b>💬</b><h2 className="h3">WhatsApp</h2><p><a className="btn wa" href={waLink(s, 'Halo, saya ingin sewa mobil di Medan')} target="_blank" rel="noopener">Chat WhatsApp</a></p></div>
      </div>
    </div>
  );
}
