import { Shadows, styled } from '~/lib/stitches.config';

export const StyledRange = styled('input', {
  $$shadow: `var(${Shadows[2]}))`,
  $$border: 'var(--laodeaksar-form-input-border)',
  $$track: 'transparent',

  appearance: 'none',

  width: '$full',
  outline: 'none',
  position: 'relative',
  display: 'block',
  margin: 0,
  flexShrink: 0,

  background: 'transparent',

  '&::-moz-range-track': {
    MozAppearance: 'none',
    width: '$full',
    height: '4px',
    border: 'none',
    borderRadius: '$0',
    background: '$$track'
  },

  '&::-webkit-slider-runnable-track': {
    WebkitAppearance: 'none',
    width: '$full',
    height: '4px',
    border: 'none',
    borderRadius: '$0',
    background: '$$track'
  },

  '&::-moz-range-thumb': {
    MozAppearance: 'none',
    size: '$5',
    borderRadius: '$round',
    background: 'var(--laodeaksar-form-input-background)',
    border: '1px solid $$border',
    marginTop: '-10px',
    cursor: 'grab',
    boxShadow: '$$shadow',
    transition: 'background 0.3s, border-color 0.3s, box-shadow 0.2s'
  },

  '&::-webkit-slider-thumb': {
    WebkitAppearance: 'none',
    size: '$5',
    borderRadius: '$round',
    background: 'var(--laodeaksar-form-input-background)',
    border: '1px solid $$border',
    marginTop: '-10px',
    cursor: 'grab',
    boxShadow: '$$shadow',
    transition: 'background 0.3s, border-color 0.3s, box-shadow 0.2s'
  },

  '&:active': {
    '&::-moz-range-thumb': {
      cursor: 'grabbing'
    },

    '&::-webkit-slider-thumb': {
      cursor: 'grabbing'
    }
  },

  '&:disabled': {
    '&::-moz-range-thumb': {
      cursor: 'not-allowed'
    },

    '&::-webkit-slider-thumb': {
      cursor: 'not-allowed'
    }
  },

  '&:hover': {
    '&:not(:disabled)': {
      '&::-moz-range-thumb': {
        $$border: 'var(--laodeaksar-form-input-active)',
        $$shadow: '0 2px 20px 3px var(--laodeaksar-form-input-focus)'
      },

      '&::-webkit-slider-thumb': {
        $$border: 'var(--laodeaksar-form-input-active)',
        $$shadow: '0 2px 20px 3px var(--laodeaksar-form-input-focus)'
      }
    }
  },

  '&:focus-visible': {
    '&::-moz-range-thumb': {
      $$border: 'var(--laodeaksar-form-input-active)',
      $$shadow: '0 2px 20px 3px var(--laodeaksar-form-input-focus)'
    },

    '&::-webkit-slider-thumb': {
      $$border: 'var(--laodeaksar-form-input-active)',
      $$shadow: '0 2px 20px 3px var(--laodeaksar-form-input-focus)'
    }
  }
});
