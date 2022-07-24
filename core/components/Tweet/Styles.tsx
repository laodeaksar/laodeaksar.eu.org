import { css, Shadows, styled } from '@laodeaksarr/design-system';

export const TweetWrapper = styled('div', {
  color: 'var(--laodeaksar-colors-typeface-primary)',
  borderRadius: '$2',
  bc: 'var(--laodeaksar-card-background-color)',
  padding: '1rem 1.5rem',
  marginBottom: '2rem',
  width: '$full',

  border: 'solid 1px var(--laodeaksar-border-color)',
  boxShadow: Shadows[1],

  '@media (max-width: 700px)': {
    width: '$ws',
    position: 'relative',
    left: '50%',
    right: '50%',
    mx: '-50vw',
    borderRadius: '0px'
  }
});

export const Avatar = styled('a', {
  display: 'flex',
  size: '46px',
  overflow: 'hidden'
});

export const Name = styled('a', {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '1rem',
  color: 'var(--laodeaksar-colors-typeface-primary)'
});

export const ImageGrid = styled('div', {
  display: 'inline-grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '0.5rem',
  my: '0.5rem'
});

export const SingleImageWrapper = styled('div', {
  my: '0.5rem'
});

export const ActionIcons = styled('a', {
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem',
  color: 'var(--laodeaksar-colors-typeface-tertiary)',

  svg: {
    transform: 'translateY(-1px)',
    marginRight: '0.25rem'
  }
});

export const styles = {
  profileImage: css({
    borderRadius: '$round'
  })(),
  singleImage: css({
    borderRadius: '$2'
  })()
};
