import React from 'react';
import { AppStep, AppSetting } from '../lib/type';

export default function preFinalTrial({
  appSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const { backCount } = appSetting;

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={() => setAppStep('final-trial')}
        >
          2번째 연습
        </button>
      </div>
    </div>
  );
}
