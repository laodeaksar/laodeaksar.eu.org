import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { signIn, useSession } from 'next-auth/react';
import useSWR, { useSWRConfig } from 'swr';

import { Form, FormState } from '~/types/form';
import fetcher from '~/lib/fetcher';

import Button from '~/components/Button';
import Card from '~/components/Card';
import Flex from '~/components/Flex';
import Grid from '~/components/Grid';
import TextInput from '~/components/TextInput';
import Text from '~/components/Typography';
import Spinner from '~/components/Spinner';
import { GithubIcon } from '~/components/Icons';

function GuestbookEntry({ entry, user }) {
  const { mutate } = useSWRConfig();

  const deleteEntry = async (e: React.MouseEvent) => {
    e.preventDefault();

    await fetch('/api/guestbook/' + entry.id, {
      method: 'DELETE'
    });

    mutate('/api/guestbook');
  };

  return (
    <Card css={{ marginTop: '$4' }}>
      <Card.Body>
        <Flex>{entry.body}</Flex>
        <Grid gapX={2} flow="column" align="center" justify="start" mt={3}>
          <Text as="p" css={{ marginBottom: 0 }}>
            {entry.created_by}
          </Text>
          <span>&bull;</span>
          <time dateTime={entry.updated_at}>
            {new Date(entry.updated_at).toLocaleDateString('en', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })}
          </time>
          {user && entry.created_by === user.name && (
            <>
              <span>&bull;</span>
              <Button variant="secondary" onClick={deleteEntry}>
                Delete
              </Button>
            </>
          )}
        </Grid>
      </Card.Body>
    </Card>
  );
}

export default function Guestbook({ fallbackData }) {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef(null);
  const { data: entries } = useSWR('/api/guestbook', fetcher, {
    fallbackData
  });

  const leaveEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

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
      message: `Hooray! Thanks for signing my Guestbook.`
    });
  };

  return (
    <>
      <Card>
        <Card.Header css={{ fontSize: '$5' }}>Sign the Guestbook</Card.Header>
        <Card.Body>
          <Text
            as="p"
            css={{
              marginTop: '0px',
              marginBottom: '$2'
            }}
          >
            Share a message for a future visitor of my site.
          </Text>
          {!session && (
            <a
              href="/api/auth/signin/github"
              onClick={(e) => {
                e.preventDefault();
                signIn('github');
              }}
            >
              <Button variant="primary" endIcon={<GithubIcon />}>
                Signup with Github
              </Button>
            </a>
          )}
          {session?.user && (
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
                  aria-label="Your message"
                  placeholder="Your message..."
                  required
                  id="input-message"
                />
                <Button
                  aria-label="Send message"
                  disabled={form.state === Form.Loading}
                  title="Send message"
                  type="submit"
                  variant="primary"
                >
                  {form.state === Form.Loading ? <Spinner /> : 'Send'}
                </Button>
              </Flex>
            </form>
          )}
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
              {form.message}
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
              {form.message}
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
              Your information is only used to display your name and reply by
              email.
            </Text>
          )}
        </Card.Body>
      </Card>
      <div>
        {entries?.map((entry) => (
          <GuestbookEntry key={entry.id} entry={entry} user={session?.user} />
        ))}
      </div>
    </>
  );
}
