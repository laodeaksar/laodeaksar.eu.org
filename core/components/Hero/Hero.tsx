import React from 'react';
import Image from '../MDX/Image';
import { H1, styled } from '@laodeaksarr/design-system';

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
    width: '$w-screen',
    height: '250px',
    left: '50%',
    right: '50%',
    margin: '32px -50vw'
  }
});

const HeroImg = (props: any) => {
  const { src } = props;

  return (
    <HeroImgWrapper>
      <Image
        {...props}
        src={src}
        alt="cover"
        layout="fill"
        objectFit="cover"
        priority
      />
    </HeroImgWrapper>
  );
};

class Hero extends React.Component<{
  id?: string;
  children?: React.ReactNode;
}> {
  public static Img = HeroImg;
  public static Info = HeroInfo;
  public static Subtitle = HeroSubtitle;
  public static Title = HeroTitle;

  render() {
    const { id, children } = this.props;

    return <HeroWrapper id={id}>{children}</HeroWrapper>;
  }
}

export default Hero;
