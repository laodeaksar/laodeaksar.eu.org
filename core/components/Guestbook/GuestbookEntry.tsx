import { useSWRConfig } from 'swr';
import { guestbook } from '@prisma/client';

import { Box, Flex, Grid, Button, Text } from '@laodeaksarr/design-system';

import { ClickEvent } from '~/lib/types';

type GuestBookEntryProps = {
  entry: guestbook;
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
};

function GuestbookEntry({ entry, user }: GuestBookEntryProps) {
  const { mutate } = useSWRConfig();

  const handleDelete = async (e: ClickEvent) => {
    e.preventDefault();

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
        <time>
          {new Date(entry.updated_at).toLocaleDateString('en', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          })}
        </time>
        {user?.email === entry.email && (
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

export default GuestbookEntry;
