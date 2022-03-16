import { useState } from 'react';
import { motion } from 'framer-motion';

import Box from '~/components/Box';
import Card from '~/components/Card';
import Flex from '~/components/Flex';
import Switch from '~/components/Switch';
import { HighlightedCodeText } from '~/components/Code/CodeBlock';

const Distorsions = () => {
  const [expanded, setExpanded] = useState(false);
  const [inline, setInline] = useState(false);

  const codeString = inline
    ? `// expanded: ${expanded}

// CSS
.box {
  width:20px;
  height: 20px;
}

.box[data-expanded="true"] {
  width:150px;
  height: 150px;
}

// JS
<motion.div
  layout
  className="box"
  data-expanded={expanded}
  style={{
    borderRadius: '20px'
  }}
/>
    `
    : `// expanded: ${expanded}
    
// CSS
.box {
  width:20px;
  height: 20px;
}

.box[data-expanded="true"] {
  width:150px;
  height: 150px;
}

// JS
<motion.div
  layout
  className="box"
  data-expanded={expanded}
/>
    `;

  return (
    <Card css={{ marginBottom: '2.25rem' }}>
      <Card.Body dotMatrix css={{ display: 'grid', width: '300px' }}>
        <Box
          as={motion.div}
          // @ts-ignore
          key={inline}
          layout
          transition={{
            layout: {
              duration: 1.5
            }
          }}
          css={{
            justifySelf: 'center',
            alignSelf: 'center',
            linearGradient: '90deg, #ffa0ae 0%, #aacaef 75%',
            size: expanded ? '150px' : '20px'
          }}
          style={
            inline
              ? {
                  borderRadius: '16px'
                }
              : {}
          }
        />
        <Box
          css={{
            position: 'absolute',
            bottom: 0,
            width: '$full',
            padding: '$4'
          }}
        >
          <Flex alignItems="center" justifyContent="center">
            <Switch
              id="expand-card"
              aria-label="Expand card"
              label="Expand card"
              onChange={() => setExpanded((prev) => !prev)}
            />
            <Switch
              id="expand-card"
              aria-label="Expand card"
              label="Expand card"
              onChange={() => setInline((prev) => !prev)}
            />
          </Flex>
        </Box>
      </Card.Body>
      <HighlightedCodeText codeString={codeString} language="jsx" />
    </Card>
  );
};

export default Distorsions;
