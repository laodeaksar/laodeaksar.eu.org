import { Flex, Grid, Spinner, Text } from '@bahutara/design-system';

import { usePostViews } from '@/hooks/usePostViews';
import React from 'react';

const Count = ({ slug }: { slug: string }) => {
  const {
    views,
    isLoading: viewsIsLoading,
    isError: viewsIsError,
    increment: incrementViews,
  } = usePostViews(slug, {
    // Avoid fetching view count we *know* is stale since increment() mutation
    // returns view count
    revalidateOnMount: false,
    // Only poll when in view
    //refreshInterval: shouldPoll ? interval : 0,
    // Override `usePostViews` default dedupingInterval for the polling usecase
    // (refresh interval can never be faster than deduping interval)
    //dedupingInterval: interval,
  })
  
  /*const {
    likes,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = usePostLikes(slug)*/

  //const { views, increment: incrementViews } = usePostViews(slug);
  React.useEffect(() => {
    incrementViews()
  }, [incrementViews])

  return (
    <Flex>
      <Grid gapX={2} flow="column" align="center">
        {viewsIsError || viewsIsLoading ? (
          <Spinner />
        ) : (
          <Text>{views?.toLocaleString()}</Text>
        )}{' '}
        views
        <span>&bull;</span>
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
