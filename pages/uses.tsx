import { Suspense } from 'react';
import type { NextPage } from 'next';
import { motion } from 'framer-motion';

import {
  Box,
  Callout,
  Flex,
  Grid,
  Text,
  H1,
  H2
} from '@laodeaksarr/design-system';

import {
  CategoryIcons,
  GeneralItems,
  SoftwareItems
} from '@/components/screens/uses';
import Link from '@/components/Link';
import Layout from '@/layout';

import { Gear } from '~/lib/types';
import ContentfulGears from '~/lib/contentful';

const Uses: NextPage<{ gearByCategory: Gear }> = ({ gearByCategory }) => {
  const easing = [0.175, 0.85, 0.42, 0.96];

  return (
    <Suspense fallback={null}>
      <Layout
        footer
        header
        title="Uses Page"
        headerProps={{ offsetHeight: 256 }}
      >
        <Grid columns="medium" gapX={4} gapY={12} directAll>
          <Box
            as={motion.div}
            css={{
              marginTop: '3rem',
              marginBottom: '0',

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
              I created a list on hardware, software and equipment I use daily
              to make my life easier.
            </Text>

            {Object?.entries(gearByCategory).map(([category, { items }]) => {
              return (
                <Box
                  css={{
                    position: 'relative',
                    marginTop: 0,
                    marginBottom: '1rem'
                  }}
                  key={category}
                >
                  <Flex css={{ marginBottom: '$3' }}>
                    {(CategoryIcons as any)[category]}
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
                  </Flex>
                  {category === 'Software' ? (
                    <SoftwareItems items={items} />
                  ) : (
                    <GeneralItems items={items} />
                  )}
                </Box>
              );
            })}

            <Callout variant="info">
              <Text
                as="p"
                variant="tertiary"
                size={1}
                css={{ marginBottom: 0 }}
              >
                If you click <strong>Buy</strong> or <strong>the image</strong>{' '}
                you will get redirected to a page where you can buy the product
                using an <strong>affilated link</strong>.
              </Text>

              <Text as="p" variant="tertiary" size={1}>
                An affilate link will not increase your price, but it will get
                me a small commission and helps me out :)
              </Text>
            </Callout>
          </Box>
        </Grid>
      </Layout>
    </Suspense>
  );
};

export default Uses;

export const getStaticProps = async () => {
  const gear = await ContentfulGears.getAll();

  const gearByCategory = gear.reduce(
    (
      accu: { [x: string]: { items: any[] } },
      gearItem: { category: string | number }
    ) => {
      if (accu[gearItem.category]) {
        accu[gearItem.category].items.push(gearItem);
      } else {
        accu[gearItem.category] = {
          items: [gearItem]
        };
      }
      return accu;
    },
    {}
  );

  return {
    props: {
      gearByCategory
    }
  };
};
