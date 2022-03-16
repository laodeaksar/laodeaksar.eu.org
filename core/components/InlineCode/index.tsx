import { StyledInlineCode } from './Styles';

import type { InlineCodeProps } from './types';

const InlineCode = ({ children }: InlineCodeProps) => (
  <StyledInlineCode>{children}</StyledInlineCode>
);

export default InlineCode;
