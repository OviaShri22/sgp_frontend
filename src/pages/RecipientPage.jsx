import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import StudentNavbar from '../components/StudentNavbar';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// Import your no complaints image
import NoComplaintsImage from '../assets/tracking.png'; // Update the path as necessary

const ViewComplaintStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get('email');

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!userEmail) return;

      try {
        const response = await axios.get('http://localhost:5000/api/complaints', {
          params: {
            email: userEmail,
          },
        });

        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, [userEmail]);

  return (
    <div>
      <StudentNavbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container sx={{ marginTop: 18, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Your Complaint Status
          </Typography>
          {complaints.length > 0 ? (
            <TableContainer component={Paper} sx={{ marginTop: 3, marginBottom: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Complaint</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Type</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Expertise</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Time</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow key={complaint._id}>
                      <TableCell>{complaint.complaint}</TableCell>
                      <TableCell>{complaint.status}</TableCell>
                      <TableCell>{complaint.type}</TableCell>
                      <TableCell>{complaint.expertise}</TableCell>
                      <TableCell>{complaint.createdAt.split('T')[0]}</TableCell>
                      <TableCell>
                      {new Date(complaint.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                     })}
                     </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box textAlign="center" sx={{ mt: 3 }}>
              <img
                src={NoComplaintsImage}
                alt="No Complaints"
                style={{ width: '300px', height: 'auto' }} // Adjust size as needed
              />
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                No complaints found.
              </Typography>
            </Box>
          )}
          <Box sx={{ mb: 4 }} /> {/* Adds 4 break spaces after the table */}
        </Container>

        <Box
          component="footer"
          sx={{
            py: 2,
            textAlign: 'center',
            backgroundColor: '#f1f1f1',
            width: '100%',
            mt: 'auto', // Pushes the footer to the bottom of the page
          }}
        >
          {/* Footer content can go here */}
        </Box>
      </Box>
    </div>
  );
};

export default ViewComplaintStatus;
