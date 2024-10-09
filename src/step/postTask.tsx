import React from 'react';
import { AppStep } from '../lib/type';

export default function postTask({
  startDate,
  setAppStep,
}: {
  startDate: React.ForwardedRef<Date>;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  console.log(startDate);
  return (
    <>
      <div>this is post-task page</div>
      <button type="button" onClick={() => setAppStep('home')}>
        go Home
      </button>
    </>
  );
}
