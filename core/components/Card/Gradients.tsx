import { keyframes } from '~/lib/stitches.config';

import Box from '~/components/Box';
import Flex from '~/components/Flex';

import Card from '.';

const rotateGradient = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '50%': {
    transform: 'rotate(135deg)'
  },
  '100%': {
    transform: 'rotate(0deg)'
  }
});

export const Gradients: React.FC<{ children: React.ReactNode }> = (props) => (
  <Card
    css={{
      my: '150px',
      linearGradient: '135deg, rgb(88 154 253) rgb(188 236 255)',
      maxWidth: '250px',
      height: '250px',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none'
    }}
  >
    <Box
      css={{
        position: 'absolute',
        size: '$full',
        left: '0',
        top: '0',
        transformOrigin: 'center center',

        animation: `${rotateGradient} 10s infinite`,

        '@motion': { display: 'none', animation: 'none' }
      }}
    >
      <Box
        css={{
          linearGradient: '135deg, rgb(88 154 253) 35%, rgb(188 236 255) 65%',
          transform: 'scale(1.5, 3)',
          size: '110%',
          left: '-10px',
          position: 'absolute',
          top: '-10px',
          transformOrigin: 'center center'
        }}
      />
    </Box>
    <Card.Body>
      <Flex
        direction="column"
        justifyContent="end"
        css={{
          marginTop: '50%',
          transform: 'translateY(-50%)',
          height: '$full'
        }}
      >
        {props.children}
      </Flex>
    </Card.Body>
  </Card>
);
