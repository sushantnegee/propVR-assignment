import logo from './logo.svg';
import HomePage from './Pages/HomePage'
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
