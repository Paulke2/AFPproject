const express = require('express');
const router = express.Router();
const DesignJob = require("../models/designJobs.js");
const mongoose = require('mongoose');

// get all
router.get('/', async (req, res) => {
    try {
        const designJobs = await DesignJob.find().sort();
        res.status(200).json(designJobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get one
router.get('/:designJobid', async (req, res) => {
    const { designJobid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(designJobid)) {
        return res.status(404).json({ error: "design Job not found" });
    }
    const designJob = await DesignJob.findById(designJobid);
    if (!designJob) {
        return res.status(404).json({ error: "design Job not found" });
    }
    res.status(200).json(designJob);
});

// create one
router.post('/', async (req, res) => {
    const {
        projectName,
        dueDate,
        estimatedTime,
        priority,
        assignedTo,
        currentContainer,
        comments
      } = req.body;

    try {
        const designJob = await DesignJob.create({
            projectName,
        dueDate,
        estimatedTime,
        priority,
        assignedTo,
        currentContainer,
        comments
          });
        res.status(200).json(designJob);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete one
router.delete('/:designJobid', async (req, res) => {
    const { designJobid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(designJobid)) {
        return res.status(404).json({ error: "design Job not found" });
    }
    const designJob = await DesignJob.findOneAndDelete({ _id: designJobid });
    if (!designJob) {
        return res.status(404).json({ error: "design Job not found" });
    }
    res.status(200).json(designJobid);
});

// update
router.patch('/:designJobid', async (req, res) => {
    const { designJobid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(designJobid)) {
        return res.status(404).json({ error: "design Job not found" });
    }
    const designJob = await DesignJob.findOneAndUpdate({ _id: designJobid }, { ...req.body }, { new: true });
    if (!designJob) {
        return res.status(404).json({ error: "design Job not found" });
    }
    res.status(200).json(designJob);
});

module.exports = router;
