import { getCurrentlyPlaying } from '~/lib/spotify.draft';

export const config = {
  runtime: 'experimental-edge'
};

export default async function currentlyPlaying() {
  const music = await getCurrentlyPlaying();

  if (!music || !music.item || !music.is_playing) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  return new Response(
    JSON.stringify({
      isPlaying: true,
      title: music.item.name,
      artists: music.item.artists.map(({ name }: any) => name).join(', '),
      spotifyUrl: music.item.external_urls.spotify,
      cover: music.item.album.images.find(({ height }: any) => height === 64)
        ?.url
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    }
  );
}
