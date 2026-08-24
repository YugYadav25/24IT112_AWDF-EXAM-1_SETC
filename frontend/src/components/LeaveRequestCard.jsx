import React from 'react';
import { Calendar, AlignLeft, Clock } from 'lucide-react';

const LeaveRequestCard = ({ fromDate, toDate, days, leaveType, reason, status }) => {
  const statusClass = `status-${status.toLowerCase()}`;
  
  // Set border color based on status for the decorative line
  let badgeColor = '#4f46e5';
  if (status.toLowerCase() === 'approved') badgeColor = '#10b981';
  if (status.toLowerCase() === 'rejected') badgeColor = '#ef4444';
  if (status.toLowerCase() === 'pending') badgeColor = '#f59e0b';

  return (
    <div className="leave-card" style={{ '--status-color': badgeColor }}>
      <div className="leave-card-header">
        <div>
          <h3 className="leave-card-title">{leaveType} Leave</h3>
          <span className="leave-card-days">{days} {days === 1 ? 'Day' : 'Days'}</span>
        </div>
        <span className={`status-badge ${statusClass}`}>
          {status}
        </span>
      </div>
      
      <div className="leave-card-body">
        <div className="leave-card-row">
          <Calendar size={16} />
          <span><strong>From:</strong> {new Date(fromDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="leave-card-row">
          <Clock size={16} />
          <span><strong>To:</strong> {new Date(toDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        
        {reason && (
          <div className="leave-card-reason">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
              <AlignLeft size={16} /> Reason
            </div>
            {reason}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestCard;
