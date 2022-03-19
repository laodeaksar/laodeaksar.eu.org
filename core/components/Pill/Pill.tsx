import { useTheme } from '~/context/ThemeContext';

import { StyledPill } from './Styles';
import type { PillProps } from './types';

const Pill = (props: PillProps) => {
  const { dark } = useTheme();
  const { children, variant } = props;

  return (
    <StyledPill dark={dark} variant={variant} {...props}>
      {children}
    </StyledPill>
  );
};

export default Pill;
