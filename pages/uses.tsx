import Image from 'next/image';
import { motion } from 'framer-motion';

import Anchor from '~/components/Anchor';
import Box from '~/components/Box';
import Button from '~/components/Button';
import Grid from '~/components/Grid';
import Flex from '~/components/Flex';
import SEO from '~/components/Seo';
import MDXComponents from '~/components/MDX/MDXComponents';
import Text, { H1, H2, H3, Strong } from '~/components/Typography';

import ContentfulGears from '~/lib/contentful';
import { css, Shadows } from '~/lib/stitches.config';

import Layout from '~/layout';

const styles = {
  svgStyle: css({
    marginRight: '0.5rem',
    width: '2rem',
    height: '2rem'
  })(),
  imageStyle: css({
    display: 'flex',
    justifyContent: 'center'
  })()
};

const CategoryIcons = {
  Hardware: (
    <svg
      className={styles.svgStyle}
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
    </svg>
  ),
  Software: (
    <svg
      className={styles.svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  Office: (
    <svg
      className={styles.svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  Lifestyle: (
    <svg
      className={styles.svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
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
            Inspired by <a href="https://uses.tech/">many others</a> I created a
            list on hardware, software and equipment I use daily to make my life
            easier.
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
                <H2
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.875rem'
                  }}
                >
                  {CategoryIcons[category]}
                  {category}
                </H2>
                {category === 'Software' ? (
                  <SoftwareItems items={items} />
                ) : (
                  <GeneralItems items={items} />
                )}
              </Box>
            );
          })}

          <Box
            css={{
              padding: '1rem',
              color: 'var(--laodeaksar-colors-brand)',
              borderRadius: '6px'
            }}
          >
            <Flex>
              <Box css={{ flexShrink: 0 }}>
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </Box>
              <Box
                css={{
                  marginLeft: '12px',
                  marginTop: 0,
                  marginBottom: '1rem'
                }}
              >
                <Text
                  as="p"
                  variant="tertiary"
                  size={1}
                  css={{ marginBottom: 0 }}
                >
                  If you click <Strong>Buy</Strong> or{' '}
                  <Strong>the image</Strong> you will get redirected to a page
                  where you can buy the product using an{' '}
                  <Strong>affilated link</Strong>.
                </Text>

                <Text as="p" size={1}>
                  An affilate link will not increase your price, but it will get
                  me a small commission and helps me out :)
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Layout>
  );
};

export default Uses;

export async function getStaticProps() {
  const gear = await ContentfulGears.getAll();
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
    <Grid as="ul" gapY="3">
      {items.map(
        ({
          id,
          title,
          description,
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
                css={{
                  marginTop: 0,
                  marginBottom: '1rem'
                }}
              >
                <Grid
                  gapY={6}
                  css={{
                    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

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
                      alignItems="start"
                      justifyContent="center"
                      css={{
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '1rem',
                        size: '6rem',
                        borderRadius: '6px',
                        bc: 'var(--laodeaksar-colors-foreground)',
                        transition: 'background-color 0.3s',
                        height: '$full',

                        '&:hover': {
                          bc: 'var(--laodeaksar-colors-secondary)'
                        }
                      }}
                    >
                      <Image
                        className={styles.imageStyle}
                        src={image?.url}
                        alt={image?.title}
                        layout="fill"
                      />
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
                        padding: '20px 0px',
                        gridColumn: '2',
                        color: 'var(--laodeaksar-colors-typeface-secondary)',

                        h3: {
                          marginTop: '2em'
                        },

                        section: {
                          marginTop: '5em'
                        }
                      }}
                    >
                      {description}
                    </Box>
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
                        <Anchor href="affiliateLink">
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
      {items?.map(({ id, title, description, image, link }) => {
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
              direction={{ '@initial': 'column', '@md': 'row' }}
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
                  <Image
                    className={styles.imageStyle}
                    src={image?.url}
                    alt={image?.title}
                    layout="fill"
                  />
                </Flex>
              </Anchor>
              <Box
                css={{
                  marginTop: 0,
                  marginBottom: '1rem'
                }}
              >
                <H3 css={{ marginBottom: 0 }}>{title}</H3>
                <Box
                  css={{
                    padding: '20px 0px',
                    gridColumn: '2',
                    color: 'var(--laodeaksar-colors-typeface-secondary)',

                    h3: {
                      marginTop: '2em'
                    },

                    section: {
                      marginTop: '5em'
                    }
                  }}
                >
                  {description}
                </Box>
                <ProductLink to={link}>Homepage</ProductLink>
              </Box>
            </Flex>
          </Box>
        );
      })}
    </Grid>
  );
}
