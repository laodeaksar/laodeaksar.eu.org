import { useEffect, useState } from 'react';
import { Flex, Grid, Text } from '@laodeaksarr/design-system';

const initialCounts = {
  count: 0,
  type: {
    like: 0,
    mention: 0,
    reply: 0,
    repost: 0
  }
};

const fetchCounts = async (target: string) =>
  fetch('https://webmention.io/api/count.json?target=' + target).then(
    (response) => (response.json ? response.json() : response)
  );

const WebmentionCount = ({ target }: { target: string }) => {
  const [counts, setCounts] = useState(initialCounts);

  useEffect(() => {
    async function getCounts() {
      const responseCounts = await fetchCounts(target);
      setCounts(responseCounts);
    }

    getCounts();
  }, [target]);

  return (
    <Flex>
      {counts === undefined && <p>Failed to load counts 😞</p>}
      {counts && (
        <Grid gapX={2} flow="column" align="center">
          <Text
            as="p"
            size="1"
            weight="3"
            variant="info"
            css={{ marginBottom: 0 }}
          >
            {new Number(counts.type.like).toLocaleString() || 0}
            {' Likes'}
          </Text>
          <span>&bull;</span>
          <Text
            as="p"
            size="1"
            weight="3"
            variant="info"
            css={{ marginBottom: 0 }}
          >
            {new Number(counts.type.reply).toLocaleString() || 0}
            {' Replies'}
          </Text>
          <span>&bull;</span>
          <Text
            as="p"
            size="1"
            weight="3"
            variant="info"
            css={{ marginBottom: 0 }}
          >
            {new Number(
              (counts.type.repost || 0) + counts.type.mention || 0
            ).toLocaleString() || 0}
            {' Mentions'}
          </Text>
        </Grid>
      )}
    </Flex>
  );
};

export default WebmentionCount;
