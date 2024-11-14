import React, { ChangeEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { AppSetting, AppStep, Session } from '../lib/type';
import Button from '../component/button';

export default function setting({
  appSetting,
  setAppSetting,
  setAppStep,
}: {
  appSetting: AppSetting;
  setAppSetting: (s: AppSetting) => void;
  setAppStep: React.Dispatch<React.SetStateAction<AppStep>>;
}) {
  const [newAppSetting, setNewAppSetting] = useState<AppSetting>({
    ...appSetting,
  });

  return (
    <div className="space-y-4 w-full max-w-md">
      <Button
        label="add Session"
        onClick={() =>
          setNewAppSetting({
            ...newAppSetting,
            sessionList: [
              ...newAppSetting.sessionList,
              {
                id: uuid(),
                sessionIndex: newAppSetting.sessionList.length,
                taskList: [],
              },
            ],
          })
        }
      />
      <Button
        label="remove Last Session"
        onClick={() => {
          setNewAppSetting({
            ...newAppSetting,
            sessionList: [
              ...newAppSetting.sessionList.slice(
                0,
                newAppSetting.sessionList.length - 1
              ),
            ],
          });
        }}
      />
      <div className="flex space-x-2">
        <div>initializeTime(ms)</div>
        <input
          type="number"
          value={newAppSetting.initializeTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewAppSetting({ ...newAppSetting, initializeTime: value });
          }}
        />
      </div>
      <div className="flex space-x-2">
        <div>sessionChangeTime(ms)</div>
        <input
          type="number"
          value={newAppSetting.sessionChangeTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewAppSetting({ ...newAppSetting, sessionChangeTime: value });
          }}
        />
      </div>
      <div className="flex space-x-2">
        <div>trial session</div>
        <input
          type="string"
          placeholder="trial"
          defaultValue={newAppSetting.trialSession.taskList.join(',')}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const valueList = e.target.value
              .split(',')
              .filter((x) => x.trim() !== '' && !Number.isNaN(Number(x)));
            setNewAppSetting({
              ...newAppSetting,
              trialSession: {
                ...newAppSetting.trialSession,
                taskList: [...valueList.map((x) => parseInt(x, 10))],
              },
            });
          }}
        />
      </div>
      {newAppSetting.sessionList.map((session: Session, index) => (
        <div key={session.id} className="flex space-x-2">
          <div>{`${index + 1}번째 session`}</div>
          <input
            type="string"
            defaultValue={session.taskList.join(',')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const valueList = e.target.value
                .split(',')
                .filter((x) => x.trim() !== '' && !Number.isNaN(Number(x)));

              const originSession: Session = newAppSetting.sessionList[index];
              const newSession: Session = {
                ...originSession,
                taskList: valueList.map((value) => parseInt(value, 10)),
              };

              const newSessionList: Session[] = [
                ...newAppSetting.sessionList.slice(0, index),
                { ...newSession },
                ...newAppSetting.sessionList.slice(index + 1),
              ];

              setNewAppSetting({
                ...newAppSetting,
                sessionList: newSessionList,
              });
            }}
          />
        </div>
      ))}
      <Button label="home" onClick={() => setAppStep('home')} />
      <Button
        label="save"
        onClick={() => {
          setAppSetting({
            ...newAppSetting,
          });
        }}
      />
    </div>
  );
}
