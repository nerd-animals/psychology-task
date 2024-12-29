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
        taskList: [4, 1, 5, 4, 1, 4, 5, 2, 4, 1, 1, 4],
        previewImgLinkList: [
          '1WOMx7M4cMKgtO_h6owG9bKOvwbgKZzB4',
          '1vQbqR-EE4-IQ-08HpiR96zTSUbn9RUSU',
          '17ht4mt5g0BztuWfx85lcpdccNASO7wTt',
          '1SODSaRDBhcc_fdhXMfsCsBEVVwOA_YiX',
        ],
        showButtonClicked: true,
        showBackCountToast: true,
        bgColorType: 'Red-Green',
      },
      {
        id: uuid(),
        taskList: [5, 5, 2, 4, 5, 2, 3, 4, 3, 3, 4, 4],
        previewImgLinkList: ['10hdy3y-36cMBNhP5fSKh9hEnPVA--gPc'],
        showButtonClicked: false,
        showBackCountToast: false,
        bgColorType: 'Gray',
      },
      {
        id: uuid(),
        taskList: [
          7, 2, 7, 7, 4, 2, 7, 1, 1, 7, 1, 4, 7, 6, 9, 2, 8, 6, 9, 8, 9, 9, 8,
          7,
        ],
        previewImgLinkList: ['1pZ86FhHBEbrtigbXPe1QWxH7jcR1qCbU'],
        showButtonClicked: false,
        showBackCountToast: false,
        bgColorType: 'Gray',
      },
      {
        id: uuid(),
        taskList: [
          8, 6, 6, 8, 2, 6, 8, 5, 3, 8, 7, 4, 9, 7, 1, 9, 6, 5, 9, 4, 3, 9, 5,
          1,
        ],
        previewImgLinkList: ['1QguQI4MWE1pQcrUmttzK7oYIQdWU8biN'],
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
