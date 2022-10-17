import React from 'react';
import { Flex, Grid, Spinner, Text } from '@bahutara/design-system';

import { useRequest } from '@/hooks/useRequest';
import CountingNumbers from '@/components/CountingNumber';

const Count = ({ slug }: { slug: string }) => {
  const {
    data: views,
    isLoading,
    isError
  } = useRequest<number>(`/api/views/${slug}`, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
    revalidateOnMount: false
  });

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
      {views && (
        <InlineMetric
          stat={views}
          loading={isError || isLoading}
          text="views"
        />
      )}
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
  stat: number;
  loading: boolean;
  text: string;
}) => (
  <Flex alignItems="center" css={{ gap: '$1' }}>
    {loading && <Spinner />}
    <Text as="p" size="1" weight="3" variant="info" css={{ marginBottom: 0 }}>
      <CountingNumbers value={stat} />{' '}
      {/*stat?.toLocaleString()}
      </Text>
    <Text as="p" size="1" weight="3" variant="info" css={{ marginBottom: 0 }}>*/}
      {text}
    </Text>
  </Flex>
);
