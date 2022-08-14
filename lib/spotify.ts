import { serialize } from "./serialize";

const clientId = process.env.SPOTIFY_CLIENT_ID || "";
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
const refreshToken =
  process.env.SPOTIFY_CLIENT_REFRESH_TOKEN ||
  process.env.SPOTIFY_CLIENT_TOKEN ||
  "";

const basicToken = btoa(`${clientId}:${clientSecret}`);

const getAccessToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + basicToken,
  };

  const body = serialize({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  return response.json();
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();
  const url =
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
  };

  return await fetch(url, { headers });

  //if (response.status === 200) return <Record<string, any>>response.json();
  //return null;
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();
  const url = "https://api.spotify.com/v1/me/player/currently-playing";

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
  };

  return await fetch(url, { headers });

  //if (response.status === 200) return <Record<string, any>>response.json();
  //return null;
};

const forbiddenKeywords = ["netflix", "disney", "musical"];

export interface TopTrackData {
  title?: string;
  artist?: string;
  album?: string;
  url?: string;
  image?: {
    height?: number;
    width?: number;
    url?: string;
  };
}

export interface TrackData extends TopTrackData {
  isPlaying?: boolean;
}

export const validateTrack = (track: TopTrackData): boolean => {
  return !forbiddenKeywords.some(
    (it) =>
      track?.title?.toLowerCase().includes(it) ||
      track?.album?.toLowerCase().includes(it)
  );
};
