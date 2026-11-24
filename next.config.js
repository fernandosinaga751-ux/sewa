/** @type {import('next').NextConfig} */
module.exports = {
  poweredByHeader: false,
  compress: true,
  images: { formats: ['image/avif', 'image/webp'], remotePatterns: [{ protocol: 'https', hostname: 'firebasestorage.googleapis.com' }] },
};
