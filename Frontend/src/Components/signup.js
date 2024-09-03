import React, { useState } from 'react';
import './signup.css'
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../Config/supabase';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    // Handle sign up logic here
      const {data, error} = await supabase.auth.signUp({email, password, options: {data: {name, username}}});
      if (error)
      {
        console.log(error);
      }
      console.log('Logging in...');
      navigate('/');
  };

  return (
    <div>
      <div className="picture-container"></div>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSignUp}>Sign Up</button>
        <p>Already have an account? <Link to='/'>Login</Link> </p>
      </div>
      
    </div>
  );
};

export default SignUp;
