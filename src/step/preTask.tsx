import React from 'react';
import { AppStep } from '../lib/type';

export default function preTask({
  setAppStep,
}: {
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return (
    <>
      <div>this is pre-task page</div>
      <button type="button" onClick={() => setAppStep('task')}>
        do task
      </button>
    </>
  );
}
