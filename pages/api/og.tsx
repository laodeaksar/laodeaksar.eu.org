import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const date = searchParams.get('date') ?? new Date().toLocaleDateString();
    const readTime = searchParams.get('readingTime') ?? '7 min read';
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : "Aksar La'ode";

    const subtitle = `${date} — ${readTime}`;

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            color: '#000',
            width: '100%',
            height: '100%',
            padding: 60,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '100%',
              width: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                flex: '1 0 50%'
              }}
            >
              <span
                style={{
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 16,
                  fontWeight: 400,
                  opacity: 0.7,
                  marginBottom: 3
                }}
              >
                {subtitle}
              </span>
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: 40,
                  fontWeight: 800,
                  lineHeight: 1.4
                }}
              >
                {title}
              </span>
              <span
                style={{
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 16,
                  fontWeight: 400,
                  opacity: 0.7,
                  marginTop: 'auto'
                }}
              >
                laodeaksar.eu.org
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 595 503"
              xmlSpace="preserve"
              aria-label="Aksar La'ode"
              width={44}
              fill="none"
              stroke="#000"
            >
              <path
                d="M296.6 44.1c46.9 0 85 38.1 85 85v250.5c0 46.9-38.1 85-85 85s-85-38.1-85-85V129.1c0-47 38-85 85-85z"
                strokeMiterlimit={10}
                strokeWidth={30}
              />
              <path
                d="M367.8 152.5 218.5 414.7c-22.4 39.4-74.9 58.2-117.2 42-42.3-16.2-58.4-61.2-36-100.5L214.6 94c22.4-39.4 74.9-58.2 117.2-42s58.4 61.1 36 100.5z"
                strokeMiterlimit={10}
                strokeWidth={40}
              />
              <path
                d="M266.4 52c42.3-16.2 94.8 2.6 117.2 42l149.3 262.2c22.4 39.4 6.3 84.4-36 100.5-42.3 16.2-94.8-2.6-117.2-42L230.3 152.5C207.9 113.1 224 68.1 266.4 52z"
                strokeMiterlimit={10}
                strokeWidth={40}
              />
            </svg>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500
    });
  }
}
