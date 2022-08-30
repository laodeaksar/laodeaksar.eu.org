import type { NextApiRequest, NextApiResponse } from 'next';
/* import algoliasearch from 'algoliasearch';
import indexer, { flattenBlocks } from 'sanity-algolia';

import { postField, snippetField } from '~/lib/queries';
import { sanityClient } from '~/lib/sanity-server';

const algolia = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

const sanity = sanityClient(); */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400);
    res.json({ message: 'Bad request' });
    return;
  }

  /*const algoliaIndex = algolia.initIndex('my-index');

  const sanityAlgolia = indexer(
    {
      post: {
        index: algoliaIndex,
        projection: { postaField }
      },
      snippet:{
        index: algoliaIndex,
        projection: { snippetField }
      }
    },

    (document) => document

  return sanityAlgolia
    .webhookSync(sanityClient, req.body)
    .then(() => res.status(200).send('ok'))
    .catch(() => res.status(400).send('noooo'));*/
}
