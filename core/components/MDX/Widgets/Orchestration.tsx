import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { AnimationCardContent, Form, HighlightedValue } from './Components';
import { useDebounce } from './utils';

import { css, Card, Range } from '@laodeaksarr/design-system';

const Orchestration = () => {
  const [key, setKey] = useState(0);
  const [delayChildren, setDelayChildren] = useState(0.5);
  const [staggerChildren, setStaggerChildren] = useState(0.5);

  const debouncedDelay = useDebounce(delayChildren, 500);
  const debouncedStagger = useDebounce(staggerChildren, 500);

  const boxVariants = {
    out: {
      y: 600
    },
    in: {
      y: 0,
      transition: {
        duration: '0.6',
        delayChildren,
        staggerChildren
      }
    }
  };

  const iconVariants = {
    out: {
      x: -600
    },
    in: {
      x: 0
    }
  };

  useEffect(() => {
    setKey(key + 1);
  }, [debouncedDelay, debouncedStagger, key]);

  return (
    <Card
      depth={1}
      css={{
        marginBottom: '30px'
      }}
    >
      <AnimationCardContent
        css={{
          margin: '0 auto',
          maxWidth: '400px'
        }}
      >
        <Form>
          <Range
            id="delayChildren"
            label={
              <span>
                Delay Children:{' '}
                <HighlightedValue>{delayChildren}</HighlightedValue>
              </span>
            }
            aria-label="Delay Children"
            min={0}
            max={5}
            step="0.1"
            value={delayChildren}
            onChange={(value) => setDelayChildren(value)}
          />

          <Range
            id="staggerChildren"
            label={
              <span>
                Stagger Children:{' '}
                <HighlightedValue>{staggerChildren}</HighlightedValue>
              </span>
            }
            aria-label="Stagger Children"
            min={0}
            max={5}
            step="0.1"
            value={staggerChildren}
            onChange={(value) => setStaggerChildren(value)}
          />
        </Form>
        <motion.div
          key={key}
          className={boxStyle()}
          variants={boxVariants}
          initial="out"
          animate="in"
        >
          <motion.span
            role="img"
            aria-labelledby="magic wand"
            variants={iconVariants}
          >
            🚀
          </motion.span>
          <motion.span
            role="img"
            aria-labelledby="sparkles"
            variants={iconVariants}
          >
            ✨
          </motion.span>
          <motion.span
            role="img"
            aria-labelledby="party popper"
            variants={iconVariants}
          >
            🎉
          </motion.span>
        </motion.div>
      </AnimationCardContent>
    </Card>
  );
};

export default Orchestration;

const boxStyle = css({
  linearGradient: '90deg, #ffa0ae 0%, #aacaef 75%',
  height: '280px',
  width: '230px',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  fontSize: '48px',
  overflow: 'hidden'
});
