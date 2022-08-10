import { sanityClient } from '~/lib/sanity-server';
import { postSlugsQuery } from '~/lib/queries';

const createSitemap = (slugs: any) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
          .map((slug: any) => {
            return `
                <url>
                    <loc>${`https://laodeaksar.eu.org/${slug}`}</loc>
                </url>
            `;
          })
          .join('')}
    </urlset>
`;
export async function getServerSideProps({ res }: any) {
  const allPosts = await sanityClient.fetch(postSlugsQuery);
  const allPages = [
    ...allPosts.map((slug: any) => `blog/${slug}`),
    ...['', 'about', 'blog', 'tweets', 'uses']
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(createSitemap(allPages));
  res.end();

  return {
    props: {}
  };
}

export default function Sitemap() {
  return null;
}
