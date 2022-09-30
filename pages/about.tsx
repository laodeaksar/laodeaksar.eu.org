import React from 'react';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import type { NextPage } from 'next';
import { Box, Grid, Text, H1, Strong, styled } from '@bahutara/design-system';

import Link from '@/components/Link';
import Newsletter from '@/components/Newsletter';
import Image from '@/components/MDX/Image';
import Layout from '@/layout';

import author from '../public/static/images/me.jpg';
import { Post } from '~/lib/types';
import { getClient } from '~/lib/sanity/sanity-server';
import { indexQuery } from '~/lib/sanity/queries';

type Props = {
  postsCount: number;
  initialAge: number;
};

const easing = [0.175, 0.85, 0.42, 0.96];

const titleVariant = {
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.4, ease: easing }
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: easing }
  }
};

const subtitleVariant = {
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
};

const About: NextPage<Props> = ({ postsCount, initialAge }) => {
  const [age, setAge] = React.useState(initialAge);
  const ageInYears = React.useMemo(() => Math.floor(age / 31536000), [age]);
  const mounted = React.useRef<boolean>();

  React.useEffect(() => {
    mounted.current = true;

    const id = setInterval(() => {
      if (mounted.current) {
        setAge(getBirthdayInSecond());
      }
    }, 1000);

    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, []);

  return (
    <Layout
      footer
      header
      title="About Me Page"
      headerProps={{ offsetHeight: 256 }}
    >
      <Grid columns="medium" gapX={4} gapY={12} directAll>
        <LazyMotion features={domAnimation}>
          <Box css={{ position: 'relative', pb: '$10', mx: 'auto' }}>
            <m.div variants={titleVariant}>
              <H1 css={{ marginBottom: '2rem' }}>Aksar La&apos;ode</H1>
            </m.div>
            <Box
              css={{
                '@lg': {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '2rem'
                }
              }}
            >
              <Box
                css={{
                  position: 'relative',
                  marginBottom: '2rem',

                  '@lg': {
                    marginBottom: '0',
                    gridRowStart: '1',
                    gridColumnStart: '2'
                  }
                }}
              >
                <PointsPattern />
                <Box
                  css={{
                    position: 'relative',
                    fontSize: '1rem',
                    mx: 'auto',

                    '@lg': {
                      maxWidth: 'none'
                    }
                  }}
                >
                  <m.figure
                    variants={{
                      exit: {
                        y: 100,
                        opacity: 0,
                        transition: { duration: 0.2, ease: easing }
                      },
                      enter: {
                        y: 0,
                        opacity: 1,
                        transition: { delay: 0.1, duration: 0.5, ease: easing }
                      }
                    }}
                  >
                    <AuthorImage src={author} alt="Me" priority />
                    <figcaption
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        color: 'var(--laodeaksar-colors-typeface-secondary)'
                      }}
                    >
                      <CameraIcon />
                      <Text
                        size={2}
                        css={{
                          flex: 1,
                          marginLeft: '4px',
                          marginBottom: '0px'
                        }}
                      >
                        I should have read the text on the bubble first{' '}
                        <Text aria-label="sweat smiley" role="img">
                          😅
                        </Text>
                      </Text>
                    </figcaption>
                  </m.figure>
                </Box>
              </Box>
              <m.div variants={subtitleVariant}>
                <div>
                  <Text as="p" css={{ marginBottom: '$2' }}>
                    Hey thanks for visiting my blog and wanting to get to know
                    me better!
                  </Text>
                </div>
                <Box
                  css={{
                    mx: 'auto',
                    color: 'var(--laodeaksar-colors-typeface-secondary)',

                    '@lg': {
                      maxWidth: 'none',
                      gridRowStart: '1',
                      gridColumnStart: '1'
                    }
                  }}
                >
                  <Text as="p" css={{ marginBottom: '$2' }}>
                    I am an <Strong aria-live="polite">{age}</Strong> seconds (
                    {ageInYears} years) old Indonesian frontend developer.
                  </Text>
                  <Text as="p" css={{ marginBottom: '$2' }}>
                    My true passion is to create modern websites and webapps
                    with state of the art technology. My prefered framework for
                    creating websites these days, is{' '}
                    <Link underline href="https:reactjs.org/">
                      React
                    </Link>
                    . I started learning React in 2016 and since then I kept
                    learning new tools, concepts and technologies evolving
                    around React.
                  </Text>
                  <Text as="p" css={{ marginBottom: '$2' }}>
                    I started this blog early 2020 and oh boy did I not know
                    what a crazy year this is gonna be. On January 7th I
                    published{' '}
                    <Link href="/hello-world" underline>
                      my very first blog post
                    </Link>{' '}
                    and since then I have written <Strong>{postsCount}</Strong>{' '}
                    articles.
                  </Text>
                  <Text as="p">
                    Besides coding I like to play video games and listening to
                    music. If I like a song, I sometimes learn to play it on my
                    guitar. On rainy days (or even sunny ones haha) I also like
                    watching movies and TV shows on Netflix. I try to do more
                    sports, so I (try to) train at least 3 days a week with{' '}
                    <Link underline href="https://www.freeletics.com/">
                      Freeletics
                    </Link>{' '}
                    workouts or go for a run.
                  </Text>
                </Box>
              </m.div>
            </Box>
            <Newsletter />
          </Box>
        </LazyMotion>
      </Grid>
    </Layout>
  );
};

export default About;

export const getStaticProps = async ({ preview = false }) => {
  const posts = await getClient(preview).fetch<Post[]>(indexQuery);

  return {
    props: {
      postsCount: posts.length,
      initialAge: getBirthdayInSecond()
    }
  };
};

function getBirthdayInSecond() {
  const now = new Date() as any;
  const dob = new Date(1995, 12, 20, 15, 30, 0);

  return Math.round((now - dob.getTime()) / 1000);
}

const Patern = styled('svg', {
  position: 'absolute',
  top: '0',
  right: '-2rem',
  display: 'none',
  marginTop: '-1rem',

  '@lg': {
    display: 'block'
  }
});

const Camera = styled('svg', {
  flex: 'none'
});

const AuthorImage = styled(Image, {
  position: 'absolute',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  objectFit: 'cover',
  objectPosition: 'center',
  size: '$full',
  borderRadius: '$2',
  boxShadow: 'var(--laodeaksar-shadow-2)',

  '@lg': {
    position: 'static',
    height: 'auto'
  }
});

function PointsPattern() {
  return (
    <Patern width="404" height="384" fill="none" viewBox="0 0 404 384">
      <defs>
        <pattern
          id="de316486-4a29-4312-bdfc-fbce2132a2c1"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="4"
            height="4"
            fill="var(--laodeaksar-colors-typeface-tertiary)"
          />
        </pattern>
      </defs>
      <rect
        width="404"
        height="384"
        fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
      />
    </Patern>
  );
}

function CameraIcon() {
  return (
    <Camera
      width="18"
      height="18"
      xmlns="http:www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="var(--laodeaksar-colors-typeface-primary)"
    >
      <path
        fillRule="evenodd"
        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </Camera>
  );
}
