import type { GetStaticProps, NextPage } from 'next';

import { Box, Grid, H2, Text } from '@laodeaksarr/design-system';

import SEO from '~/components/Seo';
import { TagList } from '~/components/Blog/Tags';

import Layout from '~/layout';

import { getColor } from '~/lib/getColor';
import { getClient, sanityClient } from '~/lib/sanity-server';
import { postSlugsQuery, tagsQuery } from '~/lib/queries';
import { Post } from '~/lib/types';

let year = 0;

const Tag: NextPage<{ posts: Post[]; currentTag?: string }> = ({
  posts = [],
  currentTag
}) => {
  const title = `Posts list for ${currentTag} tags`;

  return (
    <Layout footer header headerProps={{ offsetHeight: 200 }}>
      <SEO title={title} />
      <Grid columns="medium" gapX={4} gapY={12} all>
        <Box as="section">
          <H2
            gradient
            css={{
              linearGradient: getColor(currentTag),
              textTransform: 'capitalize'
            }}
          >
            {title}
          </H2>
          <Grid as="ul" css={{ margin: '0', padding: '0' }} gapY={1}>
            {posts.map((post) => {
              const currentYear = new Date(post.date).getFullYear();
              let printYear: boolean;

              if (currentYear !== year) {
                printYear = true;
                year = currentYear;
              } else {
                printYear = false;
              }

              return (
                <Box
                  as="li"
                  css={{
                    listStyle: 'none',
                    cursor: 'pointer',
                    marginBottom: 'calc(1.45rem / 2)',
                    lineHeight: '1.9',
                    letterSpacing: '0.3px'
                  }}
                  key={post.title}
                >
                  {printYear && (
                    <Text as="p" weight="4" css={{ paddingTop: '30px' }}>
                      {currentYear}
                    </Text>
                  )}
                  <TagList post={post} />
                </Box>
              );
            })}
          </Grid>
        </Box>
      </Grid>
    </Layout>
  );
};

export default Tag;

export const getStaticPaths = async () => {
  const paths = await sanityClient.fetch(postSlugsQuery);

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false
}) => {
  const posts = await getClient(preview).fetch<Post[]>(tagsQuery, {
    keyword: params?.slug
  });

  return {
    props: {
      posts,
      currentTag: params?.slug as string
    }
  };
};
