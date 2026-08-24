const express = require('express');
const router = express.Router();
const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../models/Employee');

// GET /api/v1/leaves/my
router.get('/my', async (req, res, next) => {
  try {
    const leaves = await LeaveRequest.find({ employeeId: req.employee.id })
      .populate('leaveTypeId', 'name maxDaysPerYear');
    res.json(leaves);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/leaves
router.post('/', async (req, res, next) => {
  try {
    const { leaveTypeId, fromDate, toDate, days, reason } = req.body;
    
    // validate days <= employee.leaveBalance
    const employee = await Employee.findById(req.employee.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    if (days > employee.leaveBalance) {
      return res.status(400).json({ error: 'Leave request exceeds remaining balance' });
    }

    const leaveRequest = new LeaveRequest({
      employeeId: req.employee.id,
      leaveTypeId,
      fromDate,
      toDate,
      days,
      reason,
      status: 'pending' // default
    });

    await leaveRequest.save();

    // deduct days from employee.leaveBalance
    await Employee.findByIdAndUpdate(req.employee.id, {
      $inc: { leaveBalance: -days }
    });

    res.status(201).json(leaveRequest);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/v1/leaves/:id/status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const ALLOWED = ['approved', 'rejected'];
    
    if (!ALLOWED.includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Allowed values are approved, rejected' });
    }

    // Role check for manager/hr? Let's assume HR or Manager. The requirement says:
    // "Manager approves/rejects a request (protected)".
    if (req.employee.role === 'Employee') {
      return res.status(403).json({ error: 'Forbidden: Managers only' });
    }

    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    leaveRequest.status = status;
    await leaveRequest.save();

    // If rejected, we might want to refund the balance, but requirements don't strictly mention it.
    if (status === 'rejected') {
      await Employee.findByIdAndUpdate(leaveRequest.employeeId, {
        $inc: { leaveBalance: leaveRequest.days }
      });
    }

    res.json(leaveRequest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
