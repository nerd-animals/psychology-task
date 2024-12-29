import Home from './step/Home';
import Task from './step/Task';
import SubjectSetup from './step/SubjectSetup';
import ExportResult from './step/ExportResult';
import Setting from './step/Setting';
import Container from '../../component/Container';
import useTaskStore from './store/taskStore';

function TimeReproductionTask() {
  const step = useTaskStore((state) => state.taskStep);

  return (
    <main>
      <Container>
        {step === 'home' && <Home />}
        {step === 'subject-setup' && <SubjectSetup />}
        {step === 'task' && <Task />}
        {step === 'export-result' && <ExportResult />}
        {step === 'setting' && <Setting />}
      </Container>
    </main>
  );
}

export default TimeReproductionTask;
