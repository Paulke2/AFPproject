const express = require('express');
const router = express.Router();
const user = require("../models/userModel.js");
const mongoose = require('mongoose');
//login route
router.post('/login', async (req, res)=>{
res.json({mssg:"login user"})

})
//login route
router.post('/signup', async (req, res)=>{
    res.json({mssg:"sign up user"})
    
    })
module.exports = router