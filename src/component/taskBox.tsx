import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DIFF_FLAG, NONE_FLAG, SAME_FLAG, Session, Result } from '../lib/type';

const SAME_FLAG_CODE = 'Slash';
const DIFF_FLAG_CODE = 'KeyZ';
const SHOW_SUBMISSION_STATUS_DURATION = 1000;

export default function taskBox({
  session,
  backCount,
  waitTime,
  visibleTime,
  correctColor,
  wrongColor,
  showSubmissionStatus,
  setIsFinished,
  addResult,
}: {
  session: Session;
  backCount: number;
  waitTime: number;
  visibleTime: number;
  correctColor: string;
  wrongColor: string;
  showSubmissionStatus: boolean;
  setIsFinished: (isFinished: boolean) => void;
  addResult: (result: Result) => void;
}) {
  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);
  const [color, setColor] = useState<string>('');
  const submittedAnswerRef = useRef<string | undefined>(undefined);
  const initialTimeRef = useRef<number>(window.performance.now());
  const durationRef = useRef<number>(-1);
  const visibleTimer = useRef<number>();
  const { sessionIndex, taskList, solutionList } = session;

  const notifyBackCount = () => {
    toast(`${backCount + 1}번째부터 응답 가능합니다.`);
  };
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

  const finalize = () => {
    appendResult();
    setIsVisible(true);
    setIndex((prev) => prev + 1);
    setColor('');

    initialTimeRef.current = window.performance.now();
    submittedAnswerRef.current = undefined;
    durationRef.current = -1;
  };

  useEffect(() => {
    if (index >= taskList.length) {
      setIsFinished(true);
      return undefined;
    }

    visibleTimer.current = window.setTimeout(() => {
      setIsVisible(false);

      visibleTimer.current = window.setTimeout(() => {
        if (
          showSubmissionStatus &&
          index >= backCount &&
          submittedAnswerRef.current === undefined
        ) {
          setIsSubmitted(false);
          window.setTimeout(() => {
            setIsSubmitted(true);
            finalize();
          }, SHOW_SUBMISSION_STATUS_DURATION);
        } else {
          finalize();
        }
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
      } else if (showSubmissionStatus) {
        notifyBackCount();
      }
    };
    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, [index]);

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center ${color}`}
    >
      {isSubmitted === false && <div>응답하지 않았습니다.</div>}
      {isSubmitted && (
        <div
          style={{
            fontSize: 'min(20vw, 20vh)',
          }}
        >
          {isVisible ? taskList[index] : '+'}
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        limit={1}
        hideProgressBar
        closeOnClick={false}
        autoClose={SHOW_SUBMISSION_STATUS_DURATION}
        theme="light"
      />
    </div>
  );
}
