const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: String,
    Location: String,
    start: Date,
    end: Date,
    slots: Number,
    notes: String,
    Volunteers: [mongoose.Schema.Types.ObjectID],
  },
  { collection: "Events" }
);

const Event = mongoose.model("Event", EventSchema);
// ---- End of Schema/Model

module.exports = Event;
