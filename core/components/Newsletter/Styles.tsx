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

interface Props {
  children?: React.ReactNode;
}

export const ErrorMessage = ({ children }: Props) => (
  <Text
    as="p"
    css={{
      margin: '$4 0px 0px 0px',
      maxWidth: '800px !important'
    }}
    variant="danger"
  >
    {children}
  </Text>
);
