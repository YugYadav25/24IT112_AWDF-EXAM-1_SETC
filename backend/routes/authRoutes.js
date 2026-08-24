const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

router.post('/login', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required for login' });
    }
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: employee._id, role: employee.role, name: employee.name },
      process.env.JWT_SECRET || 'supersecretjwt',
      { expiresIn: '1d' }
    );
    
    res.json({ token, employee });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
