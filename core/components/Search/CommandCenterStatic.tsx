import Link from 'next/link';

import Box from '~/components/Box';
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
        <a>
          <ArrowIcon size={4} />
          <span style={{ marginLeft: '20px' }}>Home</span>
        </a>
      </Link>
    </Item>
    <Item key="design-navigation">
      <Link href="/design" passHref>
        <a>
          <ArrowIcon size={4} />
          <span style={{ marginLeft: '20px' }}>Design System</span>
        </a>
      </Link>
    </Item>
    <Separator>Links</Separator>
    <Item key="twitter-social-link">
      <a
        href="https://twitter.com/ode_aksar"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon />
        <span style={{ marginLeft: '15px' }}>Twitter</span>
        <VisuallyHidden as="p">
          Link redirects to my Twitter profile page
          https://twitter.com/ode_aksar.
        </VisuallyHidden>
      </a>
    </Item>
    <Item key="email-link">
      <a
        href="mailto:me@laodeaksar.eu.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ContactIcon />
        <span style={{ marginLeft: '15px' }}>Contact</span>
        <VisuallyHidden as="p">
          Link opens your default mail client with my email address
          hello@laodeaksar.com prefilled.
        </VisuallyHidden>
      </a>
    </Item>
    <Item key="roadmap-link">
      <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer">
        <MapIcon />
        <span style={{ marginLeft: '15px' }}>Contact</span>
        <VisuallyHidden as="p">
          Link redirects to a Figma file where you can see the roadmap with my
          upcoming projects and ideas.
        </VisuallyHidden>
      </a>
    </Item>
    <Item key="project-link">
      <Link href="/project" passHref>
        <a>
          <PortfolioIcon />
          <span style={{ marginLeft: '15px' }}>Work</span>
        </a>
      </Link>
    </Item>
    <Item key="rss-link">
      <Link href="/feed.xml" aria-label="RSS Feed">
        <a title="RSS Feed">
          <RSSIcon />
          <span style={{ marginLeft: '15px' }}>RSS</span>
          <VisuallyHidden as="p">
            Link redirects to the rss.xml file.
          </VisuallyHidden>
        </a>
      </Link>
    </Item>
  </Box>
);

export { CommandCenterStatic };
