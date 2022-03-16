import { useEffect, useRef } from 'react';

import { AnimatePresence } from 'framer-motion';

import Button from '~/components/Button';
import Box from '~/components/Box';
import Flex from '~/components/Flex';
import Text from '~/components/Typography';
import { XIcon, InfoIcon, AlertIcon } from '~/components/Icons';

import useToastStore from '~/hooks/useToastStore';

import { MessageWrapper } from './Styles';

const variants = {
  fadeLeft: {
    initial: {
      opacity: 0,
      x: '100%'
    },
    animate: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: '100%'
    }
  },
  fadeUp: {
    initial: {
      opacity: 0,
      y: 16
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: '-100%'
    }
  }
};

const MessageModal = () => {
  const { closeToast, isToastOpen, position, toastType, message, direction } =
    useToastStore();

  const completeButtonRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [isToastOpen]);

  return (
    <AnimatePresence>
      {isToastOpen && (
        <MessageWrapper
          key={toastType}
          variants={variants[direction]}
          initial="initial"
          animate="animate"
          exit="exit"
          positions={position}
          toastTypes={toastType}
        >
          <Box mx={2} ml={8}>
            {toastType === 'warning' && <AlertIcon size={6} variant="danger" />}
            {toastType === 'success' && (
              <Flex>
                <span>🎉</span>
              </Flex>
            )}
            {toastType === 'error' && <InfoIcon size={6} variant="warning" />}
          </Box>

          {message && (
            <Text as="p" size={{ '@initial': 1, '@lg': 3 }} css={{ mx: '$2' }}>
              {message}
            </Text>
          )}

          <Button
            ref={completeButtonRef}
            type="button"
            css={{ position: 'absolute', top: '$2', right: '$3' }}
            onClick={closeToast}
            variant="icon"
            icon={<XIcon />}
          />
        </MessageWrapper>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;
