import { createOgImage } from '~/lib/OpenGraph';
import type { DefaultSeoProps } from 'next-seo';

const title = `Aksar La'ode`;
const description = `Welcome to my digital garden where I share what I'm learning about shipping great products, becoming a better developer and growing a career in tech.`;
const domain = `laodeaksar.eu.org`;
const twitter = `@ode_aksar`;
const meta = ``;

export const seo: DefaultSeoProps = {
  title: title + ' | ' + meta,
  description,
  openGraph: {
    title,
    type: 'website',
    url: `https://${domain}`,
    site_name: title,
    images: [
      {
        url: createOgImage({ title, meta }),
        width: 1600,
        height: 836,
        alt: title
      }
    ]
  },
  twitter: {
    handle: twitter,
    cardType: 'summary_large_image'
  }
};
