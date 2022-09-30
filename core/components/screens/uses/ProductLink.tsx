import React from 'react';
import { Icon } from '@bahutara/design-system';

import Link from '@/components/Link';

export function ProductLink({
  children,
  href
}: React.PropsWithChildren<{ href?: string }>) {
  return (
    <Link
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '700'
      }}
      href={href}
    >
      {children}
      <Icon.External />
    </Link>
  );
}
