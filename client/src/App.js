import logo from './logo.svg';
import HomePage from './Pages/HomePage'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProjectPage from './Pages/ProjectPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<HomePage/>}/>
        <Route path={'/projects'} element={<ProjectPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
