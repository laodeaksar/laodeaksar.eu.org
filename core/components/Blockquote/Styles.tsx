import { styled } from '~/lib/stitches.config';

export const StyledBlockquote = styled('blockquote', {
  fontWeight: '$2',
  lineHeight: '$relaxed',
  letterSpacing: '$tight',
  fontSize: '$4',
  color: 'var(--laodeaksar-colors-typeface-secondary)',
  position: 'relative',
  margin: '0 0 24px 0',

  '@lg': {
    fontSize: '$6'
  },

  p: {
    marginBottom: 0
  },

  cite: {
    letterSpacing: '$normal',
    fontSize: '$2',

    '@lg': {
      fontSize: '$3'
    }
  },

  '.quotation': {
    opacity: 0.1,
    size: 80,
    position: 'absolute',
    left: -15,
    top: -25,

    '@md': {
      left: -85,
      top: -15
    },

    '@lg': {
      top: 0
    }
  }
});
