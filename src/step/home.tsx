import React from 'react';
import { AppStep, AppSetting } from '../lib/type';
import Button from '../component/button';

export default function home({
  appSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const isReady = () => {
    if (appSetting.sessionList.length === 0) return false;
    if (appSetting.sessionList.some((session) => session.taskList.length === 0))
      return false;
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold text-center">N back Task</h1>
      <div className="flex space-x-4">
        <Button
          label="Start"
          onClick={() => {
            if (isReady()) {
              setAppStep('setup');
            } else {
              // todo: 설정 알림
            }
          }}
        />
        <Button label="Setting" onClick={() => setAppStep('setting')} />
      </div>
    </div>
  );
}
