import React from 'react';
import { Card, styled, Text } from '@laodeaksarr/design-system';

export const NewsletterFormContent = styled(Card.Body, {
  variants: {
    withOffset: {
      true: {
        padding: '$8',

        '@media (max-width:700px)': {
          padding: '$8 20px 30px 20px'
        }
      },

      false: {
        padding: '24px'
      }
    }
  }
});

export const Message = ({
  children,
  isError
}: React.PropsWithChildren<{ isError?: boolean }>) => (
  <Text
    as="p"
    css={{
      margin: '$4 0px 0px 0px',
      maxWidth: '800px !important'
    }}
    variant={isError ? 'danger' : 'success'}
  >
    {children}
  </Text>
);
