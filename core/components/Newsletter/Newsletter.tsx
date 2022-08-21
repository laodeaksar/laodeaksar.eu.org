//import toast, { Toaster } from 'react-hot-toast';
//import { useForm, SubmitHandler } from 'react-hook-form';

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
import React from 'react';
import { ClickEvent, Form, FormState } from '~/lib/types';
//import useSWR from 'swr';

/*type Inputs = {
  email: string;
};*/

const Newsletter = (props: Props) => {
  const { large = false } = props;

  const [form, setForm] = React.useState<FormState>({ state: Form.Initial });
  const inputEl = React.useRef<HTMLInputElement | null>(null);
  //const { data } = useSWR<Subscribers>('/api/subscribers', fetcher);
  //const subscriberCount = new Number(data?.count);
   
  const subscribe = async (e: ClickEvent) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const email = inputEl.current?.value;
    const res = await fetch(`/api/subscribe?email=${email}`, {
      method: 'POST'
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error
      });
      return;
    }

    inputEl.current?.value === ''
    setForm({
      state: Form.Success,
      message: `Hooray! You're now on the list.`
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
              ref={inputEl}
              aria-label="Email"
              id="email-input"
              type="email"
              placeholder="email@example.com"
              autoComplete="off"
              disabled={form.state === Form.Loading}
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
        {form.state === Form.Error ? (
          <ErrorMessage>{form.message}</ErrorMessage>
        ) : null}
        {/*form.state === Form.Success ? (
        <SuccessMessage>{form.message}</SuccessMessage>
      ) : (
          {errors && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
          errors.email.message.includes==='already subscribe'&&*/}
      </NewsletterFormContent>
      {/*<Toaster />*/}
    </Card>
  );
};

export default Newsletter;
