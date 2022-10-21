import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { Box, Grid, H2 } from '@bahutara/design-system';

//import BlogCard from '@/components/screens/blog';
import Layout from '@/layout';

import { indexQuery } from '~/lib/sanity/queries';
import { getClient } from '~/lib/sanity/sanity-server';
import { Post } from '~/lib/types';

const BlogCard = dynamic(() => import('@/components/screens/blog'), {
  suspense: true,
});

const PostPage: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout
      footer
      header
      title="Blog Page"
      headerProps={{ offsetHeight: 256 }}
    >
      <Grid columns="medium" gapX={4} gapY={12} directAll>
        <Box as="section">
          <H2>All articles</H2>
          <Suspense>
            <BlogCard posts={posts} />
          </Suspense>
        </Box>
      </Grid>
    </Layout>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const posts = await getClient(preview).fetch<Post[]>(indexQuery);

  return {
    props: { posts }
  };
};

export default PostPage;
