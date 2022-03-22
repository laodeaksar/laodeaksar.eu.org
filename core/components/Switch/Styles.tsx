import { styled } from '~/lib/stitches.config';

export const StyledSwitch = styled('input', {
  $$border: 'var(--laodeaksar-form-input-border)',
  $$background: 'var(--laodeaksar-form-input-background)',
  $$shadow: 'none',

  appearance: 'none',

  flexShrink: 0,

  height: '24px',
  // TODO: Switch to 48px?
  width: '44px',

  outline: 'none',
  display: 'inline-block',
  position: 'relative',
  margin: 0,
  cursor: 'pointer',

  // TODO: Switch to token
  borderRadius: '11px',
  border: '1px solid $$border',
  background: '$$background',
  boxShadow: '$$shadow',
  transition: 'background 0.3s, border-color 0.3s, box-shadow 0.2s',

  '$$shadow-hover-primary': '0 2px 20px 3px var(--laodeaksar-form-input-focus)',
  $$do: '0.3s',
  $$dt: '0.3s',
  $$dte: 'ease',
  $$ab: 'var(--laodeaksar-form-input-border)',
  $$x: '0',

  '&:after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: '2px',
    top: '2px',
    borderRadius: '$round',
    size: '18px',
    background: '$$ab',

    transition: 'transform $$dt $$dte, opacity $$do, box-shadow 0.2s',
    transform: 'translateX($$x)'
  },

  '&:checked': {
    $$background: 'var(--laodeaksar-form-input-active)',
    $$border: 'var(--laodeaksar-form-input-active)',
    $$do: '0.3s',
    $$dt: '0.6s',
    $$dte: 'cubic-bezier(0.2, 0.85, 0.32, 1.2)',
    $$ab: '#ffffff',
    $$x: '20px'
  },

  '&:disabled': {
    $$background: 'var(--laodeaksar-form-input-disabled)',
    cursor: 'not-allowed',
    opacity: '0.65',

    '&:checked': {
      $$border: 'var(--laodeaksar-form-input-border)'
    },

    '& + label': {
      cursor: 'not-allowed'
    },

    '&:not(:checked)': {
      '&:after': {
        opacity: '0.6'
      }
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
