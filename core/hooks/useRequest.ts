import useSWR from 'swr';
import type { MutatorCallback } from 'swr/dist/types';

import { fetcher } from '~/lib/utils';

interface SwrData<T = unknown> {
  data?: T;
  isLoading: boolean;
  isError?: boolean;
  mutate?: (
    data?: T | Promise<T> | MutatorCallback<T>,
    shouldRevalidate?: boolean
  ) => Promise<T | undefined>;
}

export const useRequest = <T>(
  url: string,
): SwrData<T> => {
  const { data, error, mutate } = useSWR<T>(url, fetcher);

  return {
    data,
    isError: !!error,
    mutate,
    isLoading: !data && !error
  };
};
