import { useState } from 'react';
import { motion } from 'framer-motion';

import { Box, Card, Flex, Range, Icon } from '@laodeaksarr/design-system';

import { HighlightedValue } from '../Components';

const ITEMS = [1, 2, 3];
const COLORS = [
  'hsl(var(--palette-blue-50))',
  'hsl(var(--palette-pink-50))',
  'hsl(var(--palette-orange-50))'
];

const SharedLayoutAnimationDetails = () => {
  const [selected, setSelected] = useState(1);
  const [duration, setDuration] = useState(0.3);

  return (
    <Card
      css={{ marginBottom: '2.25rem' }}
      title="Little shared layout animation debugger"
    >
      <Card.Body>
        <Flex direction="column" gap={5}>
          <Flex gap={5} alignItems="start">
            {ITEMS.map((item, index) => (
              <Flex
                key={item}
                direction="column"
                justifyContent="space-between"
                css={{
                  cursor: 'pointer',

                  '&:focus': {
                    outline: 'none'
                  },

                  '&:focus-visible': {
                    outline: '1px solid var(--laodeaksar-colors-brand)'
                  }
                }}
                onClick={() => setSelected(item)}
                onKeyDown={(event) =>
                  event.key === 'Enter' && setSelected(item)
                }
                tabIndex={0}
              >
                {item === selected && (
                  <Box
                    as={motion.div}
                    css={{ height: '24px' }}
                    layoutId="arrow"
                    transition={{
                      layout: {
                        duration
                      }
                    }}
                  >
                    <Icon.Arrow
                      style={{
                        color: COLORS[index],
                        transform: 'rotate(-90deg)'
                      }}
                    />
                  </Box>
                )}
              </Flex>
            ))}
          </Flex>
          <Flex justifyContent="center">
            <Box css={{ width: '300px' }}>
              <Range
                id="mass1"
                aria-label="Mass"
                label={
                  <span>
                    Transition duration:{' '}
                    <HighlightedValue>{duration}</HighlightedValue> seconds
                  </span>
                }
                min={0.2}
                step={0.1}
                max={2}
                value={duration}
                onChange={(value) => setDuration(value)}
              />
            </Box>
          </Flex>
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default SharedLayoutAnimationDetails;
