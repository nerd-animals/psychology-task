import React, { ChangeEvent } from 'react';
import { BgColorType, Session } from '../lib/type';
import useTaskStore from '../store/taskStore';
import useSessionStore from '../store/sessionStore';

export default function Setting() {
  const taskSetting = useTaskStore((state) => state.taskSetting);
  const sessionList = useSessionStore((state) => state.sessionList);
  const updateSession = useSessionStore((state) => state.updateSession);
  const setTaskSetting = useTaskStore((state) => state.setTaskSetting);
  const setTaskStep = useTaskStore((state) => state.setTaskStep);

  const nextBgColorType = (bgColorType: BgColorType): BgColorType => {
    if (bgColorType === 'Gray') return 'Red-Green';
    if (bgColorType === 'None') return 'Gray';
    return 'None';
  };
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex justify-between">
        <button
          className="px-2 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          type="button"
          onClick={() => setTaskStep('home')}
        >
          Home
        </button>
      </div>
      <h2 className="text-xl font-bold">Task Setting</h2>
      <div className="grid grid-cols-2 space-x-2">
        <div>Inter-Session Interval (ms)</div>
        <input
          type="number"
          value={taskSetting.initializeTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setTaskSetting({ ...taskSetting, initializeTime: value });
          }}
        />
      </div>
      <div className="grid grid-cols-2 space-x-2">
        <div>Stimulus Duration (ms)</div>
        <input
          type="number"
          value={taskSetting.visibleTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setTaskSetting({ ...taskSetting, visibleTime: value });
          }}
        />
      </div>
      <div className="grid grid-cols-2 space-x-2">
        <div>Inter-Stimulus Interval (ms)</div>
        <input
          type="number"
          value={taskSetting.waitTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setTaskSetting({ ...taskSetting, waitTime: value });
          }}
        />
      </div>
      <div className="grid grid-cols-2">
        <h2 className="text-xl font-bold">Session Setting</h2>
      </div>

      {sessionList.map((session: Session, index) => (
        <div key={session.id}>
          <div className="grid grid-cols-4 ">
            <div className="bg-gray-300 rounded">{`${index + 1}번째 session`}</div>
          </div>

          <div className="grid grid-cols-2 space-x-2">
            <div>Stimulus</div>
            <input
              type="string"
              defaultValue={session.taskList.join(',')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const valueList = e.target.value
                  .split(',')
                  .filter((x) => x.trim() !== '' && !Number.isNaN(Number(x)))
                  .map((value) => parseInt(value, 10));

                updateSession(index, {
                  ...sessionList[index],
                  taskList: valueList,
                });
              }}
            />
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <div>Show Button Clicked</div>
            <input
              type="checkbox"
              defaultChecked={session.showButtonClicked}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                updateSession(index, {
                  ...session,
                  showButtonClicked: event.target.checked,
                });
              }}
            />
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <div>Show Toast</div>
            <input
              type="checkbox"
              defaultChecked={session.showBackCountToast}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                updateSession(index, {
                  ...session,
                  showBackCountToast: event.target.checked,
                });
              }}
            />
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <div>Background Color Type</div>
            <button
              type="button"
              onClick={() => {
                updateSession(index, {
                  ...session,
                  bgColorType: nextBgColorType(session.bgColorType),
                });
              }}
            >
              {session.bgColorType}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
