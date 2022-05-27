const { withContentlayer } = require('next-contentlayer');
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/**
 * @type {import('next').NextConfig}
 */

module.exports = withContentlayer(withPWA({
  swcMinify: true,
  reactStrictMode: true,
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true
  },
  images: {
    domains: [
      'i.scdn.co', // Spotify Album Art
      'pbs.twimg.com', // Twitter Images
      'assets.vercel.com',
      'images.ctfassets.net'
    ],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true
  },
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    mode: "production",
    buildExcludes: [
      /middleware-manifest\.json$/,
      /middleware-runtime\.js$/,
      /middleware-runtime\.js.map$/,
      /middleware\.js$/,
      /middleware\.js.map$/,
    ],
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
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      });
    }
    return config;
  }
}));
