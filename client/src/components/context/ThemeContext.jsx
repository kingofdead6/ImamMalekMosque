import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
const [isDark, setIsDark] = useState(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark'; // ✅ only dark if explicitly saved
});


  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);


  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };


  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};