import Footer from '~/components/Footer';
import Header from '~/components/Header';

import { Wrapper } from './Styles';
import type { LayoutProps } from './types';

const Layout = (props: LayoutProps) => {
  const { children, header, footer, headerProps } = props;

  return (
    <Wrapper>
      {header && <Header {...headerProps} />}
      {children}
      {footer && <Footer />}
    </Wrapper>
  );
};

export default Layout;
