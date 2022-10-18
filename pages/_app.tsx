import '~/styles/global.css';
import '~/styles/font.css';

import React from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { globalStyles, ThemeProvider, Tooltip } from '@bahutara/design-system';
import { GTM_ID, pageview } from '~/lib/gtm';

const App: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  globalStyles();

  const router = useRouter();
  React.useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Tag Manager - Global base code */}
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `
        }}
      />
      <ThemeProvider>
        <SessionProvider session={session}>
          <Tooltip.Provider>
            <Component {...pageProps} />
          </Tooltip.Provider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
