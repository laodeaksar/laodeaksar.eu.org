import React from 'react';
import NextImage, { type ImageProps } from 'next/image';
import { styled } from '@bahutara/design-system';

interface Props extends Omit<ImageProps, 'src'> {
  src: any;
}

export function Image(props: Props) {
  const [loading, setLoading] = React.useState(true);
  const [src, setSrc] = React.useState(props.src);
  React.useEffect(() => setSrc(props.src), [props.src]); // update the `src` value when the `prop.src` value changes

  return (
    <Img
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
        willChange: 'transform filter',
        transform: 'scale(1.05)',
        filter: 'grayscale(100%) blur(12px)'
      }
    }
  }
});
