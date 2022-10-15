import React from 'react';
import { useRequest } from './useRequest';

interface Total {
  total: number;
}

interface PostViewsData {
  data?: Total | null;
  isLoading: boolean;
  isError?: boolean;
}

export const usePostViews = (slug: string): PostViewsData => {
  const { data, isLoading, isError } = useRequest<Total>(`/api/views/${slug}`);

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
