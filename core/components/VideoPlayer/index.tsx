import { useEffect, useState } from 'react';
import { styled, useTheme } from '@laodeaksarr/design-system';

import type { Props } from './types';
import { getDisplayedPoster } from './utils';

const VideoPlayer = (props: Props) => {
  const { controls, loop, width, height, poster, src } = props;

  const { dark } = useTheme();
  const [currentPoster, setCurrentPoster] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
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
        poster={currentPoster}
        width={width}
        height={height}
        controls={controls}
        loop={loop || false}
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
    // aspectRatio: '16 / 9'
  }
});
