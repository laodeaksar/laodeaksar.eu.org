import { AlertIcon, InfoIcon } from '~/components/Icons';

import type { CalloutVariant } from './types';

export const getVariantIcon = (variant: CalloutVariant): React.ReactNode => {
  switch (variant) {
    case 'info':
      return <InfoIcon size={5} />;
    case 'danger':
      return <AlertIcon size={5} />;
  }
};
