const express = require("express");
const router = express.Router();
require('dotenv').config();

// import * as OTPAuth from "otpauth";

const OTPAuth = require("otpauth")


// nexmo (sms) configuration

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_SECRET
});

// otp configuration

let totp = new OTPAuth.TOTP({
    issuer: "ACME",
    label: "AzureDiamond",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: process.env.OTP_SECRET, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
  });


const User = require('../../models/user');



// Get all users
router.get("/", async function (req, res) {
    try {
        let foundUsers = await User.find({});
        res.json(foundUsers)
    } catch (err) {
        res.send(err)
    }
});

// Get user by ID

router.get("/:id", function (req, res) {
    try{
        User.findOne({_id: req.params.id}).then((foundUser => {
            res.json(foundUser)
        }))
    } catch {
        res.send(err)
    }
});


// Add new user
router.post("/", async function (req, res) {

    const isEmailPresent = await User.findOne({email: req.body.email});

    if(isEmailPresent) {
        res.status(400).send('Email address is already in system! Please Login')
    } else {

        let newUserData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            emailVerified: false,
            company: req.body.company || null,
            title: req.body.title || null
        }
        
        const newUser = new User(newUserData);
        newUser.save();
        if (newUser) {
          res.status(200).json(newUser);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
    }   
});

// Update user
router.put("/:id", async function (req, res) {
    try {
       const doc = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
       res.json(doc)
    } catch (err) {
        res.send(err)
    }
})

//Delete user

router.delete("/:id", async function(req, res) {
    try {
        await User.findByIdAndDelete({_id: req.params.id});
        res.send('Deleted!')
    } catch (err) {
        console.log(err)
    }
    
})

// Send OTP via sms

router.post("/:id/issueotp", async function (req, res) {
    let token = totp.generate();
    let retrievedUser = await User.findOne({_id: req.params.id});

    nexmo.message.sendSms(
        process.env.VIRTUAL_PHONE_NUMBER, retrievedUser.phoneNumber, `EasyVent: your verification code is ${token}. This code expires in 30 minutes.`,
          (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              console.dir(responseData);
            }
          }
       );

       res.send('sent!')

})


// Authenticate OTP

router.post("/:id/:otp", async function (req, res) {

    let retrievedUser = await User.findOne({_id: req.params.id});

    let delta = totp.validate({ token, window: 1 });

    delta ? true : false;
})



module.exports = router;