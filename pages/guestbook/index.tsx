import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { GetStaticProps, NextPage } from 'next';
import type { guestbook } from '@prisma/client';
import { Grid, H2, Text } from '@bahutara/design-system';

//import GuestbookComponent from '@/components/screens/guestbook';
import Layout from '@/layout';

import prisma from '~/lib/prisma';

const Guestbook = dynamic(() => import('@/components/screens/guestbook'), {
  suspense: true,
});

const GuestbookPage: NextPage<{ fallbackData: guestbook[] }> = ({
  fallbackData
}) => {
  return (
    <Layout
      footer
      header
      title="Guestbook Page"
      headerProps={{ offsetHeight: 256 }}
    >
      <Grid columns="medium" gapX={4} gapY={12} directAll>
        <div>
          <H2>Guestbook</H2>
          <Text as="p">
            Leave a comment below. It could be anything - appreciation,
            information, wisdom, or even humor. Surprise me!
          </Text>
          <Suspense>
            <Guestbook fallbackData={fallbackData} />{' '}
          </Suspense>
        </div>
      </Grid>
    </Layout>
  );
};

export default GuestbookPage;

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  });

  const fallbackData = entries.map(entry => ({
    id: entry.id.toString(),
    body: entry.body,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString()
  }));

  return {
    props: {
      fallbackData
    }
  };
};
