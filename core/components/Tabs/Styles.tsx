import { styled } from '~/lib/stitches.config';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export const StyledTabs = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column'
});

export const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: 'flex'
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
