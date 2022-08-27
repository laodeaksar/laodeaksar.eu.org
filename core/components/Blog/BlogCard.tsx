import { Box, Grid, Text } from '@laodeaksarr/design-system';

import { BlogList } from './BlogList';
import { Post } from '~/lib/types';

let year = 0;

const BlogCard = ({ posts }: { posts: Post[] }) => (
  <Grid as="ul" css={{ margin: 0, padding: 0 }} gapY={1}>
    {posts.map((post) => {
      const currentYear = new Date(post.date).getFullYear();
      let printYear: boolean;

      if (currentYear !== year) {
        printYear = true;
        year = currentYear;
      } else {
        printYear = false;
      }

      return (
        <Box
          as="li"
          css={{
            listStyle: 'none',
            mb: 'calc(1.45rem / 2)'
          }}
          key={post.title}
        >
          {printYear && (
            <Text as="p" weight="4" css={{ paddingTop: '30px' }}>
              {currentYear}
            </Text>
          )}
          <BlogList post={post} />
        </Box>
      );
    })}
  </Grid>
);

export default BlogCard;
