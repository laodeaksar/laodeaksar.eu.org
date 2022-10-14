import dynamic from 'next/dynamic';

// import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { Wrapper } from './Styles';
import type { LayoutProps } from './types';
import Meta from './Meta';

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
  suspense: true
});

const Layout = (props: LayoutProps) => {
  const { children, header, footer, headerProps, ...rest } = props;

  return (
    <Wrapper>
      <Meta {...rest} />
      {header && <Header {...headerProps} />}
      {children}
      {footer && <Footer />}
    </Wrapper>
  );
};

export default Layout;
