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
  trialList: number[];
  taskList: number[][];
  initializeTime: number; // ms
  visibleTime: number; // ms
  waitTime: number; // ms
  sessionChangeTime: number; // ms
}

export interface Result {
  sessionIndex: number;
  value: number;
  submittedCode: string | undefined;
  duration: number;
}

export interface Subject {
  subjectId: string; // uuid
  subjectLabel: string; // anything
  date: Date;
}
