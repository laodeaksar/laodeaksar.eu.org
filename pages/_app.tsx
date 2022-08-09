import '~/styles/globals.css';
import '~/styles/font.css';

import {
  globalStyles,
  ThemeProvider,
  Tooltip
} from '@laodeaksarr/design-system';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { Head } from '~/components/Seo';

const App = ({ Component, pageProps }: AppProps) => {
  globalStyles();

  return (
    <ThemeProvider>
      <Head />
      <SessionProvider session={pageProps.session}>
        <Tooltip.Provider>
          <Component {...pageProps} />
        </Tooltip.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
