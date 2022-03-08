const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  isAdult: { type: Boolean },
  signedWaiver: { type: Boolean, default: false },
  dateSigned: { type: Date },
  parentName: { type: String },
});

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
module.exports = Volunteer;
