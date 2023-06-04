const express = require("express");
const router = express.Router();

const Event = require("../../models/event")

// Get all events
router.get("/", async function (req, res) {
  Event.find()
    .populate("owner")
    .populate("attendees")
    .populate("eventAdmins")
    .then((event) => res.json(event))
});

//Get event by ID
router.get("/:id", async function (req, res) {
  Event.find({ _id: req.params.id })
    .populate("owner")
    .populate("attendees")
    .populate("eventAdmins")
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

// Update event

router.put("/:id", async function (req, res) {
  try {
    const doc = await Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.json(doc)
  } catch (err) {
    res.send(err)
  }
})

// Delete event

router.delete("/:id", async function (req, res) {
  try {
    await Event.findByIdAndDelete({ _id: req.params.id });
    res.send(`Event ${req.params.id} has been deleted from the database!`)
  } catch (err) {
    console.log(err)
  }
})

// Add attendee(s) to an event

router.post("/:id/attendees/add", async function (req, res) {
  const attendeesToAdd = JSON.parse(req.body.attendees)
  attendeesToAdd.forEach(async (val) => {
    await Event.findOneAndUpdate({ _id: req.params.id },
      { $addToSet: { attendees: val } },
      { new: true })
  })
  res.status(201).json(`${attendeesToAdd.length} attendees have successfully been added to event ${req.params.id}!`)
})

// Remove attendees from event

router.post("/:id/attendees/remove", async function (req, res) {
  const attendeesToRemove = JSON.parse(req.body.attendees)

  attendeesToRemove.forEach(async (val) => {
    await Event.findByIdAndUpdate({_id: req.params.id},
      {$pull: {attendees: val}})
  })
  res.status(201).json(`${attendeesToRemove.length} attendees have successfully been removed from event ${req.params.id}!`)
})

// add admins to an event

router.post("/:id/eventadmins/add", async function (req, res) {
  const adminsToAdd = JSON.parse(req.body.eventAdmins)

  adminsToAdd.forEach(async (val) => {
    await Event.findOneAndUpdate({ _id: req.params.id },
      { $addToSet: { eventAdmins: val } },
      { new: true })
  })
  res.status(201).json(`${adminsToAdd.length} administrators have successfully been added to event ${req.params.id}!`)
})

// Remove admins from an event

router.post("/:id/eventadmins/remove", async function (req, res) {
  const eventAdminsToRemove = JSON.parse(req.body.eventAdmins)

  attendeesToRemove.forEach(async (val) => {
    await Event.findByIdAndUpdate({_id: req.params.id},
      {$pull: {eventAdmins: val}})
  })
  res.status(201).json(`${eventAdminsToRemove.length} administrators have successfully been removed from event ${req.params.id}!`)
})

// About page route.
router.get("/about", function (req, res) {
  res.send("about events");
});

module.exports = router;