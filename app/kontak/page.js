import { getSettings } from '@/lib/data';
import { PageHead } from '@/components/ui';
import { Icon } from '@/components/icons';
import { tel, waLink, mapSrc, mapLink, socialUrl } from '@/lib/utils';

export const revalidate = 60;
export const metadata = {
  title: 'Kontak & Alamat Rental Mobil Medan',
  description: 'Hubungi rental mobil Medan terpercaya. Alamat, peta lokasi, telepon, WhatsApp, Instagram, dan TikTok untuk pemesanan sewa mobil.',
  alternates: { canonical: '/kontak' },
};

export default async function Kontak() {
  const s = await getSettings();
  const ig = socialUrl('ig', s.instagram), tt = socialUrl('tt', s.tiktok);
  return (
    <>
      <PageHead title="Kontak Kami" sub="Hubungi kami untuk pemesanan dan informasi tarif sewa mobil di Medan." />
      <div className="w pg">
        <div className="ctc3">
          <div className="cc">
            <span className="ic"><Icon n="pin" size={22} /></span><h2>Alamat</h2><p>{s.address}</p>
            <div className="map">
              <iframe src={mapSrc(s)} title={`Peta lokasi ${s.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <a className="lnk" href={mapLink(s)} target="_blank" rel="noopener">Buka di Google Maps</a>
          </div>
          <div className="cc">
            <span className="ic"><Icon n="phone" size={22} /></span><h2>Telepon</h2>
            <p>Hubungi langsung untuk pemesanan dan pertanyaan.</p>
            <p className="big-n"><a href={tel(s.phone1)}>{s.phone1}</a></p>
            {s.phone2 && <p className="big-n"><a href={tel(s.phone2)}>{s.phone2}</a></p>}
          </div>
          <div className="cc">
            <span className="ic"><Icon n="wa" size={22} /></span><h2>WhatsApp</h2>
            <p>Respon cepat untuk cek ketersediaan unit dan harga.</p>
            <a className="btn wa" href={waLink(s, 'Halo, saya ingin sewa mobil di Medan')} target="_blank" rel="noopener"><Icon n="wa" size={18} />Chat WhatsApp</a>
          </div>
        </div>

        {(ig || tt) && (
          <section className="soc">
            <div><h2>Hubungi kami di media sosial</h2><p>Lihat foto armada terbaru dan kirim pesan langsung lewat akun kami.</p></div>
            <div className="soc-a">
              {ig && <a className="btn ig" href={ig} target="_blank" rel="noopener"><Icon n="ig" size={18} />Instagram</a>}
              {tt && <a className="btn tk" href={tt} target="_blank" rel="noopener"><Icon n="tt" size={18} />TikTok</a>}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
