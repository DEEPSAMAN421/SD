
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default'); // 'default', 'th', 'bh', 'hero', 'attack', 'planner'

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-default', 'theme-th', 'theme-bh', 'theme-hero', 'theme-attack', 'theme-planner');
    if (theme !== 'default') {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
