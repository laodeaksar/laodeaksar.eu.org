import { writeFileSync } from 'fs';
import glob from 'fast-glob';
import prettier from 'prettier';

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await glob([
    'pages/**/*{.js,.tsx}',
    'pages/*{.js,.tsx}',
    'data/**/*.mdx',
    '!data/*.mdx',
    '!pages/**/[*',
    '!pages/_*{.js,.tsx}',
    '!pages/api',
    '!pages/404.tsx'
  ]);

  const actualRoutes = [];

  pages.forEach((page) => {
    const path = page
      .replace('pages', '')
      .replace('/index', '')
      .replace('data', '')
      .replace('.js', '')
      .replace('.tsx', '')
      .replace('.ts', '')
      .replace('.mdx', '');
    actualRoutes.push(path);
  });

  const now = new Date().toISOString();
  const lastmod = now.substring(0, now.lastIndexOf('.')) + '+00:00';

  const xmlRoutes = actualRoutes
    .map((route) => {
      const slashesCount = (route.match(/\//g) || []).length;
      let priority = 1 - 0.2 * slashesCount;
      if (route.length <= 1 || priority > 1.0) priority = 1.0;
      if (priority < 0.2) priority = 0.2;
      return `
        <url>
          <loc>https://laodeaksar.eu.org${route}</loc>
          <lastmod>${lastmod}</lastmod>
          <priority>${priority}</priority>
        </url>
      `;
    })
    .join('');

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${xmlRoutes}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted);
}

generate();
