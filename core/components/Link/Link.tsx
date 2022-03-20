import NextLink from 'next/link';

import Anchor from '~/components/Anchor';

const Link = ({ href, children, ...rest }) => {
  if (href.match(/^(http|https):/g)) {
    return (
      <Anchor
        href={href}
        target="_blank"
        rel="noopener 
        noreferer"
        {...rest}
      >
        {children}
      </Anchor>
    );
  }

  return (
    <NextLink href={href} passHref>
      <Anchor {...rest}>{children}</Anchor>
    </NextLink>
  );
};

export default Link;
