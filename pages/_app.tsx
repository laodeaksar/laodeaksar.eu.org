import '~/styles/globals.css';
import '~/styles/font.css';

import { globalStyles, ThemeProvider } from '@laodeaksarr/design-system';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { Head } from '~/components/Seo';

const App = ({ Component, pageProps }: AppProps) => {
  globalStyles();

  return (
    <ThemeProvider>
      <Head />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
