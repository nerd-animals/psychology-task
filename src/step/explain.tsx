import React from 'react';
import { AppSetting, AppStep } from '../lib/type';
import Button from '../component/button';

const EXAMPLE = [2, 1, 2, 8, 1];

export default function explain({
  appSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const { backCount } = appSetting;

  return (
    <div className="w-full h-full flex flex-col items-center p-2 space-y-4">
      <div className="text-4xl">{backCount}-Back Task</div>
      <div>컴퓨터 화면 중앙에 일련의 숫자가 하나씩 차례대로 나타납니다.</div>
      <div>
        빠른 속도로 숫자가 표시되며, 다음 숫자가 나타나기 전에 과제를 수행해야
        합니다.
      </div>
      <div>
        과제는 현재 화면에 표시된 숫자와 {backCount}번째 전에 표시된 숫자를
        비교하여 일치 여부를 판단하는 것입니다.
      </div>

      <div>
        현재 화면에 표시된 숫자가 {backCount}번째 전에 제시된 숫자와 같다면
        &quot;/&quot;키를 누르고,
      </div>
      <div>
        현재 화면에 표시된 숫자가 {backCount}번째 전에 제시된 숫자와 다르면
        &quot;z&quot;키를 눌러주세요.
      </div>

      <div>예시</div>
      <div className="flex space-x-4">
        {EXAMPLE.map((value, i) => {
          if (i < backCount) {
            return <div className="border p-2">{value}</div>;
          }
          const bgColor =
            value === EXAMPLE[i - backCount] ? 'bg-green-300' : 'bg-red-300';

          return <div className={`border p-2 ${bgColor}`}>{value}</div>;
        })}
      </div>

      <ul className="list-disc">
        <li>
          1~{backCount}번째 숫자는 {backCount}번째 전의 숫자가 없기 때문에 아무
          버튼도 누르지 않습니다.
        </li>
        {EXAMPLE.map((value, i) => {
          if (i < backCount) {
            return undefined;
          }
          const nBackValue = EXAMPLE[i - backCount];
          if (value === nBackValue) {
            return (
              <li>
                {i + 1}번째 숫자({value})와 {i - backCount + 1}번째 숫자(
                {nBackValue})는 일치하기 때문에 &quot;/&quot;키를 눌러야 합니다.
              </li>
            );
          }
          return (
            <li>
              {' '}
              {i + 1}번째 숫자({value})와 {i - backCount + 1}번째 숫자(
              {nBackValue})는 일치하지 않기 때문에 &quot;z&quot;키를 눌러야
              합니다.
            </li>
          );
        })}
      </ul>

      <div>지금부터 연습을 시작하겠습니다.</div>
      <div>
        일련의 숫자가 제시되면, {backCount + 1}번째 숫자부터 &quot;z&quot; 혹은
        &quot;/&quot;를 눌러주세요.
      </div>

      <div>연습 과제에서는 정답 여부가 표시됩니다.</div>
      <ul className="list-disc">
        <li>초록색 - 정답</li>
        <li>빨간색 - 오답</li>
      </ul>
      <div>연습 과제를 시작하려면 아래의 버튼을 눌러주세요.</div>
      <Button label="연습 과제" onClick={() => setAppStep('trial')} />
    </div>
  );
}
