import React, { useEffect, useRef, useState } from 'react';
import { Result, AppSetting, AppStep, Subject } from '../lib/type';

export default function task({
  appSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
  setSubject: React.Dispatch<React.SetStateAction<Subject>>;
}) {
  const { taskSet, waitTime, visibleTime, sessionChangeTime } = appSetting;
  const [sessionIndex, setSessionIndex] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSessionChanging, setIsSessionChanging] = useState<boolean>(false);
  const visibleTimer = useRef<number>();
  const sessionChangeTimer = useRef<number>();
  const isSubmittedRef = useRef<string | undefined>(undefined);
  const initialTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  const resultListRef = useRef<Result[]>([]);

  const getDisplayedValue = () => {
    if (isSessionChanging) {
      return 'session changing';
    }
    return isVisible ? taskSet[sessionIndex].at(index) : '+';
  };

  const saveResult = () => {
    if (index === 0) return;

    const result: Result = {
      sessionIndex,
      number: taskSet[sessionIndex][index - 1],
      submitCode: isSubmittedRef.current,
      duration: durationRef.current,
    };
    resultListRef.current.push(result);
  };

  useEffect(() => {
    if (index >= taskSet[sessionIndex].length) {
      return undefined;
    }

    visibleTimer.current = window.setTimeout(() => {
      saveResult();

      setIsVisible(true);
      initialTimeRef.current = window.performance.now();
      isSubmittedRef.current = undefined;
      durationRef.current = -1;

      visibleTimer.current = window.setTimeout(() => {
        setIsVisible(false);
        setIndex((prev) => prev + 1);
      }, visibleTime);
    }, waitTime);

    return () => {
      window.clearTimeout(visibleTimer.current);
    };
  }, [index]);

  // session change
  useEffect(() => {
    if (index < taskSet[sessionIndex].length) {
      return undefined;
    }

    if (sessionIndex < taskSet.length - 1) {
      sessionChangeTimer.current = window.setTimeout(() => {
        setIsSessionChanging(true);
        saveResult();
        sessionChangeTimer.current = window.setTimeout(() => {
          setIsSessionChanging(false);
          setSessionIndex((prev) => prev + 1);
          setIndex(0);
        }, sessionChangeTime);
      }, waitTime);
    } else {
      sessionChangeTimer.current = window.setTimeout(() => {
        saveResult();
        setAppStep('pre-task');
        setAppStep('post-task');
      }, waitTime);
    }

    return () => window.clearTimeout(sessionChangeTimer.current);
  }, [index]);

  // key event
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (isSubmittedRef.current || isSessionChanging) return; //

      if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
        isSubmittedRef.current = e.code;
        durationRef.current = window.performance.now() - initialTimeRef.current;
      }
    };
    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, [isSessionChanging]);

  return (
    <>
      <div>this is task page</div>
      <div>{getDisplayedValue()}</div>
    </>
  );
}
