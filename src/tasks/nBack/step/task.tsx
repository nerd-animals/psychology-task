import React, { useEffect, useRef, useState } from 'react';
import TaskBox from '../component/taskBox';
import useTaskStore from '../store/taskStore';

export default function task() {
  const taskSetting = useTaskStore((state) => state.taskSetting);
  const setTaskStep = useTaskStore((state) => state.setTaskStep);
  const addResult = useTaskStore((state) => state.addResult);
  const {
    sessionList,
    backCount,
    initializeTime,
    waitTime,
    visibleTime,
    sessionChangeTime,
  } = taskSetting;
  const [isInitailized, setIsInitailized] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [sessionIndex, setSessionIndex] = useState<number>(0);
  const initialTimer = useRef<number>();
  const sessionTimer = useRef<number>();
  const currentSession = sessionList[sessionIndex];

  // initialize
  useEffect(() => {
    initialTimer.current = window.setTimeout(
      () => setIsInitailized(true),
      initializeTime
    );

    return () => window.clearTimeout(initialTimer.current);
  }, []);

  // change session
  useEffect(() => {
    if (isFinished === false) return undefined;

    if (sessionIndex < sessionList.length - 1) {
      sessionTimer.current = window.setTimeout(() => {
        setSessionIndex((prev) => prev + 1);
        setIsFinished(false);
      }, sessionChangeTime);
    } else {
      setTaskStep('post-task');
    }

    return () => window.clearTimeout(sessionTimer.current);
  }, [isFinished]);

  return (
    <>
      {isInitailized === false && (
        <div>잠시 후, 시작됩니다. 화면을 집중해주세요!</div>
      )}
      {isInitailized && isFinished && (
        <div>잠시 후, 다음 세션이 시작됩니다.</div>
      )}
      {isInitailized && isFinished === false && (
        <TaskBox
          session={currentSession}
          backCount={backCount}
          waitTime={waitTime}
          visibleTime={visibleTime}
          correctColor="bg-gray-300"
          wrongColor="bg-gray-300"
          showSubmissionStatus={false}
          setIsFinished={setIsFinished}
          addResult={addResult}
        />
      )}
    </>
  );
}
