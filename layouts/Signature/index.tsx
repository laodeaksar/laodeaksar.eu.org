import dynamic from 'next/dynamic';
import { styled, Text } from '@bahutara/design-system';

import Link from '@/components/Link';

const Newsletter = dynamic(() => import('@/components/Newsletter'));

const Signature = ({ url }: { url: string }) => {
  return (
    <ColoredBlockWrapper>
      <section>
        <Text as="p" weight="4">
          Be the first one to share this article!
        </Text>
        <Text as="p">
          <Link
            data-splitbee-event="External Link"
            data-splitbee-event-destination="twitter"
            underline
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              url
            )}`}
          >
            Tweet about this post
          </Link>{' '}
          and it will show up here! Or,{' '}
          <Link
            data-splitbee-event="External Link"
            data-splitbee-event-destination="twitter"
            underline
            href={`https://mobile.twitter.com/search?q=${url}`}
          >
            click here to leave a comment
          </Link>{' '}
          and discuss about it on Twitter.
        </Text>

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
