import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { TaskStep, TaskSetting, Result } from '../lib/type';

const INITIAL_TASK_SETTING: TaskSetting = {
  waitTime: 3000,
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
    taskSetting: INITIAL_TASK_SETTING,
    resultList: [],
    setTaskStep: (taskStep) => set({ taskStep }),
    setTaskSetting: (taskSetting) => set({ taskSetting }),
    addResult: (result) =>
      set((state) => {
        state.resultList.push(result);
      }),
    clearResult: () => set({ resultList: [] }),
  }))
);

export default useTaskStore;
