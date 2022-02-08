const express = require("express");
const Volunteer = require("../models/volunteer");

const router = express.Router();

// #1 - get all volunteers
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.send(volunteers);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

// #2 - add a volunteer
router.post("/add", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, notes } = req.body;
    let volunteer = new Volunteer({
        firstName,
        lastName,
        email,
        phone,
        notes,
    });
    volunteer = await volunteer.save();
    res.json(volunteer);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

module.exports = router;
