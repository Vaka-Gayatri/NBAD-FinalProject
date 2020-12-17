let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }  
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);

