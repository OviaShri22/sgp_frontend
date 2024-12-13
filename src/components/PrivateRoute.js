import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the Auth Context for user authentication.

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { currentUser } = useAuth(); // Assuming you have currentUser in AuthContext
  return currentUser ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
