import { getVariant, styled } from '~/lib/stitches.config';

const Box = styled('div', {
  variants: {
    mb: getVariant('space', (token) => ({ mb: token })),
    ml: getVariant('space', (token) => ({ ml: token })),
    mr: getVariant('space', (token) => ({ mr: token })),
    mt: getVariant('space', (token) => ({ mt: token })),
    mx: getVariant('space', (token) => ({ mx: token })),
    my: getVariant('space', (token) => ({ my: token })),
    pb: getVariant('space', (token) => ({ pb: token })),
    pl: getVariant('space', (token) => ({ pl: token })),
    pr: getVariant('space', (token) => ({ pr: token })),
    pt: getVariant('space', (token) => ({ pt: token })),
    px: getVariant('space', (token) => ({ px: token })),
    py: getVariant('space', (token) => ({ py: token })),

    full: {
      true: { width: '$full' }
    }
  }
});

export default Box;
