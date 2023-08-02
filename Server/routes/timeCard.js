const express = require('express');
const router = express.Router();
const TimeCard = require("../models/timeCardModel.js");
const mongoose = require('mongoose');

// get all
router.get('/', async (req, res) => {
    try {
        const timeCards = await TimeCard.find().sort();
        res.status(200).json(timeCards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get one
router.get('/:timeCardid', async (req, res) => {
    const { timeCardid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(timeCardid)) {
        return res.status(404).json({ error: "timeCard not found" });
    }
    const timeCard = await TimeCard.findById(timeCardid);
    if (!timeCard) {
        return res.status(404).json({ error: "timeCard not found" });
    }
    res.status(200).json(timeCard);
});

// create one
router.post('/', async (req, res) => {
    const {
        startOfWeek,
        Sunday,
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        employeeName,
        totalHours
    
      } = req.body;

    try {
        const timeCard = await TimeCard.create({
            startOfWeek,
            Sunday,
            Monday,
            Tuesday,
            Wednesday,
            Thursday,
            Friday,
            Saturday,
            employeeName,
            totalHours
        
          });
        res.status(200).json(timeCard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// delete one
router.delete('/:timeCardid', async (req, res) => {
    const { timeCardid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(timeCardid)) {
        return res.status(404).json({ error: "timeCard not found" });
    }
    const timeCard = await TimeCard.findOneAndDelete({ _id: timeCardid });
    if (!timeCard) {
        return res.status(404).json({ error: "timeCard not found" });
    }
    res.status(200).json(timeCardid);
});

// update
router.patch('/:timeCardid', async (req, res) => {
    const { timeCardid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(timeCardid)) {
        return res.status(404).json({ error: "timeCard not found" });
    }
    const timeCard = await TimeCard.findOneAndUpdate({ _id: timeCardid }, { ...req.body }, { new: true });
    if (!timeCard) {
        return res.status(404).json({ error: "timeCard not found" });
    }
    res.status(200).json(timeCard);
});

module.exports = router;