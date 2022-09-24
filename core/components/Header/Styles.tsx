import { motion } from 'framer-motion';

import { Flex, styled } from '@laodeaksarr/design-system';

export const HeaderWrapper = styled(motion.header, {
  position: 'fixed',
  zIndex: 10,
  top: '0',
  backdropFilter: 'blur(8px)',
  width: '$full',
  transition: 'background-color 0.5s, border-color 0.5s',
  background: 'var(--laodeaksar-colors-header)',
  borderBottom: '1px solid',

  '@media (max-width: 700px)': {
    height: '64px !important'
  }
});

export const HeaderTitleWrapper = styled('div', {
  display: 'flex',
  mx: '40px',
  overflow: 'hidden',

  a: {
    color: 'inherit'
  },

  '@media (max-width: 700px)': {
    display: 'none'
  }
});

export const HeaderProgressBar = styled(motion.div, {
  '@media (max-width: 700px)': {
    display: 'none'
  },

  position: 'absolute',
  bottom: '0px',
  transformOrigin: 'left',
  height: '2px',
  bc: 'var(--laodeaksar-colors-typeface-tertiary)',
  width: '$full'
});

export const HeaderPadding = styled(motion.header, {
  height: '$$offsetHeight',

  '@media (max-width: 700px)': {
    height: 'calc($$offsetHeight * 0.6)'
  }
});

export const HeaderContent = styled(Flex, {
  gridColumn: 2
});
