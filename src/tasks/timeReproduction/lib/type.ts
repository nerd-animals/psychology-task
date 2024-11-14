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
  taskList: number[]; // ms
}

export interface AppSetting {
  initializeTime: number; // ms
  sessionChangeTime: number; // ms
  waitTime: number; // ms
  trialSession: Session;
  sessionList: Session[];
}

export interface Result {
  sessionIndex: number;
  taskIndex: number;
  value: number;
  submittedAnswer: number;
}

export interface Subject {
  subjectLabel: string; // anything
  date: Date;
}
