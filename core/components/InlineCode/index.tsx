import { StyledInlineCode } from './Styles';

import type { InlineCodeProps } from './types';
import prism from '~/styles/prism';

const InlineCode = ({ children }: InlineCodeProps) => (
  <StyledInlineCode>{children}</StyledInlineCode>
);

export default InlineCode;
