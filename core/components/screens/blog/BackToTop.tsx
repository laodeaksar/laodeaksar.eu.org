import React from 'react';
import { Button, styled } from '@laodeaksarr/design-system';

import { useHasMounted } from '@/hooks/useHasMounted';

const ButtonUp = styled(Button, {
  zIndex: 2,
  position: 'fixed',
  right: 0,
  bottom: 0,
  mr: '$16',
  mb: '$16',
  visibility: 'hidden',
  pointerEvents: 'none',
  userSelect: 'none',
  opacity: 0,
  transform: 'translateY(72px)',

  '@md': {
    mr: '$24',
    mb: '$24'
  },

  '@lg': {
    mr: '$32',
    mb: '$32'
  },

  variants: {
    shown: {
      true: {
        visible: 'flex',
        opacity: 1,
        transform: 'translateY(0)'
      }
    }
  }
});

const scrollToTop = () => {
  try {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    window.scrollTo(0, 0);
  }
};

const SCROLL_OFFSET = 287;

export const BackToTop = () => {
  const [showButton, setShowButton] = React.useState(false);
  const hasMounted = useHasMounted();

  const checkScrollTop = React.useCallback(() => {
    if (!hasMounted) return;
    const scrolledDistance = window.scrollY || window.pageYOffset;
    const screenHeight = document.body.scrollHeight - window.screen.availHeight;

    try {
      setShowButton(
        scrolledDistance / screenHeight > 0.3 &&
          scrolledDistance < screenHeight - Math.ceil(SCROLL_OFFSET / 2.5)
      );
    } catch (e) {}
  }, [hasMounted]);

  React.useEffect(() => {
    if (!hasMounted) return;
    window.addEventListener('scroll', checkScrollTop);
    checkScrollTop();

    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [hasMounted, checkScrollTop]);

  return (
    <ButtonUp
      title={'Scroll back to top'}
      variant="icon"
      onClick={scrollToTop}
      shown={showButton}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      }
    />
  );
};
