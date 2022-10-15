import { Flex, Grid, Spinner, Text } from '@bahutara/design-system';

import { usePostViews } from '@/hooks/usePostViews';

const Count = ({ slug }: { slug: string }) => {
  const { data } = usePostViews(slug);

  /*const {
    likes,
    isLoading: likesIsLoading,
    isError: likesIsError,
  } = usePostLikes(slug)*/
  const views = data?.total?.toLocaleString()

  return (
    <Flex>
      <Grid gapX={2} flow="column" align="center">
        {views ?? <Spinner />} views
        <span>&bull;</span>
        <Text
          as="p"
          size="1"
          weight="3"
          variant="info"
          css={{ marginBottom: 0, display: 'flex', gap: '$1' }}
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
