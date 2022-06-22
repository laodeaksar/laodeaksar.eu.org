const fs = require('fs');
const lunr = require('lunr');
import { sanityClient } from 'lib/sanity-server';
import { allSnippetQuery ,indexQuery } from '~/lib/queries';

(async () => {
  const blog = await sanityClient.fetch(indexQuery);
  const snippet = await sanityClient.fetch(allSnippetQuery);

  const documents = [...blog, ...snippet];

  const index = lunr(function () {
    this.field('title');
    this.field('description');
    this.field('tags');
    this.field('types');
    this.ref('slug');

    documents.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  const store = documents.reduce((acc, { slug, description, title, types }) => {
    acc[slug] = { title, description, slug, types };
    return acc;
  }, {});

  try {
    fs.readdirSync('cache');
  } catch (error) {
    fs.mkdirSync('cache');
  }

  fs.writeFile(
    'cache/search.json',
    JSON.stringify({ index, store }),
    (error) => {
      if (error) {
        return console.error(error);
      }
    }
  );
})();
