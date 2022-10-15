import React from 'react';
import { useRequest } from './useRequest';
import useSWR, { SWRConfiguration } from "swr"


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

const API_URL = `/api/views`

async function getPostViews(slug: string): Promise<number> {
  const res = await fetch(API_URL + `/${slug}`)
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.")
  }
  return res.json()
}

async function updatePostViews(slug: string): Promise<number> {
  const res = await fetch(API_URL + `/${slug}`, { method: "POST" })
  if (!res.ok) {
    throw new Error("An error occurred while posting the data.")
  }
  return res.json()
}

export const usePostView = (slug: string, config?: SWRConfiguration) => {
  const {
    data: views,
    error,
    mutate,
  } = useSWR<number>([API_URL, slug], () => getPostViews(slug), {
    dedupingInterval: 60000,
    ...config,
  })

  const increment = () => {
    mutate(
      updatePostViews(slug).catch((e) => {
        console.log(e)

        return 0
      }),
    )
  }

  return {
    views,
    isLoading: !error && !views,
    isError: !!error,
    increment,
  }
}