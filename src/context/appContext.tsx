import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface AppContext {
  backCount: number;
  taskSet: number[];
  visibleTime: number; // ms
  waitTime: number; // ms
}

interface Action {
  set: (newValue: AppContext) => void;
}

const initialAppContext = {
  backCount: 0,
  taskSet: [1, 2, 3],
  visibleTime: 500,
  waitTime: 1000,
};

const AppContextValue = createContext<AppContext>(initialAppContext);
const contextAction = createContext<Action>({ set: () => {} });

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [appContext, setAppContext] = useState<AppContext>(initialAppContext);

  const action: Action = useMemo(
    () => ({
      set(newValue: AppContext) {
        setAppContext(newValue);
      },
    }),
    []
  );

  return (
    <contextAction.Provider value={action}>
      <AppContextValue.Provider value={appContext}>
        {children}
      </AppContextValue.Provider>
    </contextAction.Provider>
  );
}

export function useAppContext() {
  const value = useContext(AppContextValue);
  if (value === undefined) {
    throw new Error('The value is undefined in useSettingValue()');
  }
  return value;
}

export function useAppContextAction() {
  const value = useContext(contextAction);
  if (value === undefined) {
    throw new Error('The value is undefined in useSettingAction()');
  }
  return value;
}
