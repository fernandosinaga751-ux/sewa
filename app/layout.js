import './globals.css';
import Link from 'next/link';
import { getSettings } from '@/lib/data';
import { SITE, tel, waLink } from '@/lib/utils';
import { JsonLd } from '@/components/ui';

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

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#0b2545' };

export default async function RootLayout({ children }) {
  const s = await getSettings();
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
        <header>
          <div className="w hd">
            <Link className="lg" href="/">🚗 Sewa Mobil <span>Medan</span></Link>
            <input type="checkbox" id="mn" className="sr-cb" aria-label="Buka menu" />
            <label htmlFor="mn" className="mb" aria-hidden="true">☰</label>
            <nav aria-label="Menu utama">
              <Link href="/">Home</Link><Link href="/armada">Armada</Link><Link href="/artikel">Artikel</Link><Link href="/kontak">Kontak</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="w ft">
            <div><b>{s.name}</b><br />{s.address}</div>
            <div>Telp/WA:<br /><a href={tel(s.phone1)}>{s.phone1}</a>{s.phone2 && <> · <a href={tel(s.phone2)}>{s.phone2}</a></>}</div>
            <div><Link href="/armada">Armada</Link> · <Link href="/artikel">Artikel</Link> · <Link href="/kontak">Kontak</Link></div>
          </div>
        </footer>
        <a className="fab" href={waLink(s, 'Halo, saya ingin sewa mobil di Medan')} target="_blank" rel="noopener" aria-label="Chat WhatsApp">💬</a>
      </body>
    </html>
  );
}
