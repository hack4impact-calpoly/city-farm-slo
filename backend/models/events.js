const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    Name: String,
    Location: String,
    startTime: Date,
    endTime: Date,
    slots: Number,
    notes: String,
    Volunteers: [mongoose.Schema.Types.ObjectID],
  },
  { collection: "Events" }
);

const Event = mongoose.model("Event", EventSchema);
// ---- End of Schema/Model

module.exports = Event;cd 
