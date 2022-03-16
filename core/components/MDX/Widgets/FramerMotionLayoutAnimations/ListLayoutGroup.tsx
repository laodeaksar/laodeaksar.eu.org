import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

import { css } from '~/lib/stitches.config';

import Card from '~/components/Card';
import Flex from '~/components/Flex';
import Pill from '~/components/Pill';
import Switch from '~/components/Switch';
import Text from '~/components/Typography';
import { HighlightedCodeText } from '~/components/Code/CodeBlock';
import { XIcon } from '~/components/Icons';

const ITEMS = [
  {
    text: 'Make some coffee ☕',
    checked: false,
    id: 4
  },
  {
    text: 'Drink water 💧',
    checked: false,
    id: 5
  },
  {
    text: 'Go to the gym 🏃',
    checked: false,
    id: 6
  }
];

const ITEMS2 = [
  {
    text: 'Finish blog post ✍',
    checked: false,
    id: 1
  },
  {
    text: 'Build new Three.js experiences ✨',
    checked: false,
    id: 2
  },
  {
    text: 'Add new components to Design System 🌈',
    checked: false,
    id: 3
  }
];

const List = (props: {
  items: Array<{ text: string; id: number }>;
  name: string;
}) => {
  const { items, name } = props;
  const [listItems, setListItems] = useState(items);

  return (
    <Flex direction="column" gap={4} alignItems="start" full>
      <AnimatePresence>
        {listItems.map((item) => (
          <Card
            as={motion.div}
            layout
            initial={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            key={item.id}
            css={{
              width: '$full',
              borderRadius: '$1'
            }}
          >
            <Card.Body css={{ padding: '$3' }}>
              <Flex alignItems="center" gap={4}>
                <button
                  className={css({
                    size: '16px',
                    background: 'transparent',
                    boxShadow: 'none',
                    border: 'none',
                    color: 'var(--laodeaksar-color-typeface-secondary)',
                    cursor: 'pointer'
                  })()}
                  onClick={() =>
                    setListItems((prev) =>
                      prev.filter((task) => task.id !== item.id)
                    )
                  }
                >
                  <XIcon size={4} />
                </button>
                <Text
                  size={2}
                  css={{
                    marginBottom: 0,
                    userSelect: 'none'
                  }}
                >
                  {item.text} <Pill variant="info">{name}</Pill>
                </Text>
              </Flex>
            </Card.Body>
          </Card>
        ))}
      </AnimatePresence>
    </Flex>
  );
};

const ListLayoutGroup = () => {
  const [layoutGroup, setLayoutGroup] = useState(false);

  const codeString = layoutGroup
    ? `<LayoutGroup>
  <List
    items={[...]}
    name="List 1"
  />
  <List
    items={[...]}
    name="List 2"
  />
</LayoutGroup>`
    : `<>
  <List
    items={[...]}
    name="List 1"
  />
  <List
    items={[...]}
    name="List 2"
  />
</>`;

  return (
    <Card depth={1} css={{ marginBottom: '2.25rem' }}>
      <Card.Body css={{ height: '520px' }}>
        <Flex direction="column" gap={3} alignItems="start">
          <Flex alignItems="center" gap={4}>
            <Switch
              id="use-layoutGroup"
              aria-label="Wrap in layoutGroup"
              label="Wrap in layoutGroup"
              onChange={() => setLayoutGroup((prev) => !prev)}
            />
          </Flex>
          {layoutGroup ? (
            <LayoutGroup>
              <List items={ITEMS} name="List 1" />
              <List items={ITEMS2} name="List 2" />
            </LayoutGroup>
          ) : (
            <>
              <List items={ITEMS} name="List 1" />
              <List items={ITEMS2} name="List 2" />
            </>
          )}
        </Flex>
      </Card.Body>
      <HighlightedCodeText codeString={codeString} language="jsx" />
    </Card>
  );
};

export default ListLayoutGroup;
