const site = 'https://www.avitsolutions.tech';

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/av-solutions', priority: '0.9', changefreq: 'monthly' },
  { path: '/it-solutions', priority: '0.9', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects/buzztown', priority: '0.75', changefreq: 'monthly' },
  { path: '/projects/ambi', priority: '0.75', changefreq: 'monthly' },
  { path: '/projects/syncstation', priority: '0.72', changefreq: 'monthly' },
  { path: '/projects/clinic-system', priority: '0.72', changefreq: 'monthly' },
  { path: '/projects/brews-bites', priority: '0.7', changefreq: 'monthly' },
  { path: '/projects/wwii-museum', priority: '0.7', changefreq: 'monthly' },
  { path: '/projects/gaaiso-shop', priority: '0.7', changefreq: 'monthly' },
  { path: '/projects/lecture-theatre-kit', priority: '0.75', changefreq: 'monthly' },
  { path: '/projects/commandtrack', priority: '0.7', changefreq: 'monthly' },
];

export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes.map((route) => `  <url>
    <loc>${site}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
