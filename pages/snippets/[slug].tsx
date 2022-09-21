import dynamic from 'next/dynamic';
import { MDXRemote } from 'next-mdx-remote';
import type { NextPage, GetStaticProps } from 'next';

import Code from '@/components/Code';

import SnippetLayout from '~/layouts/Snippet';

import { mdxToHtml } from '~/lib/mdx';
import { snippetsQuery, snippetSlugsQuery } from '~/lib/sanity/queries';
import { sanityClient, getClient } from '~/lib/sanity/sanity-server';
import type { Snippet } from '~/lib/types';

const WaveAnimationSandpack = dynamic(
  () => import('@/components/MDX/WaveAnimation/Sandpack')
);

const SnippetDetail: NextPage<{ snippet: Snippet }> = ({ snippet }) => {
  return (
    <SnippetLayout snippet={snippet}>
      <MDXRemote
        {...snippet.content}
        components={
          {
            pre: Code,
            WaveAnimationSandpack
          } as any
        }
      />
    </SnippetLayout>
  );
};

export default SnippetDetail;

export const getStaticPaths = async () => {
  const paths = await sanityClient.fetch(snippetSlugsQuery);

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false
}) => {
  const { snippet } = await getClient(preview).fetch(snippetsQuery, {
    slug: params?.slug
  });

  if (!snippet) {
    return { notFound: true };
  }

  const { html } = await mdxToHtml(snippet.content);

  return {
    props: {
      snippet: {
        ...snippet,
        content: html
      }
    }
  };
};
