import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DIFF_FLAG, NONE_FLAG, SAME_FLAG } from '../lib/type';
import useSessionStore from '../store/sessionStore';
import useTaskStore from '../store/taskStore';

const SAME_FLAG_CODE = 'Slash';
const DIFF_FLAG_CODE = 'KeyZ';
const SHOW_SUBMISSION_STATUS_DURATION = 1000;

function solve(backCount: number, taskList: number[]) {
  const solutionList = taskList.map((value, index) => {
    if (index < backCount) {
      return NONE_FLAG;
    }
    const nBackValue = taskList.at(index - backCount);

    if (value === nBackValue) {
      return SAME_FLAG;
    }
    return DIFF_FLAG;
  });

  return solutionList;
}

export default function SessionExecutor() {
  const sessionList = useSessionStore((state) => state.sessionList);
  const sessionIndex = useSessionStore((state) => state.sessionIndex);
  const setSessionState = useSessionStore((state) => state.setSessionState);
  const taskSetting = useTaskStore((state) => state.taskSetting);
  const addResult = useTaskStore((state) => state.addResult);

  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [displaySubmissionStatus, setDisplaySubmissionStatus] =
    useState<boolean>(false);
  const [color, setColor] = useState<string>('');
  const submittedAnswerRef = useRef<string | undefined>(undefined);
  const initialTimeRef = useRef<number>(window.performance.now());
  const durationRef = useRef<number>(-1);
  const visibleTimer = useRef<number>();

  const { taskList, bgColorType, showBackCountToast, showButtonClicked } =
    sessionList[sessionIndex];
  const solutionList = solve(taskSetting.backCount, taskList);

  const notifyBackCount = () => {
    toast(`${taskSetting.backCount + 1}번째부터 응답 가능합니다.`);
  };
  const appendResult = () => {
    addResult({
      sessionIndex: sessionIndex + 1,
      index: index + 1,
      value: taskList[index],
      solution: solutionList[index],
      submittedAnswer: submittedAnswerRef.current || NONE_FLAG,
      duration: durationRef.current,
    });
  };

  const displayResult = () => {
    if (bgColorType === 'None') {
      return;
    }
    if (submittedAnswerRef.current === solutionList[index]) {
      setColor(bgColorType === 'Gray' ? 'bg-gray-200' : 'bg-green-400');
    } else {
      setColor(bgColorType === 'Gray' ? 'bg-gray-200' : 'bg-red-400');
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
      setSessionState('end');
      return undefined;
    }

    visibleTimer.current = window.setTimeout(() => {
      setIsVisible(false);

      visibleTimer.current = window.setTimeout(() => {
        if (
          showButtonClicked &&
          index >= taskSetting.backCount &&
          submittedAnswerRef.current === undefined
        ) {
          setDisplaySubmissionStatus(true);
          window.setTimeout(() => {
            setDisplaySubmissionStatus(false);
            finalize();
          }, SHOW_SUBMISSION_STATUS_DURATION);
        } else {
          finalize();
        }
      }, taskSetting.waitTime);
    }, taskSetting.visibleTime);

    return () => window.clearTimeout(visibleTimer.current);
  }, [index]);

  // key event
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (submittedAnswerRef.current || displaySubmissionStatus) return;

      if (e.code === DIFF_FLAG_CODE) {
        submittedAnswerRef.current = DIFF_FLAG;
        durationRef.current = window.performance.now() - initialTimeRef.current;
      } else if (e.code === SAME_FLAG_CODE) {
        submittedAnswerRef.current = SAME_FLAG;
        durationRef.current = window.performance.now() - initialTimeRef.current;
      }

      if (index >= taskSetting.backCount) {
        displayResult();
      } else if (showBackCountToast) {
        notifyBackCount();
      }
    };
    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, [index, displaySubmissionStatus]);

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center ${color} cursor-none`}
    >
      {displaySubmissionStatus && <div>응답하지 않았습니다.</div>}
      {displaySubmissionStatus === false && (
        <div
          style={{
            fontSize: 'min(20vw, 20vh)',
          }}
        >
          {isVisible ? taskList[index] : '+'}
        </div>
      )}
      <ToastContainer
        style={{ width: '40vw' }}
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
