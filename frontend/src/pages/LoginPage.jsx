import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', { email });
      login(res.data.token, res.data.employee);
      navigate('/my-leaves');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container container-sm">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
            <LogIn size={24} />
          </div>
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your TechSolutions portal</p>
        </div>
        
        {error && <p style={{ color: '#dc2626', background: '#fee2e2', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="john@example.com"
                style={{ paddingLeft: '2.5rem', marginTop: '0' }}
              />
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Sign In <LogIn size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
