import React from 'react';
import { Flex, Grid, Spinner, Text } from '@bahutara/design-system';

import { useRequest } from '@/hooks/useRequest';

const Count = ({ slug }: { slug: string }) => {
  const {
    data: views,
    isLoading,
    isError
  } = useRequest<number>(`/api/views/${slug}`);

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
    <Grid gapX={2} flow="column" align="center">
      <InlineMetric stat={views} loading={isError || isLoading} text="views" />
      <span>&bull;</span>
      {/*{likesIsError || likesIsLoading ? (
          <LoadingDots />
        ) : (
          <InlineMetric key={likes} stat={likes} />
        )}{" "} 
        likes*/}
    </Grid>
  );
};

export default Count;

const InlineMetric = ({
  stat,
  loading,
  text
}: {
  stat?: number;
  loading: boolean;
  text: string;
}) => (
  <Flex alignItems="center" css={{ gap: '$1' }}>
    {loading && <Spinner />}
    <Text as="p" size="1" weight="3" variant="info" css={{ marginBottom: 0 }}>
      {stat?.toLocaleString()} {text}
    </Text>
  </Flex>
);
