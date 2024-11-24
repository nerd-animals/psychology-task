import React, { useEffect, useState } from 'react';
import SessionPreview from '../component/SessionPreview';
import SessionStandby from '../component/SessionStandby';
import SessionExecutor from '../component/SessionExecutor';
import useTaskStore from '../store/taskStore';
import useSessionStore from '../store/sessionStore';

export default function Task() {
  const { sessionState, sessionIndex, setSessionState, setSessionIndex } =
    useSessionStore();
  const setTaskStep = useTaskStore((state) => state.setTaskStep);
  const sessionList = useTaskStore((state) => state.taskSetting.sessionList);

  useEffect(() => {
    if (sessionIndex < sessionList.length) {
      setSessionState('start');
    } else {
      setSessionIndex(0);
      setTaskStep('export-result');
    }
  }, [sessionIndex]);

  useEffect(() => {
    if (sessionState === 'start') {
      setSessionState('preview');
    } else if (sessionState === 'end') {
      setSessionIndex(sessionIndex + 1);
    }
  }, [sessionState]);

  return (
    <>
      {sessionState === 'preview' && <SessionPreview />}
      {sessionState === 'standby' && <SessionStandby />}
      {sessionState === 'execute' && <SessionExecutor />}
    </>
  );
}
