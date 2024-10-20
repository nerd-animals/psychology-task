import React, { useState } from 'react';
import { AppStep, AppSetting } from '../lib/type';
import Button from '../component/button';
import Modal from '../component/modal';

export default function home({
  appSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
  const isReady = () => {
    if (appSetting.trialSession.taskList.length === 0) return false;
    if (appSetting.sessionList.length === 0) return false;
    if (appSetting.sessionList.some((session) => session.taskList.length === 0))
      return false;
    return true;
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModelOpen(false);
        }}
        title="설정을 완료해주세요!"
        message="연습 문제와 본 문제가 설정되어야 시작할 수 있습니다."
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-center">N back Task</h1>
        <div className="flex space-x-4">
          <Button
            label="Start"
            onClick={() => {
              if (isReady()) {
                setAppStep('setup');
              } else {
                setIsModelOpen(true);
              }
            }}
          />
          <Button label="Setting" onClick={() => setAppStep('setting')} />
        </div>
      </div>
    </>
  );
}
