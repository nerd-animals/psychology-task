import React, { createContext, useContext, useMemo, useState } from 'react';

type Task = 'none' | 'n-back' | 'time-reproduction';

interface App {
  task: Task;
}

interface AppActions {
  setTask: (task: Task) => void;
}

const appValueContext = createContext<App>({} as App);
const appActionsContext = createContext<AppActions>({} as AppActions);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [app, setApp] = useState<App>({ task: 'none' });
  const actions = useMemo(
    () => ({
      setTask: (task: Task) => {
        setApp({ ...app, task });
      },
    }),
    []
  );
  return (
    <appActionsContext.Provider value={actions}>
      <appValueContext.Provider value={app}>
        {children}
      </appValueContext.Provider>
    </appActionsContext.Provider>
  );
}

export function useAppValue() {
  const value = useContext(appValueContext);
  if (value === undefined) {
    throw new Error(
      'useAppValue should be used within appValueContext.Provider.'
    );
  }
  return value;
}

export function useAppActions() {
  const value = useContext(appActionsContext);
  if (value === undefined) {
    throw new Error(
      'useAppActions should be used within appActionsContext.Provider.'
    );
  }
  return value;
}
