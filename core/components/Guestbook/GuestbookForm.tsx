import React from 'react';
import { useSWRConfig } from 'swr';

import { Button, Flex, Text, TextInput } from '@laodeaksarr/design-system';
import { ClickEvent, Form, FormState } from '~/lib/types';

function GuestbookForm() {
  const { mutate } = useSWRConfig();
  const [form, setForm] = React.useState<FormState>({ state: Form.Initial });
  const inputEl = React.useRef<HTMLInputElement | null>(null);

  const leaveEntry = async (e: ClickEvent) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    if (inputEl === null || inputEl.current === null) {
      setForm({ state: Form.Error });
      return;
    }

    if (inputEl.current.value.trim().length === 0) {
      setForm({
        state: Form.Error,
        message: 'Something went wrong. Please try again later.'
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
            disabled={form.state === Form.Loading}
            placeholder="Your message..."
            id="input-message"
          />
          <Button
            aria-label="Send message"
            disabled={form.state === Form.Loading}
            isLoading={form.state === Form.Loading}
            title="Send message"
            type="submit"
            variant="primary"
          >
            {form.state === Form.Loading ? '' : 'Send'}
          </Button>
        </Flex>
      </form>
      {form.state === Form.Error ? (
        <Text
          as="p"
          size={2}
          variant="danger"
          css={{
            marginTop: '$2',
            marginBottom: 0
          }}
        >
          {form.message as string}
        </Text>
      ) : form.state === Form.Success ? (
        <Text
          as="p"
          size={2}
          variant="success"
          css={{
            marginTop: '$2',
            marginBottom: 0
          }}
        >
          {form?.message as string}
        </Text>
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
