import React from 'react';
import { AppStep, Subject } from '../lib/type';

export default function standBy({
  subject,
  setAppStep,
}: {
  subject: Subject;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return (
    <>
      <div>대기 화면 & 이름 재설정 버튼</div>
      <div>Subject Name: {subject.subjectLabel}</div>
      <button type="button" onClick={() => setAppStep('explain')}>
        start
      </button>
    </>
  );
}
