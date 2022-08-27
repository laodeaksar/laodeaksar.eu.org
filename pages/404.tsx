import type { NextPage } from 'next';

import { Grid, H1, H3, styled } from '@laodeaksarr/design-system';

import Link from '~/components/Link';
import SEO from '~/components/Seo';

const NotFoundPage: NextPage = () => (
  <Grid columns="medium" gapX={4}>
    <SEO title="404: Not found" />
    <Wrapper>
      <div>
        <H1>404 Not Found</H1>

        <H3>
          Oh no! You just got lost 😱! <br />
          Don&apos;t worry I got you!{' '}
          <Link href="/" underline>
            Click here
          </Link>{' '}
          to go back home.
        </H3>
      </div>
    </Wrapper>
  </Grid>
);

export default NotFoundPage;

export const Wrapper = styled('div', {
  margin: '0px auto',
  maxWidth: '1430px',
  display: 'flex',
  height: 'calc(100vh)',
  alignItems: 'center',
  color: 'var(--laodeaksar-colors-typeface-primary)',
  gridColumn: 2
});
