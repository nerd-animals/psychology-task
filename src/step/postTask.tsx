import React, { useEffect, useState } from 'react';
import { AppStep, Subject, Result } from '../lib/type';

export default function postTask({
  subject,
  resultList,
  clearResultList,
  setAppStep,
}: {
  subject: Subject;
  resultList: Result[];
  clearResultList: () => void;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    console.log(resultList);
    clearResultList();
    console.log(resultList);
  }, []);

  return (
    <>
      <div>this is post-task page</div>
      <button type="button" onClick={() => setAppStep('home')}>
        go Home
      </button>
    </>
  );
}
