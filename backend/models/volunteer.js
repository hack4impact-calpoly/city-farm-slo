const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  notes: String,
});

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

module.exports = Volunteer;
