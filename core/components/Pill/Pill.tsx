import { useTheme } from '~/context/ThemeContext';

import { StyledPill } from './Styles';
import type { PillProps } from './types';

const Pill = (props: PillProps) => {
  const theme = useTheme();
  const { children, variant } = props;

  return (
    <StyledPill dark={theme.dark} variant={variant} {...props}>
      {children}
    </StyledPill>
  );
};

export default Pill;
