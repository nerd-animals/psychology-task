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
        taskList: [3, 5, 7, 4, 6, 7],
        previewImgLinkList: [
          '1cqa3omD0Z4JnQ9R_XuW171rPhXwD4KxM',
          '1tTJasMBO5pXKzrgZHfm_kmVyNnvnogfP',
          '19Dz_4vaNX5KfxzWEHba2R9xOxqTM21tP',
          '11AOCRGLhMa9cn4DGFwVCGNXbBT19swHc',
          '1W4CC_REyEYwn5fzM_rxSC51aBOsl3maz',
          '18l6VLr89GQj39diOB1tKp_ZFt8seYj_x',
        ],
      },
      {
        id: uuid(),
        taskList: [3, 5, 7, 4, 6, 7],
        previewImgLinkList: [],
      },
      {
        id: uuid(),
        taskList: [3, 5, 7, 4, 6, 7],
        previewImgLinkList: [],
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
