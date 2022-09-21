import RSS from 'rss';
import type { GetServerSideProps } from 'next';

import { sanityClient } from '~/lib/sanity/sanity-server';
import { indexQuery } from '~/lib/sanity/queries';
import { Post } from '~/lib/types';

const BASE_URL = 'https://laodeaksar.eu.org';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = new RSS({
    title: "Aksar La'ode",
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/feed.xml`
  });

  const allPosts = await sanityClient.fetch(indexQuery);
  allPosts.map((post: Post) => {
    feed.item({
      title: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
      date: post.date,
      description: post.description
    });
  });

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(
    feed.xml({
      indent: true
    })
  );
  res.end();

  return {
    props: {}
  };
};

export default function RSSFeed() {
  return null;
}
