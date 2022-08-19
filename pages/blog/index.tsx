import { Suspense } from "react";
import type { InferGetStaticPropsType } from "next";

import { Box, Grid, H2 } from "@laodeaksarr/design-system";

import BlogCard from "~/components/Blog";
import SEO from "~/components/Seo";

import Layout from "~/layout";

import { indexQuery } from "~/lib/queries";
import { getClient } from "~/lib/sanity-server";
import { Post } from "~/lib/types";

const BlogPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout footer header headerProps={{ offsetHeight: 256 }}>
      <SEO title="Blog Page" />
      <Grid columns="medium" gapX={4} gapY={12} all>
        <Suspense fallback={null}>
          <Box as="section">
            <H2>All articles</H2>
            <BlogCard posts={posts} />
          </Box>
        </Suspense>
      </Grid>
    </Layout>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const posts = await getClient(preview).fetch<Post[]>(indexQuery);

  return {
    props: { posts },
  };
};

export default BlogPage;
