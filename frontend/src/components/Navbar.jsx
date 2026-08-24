import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '16px', backgroundColor: '#f8f9fa', display: 'flex', gap: '16px' }}>
      {!token ? (
        <Link to="/">Login</Link>
      ) : (
        <>
          <Link to="/apply">Apply Leave</Link>
          <Link to="/my-leaves">My Leaves</Link>
          {role === 'HR' && <Link to="/hr">HR Panel</Link>}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
