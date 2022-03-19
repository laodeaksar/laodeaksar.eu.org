import { signIn, useSession } from 'next-auth/react';
import useSWR, { useSWRConfig } from 'swr';
import toast, { Toaster } from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';

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

  const handleDelete = async () => {
    await fetch(`/api/guestbook/${entry.id}`, {
      method: 'DELETE'
    });
    await mutate('/api/guestbook');
  };

  return (
    <Card css={{ marginTop: '$4' }}>
      <Card.Header css={{ fontSize: '$3' }}>{entry.created_by}</Card.Header>
      <Card.Body>
        <Flex>{entry.body}</Flex>
        <Grid gapX={2} flow="column" align="center" justify="start" mt={3}>
          {/* <Text as="p" css={{ marginBottom: 0 }}></Text> */}
          {/* <span>&bull;</span> */}
          <time dateTime={entry.updated_at}>
            {new Date(entry.updated_at).toLocaleDateString('en', {
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            })}
          </time>
          {user && entry.created_by === user.name && (
            <>
              <span>&bull;</span>
              <Button variant="primary" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Grid>
      </Card.Body>
    </Card>
  );
}

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

export default function Guestbook({ fallbackData }) {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const { data: entries } = useSWR('/api/guestbook', fetcher, {
    fallbackData
  });

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
          )}
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
