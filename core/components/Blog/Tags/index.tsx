import Flex from '~/components/Flex';
import Pill from '~/components/Pill';
import Text from '~/components/Typography';

import useIsArticleRead from '~/hooks/useIsArticleRead';
import { styled } from '~/lib/stitches.config';
import { handleArticleClicked } from '~/lib/handleArticleClick';

import { Button } from '../Styles';

export function TagList({ post }) {
  const { date, slug, title, subtitle } = post;
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
          css={{ gap: 0, textAlign: 'left' }}
        >
          <Text
            as="p"
            size={4}
            weight={3}
            css={{
              marginBottom: 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {title}
          </Text>
          <Text
            as="p"
            size={2}
            css={{
              marginBottom: 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {subtitle}
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
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: '500',
  paddingLeft: '10px',
  borderRadius: '$2',
  marginLeft: '-10px',
  height: '100px',
  boxShadow: 'none',
  bc: 'var(--article-block-background-color, "transparent")',
  color:
    'var(--article-block-color, var(--laodeaksar-colors-typeface-primary))',
  transition: 'background-color 0.25s, box-shadow 0.25s, color 0.25s',

  '&:focus': {
    '--article-block-background-color': 'var(--laodeaksar-colors-emphasis)',
    '--article-block-color': 'var(--laodeaksar-colors-brand)'
  },

  '@hover': {
    '&:hover': {
      '--article-block-background-color': 'var(--laodeaksar-colors-emphasis)',
      '--article-block-color': 'var(--laodeaksar-colors-brand)'
    }
  },

  '@media (max-width: 700px)': {
    height: '120px'
  }
});
