import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TaskPage from './pages/TaskPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/taskpage" element={<TaskPage />}/>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
