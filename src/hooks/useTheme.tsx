import { useContext } from 'react';
import { ThemeContext } from './themeContext';

export function useTheme() {
    const value = useContext(ThemeContext);
    return value;
}