const fs = require('fs');
const path = require('path');

const routes = require('./routes.config');

const baseUrl = 'https://www.lionautoparts.lk';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${routes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
  </url>`).join('')}
</urlset>`;

fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemap, 'utf8');

console.log('✅ Sitemap generated at /public/sitemap.xml');
