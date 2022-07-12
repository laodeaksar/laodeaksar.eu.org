import { SpinnerStyled } from './Styles';
import type { SpinnerProps } from './types';

import { Flex, VisuallyHidden } from '@laodeaksarr/design-system';

const Spinner = (props: SpinnerProps) => {
  const { label = 'Loading...' } = props;
  return (
    <Flex gap={2}>
      <SpinnerStyled {...props}>
        {label && <VisuallyHidden as="p">{label}</VisuallyHidden>}
      </SpinnerStyled>
    </Flex>
  );
};

export default Spinner;
