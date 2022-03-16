import { forwardRef } from 'react';

import { getIconString } from './utils';
import { StyledAnchor } from './Styles';
import type { AnchorProps } from '.';

const Anchor = forwardRef(
  (props: AnchorProps, ref: React.Ref<HTMLAnchorElement>) => {
    const { children, href, arrow, underline, favicon, discreet, ...rest } =
      props;

    const icon = getIconString(href, arrow);

    return (
      <StyledAnchor
        css={{ '--icon': `url(${icon})` }}
        arrow={arrow}
        discreet={discreet}
        favicon={favicon}
        href={href}
        underline={underline}
        ref={ref}
        {...rest}
      >
        {children}
      </StyledAnchor>
    );
  }
);

Anchor.displayName = 'Anchor';

export default Anchor;
