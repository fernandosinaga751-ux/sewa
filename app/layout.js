import '@fontsource-variable/fraunces';
import '@fontsource-variable/manrope';
import './globals.css';
import Link from 'next/link';
import { getSettings } from '@/lib/data';
import { SITE, tel, waLink } from '@/lib/utils';
import { JsonLd } from '@/components/ui';
import Header from '@/components/Header';
import { Icon } from '@/components/icons';

export const revalidate = 60;

export async function generateMetadata() {
  const s = await getSettings();
  return {
    metadataBase: new URL(SITE),
    title: { default: `${s.name} | Rental Mobil Lepas Kunci & Dengan Sopir`, template: `%s | ${s.name}` },
    description: `Sewa mobil di Medan terpercaya: lepas kunci, mobil + supir, all inclusive dalam & luar kota. Harga transparan, unit terawat. Hubungi ${s.phone1}.`,
    keywords: ['sewa mobil medan', 'rental mobil medan', 'sewa mobil medan lepas kunci', 'sewa mobil dengan sopir medan', 'rental mobil medan murah', 'sewa mobil all inclusive medan'],
    openGraph: { type: 'website', locale: 'id_ID', siteName: s.name },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
    formatDetection: { telephone: false },
  };
}

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0e3b36' };

export default async function RootLayout({ children }) {
  const s = await getSettings();
  const wa = waLink(s, 'Halo, saya ingin sewa mobil di Medan');
  const ld = {
    '@context': 'https://schema.org', '@type': 'AutoRental', '@id': SITE + '/#bisnis',
    name: s.name, url: SITE, telephone: [s.phone1, s.phone2].filter(Boolean),
    address: { '@type': 'PostalAddress', streetAddress: s.address, addressLocality: 'Medan', addressRegion: 'Sumatera Utara', addressCountry: 'ID' },
    areaServed: { '@type': 'City', name: 'Medan' }, priceRange: 'Rp',
  };
  return (
    <html lang="id">
      <body>
        <JsonLd data={ld} />
        <Header wa={wa} phone={s.phone1} />
        <main>{children}</main>
        <footer className="foot">
          <div className="w ft">
            <div className="ft-b"><b>{s.name}</b><p>Rental mobil di Medan: lepas kunci, dengan sopir, dan paket all inclusive.</p></div>
            <div><h2>Hubungi kami</h2>
              <p><Icon n="pin" size={16} />{s.address}</p>
              <p><Icon n="phone" size={16} /><a href={tel(s.phone1)}>{s.phone1}</a>{s.phone2 && <> dan <a href={tel(s.phone2)}>{s.phone2}</a></>}</p></div>
            <div><h2>Halaman</h2><p><Link href="/armada">Armada</Link></p><p><Link href="/artikel">Artikel</Link></p><p><Link href="/kontak">Kontak</Link></p></div>
          </div>
          <div className="w ft-c">© {new Date().getFullYear()} {s.name}</div>
        </footer>
        <a className="fab" href={wa} target="_blank" rel="noopener" aria-label="Chat WhatsApp"><Icon n="wa" size={26} /></a>
      </body>
    </html>
  );
}
