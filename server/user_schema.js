let mongoose = require('mongoose');

let categories = {
    categoryName: {
        type: String,
        required: false
    },
    limitPerMonth: {
        type: String,
        required: false
    }
}

let userSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true,
        unique: true
    },
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
    }, 
    budgetCategories: [categories]
}, {collection: 'users'});


module.exports = mongoose.model('User', userSchema);

