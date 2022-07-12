import { signIn, signOut, useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSWR, { SWRConfig, useSWRConfig } from 'swr';
import toast, { Toaster } from 'react-hot-toast';

import fetcher from '~/lib/fetcher';

import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  H2,
  Icon,
  Text,
  TextInput
} from '@laodeaksarr/design-system';

import SEO from '~/components/Seo';
import Spinner from '~/components/Spinner';

import prisma from '~/lib/prisma';
import Layout from '~/layout';

type Inputs = {
  body: string;
};

interface GuestbookEntry {
  id: string;
  body: string;
  created_by: string;
  updated_at: string;
  email: string;
}

function GuestbookForm() {
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await toast.promise(
      fetch('/api/guestbook', {
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
    await mutate('/api/guestbook').then(() => reset());
  };

  return (
    <>
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
            {...register('body', {
              required: "Don't forget to write something",
              maxLength: 200
            })}
            aria-label="Your message"
            disabled={isSubmitting}
            placeholder="Your message..."
            id="input-message"
          />
          <Button
            aria-label="Send message"
            disabled={isSubmitting}
            title="Send message"
            type="submit"
            variant="primary"
          >
            {isSubmitting ? <Spinner /> : 'Send'}
          </Button>
        </Flex>
      </form>
      {errors ? (
        <Text
          as="p"
          size={2}
          variant="danger"
          css={{
            marginTop: '$2',
            marginBottom: 0
          }}
        >
          {errors.body?.message}
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

function LogInWithGithub() {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/auth/signin/github"
      onClick={(e) => {
        e.preventDefault();
        signIn('github');
      }}
    >
      <Button variant="primary" endIcon={<Icon.Github />}>
        Signup with Github
      </Button>
    </a>
  );
}

function GuestbookBody() {
  const { status } = useSession();

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'unauthenticated') return <LogInWithGithub />;

  return <GuestbookForm />;
}

function Entry({ entry }: { entry: GuestbookEntry }) {
  const { mutate } = useSWRConfig();
  const { data } = useSession();

  const handleDelete = async () => {
    await fetch('/api/guestbook/' + entry.id, {
      method: 'DELETE'
    });
    await mutate('/api/guestbook');
  };

  return (
    <Box
      css={{
        '&:not(:last-child)': {
          paddingBottom: '2rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--laodeaksar-border-color)'
        }
      }}
    >
      <Text size={4} weight={3} css={{ marginBottom: 2 }} as="p">
        {entry.created_by}
      </Text>
      <Flex css={{ marginBottom: 2 }}>{entry.body}</Flex>
      <Grid gapX={2} flow="column" align="center" justify="between" mt={3}>
        <time dateTime={entry.updated_at}>
          {new Date(entry.updated_at).toLocaleDateString('en', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          })}
        </time>
        {data?.user?.email === entry.email && (
          <Button
            css={{
              $$background: 'transparent !important',
              $$color: 'var(--laodeaksar-colors-typeface-tertiary)',

              '&:hover': {
                '&:not(:disabled)': {
                  $$border: 'var(--laodeaksar-colors-danger)',
                  $$color: 'var(--laodeaksar-colors-danger)'
                }
              },

              '&:focus-visible': {
                $$border: 'var(--laodeaksar-colors-danger)',
                $$color: 'var(--laodeaksar-colors-danger)'
              }
            }}
            onClick={handleDelete}
            variant="icon"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            }
          />
        )}
      </Grid>
    </Box>
  );
}

function GuestbookEntries() {
  const { data: entries } = useSWR<GuestbookEntry[]>('/api/guestbook', fetcher);
  const { data: session } = useSession();

  return (
    <Card css={{ marginTop: '$4' }}>
      <Card.Header css={{ fontSize: '$3' }}>
        All Message
        {session && (
          <Button
            variant="icon"
            css={{ my: 4, $$background: 'transparent !important' }}
            onClick={() => signOut()}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            }
          />
        )}
      </Card.Header>
      <Card.Body>
        {entries?.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </Card.Body>
    </Card>
  );
}

export default function Guestbook({
  fallback
}: {
  fallback: { string: GuestbookEntry[] };
}) {
  return (
    <Layout footer header headerProps={{ offsetHeight: 256 }}>
      <SEO title="Guestbook Page" />
      <Grid columns="medium" gapX={4} gapY={12} all>
        <div>
          <H2>Guestbook</H2>
          <Text as="p">
            Leave a comment below. It could be anything - appreciation,
            information, wisdom, or even humor. Surprise me!
          </Text>
          <Card>
            <Card.Header css={{ fontSize: '$5' }}>
              Sign the Guestbook
            </Card.Header>
            <Card.Body>
              <Text
                as="p"
                css={{
                  marginTop: 0,
                  marginBottom: '$2'
                }}
              >
                Share a message for a future visitor of my site.
              </Text>
              <GuestbookBody />
            </Card.Body>
          </Card>
          <SWRConfig value={{ fallback }}>
            <GuestbookEntries />
          </SWRConfig>
          <Toaster />
        </div>
      </Grid>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  });

  const initialEntries = entries.map((entry) => ({
    id: entry.id.toString(),
    body: entry.body,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString()
  }));

  return {
    props: {
      fallback: {
        '/api/guestbook': initialEntries
      }
    }
  };
};
