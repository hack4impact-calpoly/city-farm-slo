const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  notes: { type: String, required: false },
});

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
module.exports = Volunteer;
