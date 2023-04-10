import logo from './logo.svg';
import HomePage from './Pages/HomePage'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProjectPage from './Pages/ProjectPage';
import ProjectDescription from './Pages/ProjectDescription';
import SideBarProvider from './Components/SideBarProvider';
import Calendar from './Pages/CalenderPage/Calendar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<HomePage/>}/>
        <Route path={'/projects'} element={<SideBarProvider><ProjectPage/></SideBarProvider>}/>
        <Route path={'/projects/:id'} element={<SideBarProvider><ProjectDescription/></SideBarProvider>}/>
        <Route path={'/calendar'} element={<SideBarProvider><Calendar/></SideBarProvider>}/>
      </Routes>
    </div>
  );
}

export default App;
