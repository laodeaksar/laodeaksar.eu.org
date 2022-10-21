import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import {
  Flex,
  Grid,
  Tooltip,
  useKeyboardShortcut
} from '@bahutara/design-system';

import Logo from '@/components/Logo';
import useProgress from '@/hooks/useProgress';
import useScrollCounter from '@/hooks/useScrollCounter';

import {
  HeaderContent,
  HeaderPadding,
  HeaderProgressBar,
  HeaderWrapper
} from './Styles';
import { HeaderTitle } from './Title';
import type { HeaderProps } from './types';

const CommandCenterButton = dynamic(
  () => import('../Buttons/CommandCenterButton')
);
const LightDarkSwitcher = dynamic(() => import('../Buttons/LightDarkSwitcher'));
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

  const [showSearch, setShowSearch] = React.useState(false);
  const reached = useScrollCounter(offsetHeight / 2);
  const readingProgress = useProgress();

  useKeyboardShortcut('Escape', () => setShowSearch(false));
  // useKeyboardShortcut('ctrl+k|meta+k', () => setShowSearch(true));

  return (
    <>
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
            css={{
              flex: 1,
              minWidth: 0
            }}
          >
            <Flex
              css={{
                flex: 1,
                minWidth: 0
              }}
            >
              <Tooltip id="hometooltip" content="Home">
                <Link href="/" aria-label="Home" aria-describedby="hometooltip">
                  <Logo alt="Logo" size={44} />
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
