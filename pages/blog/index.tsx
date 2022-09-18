import { Suspense } from 'react';
import type { NextPage } from 'next';

import { Box, Grid, H2 } from '@laodeaksarr/design-system';

import BlogCard from '~/theme/components/Blog';
import Layout from '~/theme/layout';

import { indexQuery } from '~/lib/queries';
import { getClient } from '~/lib/sanity-server';
import { Post } from '~/lib/types';

const PostPage: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Suspense fallback={null}>
      <Layout
        footer
        header
        title="Blog Page"
        headerProps={{ offsetHeight: 256 }}
      >
        <Grid columns="medium" gapX={4} gapY={12} all>
          <Box as="section">
            <H2>All articles</H2>
            <BlogCard posts={posts} />
          </Box>
        </Grid>
      </Layout>
    </Suspense>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const posts = await getClient(preview).fetch<Post[]>(indexQuery);

  return {
    props: { posts }
  };
};

export default PostPage;
