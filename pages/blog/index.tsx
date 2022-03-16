import type { InferGetStaticPropsType } from 'next';

import Box from '~/components/Box';
import BlogCard from '~/components/Blog';
import Grid from '~/components/Grid';
import SEO from '~/components/Seo';
import { H2 } from '~/components/Typography';

import Layout from '~/layout';

import { pick } from 'contentlayer/client';
import { allBlogs } from 'contentlayer/generated';

const BlogPage = ({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout footer header headerProps={{ offsetHeight: 256 }}>
      <SEO title="Blog Page" />
      <Grid columns="medium" gapX={4} gapY={12} all>
        <Box as="section">
          <H2>All articles</H2>
          <BlogCard posts={posts} />
        </Box>
      </Grid>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const posts = allBlogs
    .map((post) => pick(post, ['slug', 'title', 'date']))
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return { props: { posts } };
};

export default BlogPage;
