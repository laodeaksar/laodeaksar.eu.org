import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, FormEvent } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import fetcher from '~/lib/fetcher';

import { ErrorMessage, NewsletterFormContent } from './Styles';
import { NewsletterHeader } from './Icons';
import { subscribeCall } from './utils';
import type { Props } from './types';
import { Form, FormState } from '~/types/form';

import Anchor from '~/components/Anchor';
import Button from '~/components/Button';
import Card from '~/components/Card';
import Flex from '~/components/Flex';
import List from '~/components/List';
import TextInput from '~/components/TextInput';
import Text, { EM, H3 } from '~/components/Typography';

const Newsletter = (props: Props) => {
  const { large = false } = props;
  const { pathname } = useRouter();
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const opacity = useMotionValue(1);
  const pathLength = useTransform(opacity, [0.05, 0.5], [1, 0]);
  const opacityTextIn = useTransform(opacity, [0, 0.1], [1, 0]);

  const path = pathname;

  // const { data } = useSWR<{ count: number }>('/api/newsletter/subscribers', fetcher);
  const [form, setForm] = useState<FormState>({ state: Form.Initial });

  const subscribes = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch('/api/newsletter/subscribe', {
      body: JSON.stringify({
        email: e.currentTarget.elements['email'].value,
        path: pathname
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const { error, message } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error
      });
      return;
    }

    setForm({
      state: Form.Success,
      message
    });

    setIsChecked(true);
  };

  const [subscribe, { isError, isLoading, isSuccess, error }] =
    useMutation(subscribeCall);

  useEffect(() => {
    setIsChecked(false);
  }, [isError]);

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

        <form
          data-splitbee-event="Subscribe Newsletter"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await subscribe({ email, path });
              setIsChecked(true);
            } catch (e) {}
          }}
        >
          <Flex
            alignItems="flex-start"
            gap={3}
            direction={{
              '@initial': 'row',
              '@media (max-width: 500px)': 'column'
            }}
          >
            <TextInput
              aria-label="Email"
              id="email-input"
              type="email"
              placeholder="email@example.com"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <Button
              aria-label="Subscribe to my newsletter"
              disabled={isLoading}
              title="Subscribe to my newsletter"
              type="submit"
              variant="primary"
            >
              <motion.div
                initial={false}
                animate={isChecked ? 'checked' : 'unchecked'}
                variants={{
                  checked: {
                    display: 'none',
                    opacity: 0
                  },
                  unchecked: {}
                }}
                transition={{
                  duration: 0.7
                }}
                style={{ opacity }}
              >
                {isLoading ? 'Loading...' : 'Sign me up!'}
              </motion.div>
              <motion.svg
                initial="unchecked"
                animate={isChecked ? 'checked' : 'unchecked'}
                variants={{
                  checked: {
                    width: 20
                  },
                  unchecked: {
                    width: 0
                  }
                }}
                stroke="currentColor"
                height="22"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M1.8492 7.39712L7.39362 12.3822L18.0874 1.36591"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pathLength }}
                />
              </motion.svg>
              <motion.div
                initial="unchecked"
                animate={isChecked ? 'checked' : 'unchecked'}
                variants={{
                  checked: {
                    display: 'block',
                    opacity: 1
                  },
                  unchecked: {
                    display: 'none',
                    opacity: 0
                  }
                }}
                style={{ marginLeft: '8px', opacity: opacityTextIn }}
              >
                Done! 🎉
              </motion.div>
            </Button>
          </Flex>
        </form>
        {form.state === Form.Error &&
          (form.message.includes('already subscribed') ? (
            <ErrorMessage>
              Looks like you already subscribed! If you think this is a mistake
              you can still subscribe by heading directly to my{' '}
              <Anchor
                underline
                href="https://www.getrevue.co/profile/laodeaksar"
              >
                getrevue publication
              </Anchor>
              .
            </ErrorMessage>
          ) : (
            <ErrorMessage>
              😬 woops! We just hit a snag here, but don&apos;t worry! You can
              still subscribe by heading directly to my{' '}
              <Anchor
                underline
                href="https://www.getrevue.co/profile/laodeaksar"
              >
                getrevue publication
              </Anchor>
              .
            </ErrorMessage>
          ))}
        {/* {error &&
          (error.message.includes('already subscribed') ? (
            <ErrorMessage>
              Looks like you already subscribed! If you think this is a mistake
              you can still subscribe by heading directly to my{' '}
              <Anchor
                underline
                href="https://www.getrevue.co/profile/laodeaksar"
              >
                getrevue publication
              </Anchor>
              .
            </ErrorMessage>
          ) : (
            <ErrorMessage>
              😬 woops! We just hit a snag here, but don&apos;t worry! You can
              still subscribe by heading directly to my{' '}
              <Anchor
                underline
                href="https://www.getrevue.co/profile/laodeaksar"
              >
                getrevue publication
              </Anchor>
              .
            </ErrorMessage>
          ))} */}
        {form.state === Form.Success && (
          <Text as="p" css={{ margin: '$4 0 0 0', textAlign: 'center' }}>
            (You will receive a confirmation email in a few seconds)
          </Text>
        )}
        {/* {isSuccess && (
          <Text as="p" css={{ margin: '16px 0 0 0', textAlign: 'center' }}>
            (You will receive a confirmation email in a few seconds)
          </Text>
        )} */}
      </NewsletterFormContent>
    </Card>
  );
};

export default Newsletter;
