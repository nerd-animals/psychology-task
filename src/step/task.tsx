import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Result, AppSetting, AppStep, Subject } from '../lib/type';
import TaskBox from '../component/taskBox';

export default function task({
  appSetting,
  addResult,
  setAppStep,
}: {
  appSetting: AppSetting;
  addResult: (result: Result) => void;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const { taskList, initializeTime, waitTime, visibleTime, sessionChangeTime } =
    appSetting;
  const [isInitailized, setIsInitailized] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [sessionIndex, setSessionIndex] = useState<number>(0);
  const initialTimer = useRef<number>();
  const sessionTimer = useRef<number>();

  const save = (value: number, submittedCode: string, duration: number) => {
    addResult({ sessionIndex, value, submittedCode, duration });
  };

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

    if (sessionIndex < taskList.length - 1) {
      sessionTimer.current = window.setTimeout(() => {
        setSessionIndex((prev) => prev + 1);
        setIsFinished(false);
      }, sessionChangeTime);
    } else {
      setAppStep('post-task');
    }

    return () => window.clearTimeout(sessionTimer.current);
  }, [isFinished]);

  return (
    <>
      <div>main task</div>
      {isInitailized === false || isFinished ? (
        <div>session 변경 중입니다</div>
      ) : (
        <TaskBox
          taskList={taskList[sessionIndex]}
          waitTime={waitTime}
          visibleTime={visibleTime}
          setIsFinished={setIsFinished}
          save={save}
        />
      )}
    </>
  );
}
