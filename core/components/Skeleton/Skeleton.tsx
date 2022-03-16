import { keyframes, styled } from '~/lib/stitches.config';

export const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 }
});

const Skeleton = styled('div', {
  bc: 'var(--laodeaksar-colors-body)',
  position: 'relative',
  overflow: 'hidden',

  '&::after': {
    animationName: pulse,
    animationDuration: '500ms',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    bc: 'var(--laodeaksar-colors-body)',
    borderRadius: 'inherit',
    content: '""',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute'
  },

  variants: {
    variant: {
      avatar1: {
        borderRadius: '$round',
        size: '$3'
      },
      avatar2: {
        borderRadius: '$round',
        size: '$5'
      },
      avatar3: {
        borderRadius: '$round',
        size: '$6'
      },
      avatar4: {
        borderRadius: '$round',
        size: '$7'
      },
      avatar5: {
        borderRadius: '$round',
        size: '$8'
      },
      avatar6: {
        borderRadius: '$round',
        size: '$9'
      },
      text: {
        height: '$1'
      },
      title: {
        height: '$5'
      },
      heading: {
        height: '$3'
      },
      button: {
        borderRadius: '$1',
        height: '$5',
        width: '$8'
      }
    }
  },
  defaultVariants: {
    variant: 'text'
  }
});

export default Skeleton;
