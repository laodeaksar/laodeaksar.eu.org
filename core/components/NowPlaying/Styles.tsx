import { css, keyframes } from '@laodeaksarr/design-system';

const bounceBar = keyframes({
  '0%': {
    transform: 'scaleY(0.5)'
  },
  '50%': {
    transform: 'scaleY(0.3)'
  },
  '80%': {
    transform: 'scaleY(0.8)'
  },
  '100%': {
    transform: 'scaleY(0.5)'
  }
});

export const styles = {
  outer: css({
    textDecoration: 'none',
    position: 'relative',
    display: 'block',
    width: 'fit-content',

    '.play': {
      display: 'none',
      opacity: 1,
      color: 'var(--laodeaksar-colors-success)'
    },

    '&:hover': {
      '.artists': { display: 'none' },
      '.play': { display: 'block' }
    }
  })(),
  inner: css({
    justifyContent: 'space-between',
    inset: 0,
    position: 'absolute',
    pl: '$3',
    pr: '$4',
    height: 62
  })(),
  cover: css({
    color: 'var(--laodeaksar-colors-success)',
    opacity: 0.75,
    position: 'relative',
    size: 42,
    borderRadius: 6,
    overflow: 'hidden',
    flexShrink: 0
  })(),
  title: css({
    lineHeight: '1.375 !important',
    maxWidth: '15ch',
    margin: '0 !important'
  })(),
  artists: css({
    lineHeight: '1.375 !important',
    maxWidth: '18ch',
    margin: '0 !important'
  })(),
  bars: css({
    gap: '1px !important',

    span: {
      animation: `${bounceBar}`,
      animationIterationCount: 'infinite',
      background: 'var(--laodeaksar-colors-success)',
      width: 2,

      '&:nth-child(1)': {
        height: 10,
        animationDelay: '.1s',
        animationTimingFunction: 'cubic-bezier(.77,.7,.14,1)',
        animationDuration: '.75s'
      },
      '&:nth-child(2)': {
        height: 16,
        animationDelay: '.15s',
        animationTimingFunction: 'cubic-bezier(.97,.04,.4,.66)',
        animationDuration: '.775s'
      },
      '&:nth-child(3)': {
        height: 12,
        animationDelay: '.05s',
        animationTimingFunction: 'cubic-bezier(.65,.18,.14,1)',
        animationDuration: '.7s'
      },
      '&:nth-child(4)': {
        height: 14,
        animationDelay: '.2s',
        animationTimingFunction: 'cubic-bezier(.37,.38,.14,1)',
        animationDuration: '.73s'
      }
    }
  })()
};
