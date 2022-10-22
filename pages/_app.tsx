import '~/styles/global.css';

import React from 'react';
import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { IBM_Plex_Sans /*, Fira_Code*/ } from '@next/font/google';

import { globalStyles, ThemeProvider, Tooltip } from '@bahutara/design-system';

const normal = IBM_Plex_Sans({
  variant: '400'
});

/*const code = Fira_Code({
  variant: '400'
});*/

const App: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  globalStyles();

  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <Tooltip.Provider>
          <main className={normal.className}>
            <Component {...pageProps} />
          </main>
        </Tooltip.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
