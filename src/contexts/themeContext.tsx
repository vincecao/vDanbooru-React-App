import React, { FC, useState, useEffect, useRef, useLayoutEffect, ReactNode } from 'react';

export const prefersDark = () => !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

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
  toggleTheme: () => {},
} as IContextProps);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
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

  function toggleTheme() {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
