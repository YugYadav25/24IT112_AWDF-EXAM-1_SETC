const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  designation: { type: String },
  role: { 
    type: String, 
    enum: ['Employee', 'Manager', 'HR'],
    default: 'Employee'
  },
  leaveBalance: { 
    type: Number, 
    default: 20, 
    min: 0 
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
