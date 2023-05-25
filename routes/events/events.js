const express = require("express");
const router = express.Router();

const Event = require("../../models/event")

// Get all events
router.get("/", async function (req, res) {
  try {
    let foundEvents = await Event.find({});
    res.json(foundEvents)
  } catch (err) {
    res.send(err)
  }
});




// Add new event

router.post("/", async function (req, res) {
  const newEvent = new Event(req.body);
  newEvent.save();
  if (newEvent) {
    res.status(200).json(newEvent);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Add attendee(s) to an event

router.post("/:id/attendees/add", async function (req, res) {
  const attendeesToAdd = JSON.parse(req.body.attendees)


  attendeesToAdd.forEach(async (val) => {
    await Event.updateOne({ _id: req.params.id }, {
      '$push': {
        "attendees": val
      }
    })
  })





  res.json('complete')

})

// About page route.
router.get("/about", function (req, res) {
  res.send("about events");
});

module.exports = router;