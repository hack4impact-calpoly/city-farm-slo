const mongoose = require("mongoose")
const VolunteerSchema = new mongoose.schema(
  {
      firstName: firstName,
      lastName: lastName, 
      email: email,
      phone: phone, 
      notes: notes,
    },
);
const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

module.exports = Volunteer;
