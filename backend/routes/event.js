const express = require("express");
const { body, validationResult, check } = require("express-validator");
const Event = require("../models/event");

const router = express.Router();

const app = express();
app.use(express.json());

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
router.post(
  "/add",
  check("title").isString().withMessage("Not a string"),
  check("location").isString().withMessage("Not a string"),
  check("start").trim().isISO8601().toDate().withMessage("Not a date"),
  check("end").trim().isISO8601().toDate().withMessage("Not a date"),
  check("slots").isInt().withMessage("Not a valid number"),
  check("notes")
    .if(body("notes").notEmpty())
    .isString()
    .withMessage("Not a string"),
  check("volunteers").isArray().withMessage("Not an array"),
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      await Event.create({
        title: req.body.title,
        location: req.body.location,
        start: req.body.start,
        end: req.body.end,
        slots: req.body.slots,
        notes: req.body.notes,
        volunteers: [],
      }).then((event) => res.json(event));
    } catch (error) {
      res.status(500).send(error.message);
      console.log(`error is ${error.message}`);
    }
  }
);

module.exports = router;
