import { NextResponse } from 'next/server';

// Dashboard admin sebenarnya ada di /ruang-kontrol, tetapi hanya bisa dibuka
// lewat alamat rahasia dari env ADMIN_PATH. Akses langsung ke alamat aslinya = 404.
const INTERNAL = '/ruang-kontrol';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const secret = (process.env.ADMIN_PATH || '').replace(/^\/+|\/+$/g, '');
  if (pathname === INTERNAL || pathname.startsWith(INTERNAL + '/')) {
    return NextResponse.rewrite(new URL('/halaman-tidak-ada', req.url));
  }
  if (secret && pathname === '/' + secret) {
    const res = NextResponse.rewrite(new URL(INTERNAL, req.url));
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/|api/|favicon.ico|.*\\..*).*)'] };
