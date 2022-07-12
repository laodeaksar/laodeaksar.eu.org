import { useState } from 'react';
import { motion } from 'framer-motion';

import {
  Button,
  Card as DesignSystemCard,
  Flex,
  H3,
  Icon,
  css,
  Shadows,
  styled
} from '@laodeaksarr/design-system';

import { AnimationCardContent } from './Components';

const CardWithGlow = () => {
  const glowVariants = {
    hover: (inPerspective: boolean) => ({
      opacity: 0.8,
      translateX: inPerspective ? 35 : 0,
      translateY: inPerspective ? 35 : 0
    }),
    initial: {
      opacity: 0
    }
  };

  const tagVariants = {
    hover: {
      opacity: 1
    },
    initial: {
      opacity: 0
    }
  };

  const topLayerVariants = {
    hover: {
      translateX: -25,
      translateY: -10,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    initial: {
      translateX: -10,
      translateY: 5
    }
  };

  const layerVariants = {
    active: (inPerspective: boolean) => ({
      rotateX: inPerspective ? 51 : 0,
      rotateY: 0,
      rotateZ: inPerspective ? 43 : 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }),
    initial: {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  const [inPerspective, setInPerspective] = useState(false);

  return (
    <Flex
      direction="column"
      alignItems="center"
      css={{
        position: 'relative',
        textAlign: 'center'
      }}
    >
      <Wrapper
        initial="initial"
        whileHover="hover"
        whileTap="hover"
        animate="active"
        custom={inPerspective}
        variants={layerVariants}
      >
        <CaptureLayer show={inPerspective} variants={topLayerVariants} />
        <H3>Hover me!</H3>
        <CardWrapper>
          <Glow variants={glowVariants} custom={inPerspective} />
          <Card>
            <div>✨ It&apos;s magic! ✨</div>
          </Card>
        </CardWrapper>
        {inPerspective && (
          <motion.div className={topLayer()} variants={tagVariants}>
            Top Layer: motion component wrapper sets variant &quot;hover&quot;
            on hover
          </motion.div>
        )}
        {inPerspective && (
          <motion.div className={bottomLayer()} variants={tagVariants}>
            Bottom Layer: &quot;Glow&quot; motion component consumes hover
            variant
          </motion.div>
        )}
      </Wrapper>
      <br />
      <br />
      <Button
        title={inPerspective ? 'Disable perspective' : 'Enable perspective'}
        variant="icon"
        icon={<Icon.Stack />}
        onClick={() => setInPerspective((prev) => !prev)}
      />
    </Flex>
  );
};

const FramerMotionPropagation = () => {
  return (
    <DesignSystemCard
      depth={1}
      css={{
        marginBottom: '2.25rem'
      }}
    >
      <AnimationCardContent>
        <CardWithGlow />
      </AnimationCardContent>
    </DesignSystemCard>
  );
};

export default FramerMotionPropagation;

const topLayer = css({
  position: 'absolute',
  fontSize: '12px',
  top: '-55px',
  maxWidth: '250px'
});

const bottomLayer = css({
  position: 'absolute',
  fontSize: '12px',
  bottom: '-75px',
  right: '-15px',
  maxWidth: '250px'
});

const CardWrapper = styled('div', {
  position: 'relative',
  width: '300px',
  height: '200px'
});

const Wrapper = styled(motion.div, {
  position: 'relative',
  cursor: 'default'
});

const CaptureLayer = styled(motion.div, {
  position: 'absolute',
  size: '300px',
  borderRadius: '32px',
  background: `repeating-linear-gradient(
    -45deg,
    var(--laodeaksar-colors-foreground),
    var(--laodeaksar-colors-foreground) 5px,
    var(--laodeaksar-colors-emphasis) 5px,
    var(--laodeaksar-colors-emphasis) 10px
  )`,

  zIndex: '3',
  transformStyle: 'preserve-3d',
  boxShadow: `1px 1px 0 1px var(--laodeaksar-colors-emphasis),
    -1px 0 28px 0 rgb(34 33 81 / 1%), 28px 28px 28px 0 rgb(34 33 81 / 25%)`,
  transition: '0.4s ease-in-out box-shadow, 0.4s ease-in-out opacity',

  '&:hover': {
    boxShadow: `1px 1px 0 1px var(--laodeaksar-colors-emphasis),
      -1px 0 28px 0 rgba(34, 33, 81, 0.01),
      54px 54px 28px -10px rgba(34, 33, 81, 0.15)`
  },

  variants: {
    show: {
      true: {
        opacity: 1
      },
      false: {
        opacity: 0
      }
    }
  }
});

const Glow = styled(motion.div, {
  linearGradient: '104.01deg, #9bebeb 5.51%, #0fa6e9 98.93%',
  position: 'absolute',
  top: '0',
  left: '0',
  size: '$full',
  webkitFilter: 'blur(15px)',
  filter: 'blur(15px)',
  borderRadius: '32px'
});

const Card = styled('div', {
  borderRadius: '32px',
  border: '1px solid var(--laodeaksar-colors-emphasis)',
  marginBottom: '0px',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: 'hsla(var(--palette-gray-05), 0.55)',
  boxShadow: Shadows[3],

  height: '$full',

  div: {
    color: '#4a4a4c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px'
  }
});
