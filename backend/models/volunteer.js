const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: false },
  lastName: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: false },
  phone: { type: String, unique: false },
  isAdult: { type: Boolean },
  signedWaiver: { type: Boolean, default: false },
  dateSigned: { type: Date },
  parentName: { type: String },
  hours: { type: Number, default: 0 },
});

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
module.exports = Volunteer;
