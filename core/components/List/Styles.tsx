import { styled } from '~/lib/stitches.config';

export const StyledListItem = styled('li', {
  listStyle: 'none',
  display: 'flex',
  alignItems: 'baseline',
  marginBottom: 'calc(1.45rem / 2)',
  lineHeight: '1.9',
  letterSpacing: '0.3px',

  'span[data-list-item]': {
    paddingRight: '8px',
    background: 'none',
    transform: 'translateY(6px)'
  },

  '& > ol, & > ul': {
    marginLeft: '1.45rem',
    marginBottom: 'calc(1.45rem / 2)',
    marginTop: 'calc(1.45rem / 2)'
  },

  '& > p': {
    marginBottom: 'calc(1.45rem / 2)'
  }
});

export const StyledList = styled('div', {
  marginLeft: '0 0 1.45rem 0',
  padding: '0',
  color: 'inherit',
  listStylePosition: 'outside',
  listStyleImage: 'none',

  variants: {
    variant: {
      unordered: {
        li: {
          // We use List.Item to render the proper style
          listStyle: 'none'
        }
      },
      ordered: {
        li: {
          counterIncrement: 'li',

          svg: {
            display: 'none'
          },

          '&:before': {
            content: "counters(li, '.') '. '",
            color: 'var(--laodeaksar-colors-brand)',
            marginRight: '8px'
          }
        }
      }
    }
  },
  defaultVariants: {
    variant: 'unordered'
  }
});
