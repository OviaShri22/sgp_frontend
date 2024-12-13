import React, { useEffect, useState } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Modal,
} from '@mui/material';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const AssignComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [faculties, setfaculties] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [open, setOpen] = useState(false);

  // Fetch complaints and faculties
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints');
        const unsolvedComplaints = response.data.filter(complaint => complaint.status !== 'Grievance Solved');
        setComplaints(unsolvedComplaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    const fetchfaculties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/faculties');
        setfaculties(response.data);
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };

    fetchComplaints();
    fetchfaculties();
  }, []);

  // Handle opening the modal to assign a Faculties
  const handleOpen = (complaint) => {
    setSelectedComplaint(complaint);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedComplaint(null);
  };

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
  };

  // Handle assigning a Faculties
  const handleAssignFaculty = async () => {
    if (!selectedComplaint || !selectedFaculty) return;

    const assignedAt = new Date();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/complaints/${selectedComplaint._id}`,
        {
          assignedFaculty: selectedFaculty,
          assignedAt: assignedAt,
        }
      );

      const updatedComplaint = response.data;
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === updatedComplaint._id ? updatedComplaint : complaint
        )
      );
      handleClose();
    } catch (error) {
      console.error('Error assigning Faculties:', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Container sx={{ backgroundColor: '#5b73a8', borderRadius: '8px', padding: '20px', mt: 15 }}>
        <Typography variant="h4" gutterBottom>Assign Complaints to Faculty</Typography>
        <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Expertise</TableCell>
                <TableCell>Complaint</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned Faculty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint._id}>
                  <TableCell>{complaint.rollNo}</TableCell>
                  <TableCell>{complaint.email}</TableCell>
                  <TableCell>{complaint.type}</TableCell>
                  <TableCell>{complaint.expertise}</TableCell>
                  <TableCell>{complaint.complaint}</TableCell>
                  <TableCell>{complaint.severity}</TableCell>
                  <TableCell>{complaint.status}</TableCell>
                  <TableCell>
                    {complaint.assignedFaculty ? (
                      <Typography variant="body1">{complaint.assignedFaculty.name}</Typography>
                    ) : (
                      <Typography variant="body2" color="textSecondary">Not Assigned</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {!complaint.assignedFaculty && (
                      <Button variant="contained" color="primary" onClick={() => handleOpen(complaint)}>
                        Assign Faculty
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Modal for assigning a Faculties */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: 500 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Assign Faculty</Typography>
            {selectedComplaint && (
              <>
                <Typography><strong>Complaint:</strong> {selectedComplaint.complaint}</Typography>
                <Typography><strong>Severity:</strong> {selectedComplaint.severity}</Typography>
                <Typography><strong>Date:</strong> {new Date(selectedComplaint.createdAt).toLocaleDateString()}</Typography>
                <Typography><strong>Time:</strong> {new Date(selectedComplaint.createdAt).toLocaleTimeString()}</Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="Faculty-select-label">Select Faculty</InputLabel>
                  <Select
                    labelId="Faculty-select-label"
                    value={selectedFaculty}
                    onChange={handleFacultyChange}
                  >
                    {faculties.map((faculty) => (
                      <MenuItem key={faculty._id} value={faculty._id}>
                        {faculty.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleAssignFaculty}>
                  Assign
                </Button>
              </>
            )}
          </Paper>
        </Box>
      </Modal>
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

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default AssignComplaints;
