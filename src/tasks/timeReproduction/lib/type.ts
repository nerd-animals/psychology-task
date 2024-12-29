export type TaskStep =
  | 'home'
  | 'setting'
  | 'subject-setup'
  | 'task'
  | 'export-result';

export interface Session {
  id: string;
  taskList: number[]; // ms
  previewImgLinkList: string[];
}

export interface TaskSetting {
  waitTime: number; // ms
}

export interface Result {
  sessionIndex: number;
  index: number;
  value: number;
  submittedAnswer: number;
}
