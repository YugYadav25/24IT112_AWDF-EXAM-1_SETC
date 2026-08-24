require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const LeaveType = require('./models/LeaveType');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/leave-management')
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    
    await Employee.deleteMany({});
    await LeaveType.deleteMany({});

    const leaveTypes = await LeaveType.create([
      { name: 'Casual', maxDaysPerYear: 10 },
      { name: 'Sick', maxDaysPerYear: 5 },
      { name: 'Earned', maxDaysPerYear: 15 },
      { name: 'CompOff', maxDaysPerYear: 5 }
    ]);

    const employees = await Employee.create([
      { name: 'John Doe', email: 'john@example.com', department: 'IT', role: 'Employee', leaveBalance: 20 },
      { name: 'Jane Manager', email: 'jane@example.com', department: 'IT', role: 'Manager', leaveBalance: 20 },
      { name: 'HR Admin', email: 'hr@example.com', department: 'HR', role: 'HR', leaveBalance: 20 }
    ]);

    const LeaveRequest = require('./models/LeaveRequest');
    await LeaveRequest.deleteMany({});
    
    // Create some dummy leave requests for John Doe
    await LeaveRequest.create([
      {
        employeeId: employees[0]._id, // John Doe
        leaveTypeId: leaveTypes[0]._id, // Casual
        fromDate: new Date('2026-09-01'),
        toDate: new Date('2026-09-03'),
        days: 3,
        reason: 'Going out of town for a family event.',
        status: 'pending'
      },
      {
        employeeId: employees[0]._id,
        leaveTypeId: leaveTypes[1]._id, // Sick
        fromDate: new Date('2026-08-10'),
        toDate: new Date('2026-08-11'),
        days: 2,
        reason: 'Severe viral fever.',
        status: 'approved'
      },
      {
        employeeId: employees[0]._id,
        leaveTypeId: leaveTypes[2]._id, // Earned
        fromDate: new Date('2026-07-05'),
        toDate: new Date('2026-07-05'),
        days: 1,
        reason: 'Personal errands.',
        status: 'rejected'
      }
    ]);

    // Update John's balance to reflect the approved sick leave
    await Employee.findByIdAndUpdate(employees[0]._id, {
      $inc: { leaveBalance: -2 }
    });

    console.log('Seeding completed with dummy leave requests!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
