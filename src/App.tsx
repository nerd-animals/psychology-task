import NBackTask from './tasks/nBack/NBackTask';
import TimeReproductionTask from './tasks/timeReproduction/TimeReproductionTask';
import { useAppActions, useAppValue } from './context/AppContext';

function App() {
  const appValue = useAppValue();
  const appActions = useAppActions();

  return (
    <>
      {appValue.task === 'n-back' && <NBackTask />}
      {appValue.task === 'time-reproduction' && <TimeReproductionTask />}
      {appValue.task === 'none' && (
        <div className="flex items-center justify-center min-h-screen space-x-5">
          <button
            className="px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            type="button"
            onClick={() => appActions.setTask('n-back')}
          >
            n-back
          </button>
          <button
            className="px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            type="button"
            onClick={() => appActions.setTask('time-reproduction')}
          >
            time-reproduction
          </button>
        </div>
      )}
    </>
  );
}

export default App;
