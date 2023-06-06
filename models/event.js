// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
// const userSchema = require('./user');


const EventSchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
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
    },
    attendees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    eventAdmins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
}, { timestamps: true});

const Event = model('event', EventSchema);

module.exports = Event;