const mongoose = require('mongoose');
// Part2 step5 : Build a schema model 

const budgetSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
        unique: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
        uppercase:true
    },
    budget: {
        type: Number,
        required: true
    },
    //part2 step6: color field must be enforced to be in the at least 6 digits
    color: {
        type: String,
        required: true,
        match: [/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Color is not valid']
    },

    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
}, {collection: 'budget'})

module.exports = mongoose.model('budget', budgetSchema)