const appointmentsService = require("../services/appointments.service");
const authService = require("../services/auth.service");

const handleError = (res, errorMessage) => {
  return res.status(500).json({ error: errorMessage });
};

const appointmentsController = {
  getData: async (req, res) => {
    try {
      const userId = req.user.userId;
      const appointments = await appointmentsService.getAppointments(userId);

      if (!appointments) {
        return res.status(404).json({ error: "Compromissos não encontrados!" });
      }

      const username = (await authService.getUserById(userId)).username;

      res.send({ appointments, username });
    } catch (error) {
      handleError(res, "Houve um erro interno!");
    }
  },

  postData: async (req, res) => {
    try {
      const { day, start, end, activity, description } = req.body;
      const userId = req.user.userId;

      await appointmentsService.addAppointment(userId, day, [start, end, activity, description]);

      res.status(201).json({ message: "Adicionado com sucesso!" });
    } catch (error) {
      handleError(res, "Houve um erro interno!");
    }
  },

  deleteData: async (req, res) => {
    try {
      const { day, index } = req.body;
      const userId = req.user.userId;

      await appointmentsService.deleteAppointment(userId, day, index);

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error) {
      handleError(res, "Houve um erro interno!");
    }
  },
};

module.exports = appointmentsController;
