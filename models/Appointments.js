const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
  },
});

const Appointments = mongoose.model('Appointments', appointmentsSchema);

module.exports = Appointments;