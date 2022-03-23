import Box from '~/components/Box';
import Button from '~/components/Button';
import Card from '~/components/Card';
import Flex from '~/components/Flex';
import Grid from '~/components/Grid';
import Text from '~/components/Typography';

export default function test() {
  return (
    <Card css={{ marginTop: '$4' }}>
      <Card.Header css={{ fontSize: '$3' }}>All Message</Card.Header>
      <Card.Body>
        <Box
          css={{
            '&:not(:last-child)': {
              paddingBottom: '2rem',
              marginBottom: '2rem',
              borderBottom: '2px solid currentColor'
            }
          }}
        >
          <Text
            size={5}
            weight={3}
            css={{
              marginBottom: 2
            }}
            as="p"
          >
            Lorem, ipsum dolor.
          </Text>
          <Flex>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
            expedita impedit debitis odit, enim harum soluta libero optio
            tempore at repellat reprehenderit numquam, qui voluptas fugit ab.
            Nobis ratione autem quos, minima quasi sit ducimus illo iste
            doloribus architecto minus quas voluptates beatae earum ipsa
            mollitia expedita eligendi alias velit provident officia aperiam!
            Dolor porro distinctio corrupti, eius impedit commodi?
          </Flex>
          <Grid gapX={2} flow="column" align="center" justify="start" mt={3}>
            <time dateTime="20/12/1995">
              {new Date('20/12/1995').toLocaleDateString('en', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
            </time>
            <>
              <span>&bull;</span>
              <Button
                css={{
                  $$background: 'transparent',
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
                onClick={() => {}}
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
            </>
          </Grid>
        </Box>

        <Box
          css={{
            '&:not(:last-child)': {
              paddingBottom: '2rem',
              marginBottom: '2rem',
              borderBottom: '2px solid currentColor'
            }
          }}
        >
          <Text
            size={5}
            weight={3}
            css={{
              marginBottom: 2
            }}
            as="p"
          >
            Lorem, ipsum dolor.
          </Text>
          <Flex>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
            expedita impedit debitis odit, enim harum soluta libero optio
            tempore at repellat reprehenderit numquam, qui voluptas fugit ab.
            Nobis ratione autem quos, minima quasi sit ducimus illo iste
            doloribus architecto minus quas voluptates beatae earum ipsa
            mollitia expedita eligendi alias velit provident officia aperiam!
            Dolor porro distinctio corrupti, eius impedit commodi?
          </Flex>
          <Grid gapX={2} flow="column" align="center" justify="start" mt={3}>
            <time dateTime="20/12/1995">
              {new Date('20/12/1995').toLocaleDateString('en', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
            </time>
            <>
              <span>&bull;</span>
              <Button
                css={{
                  $$background: 'transparent',
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
                onClick={() => {}}
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
            </>
          </Grid>
        </Box>
      </Card.Body>
    </Card>
  );
}
