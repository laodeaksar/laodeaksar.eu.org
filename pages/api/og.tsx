import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { Flex, Text } from '@bahutara/design-system';

import Logo from '@/components/Logo';

export const config = {
  runtime: 'experimental-edge'
};

const fontIBM = fetch(
  new URL(
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400',
    import.meta.url
  )
).then(res => res.arrayBuffer());

const fontInter = fetch(
  new URL(
    'https://fonts.googleapis.com/css2?family=Inter:wght@800',
    import.meta.url
  )
).then(res => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const ibm = await fontIBM;
    const inter = await fontInter;

    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const hasDate = searchParams.has('date');
    const hasReadTime = searchParams.has('readTime');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : "Aksar La'ode";
    const date = hasDate
      ? searchParams.get('date')
      : new Date().toLocaleDateString();
    const readTime = hasReadTime ? searchParams.get('readTime') : '7 min read';

    return new ImageResponse(
      (
        <Flex
          css={{
            color: query.color,
            padding: 60,
            backgroundImage: `linear-gradient(${query.bgOverlay}, ${query.bgOverlay}), url(${query.bgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <Flex
            alignItems="flex-end"
            justifyContent="space-evenly"
            css={{
              size: '$full'
            }}
          >
            <Flex
              direction="column"
              css={{
                height: '$full',
                flex: '1 0 50%'
              }}
            >
              <Text
                css={{
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 16,
                  fontWeight: 400,
                  opacity: 0.7,
                  mb: 3
                }}
              >
                {date}
                {' — '}
                {readTime}
              </Text>
              <Text
                css={{
                  fontFamily: 'Inter',
                  fontSize: 40,
                  fontWeight: 800,
                  lineHeight: 1.4
                }}
              >
                {title}
              </Text>
              <Text
                css={{
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 16,
                  fontWeight: 400,
                  opacity: 0.7,
                  marginTop: 'auto'
                }}
              >
                {query.domain}
              </Text>
            </Flex>
            <Logo />
          </Flex>
        </Flex>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'IBM Plex Mono',
            data: ibm,
            style: 'normal'
          },
          {
            name: 'Inter',
            data: inter,
            style: 'normal'
          }
        ]
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500
    });
  }
}

const query = {
  color: '#000',
  bgImage:
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  bgOverlay: 'rgba(255,255,255,0.7)',
  domain: 'laodeaksar.eu.org'
};
