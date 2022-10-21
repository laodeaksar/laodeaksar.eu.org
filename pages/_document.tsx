import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import { getCssText } from '@bahutara/design-system';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            name="robots"
          />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body className="light">
          <script
            key="theme"
            dangerouslySetInnerHTML={{
              __html: `(function () {
                try {
                  var mode = localStorage.getItem('mode')
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true
                  if (!mode && supportDarkMode) document.body.classList.add('dark')
                  if (!mode) return
                  document.body.classList.add(mode)
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
