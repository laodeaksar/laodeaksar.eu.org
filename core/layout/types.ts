import type { HeaderProps } from '~/components/Header';

export interface LayoutProps {
  children?:React.ReactNode;
  footer?: boolean;
  header?: boolean;
  headerProps?: HeaderProps;
}
