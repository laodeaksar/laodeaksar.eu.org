import React from 'react';
import { Flex, Grid, Spinner, Text } from '@bahutara/design-system';

import useSWR from 'swr';
import fetcher from '~/lib/fetcher';

const Count = ({ slug }: { slug: string }) => {
  const { data } = useSWR<number>(`/api/views/${slug}`, fetcher);
  const views = new Number(data);

  React.useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST'
      });

    if (process.env.NODE_ENV === 'production') {
      registerView();
    }
  }, [slug]);

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
          {`${views.toLocaleString() ?? <Spinner />} views`}
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
