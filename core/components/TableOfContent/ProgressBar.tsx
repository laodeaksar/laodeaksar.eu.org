import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { ProgressBarWrapper } from './Styles';

import { Box } from '@laodeaksarr/design-system';

const ProgressBar = ({ progress }: { progress: number }) => {
  const [visibility, setVisibility] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const progressBarWrapperVariants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0
    },
    show: (visibility: boolean) => ({
      opacity: shouldReduceMotion ? 1 : visibility ? 0.7 : 0
    })
  };

  useEffect(
    () => setVisibility(progress >= 0.07 && progress <= 0.95),
    [progress]
  );

  return (
    <ProgressBarWrapper
      initial="hide"
      variants={progressBarWrapperVariants}
      animate="show"
      transition={{ type: 'spring' }}
      custom={visibility}
    >
      <Box
        as={motion.div}
        css={{
          transformOrigin: 'top',
          scaleY: progress,
          width: '2px',
          height: '$full',
          bc: 'var(--laodeaksar-colors-typeface-tertiary)'
        }}
        data-testprogress={progress}
      />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
