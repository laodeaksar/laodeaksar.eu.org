import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, Fragment, ReactNode } from 'react';

import config from 'config/seo_meta.json';

const baseUrl = 'https://laodeaksar.eu.org';

interface OgImage {
  url?: string;
  width?: string;
  height?: string;
  alt?: string;
}

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
    images?: OgImage[];
  };
  children?: ReactNode;
}

const ogImage = ({ url, width, height, alt }: OgImage, index: number) => {
  const imgUrl = baseUrl ? new URL(url!, baseUrl).toString() : url;

  return (
    <Fragment key={`og:image:${index}`}>
      <meta
        key={`og:image:url:${index}`}
        property="og:image"
        content={imgUrl}
      />
      <meta
        key={`og:image:width:${index}`}
        property="og:image:width"
        content={width}
      />
      <meta
        key={`og:image:height:${index}`}
        property="og:image:height"
        content={height}
      />
      <meta
        key={`og:image:alt:${index}`}
        property="og:image:alt"
        content={alt}
      />
    </Fragment>
  );
};

const twitterImage = ({ url }: OgImage, index: number) => {
  const imgUrl = baseUrl ? new URL(url!, baseUrl).toString() : url;

  return (
    <Fragment key={`twitter:image:${index}`}>
      <meta
        key={`twitter:image:url:${index}`}
        property="twitter:image"
        content={imgUrl}
      />
    </Fragment>
  );
};

const SEO: FC<Props> = ({
  title,
  description,
  robots,
  openGraph,
  date,
  children
}) => {
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
      {openGraph?.images?.length
        ? openGraph.images.map((img, index) => ogImage(img, index))
        : ogImage(config.openGraph.images[0], 0)}
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
      {openGraph?.images?.length
        ? openGraph.images.map((img, index) => twitterImage(img, index))
        : twitterImage(config.openGraph.images[0], 0)}
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
