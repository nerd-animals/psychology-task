import React, { useState, useEffect, useRef } from 'react';
import TaskBox from '../component/taskBox';
import useTaskStore from '../store/taskStore';

export default function trial() {
  const setTaskStep = useTaskStore((state) => state.setTaskStep);
  const taskSetting = useTaskStore((state) => state.taskSetting);
  const { backCount, trialSessionList, initializeTime, waitTime, visibleTime } =
    taskSetting;
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isInitailized, setIsInitailized] = useState<boolean>(false);
  const initialTimer = useRef<number>();

  // initialize
  // todo: integrity trial
  useEffect(() => {
    if (trialSessionList[0].taskList.length === 0) {
      setTaskStep('pre-final-trial');
    }

    initialTimer.current = window.setTimeout(
      () => setIsInitailized(true),
      initializeTime
    );

    return () => window.clearTimeout(initialTimer.current);
  }, []);

  useEffect(() => {
    if (isFinished) {
      setTaskStep('pre-final-trial');
    }
  }, [isFinished]);

  return (
    <>
      {isInitailized === false && (
        <div>잠시 후, 시작됩니다. 화면을 집중해주세요!</div>
      )}
      {isInitailized && (
        <TaskBox
          session={trialSessionList[0]}
          backCount={backCount}
          waitTime={waitTime}
          visibleTime={visibleTime}
          correctColor="bg-green-300"
          wrongColor="bg-red-300"
          showSubmissionStatus
          setIsFinished={setIsFinished}
          addResult={() => {}}
        />
      )}
    </>
  );
}
