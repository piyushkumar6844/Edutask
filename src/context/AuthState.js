// AuthState.js
import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';

const AuthState = (props) => {
  const host = "https://edutask-backend.onrender.com";
  const [user, setUser] = useState(null);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.authtoken);
      setUser(data.user); // Assuming setUser updates the user context state
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null); // Assuming setUser updates the user context state
  };

  // Other authentication-related functions can be added here

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
