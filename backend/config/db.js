const mongoose = require('mongoose')
require("dotenv").config();
const url = process.env.DATABASE;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once('open', () => {
  console.log('Connection to MongoDB established!');
});

module.exports = db;