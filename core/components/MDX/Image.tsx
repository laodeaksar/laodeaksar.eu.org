// import { loader } from '~/lib/next-image-loader'
import NextImage, { ImageProps } from 'next/image';

import { styled } from '~/lib/stitches.config';
import Text from '~/components/Typography';

const StyledFigure = styled('figure', {
  marginBottom: '2.25rem',
  mx: 0
});

const Image = (props: ImageProps) => {
  return (
    <StyledFigure>
      <NextImage {...props} /* loader={loader} */ quality={50} />
      <Text
        as="figcaption"
        css={{
          lineHeight: '1.5',
          paddingTop: '10px'
        }}
        size="1"
        variant="tertiary"
        weight="3"
      >
        {props.alt}
      </Text>
    </StyledFigure>
  );
};

export default Image;
