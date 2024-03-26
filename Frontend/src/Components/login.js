import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaGoogle, FaFacebook } from 'react-icons/fa';
import './login.css'; // CSS file for styling
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in...');

  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Logging in with Google...');
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log('Logging in with Facebook...');
  };

  return (
    <div className="login-container">
      <div className="picture"></div>
      <div className="login-form">
        <h1>Welcome to CropSense!</h1>
        <h2>Login</h2>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaEye
            className="icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <button className="simple-login" onClick={handleLogin}>
          Login
        </button>
        <div className="divider"></div> {/* Add divider */}
        <div className="social-buttons">
          <button className="google-login" onClick={handleGoogleLogin}>
            <FaGoogle /> Google Login
          </button>
          <button className="facebook-login" onClick={handleFacebookLogin}>
            <FaFacebook /> Facebook Login
          </button>
        </div>
        <p>Don't have an account? <Link to ='/signup'> SignUp</Link></p>

      </div>
      
    </div>
  );
};

export default Login;
