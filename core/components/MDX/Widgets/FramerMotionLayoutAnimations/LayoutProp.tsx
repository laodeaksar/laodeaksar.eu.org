import { useState } from 'react';
import { motion } from 'framer-motion';

import Box from '~/components/Box';
import Card from '~/components/Card';
import Flex from '~/components/Flex';
import Grid from '~/components/Grid';
import Switch from '~/components/Switch';

const LayoutProp = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box css={{ marginBottom: '2.25rem' }}>
      <Box
        css={{
          margin: '30px 0px',

          '@media (min-width: 1100px': {
            position: 'relative',
            maxWidth: '1000px',
            width: 'calc(100% + 300px)',
            margin: '30px -150px'
          }
        }}
      >
        <Grid
          css={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
          gap={6}
        >
          <Card glass depth={3} title="layout={true}">
            <Card.Body dotMatrix css={{ height: '300px', display: 'grid' }}>
              <Box
                as={motion.div}
                layout
                transition={{
                  layout: {
                    duration: 1.5
                  }
                }}
                css={{
                  justifySelf: expanded ? 'center' : 'flex-start',
                  alignSelf: expanded ? 'center' : 'flex-start',
                  linearGradient: '90deg, #ffa0ae 0%, #aacaef 75%',
                  size: expanded ? '20px' : '100%'
                }}
                style={{
                  borderRadius: 20
                }}
              />
            </Card.Body>
          </Card>
          <Card glass depth={3} title='layout="position"'>
            <Card.Body dotMatrix css={{ height: '300px', display: 'grid' }}>
              <Box
                as={motion.div}
                layout="position"
                transition={{
                  layout: {
                    duration: 1.5
                  }
                }}
                css={{
                  justifySelf: expanded ? 'center' : 'flex-start',
                  alignSelf: expanded ? 'center' : 'flex-start',
                  linearGradient: '90deg, #ffa0ae 0%, #aacaef 75%',
                  size: expanded ? '20px' : '100%'
                }}
                style={{
                  borderRadius: 20
                }}
              />
            </Card.Body>
          </Card>
          <Card glass depth={3} title='layout="size"'>
            <Card.Body dotMatrix css={{ height: '300px', display: 'grid' }}>
              <Box
                as={motion.div}
                layout="size"
                transition={{
                  layout: {
                    duration: 1.5
                  }
                }}
                css={{
                  justifySelf: expanded ? 'center' : 'flex-start',
                  alignSelf: expanded ? 'center' : 'flex-start',
                  linearGradient: '90deg, #ffa0ae 0%, #aacaef 75%',
                  size: expanded ? '20px' : '100%'
                }}
                style={{
                  borderRadius: 20
                }}
              />
            </Card.Body>
          </Card>
        </Grid>
      </Box>
      <Flex justifyContent="center">
        <Switch
          id="expand-card"
          aria-label="Expand card"
          label="Expand card"
          onChange={() => setExpanded((prev) => !prev)}
        />
      </Flex>
    </Box>
  );
};

export default LayoutProp;
