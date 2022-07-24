import { useState } from 'react';
import { motion } from 'framer-motion';

import { HighlightedCodeText } from '~/components/Code/CodeBlock';

import {
  styled,
  Button,
  Box,
  Card,
  Flex,
  Pill,
  Switch,
  Tooltip,
  Icon
} from '@laodeaksarr/design-system';

const IconButton = styled(motion.button, {
  appearance: 'none',
  background: 'transparent',
  color: 'inherit',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '0'
});

const ITEMS = [1, 2, 3];

const LayoutPosition = () => {
  const [items, setItems] = useState(ITEMS);
  const [position, setPosition] = useState(false);

  const codeString = position
    ? `<motion.div layout>
  <Label variant="success">
    <motion.div
      style={{
        width:'100%',
        display: 'flex',
        justifyContent: 'start',
      }}
      layout="position"
    >
      <DismissButton />
      <span>{text}</span>
    </motion.div>
  </Label>
</motion.div>`
    : `<motion.div layout>
  <Label variant="success">
    <motion.div
      style={{
        width:'100%',
        display: 'flex',
        justifyContent: 'start',
      }}
    >
      <DismissButton />
      <span>{text}</span>
    </motion.div>
  </Label>
</motion.div>`;

  return (
    <Card
      css={{ marginBottom: '2.25rem' }}
      title='Example of practical use case for layout="position"'
    >
      <Card.Body>
        <Flex direction="column" gap={5}>
          <Flex full>
            {items.map((item) => (
              <Box as={motion.div} css={{ flexGrow: 1 }} key={item} layout>
                <Pill
                  style={{ width: '100%', borderRadius: 8 }}
                  variant="success"
                >
                  <Flex
                    as={motion.div}
                    // @ts-ignore
                    key={position}
                    layout={position ? 'position' : true}
                    justifyContent="start"
                    full
                  >
                    <IconButton
                      title="Dismiss label"
                      aria-label="Dismiss label"
                      onClick={() =>
                        setItems((prev) =>
                          prev.filter((label) => label !== item)
                        )
                      }
                    >
                      <Icon.X size={3} />
                    </IconButton>
                    <span>Label {item}</span>
                  </Flex>
                </Pill>
              </Box>
            ))}
          </Flex>
          <Switch
            id="use-layout-position"
            aria-label='Use layout="position"'
            label="Use layout animation"
            onChange={() => setPosition((prev) => !prev)}
          />

          <Tooltip id="reset-tooltip" content="Reset">
            <Button
              aria-label="Reset"
              aria-describedby="reset-tooltip"
              variant="icon"
              icon={<Icon.Repeat />}
              onClick={() => setItems(ITEMS)}
            />
          </Tooltip>
        </Flex>
      </Card.Body>
      <HighlightedCodeText codeString={codeString} language="jsx" />
    </Card>
  );
};

export default LayoutPosition;
