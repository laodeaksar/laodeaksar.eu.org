import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { motion, MotionProps } from 'framer-motion';
import type { NextPage } from 'next';
import {
  Button,
  Box,
  Card,
  Flex,
  Grid,
  H1,
  H2,
  H3,
  Icon,
  styled,
  Text
} from '@bahutara/design-system';

import BlogCard from '@/components/screens/blog';
import Layout from '@/layout';

import { getClient } from '~/lib/sanity/sanity-server';
import { handleArticleClicked } from '~/lib/handleArticleClick';
import { indexQuery } from '~/lib/sanity/queries';
import { Post } from '~/lib/types';

const Newsletter = dynamic(() => import('@/components/Newsletter'));

const WavingHand = () => (
  <Box
    as={motion.div}
    css={{
      marginBottom: '-20px',
      marginRight: '-45px',
      paddingBottom: '20px',
      paddingRight: '45px',
      display: 'inline-block'
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: 7,
      repeatType: 'mirror',
      duration: 0.2,
      delay: 0.5,
      ease: 'easeInOut',
      type: 'tween'
    }}
  >
    👋
  </Box>
);

const IndexPage: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Suspense fallback={null}>
      <Layout footer header headerProps={{ offsetHeight: 256 }}>
        <Grid columns="medium" gapX={4} gapY={12} directAll>
          <Box>
            <H1>
              Hi <WavingHand /> I&apos;m Aksar La&apos;ode, and this is my
              personal blog.
            </H1>
            <Flex gap={4} css={{ mx: '-$3' }}>
              <Link href="/about" passHref>
                <Button variant="secondary" endIcon={<Icon.External />}>
                  About me
                </Button>
              </Link>
              <a
                href="https://twitter.com/ode_aksar"
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={-1}
              >
                <Button variant="secondary" endIcon={<Icon.Twitter />}>
                  @ode_aksar
                </Button>
              </a>
            </Flex>
          </Box>
          <Box as="section">
            <H2>Newsletter</H2>
            <Newsletter large />
          </Box>
          <Box as="section">
            <H2>Featured</H2>
            <Grid as="ul" css={{ mx: 0, padding: 0 }} gapY={4}>
              {posts
                .filter(post => post.featured)
                .slice(0, 3)
                .map(post => {
                  return (
                    <Box
                      as={motion.li}
                      css={{
                        position: 'relative',
                        mx: '-$1',
                        listStyle: 'none',
                        marginBottom: 'calc(1.45rem / 2)',
                        lineHeight: '1.9',
                        letterSpacing: '0.3px'
                      }}
                      key={post.title}
                      initial="initial"
                      whileHover="hover"
                    >
                      <Link
                        href={`/blog/${post.slug}/`}
                        onClick={() => handleArticleClicked(post.slug)}
                        style={{
                          textDecoration: 'none',
                          color: 'var(--laodeaksar-colors-typeface-secondary)'
                        }}
                      >
                        {post.title}
                      </Link>
                      <ButtonCard
                        onClick={() => handleArticleClicked(post.slug)}
                      >
                        <Glow
                          css={{
                            background: post.colorFeatured
                          }}
                          variants={{
                            hover: {
                              opacity: 0.8
                            },
                            initial: {
                              scale: 1.05,
                              opacity: 0
                            }
                          }}
                          transition={{
                            type: 'tween',
                            ease: 'easeOut',
                            duration: 0.4
                          }}
                        />
                        <Overlay />
                        <Card<MotionProps>
                          as={motion.div}
                          variants={{
                            hover: {
                              scale: 1.05
                            },
                            initial: {
                              scale: 1
                            }
                          }}
                          transition={{
                            type: 'tween',
                            ease: 'easeOut',
                            duration: 0.4
                          }}
                          depth={1}
                        >
                          <Card.Body>
                            <H3
                              gradient
                              css={{
                                backgroundImage: post.colorFeatured!,
                                marginBottom: '8px'
                              }}
                            >
                              {post.title}
                            </H3>
                            <Text
                              as="p"
                              variant="tertiary"
                              css={{ marginBottom: 0 }}
                            >
                              {post.description}
                            </Text>
                          </Card.Body>
                        </Card>
                      </ButtonCard>
                    </Box>
                  );
                })}
            </Grid>
          </Box>
          <Box as="section">
            <H2>All articles</H2>
            <BlogCard posts={posts} />
          </Box>
        </Grid>
      </Layout>
    </Suspense>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const posts = await getClient(preview).fetch<Post[]>(indexQuery);

  return {
    props: { posts }
  };
};

export default IndexPage;

const Glow = styled(motion.div, {
  position: 'absolute',
  top: '0',
  left: '0',
  size: '$full',
  WebkitFilter: 'blur(15px)',
  filter: 'blur(15px)',
  borderRadius: '$2'
});

const Overlay = styled(Box, {
  height: '95%',
  width: '105%',
  position: 'absolute',
  borderRadius: '$2',
  top: '50%',
  left: '50%',
  background: 'var(--laodeaksar-colors-body)',
  transform: 'translateY(-50%) translateX(-50%)',
  filter: 'blur(20px)',
  transition: '0.5s',

  '@media(max-width: 700px)': {
    display: 'none'
  }
});

const ButtonCard = styled('button', {
  width: '$full',
  outline: 'none',
  border: '0',
  textAlign: 'left'
});
