import React from 'react';
import { Box, Flex, Grid, Pill, Text } from '@bahutara/design-system';

import Hero from '@/components/Hero';
import Layout from '@/layout';

import { Snippet } from '~/lib/types';

const SnippetLayout = ({
  children,
  snippet
}: React.PropsWithChildren<{ snippet: Snippet }>) => {
  const { date, title, description, language } = snippet;

  const headerProps = {
    title,
    offsetHeight: 200
  };

  return (
    <Layout
      header
      title={title}
      date={new Date(date).toISOString()}
      description={description}
      headerProps={headerProps}
    >
      <article className="h-entry">
        <Grid columns="medium" gapX={4} directAll>
          <Hero>
            <Hero.Title className="p-name">{title}</Hero.Title>
            <Hero.Info>
              <Flex justifyContent="space-between">
                <Text
                  as="p"
                  size="1"
                  variant="tertiary"
                  weight="3"
                  css={{ marginBottom: 0 }}
                >
                  Created{' '}
                  {new Date(date).toLocaleDateString('en', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                  })}
                </Text>
                <Pill variant="info">{language?.toUpperCase()}</Pill>
              </Flex>
            </Hero.Info>
          </Hero>
          <Box
            css={{
              padding: '20px 0px',
              gridColumn: '2',
              color: 'var(--laodeaksar-colors-typeface-secondary)',

              h2: {
                marginTop: '2em'
              },

              h3: {
                marginTop: '2em'
              }
            }}
          >
            {children}
          </Box>
        </Grid>
      </article>
    </Layout>
  );
};

export default SnippetLayout;
