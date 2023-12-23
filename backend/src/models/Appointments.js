const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentsSchema = new mongoose.Schema({
  monday: Array,
  tuesday: Array,
  wednesday: Array,
  thursday: Array,
  friday: Array,
  saturday: Array,
  sunday: Array,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Appointments = mongoose.model("Appointments", appointmentsSchema);

module.exports = Appointments;
