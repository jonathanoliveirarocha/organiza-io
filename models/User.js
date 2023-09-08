const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    user:{
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
    appointments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointments',
    },
});

mongoose.model('user', User)