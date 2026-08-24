import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LeaveRequestCard from '../components/LeaveRequestCard';

const MyLeavesPage = () => {
  const { employee, token } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/leaves/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLeaves(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchLeaves();
    }
  }, [token]);

  const filtered = leaves.filter(l => filter === 'All' || l.status === filter.toLowerCase());

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {employee?.name}</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Status Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && !loading && <p style={{ color: 'red' }}>Failed to load your leave history.</p>}
      
      {!loading && !error && (
        <div>
          {filtered.length === 0 ? <p>No leave requests found.</p> : (
            filtered.map(leave => (
              <LeaveRequestCard 
                key={leave._id}
                fromDate={leave.fromDate}
                toDate={leave.toDate}
                days={leave.days}
                leaveType={leave.leaveTypeId.name}
                reason={leave.reason}
                status={leave.status}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyLeavesPage;
