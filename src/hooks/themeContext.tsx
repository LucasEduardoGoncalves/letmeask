import { createContext, ReactNode, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from "styled-components";

import light from '../styles/themes/ligth';
import dark from '../styles/themes/dark';

interface ThemeContextData {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme: DefaultTheme;
}

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {

  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const response = localStorage.getItem("letmeask: theme");
    const storage = response ? JSON.parse(response) : 'light';
    setTheme(storage)
  }, [theme]);
 
  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
    localStorage.setItem("letmeask: theme", JSON.stringify(theme));     
  };

  return (
    <StyledThemeProvider theme={theme}>
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  );
};
