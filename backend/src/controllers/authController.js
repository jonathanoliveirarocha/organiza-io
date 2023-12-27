const authService = require("../services/auth.service");
const appointmentsService = require("../services/appointments.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ERROR_MESSAGES = {
  EMAIL_IN_USE: "Este e-mail já está sendo utilizado!",
  INVALID_EMAIL: "O e-mail deve ser válido!",
  INVALID_USERNAME: "Nome de usuário inválido!",
  SHORT_PASSWORD: "A senha deve ter pelo menos 8 caracteres!",
  DIFFERENT_PASSWORDS: "As senhas não conferem!",
  USER_NOT_FOUND: "E-mail não cadastrado!",
  INCORRECT_PASSWORD: "Senha incorreta!",
  INTERNAL_ERROR: "Houve um erro interno!",
};

const response = (res, status, data) => res.status(status).json(data);

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const authController = {
  signup: async (req, res) => {
    try {
      const { username, email, password, passwordRepeat } = req.body;
      
      const existingUser = await authService.getUser({ email, password });
      if (existingUser) {
        return response(res, 409, { error: ERROR_MESSAGES.EMAIL_IN_USE });
      }

      if (!username || typeof username !== "string") {
        return response(res, 400, { error: ERROR_MESSAGES.INVALID_USERNAME });
      }

      if (!email || !validateEmail(email)) {
        return response(res, 400, { error: ERROR_MESSAGES.INVALID_EMAIL });
      }

      if (!password || typeof password !== "string" || password.length < 8) {
        return response(res, 400, { error: ERROR_MESSAGES.SHORT_PASSWORD });
      }
      console.log(password)
      console.log(passwordRepeat)
      if (password !== passwordRepeat) {
        return response(res, 400, {
          error: ERROR_MESSAGES.DIFFERENT_PASSWORDS,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await authService.addUser({
        username,
        email,
        password: hashedPassword,
      });

      await appointmentsService.createAppointmentsCollection(user._id);

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });
      return response(res, 200, { token });
    } catch (error) {
      return response(res, 500, { error: ERROR_MESSAGES.INTERNAL_ERROR });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authService.getUser({ email, password });

      if (!user) {
        return response(res, 401, { error: ERROR_MESSAGES.USER_NOT_FOUND });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return response(res, 401, { error: ERROR_MESSAGES.INCORRECT_PASSWORD });
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });
      return response(res, 200, { token });
    } catch (error) {
      return response(res, 500, { error: ERROR_MESSAGES.INTERNAL_ERROR });
    }
  },
};

module.exports = authController;
