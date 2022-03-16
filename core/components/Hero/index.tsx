import { Component } from 'react';
import Image from 'next/image';

import { H1 } from '~/components/Typography';

import { styled } from '~/lib/stitches.config';
// import { loader } from '~/lib/next-image-loader'

import { HeroImgProps } from './types';

const HeroInfo = styled('div', {
  marginBottom: '2.25rem'
});

const HeroSubtitle = styled('h3', {
  color: 'var(--laodeaksar-colors-typeface-tertiary)'
});

const HeroTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <H1 {...props} css={{ marginBottom: '$4' }} />
);

const HeroWrapper = styled('div', {
  color: 'var(--laodeaksar-colors-typeface-primary)',
  gridColumn: '2'
  // paddingTop: '248px',

  // '@media (max-width: 700px)': {
  //   paddingTop: '150px'
  // }
});

const HeroImgWrapper = styled('div', {
  borderRadius: '$2',
  width: '$full',
  height: '375px',
  overflow: 'hidden',
  margin: '$6 auto',
  position: 'relative',

  '@media (max-width: 700px)': {
    borderRadius: '0px',
    width: '$ws',
    height: '250px',
    left: '50%',
    right: '50%',
    margin: '32px -50vw'
  }
});

const HeroImg = (props: HeroImgProps) => (
  <HeroImgWrapper>
    <Image
      className={props.className}
      src={props.src}
      alt="cover"
      layout="fill"
      objectFit="cover"
      /** loader={loader} */
      priority
    />
  </HeroImgWrapper>
);

class Hero extends Component<{
  id?: string;
  className?: string;
}> {
  public static Img = HeroImg;
  public static Info = HeroInfo;
  public static Subtitle = HeroSubtitle;
  public static Title = HeroTitle;

  render() {
    const { id, children, className } = this.props;

    return (
      <HeroWrapper id={id} className={className}>
        {children}
      </HeroWrapper>
    );
  }
}

export default Hero;
