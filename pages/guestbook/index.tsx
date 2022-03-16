import Guestbook from '~/components/GuestBook';
import Grid from '~/components/Grid';
import SEO from '~/components/Seo';
import Text, { H2 } from '~/components/Typography';

import prisma from '~/lib/prisma';
import Layout from '~/layout';

const GuestbookPage = ({ fallbackData }) => (
  <Layout footer header headerProps={{ offsetHeight: 256 }}>
    <SEO title="Guestbook Page" />
    <Grid columns="medium" gapX={4} gapY={12} all>
      <div>
        <H2>Guestbook</H2>
        <Text as="p">
          Leave a comment below. It could be anything - appreciation,
          information, wisdom, or even humor. Surprise me!
        </Text>
        <Guestbook fallbackData={fallbackData} />
      </div>
    </Grid>
  </Layout>
);

export default GuestbookPage;

export const getStaticProps = async () => {
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
    },
    revalidate: 60
  };
};
