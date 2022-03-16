import { styled } from '~/lib/stitches.config';

export const StyledRadio = styled('input', {
  $$border: 'var(--laodeaksar-form-input-border)',
  $$background: 'var(--laodeaksar-form-input-background)',
  $$shadow: 'none',

  appearance: 'none',

  flexShrink: 0,
  size: '$5',

  outline: 'none',
  display: 'inline-block',
  position: 'relative',
  margin: 0,
  cursor: 'pointer',

  borderRadius: '$round',
  border: '1px solid $$border',
  background: '$$background',
  boxShadow: '$$shadow',
  transition: 'background 0.3s, border-color 0.3s, box-shadow 0.2s',

  '$$shadow-hover-primary': '0 2px 20px 3px var(--laodeaksar-form-input-focus)',

  '&:after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    transition:
      'transform var(---dt, 0.3s) var(---dte, ease), opacity var(---do, 0.2s)',
    size: '22px',
    borderRadius: '$round',
    background: 'var(--laodeaksar-form-input-background)',
    opacity: 'var(---opacity, 0)',
    transform: 'scale(var(---scale, 0.7))'
  },

  '&:checked': {
    $$background: 'var(--laodeaksar-form-input-active)',
    $$border: 'var(--laodeaksar-form-input-active)',
    $$do: '0.3s',
    $$dt: '0.6s',
    $$dte: 'cubic-bezier(0.2, 0.85, 0.32, 1.2)',
    $$scale: '0.5',
    $$opacity: '1'
  },

  '&:disabled': {
    $$background: 'var(--laodeaksar-form-input-disabled)',
    cursor: 'not-allowed',
    opacity: 0.65,

    '&:checked': {
      $$border: 'var(--laodeaksar-form-input-border)'
    },

    '& + label': {
      cursor: 'not-allowed'
    }
  },

  '&:hover': {
    '&:not(:disabled)': {
      '&:not(:checked)': {
        $$border: 'var(--laodeaksar-form-input-active)'
      },

      $$shadow: '$$shadow-hover-primary'
    }
  },

  '&:focus-visible': {
    $$border: 'var(--laodeaksar-form-input-active)',
    $$shadow: '$$shadow-hover-primary'
  }
});
