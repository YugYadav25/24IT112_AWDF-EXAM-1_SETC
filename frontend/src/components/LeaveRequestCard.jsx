import React from 'react';

const colors = { 
  pending: '#FFC107', 
  approved: '#28A745', 
  rejected: '#DC3545',
  cancelled: '#6C757D'
};

const LeaveRequestCard = ({ fromDate, toDate, days, leaveType, reason, status }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{leaveType} Leave ({days} days)</h3>
        <span style={{ 
          backgroundColor: colors[status] || colors.pending, 
          color: '#fff', 
          padding: '4px 12px', 
          borderRadius: '16px',
          fontWeight: 'bold',
          textTransform: 'capitalize'
        }}>
          {status}
        </span>
      </div>
      <p><strong>From:</strong> {new Date(fromDate).toLocaleDateString()} <strong>To:</strong> {new Date(toDate).toLocaleDateString()}</p>
      {reason && <p><strong>Reason:</strong> {reason}</p>}
    </div>
  );
};

export default LeaveRequestCard;
