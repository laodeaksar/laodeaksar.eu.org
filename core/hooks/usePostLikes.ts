import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';

type LikesPayload = {
  likes: number;
  userLikes: number;
};

async function getPostLikes(slug: string): Promise<LikesPayload> {
  const res = await fetch('/api/likes/' + slug);
  return res.json();
}

async function updatePostLikes(slug: string): Promise<LikesPayload> {
  const res = await fetch('/api/likes/' + slug, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();

  return {
    likes: data.likes,
    userLikes: data.userLikes
  };
}

const usePostLikes = (slug: string) => {
  const { data, error } = useSWR(
    slug ? slug + '/likes' : null,
    () => getPostLikes(slug),
    {
      revalidateOnFocus: false
    }
  );

  const increment = useCallback(() => {
    mutate(slug + '/likes', updatePostLikes(slug), false);
  }, [slug]);

  return {
    likes: data?.likes ?? 0,
    userLikes: data?.userLikes ?? 0,
    isLoading: !error && !data,
    increment
  };
};

export default usePostLikes;
