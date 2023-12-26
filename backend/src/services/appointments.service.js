const Appointments = require("../models/Appointments");

const appointmentsService = {
  createAppointmentsCollection: async (userId) => {
    const NewAppointments = new Appointments({ user: userId });
    await NewAppointments.save();
  },

  getAppointments: async (userId) => {
    const appointments = await Appointments.find({ user: userId });
    return appointments;
  },

  addAppointment: async (userId, day, appointment) => {
    await Appointments.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          [day]: appointment,
        },
      }
    );
  },

  deleteAppointment: async (userId, day, index) => {
    await Appointments.updateOne(
      { user: userId },
      {
        $unset: { [`${day}.${index}`]: null },
      }
    );
    await Appointments.updateOne(
      { user: userId },
      {
        $pull: { [`${day}`]: null },
      }
    );
  },
};

module.exports = appointmentsService;
