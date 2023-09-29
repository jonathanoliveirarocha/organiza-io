const mongoose = require('mongoose')

var temp = '';

// Checking if you are in a production or local environment
if(process.env.NODE_ENV == 'production'){
  // Enter your production Mongodb URI
  temp = '<PRODUCTION-URI>'
}else{
  // Enter your local Mongodb URI
  temp = '<LOCAL-URI>'
}

const url = temp;

// Connecting to the database
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