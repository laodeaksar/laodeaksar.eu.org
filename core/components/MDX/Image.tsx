import React from 'react';
import NextImage, { type ImageProps } from 'next/image';

import { styled } from '@laodeaksarr/design-system';

interface Props extends Omit<ImageProps, 'src'> {
  src: any;
}

export const Image = (props: Props) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Img
      {...props}
      src={props.src}
      placeholder="blur"
      // className={`${styles.img} ${loading ? styles.imgBlur : null}`}
      imgBlur={loading}
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export default Image;

/*const styles = {
  img: css({
    transitionDuration: '0.5s',
    transitionTimingFunction: 'ease-in-out'
  })(),
  imgBlur: css({
    willChange: 'transform',
    transform: 'scale(1.05)'
  })()
};*/

const Img = styled(NextImage, {
  transitionDuration: '0.5s',
  transitionTimingFunction: 'ease-in-out',

  variants: {
    imgBlur: {
      true: {
        willChange: 'transform',
        transform: 'scale(1.05)'
      }
    }
  }
});
