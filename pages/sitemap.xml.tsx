import type { GetServerSideProps } from 'next';

import { sanityClient } from '~/lib/sanity/sanity-server';
import { postSlugsQuery } from '~/lib/sanity/queries';
import type { Post } from '~/lib/types';

const createSitemap = (
  pages: string[]
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(page => {
            return `
                <url>
                    <loc>${`https://laodeaksar.eu.org/${page}`}</loc>
                </url>
            `;
          })
          .join('')}
    </urlset>
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const allPosts = await sanityClient.fetch<Post[]>(postSlugsQuery);
  const allPages = [
    ...allPosts.map(slug => `blog/${slug}`),
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
};

export default function Sitemap() {
  return null;
}
