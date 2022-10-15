import React from 'react';
import { Flex, Grid, Spinner, Text } from '@bahutara/design-system';

import { usePostView } from '@/hooks/usePostViews';

const Count = ({ slug }: { slug: string }) => {
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
        <Text
          as="p"
          size="1"
          weight="3"
          variant="info"
          css={{ marginBottom: 0, display: 'flex', gap: '$1' }}
        >
          {views ?? <Spinner />} views
        </Text>
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
