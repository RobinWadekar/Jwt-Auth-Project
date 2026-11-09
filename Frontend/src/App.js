import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CeoPage from './Components/CeoPage';
import EmpPage from './Components/EmpPage';
import FloatingLines from './FloatingLines';
import Home from './Components/Home';
import HrPage from './Components/HrPage';
import ManagerPage from './Components/ManagerPage';
import RegisterEmployee from './Components/RegisterEmployee';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <FloatingLines
        enabledWaves={['top', 'middle', 'bottom']} // Array - specify line count per wave; Number - same count for all waves
        lineCount={[5, 5, 5]} // Array - specify line distance per wave; Number - same distance for all waves
        lineDistance={[8, 6, 4]}
        bendRadius={5.0}
        bendStrength={-0.5}
        interactive={true}
        parallax={true}
      />
      <div className='app-content'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<RegisterEmployee />} />
            <Route path='/empPage' element={<EmpPage />} />
            <Route path='/managerPage' element={<ManagerPage />} />
            <Route path='/hrPage' element={<HrPage />} />
            <Route path='/ceoPage' element={<CeoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
