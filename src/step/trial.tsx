import React from 'react';
import { AppSetting, AppStep, Subject } from '../lib/type';

export default function trial({
  appSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return (
    <>
      <div>예시</div>
      <button type="button" onClick={() => setAppStep('pre-task')}>
        start
      </button>
    </>
  );
}
