const express = require("express");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/event");
const volunteerRoutes = require("./routes/volunteer");

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

app.use("/events", eventRoutes);
app.use("/volunteer", volunteerRoutes);

app.listen(3001);
