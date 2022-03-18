import { useState, FormEvent } from 'react';
import useSWR from 'swr';

import fetcher from '~/lib/fetcher';

import { ErrorMessage, NewsletterFormContent } from './Styles';
import { NewsletterHeader } from './Icons';
import type { Props } from './types';
import { Form, FormState } from '~/types/form';

import Anchor from '~/components/Anchor';
import Button from '~/components/Button';
import Card from '~/components/Card';
import Flex from '~/components/Flex';
import Link from '~/components/Link';
import List from '~/components/List';
import TextInput from '~/components/TextInput';
import Spinner from '~/components/Spinner';
import Text, { EM, H3 } from '~/components/Typography';

const Newsletter = (props: Props) => {
  const { large = false } = props;

  // const { data } = useSWR<{ count: number }>('/api/newsletter/subscribers', fetcher);
  const [form, setForm] = useState<FormState>({ state: Form.Initial });

  const subscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch('/api/newsletter/subscribe', {
      body: JSON.stringify({
        email: e.currentTarget.elements['email'].value
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
        {form.state !== Form.Success && form.state !== Form.Error && (
          <form onSubmit={subscribe}>
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
                name="email"
                placeholder="email@example.com"
                autoComplete="off"
                required
              />
              <Button
                aria-label="Subscribe to my newsletter"
                disabled={form.state === Form.Loading}
                title="Subscribe to my newsletter"
                type="submit"
                variant="primary"
              >
                {form.state === Form.Loading ? <Spinner /> : 'Send'}
              </Button>
            </Flex>
          </form>
        )}
        {form.state === Form.Error &&
          (form.message.includes('already subscribed') ? (
            <ErrorMessage>
              Looks like you already subscribed! If you think this is a mistake
              you can still subscribe by heading directly to my{' '}
              <Link underline href="https://www.getrevue.co/profile/laodeaksar">
                getrevue publication
              </Link>
              .
            </ErrorMessage>
          ) : (
            <ErrorMessage>
              😬 woops! We just hit a snag here, but don&apos;t worry! You can
              still subscribe by heading directly to my{' '}
              <Link underline href="https://www.getrevue.co/profile/laodeaksar">
                getrevue publication
              </Link>
              .
            </ErrorMessage>
          ))}
        {form.state === Form.Success && (
          <Text as="p" css={{ margin: '$4 0 0 0', textAlign: 'center' }}>
            (You will receive a confirmation email in a few seconds)
          </Text>
        )}
      </NewsletterFormContent>
    </Card>
  );
};

export default Newsletter;
