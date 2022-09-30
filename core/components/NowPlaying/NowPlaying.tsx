import { Flex } from '@bahutara/design-system';

import { Glass, SpotifyLogo } from './icons';
import * as Styled from './Styles';

import { useNowPlaying } from '@/hooks/useNowPlaying';
import Image from '../MDX/Image';

const Bars = () => (
  <Styled.Bars>
    <span />
    <span />
    <span />
    <span />
  </Styled.Bars>
);

const NowPlaying = () => {
  const { data } = useNowPlaying();

  return (
    <Styled.Anchor
      href={data?.isPlaying ? data.url : undefined}
      target="_blank"
      rel="noreferrer"
    >
      <Glass />
      <Styled.Wrapper justifyContent="space-between" gap={0}>
        <Flex gap={3}>
          <Styled.Cover justifyContent="center">
            {data?.isPlaying ? (
              <Image
                unoptimized
                src={data.image?.url || ''}
                alt={[data.title] + ' Cover Album'}
                layout="fill"
              />
            ) : (
              <SpotifyLogo />
            )}
          </Styled.Cover>
          <Flex direction="column" alignItems="start" gap={0}>
            <Styled.Title
              as="p"
              size={2}
              weight={4}
              variant="secondary"
              truncate
            >
              {data?.isPlaying ? data.title : 'Spotify'}
            </Styled.Title>
            {data?.isPlaying ? (
              <>
                <Styled.Artist
                  size={1}
                  variant="tertiary"
                  truncate
                  css={{
                    '&:hover': {
                      display: 'none'
                    }
                  }}
                >
                  {data.artist}
                </Styled.Artist>
                <Styled.Artist
                  size={1}
                  css={{
                    display: 'none',
                    opacity: 1,
                    color: 'var(--laodeaksar-colors-success)',

                    '&:hover': {
                      display: 'flex !important'
                    }
                  }}
                >
                  Play on Spotify
                </Styled.Artist>
              </>
            ) : (
              <Styled.Artist size={1} variant="tertiary">
                {data ? 'Not Playing' : 'Loading...'}
              </Styled.Artist>
            )}
          </Flex>
        </Flex>
        {data?.isPlaying && <Bars />}
      </Styled.Wrapper>
    </Styled.Anchor>
  );
};

export default NowPlaying;
