import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuid } from 'uuid';
import { TaskStep, TaskSetting, Result } from '../lib/type';

const INITIAL_APP_SETTING: TaskSetting = {
  backCount: 3,
  initializeTime: 5000,
  visibleTime: 500,
  waitTime: 2000,
  sessionList: [
    {
      id: uuid(),
      taskList: [3, 5, 7, 4, 6, 7],
      previewImgLinkList: ['test url'],
      showButtonClicked: true,
      showBackCountToast: true,
      correctBgColor: 'bg-green-400',
      incorrectBgColor: 'bg-red-400',
    },
  ],
};

interface State {
  taskStep: TaskStep;
  taskSetting: TaskSetting;
  resultList: Result[];
}

interface Actions {
  setTaskStep: (taskStep: TaskStep) => void;
  setTaskSetting: (taskSetting: TaskSetting) => void;
  addResult: (result: Result) => void;
  clearResult: () => void;
}

const useTaskStore = create<State & Actions>()(
  immer((set) => ({
    taskStep: 'home',
    taskSetting: INITIAL_APP_SETTING,
    resultList: [],
    setTaskStep: (step) => set({ taskStep: step }),
    setTaskSetting: (setting) => set({ taskSetting: setting }),
    addResult: (result) =>
      set((state) => {
        state.resultList.push(result);
      }),
    clearResult: () => set({ resultList: [] }),
  }))
);

export default useTaskStore;
