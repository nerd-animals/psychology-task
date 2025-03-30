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
        taskList: [4, 1, 5, 4, 1, 4, 5, 2, 4, 1, 1, 4, 2, 1, 2],
        previewImgLinkList: [
          `${process.env.PUBLIC_URL}/images/tasks/nBack/nBack-0.png`,
          `${process.env.PUBLIC_URL}/images/tasks/nBack/nBack-1.png`,
          `${process.env.PUBLIC_URL}/images/tasks/nBack/nBack-2.png`,
          `${process.env.PUBLIC_URL}/images/tasks/nBack/nBack-3.png`,
        ],
        showButtonClicked: true,
        showBackCountToast: true,
        bgColorType: 'Red-Green',
      },
      {
        id: uuid(),
        taskList: [5, 5, 2, 4, 5, 2, 3, 4, 3, 3, 4, 5, 4, 3, 5],
        previewImgLinkList: [
          `${process.env.PUBLIC_URL}/images/tasks/nBack/nBack-inter-0.png`,
        ],
        showButtonClicked: false,
        showBackCountToast: false,
        bgColorType: 'Gray',
      },
      {
        id: uuid(),
        taskList: [
          4, 3, 4, 2, 8, 4, 8, 4, 4, 3, 4, 2, 3, 2, 4, 3, 8, 4, 8, 2, 4, 3, 2,
          8, 2, 7, 6, 2, 7, 3, 2, 8, 2, 2, 4, 8, 2, 2, 7, 8, 4, 7, 4, 6, 7, 6,
          4, 8, 7, 8,
        ],
        previewImgLinkList: [
          `${process.env.PUBLIC_URL}/images/tasks/nBack/nBack-inter-1.png`,
        ],
        showButtonClicked: false,
        showBackCountToast: false,
        bgColorType: 'Gray',
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
          showButtonClicked: false,
          showBackCountToast: false,
          bgColorType: 'Gray',
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
