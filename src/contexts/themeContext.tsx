import React, {
  useState, useEffect, useRef, useLayoutEffect, ReactNode, ReactElement, useMemo,
} from 'react';
import { emptyFunc } from '../utilis';

export const prefersDark = (): boolean => !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

/**
 * Saves the old theme for future use
 * @param {string} theme - Name of curent theme
 * @return {string} previousTheme
 */

function usePrevious(theme: string) {
  const ref = useRef('' as string);
  useEffect(() => {
    ref.current = theme;
  });
  return ref.current;
}

type IContextProps = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: emptyFunc,
} as IContextProps);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children } : ThemeProviderProps): ReactElement {
  // defaults to light theme
  const [theme, setTheme] = useState('light');

  // set user's preferred color scheme on first load
  useLayoutEffect(() => {
    setTheme(prefersDark() ? 'dark' : 'light');
  }, []);

  // change theme
  const oldTheme = usePrevious(theme);
  useLayoutEffect(() => {
    document.documentElement.classList.remove(`theme-${oldTheme}`);
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme, oldTheme]);

  function toggle() {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  }

  const value = useMemo(() => ({ theme, toggleTheme: toggle }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
