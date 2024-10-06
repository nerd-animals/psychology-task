import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/appContext';

export default function task() {
  const { backCount, taskSet, waitTime, visibleTime } = useAppContext();
  const [value, setValue] = useState<number>(-1);
  const [index, setIndex] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [initialTime, setInitialTime] = useState<Date>(new Date());
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const waitTimer = useRef<number>();
  const visibleTimer = useRef<number>();

  useEffect(() => {
    if (index === taskSet?.length) {
      setIsFinished(true);
      return undefined;
    }

    setValue(taskSet.at(index) || -1);
    setIsVisible(true);

    visibleTimer.current = window.setTimeout(() => {
      setIsVisible(false);
      // +일때 응답을 받는지에 따라서 결정
      // if (index === taskSet.length - 1) {
      //   setIsFinished(true);
      // }
    }, visibleTime);

    waitTimer.current = window.setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, waitTime);

    return () => {
      window.clearTimeout(visibleTimer.current);
      window.clearTimeout(waitTimer.current);
    };
  }, [index]);

  return (
    <>
      <div>this is task page</div>
      <div>{isVisible ? value : '+'}</div>
      {isFinished ? <Link to="/post-task">end</Link> : undefined}
    </>
  );
}
