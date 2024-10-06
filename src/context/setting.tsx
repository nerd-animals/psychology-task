import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface AppContext {
  n: number;
  customTask: number[] | undefined;
}

interface Action {
  set: (newValue: AppContext) => void;
}

const AppContextValue = createContext<AppContext>({
  n: 0,
  customTask: undefined,
});
const contextAction = createContext<Action>({ set: () => {} });

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [appContext, setAppContext] = useState<AppContext>({
    n: 0,
    customTask: undefined,
  });

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
