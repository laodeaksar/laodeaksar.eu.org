import { css, styled } from '~/lib/stitches.config';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export const StyledTabs = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
});

export const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: 'flex',
});

export const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  padding: '0.25rem 0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$1',
    borderBottom: '1px solid transparent',
  color: 'currentColor',
cursor: 'pointer',
  userSelect: 'none',
  '&:first-child': { btlr: 6 },
  '&:last-child': { btrr: 6 },
  '&:hover': { color: 'var(--laodeaksar-colors-typeface-primary)' },
  '&[data-state="active"]': {
    color: 'var(--laodeaksar-colors-brand)',
    borderColor: 'var(--laodeaksar-colors-brand)'
  }
});

export const StyledContent = styled(TabsPrimitive.Content, {
  borderRadius: '0.5rem',

  'pre:first-child': {
    borderRadius: 0,
    mx: 0
  }
});

export const styles = {
  tabList: css({
    flexDirection: 'row',
    ml: '$4'
  })(),
  tabTrigger: css({
    fontSize: '$1',
    letterSpacing: '0.025em',
    padding: '0.25rem 0.5rem',
    border: 'none',
    borderBottom: '1px solid transparent',
    color: 'currentColor',

    '&[data-state="active"]': {
      color: 'var(--laodeaksar-colors-brand)',
      borderColor: 'var(--laodeaksar-colors-brand)'
    }
  })(),
  tabContent: css({
    borderRadius: '0.5rem',

    'pre:first-child': {
      borderRadius: 0,
      mx: 0
    }
  })(),

  // ScrollArea
  root: css({
    borderRadius: 4,
    overflow: 'hidden'
  })(),
  viewport: css({
    size: '$full',
    borderRadius: 'inherit'
  })(),
  scrollbar: css({
    display: 'flex',
    userSelect: 'none',
    touchAction: 'none',
    padding: 2,

    '&[data-orientation="vertical"]': { width: 7 },

    '&[data-orientation="horizontal"]': {
      flexDirection: 'column',
      height: 7
    }
  })(),
  thumb: css({
    flex: 1,
    background: 'var(--laodeaksar-colors-background)',
    opacity: 0.2,
    position: 'relative',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      size: '$full',
      minWidth: 44,
      minHeight: 44
    }
  })()
};
