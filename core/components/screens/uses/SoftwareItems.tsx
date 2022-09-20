import React from 'react';
import { motion } from 'framer-motion';
import { Box, Flex, Grid, H2 } from '@laodeaksarr/design-system';

import Link from '@/components/Link';

import { Gear } from '~/lib/types';

import { Img } from './styles';
import { ProductLink } from './ProductLink';

export function SoftwareItems({ items }: { items: Gear[] }) {
  return (
    <Grid as="ul" gap={6} css={{ margin: 0, padding: 0 }}>
      {items?.map(({ id, description, title, image, link }) => {
        return (
          <Box
            as={motion.li}
            css={{
              listStyle: 'none'
            }}
            key={id}
            initial="initial"
            whileHover="hover"
          >
            <Flex
              gap={6}
              direction={{
                '@initial': 'column',
                '@md': 'row'
              }}
              alignItems="start"
              css={{
                marginTop: 0,
                marginBottom: '1rem',

                '@md': {
                  my: '0px',
                  marginRight: '0'
                }
              }}
            >
              <Link href={link}>
                <Flex
                  justifyContent="center"
                  alignItems="start"
                  css={{
                    position: 'relative',
                    flex: 'none',
                    padding: '1rem',
                    borderRadius: '6px',
                    bc: 'var(--laodeaksar-colors-foreground)',
                    size: '6rem',

                    '&:hover': {
                      bc: 'var(--laodeaksar-colors-emphasis)'
                    }
                  }}
                >
                  <Img src={image?.url} alt={image?.title} layout="fill" />
                </Flex>
              </Link>
              <Box css={{ marginTop: 0, marginBottom: '1rem' }}>
                <H2 css={{ marginBottom: 0 }}>{title}</H2>
                <Box
                  css={{
                    paddingBottom: '20px',
                    gridColumn: '2',
                    color: 'var(--laodeaksar-colors-typeface-secondary)',

                    h3: {
                      marginTop: '2em'
                    },

                    section: {
                      marginTop: '5em'
                    },

                    p: {
                      fontSize: '$4',
                      fontWeight: '$2',
                      letterSpacing: '0.3px',
                      lineHeight: 1.9
                    },

                    a: {
                      fontWeight: '$3',
                      fontSize: '$4',
                      color: 'var(--laodeaksar-colors-brand)'
                    },

                    ul: {
                      paddingLeft: '$3',
                      fontSize: '$4',
                      fontWeight: '$2',
                      listStyle: 'disc outside none',

                      li: {
                        my: '$3'
                      }
                    }
                  }}
                >
                  {description}
                </Box>
                <ProductLink href={link}>Homepage</ProductLink>
              </Box>
            </Flex>
          </Box>
        );
      })}
    </Grid>
  );
}
