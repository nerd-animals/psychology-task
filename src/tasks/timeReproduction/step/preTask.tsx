import React from 'react';
import { AppStep } from '../lib/type';

export default function preTask({
  setAppStep,
}: {
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <p>연습이 종료되었습니다.</p>
      <p />
      <p>{'<과제 설명>'}</p>
      <ol className="list-decimal pl-5">
        <li>화면에 빨간색 도형이 나타나고, 일정 시간 후에 사라집니다.</li>
        <li>도형이 사라지면, &quot;시작&quot; 버튼이 나타납니다.</li>
        <li>
          &quot;시작&quot; 버튼을 누르면 다시 도형이 나타나고, &quot;시작&quot;
          버튼이 &quot;중지&quot; 버튼으로 바뀝니다.
        </li>
        <li>
          앞서 제시된 도형이 나타난 시간과 같다고 생각될 때,&quot;중지&quot;
          버튼을 눌러주세요.
        </li>
      </ol>
      <p>아래의 버튼을 클릭하면 본 과제가 시작됩니다.</p>

      <div className="flex items-center justify-center">
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={() => setAppStep('task')}
        >
          본 과제 시작하기
        </button>
      </div>
    </div>
  );
}
