const Appointments = require("../models/Appointments");

const appointmentsService = {
  getAppointments: async (user) => {
    let appointments = await Appointments.find({ user: user._id });
    return appointments;
  },

  addAppointment: async (user, day, appointment) => {
    await Appointments.findOneAndUpdate(
      { user: user._id },
      {
        $push: {
          [day]: [appointment],
        },
      }
    );
  },

  deleteAppointment: async (user, day, index) => {
    await Appointments.updateOne(
      { user: user._id },
      {
        $unset: { [`${day}.${index}`]: null },
      }
    );
    await Appointments.updateOne(
      { user: req.user },
      {
        $pull: { [`${day}`]: null },
      }
    );
  },
};

module.exports = appointmentsService;
