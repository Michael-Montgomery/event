const mongoose = require('mongoose');
const userSchema = require('./user');


const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  eventDescription: {
    type: String,
    trim: true
  },
  eventDate: {
    type: Date,
    required: true,
    // validate: [validateEmail, 'Please enter a valid email address'],
    trim: true
  },
  attendees: [userSchema],
  administrators: [userSchema],
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipCode: {
    type: Number
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;