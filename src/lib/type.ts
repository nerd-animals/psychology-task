export const DIFF_FLAG = 'diff';
export const SAME_FLAG = 'same';
export const NONE_FLAG = '-';

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

export interface Session {
  id: string;
  sessionIndex: number;
  taskList: number[];
  solutionList: string[];
}

export interface AppSetting {
  backCount: number;
  initializeTime: number; // ms
  visibleTime: number; // ms
  waitTime: number; // ms
  sessionChangeTime: number; // ms
  trialSession: Session;
  sessionList: Session[];
}

export interface Result {
  sessionIndex: number;
  taskIndex: number;
  value: number;
  solution: string;
  submittedAnswer: string;
  duration: number;
}

export interface Subject {
  subjectLabel: string; // anything
  date: Date;
}
