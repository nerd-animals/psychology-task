import React from 'react';
import { AppSetting, AppStep } from '../lib/type';

export default function explain({
  appSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return (
    <>
      <div>과제 설명</div>
      <button type="button" onClick={() => setAppStep('trial')}>
        start
      </button>
    </>
  );
}
