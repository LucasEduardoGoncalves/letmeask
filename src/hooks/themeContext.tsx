import { createContext, ReactNode, useState } from "react";
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from "styled-components";

import  light  from '../styles/themes/ligth';
import  dark from '../styles/themes/dark';

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

  const [theme, setTheme] = useState(() => {
    const storageValue = localStorage.getItem("theme");

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return defaultTheme
    }

  });
 
  const toggleTheme = () => {
    const newTheme = theme.title === "light" ? dark : light;

    localStorage.setItem("theme", JSON.stringify(newTheme));
    setTheme(newTheme);     
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
