import { Flex, Grid, Spinner, Text } from '@bahutara/design-system';

import { usePostView, usePostViews } from '@/hooks/usePostViews';
import React from 'react';
import { usePollIfInView } from '@/hooks/usePollIfInView';

const Count = ({ slug }: { slug: string }) => {
  const { data } = usePostViews(slug);

  const interval = 5000;
  const { shouldPoll, intersectionRef } = usePollIfInView(interval);

  const {
    views,
    //isLoading: viewsIsLoading,
    //isError: viewsIsError,
    increment: incrementViews
  } = usePostView(slug, {
    revalidateOnMount: false,
    refreshInterval: shouldPoll ? interval : 0,
    dedupingInterval: interval
  });

  /*const {
    likes,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = usePostLikes(slug, {
    refreshInterval: shouldPoll ? interval : 0,
  })*/

  React.useEffect(() => {
    incrementViews();
  }, [incrementViews]);

  return (
    <Flex>
      <Grid gapX={2} flow="column" align="center">
        {data?.toLocaleString() ?? <Spinner />} views
        <span>&bull;</span>
        <Text
          as="p"
          size="1"
          weight="3"
          variant="info"
          css={{ marginBottom: 0, display: 'flex', gap: '$1' }}
          ref={intersectionRef}
        >
          {views ?? <Spinner />} views
        </Text>
        {/*{likesIsError || likesIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={likes} stat={likes} />
        )}{" "}
        likes*/}
      </Grid>
    </Flex>
  );
};

export default Count;
