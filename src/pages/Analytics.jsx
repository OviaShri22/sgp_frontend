import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Container, Typography, Box, Grid } from "@mui/material";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminAnalytics = () => {
  const [complaintData, setComplaintData] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/complaints");
        setComplaintData(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  const totalComplaints = complaintData.length;
  const solvedComplaints = complaintData.filter(
    (complaint) => complaint.status.toLowerCase() === "grievance solved"
  ).length;
  const pendingComplaints = totalComplaints - solvedComplaints;

  const statusCounts = complaintData.reduce((acc, complaint) => {
    const status = complaint.status ? complaint.status.toLowerCase() : "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Complaints",
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <AdminNavbar />
      <Container>
        <Box mt={10}>
          <Typography variant="h4" gutterBottom>
            Complaints Analytics
          </Typography>

          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Total Complaints: {totalComplaints}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Solved Complaints: {solvedComplaints}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Pending Complaints: {pendingComplaints}</Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: "20px",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 500 }}>
              <Bar data={barChartData} />
            </Box>
            <Box sx={{ width: "100%", maxWidth: 400 }}>
              <Pie data={pieChartData} />
            </Box>
          </Box>
        </Box>
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

export default AdminAnalytics;
