import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import {
  globalStyles,
  ThemeProvider,
  Tooltip
} from '@laodeaksarr/design-system';

import '~/styles/global.css';
import '~/styles/font.css';

const App = ({ Component, pageProps }: AppProps) => {
  globalStyles();

  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session}>
        <Tooltip.Provider>
          <Component {...pageProps} />
        </Tooltip.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
