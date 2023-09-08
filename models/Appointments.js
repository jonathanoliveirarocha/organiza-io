const mongoose = require('mongoose');

const appointmentsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  monday: {
    type: Array,
  },
  tuesday: {
    type: Array,
  },
  Wednesday: {
    type: Array,
  },
  thursday: {
    type: Array,
  },
  friday: {
    type: Array,
  },
  saturday: {
    type: Array,
  },
  sunday: {
    type: Array,
  },
});

const appointments = mongoose.model('appointments', appointmentsSchema);

module.exports = appointments;