const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 75
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 75
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    // validate: [validateEmail, 'Please enter a valid email address'],
    trim: true,
    minLength: 3,
    maxLength: 75
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
    type: String,
    minLength: 3,
    maxLength: 75
  },
  title: {
    type: String,
    minLength: 3,
    maxLength: 75
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
// module.exports = userSchema;