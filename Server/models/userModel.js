const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
});



//our signup method
userSchema.statics.signup = async function(name, password){
  const exists = await this.findOne({ name });

  if (exists) {
    throw Error("user already in database")
  }
  //we add a "salt" to the end of the password to prevent password matching if one password. wee do this by creating a signature that hashes the password and name together. future 
  //logins should match this signature. i am using jsonwebtoken lib to create these signatures
  //is found
  const salt = await bcrypt.genSalt(10)
  //hash will be our password hashed with salt thing at the end
  const hash = await bcrypt.hash(password,salt)

  const user = await this.create({name,password:hash})
  return user
};

module.exports = mongoose.model("user", userSchema);
