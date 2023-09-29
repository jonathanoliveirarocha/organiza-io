const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model containing vectors to store data for each day of the week
const appointmentsSchema = new mongoose.Schema({
  monday: {
    type: Array,
  },
  tuesday: {
    type: Array,
  },
  wednesday: {
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
  // User responsible for appointments
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
  },
});

// 
const Appointments = mongoose.model('Appointments', appointmentsSchema);

module.exports = Appointments;