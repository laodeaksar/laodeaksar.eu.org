import Image from "next/image";
//import useSWR from "swr";

import { Flex, Text } from "@laodeaksarr/design-system";

import Skeleton from "~/components/Skeleton";
import SpotifyLogo, { Glass } from "./icons";
import { styles } from "./Styles";
//import type { Props } from "./types";

//import fetcher from "~/lib/fetcher";
import { useNowPlaying } from "~/hooks/useNowPlaying";

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
  const { data: music, loading } = useNowPlaying();

  const renderImage = () => {
    if (music?.isPlaying) {
      return (
        <Image
          unoptimized
          src={music.cover}
          alt={[music.title] + " Cover Album"}
          layout="fill"
        />
      );
    } else {
      return <SpotifyLogo />;
    }
  };

  return (
    <a
      href={music?.isPlaying ? music.url : undefined}
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
              ) : music?.isPlaying ? (
                music.title
              ) : (
                "Spotify"
              )}
            </Text>
            {loading ? (
              <Skeleton variant="text" />
            ) : music?.isPlaying ? (
              <>
                <Text
                  size={1}
                  variant="tertiary"
                  truncate
                  className={styles.artists + " artists"}
                >
                  {music.artist}
                </Text>
                <Text size={1} className={styles.artists + " play"}>
                  Play on Spotify
                </Text>
              </>
            ) : (
              <Text size={1} variant="tertiary" className={styles.artists}>
                {music ? "Not Playing" : "Loading..."}
              </Text>
            )}
          </Flex>
        </Flex>
        {loading ? (
          <Skeleton variant="avatar1" />
        ) : (
          music?.isPlaying && <Bars />
        )}
      </Flex>
    </a>
  );
};

export default NowPlaying;
