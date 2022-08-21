import { useEffect, useState, type PropsWithChildren, Suspense } from 'react';

import {
  Box,
  Flex,
  formatDate,
  Grid,
  Pill,
  Text
} from '@laodeaksarr/design-system';

import Hero from '~/components/Hero';
import Link from '~/components/Link';
import SEO from '~/components/Seo';
import TableOfContent from '~/components/TableOfContent';
import { WebmentionCount } from '~/components/Webmentions';

import Layout from '~/layout';
import Signature from './Signature';

import config from 'config/seo_meta.json';
import generateSocialImage from '~/lib/OpenGraph';
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

const BlogLayout = ({ children, post }: PropsWithChildren<{ post: Post }>) => {
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
  const postUrl = config.openGraph.url + url;

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
    underlayImage: image?.url?.slice(image.url.lastIndexOf('/') + 1),
    cloudName: 'laodeaksar',
    imagePublicID: 'og_social_large.png'
  });

  // const keywords = tags.join(", ");

  return (
    <Layout footer header headerProps={headerProps}>
      <SEO
        title={title}
        description={description}
        date={new Date(date).toISOString()}
        openGraph={{
          title: title,
          description: description,
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
                <Flex mb={3} wrap>
                  {tags.map((text) => (
                    <Link key={text} href={'/tags/' + text} hastag discreet>
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
                    {formatDate(date)} / {readingTime} /{' '}
                  </Text>
                  <WebmentionCount target={postUrl} />
                </Flex>
                <Flex css={{ marginLeft: '-$2' }}>
                  <Pill variant="info">Last Updated {formatDate(updated)}</Pill>
                </Flex>
              </Hero.Info>

              {image && <Hero.Img className="u-photo" src={image.url} />}
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
