import React from 'react';
import { useScroll } from 'framer-motion';

const useProgress = () => {
  const [readingProgress, setReadingProgress] = React.useState(0);
  const { scrollYProgress } = useScroll();

  React.useEffect(
    () =>
      scrollYProgress.onChange((latest: number) => {
        setReadingProgress(parseFloat(latest.toFixed(2)));
      }),
    [scrollYProgress]
  );

  return readingProgress;
};

export default useProgress;
