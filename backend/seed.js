require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const LeaveType = require('./models/LeaveType');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/leave-management')
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    
    await Employee.deleteMany({});
    await LeaveType.deleteMany({});

    await LeaveType.create([
      { name: 'Casual', maxDaysPerYear: 10 },
      { name: 'Sick', maxDaysPerYear: 5 },
      { name: 'Earned', maxDaysPerYear: 15 },
      { name: 'CompOff', maxDaysPerYear: 5 }
    ]);

    await Employee.create([
      { name: 'John Doe', email: 'john@example.com', department: 'IT', role: 'Employee' },
      { name: 'Jane Manager', email: 'jane@example.com', department: 'IT', role: 'Manager' },
      { name: 'HR Admin', email: 'hr@example.com', department: 'HR', role: 'HR' }
    ]);

    console.log('Seeding completed');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
