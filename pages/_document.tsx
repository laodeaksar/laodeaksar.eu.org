import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';
import postCss, { AcceptedPlugin } from 'postcss';
import postCssPresetEnv from 'postcss-preset-env';

import { getCssText } from '~/lib/stitches.config';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const cssText = getCssText();
    const { css } = await postCss([
      postCssPresetEnv() as AcceptedPlugin,
    ]).process(cssText);
    const initialProps = await NextDocument.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="stitches" dangerouslySetInnerHTML={{ __html: css }} />
        </>
      ),
    };
  }

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
          <link
            rel="webmention"
            href="https://webmention.io/www.laodeaksar.eu.org/webmention"
          />
          <link
            rel="pingback"
            href="https://webmention.io/www.laodeaksar.eu.org/xmlrpc"
          />
          {/*<style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />*/}
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
