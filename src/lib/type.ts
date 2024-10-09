export type AppStep =
  | 'home'
  | 'setting'
  | 'setup'
  | 'stand-by'
  | 'explain'
  | 'trial'
  | 'pre-task'
  | 'task'
  | 'post-task';

export interface AppSetting {
  backCount: number;
  taskSet: number[][];
  visibleTime: number; // ms
  waitTime: number; // ms
  sessionChangeTime: number; // ms
}

export interface Result {
  sessionIndex: number;
  number: number;
  submitCode: string | undefined;
  duration: number;
}

export interface Subject {
  subjectId: string; // uuid
  subjectLabel: string; // anything
  result: Result[];
}
