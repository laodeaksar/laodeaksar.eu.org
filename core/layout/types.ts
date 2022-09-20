import React from 'react';
import type { HeaderProps } from '@/components/Header';

export interface LayoutProps {
  children?: React.ReactNode;
  footer?: boolean;
  header?: boolean;
  headerProps?: HeaderProps;
  title?: string;
  description?: string;
  imageUrl?: string;
  type?: 'article';
  date?: string;
}
