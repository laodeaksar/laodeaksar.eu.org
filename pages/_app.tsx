import '~/styles/global.css';
import '~/styles/font.css';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import {
  globalStyles,
  ThemeProvider,
  Tooltip
} from '@laodeaksarr/design-system';

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
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
