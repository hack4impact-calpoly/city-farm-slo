const express = require("express");
const Volunteer = require("../models/volunteer");

const router = express.Router();

// #1 - get all volunteers
router.get("/:id", async (req, res) => {
  try {
    let volunteer = await Volunteer.findById(req.params.id);
    res.send({ volunteer });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

// #2 - add a volunteer
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    let volunteer = new Volunteer({
      firstName,
      lastName,
      email,
      phone,
    });

    volunteer = await volunteer.save();
    res.json(volunteer);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

module.exports = router;
