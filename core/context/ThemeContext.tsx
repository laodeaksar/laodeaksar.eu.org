import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import useKeyboardShortcut from '~/hooks/useKeyboardShortcut';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

const KEY = 'mode';

const defaultContextData = {
  dark: false,
  toggleDark: () => {}
};

export const ThemeContext = createContext(defaultContextData);

const useTheme = () => useContext(ThemeContext);

const storage = {
  get: (init?: Theme) => window.localStorage.getItem(KEY) || init,
  set: (value: Theme) => window.localStorage.setItem(KEY, value)
};

const supportsDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches === true;

const useDarkMode = (): [Theme, (theme?: Theme) => void] => {
  const [themeState, setThemeState] = useState(Theme.LIGHT);

  const setThemeStateEnhanced = (themeValue?: Theme) => {
    setThemeState((prevState) => {
      const nextState = themeValue
        ? themeValue
        : prevState === Theme.LIGHT
        ? Theme.DARK
        : Theme.LIGHT;

      document.body.classList.remove('laodeaksar-' + prevState);
      document.body.classList.add('laodeaksar-' + nextState);
      storage.set(nextState);

      return nextState;
    });
  };

  useEffect(() => {
    const storedMode = storage.get();
    if (!storedMode && supportsDarkMode()) {
      return setThemeStateEnhanced(Theme.DARK);
    }

    if (!storedMode || storedMode === themeState) {
      return;
    }

    setThemeStateEnhanced();
  }, [themeState]);

  return [themeState, setThemeStateEnhanced];
};

const ThemeProvider: React.FC = (props) => {
  const { children } = props;
  const [themeState, setThemeStateEnhanced] = useDarkMode();
  const toggleDark = useCallback(() => {
    setThemeStateEnhanced();
  }, [setThemeStateEnhanced]);

  useKeyboardShortcut('ctrl+t', toggleDark);

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        setThemeStateEnhanced(e.matches ? Theme.DARK : Theme.LIGHT);
      });
  }, [setThemeStateEnhanced, toggleDark]);

  return (
    <ThemeContext.Provider
      value={{
        dark: themeState === Theme.DARK,
        toggleDark
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
