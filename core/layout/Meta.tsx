import { useTheme } from '@bahutara/design-system';
import Head from 'next/head';

import { useEffect, useState } from 'react';

type Props = {
  title?: string;
  description?: string;
  type?: string;
  date?: string;
  tags?: string[];
  imageUrl?: string;
};

const Meta = ({
  title = "Aksar La'ode",
  type = 'website',
  description = 'Software developer, TypeScript enthusiast and dual student',
  date,
  tags,
  imageUrl
}: Props): JSX.Element => {
  const { dark } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="robots" content="follow, index" />
      <meta
        name="viewport"
        content="initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <meta
        name="msapplication-config"
        content="/static/favicons/browserconfig.xml"
      />
      <meta
        name="msapplication-TileImage"
        content="/static/favicons/mstile-144x144.png"
      />
      <script async data-api="_hive" src="/bee.js" />;
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="description" content={description} />
      {mounted && (
        <meta name="theme-color" content={dark ? '#222222' : '#f9fafb'} />
      )}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Aksar La'ode" />
      <meta property="og:url" content="https://laodeaksar.eu.org" />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height:" content="630" />
      <meta property="og:image:secure_url" content={imageUrl} />
      {date && <meta property="article:published_time" content={date} />}
      {tags && <meta property="article:tag" content={tags.join(', ')} />}
      {tags ? (
        <meta property="keywords" content={tags.join(', ')} />
      ) : (
        <meta
          name="keywords"
          content="Aksar La'ode, Portfolio, Next.js, Stitches React"
        />
      )}
      <meta name="application-name" content="Aksar La'ode" />
      <meta name="author" content="Aksar La'ode" />
      <meta name="HandheldFriendly" content="true" />
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
      <link
        rel="mask-icon"
        href="/static/favicons/safari-pinned-tab.svg"
        color="#333333"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://laodeaksar.eu.org" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@ode_aksar" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:src" content={imageUrl} />
      <meta name="google-site-verification" content="" />
    </Head>
  );
};

export default Meta;
