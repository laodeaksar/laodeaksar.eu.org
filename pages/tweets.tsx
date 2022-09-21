import type { NextPage } from 'next';

import { Grid, H1 } from '@laodeaksarr/design-system';

import Tweet from '@/components/screens/tweet';
import Layout from '@/layout';

import { getTweets } from '~/lib/tweets';
import type { TransformedTweet } from '~/lib/types';

const Tweets: NextPage<Record<string, TransformedTweet>> = ({ tweets }) => {
  return (
    <Layout
      footer
      header
      title="Tweets Page"
      headerProps={{ offsetHeight: 256 }}
    >
      <Grid columns="medium" gapX={4} gapY={12} directAll>
        <div>
          <>
            <H1>Tweets</H1>
            {tweets.map((tweet: TransformedTweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </>
        </div>
      </Grid>
    </Layout>
  );
};

export default Tweets;

export const getStaticProps = async () => {
  const tweets = await getTweets([
    '1189444653059174401',
    '935857414435495937',
    '1334528781139259400',
    '1334334544598740994',
    '826528907381739520',
    '1308509070140162048',
    '1385236589547331589',
    '1402689156434776069',
    '997895977179721728',
    '1341090253864542208',
    '1383873047619276812',
    '1026872652290379776',
    '1346113149112619016',
    '1340107217970683906',
    '992629481578745856',
    '989142253468708864',
    '807626710350839808',
    '1341962177272537089',
    '1342869937841266688',
    '1116362674319908864',
    '1331380003716681728',
    '1002104154737684480'
  ]);

  return { props: { tweets } };
};
