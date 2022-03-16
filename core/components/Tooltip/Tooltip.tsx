import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// import ReactDOM from 'react-dom';

import VisuallyHidden from '~/components/VisuallyHidden';
import { styles } from './Styles';

interface Props {
  id: string;
  tooltipText: string;
  tooltipVisuallyHiddenText?: string;
}

const Tooltip: React.FC<Props> = (props) => {
  const { children, id, tooltipText, tooltipVisuallyHiddenText } = props;
  const [dimensions, setDimensions] = useState({
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 0
  });

  const controls = useAnimation();

  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePosition = useCallback(
    (tooltipRef: React.RefObject<HTMLSpanElement>) => {
      const { current } = tooltipRef!;

      if (current) {
        const tooltipRect = current.getBoundingClientRect();
        if (tooltipRect.left < 0) {
          current.style.left = '0';
          current.style.right = 'auto';
          current.style.transform = `translateX(${-tooltipRect.x - 40}px)`;
        } else if (tooltipRect.right > dimensions.width) {
          current.style.left = 'auto';
          current.style.right = '0';
          current.style.transform = `translateX(${
            dimensions.width - tooltipRect.right + 40
          }px)`;
        }
      }
    },
    [dimensions]
  );

  const resetPosition = (tooltipRef: React.RefObject<HTMLSpanElement>) => {
    const { current } = tooltipRef!;

    if (current) {
      current.style.removeProperty('left');
      current.style.removeProperty('right');
      current.style.removeProperty('transform');
    }
  };

  const showTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current.setAttribute('aria-hidden', 'false');
      controls.start('hover');
      handlePosition(tooltipRef);
    }
  };

  function hideTooltip() {
    if (tooltipRef.current) {
      tooltipRef.current.setAttribute('aria-hidden', 'true');
      controls.start('idle');
      resetPosition(tooltipRef);
    }
  }

  return (
    <motion.div
      className={styles.controlStyle}
      initial="idle"
      animate={controls}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onKeyDown={(event) => {
        if (event.which === 27) {
          event.preventDefault();
          hideTooltip();
          return false;
        }
      }}
    >
      {children}
      {/* {ReactDOM.createPortal( */}
      <motion.span
        id={id}
        aria-hidden={true}
        ref={tooltipRef}
        variants={{
          hover: {
            scale: 1,
            y: 6,
            opacity: 1
          },
          idle: {
            scale: 0.95,
            y: 10,
            opacity: 0
          }
        }}
        transition={{
          delay: 0.15
        }}
        className={styles.tipStyle}
        role="tooltip"
      >
        {tooltipText}
        {tooltipVisuallyHiddenText && (
          <VisuallyHidden as="p">{tooltipVisuallyHiddenText}</VisuallyHidden>
        )}
      </motion.span>
      {/* ,document.body
      )} */}
    </motion.div>
  );
};

export default Tooltip;
