import { h, createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

const AppContext = createContext({});

export function useAppContext() {
  const appContext = useContext(AppContext);

  return appContext;
}

export function AppContextProvider({ children }) {
  const [appContext, setAppContext] = useState({});

  const provided = {
    appContext,
    setAppContext,
  };

  return (
    <AppContext.Provider value={provided}>
      {children}
    </AppContext.Provider>
  );
}
