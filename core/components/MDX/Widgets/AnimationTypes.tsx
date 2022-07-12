import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Card, Grid, Label, Range, css } from '@laodeaksarr/design-system';

import { HighlightedCodeText } from '~/components/Code/CodeBlock';

import {
  AnimationCardContent,
  Form,
  HighlightedValue,
  TransitionGridWrapper,
  Wrapper
} from './Components';
import { useDebounce } from './utils';

const AnimationTypes = () => {
  const [ref, inView] = useInView();
  const [tweenAnimation, setTweenAnimation] = useState('easeInOut');
  const [mass, setMass] = useState(3);
  const [damping, setDamping] = useState(1);
  const [velocity, setVelocity] = useState(50);
  const [stiffness, setStiffness] = useState(100);
  const [countSpring, setCountSpring] = useState(0);
  const [countInertia, setCountInertia] = useState(0);

  const debouncedMass = useDebounce(mass, 300);
  const debouncedStiffness = useDebounce(stiffness, 300);
  const debouncedDamping = useDebounce(damping, 300);
  const debouncedVelocity = useDebounce(velocity, 300);

  useEffect(() => {
    setCountSpring(countSpring + 1);
  }, [debouncedMass, debouncedStiffness, debouncedDamping, countSpring]);

  useEffect(() => {
    setCountInertia(countInertia + 1);
  }, [countInertia, debouncedVelocity]);

  const springCodeString = `<motion.div
    ...
    transition={{
      type: 'spring',
      stiffness: ${stiffness},
      mass: ${mass},
      damping: ${damping},
    }}
  />
  `;

  const tweenCodeString = `<motion.div
    ...
    transition={{
      type: 'tween',
      ease: '${tweenAnimation}',
      duration: 2,
      ...
    }}
  />
  `;

  const inertiaCodeString = `<motion.div
    ...
    transition={{
      type: 'inertia',
      velocity: ${velocity},
    }}
  />
  `;

  return (
    <Wrapper ref={ref}>
      <TransitionGridWrapper>
        <Card glass depth={1}>
          <Card.Header>Spring</Card.Header>
          <AnimationCardContent>
            <Form>
              <Range
                id="mass1"
                aria-label="Mass"
                label={
                  <span>
                    Mass: <HighlightedValue>{mass}</HighlightedValue>
                  </span>
                }
                min={1}
                max={10}
                value={mass}
                onChange={(value) => setMass(value)}
              />
              <Range
                id="stiffness1"
                aria-label="Stiffness"
                label={
                  <span>
                    Stiffness: <HighlightedValue>{stiffness}</HighlightedValue>
                  </span>
                }
                min={1}
                max={500}
                value={stiffness}
                onChange={(value) => setStiffness(value)}
              />
              <Range
                id="damping"
                aria-label="Damping"
                label={
                  <span>
                    Damping: <HighlightedValue>{damping}</HighlightedValue>
                  </span>
                }
                min={0}
                max={5}
                step="0.10"
                value={damping}
                onChange={(value) => setDamping(value)}
              />{' '}
            </Form>
            <div />
            <motion.div
              key={countSpring}
              className={animationStyle()}
              initial={{
                y: -100
              }}
              animate={
                inView
                  ? {
                      y: 0
                    }
                  : {
                      y: -100
                    }
              }
              transition={{
                type: 'spring',
                stiffness,
                mass,
                damping
              }}
            />
          </AnimationCardContent>
          <HighlightedCodeText
            codeString={springCodeString}
            language="javascript"
          />
        </Card>

        <Card glass depth={1}>
          <Card.Header>Tween</Card.Header>
          <AnimationCardContent>
            <Form>
              <Grid>
                <Label htmlFor="tween-type">Ease</Label>
                <select
                  id="tween-type"
                  value={tweenAnimation}
                  onChange={(event) => {
                    setTweenAnimation(event.target.value);
                  }}
                >
                  <option value="linear">linear</option>
                  <option value="easeIn">easeIn</option>
                  <option value="easeOut">easeOut</option>
                  <option value="easeInOut">easeInOut</option>
                  <option value="circIn">circIn</option>
                  <option value="circOut">circOut</option>
                  <option value="circInOut">circInOut</option>
                  <option value="backIn">backIn</option>
                  <option value="backOut">backOut</option>
                  <option value="backInOut">backInOut</option>
                  <option value="anticipate">anticipate</option>
                </select>
              </Grid>
            </Form>
            <div />
            <motion.div
              key={tweenAnimation}
              className={animationStyle()}
              initial={{
                y: -120
              }}
              animate={
                inView
                  ? {
                      y: 20
                    }
                  : {
                      y: -120
                    }
              }
              transition={{
                ease: tweenAnimation,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 1,
                duration: 2
              }}
            />
          </AnimationCardContent>
          <HighlightedCodeText
            codeString={tweenCodeString}
            language="javascript"
          />
        </Card>
        <Card glass depth={1}>
          <Card.Header>Inertia</Card.Header>
          <AnimationCardContent>
            <Form>
              <Grid>
                <Range
                  id="velocity"
                  aria-label="Velocity"
                  label={
                    <span>
                      Velocity: <HighlightedValue>{velocity}</HighlightedValue>
                    </span>
                  }
                  min={1}
                  max={500}
                  value={velocity}
                  onChange={(value) => setVelocity(value)}
                />
              </Grid>
            </Form>
            <div />
            <motion.div
              key={countInertia}
              className={animationStyle()}
              initial={{
                y: -120
              }}
              animate={
                inView
                  ? {
                      y: 20
                    }
                  : {
                      y: -120
                    }
              }
              transition={{
                type: 'inertia',
                velocity,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </AnimationCardContent>
          <HighlightedCodeText
            codeString={inertiaCodeString}
            language="javascript"
          />
        </Card>
      </TransitionGridWrapper>
    </Wrapper>
  );
};

export default AnimationTypes;

const animationStyle = css({
  linearGradient: '90deg, #ffa0ae 0%, #aacaef 75%',
  // height: '100px',
  size: '100px',
  borderRadius: '10px'
});
