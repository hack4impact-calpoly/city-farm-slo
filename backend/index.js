const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Event = require("./models/event");

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


// GET /events - Method that returns all events in the database
app.get("/events", (req, res) => {
    // get all eventss
    const events = await Event.find({});
    res.send(events);
})
// POST /event/add - Method that adds an event to MongoDB (data passed in body)
app.post("/event/add", (req, res) => {

})


app.listen(3001);
