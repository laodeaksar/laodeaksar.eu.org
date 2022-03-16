import type { VFC } from 'react';
import Script from 'next/script';

import SEO from '.';

const Head: VFC = () => {
  return (
    <SEO>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <Script async data-no-cookie data-api="_hive" src="/bee.js" /> */}
    </SEO>
  );
};

export default Head;
