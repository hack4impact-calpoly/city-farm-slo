const express = require("express");
const { validationResult, check } = require("express-validator");
const mongoose = require("mongoose");
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
// router.post(
//   "/register",
//   check("firstName").isString().withMessage("Not a string"),
//   check("lastName").isString().withMessage("Not a string"),
//   check("email").isEmail().withMessage("Not an email"),
//   check("phone").isMobilePhone().withMessage("Not a phone number"),
//   // eslint-disable-next-line consistent-return
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const volunteer = await Volunteer.create({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         phone: req.body.phone,
//         // initialize signedWaiver to false when Volunteer is created
//         signedWaiver: false,
//       });
//       volunteer.save();
//       res.json(volunteer);
//     } catch (error) {
//       res.status(500).send(error.message);
//       console.log(`error is ${error.message}`);
//       // return;
//     }
//   }
// );

router.post(
  "/register",
  check("firstName").isString().withMessage("Not a string"),
  check("lastName").isString().withMessage("Not a string"),
  check("email").isEmail().withMessage("Not an email"),
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      // add this later
      let volunteer = await Volunteer.findOne({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      // check if volunteer with req email exists
      if (volunteer === null) {
        // create new volunteer with same email but different name
        volunteer = await Volunteer.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          // initialize signedWaiver to false when new Volunteer is created
          signedWaiver: false,
        });
        if (req.body.phone) volunteer.phone = req.body.phone;
        volunteer.save();
      }

      // update event with volunteer
      const { eventID } = req.body;
      const event = await Event.findOne({
        _id: mongoose.Types.ObjectId(eventID),
      });
      if (!event.volunteers.includes(volunteer._id)) {
        await event.updateOne({
          // addToSet checks for duplicates
          $addToSet: { volunteers: volunteer._id },
        });
      } else {
        res.json(volunteer);
        // eslint-disable-next-line no-throw-literal
        // throw {
        //   message: "Volunteer array already contains user for this event",
        // };
      }
      res.json(volunteer);
    } catch (error) {
      res.status(500).send(error.message);
      console.log(`error is ${error.message}`);
    }
  }
);

// #3 - put route to set signedWaiver and dateSigned
router.put("/:id/signWaiver", async (req, res) => {
  const volunteer = await Volunteer.findById(req.params.id);
  const current = new Date();
  // update signedWaiver and dateSigned fields
  volunteer.signedWaiver = true;
  volunteer.dateSigned = current.getTime();
  volunteer.save();
  res.send(`Signed waiver at time ${volunteer.dateSigned}`);
});

module.exports = router;
