import { useEffect, useRef, useState } from 'react';

import type { Blog } from 'contentlayer/generated';

type Props = {
  currentData: () => Blog[];
  currentPage: number;
  maxPage: number;
  setElement: React.Dispatch<React.SetStateAction<Element | null>>;
};

const usePagination = (
  data: Blog[],
  itemsPerPage: number,
  threshold?: number | number[]
): Props => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(undefined, end);
  };

  const [element, setElement] = useState<Element | null>(null);

  const observer = useRef<IntersectionObserver>();
  const prevY = useRef(0);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      const y = firstEntry.boundingClientRect.y;

      if (prevY.current > y) {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
      }
      prevY.current = y;
    }, {});
  }, [maxPage, threshold]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver?.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver?.unobserve(currentElement);
      }
    };
  }, [element]);

  return { currentData, currentPage, maxPage, setElement };
};

export default usePagination;
