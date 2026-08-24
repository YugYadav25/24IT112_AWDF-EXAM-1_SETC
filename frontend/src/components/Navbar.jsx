import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CalendarDays, LogOut, Briefcase, PlusCircle, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { token, role, logout, employee } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <Link to={token ? "/my-leaves" : "/"} className="brand">
        <Briefcase size={24} />
        TechSolutions
      </Link>
      
      <div className="nav-links">
        {!token ? (
          <Link to="/">Sign In</Link>
        ) : (
          <>
            <Link to="/apply"><PlusCircle size={18} /> Apply Leave</Link>
            <Link to="/my-leaves"><CalendarDays size={18} /> My Leaves</Link>
            {role === 'HR' && <Link to="/hr"><LayoutDashboard size={18} /> HR Panel</Link>}
            
            <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.5rem' }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.875rem' }}>
                {employee?.name?.charAt(0) || 'U'}
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
