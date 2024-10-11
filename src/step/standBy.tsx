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
    <>
      <div>
        <div>Subject Name: {subject.subjectLabel}</div>
        <Button label="이름 재설정" onClick={() => setAppStep('setup')} />
      </div>

      <Button label="과제 시작" onClick={() => setAppStep('explain')} />
    </>
  );
}
