import { useState, useRef } from 'react';
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

const INITIAL_APP_SETTING: AppSetting = {
  backCount: 2,
  initializeTime: 3000,
  visibleTime: 300,
  waitTime: 1000,
  sessionChangeTime: 3000,
  trialSession: {
    id: 'trial',
    sessionIndex: 0,
    taskList: [],
    solutionList: [],
  },
  sessionList: [],
};

const INITIAL_SUBJECT: Subject = {
  subjectLabel: '',
  date: new Date(),
};

function App() {
  const [appStep, setAppStep] = useState<AppStep>('home');
  const subjectRef = useRef<Subject>(INITIAL_SUBJECT);
  const appSettingRef = useRef<AppSetting>(INITIAL_APP_SETTING);
  const resultRef = useRef<Result[]>([]);

  return (
    <main>
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
