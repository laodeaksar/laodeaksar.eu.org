import { styled } from '~/lib/stitches.config';

export const TransitionGridWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gridGap: '32px',

  '@media (max-width: 950px)': {
    padding: '0'
  },

  '> div': {
    width: '$full',
    maxWidth: '400px',
    mx: 'auto'
  }
});

export const AnimationCardContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '475px',
  padding: '12px 0px'
});

export const HighlightedValue = styled('div', {
  borderRadius: '$0',
  backgroundColor: 'var(--laodeaksar-colors-emphasis)',
  color: 'var(--laodeaksar-colors-brand)',
  border: '2px solid var(--laodeaksar-colors-brand)',
  padding: '2px 6px',
  fontFamily: '$mono',
  fontSize: '$2',
  display: 'inline-block',
  lineHeght: '1rem'
});

export const Wrapper = styled('div', {
  margin: '30px 0px',

  '@media (min-width: 1100px)': {
    position: 'relative',
    maxWidth: '1000px',
    width: 'calc(100% + 300px)',
    margin: '30px -150px'
  }
});

export const Form = styled('form', {
  margin: '20px 0',
  width: '70%',
  zIndex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  fontSize: '$1',

  label: {
    marginBottom: '8px'
  },

  input: {
    marginBottom: '24px'
  },

  select: {
    border: '1px solid var(--laodeaksar-colors-brand)',
    boxShadow: 'none',
    backgroundColor: 'var(--laodeaksar-colors-emphasis)',
    color: 'var(--laodeaksar-colors-brand)',
    height: '30px',
    borderRadius: '$0',
    padding: '5px'
  }
});
