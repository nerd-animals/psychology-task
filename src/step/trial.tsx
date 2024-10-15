import React, { useState, useEffect, useRef } from 'react';
import TaskBox from '../component/taskBox';
import { AppSetting, AppStep } from '../lib/type';
import Initialization from '../component/initialization';

export default function trial({
  appSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const { backCount, trialSession, initializeTime, waitTime, visibleTime } =
    appSetting;
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isInitailized, setIsInitailized] = useState<boolean>(false);
  const initialTimer = useRef<number>();

  // initialize
  useEffect(() => {
    if (trialSession.taskList.length === 0) {
      setAppStep('pre-task');
    }

    initialTimer.current = window.setTimeout(
      () => setIsInitailized(true),
      initializeTime
    );

    return () => window.clearTimeout(initialTimer.current);
  }, []);

  useEffect(() => {
    if (isFinished) {
      setAppStep('pre-task');
    }
  }, [isFinished]);

  return (
    <>
      {isInitailized === false && <Initialization />}
      {isInitailized && (
        <TaskBox
          session={trialSession}
          backCount={backCount}
          waitTime={waitTime}
          visibleTime={visibleTime}
          correctColor="bg-green-300"
          wrongColor="bg-red-300"
          setIsFinished={setIsFinished}
          addResult={() => {}}
        />
      )}
    </>
  );
}
