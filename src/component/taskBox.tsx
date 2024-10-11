import { useEffect, useRef, useState } from 'react';
import { DIFF_FLAG, NONE_FLAG, SAME_FLAG } from '../lib/type';

const SAME_FLAG_CODE = 'ControlRight';
const DIFF_FLAG_CODE = 'ControlLeft';

export default function taskBox({
  taskList,
  waitTime,
  visibleTime,
  setIsFinished,
  save,
}: {
  taskList: number[];
  waitTime: number;
  visibleTime: number;
  setIsFinished: (isFinished: boolean) => void;
  save: (taskIndex: number, submittedAnswer: string, duration: number) => void;
}) {
  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const submittedAnswerRef = useRef<string | undefined>(undefined);
  const initialTimeRef = useRef<number>(window.performance.now());
  const durationRef = useRef<number>(-1);
  const visibleTimer = useRef<number>();

  useEffect(() => {
    if (index >= taskList.length) {
      setIsFinished(true);
      return undefined;
    }

    visibleTimer.current = window.setTimeout(() => {
      setIsVisible(false);

      visibleTimer.current = window.setTimeout(() => {
        save(
          index,
          submittedAnswerRef.current || NONE_FLAG,
          durationRef.current
        );
        setIsVisible(true);
        setIndex((prev) => prev + 1);
        initialTimeRef.current = window.performance.now();
        submittedAnswerRef.current = undefined;
        durationRef.current = -1;
      }, waitTime);
    }, visibleTime);

    return () => window.clearTimeout(visibleTimer.current);
  }, [index]);

  // key event
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (submittedAnswerRef.current) return; //

      if (e.code === DIFF_FLAG_CODE) {
        submittedAnswerRef.current = DIFF_FLAG;
        durationRef.current = window.performance.now() - initialTimeRef.current;
      } else if (e.code === SAME_FLAG_CODE) {
        submittedAnswerRef.current = SAME_FLAG;
        durationRef.current = window.performance.now() - initialTimeRef.current;
      }
    };
    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  return <div>{isVisible ? taskList.at(index) : '+'}</div>;
}
