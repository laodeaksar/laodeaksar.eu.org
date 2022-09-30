import React from 'react';
import { styled, useTheme } from '@bahutara/design-system';

import type { VideoPlayerProps } from './types';
import { getDisplayedPoster } from './utils';

const VideoPlayer = (props: VideoPlayerProps) => {
  const { autoPlay, controls, loop, muted, width, height, poster, src } = props;

  const { dark } = useTheme();
  const [currentPoster, setCurrentPoster] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (poster) {
      if (!poster.includes('.png')) {
        setCurrentPoster(getDisplayedPoster(poster, dark));
      } else {
        setCurrentPoster(poster);
      }
    }
  }, [dark, poster]);

  return (
    <Wrapper>
      <video
        autoPlay={autoPlay}
        poster={currentPoster}
        width={width}
        height={height}
        controls={controls}
        loop={loop || false}
        muted={muted}
      >
        <source src={src} type="video/mp4" />
      </video>
    </Wrapper>
  );
};

export default VideoPlayer;

const Wrapper = styled('div', {
  marginBottom: '32px',
  display: 'flex',

  video: {
    margin: '0 auto',
    background: 'var(--laodeaksar-colors-emphasis)',
    maxWidth: '$full',
    height: 'auto'
  }
});
