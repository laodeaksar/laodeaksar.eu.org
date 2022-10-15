import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';

const API_URL = '/api/views/';

async function getPostViews(slug: string): Promise<number> {
  const res = await fetch(API_URL + slug);
  return res.json();
}

async function updatePostViews(slug: string): Promise<number> {
  const res = await fetch(API_URL + slug, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  return await res.json();
}

export const usePostView = (slug: string) => {
  const { data: views } = useSWR<number>(
    slug ? `${slug}/views` : null,
    () => getPostViews(slug),
    {
      revalidateOnFocus: false
    }
  );

  const increment = useCallback(() => {
    mutate(`${slug}/views`, updatePostViews(slug));
  }, [slug]);

  return { views, increment };
};
