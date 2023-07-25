const express = require('express');
const router = express.Router();
const Project = require("../models/projectModel.js");
const mongoose = require('mongoose');

// get all
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ projectID: 1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get one
router.get('/:Projectid', async (req, res) => {
    const { Projectid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(Projectid)) {
        return res.status(404).json({ error: "project not found" });
    }
    const project = await Project.findById(Projectid);
    if (!project) {
        return res.status(404).json({ error: "project not found" });
    }
    res.status(200).json(project);
});

// create one
router.post('/', async (req, res) => {
    const { name, description, projectID, location } = req.body;

    try {
        const project = await Project.create({ name, description, projectID, location });
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete one
router.delete('/:Projectid', async (req, res) => {
    const { Projectid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(Projectid)) {
        return res.status(404).json({ error: "project not found" });
    }
    const project = await Project.findOneAndDelete({ _id: Projectid });
    if (!project) {
        return res.status(404).json({ error: "project not found" });
    }
    res.status(200).json(project);
});

// update
router.patch('/:Projectid', async (req, res) => {
    const { Projectid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(Projectid)) {
        return res.status(404).json({ error: "project not found" });
    }
    const project = await Project.findOneAndUpdate({ _id: Projectid }, { ...req.body }, { new: true });
    if (!project) {
        return res.status(404).json({ error: "project not found" });
    }
    res.status(200).json(project);
});

module.exports = router;