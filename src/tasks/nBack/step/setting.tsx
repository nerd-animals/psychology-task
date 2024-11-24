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
        <Button label="home" onClick={() => setTaskStep('home')} />
        <Button
          label="save"
          onClick={() => {
            setTaskSetting(newTaskSetting);
          }}
        />
      </div>
      <div className="flex grid grid-cols-2 space-x-2">
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
      <div className="flex grid grid-cols-2 space-x-2">
        <div>initializeTime(ms)</div>
        <input
          type="number"
          value={newTaskSetting.initializeTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewTaskSetting({ ...newTaskSetting, initializeTime: value });
          }}
        />
      </div>
      <div className="flex grid grid-cols-2 space-x-2">
        <div>visibleTime(ms)</div>
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
        <div>waitTime(ms)</div>
        <input
          type="number"
          value={newTaskSetting.waitTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewTaskSetting({ ...newTaskSetting, waitTime: value });
          }}
        />
      </div>
      {newTaskSetting.sessionList.map((session: Session, index) => (
        <div key={session.id} className="flex grid grid-cols-2 space-x-2">
          <div>{`${index + 1}번째 session`}</div>
          <input
            type="string"
            defaultValue={session.taskList.join(',')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const valueList = e.target.value
                .split(',')
                .filter((x) => x.trim() !== '' && !Number.isNaN(Number(x)));

              const originSession: Session = newTaskSetting.sessionList[index];
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
      ))}
      <Button
        label="add Session"
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
      />
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
