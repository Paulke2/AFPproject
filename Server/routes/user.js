const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id)=> {
    return jwt.sign({_id},process.env.SECRET,{expiresIn:"30d"})
   }

   router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//login route
router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.login(name,password)
        const token = createToken(user._id)
        //we will now send a jason web token (JSW) to ensure that future logins are from this user and their password is correct
        res.status(200).json({name, token})
      } catch (error) {
        res.status(440).json({error:error.message})
      }
    

});
//signin route
router.post("/signup", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.signup(name,password)
    const token = createToken(user._id)
    //we will now send a jason web token (JSW) to ensure that future logins are from this user and their password is correct
    res.status(200).json({name, token})
  } catch (error) {
    res.status(440).json({error:error.message})
  }

});
module.exports = router;
