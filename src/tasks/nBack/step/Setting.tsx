import React, { ChangeEvent } from 'react';
import { v4 as uuid } from 'uuid';
import { Session } from '../lib/type';
import Button from '../component/button';
import useTaskStore from '../store/taskStore';
import useSessionStore from '../store/sessionStore';

const VALID_BACK_COUNT = [2, 3, 4];

export default function Setting() {
  const taskSetting = useTaskStore((state) => state.taskSetting);
  const sessionList = useSessionStore((state) => state.sessionList);
  const addSession = useSessionStore((state) => state.addSession);
  const updateSession = useSessionStore((state) => state.updateSession);
  const removeSession = useSessionStore((state) => state.removeSession);
  const setTaskSetting = useTaskStore((state) => state.setTaskSetting);
  const setTaskStep = useTaskStore((state) => state.setTaskStep);

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
        <div>back count</div>
        <input
          type="number"
          value={taskSetting.backCount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            if (VALID_BACK_COUNT.includes(value)) {
              setTaskSetting({ ...taskSetting, backCount: value });
            } else {
              // alert
            }
          }}
        />
      </div>
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
      <div className="flex grid grid-cols-2 space-x-2">
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
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8"
          onClick={() => addSession()}
        >
          +
        </button>
      </div>

      {sessionList.map((session: Session, index) => (
        <div key={session.id}>
          <div className="grid grid-cols-4 ">
            <div>{`${index + 1}번째 session`}</div>
            <button type="button" onClick={() => removeSession(index)}>
              -
            </button>
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
            <div>Preview Image Link</div>
            <div>a</div>
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <div>Show Button Clicked</div>
            <input
              type="checkbox"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                // session.showBackCountToast = event.target.checked;
              }}
            />
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <div>Show N by Toast</div>
            <input
              type="checkbox"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                console.log(event.target.checked)
              }
            />
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <div>Correct Color</div>
            <div>a</div>
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <div>Wrong Color</div>
            <div>a</div>
          </div>
        </div>
      ))}
    </div>
  );
}
