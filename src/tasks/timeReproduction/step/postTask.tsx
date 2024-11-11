import React, { useEffect } from 'react';
import { CSVDownload } from 'react-csv';
import { AppSetting, AppStep, Subject, Result } from '../lib/type';
import Button from '../component/button';

export default function postTask({
  appSetting,
  subject,
  resultList,
  clearResultList,
  setAppStep,
}: {
  appSetting: AppSetting;
  subject: Subject;
  resultList: Result[];
  clearResultList: () => void;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  useEffect(() => {
    clearResultList();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-3xl" style={{ marginBottom: '3vh' }}>
        수고하셨습니다.
      </div>
      {resultList.length > 0 && (
        <CSVDownload
          data={resultList.map((result) => ({
            name: subject.subjectLabel,
            date: subject.date.toLocaleString(),
            initializeTime: appSetting.initializeTime,
            sessionChangeTime: appSetting.sessionChangeTime,
            ...result,
            sessionIndex: result.sessionIndex + 1,
            taskIndex: result.taskIndex + 1,
            diff: result.submittedAnswer - result.value,
          }))}
          target="_blank"
        />
      )}
      <Button label="메인으로 돌아가기" onClick={() => setAppStep('home')} />
    </div>
  );
}
