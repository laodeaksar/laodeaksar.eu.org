import React from 'react';
import NextImage, { type ImageProps } from 'next/image';

import { Box, css, Text } from '@laodeaksarr/design-system';

interface Props {
  figcaption?: boolean;
  title?: string;
  remote?: boolean | string;
  shadow?: boolean;
  rounded?: boolean;
}

export const Image = ({
  figcaption,
  shadow,
  rounded,
  remote,
  ...props
}: ImageProps & Props) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Box
      as="figure"
      css={{
        position: 'relative',
        padding: 0,
        mx: 0,
        width: remote ? '100%' : undefined,
        height: remote ? '468px' : undefined
      }}
      my="6"
    >
      <Box
        css={{
          boxShadow: shadow ? '$default' : undefined,
          borderRadius: rounded ? '$1' : undefined,
          overflow: 'hidden'
        }}
      >
        <NextImage
          {...props}
          layout={!remote ? 'responsive' : 'fill'}
          placeholder="blur"
          objectFit={remote ? 'cover' : undefined}
          alt={props.alt}
          className={`${styles.img} ${loading ? styles.imgBlur : null}`}
          onLoadingComplete={() => setLoading(false)}
        />
        {figcaption && (
          <Text
            as="figcaption"
            css={{
              fontStyle: 'italic',
              textAlign: 'center',
              lineHeight: '1.5',
              mt: '$2',
              position: remote ? 'absolute' : undefined,
              bottom: remote ? -5 : undefined,
              width: remote ? '100%' : undefined
            }}
            size="1"
            variant="tertiary"
            weight="3"
          >
            {props.alt}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Image;

const styles = {
  img: css({
    transitionDuration: '0.5s',
    transitionTimingFunction: 'ease-in-out'
  })(),
  imgBlur: css({
    willChange: 'transform',
    transform: 'scale(1.05)'
  })()
};
