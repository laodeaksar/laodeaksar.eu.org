import { styled } from '~/lib/stitches.config';

import Link from '~/components/Link';
import Grid from '~/components/Grid';
import SEO from '~/components/Seo';
import { H1, H3 } from '~/components/Typography';

const NotFoundPage = () => (
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
