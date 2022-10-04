import lunr from 'lunr';
import { indexQuery } from '~/lib/sanity/queries';
import { getClient } from '~/lib/sanity/sanity-server';

const searchEndpoint = async (req, res) => {
  const documents = await getClient(req.preview ?? false).fetch(indexQuery);

  console.log('post:', documents);

  //const documents = [allPost];

  const idx = lunr(function () {
    this.field('title');
    this.field('subtitle');
    this.field('keywords');
    this.field('type');
    this.ref('slug');

    documents.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  console.log('idx:', idx);

  const index = lunr.Index.load(idx);

  const store = documents.reduce((acc, { slug, subtitle, title, type }) => {
    acc[slug] = { title, subtitle, slug, type };
    return acc;
  }, {});

  console.log('store', store);

  const refs = index.search(req.query.q);
  const results = refs.map(({ ref }) => store[ref]);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }));
};

export default searchEndpoint;
