import { styled } from '@laodeaksarr/design-system';

import Image from '@/components/MDX/Image';

export const Svg = styled('svg', {
  marginRight: '0.5rem',
  width: '2rem',
  height: '2rem'
});

export const Img = styled(Image, {
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '6px'
});
