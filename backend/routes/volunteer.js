const express = require("express");
const Volunteer = require("../models/volunteer");
const Event = require("../models/event");

const router = express.Router();

// #1 - get all volunteers
router.get("/:id", async (req, res) => {
  try {
    const volunteer =
      (await Volunteer.findById(req.params.id)) ?? "Volunteer not found";
    res.send(volunteer);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

// #2 - add a volunteer
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body.volunteer;
    const { eventID } = req.body;

    if (!eventID) {
      res.status(400).send("Missing eventID");
      return;
    }

    let volunteer = new Volunteer({
      firstName,
      lastName,
      email,
      phone,
    });
    volunteer = await volunteer.save();
    await Event.findByIdAndUpdate(eventID, {
      $push: { volunteers: volunteer._id },
    });
    res.json(volunteer);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

module.exports = router;
