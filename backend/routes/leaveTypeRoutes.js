const express = require('express');
const router = express.Router();
const LeaveType = require('../models/LeaveType');

router.get('/', async (req, res, next) => {
  try {
    const leaveTypes = await LeaveType.find();
    res.json(leaveTypes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
