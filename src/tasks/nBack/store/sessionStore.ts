import { create } from 'zustand';

type SessionState = 'start' | 'preview' | 'standby' | 'execute' | 'end';

interface State {
  sessionIndex: number;
  sessionState: SessionState;
}

interface Actions {
  setSessionState: (sessionState: SessionState) => void;
  setSessionIndex: (sessionIndex: number) => void;
}

const useSessionStore = create<State & Actions>((set) => ({
  sessionState: 'start',
  sessionIndex: 0,
  setSessionState: (sessionState) => set({ sessionState }),
  setSessionIndex: (sessionIndex) => set({ sessionIndex }),
}));
export default useSessionStore;
