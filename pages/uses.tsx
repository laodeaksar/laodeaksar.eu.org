import Image from 'next/image';
import { motion } from 'framer-motion';

import Anchor from '~/components/Anchor';
import Box from '~/components/Box';
import Button from '~/components/Button';
import Grid from '~/components/Grid';
import Flex from '~/components/Flex';
import SEO from '~/components/Seo';
import Link from '~/components/Link';
import Text, { H1, H2, H3 } from '~/components/Typography';

import { Shadows, styled } from '~/lib/stitches.config';

import Layout from '~/layout';

import { allGears } from 'contentlayer/generated';
import Callout from '~/components/Callout';

const Svg = styled('svg', {
  marginRight: '0.5rem',
  width: '2rem',
  height: '2rem'
});

const Img = styled(Image, {
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '6px'
});

const CategoryIcons = {
  Hardware: (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    </Svg>
  ),
  Software: (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </Svg>
  ),
  Office: (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </Svg>
  ),
  Lifestyle: (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </Svg>
  )
};

const Uses = ({ gearByCategory }) => {
  const easing = [0.175, 0.85, 0.42, 0.96];

  return (
    <Layout footer header headerProps={{ offsetHeight: 256 }}>
      <SEO title="Uses Page" />
      <Grid columns="medium" gapX={4} gapY={12} all>
        <Box
          as={motion.div}
          css={{
            marginTop: 'calc(3rem * calc(1 - 0))',
            marginBottom: 'calc(3rem * 0)',

            '@md': {
              px: '1rem'
            }
          }}
          variants={{
            exit: {
              x: 150,
              opacity: 0,
              transition: { duration: 0.4, ease: easing }
            },
            enter: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.5, ease: easing }
            }
          }}
        >
          <H1>My Gear</H1>
          <Text as="p" css={{ fontSize: '1.125rem' }}>
            Inspired by{' '}
            <Link underline href="https://uses.tech/">
              many others
            </Link>{' '}
            I created a list on hardware, software and equipment I use daily to
            make my life easier.
          </Text>

          {Object?.entries(gearByCategory).map(([category, { items }]: any) => {
            return (
              <Box
                css={{
                  position: 'relative',
                  marginTop: 0,
                  marginBottom: '1rem'
                }}
                key={category}
              >
                <Box
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '$3'
                  }}
                >
                  {CategoryIcons[category]}
                  <H2
                    css={{
                      fontSize: '1.875rem',
                      margin: 0,
                      padding: 0,
                      transform: 'translateY(3.5px)'
                    }}
                  >
                    {category}
                  </H2>
                </Box>
                {category === 'Software' ? (
                  <SoftwareItems items={items} />
                ) : (
                  <GeneralItems items={items} />
                )}
              </Box>
            );
          })}

          <Callout variant="info">
            <Text as="p" variant="tertiary" size={1} css={{ marginBottom: 0 }}>
              If you click <strong>Buy</strong> or <strong>the image</strong>{' '}
              you will get redirected to a page where you can buy the product
              using an <strong>affilated link</strong>.
            </Text>

            <Text as="p" variant="tertiary" size={1}>
              An affilate link will not increase your price, but it will get me
              a small commission and helps me out :)
            </Text>
          </Callout>
        </Box>
      </Grid>
    </Layout>
  );
};

export default Uses;

export async function getStaticProps() {
  const gear = allGears;

  const gearByCategory = gear?.reduce((accu, gearItem) => {
    if (accu[gearItem.category]) {
      accu[gearItem.category].items.push(gearItem);
    } else {
      accu[gearItem.category] = {
        items: [gearItem]
      };
    }
    return accu;
  }, {});

  return {
    props: { gearByCategory }
  };
}

function ProductLink({ children, to }) {
  return (
    <Anchor
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '700'
      }}
      href={to}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </Anchor>
  );
}

function GeneralItems({ items }) {
  return (
    <Grid as="ul" gapY={3} css={{ margin: 0, padding: 0 }}>
      {items.map(
        ({
          id,
          title,
          image,
          link,
          affiliateLink,
          affiliateLinkText,
          body
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
                  full
                  css={{
                    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                    alignItems: 'start',

                    '@lg': {
                      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                      columnGap: '2rem',
                      rowGap: '1rem'
                    }
                  }}
                >
                  <Anchor href={affiliateLink || link}>
                    <Flex
                      gap={6}
                      alignItems="center"
                      justifyContent="center"
                      css={{
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '1rem',
                        borderRadius: '6px',
                        bc: 'var(--laodeaksar-colors-foreground)',
                        transition: 'background-color 0.3s',
                        height: '$full',

                        '&:hover': {
                          bc: 'var(--laodeaksar-colors-secondary)'
                        }
                      }}
                    >
                      <Img src={image?.url} alt={image?.title} layout="fill" />
                      <Box
                        css={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          right: '0',
                          transition: 'transform 0.3s',
                          transform: 'translateY(100%)',
                          bc: 'var(--laodeaksar-colors-foreground)',
                          boxShadow: Shadows[1],

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
                      </Box>
                    </Flex>
                  </Anchor>
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
                    <H3 css={{ marginBottom: 0 }}>{title}</H3>
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

                        '> p': {
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
                          listStyle: '→ inside none'
                        }
                      }}
                      dangerouslySetInnerHTML={{ __html: body.html }}
                    />
                    {link && (
                      <ProductLink to={link}>Product Details</ProductLink>
                    )}
                    {affiliateLink && (
                      <Flex
                        alignItems="flex-end"
                        css={{
                          flex: '1',
                          maxWidth: '24rem'
                        }}
                      >
                        <Anchor href={affiliateLink}>
                          <Button
                            variant="primary"
                            css={{ width: '$full', px: '2rem' }}
                          >
                            {affiliateLinkText || 'Buy'}
                          </Button>
                        </Anchor>
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

function SoftwareItems({ items }) {
  return (
    <Grid as="ul" gap={6} css={{ margin: 0, padding: 0 }}>
      {items?.map(({ id, title, image, link, body }) => {
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
              full
              css={{
                marginTop: 0,
                marginBottom: '1rem',

                '@md': {
                  my: '0px',
                  marginRight: '0'
                }
              }}
            >
              <Anchor href={link}>
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
                      bc: 'var(--laodeaksar-colors-foreground)'
                    }
                  }}
                >
                  <Img src={image?.url} alt={image?.title} layout="fill" />
                </Flex>
              </Anchor>
              <Box
                full
                css={{
                  marginTop: 0,
                  marginBottom: '1rem'
                }}
              >
                <H3 css={{ marginBottom: 0 }}>{title}</H3>
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

                    '> p': {
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
                      listStyle: '→ inside none'
                    }
                  }}
                  dangerouslySetInnerHTML={{ __html: body.html }}
                />
                <ProductLink to={link}>Homepage</ProductLink>
              </Box>
            </Flex>
          </Box>
        );
      })}
    </Grid>
  );
}
