import type { GetStaticPropsContext } from 'next';

import Pre from '~/components/Code/Pre';

import SnippetLayout from '~/layouts/Snippet';

export default function SnippetDetail({ snippet }: { snippet: Snippet }) {
  const Component = useMDXComponent(snippet.body.code);

  return (
    <SnippetLayout snippet={snippet}>
      <Component
        components={{
          pre: Pre
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
