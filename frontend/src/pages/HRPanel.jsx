import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const HRPanel = () => {
  const { role } = useAuth();

  if (role !== 'HR') {
    return <Navigate to="/my-leaves" replace />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>HR Panel</h2>
      <p>Welcome to the HR Panel. This is a protected, lazy-loaded route.</p>
    </div>
  );
};

export default HRPanel;
