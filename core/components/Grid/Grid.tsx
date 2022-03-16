import { getVariant, styled } from '~/lib/stitches.config';

import Box from '~/components/Box';

const Grid = styled(Box, {
  display: 'grid',
  height: 'inherit',

  variants: {
    all: {
      true: {
        '> *': {
          gridColumn: 2
        }
      }
    },
    align: {
      start: { alignItems: 'start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'end' },
      stretch: { alignItems: 'stretch' },
      baseline: { alignItems: 'baseline' }
    },
    justify: {
      start: { justifyContent: 'start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'end' },
      between: { justifyContent: 'space-between' }
    },
    flow: {
      row: { gridAutoFlow: 'row' },
      column: { gridAutoFlow: 'column' },
      dense: { gridAutoFlow: 'dense' },
      ['row-dense']: { gridAutoFlow: 'row dense' },
      ['column-dense']: { gridAutoFlow: 'column dense' }
    },
    columns: {
      1: { gridTemplateColumns: 'repeat(1, 1fr)' },
      2: { gridTemplateColumns: 'repeat(2, 1fr)' },
      3: { gridTemplateColumns: 'repeat(3, 1fr)' },
      4: { gridTemplateColumns: 'repeat(4, 1fr)' },
      5: { gridTemplateColumns: 'repeat(5, 1fr)' },
      small: { gridTemplateColumns: 'var(--layout-small)' },
      medium: { gridTemplateColumns: 'var(--layout-medium)' }
    },
    gap: getVariant('space', (token) => ({
      gap: token
    })),
    gapX: getVariant('space', (token) => ({
      columnGap: token
    })),
    gapY: getVariant('space', (token) => ({
      rowGap: token
    }))
  },
  defaultVariants: {
    align: 'stretch',
    justify: 'initial'
  }
});

export default Grid;
