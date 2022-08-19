import React from 'react';

import {
  Grid,
  H2,
  Text,
} from '@laodeaksarr/design-system';

import SEO from '~/components/Seo';

import prisma from '~/lib/prisma';
import Layout from '~/layout';
import GuestbookComponent from '~/components/Guestbook';

import type { GetStaticProps } from 'next';
import type { guestbook } from '@prisma/client';

export default function Guestbook({ fallbackData }: { fallbackData: guestbook[] }) {
  return (
    <Layout footer header headerProps={{ offsetHeight: 256 }}>
      <SEO title="Guestbook Page" />
      <Grid columns="medium" gapX={4} gapY={12} all>
        <div>
          <H2>Guestbook</H2>
          <Text as="p">
            Leave a comment below. It could be anything - appreciation,
            information, wisdom, or even humor. Surprise me!
          </Text>
          <GuestbookComponent fallbackData={fallbackData} />{' '}
        </div>
      </Grid>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  });

  const fallbackData = entries.map((entry) => ({
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
