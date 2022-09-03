import Head from 'next/head';
import { useRouter } from 'next/router';

import config from 'config/seo_meta.json';

interface Props {
  title?: string;
  description?: string;
  robots?: string;
  date?: string;
  openGraph?: {
    title?: string;
    type?: string;
    locale?: string;
    description?: string;
    site_name?: string;
    url?: string;
    images?: { url?: string; width?: string; height?: string; alt?: string };
  };
  children?: React.ReactNode;
}

const SEO = ({
  title,
  description,
  robots,
  openGraph,
  date,
  children
}: Props) => {
  const router = useRouter();
  const url = config.openGraph.url + router.asPath;
  const seoTitle = title
    ? `${config.titleTemplate.replace(/%s/g, title)}`
    : config.title;

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta key="title" name="title" content={seoTitle} />
      <meta
        key="description"
        name="description"
        content={description || config.description}
      />
      <meta
        key="og:type"
        property="og:type"
        content={openGraph?.type ?? config.openGraph.type}
      />
      <meta
        key="og:title"
        property="og:title"
        content={
          openGraph?.title ?? config.openGraph.title ?? title ?? config.title
        }
      />
      <meta
        key="og:description"
        property="og:description"
        content={
          openGraph?.description ??
          config.openGraph.description ??
          description ??
          config.description
        }
      />
      <meta
        key="og:site_name"
        property="og:site_name"
        content={openGraph?.site_name ?? config.openGraph.site_name}
      />
      <meta key="og:url" property="og:url" content={url} />
      {openGraph?.locale && (
        <meta key="og:locale" property="og:locale" content={openGraph.locale} />
      )}
      {config.twitter.cardType && (
        <meta
          key="twitter:card"
          name="twitter:card"
          content={config.twitter.cardType}
        />
      )}
      {config.twitter.site && (
        <meta
          key="twitter:site"
          name="twitter:site"
          content={config.twitter.site}
        />
      )}
      {config.twitter.handle && (
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content={config.twitter.handle}
        />
      )}
      <meta key="twitter:title" name="twitter:title" content={seoTitle} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description || config.description}
      />
      {openGraph?.images && (
        <>
          <meta
            key="og:image:url"
            property="og:image"
            content={openGraph?.images?.url}
          />
          <meta
            key="og:image:url"
            property="og:image:secure_url"
            content={openGraph?.images?.url}
          />
          <meta
            key="og:image:width"
            property="og:image:width"
            content={openGraph?.images?.width}
          />
          <meta
            key="og:image:height"
            property="og:image:height"
            content={openGraph.images.height}
          />
          <meta
            key="og:image:alt"
            property="og:image:alt"
            content={openGraph.images.alt}
          />
          <meta
            key="twitter:image:url"
            property="twitter:image"
            content={openGraph.images.url}
          />
        </>
      )}
      <link rel="canonical" href={url} />
      <meta key="robots" name="robots" content={robots ?? 'follow, index'} />
      <meta
        key="googlebot"
        name="googlebot"
        content={robots ?? 'follow, index'}
      />

      {date && <meta property="article:published_time" content={date} />}
      {children}
    </Head>
  );
};

export default SEO;
