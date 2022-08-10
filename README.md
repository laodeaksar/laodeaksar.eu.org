[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Flaodeaksar%2Flaodeaksar.eu.org)

// [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://aksarlaode-laodeaksareu-ipzz6ugdb66.ws-us59.gitpod.io/)

# laodeaksar.eu.org

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PlanetScale](https://planetscale.com)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Content**: [MDX](https://github.com/mdx-js/mdx)/[contentlayer]()
- **Styling**: [Stitches](https://stitches.dev/) by [Design System]()

## Overview

- `data/*` - MDX data that is used for blogs, newsletters, and code snippets.
- `layouts/*` - The different page layouts each MDX category (blog, newsletter, snippets) uses.
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction) powering [`/dashboard`](https://laodeaksar.eu.org/dashboard), newsletter subscription, guestbook, and post views.
- `pages/blog/*` - Static pre-rendered blog pages using MDX.
- `pages/dashboard` - [Personal dashboard](https://laodeaksar.eu.org/dashboard) tracking metrics.
- `pages/*` - All other static pages.
- `prisma/*` - My Prisma schema, which uses a PlanetScale MySQL database.
- `public/*` - Static assets including fonts and images.
- `scripts/*` - Three useful scripts to generate an cache, RSS feed and a sitemap.
- `styles/*` - A small amount of font and global styles. I'm mostly using vanilla CSS.

## Running Locally

```bash
$ git clone https://github.com/laodeaksarr/laodeaksar.eu.org.git
$ cd laodeaksar.eu.org
$ yarn
$ yarn dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/laodeaksarr/laodeaksar.eu.org/blob/main/.env.example).
