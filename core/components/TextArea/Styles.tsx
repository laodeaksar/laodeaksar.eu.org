import { styled } from '~/lib/stitches.config';

export const StyledTextArea = styled('textarea', {
  $$border: 'var(--laodeaksar-form-input-border)',
  $$background: 'var(--laodeaksar-form-input-background)',
  $$cursor: 'initial',
  $$opacity: '1',
  $$shadow: 'none',

  appearance: 'none',

  width: '$full',
  outline: 'none',
  position: 'relative',
  display: 'block',
  margin: 0,
  padding: '8px 16px',

  fontSize: '$2',
  fontFamily: 'inherit',
  lineHeight: '26px',
  color: 'var(--laodeaksar-colors-typeface-primary)',

  borderRadius: '$1',
  border: '1px solid $$border',
  background: '$$background',
  cursor: '$$cursor',
  opacity: '$$opacity',
  boxShadow: '$$shadow',
  transition: 'border-color 0.3s, box-shadow 0.3s',

  '$$shadow-hover-primary':
    '0 2px 20px -2px var(--laodeaksar-form-input-focus)',

  '&::placeholder': {
    color: 'var(--laodeaksar-colors-typeface-tertiary)',
    opacity: 0.5
  },

  '&::-webkit-autofill': {
    background: 'transparent'
  },

  '&:disabled': {
    $$background: 'var(--laodeaksar-form-input-disabled)',
    cursor: 'not-allowed',
    opacity: 0.65,

    '& + label': {
      cursor: 'not-allowed'
    }
  },

  '&:hover': {
    '&:not(:disabled)': {
      $$border: 'var(--laodeaksar-form-input-active)',
      $$shadow: '$$shadow-hover-primary'
    }
  },

  '&:focus-within': {
    $$border: 'var(--laodeaksar-form-input-active)',
    $$shadow: '$$shadow-hover-primary'
  },

  variants: {
    readOnly: {
      true: {
        $$cursor: 'default'
      }
    },

    resize: {
      none: {
        resize: 'none'
      },

      vertical: {
        resize: 'vertical'
      },

      horizontal: {
        resize: 'horizontal'
      }
    }
  }
});
