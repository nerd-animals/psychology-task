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
import { AppSetting, AppStep, Subject } from './lib/type';

const INITIAL_APP_SETTING: AppSetting = {
  backCount: 2,
  taskSet: [
    [1, 2, 3],
    [4, 5, 6],
  ],
  visibleTime: 300,
  waitTime: 1000,
  sessionChangeTime: 5000,
};

const INITIAL_SUBJECT: Subject = {
  subjectId: '',
  subjectLabel: '',
  result: [],
};

function App() {
  const [appStep, setAppStep] = useState<AppStep>('home');
  const [appSetting, setAppSetting] = useState<AppSetting>(INITIAL_APP_SETTING);
  const [subject, setSubject] = useState<Subject>(INITIAL_SUBJECT);
  const date = useRef<Date>(new Date());

  useEffect(() => {
    if (appStep !== 'task') return;
    date.current = new Date();
  }, [appStep]);

  return (
    <main>
      <div>Home 버튼 & Settings 버튼 </div>
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
            setAppStep={setAppStep}
            setSubject={setSubject}
          />
        )}
        {appStep === 'post-task' && (
          <PostTask startDate={date} setAppStep={setAppStep} />
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
