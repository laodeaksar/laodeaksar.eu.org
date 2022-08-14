export type Props =
  | { isPlaying: false }
  | {
      isPlaying: true;
      title: string;
      artists: string;
      spotifyUrl: string;
      cover: string;
    };

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};
