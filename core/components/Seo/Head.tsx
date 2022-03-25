import type { VFC } from 'react';

import SEO from '.';

const Head: VFC = () => {
  return (
    <SEO>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script async data-api="_hive" src="/bee.js" />;
      <meta
        name="msapplication-config"
        content="/static/favicons/browserconfig.xml"
      />
      <meta
        name="msapplication-TileImage"
        content="/static/favicons/mstile-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        href="/static/favicons/favicon.svg"
      />
      <link rel="icon" type="image/png" href="/static/favicons/favicon.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/static/favicons/safari-pinned-tab.svg"
        color="#333333"
      />
    </SEO>
  );
};

export default Head;
