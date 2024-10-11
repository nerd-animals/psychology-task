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
    <>
      <div>N-back Task</div>
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
    </>
  );
}
