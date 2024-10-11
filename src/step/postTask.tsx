import React, { useEffect } from 'react';
import { CSVDownload } from 'react-csv';
import { AppStep, Subject, Result } from '../lib/type';
import Button from '../component/button';

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
  useEffect(() => {
    clearResultList();
  }, []);

  return (
    <>
      <div>Thank you</div>
      {resultList.length && (
        <CSVDownload
          data={resultList.map((result) => ({
            name: subject.subjectLabel,
            date: subject.date.toLocaleString(),
            ...result,
          }))}
          target="_blank"
        />
      )}
      <Button label="메인으로 돌아가기" onClick={() => setAppStep('home')} />
    </>
  );
}
