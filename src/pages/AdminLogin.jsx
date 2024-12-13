import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/forms.css";

const AdminLogin = () => {
  // State to handle input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Hardcoded admin credentials (for demo purposes)
  const adminCredentials = {
    email: 'admin@gmail.com',  // Set your admin email
    password: 'admin@1.',  // Set your admin password
  };

  const handleLogin = () => {
    // Check if the entered credentials match the hardcoded ones
    if (email === adminCredentials.email && password === adminCredentials.password) {
      // Redirect to the admin home if login is successful
      navigate('/admin-home');
    } else {
      // Show error if credentials do not match
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
        <h1 className="h1-line-height" style={{ fontSize: '45px' }}>Welcome Admin</h1>
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

export default AdminLogin;
