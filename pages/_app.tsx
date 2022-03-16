import '~/styles/globals.css';
import '~/styles/font.css';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import RootWrapper from '~/context/ThemeProvider';
import { Head } from '~/components/Seo';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RootWrapper>
      <Head />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </RootWrapper>
  );
};

export default App;
