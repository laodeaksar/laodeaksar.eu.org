import type { GetStaticPropsContext } from 'next';

import MDXComponents from '~/components/MDX/MDXComponents';
import Tweet from '~/components/Tweet';

import BlogLayout from '~/layouts/Blog';

import { getTweets } from '~/lib/tweets';
=

interface BlogProps {
  post: Blog;
  tweets: any[];
}

export default function Post({ post, tweets }: BlogProps) {
  const Component = useMDXComponent(post.body.code);

  const StaticTweet = ({ id }) => {
    const tweet = tweets.find((tweet) => tweet.id === id);
    return <Tweet {...tweet} />;
  };

  return (
    <BlogLayout post={post}>
      <Component
        components={
          {
            ...MDXComponents,
            StaticTweet
          } as any
        }
      />
    </BlogLayout>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: getAllBlogs().map((s) => ({ params: { slug: s.slug } })),
    fallback: false
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = getCurrentBlog(params);
  const tweets = await getTweets(post?.tweetIds);

  return { props: { post, tweets } };
};
