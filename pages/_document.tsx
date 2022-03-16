import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { getCssText } from '~/lib/stitches.config';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            type="font/woff2"
            href="/fonts/ibm-plex-sans-var.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <meta
            name="msapplication-config"
            content="/static/favicons/browserconfig.xml"
          />
          <meta
            name="msapplication-TileImage"
            content="/static/favicons/mstile-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href="/static/favicons/favicon.svg"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicons/favicon.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicons/safari-pinned-tab.svg"
            color="#333333"
          />
          <link
            rel="webmention"
            href="https://webmention.io/www.laodeaksar.eu.org/webmention"
          />
          <link
            rel="pingback"
            href="https://webmention.io/www.laodeaksar.eu.org/xmlrpc"
          />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body className="laodeaksar-light">
          <script
            key="laodeaksar-theme"
            dangerouslySetInnerHTML={{
              __html: `(function () {
                try {
                  var mode = localStorage.getItem('mode')
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true
                  if (!mode && supportDarkMode) document.body.classList.add('laodeaksar-dark')
                  if (!mode) return
                  document.body.classList.add('laodeaksar-' + mode)
                } catch (e) {}
              })()`
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
