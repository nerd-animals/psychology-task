import { create } from 'zustand';

type Task = 'none' | 'n-back' | 'time-reproduction';

interface Subject {
  label: string;
  date: Date;
}

interface State {
  task: Task;
  subject: Subject;
}

interface Actions {
  setTask: (task: Task) => void;
  setSubejct: (subject: Subject) => void;
}

const useAppStore = create<State & Actions>((set) => ({
  task: 'none',
  subject: { label: '', date: new Date() },
  setTask: (task) => set({ task }),
  setSubejct: (subject) => set({ subject }),
}));

export default useAppStore;
