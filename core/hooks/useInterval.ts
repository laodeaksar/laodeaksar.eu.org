import { useEffect, useRef } from 'react';

const useInterval = (callback: () => unknown, delay: number = 1000) => {
  const savedCallback = useRef<() => unknown>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback && savedCallback.current) {
        savedCallback.current();
      }
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
};

export default useInterval;
