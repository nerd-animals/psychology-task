import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

interface Setting {
  settingId: string; // uuid
  backCount: number;
  taskSet: number[][];
  visibleTime: number; // ms
  waitTime: number; // ms
  sessionChangeTime: number; // ms
}

interface AppContext {
  currentSetting: Setting;
  settingMap: Map<string, Setting>;
}

interface Action {
  add: (setting: Setting) => void;
}

const basicSetting: Setting = {
  settingId: uuid(),
  backCount: 2,
  taskSet: [
    [1, 2, 3],
    [4, 5, 6],
  ],
  visibleTime: 300,
  waitTime: 1000,
  sessionChangeTime: 5000,
};

const initialAppContext: AppContext = {
  currentSetting: basicSetting,
  settingMap: new Map<string, Setting>([
    [basicSetting.settingId, basicSetting],
  ]),
};

const AppContextValue = createContext<AppContext>(initialAppContext);
const contextAction = createContext<Action>({ add: () => {} });

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [appContext, setAppContext] = useState<AppContext>(initialAppContext);

  const action: Action = useMemo(
    () => ({
      add(setting: Setting) {
        setAppContext({
          ...appContext,
          settingMap: appContext.settingMap.set(setting.settingId, setting),
        });
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
    throw new Error('The value is undefined in useAppContext()');
  }
  return value;
}

export function useAppContextAction() {
  const value = useContext(contextAction);
  if (value === undefined) {
    throw new Error('The value is undefined in useAppContextAction()');
  }
  return value;
}
