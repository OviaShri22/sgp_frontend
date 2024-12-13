import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import AdminNavbar from '../components/AdminNavbar';
import config from '../components/config';

const ViewUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${config.BASE_API_URL}/api/users`);
            const result = await response.json();
            setUsers(result);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${config.BASE_API_URL}/api/users/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('User deleted successfully');
                fetchUsers(); // Refresh the user list after deletion
            } else {
                const result = await response.json();
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    return (

        <div>
             <AdminNavbar />
        <Container className="mt-32">
            <Typography variant="h4" gutterBottom>View Users</Typography>
            <Grid container spacing={2}>
                {users.map((user) => (
                    <Grid item xs={12} key={user._id}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" borderBottom="1px solid #ccc" paddingBottom="8px">
                            <Typography variant="body1">{user.name}</Typography>
                            <Typography variant="body1">{user.email}</Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDelete(user._id)}
                            >
                                Remove
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
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

export default ViewUsers;
