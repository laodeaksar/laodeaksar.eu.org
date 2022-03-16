import { styled } from '~/lib/stitches.config';

export const StyledButton = styled('button', {
  $$background: 'white',
  $$scale: 1,
  $$shadow: 'none',
  $$opacity: 1,
  $$color: 'black',

  // WebkitAppearance: 'none',
  // WebkitTapHighlightColor: 'transparent',
  userSelect: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: '0',
  outline: 'none',
  cursor: 'pointer',
  border: '0',
  font: 'inherit',

  /* Constant properties */
  fontSize: '$2',
  fontWeight: '$3',
  height: '44px',
  width: '$max',
  padding: '11px 16px',
  transition: 'background 0.2s, transform 0.3s, color 0.2s, box-shadow 0.3s',
  borderRadius: '$1',
  background: '$$background',
  color: '$$color',
  transform: 'scale($$scale) translateZ(0)',
  boxShadow: '$$shadow',
  opacity: '$$opacity',

  '$$shadow-hover-primary':
    '0 2px 40px -4px var(--laodeaksar-form-input-focus)',

  '&:active': {
    $$scale: '0.95'
  },

  '&:disabled': {
    cursor: 'not-allowed'
  },

  variants: {
    variant: {
      primary: {
        $$background: 'var(--laodeaksar-colors-brand)',
        $$color: 'hsl(var(--palette-gray-00))',

        '&:disabled': {
          $$background: 'var(--laodeaksar-form-input-disabled)',
          $$color: 'var(--laodeaksar-colors-typeface-tertiary)'
        },

        '&:hover': {
          '&:not(:disabled)': {
            $$shadow: '$$shadow-hover-primary'
          }
        },

        '&:focus-visible': {
          $$shadow: '$$shadow-hover-primary'
        }
      },

      secondary: {
        $$background: 'var(--laodeaksar-colors-emphasis)',
        $$color: 'var(--laodeaksar-colors-brand)',

        '&:disabled': {
          $$background: 'var(--laodeaksar-form-input-disabled)',
          $$color: 'var(--laodeaksar-colors-typeface-tertiary)'
        },

        '&:hover': {
          '&:not(:disabled)': {
            $$shadow: '$$shadow-hover-primary'
          }
        },

        '&:focus-visible': {
          $$shadow: '$$shadow-hover-primary'
        }
      }
    }
  }
});

export const StyledIconButton = styled('button', {
  $$color: 'var(--laodeaksar-colors-typeface-tertiary)',
  $$scale: 1,

  // WebkitAppearance: 'none',
  // WebkitTapHighlightColor: 'transparent',
  userSelect: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: '0',
  outline: 'none',
  cursor: 'pointer',
  border: '0',

  /* Constant properties */
  size: '44px',
  background: 'transparent',
  transition: 'color 0.3s ease, transform 0.3s ease',
  borderRadius: '$1',
  color: '$$color',
  transform: 'scale($$scale) translateZ(0)',

  '$$shadow-hover-primary':
    '0 2px 40px -2px var(--laodeaksar-form-input-focus)',

  '&::after': {
    $$background: 'var(--laodeaksar-colors-foreground)',
    $$afterscale: 1,
    $$thickness: '1px',
    $$border: 'transparent',
    $$shadow: 'none',

    zIndex: '0',
    position: 'absolute',
    content: '""',
    display: 'block',
    size: '$full',
    borderRadius: '$2',
    transition:
      'box-shadow 0.3s ease, border-color 0.2s, background 0.3s ease,\n      transform 0.3s, cubic-bezier(0.34, 1.56, 0.64, 1)',
    background: '$$background',
    transform: 'scale($$afterscale) translateZ(0)',
    border: '$$thickness solid $$border',
    boxShadow: '$$shadow'
  },

  '&:disabled': {
    cursor: 'not-allowed',
    $$background: 'var(--laodeaksar-form-input-disabled)',
    $$color: 'var(--laodeaksar-colors-typeface-tertiary)'
  },

  '&:hover': {
    '&:not(:disabled)': {
      $$border: 'var(--laodeaksar-colors-brand)',
      $$thickness: '2px',
      $$color: 'var(--laodeaksar-colors-brand)',
      $$corner: 'calc($space$2) + 2px)',
      $$afterscale: '0.92',
      $$shadow: '$$shadow-hover-primary'
    }
  },

  '&:focus-visible': {
    $$border: 'var(--laodeaksar-colors-brand)',
    $$thickness: '2px',
    $$color: 'var(--laodeaksar-colors-brand)',
    $$corner: 'calc($space$2) + 2px)',
    $$afterscale: '0.92',
    $$shadow: '$$shadow-hover-primary'
  },

  '&:active': {
    $$scale: '0.95'
  }
});
