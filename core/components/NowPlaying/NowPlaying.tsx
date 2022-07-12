import Image from 'next/image';
import useSWR from 'swr';

import { Flex, Text } from '@laodeaksarr/design-system';

import SpotifyLogo, { Glass } from './icons';
import { styles } from './Styles';
import type { Props } from './types';

import fetcher from '~/lib/fetcher';

const Bars = () => (
  <Flex className={styles.bars}>
    <span />
    <span />
    <span />
    <span />
  </Flex>
);

const NowPlaying = () => {
  const { data: music } = useSWR<Props>('/api/currently-playing', fetcher);

  return (
    <a
      href={music?.isPlaying ? music.spotifyUrl : undefined}
      className={styles.outer}
      target="_blank"
      rel="noreferrer"
    >
      <Glass />
      <Flex className={styles.inner} gap={0}>
        <Flex gap={3}>
          <Flex className={styles.cover} justifyContent="center">
            {music?.isPlaying ? (
              <Image
                unoptimized
                src={music.cover}
                alt={[music.title] + ' Cover Album'}
                layout="fill"
              />
            ) : (
              <SpotifyLogo />
            )}
          </Flex>
          <Flex direction="column" alignItems="start" gap={0}>
            <Text
              as="p"
              size={2}
              weight={4}
              variant="secondary"
              ellipsis
              className={styles.title}
            >
              {music?.isPlaying ? music.title : 'Spotify'}
            </Text>
            {music?.isPlaying ? (
              <>
                <Text
                  size={1}
                  variant="tertiary"
                  ellipsis
                  className={styles.artists + ' artists'}
                >
                  {music.artists}
                </Text>
                <Text size={1} className={styles.artists + ' play'}>
                  Play on Spotify
                </Text>
              </>
            ) : (
              <Text size={1} variant="tertiary" className={styles.artists}>
                {music ? 'Not Playing' : 'Loading...'}
              </Text>
            )}
          </Flex>
        </Flex>
        {music?.isPlaying && <Bars />}
      </Flex>
    </a>
  );
};

export default NowPlaying;
