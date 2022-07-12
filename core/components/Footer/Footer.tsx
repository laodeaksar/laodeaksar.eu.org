import {
  styled,
  Box,
  Grid,
  Text,
  EM,
  Flex,
} from '@laodeaksarr/design-system';

import Link from '~/components/Link';
import Logo from '~/components/Logo';
import NowPlaying from '~/components/NowPlaying';

const Footer = () => (
  <FooterBlock>
    <hr />
    <Grid columns="medium" gapX={4}>
      <FooterWrapper direction="column" justifyContent="space-evenly" gap={6}>
        <Grid columns={3} full>
          <Box>
            <Text size={1}>
              <Grid>
                <Link href="/" discreet>
                  Home
                </Link>
                <Link href="/design" discreet>
                  Design
                </Link>
                <Link href="/feed.xml" discreet>
                  RSS
                </Link>
              </Grid>
            </Text>
          </Box>
          <Box>
            <Text size={1}>
              <Grid>
                <Link
                  discreet
                  href="https://twitter.com/ode_aksar"
                >
                  Twitter
                </Link>
                <Link
                  discreet
                  href="https://github.com/laodeaksar"
                >
                  Github
                </Link>
                <Link
                  discreet
                  href="https://www.getrevue.co/profile/laodeaksar"
                >
                  Newsletter
                </Link>
              </Grid>
            </Text>
          </Box>
          <Box>
            <Text size={1}>
              <Grid>
                <Link discreet href="https://laodeaksar.eu.org/portfolio">
                  Portfolio
                </Link>
                <Link discreet href="https://www.figma.com/">
                  Roadmap
                </Link>
                <Link href="/guestbook" discreet>
                  Guestbook
                </Link>
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
              &copy; {new Date().getFullYear()} Aksar La&apos;ode --{' '}
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
