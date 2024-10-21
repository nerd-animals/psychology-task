import { useEffect, useRef, useState } from 'react';
import { DIFF_FLAG, NONE_FLAG, SAME_FLAG, Session, Result } from '../lib/type';

const SAME_FLAG_CODE = 'Slash';
const DIFF_FLAG_CODE = 'KeyZ';

export default function taskBox({
  session,
  backCount,
  waitTime,
  visibleTime,
  correctColor,
  wrongColor,
  setIsFinished,
  addResult,
}: {
  session: Session;
  backCount: number;
  waitTime: number;
  visibleTime: number;
  correctColor: string;
  wrongColor: string;
  setIsFinished: (isFinished: boolean) => void;
  addResult: (result: Result) => void;
}) {
  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [color, setColor] = useState<string>('');
  const submittedAnswerRef = useRef<string | undefined>(undefined);
  const initialTimeRef = useRef<number>(window.performance.now());
  const durationRef = useRef<number>(-1);
  const visibleTimer = useRef<number>();
  const { sessionIndex, taskList, solutionList } = session;

  const appendResult = () => {
    const result: Result = {
      sessionIndex,
      taskIndex: index,
      value: taskList[index],
      solution: solutionList[index],
      submittedAnswer: submittedAnswerRef.current || NONE_FLAG,
      duration: durationRef.current,
    };
    addResult(result);
  };

  const displayResult = () => {
    if (submittedAnswerRef.current === solutionList[index]) {
      setColor(correctColor);
    } else {
      setColor(wrongColor);
    }
  };

  useEffect(() => {
    if (index >= taskList.length) {
      setIsFinished(true);
      return undefined;
    }

    visibleTimer.current = window.setTimeout(() => {
      setIsVisible(false);

      visibleTimer.current = window.setTimeout(() => {
        appendResult();
        setIsVisible(true);
        setIndex((prev) => prev + 1);
        setColor('');
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

      if (index >= backCount) {
        displayResult();
      }
    };
    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, [index]);

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center ${color}`}
      style={{
        fontSize: 'min(20vw, 20vh)',
      }}
    >
      {isVisible ? taskList[index] : '+'}
    </div>
  );
}
