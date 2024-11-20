import React from 'react';
import useTaskStore from '../store/taskStore';

export default function preTask() {
  const taskSetting = useTaskStore((state) => state.taskSetting);
  const setTaskStep = useTaskStore((state) => state.setTaskStep);
  const { backCount } = taskSetting;

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <p>연습이 종료되었습니다.</p>
      <p>본 과제에서는 정답 여부를 알려주지 않으며 제출 여부만 표시됩니다.</p>
      <p />
      <p>{'<과제 설명>'}</p>
      <p>
        일련의 숫자가 제시되면 {backCount + 1}번째 숫자부터 아래의 키를
        눌러주세요.
      </p>
      <ul className="pl-5 list-disc">
        <li>
          &quot;/&quot; : 현재 화면에 표시된 숫자가 {backCount}번째 전에 제시된
          숫자와 같을 때
        </li>
        <li>
          &quot;z&quot; : 현재 화면에 표시된 숫자가 {backCount}번째 전에 제시된
          숫자와 다를 때
        </li>
      </ul>
      <p />
      <p>아래의 버튼을 클릭하면 본 과제가 시작됩니다.</p>

      <div className="flex items-center justify-center">
        <button
          type="button"
          className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
          onClick={() => setTaskStep('task')}
        >
          본 과제 시작하기
        </button>
      </div>
    </div>
  );
}
