import React, { useState } from 'react';
import { AppStep } from '../lib/type';

export default function explain({
  setAppStep,
}: {
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const [index, setIndex] = useState<number>(0);
  const explainList = [
    // 기본 설명
    () => (
      <div className="space-y-4">
        <p>
          컴퓨터 화면 중앙에 빨간색 사각형이 일정 시간 동안 나타났다가
          사라집니다.
        </p>
        <p>도형이 사라지면 아래에 &quot;시작&quot; 버튼이 나타납니다.</p>
        <p>
          본 과제는 버튼을 눌러 앞서 제시된 도형의 지속시간을 동일하게 산출하는
          과제입니다.
        </p>
      </div>
    ),
    () => (
      <div className="space-y-4">
        <p>지금부터 연습을 시작하겠습니다.</p>
        <p>
          &quot;시작&quot; 버튼을 누르면 도형이 나타나고 앞서 제시된 도형의
          지속시간과 동일하다고 판단될 때, &quot;중지&quot; 버튼을 누르세요.
        </p>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={() => setAppStep('trial')}
          >
            연습 과제 시작하기
          </button>
        </div>
      </div>
    ),
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* 중간 설명 영역 (스크롤 가능) */}
      <div className="flex-grow overflow-y-auto my-4 px-4 flex flex-col items-center text-center">
        {explainList[index]()}
      </div>

      {/* 하단 좌우 버튼 */}
      <div className="flex justify-between px-4 py-2 absolute bottom-2 left-1 right-1">
        <button
          type="button"
          className={`bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ${index === 0 ? 'invisible' : ''}`}
          onClick={() => setIndex((prev) => prev - 1)}
        >
          이전
        </button>
        <div>
          {index + 1}/{explainList.length}
        </div>
        <button
          type="button"
          className={`bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ${index === explainList.length - 1 ? 'invisible' : ''}`}
          onClick={() => setIndex((prev) => prev + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
}
