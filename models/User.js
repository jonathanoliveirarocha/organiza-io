const mongoose = require('mongoose');

// Model with user data
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;