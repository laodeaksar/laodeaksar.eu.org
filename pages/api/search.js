import lunr from 'lunr';
//import search from '../../cache/search.json';
import { indexQuery } from '~/lib/sanity/queries';
import { snippetsQuery, snippetSlugsQuery } from '~/lib/sanity/queries';
import { getClient } from '~/lib/sanity/sanity-server';

const searchEndpoint = async (req, res) => {
  const allPost = await getClient(req.preview ?? false).fetch(indexQuery);
  const allSnippet = await getClient(req.preview ?? false).fetch(snippetsQuery);

  const documents = [...allPost, ...allSnippet];

  const index = lunr(function () {
    this.field('title');
    this.field('subtitle');
    this.field('keywords');
    this.field('type');
    this.ref('slug');

    documents.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  const store = documents.reduce((acc, { slug, subtitle, title, type }) => {
    acc[slug] = { title, subtitle, slug, type };
    return acc;
  }, {});

  //const index = lunr.Index.load(search.index);
  //const store = search.store;

  const refs = index.search(req.query.q);
  const results = refs.map(({ ref }) => store[ref]);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }));
};

export default searchEndpoint;
