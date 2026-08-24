import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LeaveRequestCard from '../components/LeaveRequestCard';
import { Filter } from 'lucide-react';

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
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h2>Welcome back, {employee?.name} 👋</h2>
        <p className="subtitle">Track and manage your leave requests history</p>
        
        <div className="filter-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>
            <Filter size={20} />
            Filter Status:
          </div>
          <select 
            className="filter-select"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Requests</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
            Loading your leave history...
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
        
        {error && !loading && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
            Failed to load your leave history. Please try again.
          </div>
        )}
        
        {!loading && !error && (
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', background: '#f9fafb', borderRadius: '8px', border: '1px dashed var(--border)' }}>
                No leave requests found matching your filter.
              </div>
            ) : (
              <div className="leave-grid">
                {filtered.map(leave => (
                  <LeaveRequestCard 
                    key={leave._id}
                    fromDate={leave.fromDate}
                    toDate={leave.toDate}
                    days={leave.days}
                    leaveType={leave.leaveTypeId.name}
                    reason={leave.reason}
                    status={leave.status}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLeavesPage;
