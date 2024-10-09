import React, { useState, useEffect, useRef } from 'react';
import TaskBox from '../component/taskBox';
import { AppSetting, AppStep, Subject } from '../lib/type';

export default function trial({
  appSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const { trialList, initializeTime, waitTime, visibleTime } = appSetting;
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isInitailized, setIsInitailized] = useState<boolean>(false);
  const initialTimer = useRef<number>();

  // initialize
  useEffect(() => {
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
      <div>예시</div>
      {isInitailized === false || isFinished ? (
        <div>끝</div>
      ) : (
        <TaskBox
          taskList={trialList}
          waitTime={waitTime}
          visibleTime={visibleTime}
          setIsFinished={setIsFinished}
          save={(value: number, submittedCode: string, duration: number) =>
            console.log('saved!')
          }
        />
      )}
    </>
  );
}
