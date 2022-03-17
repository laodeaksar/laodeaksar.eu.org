import type { GetStaticPropsContext } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';

import Code from '~/components/Code';

import SnippetLayout from '~/layouts/Snippet';

import { allSnippets } from 'contentlayer/generated';
import type { Snippet } from 'contentlayer/generated';

export default function SnippetDetail({ snippet }: { snippet: Snippet }) {
  const Component = useMDXComponent(snippet.body.code);

  return (
    <SnippetLayout snippet={snippet}>
      <Component
        components={{
          pre: Code
        }}
      />
    </SnippetLayout>
  );
}

export const getStaticPaths = () => {
  return {
    paths: allSnippets.map((s) => ({ params: { slug: s.slug } })),
    fallback: false
  };
};

export const getStaticProps = ({ params }: GetStaticPropsContext) => {
  const snippet = allSnippets.find((s) => s.slug === params?.slug)!;

  return { props: { snippet } };
};
