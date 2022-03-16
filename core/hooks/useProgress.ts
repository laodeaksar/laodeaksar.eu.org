import { useEffect, useState } from 'react';
import { useViewportScroll } from 'framer-motion';

const useProgress = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const { scrollYProgress } = useViewportScroll();

  useEffect(
    () =>
      scrollYProgress.onChange((latest: number) => {
        setReadingProgress(parseFloat(latest.toFixed(2)));
      }),
    [scrollYProgress]
  );

  return readingProgress;
};

export default useProgress;
