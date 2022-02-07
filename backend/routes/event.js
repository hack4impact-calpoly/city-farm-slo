const express = require("express");
const Event = require("../models/event");

const router = express.Router();

// #1 - get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({});
    res.send(events);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

// #2 - add an event
router.post("/add", async (req, res) => {
  try {
    const { title, location, start, end, slots, notes } = req.body;
    let event = new Event({
      title,
      location,
      start,
      end,
      slots,
      notes,
      volunteers: [],
    });
    event = await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

module.exports = router;
