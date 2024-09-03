import logo from './logo.svg';
import './App.css';
import Login from './Components/login';
import SignUp from './Components/signup';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import MainDashboard from './Components/mainDashboard';
import Results from './Components/results';
import UploadPhotosSection from './Components/uploadPhotoSection';
import History from './Components/history';
import WelcomePage from './Components/welcomePage';
import ContactPage from './Components/contactPage';
import Navbar from './Components/navbar';
// import CropHealthCalculator from './Components/cropHealthCalculator';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={
            <>
              <Navbar />
              <UploadPhotosSection/>
            </>
          }/>
          <Route path="/history" element={
            <>
              <Navbar />
              <History />
            </>
            } />
          <Route path="/home" element={
            <>
            <Navbar />
            <WelcomePage />
          </>
          } 
            />
          <Route path="/contact" element={
            <>
            <Navbar />
            <ContactPage />
            </>
          } />
          {/* <Route path="/crop-health-calculator" element={<CropHealthCalculator/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
