import { useState } from 'react';
import { motion } from 'framer-motion';

import Box from '~/components/Box';
import Card from '~/components/Card';
import Flex from '~/components/Flex';
import Radio from '~/components/Radio';
import Switch from '~/components/Switch';
import { HighlightedCodeText } from '~/components/Code/CodeBlock';

const Basic = () => {
  const [position, setPosition] = useState('start');
  const [layout, setLayout] = useState(false);

  const codeString = layout
    ? `// position: ${position}
    
<motion.div
  layout
  style={{
    justifySelf: '${position}',
  }}
  //...
/>`
    : `// position: ${position}
    
<motion.div
  style={{
    justifySelf: '${position}',
  }}
  //...
/>`;

  return (
    <Card css={{ marginBottom: '2.25rem' }}>
      <Card.Body dotMatrix>
        <Flex direction="column" gap={5} full>
          <Box css={{ display: 'grid', width: '$full' }}>
            <Box
              as={motion.div}
              // @ts-ignore
              key={layout}
              layout={layout}
              css={{
                size: '100px',
                linearGradient:
                  '-60deg, #2e83ff -10%, #eb7d9f 50%, #ffcbbe 100%',
                borderRadius: '$2',
                justifySelf: position
              }}
            />
          </Box>
          <Flex direction="column" gap={4} alignItems="start">
            <Radio.Group
              name="positions"
              direction="horizontal"
              onChange={(event) => {
                // @ts-ignore
                setPosition(event.target.value);
              }}
            >
              <Radio.Item
                id="position-1"
                value="start"
                aria-label="Start"
                label="Start"
                checked={position === 'start'}
              />
              <Radio.Item
                id="position-2"
                value="center"
                aria-label="Center"
                label="Center"
                checked={position === 'center'}
              />
              <Radio.Item
                id="position-3"
                value="end"
                aria-label="End"
                label="End"
                checked={position === 'end'}
              />
            </Radio.Group>
            <Switch
              id="use-layout"
              aria-label="Use layout animation"
              label="Use layout animation"
              onChange={() => setLayout((prev) => !prev)}
            />
          </Flex>
        </Flex>
      </Card.Body>
      <HighlightedCodeText codeString={codeString} language="jsx" />
    </Card>
  );
};

export default Basic;
