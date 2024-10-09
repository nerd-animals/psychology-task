import React from 'react';
import { AppStep } from '../lib/type';

export default function home({
  setAppStep,
}: {
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return (
    <>
      <div>과제 제목 & 설명 링크</div>
      <button type="button" onClick={() => setAppStep('setup')}>
        start
      </button>
      <button type="button" onClick={() => setAppStep('setting')}>
        setting
      </button>
    </>
  );
}
