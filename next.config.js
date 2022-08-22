const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/**
 * @type {import('next').NextConfig}
 */

module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co', // Spotify Album Art
      'pbs.twimg.com', // Twitter Images
      'assets.vercel.com',
      'images.ctfassets.net',
      'cdn.sanity.io'
    ],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    images: { allowFutureImage: true }
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    mode: 'production',
    buildExcludes: [
      /middleware-manifest\.json$/,
      /middleware-runtime\.js$/,
      /middleware-runtime\.js.map$/,
      /middleware\.js$/,
      /middleware\.js.map$/
    ]
  },
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js'
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug'
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  }
});

// https://nextjs.org/docs/advanced-features/security-headers
const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com *.google-analystics.com *.codesandbox.io *.splitbee.io;
    child-src *.youtube.com *.google.com *.twitter.com *.codesandbox.io *.splitbee.io;
    style-src 'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com;
    img-src 'self' data: https: blob: https://www.googletagmanager.com;
    worker-src 'self' *.youtube.com *.google.com *.twitter.com;
    connect-src *;
    object-src 'none';
    form-action 'self';
    frame-ancestors 'none';
    base-uri 'none';
    media-src 'none';
    font-src 'self';
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, '')
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];
