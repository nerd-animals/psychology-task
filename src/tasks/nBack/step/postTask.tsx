import React, { useEffect } from 'react';
import { CSVDownload } from 'react-csv';
import { TaskSetting, TaskStep, Subject, Result } from '../lib/type';
import Button from '../component/button';
import useTaskStore from '../store/taskStore';

export default function postTask({ subject }: { subject: Subject }) {
  const taskSetting = useTaskStore((state) => state.taskSetting);
  const setTaskStep = useTaskStore((state) => state.setTaskStep);
  const resultList = useTaskStore((state) => state.resultList);
  const clearResultList = useTaskStore((state) => state.clearResult);
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
            backCount: taskSetting.backCount,
            initializeTime: taskSetting.initializeTime,
            sessionChangeTime: taskSetting.sessionChangeTime,
            visibleTime: taskSetting.visibleTime,
            waitTime: taskSetting.waitTime,
            ...result,
            sessionIndex: result.sessionIndex + 1,
            taskIndex: result.taskIndex + 1,
            score: result.solution === result.submittedAnswer ? 1 : 0,
          }))}
          target="_blank"
        />
      )}
      <Button label="메인으로 돌아가기" onClick={() => setTaskStep('home')} />
    </div>
  );
}
