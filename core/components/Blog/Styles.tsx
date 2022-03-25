import { styled } from '~/lib/stitches.config';

export const Block = styled('div', {
  $$background: 'transparent',
  $$color: 'var(--laodeaksar-colors-typeface-primary)',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: '$3',
  paddingLeft: '10px',
  borderRadius: '$2',
  marginLeft: '-10px',
  height: '60px',
  boxShadow: 'none',
  bc: '$$background',
  color: '$$color',
  transition: 'background-color 0.25s, box-shadow 0.25s, color 0.25s',

  '&:focus': {
    $$background: 'var(--laodeaksar-colors-emphasis)',
    $$color: 'var(--laodeaksar-colors-brand)'
  },

  '@hover': {
    '&:hover': {
      $$background: 'var(--laodeaksar-colors-emphasis)',
      $$color: 'var(--laodeaksar-colors-brand)'
    }
  },

  '@media (max-width: 700px)': {
    height: '100px'
  }
});

export const Button = styled('button', {
  width: '$full',
  outline: 'none',
  border: '0',
  background: 'transparent',
  fontSize: '$3',
  lineHeight: '1.9',
  letterSpacing: '0.3px',
});
