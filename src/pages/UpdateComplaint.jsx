import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel,
  Modal, Button, CircularProgress
} from '@mui/material';
import axios from 'axios';
import FacultyNavbar from '../components/FacultyNavbar';

const UpdateComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const facultyId = localStorage.getItem('facultyId');
        if (!facultyId) {
          console.error('faculty ID not found in local storage');
          return;
        }

        // Fetch complaints assigned to the technician
        const response = await axios.get(`http://localhost:5000/api/faculties/complaints?facultyId=${facultyId}`);
        setComplaints(response.data);
        setFilteredComplaints(response.data); // Set both states with the same data initially
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchComplaints();
  }, []);

  // Filter complaints based on selected lab and exclude 'Grievance Solved' complaints
  useEffect(() => {
    let filtered = complaints;
    if (selectedType) {
      filtered = complaints.filter(complaint => complaint.type === selectedType);
    }
    filtered = filtered.filter(complaint => complaint.status !== 'Grievance Solved');
    setFilteredComplaints(filtered);
  }, [selectedType, complaints]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleOpen = (complaint) => {
    setSelectedComplaint(complaint);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedComplaint(null);
  };

  const handleStatusUpdate = async (status) => {
    if (!selectedComplaint) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/complaints/status/${selectedComplaint._id}`,
        { status }
      );

      const updatedComplaint = response.data;

      // Update complaints array and remove solved complaints
      setComplaints((prevComplaints) =>
        prevComplaints
          .map(complaint => complaint._id === updatedComplaint._id ? updatedComplaint : complaint)
          .filter(complaint => complaint.status !== 'Grievance Solved')
      );

      handleClose(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  return (
    <div>
      <FacultyNavbar />
      <Container className="mt-32">
        <Typography variant="h4" gutterBottom>Update Complaints</Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel id="type-filter-label">Filter by Type</InputLabel>
            <Select
              labelId="type-filter-label"
              value={selectedType}
              onChange={handleTypeChange}
              label="Filter by Type"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Complaint">Complaint</MenuItem>
              <MenuItem value="Feedback">Feedback</MenuItem>
              <MenuItem value="Technical Issues">Technical Issues</MenuItem>
              <MenuItem value="Information">Information</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Show loading spinner while fetching complaints */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress />
          </Box>
        ) : (
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
                  <TableCell>Complaint</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredComplaints.map((complaint, index) => (
                  <TableRow key={index} onClick={() => handleOpen(complaint)} style={{ cursor: 'pointer' }}>
                    <TableCell>{complaint.anonymous ? 'Anonymous User' : complaint.rollNo}</TableCell>
                    <TableCell>{complaint.anonymous ? 'Anonymous Email' : complaint.email}</TableCell>
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
        )}
      </Container>

      <ComplaintModal
        open={open}
        handleClose={handleClose}
        complaint={selectedComplaint}
        handleStatusUpdate={handleStatusUpdate}
      />
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

// Separate Modal component for updating complaints
const ComplaintModal = ({ open, handleClose, complaint, handleStatusUpdate }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    width: 400,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="complaint-modal-title"
      aria-describedby="complaint-modal-description"
    >
      <Box sx={style}>
        <Typography id="complaint-modal-title" variant="h6" component="h2">
          Complaint Details
        </Typography>
        {complaint && (
          <>
            <Typography><strong>Roll No:</strong> {complaint.anonymous ? 'Anonymous User' : complaint.rollNo}</Typography>
            <Typography><strong>Email:</strong> {complaint.anonymous ? 'Anonymous Email' : complaint.email}</Typography>
            <Typography><strong>Type:</strong> {complaint.type}</Typography>
            <Typography><strong>Expertise:</strong> {complaint.expertise}</Typography>
            <Typography><strong>Date:</strong> {complaint.createdAt.split('T')[0]}</Typography>
            <Typography>
              <strong>Time:</strong> {new Date(complaint.createdAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              })}
            </Typography>
            <Typography><strong>Complaint:</strong> {complaint.complaint}</Typography>
            <Typography><strong>Current Status:</strong> {complaint.status}</Typography>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button variant="contained" color="primary" onClick={() => handleStatusUpdate('In Process')}>
                In Process
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleStatusUpdate('Grievance Solved')}>
                Grievance Solved
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default UpdateComplaint;