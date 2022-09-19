import React from 'react';

export const useOrigin = () => {
  const [origin, setOrigin] = React.useState<string>('');

  React.useEffect(() => {
    setOrigin(location.origin);
  }, []);

  return origin;
};
