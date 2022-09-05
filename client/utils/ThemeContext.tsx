import { createContext, FC, useEffect, useState } from 'react';

export type ThemeContextType = {
   dark: boolean;
   toggleDark: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({ dark: false, toggleDark: () => {} });

export const ThemeProvider: FC = ({ children }) => {
   const [dark, setDark] = useState(false);
   const toggleDark = () => {
      setDark(!dark);
      localStorage.setItem('dark', JSON.stringify(!dark));
   };
   useEffect(() => {
      setDark(localStorage.getItem('dark') ? JSON.parse(localStorage.getItem('dark') as string) : false);
   }, []);
   return <ThemeContext.Provider value={{ dark, toggleDark }}>{children}</ThemeContext.Provider>;
};
