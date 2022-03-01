const express = require("express");
const { validationResult, check } = require("express-validator");
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
router.post(
  "/register",
  check("firstName").isString().withMessage("Not a string"),
  check("lastName").isString().withMessage("Not a string"),
  check("email").isEmail().withMessage("Not an email"),
  check("phone").isMobilePhone().withMessage("Not a phone number"),
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const volunteer = await Volunteer.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
      });
      volunteer.save();
      res.json(volunteer);

      // update event with volunteer
      const { eventID } = req.body;
      await Event.findByIdAndUpdate(eventID, {
        $push: { volunteers: volunteer._id },
      });
    } catch (error) {
      res.status(500).send(error.message);
      console.log(`error is ${error.message}`);
    }
  }
);

module.exports = router;
