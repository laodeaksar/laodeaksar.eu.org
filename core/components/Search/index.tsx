import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import FocusTrap from 'focus-trap-react';

import useDebouncedValue from '~/hooks/useDebouncedValue';
import { useTheme } from '~/context/ThemeContext';

import Label from '~/components/Label';
import Flex from '~/components/Flex';
import { EnterIcon } from '~/components/Icons';

import { CommandCenterStatic } from './CommandCenterStatic';
import { HEIGHT, MAX_HEIGHT } from './constants';

import {
  Overlay,
  SearchBox,
  FormWrapper,
  SearchResults,
  Result
} from './Styles';

type Result = {
  types: 'snippet' | 'blog';
  slug: string;
  title: string;
};

interface Props {
  onClose: () => void;
}

const toggleLockScroll = () => {
  document.documentElement.classList.toggle('lock-scroll');
  return;
};

export type IndexOperator = (nudge?: number) => void;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const wrap = (value: number, min: number, max: number) => {
  const range = max - min;

  return ((((value - min) % range) + range) % range) + min;
};

function useIndexItem<T>(
  items: T[],
  initial = 0
): [
  T,
  IndexOperator,
  IndexOperator,
  React.Dispatch<React.SetStateAction<number>>
] {
  const [index, setIndex] = useState(initial);
  const itemsRef = useRef(items);

  useEffect(() => {
    itemsRef.current = items;

    setIndex((index) => clamp(index, 0, Math.max(items.length - 1, 0)));
  }, [items]);

  const previousItem = useCallback((nudge: number = 1) => {
    setIndex((index) =>
      wrap(index - nudge, 0, Math.max(itemsRef.current.length, 0))
    );
  }, []);

  const nextItem = useCallback((nudge: number = 1) => {
    setIndex((index) =>
      wrap(index + nudge, 0, Math.max(itemsRef.current.length, 0))
    );
  }, []);

  return [items[index], previousItem, nextItem, setIndex];
}

const Search = (props: Props) => {
  const { onClose } = props;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Result[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 250);

  const inputRef = useRef<HTMLInputElement>(null);
  const SearchRef = useRef<HTMLDivElement>(null);

  const [selectedResult, previousResult, nextResult, setSelectedResult] =
    useIndexItem(results);

  const clickOutside = (e: React.BaseSyntheticEvent) => {
    if (
      SearchRef &&
      SearchRef.current &&
      SearchRef.current.contains(e.target)
    ) {
      return null;
    }

    return onClose();
  };

  const handlePointer = (index: number) => setSelectedResult(index);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (debouncedSearchQuery !== '') {
        switch (e.key) {
          case 'Enter':
            const href = `/${
              selectedResult.types === 'snippet' ? 'snippets' : 'blog'
            }/${selectedResult.slug}/`;
            router.push(href).then(() => window.scrollTo(0, 0));
            setTimeout(onClose, 600);
            break;
          case 'ArrowUp':
            e.preventDefault();
            previousResult();
            break;
          case 'ArrowDown':
            e.preventDefault();
            nextResult();
            break;
          default:
        }
      }
    },
    [
      debouncedSearchQuery,
      selectedResult,
      router,
      onClose,
      previousResult,
      nextResult
    ]
  );

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }

    toggleLockScroll();

    return () => toggleLockScroll();
  }, []);

  useEffect(() => {
    setLoading(true);

    if (debouncedSearchQuery && debouncedSearchQuery !== '') {
      const searchEndpoint = `/api/search?q=${debouncedSearchQuery.toLowerCase()}`;
      fetch(searchEndpoint)
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
          setLoading(false);
        });
    }

    if (debouncedSearchQuery === '') {
      setResults([]);
      setLoading(false);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  useEffect(() => {
    if (selectedResult) {
      document
        .getElementById(selectedResult.slug)
        ?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedResult]);

  const { dark } = useTheme();

  return createPortal(
    <FocusTrap>
      <aside>
        <Overlay
          initial={{
            backgroundColor: dark ? 'rgba(0,0,0,0)' : 'rgba(241, 243, 247, 0)'
          }}
          animate={{
            backgroundColor: dark
              ? 'rgba(0,0,0,0.8)'
              : 'rgba(241, 243, 247, 0.8)'
          }}
          exit={{
            backgroundColor: dark ? 'rgba(0,0,0,0)' : 'rgba(241, 243, 247, 0)'
          }}
          onClick={clickOutside}
          aria-label="search"
          aria-modal="true"
          tabIndex={-1}
          role="dialog"
        >
          <SearchBox
            initial={{ scale: 0.8, opacity: 0, x: '-50%' }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 0.5,
              opacity: 0,
              transition: { duration: 0.15, delay: 0.1 }
            }}
            transition={{
              ease: 'easeOut',
              duration: 0.2
            }}
          >
            <FormWrapper ref={SearchRef}>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  ref={inputRef}
                  autoComplete="off"
                  type="search"
                  placeholder="Type keywords to search blog posts..."
                  id="search-input"
                  name="search"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  value={searchQuery}
                />
                <Label
                  style={{
                    width: '120px'
                  }}
                >
                  {debouncedSearchQuery !== '' && !loading
                    ? `${results.length} results`
                    : null}
                </Label>
              </form>
            </FormWrapper>
            {debouncedSearchQuery !== '' ? (
              <SearchResults
                style={{
                  height:
                    results.length * HEIGHT >= MAX_HEIGHT
                      ? MAX_HEIGHT
                      : results.length * HEIGHT,
                  transition: 'height 0.4s ease-out',
                  willChange: 'height'
                }}
              >
                {results.map((result, index) => (
                  <Result
                    key={result.slug}
                    id={result.slug}
                    selected={selectedResult === result}
                    onPointerEnter={() => handlePointer(index)}
                  >
                    <Link
                      href={`/${
                        result.types === 'snippet' ? 'snippets' : 'blog'
                      }/${result.slug}`}
                    >
                      <a onClick={() => setTimeout(onClose, 600)}>
                        {result.title}
                      </a>
                    </Link>
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      css={{
                        marginLeft: '$4',
                        size: '35px',
                        backgroundColor: 'var(--laodeaksar-colors-emphasis)',
                        borderRadius: '$1',

                        path: {
                          stroke: 'var(--laodeaksar-colors-brand)'
                        }
                      }}
                    >
                      <EnterIcon size={4} />
                    </Flex>
                  </Result>
                ))}
              </SearchResults>
            ) : (
              <CommandCenterStatic />
            )}
          </SearchBox>
        </Overlay>
      </aside>
    </FocusTrap>,
    document.body
  );
};

export default Search;
