import { styled } from '~/lib/stitches.config';

export const StyledCalloutIconWrapper = styled('div', {
  $$icon: 'var(--laodeaksar-colors-body)',

  position: 'absolute',
  display: 'flex',
  top: '-24px',
  right: '-18px',
  borderRadius: '$round',
  padding: '8px',
  color: 'var(--laodeaksar-colors-body)',
  border: '8px solid var(--laodeaksar-colors-body)',
  background: '$$icon',

  variants: {
    variant: {
      info: {
        $$icon: 'var(--laodeaksar-colors-brand)'
      },
      danger: {
        $$icon: 'var(--laodeaksar-colors-danger)'
      }
    }
  }
});

export const StyledCalloutLabelWrapper = styled('div', {
  $$icon: 'var(--laodeaksar-colors-body)',

  position: 'absolute',
  display: 'flex',
  top: '-24px',
  right: '-8px',
  borderRadius: '$1',
  padding: '8px',
  color: 'var(--laodeaksar-colors-body)',
  fontSize: '$1',
  fontWeight: '$3',
  userSelect: 'none',
  background: '$$icon',

  variants: {
    variant: {
      info: {
        $$icon: 'var(--laodeaksar-colors-brand)'
      },

      danger: {
        $$icon: 'var(--laodeaksar-colors-danger)'
      }
    }
  }
});

export const StyledCallout = styled('aside', {
  '*:last-child': {
    marginBottom: '0px'
  },

  $$callout: 'var(--laodeaksar-colors-emphasis)',

  position: 'relative',
  padding: '30px 30px',
  marginBottom: '2.25rem',
  borderRadius: '$1',
  color: 'var(--laodeaksar-colors-typeface-primary)',
  border: '1px solid var(--laodeaksar-colors-emphasis)',
  background: '$$callout',

  variants: {
    variant: {
      info: {
        $$callout: 'var(--laodeaksar-colors-emphasis)'
      },

      danger: {
        $$callout: 'var(--laodeaksar-colors-danger-emphasis)'
      }
    }
  }
});
