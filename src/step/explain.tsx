import React from 'react';
import { AppSetting, AppStep } from '../lib/type';
import Button from '../component/button';

export default function explain({
  appSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div>과제 설명</div>
      <Button label="과제 시작" onClick={() => setAppStep('task')} />
    </div>
  );
}
