import React from 'react';
import { useRequest } from './useRequest';
import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';

interface PostViewsData {
  data?: number | null;
  isLoading: boolean;
  isError?: boolean;
}

export const usePostViews = (slug: string): PostViewsData => {
  const { data, isLoading, isError } = useRequest<number>(`/api/views/${slug}`);

  React.useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST'
      });

    if (process.env.NODE_ENV === 'production') {
      registerView();
    }
  }, [slug]);

  return {
    data,
    isLoading,
    isError
  };
};

//const API_URL = '/api/views';

async function getPostViews(slug: string): Promise<number> {
  const res = await fetch(`/api/views/${slug}`);
  return res.json();
}

async function updatePostViews(slug: string): Promise<number> {
  const res = await fetch(`/api/views/${slug}`, {
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
