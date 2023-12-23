const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/db");
const appointments = require("./src/routes/appointments");
const auth = require("./src/routes/auth");
const PORT = process.env.PORT | 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/appointments", appointments);
app.use("/api/auth", auth);

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
