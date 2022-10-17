import { type CSS } from '@bahutara/design-system';
import { useInView } from 'framer-motion';
import React from 'react';

export default function CountingNumbers({
  value,
  reverse = false,
  start = reverse ? 1000 : 0,
  interval = 10,
  duration = 800
}: {
  value: number;
  reverse?: boolean;
  start?: number;
  interval?: number;
  duration?: number;
  css?: CSS;
}) {
  const [number, setNumber] = React.useState(start);
  let increment = Math.floor(Math.abs(start - value) / (duration / interval));
  if (increment === 0) {
    increment = 1;
  }
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  React.useEffect(() => {
    if (isInView) {
      let timer = setInterval(() => {
        if (reverse) {
          if (number > value) {
            setNumber(num => {
              let newValue = num - increment;
              if (newValue < value) {
                newValue = value;
                if (timer) clearInterval(timer);
              }
              return newValue;
            });
          } else if (timer) {
            clearInterval(timer);
          }
        } else {
          if (number < value) {
            setNumber(num => {
              let newValue = num + increment;
              if (newValue > value) {
                newValue = value;
                if (timer) clearInterval(timer);
              }
              return newValue;
            });
          } else if (timer) {
            clearInterval(timer);
          }
        }
      }, interval);
    }
  }, [increment, interval, isInView, number, reverse, value]);

  return <span ref={ref}>{Intl.NumberFormat().format(number)}</span>;
}
