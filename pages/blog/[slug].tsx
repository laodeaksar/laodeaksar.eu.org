import { MDXRemote } from 'next-mdx-remote';

import components from '~/components/MDX/MDXComponents';
import Tweet from '~/components/Tweet';

import BlogLayout from '~/layouts/Blog';

import { getTweets } from '~/lib/tweets';
import { postQuery, postSlugsQuery } from '~/lib/queries';
import { sanityClient, getClient } from '~/lib/sanity-server';
import { mdxToHtml } from '~/lib/mdx';
import { Post } from '~/lib/types';

export default function PostPage({ post }: { post: Post }) {
  const StaticTweet = ({ id }: any) => {
    const tweet = post.tweets.find((tweet) => tweet.id === id);
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
}

export const getStaticPaths = async () => {
  const paths = await sanityClient.fetch(postSlugsQuery);
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({ params, preview = false }: any) => {
  const { post } = await getClient(preview).fetch(postQuery, {
    slug: params.slug
  });

  if (!post) {
    return { notFound: true };
  }

  const { html, tweetIDs, readingTime } = await mdxToHtml(post.content);
  const tweets = await getTweets(tweetIDs);

  return {
    props: {
      post: {
        ...post,
        content: html,
        tweets,
        readingTime
      }
    }
  };
};
