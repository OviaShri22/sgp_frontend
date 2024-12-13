import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import StudentNavbar from '../components/StudentNavbar';
import{Box} from '@mui/material';
const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUserData = {
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
      role: localStorage.getItem('userRole'),
    };
    setUserData(storedUserData);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <StudentNavbar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '10vh',
        }}
      ></Box>
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="mb-4">
        <label className="block font-semibold">Name:</label>
        <p>{userData.name}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Email:</label>
        <p>{userData.email}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Role:</label>
        <p>{userData.role}</p>
      </div>
      <div className="mb-4">
        <NavLink
          to="/reset-password"
          className="text-blue-500 hover:underline"
        >
          Reset Password
        </NavLink>
      </div>
    </div>
  );
};

export default Profile;