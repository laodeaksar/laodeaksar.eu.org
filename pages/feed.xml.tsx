import RSS from 'rss';
import type { NextApiResponse, NextPage } from 'next';

import { sanityClient } from '~/lib/sanity-server';
import { indexQuery } from '~/lib/queries';
import { Post } from '~/lib/types';

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const feed = new RSS({
    title: "Aksar La'ode",
    site_url: 'https://laodeaksar.eu.org',
    feed_url: 'https://laodeaksar.eu.org/feed.xml'
  });

  const allPosts = await sanityClient.fetch<Post[]>(indexQuery);
  allPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `https://laodeaksar.eu.org/blog/${post.slug}`,
      date: post.date,
      description: post.description
    });
  });

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {}
  };
}

const RSSFeed: NextPage = () => {
  return null;
};

export default RSSFeed;
