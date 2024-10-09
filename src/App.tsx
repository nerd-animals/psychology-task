import { useState, useRef, useEffect } from 'react';
import Home from './step/home';
import Setup from './step/setup';
import StandBy from './step/standBy';
import Explain from './step/explain';
import Trial from './step/trial';
import PreTask from './step/preTask';
import Task from './step/task';
import PostTask from './step/postTask';
import Setting from './step/setting';
import { AppSetting, AppStep, Subject, Result } from './lib/type';

const INITIAL_APP_SETTING: AppSetting = {
  backCount: 2,
  trialList: [1, 2, 3],
  taskList: [
    [1, 2, 3],
    [4, 5, 6],
  ],
  initializeTime: 3000,
  visibleTime: 300,
  waitTime: 1000,
  sessionChangeTime: 3000,
};

const INITIAL_SUBJECT: Subject = {
  subjectId: '',
  subjectLabel: '',
  date: new Date(),
};

function App() {
  const [appStep, setAppStep] = useState<AppStep>('home');
  const [appSetting, setAppSetting] = useState<AppSetting>(INITIAL_APP_SETTING);
  const [subject, setSubject] = useState<Subject>(INITIAL_SUBJECT);
  const resultRef = useRef<Result[]>([]);

  return (
    <main>
      <button type="button" onClick={() => setAppStep('home')}>
        home
      </button>
      <div>
        {appStep === 'home' && <Home setAppStep={setAppStep} />}
        {appStep === 'setup' && (
          <Setup setSubject={setSubject} setAppStep={setAppStep} />
        )}
        {appStep === 'stand-by' && (
          <StandBy subject={subject} setAppStep={setAppStep} />
        )}
        {appStep === 'explain' && (
          <Explain appSetting={appSetting} setAppStep={setAppStep} />
        )}
        {appStep === 'trial' && (
          <Trial appSetting={appSetting} setAppStep={setAppStep} />
        )}
        {appStep === 'pre-task' && <PreTask setAppStep={setAppStep} />}
        {appStep === 'task' && (
          <Task
            appSetting={appSetting}
            addResult={(result: Result) => resultRef.current.push(result)}
            setAppStep={setAppStep}
          />
        )}
        {appStep === 'post-task' && (
          <PostTask
            subject={subject}
            resultList={resultRef.current}
            clearResultList={() => {
              resultRef.current = [];
            }}
            setAppStep={setAppStep}
          />
        )}
        {appStep === 'setting' && (
          <Setting
            appSetting={appSetting}
            setAppSetting={setAppSetting}
            setAppStep={setAppStep}
          />
        )}
      </div>
    </main>
  );
}

export default App;
