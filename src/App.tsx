import NBackTask from './tasks/nBack/NBackTask';
import TimeReproductionTask from './tasks/timeReproduction/TimeReproductionTask';
import useTaskStore from './store/taskStore';

function App() {
  const { task, setTask } = useTaskStore();

  return (
    <>
      {task === 'n-back' && <NBackTask />}
      {task === 'time-reproduction' && <TimeReproductionTask />}
      {task === 'none' && (
        <div className="flex items-center justify-center min-h-screen space-x-5">
          <button
            className="px-2 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            type="button"
            onClick={() => setTask('n-back')}
          >
            n-back
          </button>
          <button
            className="px-2 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            type="button"
            onClick={() => setTask('time-reproduction')}
          >
            time-reproduction
          </button>
        </div>
      )}
    </>
  );
}

export default App;
