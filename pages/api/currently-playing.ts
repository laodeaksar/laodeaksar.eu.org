import { getCurrentlyPlaying } from '~/lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function currentlyPlaying(
  _: NextApiRequest,
  res: NextApiResponse
) {
  const music = await getCurrentlyPlaying();

  if (!music || !music.item || !music.is_playing) {
    return res.status(200).json({ isPlaying: false });
  }

  return res.status(200).json({
    isPlaying: true,
    title: music.item.name,
    artists: music.item.artists.map(({ name }: any) => name).join(', '),
    spotifyUrl: music.item.external_urls.spotify,
    cover: music.item.album.images.find(({ height }: any) => height === 64)?.url
  });
}
