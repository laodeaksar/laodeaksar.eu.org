import NextLink from 'next/link';

import Anchor from '~/components/Anchor';
import type { AnchorProps } from '~/components/Anchor';
import trackEvent from '~/lib/tracking';

type Props = {
  href: any;
  tracking?: any;
  children: React.ReactNode;
} & AnchorProps;

const Link = ({ href, children, tracking, ...rest }: Props) => {
  function handleOutboundLinkClicked() {
    trackEvent({
      event: 'click',
      name: 'Outbound Link',
      value: href,
      type: 'url'
    });
    handleTracking();
  }

  function handleTracking() {
    if (tracking) {
      trackEvent(tracking);
    }
  }

  if (href.match(/^(http|https|mailto):/g)) {
    return (
      <Anchor
        href={href}
        target="_blank"
        rel="noopener noreferer"
        {...rest}
        onClick={handleOutboundLinkClicked}
      >
        {children}
      </Anchor>
    );
  }

  return (
    <NextLink href={href} passHref>
      <Anchor onClick={handleTracking} {...rest}>
        {children}
      </Anchor>
    </NextLink>
  );
};

export default Link;
