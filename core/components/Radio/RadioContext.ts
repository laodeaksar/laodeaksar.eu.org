import { createContext } from 'react';

import type { RadioContextType } from './types';

export const RadioContext = createContext<RadioContextType | undefined>(
  undefined
);
