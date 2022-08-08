import type { GetStaticPropsContext } from "next";
import { MDXRemote } from "next-mdx-remote";
import dynamic from 'next/dynamic';

import Code from "~/components/Code";

import SnippetLayout from "~/layouts/Snippet";

import { snippetsQuery, snippetSlugsQuery } from "~/lib/queries";
import { sanityClient, getClient } from "~/lib/sanity-server";
import { mdxToHtml } from "~/lib/mdx";
import { Snippet } from "~/lib/types";

const WaveAnimationSandpack = dynamic(
  () => import('@theme/components/MDX/Widgets/WaveAnimation/Sandpack')
);

export default function SnippetDetail({ snippet }: { snippet: Snippet }) {
  return (
    <SnippetLayout snippet={snippet}>
      <MDXRemote
        {...snippet.content}
        components={{
          pre: Code,
          WaveAnimationSandpack,
        }}
      />
    </SnippetLayout>
  );
}

export const getStaticPaths = () => {
  const paths = await sanityClient.fetch(snippetSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps = ({ params, preview = false }) => {
  const { snippet } = await getClient(preview).fetch(snippetsQuery, {
    slug: params.slug,
  });

  if (!snippet) {
    return { notFound: true };
  }

  const { html } = await mdxToHtml(snippet.content);

  return {
    props: {
      snippet: {
        ...snippet,
        content: html,
      },
    },
  };
};
