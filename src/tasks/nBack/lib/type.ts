export const DIFF_FLAG = 'diff';
export const SAME_FLAG = 'same';
export const NONE_FLAG = '-';

export type TaskStep =
  | 'home'
  | 'setting'
  | 'subject-setup'
  | 'task'
  | 'export-result';

export interface Session {
  id: string;
  taskList: number[];
  previewImgLinkList: string[];
  showButtonClicked: boolean;
  showBackCountToast: boolean;
  showBgColor: boolean;
}

export interface TaskSetting {
  backCount: number;
  initializeTime: number; // ms
  visibleTime: number; // ms
  waitTime: number; // ms
}

export interface Result {
  sessionIndex: number;
  index: number;
  value: number;
  solution: string;
  submittedAnswer: string;
  duration: number;
}
