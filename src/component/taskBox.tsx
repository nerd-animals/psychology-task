import { useEffect, useRef, useState } from 'react';

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
  save: (value: number, submittedCode: string, duration: number) => void;
}) {
  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const submittedCodeRef = useRef<string | undefined>(undefined);
  const initialTimeRef = useRef<number>(window.performance.now());
  const durationRef = useRef<number>(-1);
  const visibleTimer = useRef<number>();

  const getDisplayedValue = () => (isVisible ? taskList.at(index) : '+');

  useEffect(() => {
    if (index >= taskList.length) {
      setIsFinished(true);
      return undefined;
    }

    visibleTimer.current = window.setTimeout(() => {
      setIsVisible(false);

      visibleTimer.current = window.setTimeout(() => {
        save(
          taskList[index],
          submittedCodeRef.current || '-',
          durationRef.current
        );
        setIsVisible(true);
        setIndex((prev) => prev + 1);
        initialTimeRef.current = window.performance.now();
        submittedCodeRef.current = undefined;
        durationRef.current = -1;
      }, waitTime);
    }, visibleTime);

    return () => window.clearTimeout(visibleTimer.current);
  }, [index]);

  // key event
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (submittedCodeRef.current) return; //

      if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
        submittedCodeRef.current = e.code;
        durationRef.current = window.performance.now() - initialTimeRef.current;
      }
    };
    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  return <div>{getDisplayedValue()}</div>;
}
