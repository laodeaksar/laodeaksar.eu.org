import toast, { Toaster } from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ErrorMessage, NewsletterFormContent } from './Styles';
import { NewsletterHeader } from './Icons';
import type { Props } from './types';

import {
  Anchor,
  Button,
  Card,
  EM,
  Flex,
  H3,
  List,
  Spinner,
  Text,
  TextInput
} from '@laodeaksarr/design-system';

type Inputs = {
  email: string;
};

const Newsletter = (props: Props) => {
  const { large = false } = props;

  // const { data: subs } = useSWR<{ count: number }>('/api/newsletter/subscribers', fetcher);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await toast.promise(
      fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }),
      {
        loading: 'Posting your comment...',
        success: 'Thank you for your comment!',
        error: 'Something went wrong. Please try again later.'
      },
      {
        style: {
          minWidth: '200px'
        },
        success: {
          duration: 5000
        }
      }
    );
    reset({ ...data });
  };

  return (
    <Card depth={1} css={{ mx: '-$1' }}>
      {large && (
        <Flex justifyContent="center" pt={8}>
          <NewsletterHeader />
        </Flex>
      )}

      <NewsletterFormContent withOffset={large}>
        {large ? (
          <H3 css={{ maxWidth: '600px' }}>
            Get a behind the scenes look at what I&apos;m currently learning.
          </H3>
        ) : (
          <H3 css={{ maxWidth: '600px' }}>Subscribe to my newsletter</H3>
        )}
        {large ? (
          <>
            <Text as="p" css={{ marginBottom: 0 }} variant="secondary">
              Subscribe to{' '}
              <Anchor
                underline
                href="https://www.getrevue.co/profile/laodeaksar"
              >
                my newsletter
              </Anchor>{' '}
              to receive a monthly digest containing:
            </Text>
            <br />
            <List variant="unordered">
              <List.Item>
                <Text as="p" css={{ marginBottom: 0 }} variant="secondary">
                  Deep dives into some of my{' '}
                  <span>ideas and secret projects</span> that will inspire you
                </Text>
              </List.Item>
              <List.Item>
                <Text as="p" css={{ marginBottom: 0 }} variant="secondary">
                  <EM>Exclusive previews of upcoming articles</EM> on frontent
                  development
                </Text>
              </List.Item>
            </List>
          </>
        ) : (
          <>
            <Text as="p" css={{ marginBottom: 0 }} variant="secondary">
              Get email from me about my ideas, frontend development resources
              and tips as well as exclusive previews of upcoming articles.
            </Text>
            <br />
          </>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            alignItems="flex-start"
            gap={3}
            direction={{
              '@initial': 'row',
              '@media (max-width: 500px)': 'column'
            }}
          >
            <TextInput
              {...register('email', {
                required: "Don't forget to write your email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address'
                }
              })}
              aria-label="Email"
              id="email-input"
              type="email"
              placeholder="email@example.com"
              autoComplete="off"
              disabled={isSubmitting}
            />
            <Button
              aria-label="Subscribe to my newsletter"
              disabled={isSubmitting}
              title="Subscribe to my newsletter"
              type="submit"
              variant="primary"
            >
              {isSubmitting ? <Spinner /> : 'Send'}
            </Button>
          </Flex>
        </form>
        {errors && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
        {/*errors.email.message.includes==='already subscribe'&&*/}
      </NewsletterFormContent>
      <Toaster />
    </Card>
  );
};

export default Newsletter;
