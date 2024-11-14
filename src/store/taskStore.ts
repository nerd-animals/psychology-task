import { create } from 'zustand';

type Task = 'none' | 'n-back' | 'time-reproduction';

interface TaskStore {
  task: Task;
  setTask: (task: Task) => void;
}

export default function useTaskStore() {
  create<TaskStore>((set) => ({
    task: 'none',
    setTask: (task: Task) => set({ task }),
  }));
}
