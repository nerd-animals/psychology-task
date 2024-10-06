import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface Setting {
  n: number;
  customTask: number[] | undefined;
}

interface Action {
  set: (newValue: Setting) => void;
}

const valueContext = createContext<Setting>({ n: 0, customTask: undefined });
const actionContext = createContext<Action>({ set: () => {} });

export function SettingContextProvider({ children }: { children: ReactNode }) {
  const [setting, setSetting] = useState<Setting>({
    n: 0,
    customTask: undefined,
  });

  const action: Action = useMemo(
    () => ({
      set(newValue: Setting) {
        setSetting(newValue);
      },
    }),
    []
  );

  return (
    <actionContext.Provider value={action}>
      <valueContext.Provider value={setting}>{children}</valueContext.Provider>
    </actionContext.Provider>
  );
}

export function useSettingValue() {
  const value = useContext(valueContext);
  if (value === undefined) {
    throw new Error('The value is undefined in useSettingValue()');
  }
  return value;
}

export function useSettingAction() {
  const value = useContext(actionContext);
  if (value === undefined) {
    throw new Error('The value is undefined in useSettingAction()');
  }
  return value;
}
