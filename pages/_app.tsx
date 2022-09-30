import '~/styles/global.css';
import '~/styles/font.css';

import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { globalStyles, ThemeProvider, Tooltip } from '@bahutara/design-system';

const App: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  globalStyles();

  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <Tooltip.Provider>
          <Component {...pageProps} />
        </Tooltip.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
