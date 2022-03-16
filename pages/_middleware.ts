import { NextFetchEvent, NextResponse, NextRequest } from 'next/server';
import invariant from 'tiny-invariant';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  ev.waitUntil(
    (async () => {
      logPageView(req);
    })()
  );

  return addSecurityHeaders(NextResponse.next());
}

async function logPageView(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    // don't track files like /robots.txt
    PUBLIC_FILE.test(pathname) ||
    // don't track the following paths
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/logos') ||
    // headers added when next/link pre-fetches a route
    // don't track these
    req.headers.get('x-middleware-preflight')
  ) {
    return;
  }

  const body = JSON.stringify({
    origin: req.nextUrl.origin,
    pathname,
    ua: req.ua.ua
    // TODO: add geo tracking later
    // ...req.geo
  });

  if (process.env.NODE_ENV === 'development') {
    return console.log('[Tracking pageview]:', pathname);
  }

  const request = await fetch(process.env.SUPABASE_URL + '/rest/v1/visits', {
    headers: {
      apiKey: process.env.SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    },
    body,
    method: 'POST'
  });

  invariant(request.status === 201, 'Error logging analystics');
}

function addSecurityHeaders(response: NextResponse) {
  const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com *.google-analystics.com *.codesandbox.io *.splitbee.io;
    child-src *.youtube.com *.google.com *.twitter.com *.codesandbox.io *.splitbee.io;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self';
  `;

  response.headers.set(
    'Content-Security-Policy',
    ContentSecurityPolicy.replace(/\n/g, '')
  );
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  return response;
}
