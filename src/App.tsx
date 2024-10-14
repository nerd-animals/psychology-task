import { useState, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Home from './step/home';
import Setup from './step/setup';
import StandBy from './step/standBy';
import Explain from './step/explain';
import Trial from './step/trial';
import PreTask from './step/preTask';
import Task from './step/task';
import PostTask from './step/postTask';
import Setting from './step/setting';
import Container from './component/container';
import { AppSetting, AppStep, Subject, Result } from './lib/type';
import { solveSession } from './lib/util';

const INITIAL_APP_SETTING: AppSetting = {
  backCount: 3,
  initializeTime: 5000,
  visibleTime: 500,
  waitTime: 2000,
  sessionChangeTime: 5000,
  trialSession: {
    id: 'trial',
    sessionIndex: 0,
    taskList: [2, 1, 8, 5, 1, 7],
    solutionList: [],
  },
  sessionList: [
    {
      id: uuid(),
      sessionIndex: 0,
      taskList: [3, 5, 7, 4, 6, 7],
      solutionList: [],
    },
    {
      id: uuid(),
      sessionIndex: 0,
      taskList: [9, 4, 3, 5, 4, 7],
      solutionList: [],
    },
  ],
};

const INITIAL_SUBJECT: Subject = {
  subjectLabel: '',
  date: new Date(),
};

const NO_CURSOR_STEP = ['task', 'trial'];

function App() {
  const [appStep, setAppStep] = useState<AppStep>('home');
  const subjectRef = useRef<Subject>(INITIAL_SUBJECT);
  const appSettingRef = useRef<AppSetting>(INITIAL_APP_SETTING);
  const resultRef = useRef<Result[]>([]);
  const cursorOption = NO_CURSOR_STEP.includes(appStep) ? 'cursor-none' : '';

  useEffect(() => {
    const solvedTrialSession = solveSession(
      appSettingRef.current.backCount,
      appSettingRef.current.trialSession
    );
    const solvedSessionList = appSettingRef.current.sessionList.map((session) =>
      solveSession(appSettingRef.current.backCount, session)
    );

    appSettingRef.current.trialSession = { ...solvedTrialSession };
    appSettingRef.current.sessionList = [...solvedSessionList];

    console.log(appSettingRef.current);
  }, []);

  return (
    <main className={`${cursorOption}`}>
      <Container>
        {appStep === 'home' && (
          <Home appSetting={appSettingRef.current} setAppStep={setAppStep} />
        )}
        {appStep === 'setup' && (
          <Setup
            setSubject={(subject: Subject) => {
              subjectRef.current = subject;
            }}
            setAppStep={setAppStep}
          />
        )}
        {appStep === 'stand-by' && (
          <StandBy subject={subjectRef.current} setAppStep={setAppStep} />
        )}
        {appStep === 'explain' && (
          <Explain appSetting={appSettingRef.current} setAppStep={setAppStep} />
        )}
        {appStep === 'trial' && (
          <Trial appSetting={appSettingRef.current} setAppStep={setAppStep} />
        )}
        {appStep === 'pre-task' && <PreTask setAppStep={setAppStep} />}
        {appStep === 'task' && (
          <Task
            appSetting={appSettingRef.current}
            addResult={(result: Result) => resultRef.current.push(result)}
            setAppStep={setAppStep}
          />
        )}
        {appStep === 'post-task' && (
          <PostTask
            appSetting={appSettingRef.current}
            subject={subjectRef.current}
            resultList={resultRef.current}
            clearResultList={() => {
              resultRef.current = [];
            }}
            setAppStep={setAppStep}
          />
        )}
        {appStep === 'setting' && (
          <Setting
            appSetting={appSettingRef.current}
            setAppSetting={(appSetting: AppSetting) => {
              appSettingRef.current = appSetting;
            }}
            setAppStep={setAppStep}
          />
        )}
      </Container>
    </main>
  );
}

export default App;
