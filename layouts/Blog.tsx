import Link from 'next/link';
import { useEffect, useState } from 'react';

import Anchor from '~/components/Anchor';
import Box from '~/components/Box';
import Flex from '~/components/Flex';
import Grid from '~/components/Grid';
import Hero from '~/components/Hero';
import Pill from '~/components/Pill';
import SEO from '~/components/Seo';
import TableOfContent from '~/components/TableOfContent';
import Text from '~/components/Typography';
import { WebmentionCount } from '~/components/Webmentions';

import Layout from '~/layout';
import Signature from './Signature';

import config from 'config/seo_meta.json';
import generateSocialImage from '~/lib/OpenGraph';

import type { Blog } from 'contentlayer/generated';

interface WebmentionBlogDataProps {
  date: string;
  postUrl: string;
  subtitle?: string;
}

const WebmentionBlogData = (props: WebmentionBlogDataProps) => {
  const { date, postUrl, subtitle } = props;

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
      {subtitle && <p className="hidden p-summary e-content">{subtitle}</p>}
    </>
  );
};

interface Props {
  post: Blog;
  children?: React.ReactNode;
}

const BlogLayout = ({ children, post }: Props) => {
  const { date, updated, slug, subtitle, title, readingTime, cover, tags } =
    post;
  const postUrl = config.openGraph.url + '/blog/' + slug;

  const headerProps = {
    title,
    offsetHeight: 256,
    showProgressBarOnMobile: true
  };

  const [ids, setIds] = useState<Array<{ id: string; title: string }>>([]);

  useEffect(() => {
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

  const socialImageConf = generateSocialImage({
    title,
    underlayImage: cover?.slice(cover.lastIndexOf('/') + 1),
    cloudName: 'laodeaksar',
    imagePublicID: 'og_social_large.png'
  });

  const keywords = tags.join(', ');

  return (
    <Layout footer header headerProps={headerProps}>
      <SEO
        title={title}
        description={subtitle}
        date={new Date(date).toISOString()}
        openGraph={{
          title: title,
          description: subtitle,
          type: 'article',
          images: [
            {
              url: socialImageConf,
              width: '1200',
              height: '630',
              alt: title
            }
          ]
        }}
      />
      <article className="h-entry">
        <Grid columns="small" gapX={4}>
          <Hero>
            <Box
              css={{
                marginBottom: '24px',
                fontSize: '$2'
              }}
            >
              <Link href="/" passHref>
                <Anchor arrow="left" discreet>
                  Home
                </Anchor>
              </Link>
            </Box>

            <Hero.Title className="p-name">{title}</Hero.Title>
            <Hero.Info>
              <Flex mb={3} wrap>
                <Text
                  as="p"
                  size="1"
                  variant="tertiary"
                  weight="3"
                  css={{ marginBottom: 0 }}
                >
                  {new Date(date).toLocaleDateString('en', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric'
                  })}{' '}
                  / {readingTime.text} /{' '}
                </Text>
                <WebmentionCount target={postUrl} />
              </Flex>
              <Flex css={{ marginLeft: '-$2' }}>
                <Pill variant="info">
                  Last Updated{' '}
                  {new Date(updated).toLocaleDateString('en', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric'
                  })}
                </Pill>
              </Flex>
            </Hero.Info>

            {cover && <Hero.Img className="u-photo" src={cover} />}
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
        <WebmentionBlogData date={date} postUrl={postUrl} subtitle={subtitle} />
      </article>
    </Layout>
  );
};

export default BlogLayout;
