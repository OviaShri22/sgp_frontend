import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Stack, TextField, Typography, Paper, Snackbar, Alert, MenuItem, FormControl, InputLabel, Select, Checkbox, FormControlLabel } from '@mui/material';
import { BlueButton } from '../components/buttonStyles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import psg from '../assets/psg.webp';

const Complain = () => {
    const [form, setForm] = useState({
        rollNo: '',
        email: '',
        type: '',
        expertise: '',
        complaint: '',
        anonymous: '',
        document: '',
    });
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const navigate = useNavigate();

    useEffect(() => {
        // Assuming user's email is stored in local storage or available via some API/context
        const loggedInUserEmail = localStorage.getItem('userEmail') || ''; // Replace with actual source
        const userRollNo = loggedInUserEmail.slice(0, 7); // First 7 characters of email for Roll No

        // Auto-fill the email and roll number
        setForm((prevForm) => ({
            ...prevForm,
            email: loggedInUserEmail,
            rollNo: userRollNo,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleAnonymousChange = (e) => {
        setIsAnonymous(e.target.checked);
        setForm((prevForm) => ({
            ...prevForm,
            anonymous: e.target.checked, // Update the form state as well
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAnonymous && !selectedFile) {
            setMessage('Proof is required when registering anonymously.');
            setSeverity('error');
            setOpen(true);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('rollNo', form.rollNo);
            formData.append('email', form.email);
            formData.append('type', form.type);
            formData.append('expertise', form.expertise);
            formData.append('complaint', form.complaint);
            formData.append('anonymous', isAnonymous); // Add isAnonymous to the form data
            if (selectedFile) {
                formData.append('document', selectedFile);
            }
            await axios.post('http://localhost:5000/api/complaints', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 10000,
            });
            setMessage('Complaint registered successfully');
            setSeverity('success');
            setOpen(true);

            // Clear form fields
            setForm({
                rollNo: form.rollNo, // Keep the rollNo as it is auto-filled
                email: form.email,   // Keep the email as it is auto-filled
                type: '',
                expertise: '',
                complaint: '',
                anonymous: '',
                document: '',
            });
            setSelectedFile(null);
            setIsAnonymous(false);
        } catch (error) {
            setMessage('Error registering complaint');
            setSeverity('error');
            setOpen(true);
            console.error('There was an error registering the complaint!', error);
        }
    }


    const handleClose = () => {
        setOpen(false);
    };

    // Determine the label for the text field dynamically
    const textFieldLabel = form.type === 'Complaint' ? 'Complaint' :
        form.type === 'Feedback' ? 'Feedback' :
            form.type === 'Information' ? 'Information' :
                form.type === 'Technical Issues' ? 'Technical Issues' :
                    'Complaint/Feedback/Information/Technical Issues'; 

    return (
        <Container
            sx={{
                height: '100vh',
                backgroundImage: `url(${psg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container sx={{ py: '100px', px: 5 }} spacing={2} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Paper elevation={6} sx={{ p: 4 }}>
                        <Box
                            sx={{
                                maxWidth: 550,
                                width: '100%'
                            }}
                        >
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Stack spacing={5} sx={{ mb: 4 }}>
                                    <Typography variant="h4" align="center">Register Complaint</Typography>
                                </Stack>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={10}>
                                        <TextField
                                            fullWidth
                                            label="Roll No"
                                            type="text"
                                            name="rollNo"
                                            value={form.rollNo}
                                            onChange={handleChange}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            disabled // Disable to prevent editing
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            disabled // Disable to prevent editing
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth required>
                                            <InputLabel>Type</InputLabel>
                                            <Select
                                                name="type"
                                                value={form.type}
                                                onChange={handleChange}
                                                label="Type"
                                            >
                                                <MenuItem value="Complaint">Complaint</MenuItem>
                                                <MenuItem value="Feedback">Feedback</MenuItem>
                                                <MenuItem value="Information">Information</MenuItem>
                                                <MenuItem value="Technical Issues">Technical Issues</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth required>
                                            <InputLabel>Expertise</InputLabel>
                                            <Select
                                                name="expertise"
                                                value={form.expertise}
                                                onChange={handleChange}
                                                label="Expertise"
                                            >
                                                {['MFCS', 'DS', 'C', 'WAD', 'DBMS', 'Others'].map((subject) => (
                                                    <MenuItem key={subject} value={subject}>
                                                        {subject}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label={textFieldLabel} // Dynamic label here
                                            variant="outlined"
                                            name="complaint"
                                            value={form.complaint}
                                            onChange={handleChange}
                                            required
                                            multiline
                                            maxRows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isAnonymous}
                                                    onChange={handleAnonymousChange}
                                                />
                                            }
                                            label="Register as Anonymous"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            type="file"
                                            accept="image/*"
                                            id='file'
                                            name="file"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            onChange={handleFileChange}
                                            required={isAnonymous}
                                            label={isAnonymous ? "Proof (Required for Anonymous)" : "Proof (Optional)"}
                                        />
                                    </Grid>

                                </Grid>
                                <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                                    <BlueButton
                                        size="large"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Submit
                                    </BlueButton>
                                </Box>
                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Complain;