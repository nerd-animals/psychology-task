import { useEffect } from 'react';
import Home from './step/home';
import Setup from './step/setup';
import StandBy from './step/standBy';
import Explain from './step/explain';
import Trial from './step/trial';
import FinalTrial from './step/finalTrial';
import PreFinalTrial from './step/preFinalTrial';
import PreTask from './step/preTask';
import Task from './step/task';
import PostTask from './step/postTask';
import Setting from './step/setting';
import Container from './component/Container';
import useTaskStore from './store/taskStore';

const NO_CURSOR_STEP = ['task', 'trial'];

export default function NBackTask() {
  const step = useTaskStore((state) => state.taskStep);
  const solveTask = useTaskStore((state) => state.solveTask);
  const cursorOption = NO_CURSOR_STEP.includes(step) ? 'cursor-none' : '';

  useEffect(() => {
    solveTask();
  }, []);

  return (
    <main className={`${cursorOption}`}>
      <Container>
        {step === 'home' && <Home />}
        {step === 'setup' && <Setup />}
        {step === 'stand-by' && <StandBy />}
        {step === 'explain' && <Explain />}
        {step === 'trial' && <Trial />}
        {step === 'pre-final-trial' && <PreFinalTrial />}
        {step === 'final-trial' && <FinalTrial />}
        {step === 'pre-task' && <PreTask />}
        {step === 'task' && <Task />}
        {step === 'post-task' && <PostTask />}
        {step === 'setting' && <Setting />}
      </Container>
    </main>
  );
}
