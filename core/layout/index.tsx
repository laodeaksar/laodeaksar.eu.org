import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

// import Footer from '@/components/Footer';
import Header from '@/components/Header';
import siteMetadata from './siteMetadata';

import { Wrapper } from './Styles';
import type { LayoutProps } from './types';

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
  suspense: true
});

const Layout = (props: LayoutProps) => {
  const { children, header, footer, headerProps, ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: siteMetadata.title,
    description: siteMetadata.description,
    imageUrl: siteMetadata.socialBanner,
    type: 'website',
    twitterHandle: siteMetadata.twitterHandle,
    canonicalUrl: `${siteMetadata.siteUrl}${router.asPath}`,
    date: null,
    ...customMeta
  };

  return (
    <Wrapper>
      <Head>
        <title>{meta.title}</title>
        <meta name="title" content={meta.title} />
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
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
        <meta
          property="og:url"
          content={`${siteMetadata.siteUrl}${router.asPath}`}
        />
        <link rel="canonical" href={meta.canonicalUrl} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Braydon Coyer" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.imageUrl} />
        <meta property="og:image:secure_url" content={meta.imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height:" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={meta.twitterHandle} />
        <meta name="twitter:site" content={meta.twitterHandle} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.imageUrl} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      {header && <Header {...headerProps} />}
      {children}
      {footer && <Footer />}
    </Wrapper>
  );
};

export default Layout;
