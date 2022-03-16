export type Props =
  | { isPlaying: false }
  | {
      isPlaying: true;
      title: string;
      artists: string;
      spotifyUrl: string;
      cover: string;
    };
