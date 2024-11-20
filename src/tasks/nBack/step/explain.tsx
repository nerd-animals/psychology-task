import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import useTaskStore from '../store/taskStore';

const EXAMPLE = [2, 8, 2, 2, 7]; // only for 2, 3 case

export default function explain() {
  const setTaskStep = useTaskStore((state) => state.setTaskStep);
  const taskSetting = useTaskStore((state) => state.taskSetting);

  const { backCount } = taskSetting;
  const [index, setIndex] = useState<number>(0);

  const explainList = [
    // 기본 설명
    () => (
      <div className="space-y-4">
        <p>컴퓨터 화면 중앙에 일련의 숫자가 하나씩 차례대로 나타납니다.</p>
        <p>
          빠른 속도로 숫자가 표시되며, 다음 숫자가 나타나기 전에 과제를 수행해야
          합니다.
        </p>
        <p>
          과제는 현재 화면에 표시된 숫자와 {backCount}번째 전에 표시된 숫자를
          비교하여 일치 여부를 판단하는 것입니다.
        </p>
        <p>다음 설명을 위해 아래의 버튼을 눌러주세요.</p>
      </div>
    ),
    // 방법
    () => (
      <div className="space-y-4">
        <p>
          과제를 수행하기 위해 숫자의 일치 여부에 따라 적절한 키를 눌러야
          합니다.
        </p>
        <p>
          키는 숫자가 보인 순간부터 다음 숫자가 제시되기 전까지 누를 수
          있습니다. 일치 여부에 따라 다음의 키를 눌러주세요.
        </p>
        <ul className="list-disc list-inside">
          <li>
            &quot;/&quot; : 현재 화면에 표시된 숫자가 {backCount}번째 전에
            제시된 숫자와 같을 때
          </li>
          <li>
            &quot;z&quot; : 현재 화면에 표시된 숫자가 {backCount}번째 전에
            제시된 숫자와 다를 때
          </li>
        </ul>

        <p>다음 설명을 위해 아래의 버튼을 눌러주세요.</p>
      </div>
    ),
    // 정답이 없는 경우
    () => (
      <div className="space-y-4">
        <p>
          다음은 {EXAMPLE.join('-')} 순으로 숫자가 제시되었을 경우에 대한
          예시입니다.
        </p>
        <div className="flex items-center justify-center space-x-4">
          {EXAMPLE.map((number, i) => (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div
                key={uuid()}
                className={`flex flex-col items-center justify-center border border-gray-300 rounded-lg ${i < backCount ? 'bg-gray-300' : ''}`}
              >
                <div className="px-1 my-3 text-sm">{`${i + 1}번째 숫자`}</div>
                <div className="w-full h-0.5 bg-gray-400 my-1" />
                <div className="py-5 text-lg font-semibold">{number}</div>
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/images/arrow-up.png`}
                className={`w-8 h-8 ${i < backCount ? '' : 'invisible'}`}
                alt=""
              />
            </div>
          ))}
        </div>
        <p>
          1번째 숫자부터 {backCount}번째 숫자까지는 정답이 존재하지 않기 때문에
          어떤 버튼도 누르지 않습니다. 또한, 누르더라도 제출로 인식하지
          않습니다.
        </p>
      </div>
    ),
  ];

  // 나머지 예시
  for (let idx: number = backCount; idx < EXAMPLE.length; idx += 1) {
    const currentValue = EXAMPLE[idx];
    const prevValue = EXAMPLE[idx - backCount];
    const isSame = currentValue === prevValue;
    const bgColor = isSame ? 'bg-green-300' : 'bg-red-300';

    explainList.push(() => (
      <div className="space-y-4">
        <p>
          다음은 {EXAMPLE.join('-')} 순으로 숫자가 제시되었을 경우에 대한
          예시입니다.
        </p>
        <div className="flex items-center justify-center space-x-4">
          {EXAMPLE.map((number, i) => (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div
                key={uuid()}
                className={`flex flex-col items-center justify-center border border-gray-300 rounded-lg ${i === idx || i === idx - backCount ? bgColor : ''}`}
              >
                <div className="px-1 my-3 text-sm">{`${i + 1}번째 숫자`}</div>
                <div className="w-full h-0.5 bg-gray-400 my-1" />
                <div className="py-5 text-lg font-semibold">{number}</div>
              </div>{' '}
              <img
                src={`${process.env.PUBLIC_URL}/images/arrow-up.png`}
                className={`w-8 h-8 ${i === idx ? '' : 'invisible'}`}
                alt=""
              />
            </div>
          ))}
        </div>
        <p>
          {isSame
            ? `${idx + 1}번째 숫자는 ${backCount}번째 전에 제시된 값과 일치합니다.`
            : `${idx + 1}번째 숫자는 ${backCount}번째 전에 제시된 값과 일치하지 않습니다.`}
        </p>
        <p>
          {isSame
            ? `따라서, ${idx + 1}번째 숫자가 제시되었을 때, 다음 숫자가 나오기 전까지 "/"키를 눌러야 합니다.`
            : `따라서, ${idx + 1}번째 숫자가 제시되었을 때, 다음 숫자가 나오기 전까지 "z"키를 눌러야 합니다.`}
        </p>
      </div>
    ));
  }

  // 마지막
  explainList.push(() => (
    <div className="space-y-4">
      <p>지금부터 연습을 시작하겠습니다.</p>
      <p>
        일련의 숫자가 제시되면, {backCount + 1}번째 숫자부터 &quot;z&quot; 혹은
        &quot;/&quot;키를 눌러주세요.
      </p>
      <p>연습 과제에서는 정답 여부가 표시됩니다!</p>
      <ul className="list-disc list-inside">
        <li>초록색 : 정답</li>
        <li>빨간색 : 오답</li>
      </ul>
      <p>연습 과제를 시작하려면 아래의 버튼을 눌러주세요.</p>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
          onClick={() => setTaskStep('trial')}
        >
          연습 과제 시작하기
        </button>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {/* 중간 설명 영역 (스크롤 가능) */}
      <div className="flex flex-col items-center flex-grow px-4 my-4 overflow-y-auto text-center">
        {explainList[index]()}
      </div>

      {/* 하단 좌우 버튼 */}
      <div className="absolute flex justify-between px-4 py-2 bottom-2 left-1 right-1">
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
