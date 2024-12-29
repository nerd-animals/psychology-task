import React, { useEffect } from 'react';
import { CSVDownload } from 'react-csv';
import useTaskStore from '../store/taskStore';
import useAppStore from '../../../store/appStore';

export default function ExportResult() {
  const subject = useAppStore((state) => state.subject);
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
            name: subject.label,
            date: subject.date.toLocaleString(),
            'back count': taskSetting.backCount,
            'Inter-Session Interval (ms)': taskSetting.initializeTime,
            'Stimulus Duration (ms)': taskSetting.visibleTime,
            'Inter-Stimulus Interval (ms)': taskSetting.waitTime,
            ...result,
            score: result.solution === result.submittedAnswer ? 1 : 0,
          }))}
          target="_blank"
        />
      )}
      <button type="button" onClick={() => setTaskStep('home')}>
        Home
      </button>
    </div>
  );
}
