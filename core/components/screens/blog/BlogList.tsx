import { Flex, Pill, Text } from '@bahutara/design-system';

import useIsArticleRead from '@/hooks/useIsArticleRead';

import { handleArticleClicked } from '~/lib/handleArticleClick';
import { Post } from '~/lib/types';

import { Block, Button } from './Styles';
import Link from 'next/link';

export function BlogList({ post }: { post: Post }) {
  const { date, slug, title } = post;

  const [hasRead] = useIsArticleRead(slug);

  return (
    <>
      <Link
        href={`/posts/${post.slug}/`}
        style={{ textDecoration: 'none', fontWeight: 500 }}
      >
        {title}
      </Link>
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
            {new Date(date).toLocaleDateString('en', {
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
            <Flex css={{ ml: 'auto' }}>
              <Pill variant="success" css={{ marginRight: '$3' }}>
                read
              </Pill>
            </Flex>
          )}
        </Block>
      </Button>
    </>
  );
}
