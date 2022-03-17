import React from 'react';

import {styled}from'~/lib/stitches.config';
import prism from '~/styles/prism';

import Card from '~/components/Card';

const Pre = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card
      css={{
        marginBottom: '32px',
        background: 'unset',

        '@media(max-width: 750px)': {
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          mx: '-50vw',
          borderRadius: '0px'
        },
      }}
    >
      <PreWrapper className={prism}>{children}</PreWrapper>
    </Card>
  );
};

export default Pre;

const PreWrapper = styled('pre', {
  my: '0',
  overflow: 'auto',
  bbr: '$2',
  bc: 'var(--code-snippet-background)',
  fontSize: '$1',
  lineHeight: '26px'
});
