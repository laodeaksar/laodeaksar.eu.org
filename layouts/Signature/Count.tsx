import React from 'react';
import { Flex, Grid, Spinner, Text } from '@bahutara/design-system';

import { usePostView, usePostViews } from '@/hooks/usePostViews';

const Count = ({ slug }: { slug: string }) => {
  const { data } = usePostViews(slug);

  const { views, increment: incrementViews } = usePostView(slug);
  /*const {
    likes,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = usePostLikes(slug, {
    refreshInterval: shouldPoll ? interval : 0,
  })*/

  React.useEffect(() => {
    if (slug) {
      incrementViews();
    }
  }, [incrementViews, slug]);

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
        >
          {views?.toLocaleString() ?? <Spinner />} views
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
