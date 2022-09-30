import React, { Suspense } from 'react';
import { Box, Flex, Grid, Pill, Text } from '@bahutara/design-system';

import Hero from '@/components/Hero';
import Link from '@/components/Link';
import TableOfContent from '@/components/TableOfContent';
import siteMetadata from '@/layout/siteMetadata';
import { WebmentionCount } from '@/components/Webmentions';
import Layout from '@/layout';

import Signature from './Signature';

import { createOgImage } from '~/lib/OpenGraph';
import { urlForImage } from '~/lib/sanity/sanity';
import { Post } from '~/lib/types';

interface WebmentionBlogDataProps {
  date: string;
  postUrl: string;
  description?: string;
}

const WebmentionBlogData = (props: WebmentionBlogDataProps) => {
  const { date, postUrl, description } = props;

  return (
    <>
      <time
        className="hidden dt-published"
        itemProp="datepublished"
        dateTime={date}
      >
        {new Date(date).toISOString()}
      </time>
      <a className="hidden u-url" href={postUrl} />
      {description && (
        <p className="hidden p-summary e-content">{description}</p>
      )}
    </>
  );
};

const BlogLayout = ({
  children,
  post
}: React.PropsWithChildren<{ post: Post }>) => {
  const {
    date,
    updated,
    slug,
    description,
    title,
    readingTime,
    image,
    tags,
    url
  } = post;
  const postUrl = `${siteMetadata.siteUrl}${url}`;

  const headerProps = {
    title,
    offsetHeight: 256,
    showProgressBarOnMobile: true
  };

  const [ids, setIds] = React.useState<Array<{ id: string; title: string }>>(
    []
  );

  React.useEffect(() => {
    setTimeout(() => {
      const titles = document.querySelectorAll('h2');
      const idArrays = Array.prototype.slice
        .call(titles)
        .map((title: { id: any; innerText: any }) => ({
          id: title.id,
          title: title.innerText
        })) as Array<{
        id: string;
        title: string;
      }>;
      setIds(idArrays);
    }, 500);
  }, [slug]);

  const socialImage = createOgImage({
    title,
    meta: description
  });

  // const keywords = tags.join(", ");

  return (
    <Layout
      footer
      header
      title={title}
      description={description}
      date={new Date(date).toISOString()}
      imageUrl={socialImage}
      type="article"
      headerProps={headerProps}
    >
      <article className="h-entry">
        <Suspense fallback={false}>
          <Grid columns="small" gapX={4}>
            <Hero>
              <Box
                css={{
                  marginBottom: '24px',
                  fontSize: '$2'
                }}
              >
                <Link href="/" arrow="left" discreet>
                  Home
                </Link>
              </Box>

              <Hero.Title className="p-name">{title}</Hero.Title>
              <Hero.Info>
                <Flex css={{ mb: '$3' }} wrap>
                  {tags.map((text, id) => (
                    <Link key={id} href={`/tags/${text}`} hastag discreet>
                      {text}
                    </Link>
                  ))}
                  <Text
                    as="p"
                    size="1"
                    variant="tertiary"
                    weight="3"
                    css={{ marginBottom: 0 }}
                  >
                    {new Date(date).toLocaleDateString('en', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric'
                    })}{' '}
                    / {readingTime} /{' '}
                  </Text>
                  <WebmentionCount target={postUrl} />
                </Flex>
                <Flex css={{ marginLeft: '-$2' }}>
                  <Pill variant="info">
                    Last Updated{' '}
                    {new Date(updated).toLocaleDateString('en', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric'
                    })}
                  </Pill>
                </Flex>
              </Hero.Info>

              {image && (
                <Hero.Img className="u-photo" src={urlForImage(image)} />
              )}
            </Hero>
            <TableOfContent ids={ids} />
            <Box
              css={{
                padding: '20px 0px',
                gridColumn: '2',
                color: 'var(--laodeaksar-colors-typeface-secondary)',

                h3: {
                  marginTop: '2em'
                },

                section: {
                  marginTop: '5em'
                }
              }}
            >
              {children}
            </Box>
          </Grid>
          <Signature title={title} url={postUrl} />
          <WebmentionBlogData
            date={date}
            postUrl={postUrl}
            description={description}
          />
        </Suspense>
      </article>
    </Layout>
  );
};

export default BlogLayout;
