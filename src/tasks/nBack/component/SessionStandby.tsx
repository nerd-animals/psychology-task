import { useEffect, useRef } from 'react';
import useSessionStore from '../store/sessionStore';
import useTaskStore from '../store/taskStore';

export default function SessionStandby() {
  const setSessionState = useSessionStore((state) => state.setSessionState);
  const initializeTime = useTaskStore(
    (state) => state.taskSetting.initializeTime
  );
  const standbyTimer = useRef<number>();

  useEffect(() => {
    standbyTimer.current = window.setTimeout(() => {
      setSessionState('execute');
    }, initializeTime);

    return () => window.clearTimeout(standbyTimer.current);
  }, []);

  return <>Session Standby PAGE</>;
}
