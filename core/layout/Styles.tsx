import { styled } from '@laodeaksarr/design-system';

export const Wrapper = styled('main', {
  background: 'var(--laodeaksar-colors-body)',
  transition: '0.5s',
  overflow: 'hidden',

  '&:focus:not(:focus-visible)': {
    outline: 0
  },

  '&:focus-visible': {
    outline: '2px solid var(--laodeaksar-colors-brand)',
    backgroundColor: 'var(--laodeaksar-colors-foreground)'
  }
});
