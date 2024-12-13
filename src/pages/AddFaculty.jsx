import React, { useState } from 'react';
import axios from 'axios';
import "../styles/AdminPage.css"; // Import the CSS file
import AdminNavbar from '../components/AdminNavbar';
import config from '../components/config';

const AddFaculty = () => {
  const [faculties, setFaculties] = useState([
    { name: '', email: '', expertise: '', password: '' }
  ]);
  const [errors, setErrors] = useState({}); // To store validation errors

  // Strong password validation function
  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  // Handle change in the input fields
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFaculties = [...faculties];
    updatedFaculties[index][name] = value;

    // Validate password and update errors
    if (name === "password") {
      const isValid = validatePassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [index]: isValid ? "" : "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.",
      }));
    }

    setFaculties(updatedFaculties);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check for validation errors
      const hasErrors = faculties.some((faculty, index) => {
        if (!validatePassword(faculty.password)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [index]: "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.",
          }));
          return true;
        }
        return false;
      });

      if (hasErrors) {
        alert("Please fix the errors before submitting.");
        return;
      }

      for (let i = 0; i < faculties.length; i++) {
        await axios.post(`${config.BASE_API_URL}/api/faculties`, faculties[i]);
      }
      alert('Faculty added successfully!');
      setFaculties([{ name: '', email: '', expertise: '', password: '' }]); // Reset form after submission
      setErrors({});
    } catch (error) {
      console.error('Error adding faculty:', error);
      alert('Failed to add faculty');
    }
  };

  // Add another faculty input group
  const addFaculty = () => {
    setFaculties([...faculties, { name: '', email: '', expertise: '', password: '' }]);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="admin-page">
        <h2>Add Faculty</h2>
        <form onSubmit={handleSubmit}>
          {faculties.map((faculty, index) => (
            <div key={index} className="faculty-form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={faculty.name}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={faculty.email}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <label>Expertise:</label>
              <select
                name="expertise"
                value={faculty.expertise}
                onChange={(e) => handleChange(e, index)}
                className="expertise-dropdown"
                required
              >
                <option value="" disabled>Select Expertise</option>
                <option value="MFCS">MFCS</option>
                <option value="DS">DS</option>
                <option value="DBMS">DBMS</option>
                <option value="C">C</option>
                <option value="WAD">WAD</option>
                <option value="Technician">Technician</option>
              </select>

              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={faculty.password}
                onChange={(e) => handleChange(e, index)}
                required
              />
              {/* Display password error */}
              {errors[index] && <p style={{ color: 'red' }}>{errors[index]}</p>}
            </div>
          ))}
          <button type="button" className="add-button" onClick={addFaculty}>
            Add Another Faculty
          </button>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddFaculty;
