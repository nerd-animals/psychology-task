import React, { ChangeEvent, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { AppStep, Subject } from '../lib/type';

export default function setup({
  setSubject,
  setAppStep,
}: {
  setSubject: React.Dispatch<React.SetStateAction<Subject>>;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const inputRef = useRef<string>('');

  const initializeSubject = () => {
    setSubject({
      subjectId: uuid(),
      subjectLabel: inputRef.current,
      result: [],
    });
  };

  return (
    <>
      <div>사용자 설정 화면</div>
      <input
        type="text"
        placeholder="Enter Subject Name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          inputRef.current = e.target.value;
        }}
      />
      <button
        type="button"
        onClick={() => {
          initializeSubject();
          setAppStep('stand-by');
        }}
      >
        complete
      </button>
    </>
  );
}
