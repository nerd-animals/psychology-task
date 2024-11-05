import React, { useState, useEffect, useRef } from 'react';
import TaskBox from '../component/taskBox';
import { AppSetting, AppStep } from '../lib/type';

export default function finalTrial({
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
      {isInitailized === false && (
        <div>잠시 후, 시작됩니다. 화면을 집중해주세요!</div>
      )}
      {isInitailized && (
        <TaskBox
          session={trialSession}
          backCount={backCount}
          waitTime={waitTime}
          visibleTime={visibleTime}
          correctColor="bg-gray-300"
          wrongColor="bg-gray-300"
          showSubmissionStatus={false}
          setIsFinished={setIsFinished}
          addResult={() => {}}
        />
      )}
    </>
  );
}
