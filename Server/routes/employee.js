const express = require('express');
const router = express.Router();
const Employee = require("../models/employeeModel.js");
const mongoose = require('mongoose');

// get all
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().sort();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get one
router.get('/:employeeid', async (req, res) => {
    const { employeeid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(employeeid)) {
        return res.status(404).json({ error: "employee not found" });
    }
    const employee = await Employee.findById(employeeid);
    if (!employee) {
        return res.status(404).json({ error: "employee not found" });
    }
    res.status(200).json(employee);
});

// create one
router.post('/', async (req, res) => {
    const {
        employeeName,
        officeWorker,
        officeWorkerHours,
        timeCards
      } = req.body;

    try {
        const employee = await Employee.create({
            employeeName,
            officeWorker,
            officeWorkerHours,
            timeCards
          });
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete one
router.delete('/:employeeid', async (req, res) => {
    const { employeeid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(employeeid)) {
        return res.status(404).json({ error: "employee not found" });
    }
    const employee = await Employee.findOneAndDelete({ _id: employeeid });
    if (!employee) {
        return res.status(404).json({ error: "employee not found" });
    }
    res.status(200).json(employeeid);
});

// update
router.patch('/:employeeid', async (req, res) => {
    const { employeeid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(employeeid)) {
        return res.status(404).json({ error: "employee not found" });
    }
    const employee = await Employee.findOneAndUpdate({ _id: employeeid }, { ...req.body }, { new: true });
    if (!employee) {
        return res.status(404).json({ error: "employee not found" });
    }
    res.status(200).json(employee);
});

module.exports = router;