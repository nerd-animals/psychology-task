import NBackTask from './tasks/nBack/NBackTask';
import TimeReproductionTask from './tasks/timeReproduction/TimeReproductionTask';
import useAppStore from './store/appStore';

function App() {
  const { task, setTask } = useAppStore();

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
            N Back
          </button>
          <button
            className="px-2 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            type="button"
            onClick={() => setTask('time-reproduction')}
          >
            Time Reproduction
          </button>
        </div>
      )}
    </>
  );
}

export default App;
