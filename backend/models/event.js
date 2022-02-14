const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    slots: { type: Number, required: true },
    notes: { type: String, required: false },
    volunteers: [mongoose.Schema.Types.ObjectID],
  },
  { collection: "Events" }
);

const Event = mongoose.model("Event", EventSchema);
// ---- End of Schema/Model

module.exports = Event;
