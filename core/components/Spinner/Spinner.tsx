import { SpinnerStyled } from './Styles';
import type { SpinnerProps } from './types';

import VisuallyHidden from '~/components/VisuallyHidden';
import Flex from '~/components/Flex';

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
