export interface Props {
  onClick: () => void;
  isSearchShown?: boolean;
}

import {
  ForwardRefComponent,
  HTMLMotionProps
} from 'framer-motion/types/render/html/types';

export type MainButtonVariant = 'primary' | 'secondary';
export type IconButtonVariant = 'icon';

interface BaseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  as?: ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<'button'>>;
  type?: 'button' | 'reset' | 'submit';
  tracking?: any;
}

interface MainButtonProps extends BaseButtonProps {
  variant: MainButtonVariant;
  icon?: never;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  glow?: boolean;
}

interface IconButtonProps extends BaseButtonProps {
  variant: IconButtonVariant;
  icon?: React.ReactNode | HTMLOrSVGElement;
  glow?: never;
  startIcon?: never;
  endIcon?: never;
}

export type ButtonProps<T> = (MainButtonProps | IconButtonProps) & T;
