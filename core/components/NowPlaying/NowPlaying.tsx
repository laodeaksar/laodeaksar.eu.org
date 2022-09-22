import { Flex } from '@laodeaksarr/design-system';

import { Glass, SpotifyLogo } from './icons';
import {
  AnchorStyled,
  ArtistStyled,
  BarsStyled,
  CoverStyled,
  TitleStyled,
  WrapperStyled
} from './Styles';

import { useNowPlaying } from '@/hooks/useNowPlaying';
import Image from '../MDX/Image';

const Bars = () => (
  <BarsStyled>
    <span />
    <span />
    <span />
    <span />
  </BarsStyled>
);

const NowPlaying = () => {
  const { data } = useNowPlaying();

  return (
    <AnchorStyled
      href={data?.isPlaying ? data.url : undefined}
      target="_blank"
      rel="noreferrer"
    >
      <Glass />
      <WrapperStyled justifyContent="space-between" gap={0}>
        <Flex gap={3}>
          <CoverStyled justifyContent="center">
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
          </CoverStyled>
          <Flex direction="column" alignItems="start" gap={0}>
            <TitleStyled
              as="p"
              size={2}
              weight={4}
              variant="secondary"
              truncate
            >
              {data?.isPlaying ? data.title : 'Spotify'}
            </TitleStyled>
            {data?.isPlaying ? (
              <>
                <ArtistStyled
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
                </ArtistStyled>
                <ArtistStyled
                  size={1}
                  css={{
                    display: 'none',
                    opacity: 1,
                    color: 'var(--laodeaksar-colors-success)',

                    '&:hover': {
                      display: 'inline-flex'
                    }
                  }}
                >
                  Play on Spotify
                </ArtistStyled>
              </>
            ) : (
              <ArtistStyled size={1} variant="tertiary">
                {data ? 'Not Playing' : 'Loading...'}
              </ArtistStyled>
            )}
          </Flex>
        </Flex>
        {data?.isPlaying && <Bars />}
      </WrapperStyled>
    </AnchorStyled>
  );
};

export default NowPlaying;
