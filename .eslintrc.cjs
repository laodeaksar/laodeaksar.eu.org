module.exports = {
  extends: 'next',
  rules: {
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    // for use in edge api routes
    '@next/next/no-server-import-in-page': 0
  }
};
