import RSS from 'rss';

import { sanityClient } from '~/lib/sanity-server';
import { indexQuery } from '~/lib/queries';
import { Post } from '~/lib/types';

export async function getServerSideProps({ res }: any) {
  const feed = new RSS({
    title: 'Lee Robinson',
    site_url: 'https://laodeaksar.eu.org',
    feed_url: 'https://laodeaksar.eu.org/feed.xml'
  });

  const allPosts = await sanityClient.fetch(indexQuery);
  allPosts.map((post: Post) => {
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

export default function RSSFeed() {
  return null;
}
