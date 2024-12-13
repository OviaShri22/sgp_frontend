import React from 'react';
import FacultyNavbar from '../components/FacultyNavbar';
import FeatureSection from '../components/FeatureSection';
import {Box,Typography}from '@mui/material';


const FacultyHome = () => {
  
  
    return (
      <div>
<FacultyNavbar/>
    
<div className="mt-32">
        <FeatureSection />
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: 'rgba(47, 85, 151, 0.9)', 
          color: '#FFFFFF', // White text
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          maxWidth: '600px',
          margin: '20px auto',
          textAlign: 'center',
        }}
      >
        {/* Display the UI instructions */}
        <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          Key Responsibilities for Faculty
        </Typography>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Faculty can view the complaints assigned to them.</li>
          <li>Update the complaint status to "In Progress" once you start addressing it.</li>
          <li>Mark the status as "Grievances Solved" once the complaint is resolved.</li>
          <li>Ensure that all complaints are addressed promptly and without omission.</li>
        </ul>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '10vh',
        }}
      ></Box>
      </div>
    );
  };
  
export default FacultyHome;
