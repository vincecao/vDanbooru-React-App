import React, {
  useState, useLayoutEffect, ReactNode, ReactElement, useMemo,
} from 'react';
import { emptyFunc } from '../utilis';

export const prefersDark = (): boolean => !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

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

  function toggle() {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }

  const value = useMemo(() => ({ theme, toggleTheme: toggle }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
