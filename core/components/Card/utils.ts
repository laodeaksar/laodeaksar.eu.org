import { isElementOfType } from '../utils/isElementOfType';
import { CardHeader } from './Styles';

export function isHeaderElement(
  child: React.ReactNode
): child is React.ReactElement<{ children: React.ReactNode }> {
  return isElementOfType(child, CardHeader);
}
