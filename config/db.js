const mongoose = require('mongoose')

var temp = '';

if(process.env.NODE_ENV == 'production'){
    temp = '<ProductionURI>'
}else{
    temp = ''
}

const url = temp;

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