import { Flex, formatDate, Pill, Text } from '@laodeaksarr/design-system';

import useIsArticleRead from '~/hooks/useIsArticleRead';
import { handleArticleClicked } from '~/lib/handleArticleClick';

import { Block, Button } from './Styles';
import { Post } from '~/lib/types';

export function BlogList({ post }: { post: Post }) {
  const { date, slug, title } = post;

  const [hasRead] = useIsArticleRead(slug);

  return (
    <Button onClick={() => handleArticleClicked(slug)}>
      <Block>
        <Text
          as="p"
          size="1"
          variant="tertiary"
          weight="3"
          css={{
            minWidth: '52px',
            marginRight: '32px',
            marginBottom: 0
          }}
        >
          {/*new Date(date).toLocaleDateString('en', {
            year: '2-digit',
            month: 'short'
          })*/}
          {formatDate(date, {
            year: '2-digit',
            month: 'short'
          })}
        </Text>
        <Text
          as="p"
          truncate
          css={{
            textAlign: 'left',
            marginBottom: 0,
            maxWidth: '12rem',

            '@md': {
              maxWidth: '$full'
            }
          }}
        >
          {title}
        </Text>
        {hasRead && (
          <Flex ml="auto">
            <Pill variant="success" css={{ marginRight: '$3' }}>
              read
            </Pill>
          </Flex>
        )}
      </Block>
    </Button>
  );
}
