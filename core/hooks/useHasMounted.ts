// Code from: https://www.joshwcomeau.com/snippets/react-hooks/use-has-mounted/
import React from 'react';

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};
