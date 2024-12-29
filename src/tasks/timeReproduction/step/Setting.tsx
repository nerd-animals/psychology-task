import React, { ChangeEvent } from 'react';
import { v4 as uuid } from 'uuid';
import { Session } from '../lib/type';
import useTaskStore from '../store/taskStore';
import useSessionStore from '../store/sessionStore';

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
            <div className="bg-gray-300 rounded">{`${index + 1}번째 session`}</div>
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
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8"
              onClick={() => {
                updateSession(index, {
                  ...session,
                  previewImgLinkList: [...session.previewImgLinkList, ''],
                });
              }}
            >
              +
            </button>
            <div>
              {session.previewImgLinkList.map((link, i: number) => (
                <div className="flex" key={uuid()}>
                  <input
                    type="string"
                    className="overflow-x-auto"
                    defaultValue={link}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const buf = [...session.previewImgLinkList];
                      buf.splice(i, 1, e.target.value);
                      updateSession(index, {
                        ...session,
                        previewImgLinkList: buf,
                      });
                    }}
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center w-8 h-8"
                    onClick={() => {
                      const buf = [...session.previewImgLinkList];
                      buf.splice(i, 1);
                      updateSession(index, {
                        ...session,
                        previewImgLinkList: buf,
                      });
                    }}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
