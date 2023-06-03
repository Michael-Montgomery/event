const express = require("express");
const router = express.Router();

const Event = require("../../models/event")

// Get all events
router.get("/", async function (req, res) {
 Event.find()
 .populate("owner")
 .populate("attendees")
 .then((event) => res.json(event))
});

//Get event by ID
router.get("/:id", async function (req, res) {
  Event.find({ _id: req.params.id})
 .populate("owner")
 .populate("attendees")
 .then((event) => res.json(event))
})




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

// Delete event

router.delete("/:id", async function (req, res) {
  try {
      await Event.findByIdAndDelete({ _id: req.params.id });
      res.send('Deleted!')
  } catch (err) {
      console.log(err)
  }
})

// Add attendee(s) to an event

router.post("/:id/attendees/add", async function (req, res) {
  const attendeesToAdd = JSON.parse(req.body.attendees)


  attendeesToAdd.forEach(async (val) => {
    await Event.findOneAndUpdate({ _id: req.params.id }, 
      { $addToSet: { attendees: val}},
      { new: true})
  })





  res.json('complete')

})

// About page route.
router.get("/about", function (req, res) {
  res.send("about events");
});

module.exports = router;