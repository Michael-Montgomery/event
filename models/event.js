const mongoose = require('mongoose');
const userSchema = require('./user');


const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 150
    },
    eventDesctiption: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 650
    },
    eventDate: {
        type: Date,
        required: true
    },
    isPublicEvent: {
        type: Boolean,
        required: true
    },
    addressLine1: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 75
    },
    addressLine2: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 75
    },
    eventCity: {
        type: String,
        trim: true
    },
    eventState: {
        type: String
    },
    eventZip: {
        type: Number
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;