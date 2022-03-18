import { writeFileSync } from 'fs';
import RSS from 'rss';
import { allBlogs } from '../.contentlayer/generated/index.mjs';

async function generate() {
  const feed = new RSS({
    title: "Aksar La'ode",
    description:
      "Hi I'm Aksar, and this is my blog. Here, I share through my writing my experience as a frontend engineer.",
    site_url: 'https://laodeaksar.eu.org',
    feed_url: 'https://laodeaksar.eu.org/feed.xml',
    image_url: 'https://laodeaksar.eu.org/static/og/default-social-image.png',
    language: 'en'
  });

  allBlogs.map((post) => {
    const url = 'https://laodeaksar.eu.org/blog/' + post.slug;

    feed.item({
      title: post.title,
      description: post.description,
      date: post.date,
      author: "Aksar La'ode",
      url,
      guid: url
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
