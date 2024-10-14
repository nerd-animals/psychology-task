import React from 'react';
import { AppStep } from '../lib/type';
import Button from '../component/button';

export default function preTask({
  setAppStep,
}: {
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center p-2 space-y-4">
      <Button label="본 과제 시작하기" onClick={() => setAppStep('task')} />
    </div>
  );
}
