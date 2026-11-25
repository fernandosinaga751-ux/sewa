import { getSettings } from '@/lib/data';
import { PageHead } from '@/components/ui';
import { Icon } from '@/components/icons';
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
    <>
      <PageHead title="Kontak Kami" sub="Hubungi kami untuk pemesanan dan informasi tarif sewa mobil di Medan." />
      <div className="w pg">
        <div className="ctc">
          <div className="cc"><span className="ic"><Icon n="pin" size={22} /></span><h2>Alamat</h2><p>{s.address}</p>
            <a className="lnk" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`} target="_blank" rel="noopener">Buka di Google Maps</a></div>
          <div className="cc"><span className="ic"><Icon n="phone" size={22} /></span><h2>Telepon</h2>
            <p className="big-n"><a href={tel(s.phone1)}>{s.phone1}</a></p>
            {s.phone2 && <p className="big-n"><a href={tel(s.phone2)}>{s.phone2}</a></p>}</div>
          <div className="cc"><span className="ic"><Icon n="wa" size={22} /></span><h2>WhatsApp</h2><p>Respon cepat untuk cek ketersediaan unit dan harga.</p>
            <a className="btn wa" href={waLink(s, 'Halo, saya ingin sewa mobil di Medan')} target="_blank" rel="noopener"><Icon n="wa" size={18} />Chat WhatsApp</a></div>
        </div>
      </div>
    </>
  );
}
