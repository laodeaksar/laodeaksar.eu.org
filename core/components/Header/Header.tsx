import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Flex from '~/components/Flex';
import Grid from '~/components/Grid';
import Logo from '~/components/Logo';
import Tooltip from '~/components/Tooltip';

import useKeyboardShortcut from '~/hooks/useKeyboardShortcut';
import useProgress from '~/hooks/useProgress';
import useScrollCounter from '~/hooks/useScrollCounter';

import {
  fixTruncate,
  HeaderContent,
  HeaderPadding,
  HeaderProgressBar,
  HeaderWrapper
} from './Styles';
import { HeaderTitle } from './Title';
import type { HeaderProps } from './types';

const CommandCenterButton = dynamic(
  () => import('../Button/CommandCenterButton')
);
const LightDarkSwitcher = dynamic(() => import('../Button/LightDarkSwitcher'));
const Search = dynamic(() => import('../Search'));

const headerVariants = {
  open: {
    height: 120,
    transition: { ease: 'easeInOut', duration: 0.3 }
  },
  collapsed: {
    height: 60,
    transition: { ease: 'easeInOut', duration: 0.3, delayChildren: 0.5 }
  }
};

const Header = (props: HeaderProps) => {
  const { title, offsetHeight = 120, showProgressBarOnMobile } = props;
  const [showSearch, setShowSearch] = useState(false);
  const reached = useScrollCounter(offsetHeight / 2);
  const readingProgress = useProgress();

  useKeyboardShortcut('Escape', () => setShowSearch(false));
  // useKeyboardShortcut('ctrl+k|meta+k', () => setShowSearch(true));

  return (
    <>
      {/** Do not delete the following! Needed for Webmention.io */}
      <a
        className="hidden h-card"
        aria-label="Follow me on Twitter"
        title="Follow me on Twitter"
        rel="me"
        href="https://twitter.com/ode_aksar"
      >
        @ode_aksar
      </a>
      <AnimatePresence>
        {showSearch && <Search onClose={() => setShowSearch(false)} />}
      </AnimatePresence>
      <HeaderWrapper
        initial="open"
        animate={reached ? 'collapsed' : 'open'}
        variants={headerVariants}
        css={{
          borderColor: reached
            ? 'var(--laodeaksar-border-color)'
            : 'transparent'
        }}
      >
        <Grid columns="medium" gapX={4}>
          <HeaderContent
            alignItems="center"
            justifyContent="space-between"
            className={fixTruncate}
          >
            <Flex className={fixTruncate}>
              <Tooltip id="hometooltip" tooltipText="Home">
                <Link href="/">
                  <a aria-label="Home" aria-describedby="hometooltip">
                    <Logo alt="Logo" size={44} />
                  </a>
                </Link>
              </Tooltip>
              {title && <HeaderTitle text={title} />}
            </Flex>
            <Flex gap={3}>
              <CommandCenterButton
                isSearchShown={showSearch}
                onClick={() => setShowSearch(true)}
              />
              <LightDarkSwitcher />
            </Flex>
          </HeaderContent>
        </Grid>
        {showProgressBarOnMobile && (
          <HeaderProgressBar
            style={{
              scaleX: readingProgress
            }}
          />
        )}
      </HeaderWrapper>
      <HeaderPadding css={{ $$offsetHeight: `${offsetHeight}px` }} />
    </>
  );
};

export default Header;
