import { useEffect, useRef, useState } from 'react';
import { Session, Result } from '../lib/type';

const SQUARE_SIZE = 30;

export default function taskBox({
  session,
  waitTime,
  setIsFinished,
  addResult,
}: {
  session: Session;
  waitTime: number;
  setIsFinished: (isFinished: boolean) => void;
  addResult: (result: Result) => void;
}) {
  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const initialTimeRef = useRef<number>(window.performance.now());
  const visibleTimer = useRef<number>();
  const { sessionIndex, taskList } = session;

  const appendResult = () => {
    const result: Result = {
      sessionIndex,
      taskIndex: index,
      value: taskList[index],
      submittedAnswer: window.performance.now() - initialTimeRef.current,
    };
    addResult(result);
  };

  const handleStart = () => {
    setIsVisible(true);
    initialTimeRef.current = window.performance.now();
  };

  const handleEnd = () => {
    appendResult();
    setIndex((prev) => prev + 1);
    setIsVisible(false);
    setIsActive(false);
  };

  useEffect(() => {
    if (index >= taskList.length) {
      setIsFinished(true);
      return undefined;
    }

    visibleTimer.current = window.setTimeout(() => {
      setIsVisible(true);
      visibleTimer.current = window.setTimeout(() => {
        setIsVisible(false);
        setIsActive(true);
      }, taskList[index]);
    }, waitTime);

    return () => window.clearTimeout(visibleTimer.current);
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={
          isVisible
            ? 'flex items-center justify-center bg-red-300'
            : 'invisible'
        }
        style={{
          width: `${SQUARE_SIZE}vw`,
          height: `${SQUARE_SIZE}vh`,
          maxWidth: `min(${SQUARE_SIZE}vw, ${SQUARE_SIZE}vh)`,
          maxHeight: `min(${SQUARE_SIZE}vw, ${SQUARE_SIZE}vh)`,
          marginBottom: '5vh',
        }}
      />

      {isActive && (
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          type="button"
          onClick={isVisible ? handleEnd : handleStart}
        >
          {isVisible ? '정지' : '시작'}
        </button>
      )}
    </div>
  );
}
