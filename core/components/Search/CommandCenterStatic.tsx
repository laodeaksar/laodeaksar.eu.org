import NextLink from 'next/link';

import Box from '~/components/Box';
import Link from '~/components/Link';
import VisuallyHidden from '~/components/VisuallyHidden';
import {
  ArrowIcon,
  ContactIcon,
  MapIcon,
  PortfolioIcon,
  RSSIcon,
  TwitterIcon
} from '~/components/Icons';

import { MAX_HEIGHT } from './constants';
import { Separator, Item, KBD } from './Styles';

const CommandCenterStatic = () => (
  <Box
    css={{
      bc: 'var(--laodeaksar-colors-body)',
      maxHeight: `${MAX_HEIGHT}px`,
      overflowY: 'scroll'
    }}
  >
    <Separator>Shortcuts</Separator>
    <Item data-nohover key="search-shortcut">
      <span>Command Center</span>
      <div>
        <KBD>ctrl</KBD>
        <KBD>k</KBD>
      </div>
    </Item>
    <Item data-nohover key="theme-shortcut">
      <span>Switch Theme</span>
      <div>
        <KBD>ctrl</KBD>
        <KBD>t</KBD>
      </div>
    </Item>
    <Separator>Navigation</Separator>
    <Item key="home-navigation">
      <Link href="/">
        <ArrowIcon size={4} />
        <span style={{ marginLeft: '20px' }}>Home</span>
      </Link>
    </Item>
    <Item key="design-navigation">
      <Link href="/design">
        <ArrowIcon size={4} />
        <span style={{ marginLeft: '20px' }}>Design System</span>
      </Link>
    </Item>
    <Separator>Links</Separator>
    <Item key="twitter-social-link">
      <Link href="https://twitter.com/ode_aksar">
        <TwitterIcon />
        <span style={{ marginLeft: '15px' }}>Twitter</span>
        <VisuallyHidden as="p">
          Link redirects to my Twitter profile page
          https://twitter.com/ode_aksar.
        </VisuallyHidden>
      </Link>
    </Item>
    <Item key="email-link">
      <Link href="mailto:me@laodeaksar.eu.org">
        <ContactIcon />
        <span style={{ marginLeft: '15px' }}>Contact</span>
        <VisuallyHidden as="p">
          Link opens your default mail client with my email address
          hello@laodeaksar.com prefilled.
        </VisuallyHidden>
      </Link>
    </Item>
    <Item key="roadmap-link">
      <Link href="https://www.figma.com">
        <MapIcon />
        <span style={{ marginLeft: '15px' }}>Contact</span>
        <VisuallyHidden as="p">
          Link redirects to a Figma file where you can see the roadmap with my
          upcoming projects and ideas.
        </VisuallyHidden>
      </Link>
    </Item>
    <Item key="project-link">
      <Link href="/project">
        <PortfolioIcon />
        <span style={{ marginLeft: '15px' }}>Work</span>
      </Link>
    </Item>
    <Item key="rss-link">
      <NextLink href="/feed.xml" aria-label="RSS Feed">
        <a title="RSS Feed">
          <RSSIcon />
          <span style={{ marginLeft: '15px' }}>RSS</span>
          <VisuallyHidden as="p">
            Link redirects to the rss.xml file.
          </VisuallyHidden>
        </a>
      </NextLink>
    </Item>
  </Box>
);

export { CommandCenterStatic };
