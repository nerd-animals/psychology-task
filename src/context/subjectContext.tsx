import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export interface Result {
  sessionIndex: number;
  number: number;
  submitCode: string | undefined;
  duration: number;
}

interface Subject {
  date: Date;
  subjectId: string; // uuid
  subjectLabel: string; // anything
  appSettingId: string; // uuid
  result: Result[];
}

interface SubjectContext {
  currentSubject: Subject | undefined;
  subjectList: Subject[];
}

interface Action {
  add: (subject: Subject) => void;
}

const initialSubjectContext: SubjectContext = {
  currentSubject: undefined,
  subjectList: [],
};

const SubjectContextValue = createContext<SubjectContext>(
  initialSubjectContext
);
const contextAction = createContext<Action>({ add: () => {} });

export function SubjectContextProvider({ children }: { children: ReactNode }) {
  const [subjectContext, setSubjectContext] = useState<SubjectContext>(
    initialSubjectContext
  );

  const action: Action = useMemo(
    () => ({
      add(subject: Subject) {
        setSubjectContext({
          ...subjectContext,
          subjectList: [...subjectContext.subjectList, subject],
        });
      },
    }),
    []
  );

  return (
    <contextAction.Provider value={action}>
      <SubjectContextValue.Provider value={subjectContext}>
        {children}
      </SubjectContextValue.Provider>
    </contextAction.Provider>
  );
}

export function useSubjectContext() {
  const value = useContext(SubjectContextValue);
  if (value === undefined) {
    throw new Error('The value is undefined in useSubjectContext()');
  }
  return value;
}

export function useSubjectContextAction() {
  const value = useContext(contextAction);
  if (value === undefined) {
    throw new Error('The value is undefined in useSubjectContextAction()');
  }
  return value;
}
