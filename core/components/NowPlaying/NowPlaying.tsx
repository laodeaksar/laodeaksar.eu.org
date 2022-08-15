import Image from 'next/image';
//import useSWR from "swr";

import { Flex, Text } from '@laodeaksarr/design-system';

import Skeleton from '~/components/Skeleton';
import SpotifyLogo, { Glass } from './icons';
import { styles } from './Styles';
//import type { Props } from "./types";

//import fetcher from "~/lib/fetcher";
import { useNowPlaying } from '~/hooks/useNowPlaying';

const Bars = () => (
  <Flex className={styles.bars}>
    <span />
    <span />
    <span />
    <span />
  </Flex>
);

const NowPlaying = () => {
  // const { data: music } = useSWR<Props>('/api/currently-playing', fetcher);
  const { data, loading } = useNowPlaying();

  const renderImage = () => {
    if (data?.isPlaying) {
      return (
        <Image
          unoptimized
          src={data.image?.url || ''}
          alt={[data.title] + ' Cover Album'}
          layout="fill"
        />
      );
    } else {
      return <SpotifyLogo />;
    }
  };

  return (
    <a
      href={data?.isPlaying ? data.url : undefined}
      className={styles.outer}
      target="_blank"
      rel="noreferrer"
    >
      <Glass />
      <Flex className={styles.inner} gap={0}>
        <Flex gap={3}>
          <Flex className={styles.cover} justifyContent="center">
            {loading ? <Skeleton variant="avatar2" /> : renderImage()}
          </Flex>
          <Flex direction="column" alignItems="start" gap={0}>
            <Text
              as="p"
              size={2}
              weight={4}
              variant="secondary"
              truncate
              className={styles.title}
            >
              {loading ? (
                <Skeleton variant="title" />
              ) : data?.isPlaying ? (
                data.title
              ) : (
                'Spotify'
              )}
            </Text>
            {loading ? (
              <Skeleton variant="text" />
            ) : data?.isPlaying ? (
              <>
                <Text
                  size={1}
                  variant="tertiary"
                  truncate
                  className={styles.artist + ' artists'}
                >
                  {data.artist}
                </Text>
                <Text size={1} className={styles.artist + ' play'}>
                  Play on Spotify
                </Text>
              </>
            ) : (
              <Text size={1} variant="tertiary" className={styles.artist}>
                {data ? 'Not Playing' : 'Loading...'}
              </Text>
            )}
          </Flex>
        </Flex>
        {loading ? <Skeleton variant="avatar1" /> : data?.isPlaying && <Bars />}
      </Flex>
    </a>
  );
};

export default NowPlaying;
