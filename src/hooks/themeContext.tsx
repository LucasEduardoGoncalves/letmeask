import { createContext, ReactNode, useState } from "react";
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from "styled-components";

import  light  from '../styles/themes/ligth';
import  dark from '../styles/themes/dark';

interface ThemeContextData {
  theme: DefaultTheme;
  toggleTheme: () => void;
  styledToast: object;
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

  const styledToast = {
    style: {
      border: `1px solid ${theme.toast.borderColor}`,
      padding: '16px',
      color: `${theme.toast.textColor}`,
      background: `${theme.toast.background}`,
    },
    iconTheme: {
      primary: `${theme.toast.icon.cor1}`,
      secondary: `${theme.toast.icon.cor2}`,
    }
  }
 
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
          styledToast
        }}
      >
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  );
};
