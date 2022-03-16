import { getVariant, styled } from '~/lib/stitches.config';

import Box from '~/components/Box';

const Flex = styled(Box, {
  display: 'flex',

  variants: {
    alignItems: {
      baseline: { alignItems: 'baseline' },
      center: { alignItems: 'center' },
      end: { alignItems: 'end' },
      ['flex-end']: { alignItems: 'flex-end' },
      ['flex-start']: { alignItems: 'flex-start' },
      start: { alignItems: 'start' },
      stretch: { alignItems: 'stretch' }
    },
    alignContent: {
      baseline: { alignContent: 'baseline' },
      center: { alignContent: 'center' },
      end: { alignContent: 'end' },
      start: { alignContent: 'start' },
      stretch: { alignContent: 'stretch' }
    },
    direction: {
      column: { flexDirection: 'column' },
      ['column-reverse']: { flexDirection: 'column-reverse' },
      row: { flexDirection: 'row' },
      ['row-reverse']: { flexDirection: 'row-reverse' }
    },
    gap: getVariant('space', (token) => ({ gap: token })),
    justifyContent: {
      center: { justifyContent: 'center' },
      end: { justifyContent: 'end' },
      ['space-around']: { justifyContent: 'space-around' },
      ['space-between']: { justifyContent: 'space-between' },
      ['space-evenly']: { justifyContent: 'space-evenly' },
      start: { justifyContent: 'start' }
    },
    wrap: {
      true: { flexWrap: 'wrap' },
      false: { flexWrap: 'nowrap' }
    }
  },
  defaultVariants: {
    gap: 1,
    wrap: false,
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default Flex;
