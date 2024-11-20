import React, { ChangeEvent, useRef } from 'react';
import Button from '../component/button';
import useTaskStore from '../store/taskStore';
import useAppStore from '../../../store/appStore';

export default function setup() {
  const setSubject = useAppStore((state) => state.setSubejct);
  const setTaskStep = useTaskStore((state) => state.setTaskStep);
  const inputRef = useRef<string>('');

  const initializeSubject = () => {
    // todo: inputRef가 비어있을 때, toast ui로 경고 띄우기

    setSubject({
      label: inputRef.current || 'NULL',
      date: new Date(),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div>피실험자의 이름 또는 ID를 입력해주세요.</div>
      <div>
        <input
          className="m-1"
          type="text"
          placeholder="Enter Subject Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            inputRef.current = e.target.value;
          }}
        />
      </div>
      <Button
        label="설정 완료"
        onClick={() => {
          initializeSubject();
          setTaskStep('stand-by');
        }}
      />
    </div>
  );
}
