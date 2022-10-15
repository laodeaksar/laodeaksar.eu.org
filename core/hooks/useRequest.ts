import useSWR from 'swr';
import { MutatorCallback } from 'swr/dist/types';

import fetcher from '~/lib/fetcher';

interface SwrData<T = unknown> {
  data?: T | null;
  isLoading: boolean;
  isError?: boolean;
  mutate?: (
    data?: T | Promise<T> | MutatorCallback<T>,
    shouldRevalidate?: boolean
  ) => Promise<T | undefined>;
}

export const useRequest = <T>(url: string): SwrData<T> => {
  const { data, error, mutate } = useSWR<T>(url, fetcher);

  return {
    data,
    isError: !!error,
    mutate,
    isLoading: !data && !error
  };
};
