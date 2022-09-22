import React from 'react';
import { useSWRConfig } from 'swr';

import { Button, Flex, Text, TextInput } from '@laodeaksarr/design-system';
import { Form, FormState } from '~/lib/types';

function GuestbookForm() {
  const { mutate } = useSWRConfig();
  const [form, setForm] = React.useState<FormState>({ state: Form.Initial });
  const inputEl = React.useRef<HTMLInputElement | null>(null);

  const leaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    if (inputEl === null || inputEl.current === null) {
      setForm({ state: Form.Error });
      return;
    }

    if (inputEl.current.value.trim().length === 0) {
      setForm({
        state: Form.Error,
        message: 'This field is required'
      });
      return;
    }

    const res = await fetch('/api/guestbook', {
      body: JSON.stringify({
        body: inputEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
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

    inputEl.current.value = '';
    mutate('/api/guestbook');
    setForm({
      state: Form.Success,
      message: 'Thank you for your comment!'
    });
  };

  const isLoading = form.state === Form.Loading;
  const isError = form.state === Form.Error;

  return (
    <>
      <form onSubmit={leaveEntry}>
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
            aria-label="Message"
            disabled={isLoading}
            placeholder="Your message..."
            id="input-message"
          />
          <Button
            aria-label="Send message"
            isLoading={isLoading}
            title="Send message"
            type="submit"
            variant="primary"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Flex>
      </form>
      {isError ? (
        <Message isError>{form.message as string}</Message>
      ) : form.state === Form.Success ? (
        <Message>{form?.message as string}</Message>
      ) : (
        <Text
          as="p"
          size={1}
          css={{
            marginTop: '$2',
            marginBottom: 0
          }}
        >
          Your information is only used to display your name and reply by email.
        </Text>
      )}
    </>
  );
}

export default GuestbookForm;

export const Message = ({
  children,
  isError
}: React.PropsWithChildren<{ isError?: boolean }>) => (
  <Text
    as="p"
    size={2}
    css={{
      marginTop: '$2',
      marginBottom: 0
    }}
    variant={isError ? 'danger' : 'success'}
  >
    {children}
  </Text>
);
