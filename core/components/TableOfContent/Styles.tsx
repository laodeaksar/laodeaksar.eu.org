import { motion } from 'framer-motion';

import { styled } from '@laodeaksarr/design-system';

export const Wrapper = styled('div', {
  position: 'fixed',
  top: '266px',
  display: 'flex',
  left: '30px',

  ul: {
    maxWidth: '200px',
    flexDirection: 'column',
    display: 'flex',
    margin: '0 0 1.45rem 1.45rem',
    padding: '0',
    color: 'inherit',
    listStylePosition: 'outside',
    listStyleImage: 'none',

    '@media (max-width: 1250px)': {
      display: 'none'
    },

    li: {
      listStyle: 'none',
      fontSize: '$1',
      fontWeight: '$3',
      lineHeight: '1.5',
      letterSpacing: '0.3px',
      marginBottom: '22px',

      '&:focus:not(:focus-visible)': {
        outline: 0
      },

      '&:focus-visible': {
        outline: '2px solid var(--laodeaksar-colors-brand)',
        opacity: '1 !important'
      }
    }
  },

  '@media (max-width: 1100px)': {
    left: '10px'
  },

  variants: {
    hidden: {
      true: {
        a: {
          cursor: 'none',
          pointerEvents: 'none'
        }
      }
    }
  }
});

export const ProgressBarWrapper = styled(motion.div, {
  width: '2px',
  height: 'calc(88vh - 40px)',
  maxHeight: '425px',
  bc: 'hsla(var(--palette-gray-20), 0.3)',

  '@media(max-width: 700px)': {
    display: 'none'
  }
});
