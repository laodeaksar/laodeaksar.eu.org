import dynamic from 'next/dynamic';

import Link from '@/components/Link';
import { WebmentionReplies } from '@/components/Webmentions';

import { styled, Text } from '@laodeaksarr/design-system';

const Newsletter = dynamic(() => import('@/components/Newsletter'));

const Signature = ({ title, url }: { title: string; url: string }) => {
  return (
    <ColoredBlockWrapper>
      <section>
        <WebmentionReplies title={title} url={url} />
        <Text as="p">
          Do you have any questions, comments or simply wish to contact me
          privately? Don&apos;t hesitate to shoot me a DM on{' '}
          <Link
            data-splitbee-event="External Link"
            data-splitbee-event-destination="twitter"
            favicon
            href="http://twitter.com/ode_aksar"
          >
            Twitter
          </Link>
          .
        </Text>
        <br />
        <Text as="p">
          Have a wonderful day. <br />
          Aksar La&apos;ode
        </Text>
        <Newsletter />
      </section>
    </ColoredBlockWrapper>
  );
};

export default Signature;

const ColoredBlockWrapper = styled('div', {
  background: 'var(--laodeaksar-colors-emphasis)',
  color: 'var(--laodeaksar-colors-typeface-primary)',
  py: '50px',
  width: '$full',
  gridColumn: '1 / 4',

  section: {
    '@media (max-width: 700px)': {
      px: '20px'
    },

    margin: '0 auto',
    maxWidth: '700px'
  }
});
