const express = require("express");
const mongoose = require("mongoose");
const Event = require("./models/event");
require("dotenv").config();

// Start Express Server
const app = express();
app.use(express.json());

// Connect to MongoDB
if (!process.env.CONNECTION_URL) {
  console.warn("Missing CONNECTION_URL environment variable");
}
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => console.log("Succfully connected to mongodb"))
  .catch((error) => console.log(`Could not connect due to ${error}`));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// #1 - get all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.send(events);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

// #2 - add an event
app.post("/event/add", async (req, res) => {
  try {
    const { title, location, start, end, slots, notes, volunteers } = req.body;
    let event = new Event({
      title,
      location,
      start,
      end,
      slots,
      notes,
      volunteers,
    });
    event = await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

app.listen(3001);
