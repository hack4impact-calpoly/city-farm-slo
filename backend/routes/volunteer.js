const express = require("express");
const Volunteer = require("../models/volunteer");

const router = express.Router();

// #1 - get all volunteers
router.get("/volunteer/:id", async (req, res) => {
  try {
    res.send({req})
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

// #2 - add a volunteer
router.post("/volunteer/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, notes, eventID } = req.body;
    let volunteer = new Volunteer({
        firstName,
        lastName,
        email,
        phone,
        notes,
        eventID
    });

    volunteer = await volunteer.save();
    res.json(volunteer);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

module.exports = router;
