import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Send, Calendar } from 'lucide-react';

const ApplyLeavePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [formData, setFormData] = useState({
    leaveTypeId: '',
    fromDate: '',
    toDate: '',
    reason: ''
  });
  const [days, setDays] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/leave-types');
        setLeaveTypes(res.data);
        if (res.data.length > 0) {
          setFormData(prev => ({ ...prev, leaveTypeId: res.data[0]._id }));
        }
      } catch (err) {
        console.error('Failed to fetch leave types', err);
      }
    };
    fetchLeaveTypes();
  }, []);

  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const from = new Date(formData.fromDate);
      const to = new Date(formData.toDate);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
      setDays(diffDays > 0 ? diffDays : 0);
    } else {
      setDays(0);
    }
  }, [formData.fromDate, formData.toDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/leaves', {
        ...formData,
        days
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/my-leaves');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.details?.join(', ') || 'Application failed');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h2>Submit Leave Application</h2>
        <p className="subtitle">Fill out the form below to request time off.</p>
        
        {error && <div style={{ color: '#dc2626', background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Leave Category</label>
            <select 
              value={formData.leaveTypeId} 
              onChange={(e) => setFormData({...formData, leaveTypeId: e.target.value})}
              style={{ marginTop: 0 }}
            >
              {leaveTypes.map(lt => (
                <option key={lt._id} value={lt._id}>{lt.name} (Max: {lt.maxDaysPerYear} days)</option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>From Date</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="date" 
                  value={formData.fromDate} 
                  onChange={(e) => setFormData({...formData, fromDate: e.target.value})} 
                  required 
                  style={{ marginTop: 0 }}
                />
              </div>
            </div>
            <div className="form-group">
              <label>To Date</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="date" 
                  value={formData.toDate} 
                  onChange={(e) => setFormData({...formData, toDate: e.target.value})} 
                  required 
                  style={{ marginTop: 0 }}
                />
              </div>
            </div>
          </div>
          
          <div style={{ background: '#eff6ff', border: '1px dashed #bfdbfe', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af', fontWeight: '500' }}>
            <Calendar size={20} />
            Computed Duration: {days} {days === 1 ? 'day' : 'days'}
          </div>
          
          <div className="form-group">
            <label>Reason for Leave</label>
            <textarea 
              rows="4"
              value={formData.reason} 
              onChange={(e) => setFormData({...formData, reason: e.target.value})} 
              required 
              placeholder="Please provide a brief reason for your leave request..."
              style={{ marginTop: 0 }}
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={days <= 0}>
            Submit Application <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeavePage;
