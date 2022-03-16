import type { VFC } from 'react';

import SEO from '.';

const Head: VFC = () => {
  return (
    <SEO>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Scripts />
    </SEO>
  );
};

export default Head;

function Scripts() {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  return <script async data-api="_hive" src="/bee.js" />;
}
