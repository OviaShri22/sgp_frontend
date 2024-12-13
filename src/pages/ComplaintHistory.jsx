import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
 // Adjust the import as per your project structure

const HistoryOfComplaints = () => {
  const [solvedComplaints, setSolvedComplaints] = useState([]);

  useEffect(() => {
    const fetchSolvedComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints');
        setSolvedComplaints(response.data); // Update state with the solved complaints
      } catch (error) {
        console.error('Error fetching solved complaints:', error);
      }
    };
  
    fetchSolvedComplaints();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <Container className="mt-32">
        <Typography variant="h4" gutterBottom>
          History of Solved Complaints
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Expertise</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solvedComplaints.map((complaint, index) => (
                <TableRow key={index}>
                  <TableCell>{complaint.rollNo}</TableCell>
                  <TableCell>{complaint.email}</TableCell>
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
                  <TableCell>{complaint.complaint}</TableCell>
                  <TableCell>{complaint.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '5vh',
        }}
      ></Box>
    </div>
  );
};

export default HistoryOfComplaints;
