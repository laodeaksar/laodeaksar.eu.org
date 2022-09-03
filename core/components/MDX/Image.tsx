import React from 'react';
import NextImage, { type ImageProps } from 'next/image';

import { css } from '@laodeaksarr/design-system';

interface Props extends Omit<ImageProps, 'src'> {
  src: any;
}

export const Image = (props: Props) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <NextImage
      {...props}
      src={props.src}
      placeholder="blur"
      className={`${styles.img} ${loading ? styles.imgBlur : null}`}
      onLoadingComplete={() => setLoading(false)}
    />
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
