import Link from 'next/link';
export const metadata = { title: 'Halaman tidak ditemukan', robots: { index: false } };
export default function NotFound() {
  return <div className="w pg"><h1>Halaman tidak ditemukan</h1><p><Link href="/">Kembali ke Home</Link></p></div>;
}
