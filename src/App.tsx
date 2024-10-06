import { BrowserRouter, Routes, Route } from 'react-router-dom';
import home from './page/home';
import task from './page/task';
import preTask from './page/preTask';
import postTask from './page/postTask';
import setting from './page/setting';
import notFound from './page/notFound';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={home()} />
        <Route path="/task" element={task()} />
        <Route path="/pre-task" element={preTask()} />
        <Route path="/post-task" element={postTask()} />
        <Route path="/setting" element={setting()} />
        <Route path="*" element={notFound()} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
