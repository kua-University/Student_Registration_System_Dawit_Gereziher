import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Logout = ({ setToken }) => {
  const history = useHistory();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Clear the Axios Authorization header
    delete axios.defaults.headers.common['Authorization'];

    // Clear the token state
    setToken(null);

    // Redirect to the login page
    history.push('/login');
  };

  return (
    
  );
};

export default Logout;
