import NextImage, { ImageProps } from 'next/image';

import Box from '~/components/Box';
import { CSS } from '~/lib/stitches.config';

interface Props extends ImageProps {
  css?: CSS;
}

const Image = (props: Props) => {
  return (
    <Box css={props.css}>
      <NextImage {...props} />
    </Box>
  );
};
