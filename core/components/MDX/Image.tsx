import React from 'react';
import NextImage, { type ImageProps } from 'next/image';
import { styled } from '@bahutara/design-system';

import NextImage2, { ImageProps as ImageProps2 } from 'next/future/image';

interface Props extends Omit<ImageProps, 'src'> {
  src: any;
}
interface Props2 extends Omit<ImageProps2, 'src'> {
  src: any;
}

export const Image = (props: Props) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Img
      {...props}
      src={props.src}
      placeholder="blur"
      imgBlur={loading}
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export function BlurImage(props: Props2) {
  const [loading, setLoading] = React.useState(true);
  const [src, setSrc] = React.useState(props.src);
  React.useEffect(() => setSrc(props.src), [props.src]); // update the `src` value when the `prop.src` value changes

  return (
    <Img2
      {...props}
      src={src}
      alt={props.alt}
      //placeholder="blur"
      imgBlur={loading}
      onLoadingComplete={async () => {
        setLoading(false);
      }}
      onError={() => {
        setSrc(`https://avatar.tobi.sh/${props.alt}`); // if the image fails to load, use the default avatar
      }}
    />
  );
}

export default Image;

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

const Img2 = styled(NextImage2, {
  transitionDuration: '0.5s',
  transitionTimingFunction: 'ease-in-out',

  variants: {
    imgBlur: {
      true: {
        willChange: 'transform filter',
        transform: 'scale(1.05)',
        filter: 'grayscale(100%) blur(12px)'
      }
    }
  }
});
