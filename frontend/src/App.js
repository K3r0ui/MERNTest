import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import { useEffect } from 'react';
import TaskPage from './pages/TaskPage';
import NotFoundPage from './pages/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from './components/Navbars';
import AuthentificationPage from './pages/AuthentificationPage';
import ChangePsw from './pages/ChangePsw';
function App() {
  const isConnected = localStorage.getItem('token');
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Navbars/>
        <Routes>
          {isConnected && <><Route path="/taskpage" element={<TaskPage />}/><Route path= '/logout' element={ <Logout /> } /></>}
          <Route path="/" element={<Home />}/>
          
          <Route path="/auth" element={<AuthentificationPage />}/>
          <Route path='/not-found' element={<NotFoundPage />} />
          <Route path='/reset-password/:id/:token' element={<ChangePsw />} />
          <Route path='*' element={<Navigate to='/not-found' replace />} />
          
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}
const Logout = () => {
  useEffect(() => {
     localStorage.clear();
     window.location = '/';
  }, []);
  return null;
};

export default App;
