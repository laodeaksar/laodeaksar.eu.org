import { motion, useReducedMotion } from 'framer-motion';
import { Anchor, Box } from '@bahutara/design-system';

import useProgress from '@/hooks/useProgress';
import useScrollSpy from '@/hooks/useScrollSpy';

import ProgressBar from './ProgressBar';
import { Wrapper } from './Styles';
import type { TableOfContentProps } from './types';

const OFFSET = 150;

const TableOfContent = ({ ids }: TableOfContentProps) => {
  const shouldReduceMotion = useReducedMotion();
  const readingProgress = useProgress();

  const shouldShowTableOfContent =
    readingProgress > 0.07 && readingProgress < 0.95;

  const variants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0
    },
    show: (shouldShowTableOfContent: boolean) => ({
      opacity: shouldReduceMotion || shouldShowTableOfContent ? 1 : 0
    })
  };

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    const element = document.getElementById(id)!;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - 100;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const [currentActiveIndex] = useScrollSpy(
    ids.map(
      item => document.querySelector(`section[id="${item.id}-section"]`)!
    ),
    { offset: OFFSET }
  );

  return (
    <Wrapper hidden={!shouldShowTableOfContent}>
      <ProgressBar progress={readingProgress} />
      {ids.length > 0 && (
        <ul>
          {ids.map((item, index) => {
            return (
              <Box
                as={motion.li}
                initial="hide"
                css={
                  currentActiveIndex === index
                    ? {
                        a: {
                          color: 'var(--laodeaksar-colors-brand) !important'
                        }
                      }
                    : {}
                }
                variants={variants}
                animate="show"
                transition={{ type: 'spring' }}
                key={item.id}
                custom={shouldShowTableOfContent}
              >
                <Anchor
                  discreet
                  href={`#${item.id}`}
                  onClick={event =>
                    handleLinkClick(event, `${item.id}-section`)
                  }
                >
                  {item.title}
                </Anchor>
              </Box>
            );
          })}
        </ul>
      )}
    </Wrapper>
  );
};

export default TableOfContent;
