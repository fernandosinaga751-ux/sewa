import { SITE } from '@/lib/utils';
export default function robots() {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE}/sitemap.xml`, host: SITE };
}
