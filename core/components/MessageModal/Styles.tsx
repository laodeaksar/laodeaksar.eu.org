import { motion } from 'framer-motion';

import { styled } from '~/lib/stitches.config';

export const MessageWrapper = styled(motion.div, {
  display: 'flex',
  position: 'fixed',
  color: 'var(--laodeaksar-colors-typeface-secondary)',
  alignItems: 'center',
  width: 80,
  zIndex: '$1',
  height: 16,
  borderRadius: '$2',

  variants: {
    toastTypes: {
      success: { bc: 'var(--laodeaksar-colors-success)' },
      error: { bc: 'var(--laodeaksar-colors-danger)' },
      warning: { bc: 'var(--laodeaksar-colors-warning)' }
    },

    positions: {
      topCenter: { top: '$4', mx: 'auto', right: 0, left: 0 },
      topRight: { top: '$4', right: '$4' },
      bottomCenter: { bottom: '$4', right: 0, left: 0, mx: 'auto' },
      bottomRight: { bottom: '$4', right: 0 }
    }
  }
});
