import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const uploadbtnhandler = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <div className="left">
        <div>
          <h1>Welcome to CropSense!</h1>
        </div>
        <p>Discover the health of your crop fields. Upload images to receive accurate results about the presence of weeds or diseases.</p>
        <button onClick={uploadbtnhandler}>Upload Images</button>
      </div>
      <div className="right">
        <img src="/images/Person with laptop.png" alt="Person with Laptop" className="illustration" />
      </div>
    </div>
  );
}

export default WelcomePage;
