const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.schema(
  {
      firstName: String,
      lastName: String, 
      email: String,
      phone: Number, 
      notes: String,
    },
);
const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

module.exports = Volunteer;