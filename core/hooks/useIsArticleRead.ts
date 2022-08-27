import React from 'react';

const useIsArticleRead = (slug: string) => {
  const [hasPageHydrated, setHasPageHydrated] = React.useState(false);
  const [hasRead, setHasRead] = React.useState(true);

  React.useEffect(() => {
    setHasPageHydrated(true);
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialState =
        JSON.parse(localStorage.getItem(slug) as string) || null;
      setHasRead(initialState?.has_read ?? false);
    }
  }, [hasPageHydrated, hasRead, slug]);

  return [hasRead, setHasRead];
};

export default useIsArticleRead;
