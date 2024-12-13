import React, { useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = React.createContext();

// Hook to access AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component that wraps the rest of the app
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // You would replace this logic with actual login/auth code.
    useEffect(() => {
        const user = localStorage.getItem('user'); // Example: Get user from localStorage
        setCurrentUser(user);
    }, []);

    const value = {
        currentUser,
        login: (user) => setCurrentUser(user),  // Define your login logic here
        logout: () => setCurrentUser(null),     // Define your logout logic here
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
    