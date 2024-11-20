import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuid } from 'uuid';
import {
  TaskStep,
  TaskSetting,
  Result,
  Session,
  NONE_FLAG,
  SAME_FLAG,
  DIFF_FLAG,
} from '../lib/type';

const INITIAL_APP_SETTING: TaskSetting = {
  backCount: 3,
  initializeTime: 5000,
  visibleTime: 500,
  waitTime: 2000,
  sessionChangeTime: 5000,
  trialSessionList: [
    {
      id: 'trial',
      sessionIndex: 0,
      taskList: [2, 1, 8, 5, 1, 7],
      solutionList: [],
    },
  ],
  sessionList: [
    {
      id: uuid(),
      sessionIndex: 0,
      taskList: [3, 5, 7, 4, 6, 7],
      solutionList: [],
    },
    {
      id: uuid(),
      sessionIndex: 1,
      taskList: [9, 4, 3, 5, 4, 7],
      solutionList: [],
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
  solveTask: () => void;
}

function solve(backCount: number, session: Session) {
  const solutionList = session.taskList.map((value, index) => {
    if (index < backCount) {
      return NONE_FLAG;
    }
    const nBackValue = session.taskList.at(index - backCount);

    if (value === nBackValue) {
      return SAME_FLAG;
    }
    return DIFF_FLAG;
  });

  const solvedSession = { ...session, solutionList: [...solutionList] };
  return solvedSession;
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
    solveTask: () =>
      set((state) => {
        const solvedSessionList = state.taskSetting.sessionList.map((session) =>
          solve(state.taskSetting.backCount, session)
        );
        const solvedTrialSessionList = state.taskSetting.trialSessionList.map(
          (session) => solve(state.taskSetting.backCount, session)
        );
        return {
          taskSetting: {
            ...state.taskSetting,
            sessionList: solvedSessionList,
            trialSessionList: solvedTrialSessionList,
          },
        };
      }),
  }))
);

export default useTaskStore;
