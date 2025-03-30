import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuid } from 'uuid';
import { Session } from '../lib/type';

type SessionState = 'start' | 'preview' | 'standby' | 'execute' | 'end';

interface State {
  sessionList: Session[];
  sessionIndex: number;
  sessionState: SessionState;
}

interface Actions {
  setSessionState: (sessionState: SessionState) => void;
  setSessionIndex: (sessionIndex: number) => void;
  addSession: () => void;
  updateSession: (idx: number, session: Session) => void;
  removeSession: (idx: number) => void;
}

const useSessionStore = create<State & Actions>()(
  immer((set) => ({
    sessionList: [
      {
        id: uuid(),
        taskList: [4000, 10000, 18000],
        previewImgLinkList: [
          `${process.env.PUBLIC_URL}/images/tasks/timeReproduction/timeReproduction-0.png`,
          `${process.env.PUBLIC_URL}/images/tasks/timeReproduction/timeReproduction-1.png`,
        ],
      },
      {
        id: uuid(),
        taskList: [2000, 6000, 12000, 24000, 45000, 60000],
        previewImgLinkList: [
          `${process.env.PUBLIC_URL}/images/tasks/timeReproduction/timeReproduction-inter-0.png`,
        ],
      },
      {
        id: uuid(),
        taskList: [6000, 24000, 60000, 2000, 12000, 45000],
        previewImgLinkList: [
          `${process.env.PUBLIC_URL}/images/tasks/timeReproduction/timeReproduction-inter-1.png`,
        ],
      },
    ],
    sessionState: 'start',
    sessionIndex: 0,
    addSession: () =>
      set((state) => {
        state.sessionList.push({
          id: uuid(),
          taskList: [],
          previewImgLinkList: [],
        });
      }),
    updateSession: (idx, session) => {
      set((state) => ({
        sessionList: state.sessionList.map((v, i) => (i === idx ? session : v)),
      }));
    },
    removeSession: (idx) => {
      set((state) => {
        state.sessionList.splice(idx, 1);
      });
    },
    setSessionState: (sessionState) => set({ sessionState }),
    setSessionIndex: (sessionIndex) => set({ sessionIndex }),
  }))
);

export default useSessionStore;
