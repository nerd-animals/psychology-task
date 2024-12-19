import React, { ChangeEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TaskSetting, Session } from '../lib/type';
import Button from '../component/button';
import useTaskStore from '../store/taskStore';

const VALID_BACK_COUNT = [2, 3, 4];

export default function Setting() {
  const taskSetting = useTaskStore((state) => state.taskSetting);
  const setTaskSetting = useTaskStore((state) => state.setTaskSetting);
  const setTaskStep = useTaskStore((state) => state.setTaskStep);
  const [newTaskSetting, setNewTaskSetting] = useState<TaskSetting>({
    ...taskSetting,
  });

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex justify-between">
        <button
          className="px-2 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          type="button"
          onClick={() => {
            setTaskSetting(newTaskSetting);
            setTaskStep('home');
          }}
        >
          Home
        </button>
      </div>
      <h2 className="text-xl font-bold">Task Setting</h2>
      <div className="grid grid-cols-2 space-x-2">
        <div>back count</div>
        <input
          type="number"
          value={newTaskSetting.backCount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            if (VALID_BACK_COUNT.includes(value)) {
              setNewTaskSetting({ ...newTaskSetting, backCount: value });
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
          value={newTaskSetting.initializeTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewTaskSetting({ ...newTaskSetting, initializeTime: value });
          }}
        />
      </div>
      <div className="grid grid-cols-2 space-x-2">
        <div>Stimulus Duration (ms)</div>
        <input
          type="number"
          value={newTaskSetting.visibleTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewTaskSetting({ ...newTaskSetting, visibleTime: value });
          }}
        />
      </div>
      <div className="flex grid grid-cols-2 space-x-2">
        <div>Inter-Stimulus Interval (ms)</div>
        <input
          type="number"
          value={newTaskSetting.waitTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewTaskSetting({ ...newTaskSetting, waitTime: value });
          }}
        />
      </div>
      <div className="grid grid-cols-2">
        <h2 className="text-xl font-bold">Session Setting</h2>
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8"
          onClick={() =>
            setNewTaskSetting({
              ...newTaskSetting,
              sessionList: [
                ...newTaskSetting.sessionList,
                {
                  id: uuid(),
                  taskList: [],
                  previewImgLinkList: [],
                  showButtonClicked: false,
                  showBackCountToast: false,
                  correctBgColor: 'bg-green-400',
                  incorrectBgColor: 'bg-red-400',
                },
              ],
            })
          }
        >
          +
        </button>
      </div>

      {newTaskSetting.sessionList.map((session: Session, index) => (
        <div key={session.id}>
          <div className="grid grid-cols-4 ">
            <div>{`${index + 1}번째 session`}</div>
            <button type="button" onClick={() => console.log(index)}>
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
                  .filter((x) => x.trim() !== '' && !Number.isNaN(Number(x)));

                const originSession: Session =
                  newTaskSetting.sessionList[index];
                const newSession: Session = {
                  ...originSession,
                  taskList: valueList.map((value) => parseInt(value, 10)),
                };

                const newSessionList: Session[] = [
                  ...newTaskSetting.sessionList.slice(0, index),
                  { ...newSession },
                  ...newTaskSetting.sessionList.slice(index + 1),
                ];

                setNewTaskSetting({
                  ...newTaskSetting,
                  sessionList: newSessionList,
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
      <Button
        label="remove Last Session"
        onClick={() => {
          setNewTaskSetting({
            ...newTaskSetting,
            sessionList: [
              ...newTaskSetting.sessionList.slice(
                0,
                newTaskSetting.sessionList.length - 1
              ),
            ],
          });
        }}
      />
    </div>
  );
}
