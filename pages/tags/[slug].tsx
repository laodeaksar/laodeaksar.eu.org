import type { InferGetStaticPropsType } from 'next';

import tagColors from '~/lib/tagColor';

import { Box, Grid, H2, Text } from '@laodeaksarr/design-system';

import SEO from '~/components/Seo';
import { TagList } from '~/components/Blog/Tags';

import Layout from '~/layout';
import { getClient, sanityClient } from '~/lib/sanity-server';
import { postSlugsQuery, indexQuery } from '~/lib/queries';
import { Post } from '~/lib/types';

let year = 0;

const Tag = ({
  posts = [],
  currentTag
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // @ts-ignore
  const { bg, name } = { ...tagColors[currentTag], ...currentTag };
  const title = `Posts list for ${currentTag} tags`;

  return (
    <Layout footer header headerProps={{ offsetHeight: 200 }}>
      <SEO title={title} />
      <Grid columns="medium" gapX={4} gapY={12} all>
        <Box as="section">
          <H2
            gradient
            css={{
              backgroundImage: bg!,
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

export const getStaticProps = async ({ params, preview = false }: any) => {
  const posts: Post[] = await getClient(preview).fetch(indexQuery);

  return {
    props: {
      posts,
      currentTag: params?.slug as string
    }
  };
};
