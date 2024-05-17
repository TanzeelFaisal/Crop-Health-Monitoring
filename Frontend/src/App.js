import logo from './logo.svg';
import './App.css';
import Login from './Components/login';
import SignUp from './Components/signup';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import MainDashboard from './Components/mainDashboard';
// import CropHealthCalculator from './Components/cropHealthCalculator';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<MainDashboard/>}/>
          {/* <Route path="/crop-health-calculator" element={<CropHealthCalculator/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
