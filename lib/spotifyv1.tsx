import { fetcher } from "./fetchers";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN || '';

type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

const basicToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64'
);

const getAccessToken = async () => {
  const url = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + basicToken
  };

  const formData = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  });

  const response = await fetch(url, {
    method: 'POST',
    body: formData.toString(),
    headers
  });

  return response.json();
};

export const getCurrentlyPlaying = async () => {
  const { access_token } = await getAccessToken();
  const url = 'https://api.spotify.com/v1/me/player/currently-playing';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + access_token
  };

  const response = await fetch(url, { headers });

  if (response.status === 200) return <Record<string, any>>response.json();
  return null;
};
