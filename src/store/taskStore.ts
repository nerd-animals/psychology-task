import { create } from 'zustand';

type Task = 'none' | 'n-back' | 'time-reproduction';

interface TaskStore {
  task: Task;
  setTask: (task: Task) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  task: 'none',
  setTask: (task) => set({ task }),
}));

export default useTaskStore;
