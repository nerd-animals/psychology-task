import React from 'react';
import { AppStep, Subject } from '../lib/type';
import Button from '../component/button';

export default function standBy({
  subject,
  setAppStep,
}: {
  subject: Subject;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div>Subject Name: {subject.subjectLabel}</div>
      <div className="space-x-4">
        <Button label="홈" onClick={() => setAppStep('home')} />
        <Button label="이름 재설정" onClick={() => setAppStep('setup')} />
        <Button label="과제 시작" onClick={() => setAppStep('explain')} />
      </div>
    </div>
  );
}
