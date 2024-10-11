import React from 'react';
import { AppStep } from '../lib/type';
import Button from '../component/button';

export default function preTask({
  setAppStep,
}: {
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return <Button label="본 과제 시작하기" onClick={() => setAppStep('task')} />;
}
