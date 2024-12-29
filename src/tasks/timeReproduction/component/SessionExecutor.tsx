import { useEffect, useRef, useState } from 'react';
import useSessionStore from '../store/sessionStore';
import useTaskStore from '../store/taskStore';

const SQUARE_SIZE = 30;

export default function SessionExecutor() {
  const sessionList = useSessionStore((state) => state.sessionList);
  const sessionIndex = useSessionStore((state) => state.sessionIndex);
  const setSessionState = useSessionStore((state) => state.setSessionState);
  const taskSetting = useTaskStore((state) => state.taskSetting);
  const addResult = useTaskStore((state) => state.addResult);

  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const initialTimeRef = useRef<number>(window.performance.now());
  const visibleTimer = useRef<number>();
  const { taskList } = sessionList[sessionIndex];

  const appendResult = () => {
    addResult({
      sessionIndex: sessionIndex + 1,
      index: index + 1,
      value: taskList[index],
      submittedAnswer: window.performance.now() - initialTimeRef.current,
    });
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
      setSessionState('end');
      return undefined;
    }

    visibleTimer.current = window.setTimeout(() => {
      setIsVisible(true);
      visibleTimer.current = window.setTimeout(() => {
        setIsVisible(false);
        setIsActive(true);
      }, taskList[index]);
    }, taskSetting.waitTime);

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
          className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
          type="button"
          onClick={isVisible ? handleEnd : handleStart}
        >
          {isVisible ? '정지' : '시작'}
        </button>
      )}
    </div>
  );
}
