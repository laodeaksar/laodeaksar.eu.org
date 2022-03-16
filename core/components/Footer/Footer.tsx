import Link from 'next/link';

import { styled } from '~/lib/stitches.config';

import Anchor from '~/components/Anchor';
import Box from '~/components/Box';
import Flex from '~/components/Flex';
import Grid from '~/components/Grid';
import Logo from '~/components/Logo';
import NowPlaying from '~/components/NowPlaying';
import Text, { EM } from '~/components/Typography';

const Footer = () => (
  <FooterBlock>
    <hr />
    <Grid columns="medium" gapX={4}>
      <FooterWrapper direction="column" justifyContent="space-evenly" gap={6}>
        <Grid columns={3} full>
          <Box>
            <Text size={1}>
              <Grid>
                <Link href="/" passHref>
                  <Anchor discreet>Home</Anchor>
                </Link>
                <Link href="/design" passHref>
                  <Anchor discreet>Design</Anchor>
                </Link>
                <Link href="/feed.xml" passHref>
                  <Anchor discreet>RSS</Anchor>
                </Link>
              </Grid>
            </Text>
          </Box>
          <Box>
            <Text size={1}>
              <Grid>
                <Anchor
                  data-splitbee-event="External Link"
                  data-splitbee-event-destination="twitter"
                  discreet
                  href="https://twitter.com/ode_aksar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Anchor>
                <Anchor
                  data-splitbee-event="External Link"
                  data-splitbee-event-destination="github"
                  discreet
                  href="https://github.com/laodeaksar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Anchor>
                <Anchor
                  data-splitbee-event="External Link"
                  data-splitbee-event-destination="revue"
                  discreet
                  href="https://www.getrevue.co/profile/laodeaksar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Newsletter
                </Anchor>
              </Grid>
            </Text>
          </Box>
          <Box>
            <Text size={1}>
              <Grid>
                <Anchor
                  discreet
                  href="https://laodeaksar.eu.org/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </Anchor>
                <Anchor discreet href="https://www.figma.com/">
                  Roadmap
                </Anchor>
              </Grid>
            </Text>
          </Box>
        </Grid>

        <FooterContent
          direction={{
            '@initial': 'column-reverse',
            '@sm': 'row'
          }}
          justifyContent="space-between"
          alignItems={{
            '@initial': 'start',
            '@sm': 'center'
          }}
        >
          <Flex justifyContent="space-between" alignItems="center" full>
            <Text
              as="p"
              size="1"
              variant="primary"
              weight="3"
              css={{ margin: 0 }}
            >
              &copy; {new Date().getFullYear()} Aksar La&apos;ode ---{' '}
              <EM size={1}>Kendari</EM>
            </Text>
            <Box
              css={{
                '@initial': {
                  display: 'block',
                  transform: 'translateY(4px)'
                },
                '@sm': { display: 'none' }
              }}
            >
              <Logo alt="Aksar La'ode logo" size={35} />
            </Box>
          </Flex>
          <NowPlaying />
        </FooterContent>
      </FooterWrapper>
    </Grid>
  </FooterBlock>
);

export default Footer;

const FooterBlock = styled('footer', {
  background: 'var(--laodeaksar-colors-body)',
  paddingTop: '$8',
  transition: '0.5s',
  width: '$full',

  hr: {
    height: '1px',
    width: '$full',
    background: 'hsl(var(--palette-gray-20))',
    border: 'none'
  }
});

const FooterWrapper = styled(Flex, {
  py: '$4',
  width: '$full',
  gridColumn: '2',
  margin: '0 auto'
});

const FooterContent = styled(Flex, {
  width: '$full',

  '@sm': {
    height: '$8'
  }
});
