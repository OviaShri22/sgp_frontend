import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making API calls
import "../styles/forms.css";

const FacultyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        // Send login data to the backend
        const response = await axios.post('http://localhost:5000/api/faculties/login', { email, password });

        // If login is successful, store faculty ID in local storage
        if (response.status === 200) {
            localStorage.setItem('facultyId', response.data.facultyId); // Store the faculty ID
            navigate('/faculty-home'); // Redirect to faculty home
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Invalid credentials');
    }
};

const handleGoBack = () => {
  // Navigate back to the previous page
  navigate("/");
};

  return (
    <div className="storage-section">
      <div className="leftsection">
      <div className='login-button-container'>
        <button className="go-back-button" onClick={handleGoBack}>
          Go Back
        </button>
        </div>
      </div>
      <div className="rightsection">
        <h1 className="h1-line-height" style={{ fontSize: '45px' }}>Welcome faculty</h1>
        <br />
        <div className="input-form">
          <div className="formsgroup">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email-id"
              className="formscontrol"
              id="inputEmail"
            />
          </div>
          <div className="formsgroup">
            <label htmlFor="inputPassword">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="formscontrol"
              id="inputPassword"
            />
            <br />
            <br />
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <div className="bottom-buttons">
            <button className="button-main" onClick={handleLogin}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;
