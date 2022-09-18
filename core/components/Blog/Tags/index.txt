import { Flex, Pill, Text, styled } from '@laodeaksarr/design-system';

import useIsArticleRead from '~/hooks/useIsArticleRead';

import { handleArticleClicked } from '~/lib/handleArticleClick';
import { Post } from '~/lib/types';

import { Button } from '../Styles';

export function TagList({ post }: { post: Post }) {
  const { date, slug, title, description } = post;
  
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
            marginBottom: '0px'
          }}
        >
          {new Date(date).toLocaleDateString('en', {
            year: '2-digit',
            month: 'short'
          })}
        </Text>
        <Flex
          direction="column"
          alignItems="start"
          css={{
            gap: 0,
            textAlign: 'left'
          }}
        >
          <Text
            as="p"
            size={4}
            weight={3}
            truncate
            css={{
              marginBottom: 0,
              maxWidth: '10rem',

              '@md': {
                maxWidth: '$full'
              }
            }}
          >
            {title}
          </Text>
          <Text
            as="p"
            size={2}
            truncate
            css={{
              marginBottom: 0,
              maxWidth: '10rem',

              '@md': {
                maxWidth: '$full'
              }
            }}
          >
            {description}
          </Text>
        </Flex>
        {hasRead && (
          <Flex ml="auto" mr={3}>
            <Pill variant="success">read</Pill>
          </Flex>
        )}
      </Block>
    </Button>
  );
}

const Block = styled('div', {
  $$background: 'transparent',
  $$color: 'var(--laodeaksar-colors-typeface-primary)',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: '500',
  paddingLeft: '10px',
  borderRadius: '$2',
  marginLeft: '-10px',
  height: '100px',
  boxShadow: 'none',
  bc: '$$background',
  color: '$$color',
  transition: 'background-color 0.25s, box-shadow 0.25s, color 0.25s',

  hocus: {
    $$background: 'var(--laodeaksar-colors-emphasis)',
    $$color: 'var(--laodeaksar-colors-brand)'
  },

  /*'&:focus': {
    $$background: 'var(--laodeaksar-colors-emphasis)',
    $$color: 'var(--laodeaksar-colors-brand)'
  },

  '@hover': {
    '&:hover': {
      $$background: 'var(--laodeaksar-colors-emphasis)',
      $$color: 'var(--laodeaksar-colors-brand)'
    }
  },*/

  '@media (max-width: 700px)': {
    height: '120px'
  }
});
