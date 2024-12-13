import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
} from "@mui/material";
import axios from "axios";
import FacultyNavbar from "../components/FacultyNavbar";
import { Link } from "react-router-dom";
import DocumentViewer from "./DocumentViewer";
import config from '../components/config';

export const FacultyComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const facultyId = localStorage.getItem("facultyId");

        if (!facultyId) {
          console.error("Faculty ID not found in local storage");
          return;
        }

        console.log("Fetching complaints for faculty ID:", facultyId);
        const response = await axios.get(
          `${config.BASE_API_URL}/api/faculties/complaints?facultyId=${facultyId}`
        );

        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On Process":
        return "warning";
      case "Grievance Solved":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div>
      <FacultyNavbar />
      <Container className="mt-32">
        <Typography variant="h4" gutterBottom>
          Assigned Complaints
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Complaint</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Expertise</TableCell>
                <TableCell>Proof</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <TableRow key={complaint._id}>
                    <TableCell>{complaint.complaint}</TableCell>
                    <TableCell>{complaint.type}</TableCell>
                    <TableCell>{complaint.expertise}</TableCell>
                    <TableCell>
                      {complaint.document ? (
                        <DocumentViewer
                          url={`${config.BASE_API_URL}/${decodeURIComponent(
                            complaint.document
                          )}`}
                        />
                      ) : (
                        "No Document"
                      )}
                      
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.severity}
                        color={getSeverityColor(complaint.severity)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.status}
                        color={getStatusColor(complaint.status)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No complaints assigned to you.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
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

export default FacultyComplaints;