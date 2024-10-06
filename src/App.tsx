import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './context/appContext';
import Home from './page/home';
import Task from './page/task';
import PreTask from './page/preTask';
import PostTask from './page/postTask';
import Setting from './page/setting';
import NotFound from './page/notFound';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<Task />} />
          <Route path="/pre-task" element={<PreTask />} />
          <Route path="/post-task" element={<PostTask />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
