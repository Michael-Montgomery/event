const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    // validate: [validateEmail, 'Please enter a valid email address'],
    trim: true
  },
  emailVerified: {
    type: Boolean,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  title: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;