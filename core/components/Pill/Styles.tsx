import { styled } from 'lib/stitches.config';

export const StyledPill = styled('span', {
  display: 'inline-flex !important',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 8px !important',
  minWidth: '40px',
  height: '28px',
  fontSize: '$1',
  fontWeight: '$3',
  cursor: 'default',
  userSelect: 'none',
  borderRadius: '$1',

  background: '$$background',
  color: '$$color',

  variants: {
    dark: {
      true: {}
    },
    variant: {
      info: {
        $$background: 'var(--laodeaksar-colors-emphasis)',
        $$color: 'var(--laodeaksar-colors-brand)'
      },
      success: {
        $$background: 'var(--laodeaksar-colors-success-emphasis)',
        $$color: 'hsl(var(--palette-green-80))'
      },
      warning: {
        $$background: 'var(--laodeaksar-colors-warning-emphasis)',
        $$color: 'hsl(var(--palette-orange-80))'
      },
      danger: {
        $$background: 'var(--laodeaksar-colors-danger-emphasis)',
        $$color: 'var(--laodeaksar-colors-danger)'
      }
    }
  },

  compoundVariants: [
    {
      variant: 'success',
      dark: true,
      css: {
        $$color: 'hsla(var(--palette-green-45))'
      }
    },
    {
      variant: 'warning',
      dark: true,
      css: {
        $$color: 'hsla(var(--palette-orange-45))'
      }
    }
  ]
});
