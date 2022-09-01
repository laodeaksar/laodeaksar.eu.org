import type { NextApiRequest, NextApiResponse } from 'next';
import algoliasearch from 'algoliasearch';
import indexer from 'sanity-algolia';

import { postFields, snippetFields } from '~/lib/queries';
import { sanityClient } from '~/lib/sanity-server';

const algolia = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_ADMIN_KEY as string
);

//const sanity = sanityClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400);
    res.json({ message: 'Bad request' });
    return;
  }

  const algoliaIndex = algolia.initIndex('my-index');

  const sanityAlgolia = indexer(
    {
      post: {
        index: algoliaIndex,
        projection: `{ ${postFields} }`
      },
      snippet: {
        index: algoliaIndex,
        projection: `{ ${snippetFields} }`
      }
    },

    (document) => document
  );

  return sanityAlgolia
    .webhookSync(sanityClient as any, req.body)
    .then(() => res.status(200).send('ok'))
    .catch(() => res.status(400).send('noooo'));
}
