import React from 'react';
import { motion } from 'framer-motion';
import { Box, Flex, Grid, Text, H2, Shadows } from '@laodeaksarr/design-system';
import Link from '~/theme/components/Link';
import { Gear } from '~/lib/types';
import { Img, ProductLink } from './uses';

export function GeneralItems({ items }: { items: Gear[] }) {
  return (
    <Grid as="ul" gapY={3} css={{ margin: 0, padding: 0 }}>
      {items.map(
        ({
          id,
          description,
          title,
          image,
          link,
          affiliateLink,
          affiliateLinkText
        }) => {
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
              <Box
                full
                css={{
                  marginTop: 0,
                  marginBottom: '1rem'
                }}
              >
                <Grid
                  gapY={6}
                  align="start"
                  flow={{
                    '@initial': 'row',
                    '@lg': 'column'
                  }}
                  css={{
                    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

                    '@lg': {
                      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                      columnGap: '2rem',
                      rowGap: '1rem'
                    }
                  }}
                >
                  <Link
                    href={affiliateLink || link}
                    tracking={{
                      event: 'click',
                      name: 'Affiliate Link',
                      value: affiliateLink
                    }}
                  >
                    <Flex
                      gap={6}
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                      css={{
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '1rem',
                        borderRadius: '6px',
                        bc: 'var(--laodeaksar-colors-foreground)',
                        transition: 'background-color 0.3s',
                        height: '$full',

                        '&:hover': {
                          bc: 'var(--laodeaksar-colors-emphasis)'
                        }
                      }}
                    >
                      <Img src={image?.url} alt={image?.title} layout="fill" />
                      <Flex
                        justifyContent="center"
                        css={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          right: '0',
                          transition: 'transform 0.3s',
                          transform: 'translateY(100%)',
                          bc: 'var(--laodeaksar-colors-foreground)',
                          boxShadow: `${Shadows[1]}`,
                          width: '$full',

                          '&:hover': {
                            transform: 'translateY(0)'
                          }
                        }}
                      >
                        <Text as="p" size={1} css={{ padding: '1rem 0.5rem' }}>
                          {affiliateLink
                            ? 'Clicking will redirect using the affiliate link'
                            : 'Clicking will redirect to product page'}
                        </Text>
                      </Flex>
                    </Flex>
                  </Link>
                  <Flex
                    direction="column"
                    alignItems="start"
                    css={{
                      marginTop: '0',
                      marginBottom: '1rem',

                      '@lg': {
                        gridColumn: 'span 2 / span 2'
                      }
                    }}
                  >
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
                          fontSize: '$4'
                        },

                        ul: {
                          margin: 0,
                          padding: 0,
                          fontSize: '$4',
                          fontWeight: '$2',
                          listStyle: 'disc inside none',

                          li: {
                            my: '$3'
                          }
                        }
                      }}
                    >
                      {description}
                    </Box>
                    {link && (
                      <ProductLink href={link}>Product Details</ProductLink>
                    )}
                    {affiliateLink && (
                      <Flex
                        alignItems="flex-end"
                        css={{
                          flex: '1',
                          maxWidth: '20rem'
                        }}
                      >
                        <Link
                          css={{
                            textAlign: 'center',
                            background: 'var(--laodeaksar-colors-brand)',
                            color: 'var(--laodeaksar-colors-body)',
                            width: '$max',
                            padding: '$3 $8',
                            borderRadius: '$1'
                          }}
                          href={affiliateLink}
                          tracking={{
                            event: 'click',
                            name: 'Affiliate Link',
                            value: affiliateLink
                          }}
                        >
                          {affiliateLinkText || 'Buy'}
                        </Link>
                      </Flex>
                    )}
                  </Flex>
                </Grid>
              </Box>
            </Box>
          );
        }
      )}
    </Grid>
  );
}
