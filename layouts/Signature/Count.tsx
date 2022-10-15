import React from 'react';
import { Flex, Grid, Spinner } from '@bahutara/design-system';

import usePostViews from '@/hooks/usePostViews';

const Count = ({ slug }: { slug: string }) => {
  const { views, increment: incrementViews } = usePostViews(slug);
  /*const {
    likes,
    userLikes,
    isLoading,
    increment: incrementLikes,
  } = usePostLikes(slug);*/
  React.useEffect(() => {
    if (slug) {
      incrementViews();
    }
  }, [slug, incrementViews]);

  return (
    <Flex>
      <Grid gapX={2} flow="column" align="center">
        <span>&bull;</span>
        {views ?? <Spinner />} views
      </Grid>
    </Flex>
  );
};

export default Count;
