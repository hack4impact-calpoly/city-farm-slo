const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/event");
const volunteerRoutes = require("./routes/volunteer");
const mailRoutes = require("./routes/mail");
const adminRoutes = require("./routes/admin");

require("dotenv").config();

// Start Express Server
const app = express();
app.use(express.json());
app.use(cors());

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
app.use("/mail", mailRoutes);
app.use("/admin", adminRoutes);

if (process.argv.includes("dev")) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}

module.exports = app;
