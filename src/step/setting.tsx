import React, { ChangeEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  AppSetting,
  AppStep,
  Session,
  DIFF_FLAG,
  SAME_FLAG,
  NONE_FLAG,
} from '../lib/type';
import Button from '../component/button';

const VALID_BACK_COUNT = [2, 3, 4];

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

  const solveSession = (session: Session) => {
    const { backCount } = newAppSetting;

    const solutionList = session.taskList.map((value, index) => {
      if (index < backCount) {
        return NONE_FLAG;
      }
      const nBackValue = session.taskList.at(index - backCount);

      if (value === nBackValue) {
        return SAME_FLAG;
      }
      return DIFF_FLAG;
    });

    const solvedSession = { ...session, solutionList: [...solutionList] };
    return solvedSession;
  };

  return (
    <>
      <div>
        <Button
          label="add Session"
          onClick={() =>
            setNewAppSetting({
              ...newAppSetting,
              sessionList: [
                ...newAppSetting.sessionList,
                { id: uuid(), taskList: [], solutionList: [] },
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
      </div>
      <div>
        <input
          type="number"
          value={newAppSetting.backCount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            if (VALID_BACK_COUNT.includes(value)) {
              setNewAppSetting({ ...newAppSetting, backCount: value });
            } else {
              // alert
            }
          }}
        />
        <input
          type="number"
          placeholder="initializeTime(ms)"
          value={newAppSetting.initializeTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewAppSetting({ ...newAppSetting, initializeTime: value });
          }}
        />
        <input
          type="number"
          placeholder="sessionChangeTime(ms)"
          value={newAppSetting.sessionChangeTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewAppSetting({ ...newAppSetting, sessionChangeTime: value });
          }}
        />
        <input
          type="number"
          placeholder="visibleTime(ms)"
          value={newAppSetting.visibleTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewAppSetting({ ...newAppSetting, visibleTime: value });
          }}
        />
        <input
          type="number"
          placeholder="waitTime(ms)"
          value={newAppSetting.waitTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.valueAsNumber || 0;
            setNewAppSetting({ ...newAppSetting, waitTime: value });
          }}
        />
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
        {newAppSetting.sessionList.map((session: Session, index) => (
          <input
            key={session.id}
            type="string"
            placeholder={`${index}-main task`}
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
        ))}
      </div>
      <Button label="home" onClick={() => setAppStep('home')} />
      <Button
        label="save"
        onClick={() => {
          const solvedTrialSession = solveSession(newAppSetting.trialSession);
          const solvedSessionList = newAppSetting.sessionList.map((session) =>
            solveSession(session)
          );

          setAppSetting({
            ...newAppSetting,
            trialSession: { ...solvedTrialSession },
            sessionList: [...solvedSessionList],
          });
        }}
      />
    </>
  );
}
