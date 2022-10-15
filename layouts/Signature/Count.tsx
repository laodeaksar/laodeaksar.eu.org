import { Flex, Grid } from '@bahutara/design-system';

import ViewCounter from '@/components/screens/blog/ViewCounter';

const Count = ({ slug }: { slug: string }) => {
  return (
    <Flex>
      <Grid>
        <span>&bull;</span>
        <ViewCounter slug={slug} />
      </Grid>
    </Flex>
  );
};

export default Count;
