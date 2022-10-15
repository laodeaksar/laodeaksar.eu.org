import { TrackData } from '~/lib/spotify';

// import { useActivity } from './useActivity';
import { useRequest } from './useRequest';

interface NowPlayingData {
  data?: TrackData | null;
  isLoading: boolean;
  isError?: boolean;
}

export const useNowPlaying = (): NowPlayingData => {
  const { data, isLoading, isError } = useRequest<TrackData>('/api/now-playing');
  /* const {
    data: activity,
    isLoading: activityLoading,
    isError: activityError,
  } = useActivity();
  return {
    data: { ...data, ...activity?.spotify } as TrackData,
    isLoading: !!(isLoading || activityLoading),
    isError: isError || activityError,
  }; */
  return {
    data: { ...data },
    isLoading,
    isError
  };
};
