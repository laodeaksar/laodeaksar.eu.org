import { pick } from 'lodash';
import type { InferGetStaticPropsType, GetStaticPropsContext } from 'next';

import tagColors from '~/lib/tagColor';

import Box from '~/components/Box';
import Grid from '~/components/Grid';
import SEO from '~/components/Seo';
import Text, { H2 } from '~/components/Typography';
import { TagList } from '~/components/Blog/Tags';

import Layout from '~/layout';

import {
  getAllBlogsWhichBelongToCurrentSlug,
  getAllTags
} from '~/lib/get-data';

let year = 0;

const Tag = ({
  posts = [],
  currentTag
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // @ts-ignore
  const { bg, name } = { ...tagColors[currentTag], ...currentTag };
  const title = `Posts list for ${currentTag} tags`;

  return (
    <Layout footer header headerProps={{ offsetHeight: 256 }}>
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
  return {
    paths: getAllTags().map((slug) => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps = ({ params }: GetStaticPropsContext) => {
  const posts = getAllBlogsWhichBelongToCurrentSlug(params, 'tags')
    ?.map((posts) => pick(posts, ['date', 'description', 'title', 'slug']))
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return { props: { posts, currentTag: params?.slug as string } };
};
