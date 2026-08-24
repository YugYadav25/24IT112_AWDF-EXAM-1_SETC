import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setEmployee(payload);
        setRole(payload.role);
      } catch (err) {
        setToken(null);
        setEmployee(null);
        setRole(null);
      }
    } else {
      setEmployee(null);
      setRole(null);
    }
  }, [token]);

  const login = (newToken, employeeData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ employee, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
