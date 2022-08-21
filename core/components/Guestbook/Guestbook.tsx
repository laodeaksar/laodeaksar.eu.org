import { Suspense } from 'react';
import useSWR from 'swr';
import { guestbook } from '@prisma/client';
import { signOut, useSession } from 'next-auth/react';

import { Button, Card, Text } from '@laodeaksarr/design-system';

import fetcher from '~/lib/fetcher';
import GuestbookBody from './GuestbookBody';
import GuestbookEntry from './GuestbookEntry';

const Guestbook = ({ fallbackData }: { fallbackData: guestbook[] }) => {
  const { data: entries } = useSWR<guestbook[]>('/api/guestbook', fetcher, {
    fallbackData
  });
  const { data: session, status } = useSession();

  return (
    <>
      <Card>
        <Card.Header css={{ fontSize: '$5' }}>Sign the Guestbook</Card.Header>
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
          <GuestbookBody status={status} />
        </Card.Body>
      </Card>
      <Card css={{ marginTop: '$4' }}>
        <Card.Header css={{ fontSize: '$3' }}>
          All Message
          {session && (
            <Button
              css={{
                my: 4,
                $$background: 'transparent !important'
              }}
              variant="icon"
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
          <Suspense>
            {entries &&
              entries.map((entry) => (
                <GuestbookEntry
                  key={entry.id.toString()}
                  entry={entry}
                  user={session?.user}
                />
              ))}
          </Suspense>
        </Card.Body>
      </Card>
    </>
  );
};

export default Guestbook;
