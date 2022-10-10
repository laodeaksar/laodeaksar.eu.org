import lunr from 'lunr';
import { getClient } from '~/lib/sanity/sanity-server';

const searchEndpoint = async (req, res) => {
  const query = `
  *[_type == "post"] | order(date desc, _updatedAt desc) {
    title, description, "slug": slug.current
  }`;

  const documents = await getClient(req.preview ?? false).fetch(query);

  const index = lunr(function () {
    this.field('title');
    this.field('description');
    this.ref('slug');

    documents.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  const store = documents.reduce((acc, { slug, description, title }) => {
    acc[slug] = { title, description, slug };
    return acc;
  }, {});

  const refs = index.search(req.query.q);
  const results = refs.map(({ ref }) => store[ref]);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }));
};

export default searchEndpoint;
