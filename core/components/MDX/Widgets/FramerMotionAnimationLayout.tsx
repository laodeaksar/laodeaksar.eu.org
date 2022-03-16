import { useState } from 'react';
import { motion } from 'framer-motion';

import { styled } from '~/lib/stitches.config';

import Card from '~/components/Card';
import Checkbox from '~/components/Checkbox';
import Grid from '~/components/Grid';

import { AnimationCardContent } from './Components';

const PETS = [
  {
    id: '1',
    photo: '🐶'
  },
  {
    id: '2',
    photo: '🐱'
  },
  {
    id: '3',
    photo: '🐰'
  },
  {
    id: '4',
    photo: '🐭'
  },
  {
    id: '5',
    photo: '🐹'
  },
  {
    id: '6',
    photo: '🐷'
  },
  {
    id: '7',
    photo: '🐻'
  },
  {
    id: '8',
    photo: '🦁'
  },
  {
    id: '9',
    photo: '🦊'
  },
  {
    id: '10',
    photo: '🐧'
  },
  {
    id: '11',
    photo: '🐼'
  },
  {
    id: '12',
    photo: '🐮'
  }
];

const FramerMotionAnimationLayout = () => {
  const [selectedPetID, setSelectedPetID] = useState('1');
  const [withLayoutID, setWithLayoutID] = useState(false);

  return (
    <Card
      depth={1}
      css={{
        marginBottom: '2.25rem'
      }}
    >
      <AnimationCardContent>
        <Grid
          as="ul"
          css={{
            gridTemplateColumns: 'repeat(4, 48px)',
            height: '250px',
            width: '$full',
            padding: '0'
          }}
          gapX={3}
          justify="center"
        >
          {PETS.map((pet) => (
            <li
              style={{
                listStyle: 'none',
                position: 'relative',
                cursor: 'pointer'
              }}
              key={pet.id}
              onClick={() => setSelectedPetID(pet.id)}
            >
              <Circle>{pet.photo}</Circle>
              {selectedPetID === pet.id && (
                <motion.div
                  layoutId={withLayoutID ? 'border' : undefined}
                  style={{
                    position: 'absolute',
                    borderRadius: '$round',
                    size: '48px',
                    border: '4px solid var(--laodeaksar-colors-brand)'
                  }}
                />
              )}
            </li>
          ))}
        </Grid>
        <div>
          <Checkbox
            aria-label="Use common layout ID"
            id="layout"
            checked={withLayoutID}
            label="Use common layout ID"
            onChange={() => setWithLayoutID((prev) => !prev)}
          />
        </div>
      </AnimationCardContent>
    </Card>
  );
};

export default FramerMotionAnimationLayout;

const Circle = styled('div', {
  linearGradient: '104.01deg, #9bebeb 5.51%, #0fa6e9 98.93%',
  size: '48px',
  userSelect: 'none',
  borderRadius: '$round',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '32px',
  margin: '0 auto'
});
