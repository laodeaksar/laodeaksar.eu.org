import type { PropsWithChildren } from 'react';
import { Box } from '@bahutara/design-system';

import { StyledGlow } from './Styles';

const Glow = (props: PropsWithChildren) => {
  const { children, ...rest } = props;

  return (
    <Box
      {...rest}
      css={{
        position: 'relative',
        maxWidth: '$max'
      }}
    >
      <StyledGlow />
      {children}
    </Box>
  );
};

export default Glow;
