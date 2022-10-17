import ms from 'ms';

interface SWRError extends Error {
  status: number;
}

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as SWRError;
      error.status = res.status;
      throw error;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }

  return (await res.json()) as T;
}

export const timeAgo = (timestamp: number): string => {
  if (!timestamp) return 'never';
  return `${ms(Date.now() - timestamp)} ago`;
};
