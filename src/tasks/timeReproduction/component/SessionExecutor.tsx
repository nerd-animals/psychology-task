import { useEffect, useRef, useState } from 'react';
import useSessionStore from '../store/sessionStore';
import useTaskStore from '../store/taskStore';

const SQUARE_SIZE = 30;

function Box(isVisible: boolean, color: string) {
  return (
    <div
      className={
        isVisible ? `flex items-center justify-center ${color}` : 'invisible'
      }
      style={{
        width: `${SQUARE_SIZE}vw`,
        height: `${SQUARE_SIZE}vh`,
        maxWidth: `min(${SQUARE_SIZE}vw, ${SQUARE_SIZE}vh)`,
        maxHeight: `min(${SQUARE_SIZE}vw, ${SQUARE_SIZE}vh)`,
        marginBottom: '5vh',
      }}
    />
  );
}
export default function SessionExecutor() {
  const sessionList = useSessionStore((state) => state.sessionList);
  const sessionIndex = useSessionStore((state) => state.sessionIndex);
  const setSessionState = useSessionStore((state) => state.setSessionState);
  const taskSetting = useTaskStore((state) => state.taskSetting);
  const addResult = useTaskStore((state) => state.addResult);

  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
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
    setIsWaiting(true);
  };

  useEffect(() => {
    if (index >= taskList.length) {
      setSessionState('end');
      return undefined;
    }

    visibleTimer.current = window.setTimeout(() => {
      setIsVisible(true);
      setIsWaiting(false);
      visibleTimer.current = window.setTimeout(() => {
        setIsVisible(false);
        setIsActive(true);
      }, taskList[index]);
    }, taskSetting.waitTime);

    return () => window.clearTimeout(visibleTimer.current);
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center">
      {isWaiting ? (
        <div
          style={{
            fontSize: 'min(20vw, 20vh)',
          }}
        >
          +
        </div>
      ) : (
        Box(isVisible, 'bg-red-300')
      )}
      <button
        className={
          isActive
            ? 'px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600'
            : 'invisible'
        }
        type="button"
        onClick={isVisible ? handleEnd : handleStart}
      >
        {isVisible ? '정지' : '시작'}
      </button>
    </div>
  );
}
