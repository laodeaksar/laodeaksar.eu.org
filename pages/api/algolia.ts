/*import algoliasearch from 'algoliasearch';
import sanityClient from '@sanity/client';
import indexer, { flattenBlocks } from 'sanity-algolia';
import type { NextApiRequest, NextApiResponse } from 'next';

const algolia = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_KEY
);
const sanity = sanityClient();*/

export default function handler() {
  /*const sanityAlgolia = indexer(
    {
      post: {
        index: algolia.initIndex('posts')
      }
    },
    (document) => {
      switch (document._type) {
        case 'post':
          return {
            title: document.title,
            path: document.slug.current,
            publishedAt: document.date,
            excerpt: flattenBlocks(document.excerpt)
          };
        default:
          throw new Error(`Unknown type: ${document.type}`);
      }
    }
  );

  return sanityAlgolia
    .webhookSync(sanity, req.body)
    .then(() => res.status(200).send('ok'));*/
}
