import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        // Store token, email, and user details in local storage
        localStorage.setItem('token', result.token);
        localStorage.setItem('userName', result.user.name);
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userRole', result.user.role);

        navigate('/stud-home'); // Adjust the path if needed
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  };

  const handleAdminLoginRedirect = () => {
    navigate('/admin-login'); // Adjust the path if needed
  };

  const handleFacultyLoginRedirect = () => {
    navigate('/faculty-login'); // New path for faculty Login
  };

  return (
    <div className="storage-section">
      <div className="leftsection">
      <div className="login-button-container">
                <button
                  type="button"
                  className="admin-login-link"
                  onClick={handleFacultyLoginRedirect}
                >
                 Faculty Login
                </button>
                <button
                  type="button"
                  className="admin-login-link"
                  onClick={handleAdminLoginRedirect}
                  style={{ marginLeft: "10px" }}
                >
                  Admin Login
                </button>
                </div>
      
      </div>
      <div className="rightsection">
        <h1 className="h1-line-height" style={{ fontSize: "45px" }}>
          Welcome Student!
        </h1>
        <br />
        <div className="input-form">
          <form onSubmit={handleSubmit}>
            <div className="formsgroup">
              <label htmlFor="inputEmail">Email</label>
              <input
                type="email"
                placeholder="Email-id"
                className="formscontrol"
                id="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="formsgroup">
              <label htmlFor="inputPassword">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="formscontrol"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <br />
              <div className="show-password-container">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={handleShowPasswordChange}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>
            </div>
            <div className="bottom-buttons">
              <button className="button-main" type="submit">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
