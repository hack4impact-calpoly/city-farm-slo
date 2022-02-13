const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, match: /.+@.+\..+/, unique: true },
  phone: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3}\d{3}\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number.`,
    },
    required: [true, `Phone number required.`],
  },
  notes: { type: String, required: false },
});

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
module.exports = Volunteer;
