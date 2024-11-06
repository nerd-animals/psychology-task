import React from 'react';
import { AppStep } from '../lib/type';

export default function preFinalTrial({
  setAppStep,
}: {
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <p>지금부터 본 과제와 동일한 방식으로 연습을 시작하겠습니다.</p>
      <p>본 과제에서는 정답 여부를 알려주지 않으며 제출 여부만 표시됩니다.</p>
      <p />
      <p>연습 과제를 시작하려면 아래의 버튼을 눌러주세요.</p>
      <p />
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={() => setAppStep('final-trial')}
        >
          연습 과제 시작하기
        </button>
      </div>
    </div>
  );
}
