import { MDXRemote } from 'next-mdx-remote';
import type { GetStaticProps, NextPage } from 'next';

import components from '@/components/MDX/MDXComponents';
import Tweet from '@/components/screens/tweet';

import BlogLayout from '~/layouts/Blog';

import { getTweets } from '~/lib/tweets';
import { postQuery, postSlugsQuery } from '~/lib/sanity/queries';
import { sanityClient, getClient } from '~/lib/sanity/sanity-server';
import { mdxToHtml } from '~/lib/mdx';
import { Post } from '~/lib/types';

const PostDetail: NextPage<{ post: Post }> = ({ post }) => {
  const StaticTweet = ({ id }: any) => {
    const tweet = post.tweets.find(tweet => tweet.id === id);
    return <Tweet {...tweet} />;
  };

  return (
    <BlogLayout post={post}>
      <MDXRemote
        {...post.content}
        components={
          {
            ...components,
            StaticTweet
          } as any
        }
      />
    </BlogLayout>
  );
};

export default PostDetail;

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
  const { post } = await getClient(preview).fetch(postQuery, {
    slug: params?.slug
  });

  if (!post) {
    return { notFound: true };
  }

  const { html, tweetIDs, readingTime } = await mdxToHtml(post.content);
  const tweets = await getTweets(tweetIDs);

  const ogImage = `/api/og?title=${post.title}&date=${post.date}&readTime=${readingTime}`

  return {
    props: {
      post: {
        ...post,
        content: html,
        tweets,
        readingTime,
        ogImage
      }
    }
  };
};
