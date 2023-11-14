const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  fullName: String,
  email: String,
  googleId:String,
  picture:String,
});

const User = mongoose.model('User', userSchema);

module.exports =   User;