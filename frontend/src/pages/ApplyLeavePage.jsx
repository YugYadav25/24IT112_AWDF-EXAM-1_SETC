import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '20px' }}>
      <h2>Apply for Leave</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Leave Type: </label>
          <select 
            value={formData.leaveTypeId} 
            onChange={(e) => setFormData({...formData, leaveTypeId: e.target.value})}
          >
            {leaveTypes.map(lt => (
              <option key={lt._id} value={lt._id}>{lt.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>From Date: </label>
          <input 
            type="date" 
            value={formData.fromDate} 
            onChange={(e) => setFormData({...formData, fromDate: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label>To Date: </label>
          <input 
            type="date" 
            value={formData.toDate} 
            onChange={(e) => setFormData({...formData, toDate: e.target.value})} 
            required 
          />
        </div>
        <div>
          <p>Computed Days: {days}</p>
        </div>
        <div>
          <label>Reason: </label>
          <textarea 
            value={formData.reason} 
            onChange={(e) => setFormData({...formData, reason: e.target.value})} 
            required 
          />
        </div>
        <button type="submit" disabled={days <= 0}>Submit</button>
      </form>
    </div>
  );
};

export default ApplyLeavePage;
