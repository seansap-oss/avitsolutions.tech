export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: https://www.avitsolutions.tech/sitemap.xml
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
