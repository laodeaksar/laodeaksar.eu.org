import { SVGAttributes } from 'react';
import type { IconSize, IconVariant } from './Styles';

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: IconSize;
  variant?: IconVariant;
  outline?: boolean;
}
