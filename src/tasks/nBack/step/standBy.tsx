import React from 'react';
import { Subject } from '../lib/type';
import Button from '../component/button';
import useTaskStore from '../store/taskStore';
import useAppStore from '../../../store/appStore';

export default function standBy() {
  const subject = useAppStore((state) => state.subject);
  const setTaskStep = useTaskStore((state) => state.setTaskStep);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div>Subject Name: {subject.label}</div>
      <div className="space-x-4">
        <Button label="홈" onClick={() => setTaskStep('home')} />
        <Button label="이름 재설정" onClick={() => setTaskStep('setup')} />
        <Button label="과제 시작" onClick={() => setTaskStep('explain')} />
      </div>
    </div>
  );
}
