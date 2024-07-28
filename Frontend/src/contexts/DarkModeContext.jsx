import { createContext, useContext, useEffect } from 'react';
import useLocalStorageState from '../hooks/useLocalStorage.js';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(true, 'isDarkMode');

  function toggleMode() {
    setIsDarkMode((mode) => !mode);
  }

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    },
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useThemeMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkMode context is used outside of darkmode provider');
  return context;
}

export { DarkModeProvider, useThemeMode };
